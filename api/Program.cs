using System.Text;
using CampusEats.Api.Data;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Cloud hosts (Render/Railway) tell the app which port to listen on via PORT.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Services.AddControllers();

// Database - in production the connection string comes from ConnectionStrings__Default
var connectionString = builder.Configuration.GetConnectionString("Default");
if (string.IsNullOrWhiteSpace(connectionString))
    throw new InvalidOperationException(
        "Missing connection string: set the ConnectionStrings__Default environment variable.");
connectionString = NormalizePostgresConnectionString(connectionString);

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(connectionString));

// Service
builder.Services.AddScoped<IMenuService, MenuService>();

// JWT Authentication
var jwt = builder.Configuration.GetSection("Jwt");
if (string.IsNullOrWhiteSpace(jwt["Key"]))
    throw new InvalidOperationException(
        "Missing JWT key: set the Jwt__Key environment variable.");
var key = Encoding.UTF8.GetBytes(jwt["Key"]!);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt => opt.TokenValidationParameters = new()
    {
        ValidateIssuer = true, ValidIssuer = jwt["Issuer"],
        ValidateAudience = true, ValidAudience = jwt["Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = true
    });

builder.Services.AddAuthorization();

// Swagger with JWT button
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CampusEats API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization", In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http, Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Paste ONLY the token - no 'Bearer ' prefix."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { new OpenApiSecurityScheme { Reference = new OpenApiReference
            { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
          Array.Empty<string>() }
    });
});

// CORS - allowed origins come from config (Cors__AllowedOrigins in production,
// comma-separated, exact https origin with no trailing slash)
var allowedOrigins = (builder.Configuration["Cors:AllowedOrigins"] ?? "http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(o => o.AddPolicy("Frontend", p =>
    p.WithOrigins(allowedOrigins)
     .AllowAnyHeader()
     .AllowAnyMethod()));

var app = builder.Build();

app.Logger.LogInformation("CampusEats API starting in {Environment}; CORS origins: {Origins}",
    app.Environment.EnvironmentName, string.Join(", ", allowedOrigins));

// Seed menu data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!db.MenuItems.Any())
    {
        db.MenuItems.AddRange(
            new CampusEats.Api.Models.MenuItem { Name = "Kottu Roti", Price = 750m, Category = "Mains" },
            new CampusEats.Api.Models.MenuItem { Name = "Fried Rice", Price = 850m, Category = "Mains" },
            new CampusEats.Api.Models.MenuItem { Name = "Watalappan", Price = 350m, Category = "Dessert" });
        db.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.Run();

// Managed Postgres providers (Neon, Render, Railway) hand out URLs like
// postgresql://user:pass@host/db?sslmode=require - Npgsql needs key=value pairs.
static string NormalizePostgresConnectionString(string value)
{
    if (!value.StartsWith("postgres://") && !value.StartsWith("postgresql://"))
        return value;

    var uri = new Uri(value);
    var user = uri.UserInfo.Split(':', 2);
    var query = uri.Query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries)
        .Select(p => p.Split('=', 2))
        .ToDictionary(p => p[0], p => p.Length > 1 ? p[1] : "", StringComparer.OrdinalIgnoreCase);

    var csb = new NpgsqlConnectionStringBuilder
    {
        Host = uri.Host,
        Port = uri.Port > 0 ? uri.Port : 5432,
        Database = uri.AbsolutePath.TrimStart('/'),
        Username = Uri.UnescapeDataString(user[0]),
        Password = user.Length > 1 ? Uri.UnescapeDataString(user[1]) : null,
        SslMode = SslMode.Require
    };
    if (query.TryGetValue("channel_binding", out var cb) && cb == "require")
        csb.ChannelBinding = ChannelBinding.Require;

    return csb.ConnectionString;
}
