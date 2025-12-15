import { Link } from "react-router-dom";
import logoImg from "../../assets/freshcart-logo.svg";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-1 font-bold capitalize">
      <img src={logoImg} alt="logo" />
    </Link>
  );
};

export default Logo;
