// The API base URL comes from the environment (set on Vercel for production,
// in .env.local for local dev). Vite bakes it in at build time.
export const API = import.meta.env.VITE_API_URL;

// Until a backend URL is configured, fall back to the bundled static menu.
export const MENU_URL = API ? `${API}/api/menu` : "/menu.json";
