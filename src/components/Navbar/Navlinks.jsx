import { NavLink } from "react-router-dom";

const links = [
  { title: "home", url: "/" },
  { title: "cart", url: "/cart" },
  { title: "wish list", url: "/wishlist" },
  { title: "products", url: "/products" },
  { title: "categories", url: "/categories" },
  { title: "brands", url: "/brands" },
];

const Navlinks = ({ close }) => {
  return (
    <ul className="flex items-start md:items-center gap-3 md:gap-6 flex-col md:flex-row">
      {links.map((link) => (
        <li key={link.url} className="w-full md:w-fit">
          <NavLink
            to={link.url}
            className="capitalize md:hover:text-mainColor inline-block w-full md:w-fit py-1 px-4 md:p-0 text-lg rounded-full"
            onClick={close}
          >
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navlinks;
