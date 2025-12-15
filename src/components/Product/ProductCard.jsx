import { Link } from "react-router-dom";
import ProductAction from "./ProductAction";
import { FaHeart } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import useUpdateProductCount from "../../hooks/useIncrementByOne";
import { MdDeleteOutline } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";
import useProductActions from "../../hooks/useProductActions";

const ProductCard = ({ product }) => {
  const cart = useSelector((state) => state.cart.products);
  const wishlist = useSelector((state) => state.wishlist.products);
  const inCart = cart.find((p) => p.product._id === product._id);
  const inWishlist = wishlist.find((v) => v._id === product._id);

  const { removeProduct, removeLoading } = useUpdateProductCount();

  const {
    addLoading,
    wishLoading,
    addToCart,
    addToWishList,
    removeFromWishList,
  } = useProductActions();

  return (
    <article className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 transition-all duration-300 group hover:shadow-lg relative rounded-md overflow-hidden px-1 sm:px-4">
      <Link to={`/products/${product._id}`} className="block">
        <img src={product.imageCover} className="w-full" />
      </Link>
      <div className="py-1 px-4 pb-2">
        <span className=" text-mainColor capitalize">
          {product.category.name}
        </span>
        <Link to={`/products/${product._id}`}>
          <h4 className="text-lg font-medium line-clamp-1">{product.title}</h4>
        </Link>
        <ProductAction price={product.price} rate={product.rating} />
        <button
          disabled={addLoading || removeLoading}
          onClick={() => (inCart ? removeProduct(inCart) : addToCart(product))}
          className={`w-full flex items-center justify-center gap-2  text-white font-medium text-sm rounded-lg py-2.5 px-4 capitalize mt-2 translate-y-28 group-hover:translate-y-0 ${inCart
              ? "bg-rose-500 hover:bg-rose-700 disabled:bg-rose-700"
              : "bg-mainColor hover:bg-mainColorHover disabled:bg-mainColorHover"
            }`}
        >
          {addLoading || removeLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <span className="flex items-center gap-2">
              {inCart ? (
                <Fragment>
                  <MdDeleteOutline /> remove from cart
                </Fragment>
              ) : (
                <Fragment>
                  <BsCartPlus /> add to card
                </Fragment>
              )}
            </span>
          )}
        </button>
      </div>

      {inCart && (
        <span className=" absolute top-5 left-10 z-10 text-mainColor">
          <TbShoppingCartCopy />
        </span>
      )}

      {/* Wishlist Icon */}
      {!inWishlist ? (
        <button
          disabled={wishLoading}
          onClick={() => addToWishList(product)}
          className="absolute top-3 right-7 z-10 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          {wishLoading ? (
            <span className="loading loading-ring loading-sm"></span>
          ) : (
            <FaHeart />
          )}
        </button>
      ) : (
        <button
          disabled={wishLoading}
          onClick={() => removeFromWishList(product._id)}
          className="absolute top-3 right-7 z-10 w-8 h-8 rounded-full bg-rose-200 text-rose-600 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          {wishLoading ? (
            <span className="loading loading-ring loading-sm"></span>
          ) : (
            <FaHeart />
          )}
        </button>
      )}
    </article>
  );
};

export default ProductCard;
