import toast from "react-hot-toast";
import { setWishlist } from "../../store/slice/wishlistSlice";
import publicAxios from "../axios/publicAxios";
import { setCart } from "../../store/slice/cartSlice";
import getPrivateAxios from "../axios/privateAxios";

export const getAllProducts = async () => {
  const res = await publicAxios.get("/products");
  return res.data;
};

export const getUserWishlist = async () => {
  const privateAxios = getPrivateAxios();
  const res = await privateAxios.get("/wishlist");
  return res.data;
};

export const getUserCart = async () => {
  const privateAxios = getPrivateAxios();
  const res = await privateAxios.get("/cart");
  return res.data;
};

export const getWishlist = async (dispatch) => {
  try {
    const wishlistData = await getUserWishlist();
    dispatch(setWishlist(wishlistData.data));
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Faild Get Wishlist!!!"
    );
  }
};

export const getCart = async (dispatch) => {
  try {
    const cartData = await getUserCart();
    dispatch(
      setCart({
        products: cartData.data.products,
        cartId: cartData.cartId,
      })
    );
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Faild Get Cart Data!!!"
    );
  }
};
