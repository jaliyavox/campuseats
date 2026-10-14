import DishCard from "./DishCard";

function MenuList({ dishes }) {

    if (!dishes.length)
        return <p className="state">No dishes found.</p>;

    return (
        <div className="grid">
            {dishes.map((dish) => (
                <DishCard
                    key={dish.id}
                    dish={dish}
                />
            ))}
        </div>
    );
}

export default MenuList;
