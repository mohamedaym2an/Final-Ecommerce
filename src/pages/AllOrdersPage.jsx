import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AllOrdersPage = () => {
  const { token } = useSelector((state) => state.user.user);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <Navigate to={`/orders?success=true`} />;
};

export default AllOrdersPage;
