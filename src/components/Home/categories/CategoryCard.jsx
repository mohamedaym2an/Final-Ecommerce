import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => {
  return (
    <Link to={`/categories/${item._id}`} className="text-center block">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 rounded-md"
      />
      <h4 className="text-lg md:text-xl font-normal capitalize mt-1">
        {item.name}
      </h4>
    </Link>
  );
};

export default CategoryCard;
