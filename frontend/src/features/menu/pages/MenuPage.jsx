import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";
import { API, MENU_URL } from "../../../config";

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

    // Loading state
    if (isLoading) {
        return <p>Loading menu...</p>;
    }

    // Error state
    if (error) {
        return <p>Could not load menu: {error}</p>;
    }

    // Filter dishes
    const filtered = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(
            debounced.toLowerCase()
        )
    );

    return (
        <div className="menu-page">
            <h2>CampusEats Menu</h2>

            <small>Data source: {API ? `${API}/api/menu` : "static menu.json"}</small>

            <input
                type="text"
                placeholder="Search dishes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <MenuList dishes={filtered} />
        </div>
    );
}

export default MenuPage;