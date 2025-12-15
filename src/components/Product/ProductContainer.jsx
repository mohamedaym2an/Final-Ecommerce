import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../utils/methods/products";
import Alert from "../Alert";
import CardSkelaton from "../Skelatons/CardSkelaton";

const ProductContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    retry: 1, // يحاول مرة واحدة لو حصل خطأ
    refetchOnWindowFocus: false, // منع refetch كل مرة يفتح فيها التبويب
  });

  // ✅ التحقق من وجود data قبل التعامل معها
  const products = Array.isArray(data?.data) ? data.data : [];

  // ✅ Console مرتب لكل منتج
  if (products.length > 0) {
    console.log(
      "Products API response:",
      products.map((p) => ({
        name: p.name,
        price: p.price,
        discountedPrice: p.discountedPrice,
        rating: p.rating,
      }))
    );
  } else if (!isLoading && !isError) {
    console.log("Products API response: Empty or undefined");
  }

  return (
    <div className="flex flex-wrap justify-center gap-y-4">
      {isLoading &&
        Array(12)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 px-3">
              <CardSkelaton />
            </div>
          ))}

      {!isLoading && isError && <Alert type={"warning"} />}

      {!isLoading && !isError && products.length > 0 ? (
        products.map((product) => <ProductCard product={product} key={product._id} />)
      ) : (
        !isLoading && !isError && <div>No products found.</div>
      )}
    </div>
  );
};

export default ProductContainer;
