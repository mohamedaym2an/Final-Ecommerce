import { useState } from "react";
import { useDispatch } from "react-redux";
import getPrivateAxios from "../utils/axios/privateAxios";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../store/slice/wishlistSlice";
import toast from "react-hot-toast";
import { addProductToCart } from "../store/slice/cartSlice";

const useProductActions = () => {
  const [addLoading, setAddLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const dispatch = useDispatch();
  const privateAxios = getPrivateAxios();

  const addToWishList = async (product) => {
    if (!wishLoading) {
      setWishLoading(true);
      try {
        await privateAxios.post("/wishlist", {
          productId: product._id,
        });
        toast.success("Success Add Product to Wishlist");
        dispatch(addProductToWishlist(product));
      } catch (error) {
        toast.error(
          error?.response?.data?.message || error?.message || "Faild Add"
        );
      } finally {
        setWishLoading(false);
      }
    }
  };

  const removeFromWishList = async (id) => {
    if (!wishLoading) {
      setWishLoading(true);
      try {
        await privateAxios.delete(`/wishlist/${id}`);
        toast.success("Success Remove Product From Wishlist");
        dispatch(removeProductFromWishlist(id));
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Faild Remove Product From Wishlist!!!"
        );
      } finally {
        setWishLoading(false);
      }
    }
  };

  const addToCart = async (product) => {
    if (addLoading) return;

    setAddLoading(true);
    try {
      const res = await privateAxios.post("/cart", { productId: product._id });
      toast.success("Success Add Product to Cart");

      const resProduct = res.data.data.products.find(
        (item) => item.product === product._id
      );

      dispatch(
        addProductToCart({
          data: { ...resProduct, product: product },
          cartId: res.data.cartId,
        })
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Faild Add Product to Cart!!!"
      );
    } finally {
      setAddLoading(false);
    }
  };

  return {
    addLoading,
    addToCart,
    wishLoading,
    addToWishList,
    removeFromWishList,
  };
};

export default useProductActions;
