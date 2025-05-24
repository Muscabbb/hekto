"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ProductsType } from "@/types/productsType";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/latest-products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming the API response has a 'products' key containing an array
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optionally set an error state or display a message
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container mx-auto py-8 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-6 primary-text">
        Latest Products
      </h2>
      <Carousel opts={{ loop: true }} className="max-w-full mx-auto">
        <CarouselContent className="flex gap-5 rounded-none">
          {products.map((slide) => (
            <CarouselItem
              key={slide.id} // Use product id as key for better performance
              className="flex-shrink-0 pl-1 md:basis-1/2 lg:basis-1/3 group relative"
            >
              <Link href={`/products/${slide.id}`}>
                <Card className="bg-white shadow-lg group-hover:bg-blue-700 h-[350px] max-h-[350px] flex flex-col justify-between items-center">
                  <Image
                    src={slide.image} // Use product image
                    alt={slide.productDisplayName} // Use product display name for alt text
                    width={200}
                    height={200}
                    quality={80}
                    className="mx-auto max-h-[200px] object-contain pt-2"
                    unoptimized={true} // Added unoptimized for external images if not configured in next.config.js
                  />
                  <CardContent className="p-4 relative w-full">
                    <Link href={`/products/${slide.id}`}>
                      <Button className="hidden group-hover:flex justify-center items-center transition absolute -top-12 left-[50%] -translate-x-1/2 bg-green-400 text-white text-xl text-center w-40 h-10 rounded-none z-20">
                        View Details
                      </Button>
                    </Link>

                    <h3 className="text-lg font-semibold text-center group-hover:text-white truncate">
                      {slide.productDisplayName}{" "}
                      {/* Use product display name for title */}
                    </h3>
                    {/* <p className="text-center text-gray-500 group-hover:text-white">
                        Code: {slide.code} // Assuming 'code' is not part of ProductsType based on user input
                      </p> */}
                    <p className="text-center text-blue-500 font-bold mt-2 group-hover:text-white">
                      ${slide.price.toFixed(2)} {/* Display price */}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
