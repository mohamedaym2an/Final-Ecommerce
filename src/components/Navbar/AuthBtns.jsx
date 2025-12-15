import { Link } from "react-router-dom";

const AuthBtns = ({ inMobile }) => {
  return (
    <div className="flex items-center gap-1">
      <Link
        to={"/login"}
        className={`${
          inMobile && "hidden"
        } capitalize inline-block py-2 px-6 rounded-md bg-mainColor text-white border border-mainColor text-sm font-medium`}
      >
        login
      </Link>
      <Link
        to={"/sign-up"}
        className={`${
          inMobile ? "w-full block text-center mt-4" : "hidden md:inline-block "
        } capitalize py-2 px-6 rounded-md bg-transparent text-mainColor border border-mainColor text-sm font-medium`}
      >
        register
      </Link>
    </div>
  );
};

export default AuthBtns;
