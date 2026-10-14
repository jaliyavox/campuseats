import DishCard from "./DishCard";

function MenuList({ dishes }) {

    if (!dishes.length)
        return <p>No dishes found.</p>;

    return (
        <div>
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