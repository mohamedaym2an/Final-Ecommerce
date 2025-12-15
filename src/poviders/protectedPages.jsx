import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedPages = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${pathname}`} />;
  } else {
    return children;
  }
};

export default ProtectedPages;
