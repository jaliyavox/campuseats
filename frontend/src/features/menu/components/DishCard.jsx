import { Link } from "react-router-dom";
import Blob from "../../../components/Blob";

function DishCard({ dish }) {
    const lemon = dish.id % 2 === 0;

    return (
        <article className={`card${dish.available ? "" : " sold"}`}>

            <div className={`card-art${lemon ? " alt" : ""}`}>
                <Blob spikes={7 + (dish.id % 5)} tone={lemon ? "lemon" : "violet"} />
            </div>

            <div className="card-top">
                <span className="chip">{dish.category}</span>
                {!dish.available && (
                    <span className="chip chip-sold">Sold Out</span>
                )}
            </div>

            <h3>{dish.name}</h3>

            <p className="price">Rs. {Number(dish.price).toFixed(2)}</p>

            <Link to={`/dish/${dish.id}`} className="card-link">
                View Details →
            </Link>

        </article>
    );
}

export default DishCard;
