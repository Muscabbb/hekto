"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import AdminLink from "@/components/AdminLink";

const ClientNavBar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full h-16 md:h-20 shadow-md bg-background z-50 transition-all duration-300">
      <nav className="flex container h-full justify-between items-center px-4 md:px-6">
        <Link
          href={"/"}
          className="text-xl font-bold text-pink-600 transition-colors hover:text-pink-700"
        >
          HEKTO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <SignedIn>
            <AdminLink />
            <Link
              href="/products"
              className="font-medium hover:text-pink-600 transition-colors"
            >
              Search Products
            </Link>
            <Link
              href="/recommendations"
              className="font-medium hover:text-pink-600 transition-colors"
            >
              Recommendation
            </Link>
            <Link
              href="/cart"
              className="font-medium hover:text-pink-600 transition-colors flex items-center gap-1"
            >
              <ShoppingCart size={20} />
              Cart
            </Link>
            <div className="size-10 ml-2">
              <UserButton
                afterSignOutUrl={pathname}
                appearance={{
                  elements: {
                    userButtonAvatarBox: { width: "100%", height: "100%" },
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-6">
              <Link
                href="/products"
                className="font-medium hover:text-pink-600 transition-colors"
              >
                Search Products
              </Link>
              <Link
                href="/recommendations"
                className="font-medium hover:text-pink-600 transition-colors"
              >
                Recommendation
              </Link>
              <Link
                href="/cart"
                className="font-medium hover:text-pink-600 transition-colors flex items-center gap-1"
              >
                <ShoppingCart size={20} />
                Cart
              </Link>
              <Button
                asChild
                variant={"outline"}
                className="border-pink-600 text-pink-600 hover:bg-pink-50 transition-colors"
              >
                <SignInButton />
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu Toggle Button */}
        <label
          htmlFor="mobile-menu-toggle"
          className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600 focus:outline-none cursor-pointer"
        >
          <Menu size={24} className="peer-checked/menu:hidden" />
          <X size={24} className="hidden peer-checked/menu:block" />
        </label>
      </nav>

      {/* Mobile Navigation */}
      <input
        type="checkbox"
        id="mobile-menu-toggle"
        className="hidden peer/menu"
      />
      <div className="md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out max-h-0 overflow-hidden peer-checked/menu:max-h-screen peer-checked/menu:py-4">
        <div className="container px-4 flex flex-col space-y-4">
          <SignedIn>
            <AdminLink />
            <Link
              href="/products"
              className="font-medium py-2 hover:text-pink-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="font-medium py-2 hover:text-pink-600 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Cart
            </Link>

            <Link href="/recommendations" className="hover:text-pink-500">
              Recommendations
            </Link>
            <div className="size-10 ml-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: { width: "100%", height: "100%" },
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                href="/products"
                className="font-medium hover:text-pink-600 transition-colors"
              >
                Search Products
              </Link>
              <Link
                href="/recommendations"
                className="font-medium hover:text-pink-600 transition-colors"
              >
                Recommendation
              </Link>
              <Link
                href="/cart"
                className="font-medium hover:text-pink-600 transition-colors flex items-center gap-1"
              >
                <ShoppingCart size={20} />
                Cart
              </Link>
              <Button
                asChild
                variant={"default"}
                className="w-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
              >
                <SignUpButton />
              </Button>

              <Button
                asChild
                variant={"outline"}
                className="w-full border-pink-600 text-pink-600 hover:bg-pink-50 transition-colors"
              >
                <SignInButton />
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default ClientNavBar;
