// import Link from "next/link";
// import { BsCart4 } from "react-icons/bs";
// import { CiHeart } from "react-icons/ci";

// import { VscAccount } from "react-icons/vsc";
// import DropMenu from "./dropMenu";

// const Header = () => {
//   return (
//     <header className="shadow-md bg-white bg-opacity-50 sticky top-0 left-0">
//       <nav className="container flex justify-around items-center py-4 relative">
//         <h1 className="font-extrabold text-4xl">Hekto</h1>
//         <ul className="flex items-center space-x-5 text-xl capitalize">
//           <li className="hover:text-pink-500 cursor-pointer">home</li>
//           <li className="hover:text-pink-500 cursor-pointer">pages</li>
//           <DropMenu
//             text="products"
//             className="hover:text-pink-500 cursor-pointer capitalize"
//           />
//           <li className="hover:text-pink-500 cursor-pointer">blog</li>
//           <li className="hover:text-pink-500 cursor-pointer">shop</li>
//           <li className="hover:text-pink-500 cursor-pointer">contact</li>
//         </ul>
//         <div className="flex items-center gap-6 text-2xl ">
//           <Link href={"/"} className="hover:text-pink-500" title="wishlist">
//             <CiHeart />
//           </Link>
//           <Link href={"/"} className="hover:text-pink-500" title="cart">
//             <BsCart4 />
//           </Link>
//           <Link href={"/"} className="hover:text-pink-500" title="account">
//             <VscAccount />
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsCart4 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import DropMenu from "./dropMenu";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow-md bg-white bg-opacity-50 sticky top-0 left-0 z-50">
      <nav className="container flex justify-around items-center py-4">
        <h1 className="font-extrabold text-4xl">Hekto</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-5 text-xl capitalize">
          <li className="hover:text-pink-500 cursor-pointer">home</li>
          <li className="hover:text-pink-500 cursor-pointer">pages</li>
          <DropMenu
            text="products"
            className="hover:text-pink-500 cursor-pointer capitalize"
          />
          <li className="hover:text-pink-500 cursor-pointer">blog</li>
          <li className="hover:text-pink-500 cursor-pointer">shop</li>
          <li className="hover:text-pink-500 cursor-pointer">contact</li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center relative z-50">
          <button onClick={toggleMobileMenu} className="text-3xl">
            {isMobileMenuOpen ? <IoMdClose /> : <HiOutlineMenuAlt4 />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-40 p-6 flex flex-col space-y-6">
            <ul className="flex flex-col space-y-6 text-xl capitalize">
              <li className="hover:text-pink-500 cursor-pointer">home</li>
              <li className="hover:text-pink-500 cursor-pointer">pages</li>
              <DropMenu
                text="products"
                className="hover:text-pink-500 cursor-pointer capitalize"
              />
              <li className="hover:text-pink-500 cursor-pointer">blog</li>
              <li className="hover:text-pink-500 cursor-pointer">shop</li>
              <li className="hover:text-pink-500 cursor-pointer">contact</li>
            </ul>
          </div>
        )}

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-2xl">
          <Link href={"/"} className="hover:text-pink-500" title="wishlist">
            <CiHeart />
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
