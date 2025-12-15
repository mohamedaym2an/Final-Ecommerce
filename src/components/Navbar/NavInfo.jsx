import { FaBarsStaggered, FaCartShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import AuthBtns from "./AuthBtns";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slice/userSlice";
import { currencyEgpFormat } from "../../utils/methods/currencyFormat";
import { Link, useLocation } from "react-router-dom";
import { CiMoneyCheck1, CiShoppingCart, CiWarning } from "react-icons/ci";
import CartDropdownItem from "./CartDropdownItem";
import { Fragment } from "react";

const NavInfo = ({ open, user }) => {
  const { loading, products, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  return (
    <div className="flex items-center gap-4">
      {user && (
        <>
          <div
            type="button"
            className="flex rounded-full text-[26px] relative dropdown dropdown-end"
            tabIndex={0}
            role="button"
          >
            <FaCartShopping />

            <span className=" absolute -top-1 -right-1 w-4 h-4 rounded-full bg-mainColor text-white flex items-center justify-center text-xs font-semibold">
              {products.length}
            </span>

            <div
              tabIndex={0}
              className="dropdown-content  bg-base-100 rounded-box z-[99999] w-64 p-2 shadow-lg top-full max-h-[90vh] no-scrollbar overflow-y-scroll"
            >
              <div className="flex items-center justify-between py-1 px-3">
                <h6 className="text-base font-bold capitalize">
                  products cart
                </h6>
                <span className="text-xs font-bold">
                  {currencyEgpFormat(totalPrice)}
                </span>
              </div>
              {loading && (
                <span className="loading loading-spinner loading-md"></span>
              )}
              {!loading && (
                <ul className="px-3 mt-3 flex flex-col gap-3">
                  {!products.length && (
                    <p className="text-center text-sm font-semibold text-yellow-800 flex items-center gap-2 justify-center">
                      <CiWarning />
                      Your Cart is Empty
                    </p>
                  )}
                  {products.length > 0 &&
                    products.map((product) => (
                      <CartDropdownItem key={product._id} product={product} />
                    ))}
                </ul>
              )}

              {pathname === "/cart" ? (
                <Link
                  to={products.length > 0 ? "/cart/checkout" : "/products"}
                  className="flex items-center justify-center mt-3 mb-1 gap-2 capitalize py-2 px-6 w-full rounded-md bg-mainColor text-white border border-mainColor text-sm font-medium hover:bg-mainColorHover"
                >
                  {products.length > 0 ? (
                    <Fragment>
                      <CiMoneyCheck1 /> checkout now
                    </Fragment>
                  ) : (
                    <Fragment>
                      <CiShoppingCart /> show products
                    </Fragment>
                  )}
                </Link>
              ) : (
                <Link
                  to={products.length > 0 ? "/cart" : "/products"}
                  className="flex items-center justify-center mt-3 mb-1 gap-2 capitalize py-2 px-6 w-full rounded-md bg-mainColor text-white border border-mainColor text-sm font-medium hover:bg-mainColorHover"
                >
                  {products.length > 0 ? (
                    <Fragment>
                      <CiShoppingCart /> show cart
                    </Fragment>
                  ) : (
                    <Fragment>
                      <CiShoppingCart /> start shopping
                    </Fragment>
                  )}
                </Link>
              )}
            </div>
          </div>
          <button
            onClick={() => dispatch(removeUser())}
            className="text-[26px] text-rose-500 hidden md:block"
          >
            <IoLogOutOutline />
          </button>
        </>
      )}

      <button className="text-xl md:hidden order-5" onClick={open}>
        <FaBarsStaggered />
      </button>

      {!user && <AuthBtns />}
    </div>
  );
};

export default NavInfo;
