import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>

      <div className="relative z-10 py-8 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            {/* Company Info */}
            <div className="group">
              <div className="relative">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:to-purple-300 transition-all duration-300">
                  Hekto
                </h3>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
              </div>
              <p className="mb-6 text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Your one-stop shop for quality products at affordable prices.
              </p>
            </div>

            {/* Quick Links */}
            <div className="group">
              <div className="relative">
                <h3 className="text-xl font-bold mb-6 text-white group-hover:text-pink-400 transition-colors duration-300">
                  Quick Links
                </h3>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="group/link flex items-center text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-pink-500 group-hover/link:w-4 transition-all duration-300 mr-0 group-hover/link:mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="group/link flex items-center text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-pink-500 group-hover/link:w-4 transition-all duration-300 mr-0 group-hover/link:mr-2"></span>
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="group/link flex items-center text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-pink-500 group-hover/link:w-4 transition-all duration-300 mr-0 group-hover/link:mr-2"></span>
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative mt-8 pt-4">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Hekto. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-gray-400 text-sm">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
