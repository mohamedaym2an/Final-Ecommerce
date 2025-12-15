import { CgCloseR } from "react-icons/cg";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
import { IoLogOutOutline } from "react-icons/io5";
import AuthBtns from "./AuthBtns";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slice/userSlice";

const MobileNavbar = ({ close, isOpen, user }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed inset-0 w-full h-full z-40 bg-fixedNavOverlay md:hidden transition-all duration-0 opacity-100 ${
        !isOpen && "hidden opacity-0 -z-40"
      }`}
      onClick={close}
    >
      <div
        className={`fixed left-0 top-0 bottom-0 bg-white py-5 px-4 max-w-full w-80 transition-all duration-500 ${
          isOpen ? "left-0" : "-left-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-7">
          <Logo />
          <button className="text-xl text-gray-500" onClick={close}>
            <CgCloseR />
          </button>
        </div>

        <Navlinks close={close} />

        {user ? (
          <button
            onClick={() => dispatch(removeUser())}
            className="mt-7 w-full h-10 flex items-center justify-center gap-2 bg-rose-500 text-white rounded-lg font-medium capitalize"
          >
            <IoLogOutOutline /> logout
          </button>
        ) : (
          <AuthBtns inMobile />
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
