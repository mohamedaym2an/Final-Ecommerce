import { useForm } from "react-hook-form";
import Input from "../components/Auth/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import checkoutSchema from "../utils/schemas/checkoutSchema";
import { Fragment, useState } from "react";
import { RiVisaLine } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCartCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { currencyEgpFormat } from "../utils/methods/currencyFormat";
import toast from "react-hot-toast";
import useCheckoutPayment from "../hooks/useCheckoutPayment";
import { Navigate } from "react-router-dom";

const CheckoutPage = () => {
  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      cash_on_delivery: false,
    },
  });

  const [checkLoading, setCheckLoading] = useState(false);

  const { addCashOrder, addOnlinePaymentOrder } = useCheckoutPayment();
  const cashOnDelivery = watch("cash_on_delivery");

  const { loading, products, cartId, totalPrice } = useSelector(
    (state) => state.cart
  );

  const onSubmit = async (data) => {
    if (!cartId || checkLoading) return;
    setCheckLoading(true);
    const bodyData = {
      shippingAddress: {
        details: data.details,
        phone: data.phone,
        city: data.city,
      },
    };
    try {
      cashOnDelivery
        ? await addCashOrder(cartId, bodyData)
        : await addOnlinePaymentOrder(cartId, bodyData);
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Faild in Progress, Try again later!!!"
      );
    } finally {
      setCheckLoading(false);
    }
  };

  if (!loading && !cartId) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <section className="py-10 flex items-center justify-center h-full">
      {loading && <span className="loading loading-spinner loading-md"></span>}
      {!loading && (
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 py-8 px-4">
              <h1 className="text-2xl font-bold">Checkout</h1>

              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type={"text"}
                  name={"details"}
                  id={"checkoutDetails"}
                  label={"Details"}
                  register={register}
                  error={errors.details ? errors.details.message : false}
                  required
                />

                <Input
                  type={"text"}
                  name={"phone"}
                  id={"checkoutPhone"}
                  label={"Phone Number"}
                  register={register}
                  error={errors.phone ? errors.phone.message : false}
                  required
                />

                <Input
                  type={"text"}
                  name={"city"}
                  id={"checkoutCity"}
                  label={"City"}
                  register={register}
                  error={errors.city ? errors.city.message : false}
                  required
                />

                <div className="flex items-center justify-start gap-2">
                  <input
                    type="checkbox"
                    id="cashOnDeliveryInput"
                    {...register("cash_on_delivery")}
                  />
                  <label htmlFor="cashOnDeliveryInput">
                    Cash on Delivery (you can choose this option to payment on
                    delivery)
                  </label>
                </div>

                <button
                  disabled={checkLoading}
                  className="btn bg-mainColor text-white hover:bg-mainColorHover disabled:bg-mainColorHover capitalize h-14"
                >
                  {checkLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Fragment>
                      {cashOnDelivery ? (
                        <Fragment>
                          <CiDeliveryTruck />
                          order now
                        </Fragment>
                      ) : (
                        <Fragment>
                          <RiVisaLine />
                          pay now
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </button>
              </form>
            </div>

            <div className="col-span-1 md:col-span-1 rounded-sm border border-gray-200 py-8 px-4 flex flex-col gap-6 justify-between">
              <div>
                <h2 className="text-xl font-bold">Cart Review</h2>

                <ul className="mt-8 flex flex-col gap-2">
                  {products.map((product) => (
                    <li
                      key={product._id}
                      className="flex items-center justify-between gap-8"
                    >
                      <div className="flex items-center gap-2">
                        <BsCartCheck className="text-sm w-3.5 h-3.5 min-w-3.5 min-h-3.5" />
                        <span className="text-sm font-medium line-clamp-1">
                          {product.product.title}
                        </span>
                        <span className="text-gray-500 text-xs">
                          x{product.count}
                        </span>
                      </div>

                      <span className="text-gray-800 text-sm">
                        {currencyEgpFormat(product.count * product.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <h6 className=" text-lg font-bold capitalize">total price</h6>
                <span className="text-[15px] font-medium">
                  {currencyEgpFormat(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
