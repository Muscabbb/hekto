import Link from "next/link";
import { BsCart4, BsHandbag } from "react-icons/bs";

import { VscAccount } from "react-icons/vsc";
import DropMenu from "./dropMenu";

const Header = () => {
  return (
    <header className="shadow-md bg-white bg-opacity-50 sticky top-0 left-0">
      <nav className="container flex justify-around items-center py-4 relative">
        <h1 className="font-extrabold text-4xl">Hekto</h1>
        <ul className="flex items-center space-x-5 text-xl capitalize">
          <li className="hover:text-pink-500 cursor-pointer">home</li>
          <li className="hover:text-pink-500 cursor-pointer">pages</li>
          <DropMenu
            text="products"
            className="hover:text-pink-500 cursor-pointer"
          />
          <li className="hover:text-pink-500 cursor-pointer">blog</li>
          <li className="hover:text-pink-500 cursor-pointer">shop</li>
          <li className="hover:text-pink-500 cursor-pointer">contact</li>
        </ul>
        <div className="flex items-center gap-6 text-2xl ">
          <Link href={"/"} className="hover:text-pink-500" title="wishlist">
            <BsHandbag />
          </Link>
          <Link href={"/"} className="hover:text-pink-500" title="cart">
            <BsCart4 />
          </Link>
          <Link href={"/"} className="hover:text-pink-500" title="account">
            <VscAccount />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
