import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../../../config";
import Blob from "../../../components/Blob";

function DishDetailPage() {
    const { id } = useParams();
    const { data: dishes, isLoading, error } = useFetch(MENU_URL);

    const dish = dishes?.find((d) => String(d.id) === id);

    return (
        <div className="panel-wrap">
            <div className="panel">
                {isLoading && <p className="lead">Loading dish #{id}...</p>}
                {error && <p className="field-error">Could not load dish: {error}</p>}

                {dishes && !dish && (
                    <>
                        <h2>Dish not found</h2>
                        <p className="lead">There is no dish #{id} on the menu.</p>
                    </>
                )}

                {dish && (
                    <>
                        <div className={`card-art detail-art${dish.id % 2 === 0 ? " alt" : ""}`}>
                            <Blob spikes={7 + (dish.id % 5)} tone={dish.id % 2 === 0 ? "lemon" : "violet"} />
                        </div>
                        <h2>{dish.name}</h2>
                        <div className="detail-meta">
                            <span className="chip">{dish.category}</span>
                            <span className={`chip${dish.available ? "" : " chip-sold"}`}>
                                {dish.available ? "Available" : "Sold Out"}
                            </span>
                            <span className="price">Rs. {Number(dish.price).toFixed(2)}</span>
                        </div>
                    </>
                )}

                <Link to="/" className="btn btn-glass">← Back to Menu</Link>
            </div>
        </div>
    );
}

export default DishDetailPage;
