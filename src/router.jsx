import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFound from "./pages/NotFound";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ProtectedPages from "./poviders/protectedPages";
import UserAuth from "./poviders/userAuth";
import CategoriesPage from "./pages/categories/CategoriesPage";
import SubCategoriesPage from "./pages/categories/SubCategoriesPage";
import BrandsPage from "./pages/BrandsPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: (
          <UserAuth>
            <LoginPage />
          </UserAuth>
        ),
      },
      {
        path: "sign-up",
        element: (
          <UserAuth>
            <SignupPage />
          </UserAuth>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <UserAuth>
            <ForgotPasswordPage />
          </UserAuth>
        ),
      },
      {
        path: "cart",
        children: [
          {
            index: true,
            element: (
              <ProtectedPages>
                <CartPage />
              </ProtectedPages>
            ),
          },
          {
            path: "checkout",
            element: (
              <ProtectedPages>
                <CheckoutPage />
              </ProtectedPages>
            ),
          },
        ],
      },
      {
        path: "/categories",
        children: [
          { index: true, element: <CategoriesPage /> },
          { path: ":id", element: <SubCategoriesPage /> },
        ],
      },
      { path: "/brands", element: <BrandsPage /> },
      {
        path: "/products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ],
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedPages>
            <WishlistPage />
          </ProtectedPages>
        ),
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/allorders",
        element: (
          <ProtectedPages>
            <AllOrdersPage />
          </ProtectedPages>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
