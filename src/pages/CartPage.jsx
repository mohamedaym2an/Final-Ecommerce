import { Link } from "react-router-dom";
import CardTable from "../components/Product/card/CardTable";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { clearCart } from "../store/slice/cartSlice";
import { currencyEgpFormat } from "../utils/methods/currencyFormat";
import getPrivateAxios from "../utils/axios/privateAxios";

const CartPage = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const getCartLoading = useSelector((state) => state.cart.loading);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [removeLoading, setRemoveLoading] = useState(false);

  const dispatch = useDispatch();
  const privateAxios = getPrivateAxios();

  const removeAllCart = async () => {
    setRemoveLoading(true);
    try {
      await privateAxios.delete("/cart");
      toast.success("Success Remove Cart");
      dispatch(clearCart());
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Faild Remove Cart"
      );
    } finally {
      setRemoveLoading(false);
      document.getElementById("closeModal").click();
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        {getCartLoading && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {cartProducts.length < 1 && !getCartLoading && (
          <div className=" alert bg-yellow-100">
            The Cart is empty, Start Add Your Products
          </div>
        )}

        {cartProducts.length > 0 && !getCartLoading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-3">
              <div className="flex items-center justify-between gap-3 mb-4 pr-4">
                <h1 className="text-2xl font-bold capitalize">products cart</h1>
                <button
                  className="flex items-center gap-0 text-rose-500 capitalize text-sm font-medium"
                  onClick={() =>
                    document.getElementById("clearCardModal").showModal()
                  }
                >
                  <MdDeleteOutline className="text-lg" /> clear cart
                </button>
              </div>
              <CardTable products={cartProducts} />
            </div>

            <div className="col-span-1">
              <h2 className="text-xl font-bold capitalize mb-4">checkout</h2>

              <div className=" border border-gray-100 rounded-sm p-4">
                <p className=" capitalize">
                  total price:{" "}
                  <span className="font-bold">
                    {currencyEgpFormat(totalPrice)}
                  </span>
                </p>

                <Link
                  className="btn w-full bg-mainColor text-white capitalize text-sm font-semibold hover:bg-mainColorHover mt-5"
                  to={"/cart/checkout"}
                >
                  checkout now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <dialog id="clearCardModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Clear Your Cart!!!</h3>
          <p className="py-4">
            Are you sure you want to remove your shopping cart?
          </p>
          <div className="modal-action flex items-center">
            <form method="dialog">
              <button className="btn" id="closeModal">
                Close
              </button>
            </form>
            <button
              disabled={removeLoading}
              onClick={removeAllCart}
              className="btn bg-mainColor text-white hover:bg-mainColorHover disabled:bg-mainColorHover"
            >
              {removeLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Clear"
              )}
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default CartPage;
