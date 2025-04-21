import { cn } from "@/lib/utils";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Link from "next/link";

const men = ["T-Shirts", "Jackets", "Jeans", "Shoes"];

const women = ["Dresses", "Tops", "Skirts", "Handbags", "Shoes"];

const kids = ["T-Shirts", "Pants", "Jackets", "Shoes", "Dresses"];

const footwear = ["Men's Footwear", "Women's Footwear", "Kids' Footwear"];

export default function DropMenu({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverButton
        className={cn(
          "inline-flex items-center gap-x-1 outline-none active:outline-none",
          className
        )}
      >
        <span>{text}</span>
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto flex  gap-6 flex-wrap py-5 px-2 bg-white *:bg-opacity-50">
          <div>
            <h3 className="text-2xl font-bold uppercase">men</h3>
            <ul className="mt-2 text-gray-600">
              {men.map((item, index) => (
                <li
                  key={index}
                  className="mt-3 hover:text-pink-500 cursor-pointer"
                >
                  <Link href={`products/men/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold uppercase">women</h3>
            <ul className="mt-2 text-gray-600">
              {women.map((item, index) => (
                <li
                  key={index}
                  className="mt-3 hover:text-pink-500 cursor-pointer"
                >
                  <Link href={`products/women/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold uppercase">kids</h3>
            <ul className="mt-2 text-gray-600">
              {kids.map((item, index) => (
                <li
                  key={index}
                  className="mt-3 hover:text-pink-500 cursor-pointer"
                >
                  <Link href={`products/kids/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold uppercase">footwear</h3>
            <ul className="mt-2 text-gray-600">
              {footwear.map((item, index) => (
                <li
                  key={index}
                  className="mt-3 hover:text-pink-500 cursor-pointer"
                >
                  <Link href={`products/footwear/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
