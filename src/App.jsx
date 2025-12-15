import { RouterProvider } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getCart, getWishlist } from "./utils/methods/products";
import { useDispatch, useSelector } from "react-redux";
import router from "./router";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      getWishlist(dispatch);
      getCart(dispatch);
    }
  }, [dispatch, user]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
