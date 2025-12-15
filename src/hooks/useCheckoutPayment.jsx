import { useNavigate } from "react-router-dom";
import getPrivateAxios from "../utils/axios/privateAxios";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/slice/cartSlice";
import toast from "react-hot-toast";

const useCheckoutPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const privateAxios = getPrivateAxios();

  const addCashOrder = async (cartId, data) => {
    await privateAxios.post(`/orders/${cartId}`, data);
    toast.success("Success Send Your Order");
    navigate(`/orders`);
    setTimeout(() => {
      dispatch(clearCart());
    }, 1000);
  };

  const addOnlinePaymentOrder = async (cartId, data) => {
    const res = await privateAxios.post(
      `/orders/checkout-session/${cartId}?url=${import.meta.env.VITE_BASE_URL}`,
      data
    );
    window.location.replace(res.data.session.url);
  };

  return { addCashOrder, addOnlinePaymentOrder };
};

export default useCheckoutPayment;
