import { useSelector } from "react-redux";
import ProductCard from "../components/Product/ProductCard";

const WishlistPage = () => {
  const products = useSelector((state) => state.wishlist.products);

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-center justify-between gap-3 mb-4 pr-4">
          <h1 className="text-2xl font-bold capitalize">products wishlist</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-y-4">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;



