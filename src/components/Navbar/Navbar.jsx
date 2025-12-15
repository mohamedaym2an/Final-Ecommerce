import { useEffect, useState } from "react";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";
import NavInfo from "./NavInfo";
import Navlinks from "./Navlinks";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  const [isOpen, setIsOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  const openNavbar = () => {
    setIsOpen(true);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const checkShadow = () => {
    if (window.scrollY > 50) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  window.addEventListener("scroll", () => {
    checkShadow();
  });

  useEffect(() => {
    checkShadow();
  }, [user]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full py-6 bg-white z-30 ${
        shadow && "shadow-md"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <Navlinks />
            </div>
            <NavInfo user={user} open={openNavbar} />
          </div>
          <MobileNavbar close={closeNavbar} isOpen={isOpen} user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
