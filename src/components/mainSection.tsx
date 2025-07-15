"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const MainSection = () => {
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [showContent, setShowContent] = useState(false);

  const subtitle = "Premium Furniture Collection";
  const title = "Transform Your Space with Luxury";
  const description =
    "Discover handcrafted furniture that combines timeless elegance with modern functionality. Create your perfect sanctuary.";

  const typeWriter = (
    text: string,
    setter: (text: string) => void,
    delay = 100
  ) => {
    let index = 0;
    const timer = setInterval(() => {
      setter(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, delay);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      typeWriter(subtitle, setDisplayedSubtitle, 50);
    }, 300);

    const timer2 = setTimeout(() => {
      typeWriter(title, setDisplayedTitle, 80);
    }, 800);

    const timer3 = setTimeout(() => {
      typeWriter(description, setDisplayedDescription, 30);
    }, 1200);

    const timer4 = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <section className="flex items-center justify-center px-5 md:px-0">
      <section className="flex flex-col gap-2">
        <div className="space-y-6 transition-all duration-1000 ease-out transform">
          {/* Subtitle */}
          <div>
            <p className="text-pink-500 capitalize font-medium text-xl">
              {displayedSubtitle}
              {displayedSubtitle.length < subtitle.length && (
                <span className="animate-pulse text-gray-400">|</span>
              )}
            </p>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              {displayedTitle}
              {displayedTitle.length < title.length && (
                <span className="animate-pulse text-gray-400">|</span>
              )}
            </h1>
          </div>

          {/* Description */}
          <div className="max-w-lg">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {displayedDescription}
              {displayedDescription.length < description.length && (
                <span className="animate-pulse text-gray-400">|</span>
              )}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 transition-all duration-1000 delay-1000 ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          ></div>
        </div>
      </section>
      <section className=" hidden md:flex md:w-[50%] justify-end">
        <Image
          src={
            "https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
          }
          width={500}
          height={500}
          alt="jack"
          unoptimized={true}
          className="max-w-[490px] max-h-[490px]"
        />
      </section>
    </section>
  );
};

export default MainSection;
