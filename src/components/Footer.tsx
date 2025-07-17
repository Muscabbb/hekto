import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products?category=Apparel"
                  className="hover:text-pink-500 transition-colors"
                >
                  Apparel
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Accessories"
                  className="hover:text-pink-500 transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Footwear"
                  className="hover:text-pink-500 transition-colors"
                >
                  Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Personal Care"
                  className="hover:text-pink-500 transition-colors"
                >
                  Personal Care
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hekto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
