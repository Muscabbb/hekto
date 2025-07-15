"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

import Link from "next/link";
import { ProductsType } from "@/types/productsType";

export default function LatestProducts() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/latest-products`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming the API response has a 'products' key containing an array
        setProducts(data.products);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Latest Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Loading our newest collection...
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Latest Products
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-red-600 text-lg font-semibold mb-2">
                Oops! Something went wrong
              </div>
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our newest collection of premium furniture pieces designed
            to transform your space
          </p>
        </div>
        <Carousel
          opts={{
            loop: true,
            align: "start",
            skipSnaps: false,
            dragFree: false,
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Link
                    href={`/products/${product.id}`}
                    className="block group"
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 bg-white rounded-3xl group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-pink-50">
                      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 aspect-[4/3] rounded-t-3xl">
                        <Image
                          src={product.image}
                          alt={product.productDisplayName}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          unoptimized={true}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Floating action buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <button className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                            <Heart
                              size={16}
                              className="transition-transform duration-300"
                            />
                          </button>
                          <button className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                            <Eye
                              size={16}
                              className="transition-transform duration-300"
                            />
                          </button>
                          <button className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                            <ShoppingCart
                              size={16}
                              className="transition-transform duration-300"
                            />
                          </button>
                        </div>

                        {/* Category badge with glow effect */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20 group-hover:shadow-pink-500/25 transition-all duration-300">
                            {product.articleType}
                          </span>
                        </div>

                        {/* Price tag */}
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <div className="bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
                            <span className="text-lg font-bold text-pink-600">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors duration-300 leading-tight">
                            {product.productDisplayName}
                          </h3>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 transition-colors duration-300 ${
                                    i < 4
                                      ? "text-yellow-400 group-hover:text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-sm text-gray-500 ml-1 font-medium">
                                (4.8)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                              {product.baseColour}
                            </span>
                            <span className="text-sm text-gray-500">
                              {product.subCategory}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${(product.price * 1.25).toFixed(2)}
                            </span>
                          </div>

                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            20% OFF
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 bg-white/90 backdrop-blur-md border-0 shadow-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110" />
          <CarouselNext className="-right-6 bg-white/90 backdrop-blur-md border-0 shadow-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110" />
        </Carousel>
      </div>
    </div>
  );
}
