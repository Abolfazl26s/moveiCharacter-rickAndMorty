import { HeartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "../Components/Modal";
import Character from "../Components/Character";
import { TrashIcon } from "@heroicons/react/24/outline";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/1.jpeg" className="w-12 h-12 rounded-full" alt="" />
      </div>
      {children}
    </nav>
  );
};

export default Navbar;

export function Favourite({ ListOfFavourites, handelRemoveFavourite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="List of Favourites" open={isOpen} onOpen={setIsOpen}>
        {ListOfFavourites.length === 0 && (
          <p className="text-white font-bold">No interests registered.</p>
        )}
        {ListOfFavourites.map((item, index) => (
          <Character key={index + 1} item={item}>
            <button
              onClick={() => handelRemoveFavourite(item.id)}
              className="icon red"
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button onClick={() => setIsOpen((is) => !is)} className="heart">
        <HeartIcon className="icon" />
        <span className="badge rounded-full w-5 h-5 ring-1 ring-white absolute top-0 right-0">
          {ListOfFavourites.length}
        </span>
      </button>
    </>
  );
}
