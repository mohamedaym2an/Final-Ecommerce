import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import publicAxios from "../../utils/axios/publicAxios";
import Alert from "../../components/Alert";
import ProductAction from "../../components/Product/ProductAction";
import useProductActions from "../../hooks/useProductActions";
import useUpdateProductCount from "../../hooks/useIncrementByOne";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProductDetailsImages from "../../components/Product/ProductDetailsImages";

const ProductDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const cart = useSelector((state) => state.cart.products);
  const inCart = cart.find((p) => p.product._id === id);

  const { removeProduct, removeLoading } = useUpdateProductCount();

  const {
    addLoading,
    wishLoading,
    addToCart,
    addToWishList,
    removeFromWishList,
  } = useProductActions();

  useEffect(() => {
    if (id) {
      const getProductDetails = async (i) => {
        try {
          const res = await publicAxios.get(`/products/${i}`);
          setError(false);
          setProduct(res.data.data);
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Faild Get this Product Details!!!"
          );
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      getProductDetails(id);
    }
  }, [id]);

  if (!id) {
    return <Navigate to={"/products"} />;
  }

  return (
    <section className="py-14">
      <div className="container">
        {loading && (
          <div className="min-h-[80vh] flex items-center justify-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )}

        {!loading && error && (
          <Alert
            type={"warning"}
            text={"Something Wrong, Please Try again Later!!!"}
          />
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="col-span-1">
              <ProductDetailsImages
                mainImage={product.imageCover}
                images={product.images}
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center">
              <div>
                <span className="text-mainColor text-md font-medium">
                  {product.category.name}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2">
                  {product.title}
                </h1>
                <p>{product.description}</p>

                <ProductAction price={product.price} rate={product.rate} />
                <button
                  disabled={addLoading || removeLoading}
                  onClick={() =>
                    inCart ? removeProduct(inCart) : addToCart(product)
                  }
                  className={`w-full flex items-center justify-center gap-2  text-white font-medium text-sm rounded-lg py-2.5 px-4 h-12 capitalize mt-2 ${
                    inCart
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
