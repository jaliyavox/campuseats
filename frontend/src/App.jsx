import { Routes, Route, NavLink, Link } from "react-router-dom";

import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";
import { LogoIcon, GitHubIcon } from "./components/Icons";

function App() {
    return (
        <div className="frame">
            <header className="header">
                <Link to="/" className="brand">
                    <LogoIcon />
                    CampusEats
                </Link>

                <nav className="nav">
                    <NavLink to="/" end>Menu</NavLink>
                    <NavLink to="/order">Place Order</NavLink>
                </nav>

                <Link to="/order" className="btn btn-light header-cta">
                    Order Now
                </Link>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<MenuPage />} />
                    <Route path="/dish/:id" element={<DishDetailPage />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route
                        path="*"
                        element={
                            <div className="panel-wrap">
                                <div className="panel">
                                    <h2>404</h2>
                                    <p className="lead">This page is not on the menu.</p>
                                    <Link to="/" className="btn btn-dark">Back to Menu</Link>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </main>

            <footer className="footer">
                <div className="socials">
                    <a href="https://github.com/jaliyavox/campuseats" aria-label="GitHub"><GitHubIcon /></a>
                </div>
                <span>CampusEats · SE3090 Lab 11</span>
            </footer>
        </div>
    );
}

export default App;
