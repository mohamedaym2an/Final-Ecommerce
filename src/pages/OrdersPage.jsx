import { Fragment, useEffect, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import publicAxios from "../utils/axios/publicAxios";
import Alert from "../components/Alert";
import { format } from "date-fns";
import { currencyEgpFormat } from "../utils/methods/currencyFormat";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const isPaymentSuccess = searchParams.get("success") ? true : false;
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const { id } = jwtDecode(user.token);
      const getUserOrders = async () => {
        try {
          const { data } = await publicAxios.get(`orders/user/${id}`);
          setOrders(data);
        } catch (error) {
          navigate("/");
        } finally {
          setLoading(false);
        }
      };

      if (!loading && isPaymentSuccess) {
        toast.success("Success Payment Your Order");
      }

      getUserOrders();
    }
  }, [user, navigate, isPaymentSuccess, loading]);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="py-10">
      <div className="container text-center">
        {loading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {!loading && (
          <Fragment>
            {orders.length < 1 ? (
              <Alert
                type={"warning"}
                text={"This User not Have any Orders!!!"}
              />
            ) : (
              <div className="flex flex-col gap-5 text-start">
                {orders
                  .slice()
                  .reverse()
                  .map((order, i) => (
                    <div key={order._id} className="collapse collapse-arrow">
                      <input
                        type="radio"
                        name={`orders-accordion`}
                        defaultChecked={i === 0}
                      />
                      <div className="collapse-title text-md font-bold cursor-pointer flex items-center gap-2 bg-gray-200 h-16">
                        <BsCartCheck className="text-mainColor" /> #Order{" "}
                        {orders.length - i} Details
                      </div>
                      <div className="collapse-content no-scrollbar bg-gray-100 pt-3 overflow-x-scroll">
                        <div>
                          <h3 className="capitalize text-base font-bold">
                            order information
                          </h3>
                          <div className="overflow-x-auto my-3">
                            <table className="table rounded border border-stone-200  bg-stone-200">
                              <thead className="bg-stone-300">
                                <tr>
                                  <th>Order ID</th>
                                  <th>Created At</th>
                                  <th>Paid Method</th>
                                  <th>Is Paid</th>
                                  <th>Is Delivered</th>
                                  <th>Products Count</th>
                                  <th>Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{order._id}</td>
                                  <td>
                                    {format(
                                      new Date(`${order.createdAt}`),
                                      "dd-MM-yyyy hh:mm a"
                                    )}
                                  </td>
                                  <td>{order.paymentMethodType}</td>
                                  <td>{order.isPaid ? "Yes" : "No"}</td>
                                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                                  <td>{order.cartItems.length}</td>
                                  <td>
                                    {currencyEgpFormat(order.totalOrderPrice)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div>
                          <h3 className="capitalize text-base font-bold">
                            order products
                          </h3>
                          <div className="overflow-x-auto my-3 w-full">
                            <table className="table bg-stone-200 border border-stone-200">
                              <thead className="bg-stone-300">
                                <tr>
                                  <th>Product Title</th>
                                  <th>Category</th>
                                  <th>Price</th>
                                  <th>Count</th>
                                  <th>Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.cartItems.map((product) => (
                                  <tr key={product._id}>
                                    <td>
                                      <div className="flex items-center gap-3">
                                        <div className="avatar">
                                          <div className="mask rounded-lg h-12 w-12">
                                            <img
                                              src={product.product.imageCover}
                                              alt="Product Image"
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <div className="font-bold">
                                            {product.product.title}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>{product.product.category.name}</td>
                                    <td>{currencyEgpFormat(product.price)}</td>
                                    <td>{product.count}</td>
                                    <td>
                                      {currencyEgpFormat(
                                        product.price * product.count
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
