"use client";
import React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PunchOfImages } from "@/Constants/indext";

export default function FeaturedProducts() {
  return (
    <div className="container mx-auto py-8 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-6 primary-text">
        Featured Products
      </h2>
      <Carousel
        opts={{ loop: true }}
        className="max-w-full mx-auto"
      >
        <CarouselContent className="flex gap-5 rounded-none">
          {PunchOfImages.map((slide, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 pl-1 md:basis-1/2 lg:basis-1/3 cursor-pointer group relative"
            >
              <div className="hidden group-hover:flex items-center gap-2 transition absolute top-4 left-2 text-cyan-500">
                <span className="p-3 rounded-full hover:text-pink-500 hover:bg-slate-400 bg-opacity-25 text-xl">
                  <ShoppingCart />
                </span>
                <span className="p-3 rounded-full hover:text-pink-500 hover:bg-slate-400 bg-opacity-25 text-xl">
                  <Heart />
                </span>
                <span className="p-3 rounded-full hover:text-pink-500 hover:bg-slate-400 bg-opacity-25 text-xl">
                  <Search />
                </span>
              </div>
              <Card className="bg-white shadow-lg group-hover:bg-blue-700 h-[350px] max-h-[350px] flex flex-col justify-between items-center">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={200}
                  height={200}
                  quality={80}
                  className="mx-auto max-h-[200px]"
                />
                <CardContent className="p-4 relative">
                  <Link href={""}>
                    <Button className="hidden group-hover:flex justify-center items-center transition absolute -top-12 left-[50%] -translate-x-2/4 bg-green-400 text-white text-xl text-center w-40 h-10 rounded-none">
                      View Details
                    </Button>
                  </Link>

                  <h3 className="text-lg font-semibold text-center group-hover:text-white">
                    {slide.title}
                  </h3>
                  <p className="text-center text-gray-500 group-hover:text-white">
                    Code: {slide.code}
                  </p>
                  <p className="text-center text-blue-500 font-bold mt-2 group-hover:text-white">
                    {slide.price}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
