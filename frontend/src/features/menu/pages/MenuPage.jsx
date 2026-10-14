import { useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";
import { API, MENU_URL } from "../../../config";
import Blob from "../../../components/Blob";
import { Cursor, LogoIcon, SearchIcon } from "../../../components/Icons";

function MenuPage() {
    // Search state
    const [query, setQuery] = useState("");

    // Debounced search
    const debounced = useDebounce(query, 400);

    // Fetch menu data
    const {
        data: dishes,
        isLoading,
        error,
    } = useFetch(MENU_URL);

    // Filter dishes
    const filtered = (dishes ?? []).filter((dish) =>
        dish.name.toLowerCase().includes(
            debounced.toLowerCase()
        )
    );

    const special = dishes?.find((d) => d.available) ?? dishes?.[0];

    return (
        <>
            <section className="hero">
                <div>
                    <span className="eyebrow">
                        <span className="eyebrow-dot"><LogoIcon /></span>
                        Fresh From The Campus Kitchen
                    </span>

                    <h1>Where cravings become meals</h1>

                    <p className="hero-sub">
                        Browse today's menu, check what's available, and
                        order your lunch before the queue does.
                    </p>

                    <div className="hero-actions">
                        <a href="#menu" className="btn btn-dark">Browse The Menu</a>
                        <Link to="/order" className="btn btn-glass">
                            <span aria-hidden="true">▶</span> Place An Order
                        </Link>
                    </div>
                </div>

                <div className="visual" aria-hidden="true">
                    <div className="toolbar">
                        <span className="tool-plus">+</span>
                        <span className="tool-icons">
                            <span>▢</span><span>○</span><span>T</span><span>⬡</span>
                        </span>
                        <span className="tool-sep" />
                        <span className="tool-active">➤</span>
                        <span className="tool-sep" />
                        <span>100%</span>
                        <span className="tool-chip">Deploy</span>
                        <span className="tool-play">▶</span>
                    </div>

                    <Cursor className="cursor cursor-a" />
                    <span className="tag tag-lemon">Kottu Lover</span>

                    <div className="cube">
                        <span className="cube-label">CAMPUS KITCHEN</span>
                    </div>
                    <Blob className="blob" spikes={12} />
                    <div className="cube-stamp">
                        Lab 11<br />Live
                    </div>

                    {special && (
                        <div className="special">
                            <div className="special-head">
                                <span>Today's Special</span>
                                <span>✕</span>
                            </div>
                            <div className="special-select">
                                <span>{special.name}</span>
                                <span>⌄</span>
                            </div>
                            <div className="special-swatch" />
                            <div className="special-row">
                                Price <b>Rs. {Number(special.price).toFixed(0)}</b>
                            </div>
                            <div className="special-row">
                                Category <b>{special.category}</b>
                            </div>
                        </div>
                    )}

                    <div className="code-card">
                        <span className="k">GET</span>{" "}
                        <span className="s">{MENU_URL}</span>
                        <br />
                        {isLoading && <span>… waiting for response</span>}
                        {error && <span className="bad">✕ {error}</span>}
                        {dishes && (
                            <span className="ok">
                                ✓ 200 OK · {dishes.length} items
                            </span>
                        )}
                        <div className="code-actions">
                            <span>{API ? "Live API" : "Static JSON"}</span>
                            <span>VITE_API_URL</span>
                        </div>
                    </div>

                    <Cursor className="cursor cursor-b" />
                    <span className="tag tag-blush">Hungry Student</span>
                </div>
            </section>

            <section className="section" id="menu">
                <div className="section-head">
                    <div>
                        <h2>CampusEats Menu</h2>
                        <p className="source">
                            Data source: {API ? `${API}/api/menu` : "static menu.json"}
                        </p>
                    </div>

                    <label className="search">
                        <SearchIcon />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </label>
                </div>

                {isLoading && <p className="state">Loading menu...</p>}

                {error && (
                    <p className="state error">Could not load menu: {error}</p>
                )}

                {dishes && <MenuList dishes={filtered} />}
            </section>
        </>
    );
}

export default MenuPage;
