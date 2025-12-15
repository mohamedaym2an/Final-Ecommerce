import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGoogleplus } from "react-icons/io";

const FooterCopyrights = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <ul className="flex items-center gap-3">
        <li>
          <Link to={"/"} className="hover:text-mainColor">
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link to={"/"} className="hover:text-mainColor">
            <FaTwitter />
          </Link>
        </li>
        <li>
          <Link to={"/"} className="hover:text-mainColor">
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link to={"/"} className="hover:text-mainColor">
            <FaLinkedinIn />
          </Link>
        </li>
        <li>
          <Link to={"/"} className="hover:text-mainColor">
            <IoLogoGoogleplus />
          </Link>
        </li>
      </ul>
      <p className="text-sm">
        Copyrights&copy;2025.By{" "}
        <Link
          to={"https://wa.me/+201025584982"}
          className="font-medium text-mainColor"
          target="_blank"
        >
          Mohamed ayman omar
        </Link>
      </p>
    </div>
  );
};

export default FooterCopyrights;
