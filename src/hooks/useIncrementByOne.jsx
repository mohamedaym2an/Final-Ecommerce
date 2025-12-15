import { useState } from "react";
import toast from "react-hot-toast";
import getPrivateAxios from "../utils/axios/privateAxios";

import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
  updateProduct,
} from "../store/slice/cartSlice";

const useUpdateProductCount = () => {
  const [operationLoading, setOperationLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const dispatch = useDispatch();
  const privateAxios = getPrivateAxios();

  const updateProductCount = async (productId, nowCount, newCount) => {
    if (operationLoading) return;

    if (newCount < nowCount && newCount < 1) return;
    setOperationLoading(true);
    try {
      dispatch(updateProduct({ id: productId, count: newCount }));
      await privateAxios.put(`/cart/${productId}`, { count: newCount });
    } catch (error) {
      dispatch(updateProduct({ id: productId, count: nowCount }));
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Faild Update Product!!!"
      );
    } finally {
      setOperationLoading(false);
    }
  };

  const removeProduct = async (product) => {
    if (removeLoading) return;
    setRemoveLoading(true);
    try {
      dispatch(removeProductFromCart(product._id));
      await privateAxios.delete(`/cart/${product.product._id}`);
    } catch (error) {
      dispatch(addProductToCart(product));
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Faild Remove Product!!!"
      );
    } finally {
      setRemoveLoading(false);
    }
  };

  return { updateProductCount, operationLoading, removeLoading, removeProduct };
};

export default useUpdateProductCount;
