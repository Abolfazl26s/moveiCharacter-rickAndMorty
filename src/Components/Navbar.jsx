import { HeartIcon } from "@heroicons/react/20/solid";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">logo</div>
      {children}
    </nav>
  );
};

export default Navbar;

export function Favourite({ numOfFavourite }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge rounded-full w-5 h-5 ring-1 ring-white absolute top-0 right-0">
        {numOfFavourite}
      </span>
    </button>
  );
}
