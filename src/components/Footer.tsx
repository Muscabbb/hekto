import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hekto</h3>
            <p className="mb-4">
              Your one-stop shop for quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-pink-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-pink-500 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-pink-500 transition-colors"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-pink-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

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

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-pink-500" />
                <span>123 Fashion Street, Style City</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-pink-500" />
                <a
                  href="mailto:info@hekto.com"
                  className="hover:text-pink-500 transition-colors"
                >
                  info@hekto.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-pink-500" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-pink-500 transition-colors"
                >
                  +1 (234) 567-890
                </a>
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
