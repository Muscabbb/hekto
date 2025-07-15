"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MainSection = () => {
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [showContent, setShowContent] = useState(false);

  const subtitle = "Best Furniture For Your Castle....";
  const title = "New Furniture Collection Trends in 2025";
  const description = "Transform your living space with our premium furniture collection. Discover modern designs, timeless classics, and innovative pieces that blend comfort with style. Create the perfect ambiance for your home.";

  useEffect(() => {
    // Show content immediately and start all animations simultaneously
    setShowContent(true);
    
    // Simultaneous typewriter effects with different speeds
    let subtitleIndex = 0;
    let titleIndex = 0;
    let descIndex = 0;
    
    const subtitleTimer = setInterval(() => {
      if (subtitleIndex < subtitle.length) {
        setDisplayedSubtitle(subtitle.slice(0, subtitleIndex + 1));
        subtitleIndex++;
      } else {
        clearInterval(subtitleTimer);
      }
    }, 60);
    
    const titleTimer = setTimeout(() => {
      const titleInterval = setInterval(() => {
        if (titleIndex < title.length) {
          setDisplayedTitle(title.slice(0, titleIndex + 1));
          titleIndex++;
        } else {
          clearInterval(titleInterval);
        }
      }, 40);
    }, 200);
    
    const descTimer = setTimeout(() => {
      const descInterval = setInterval(() => {
        if (descIndex < description.length) {
          setDisplayedDescription(description.slice(0, descIndex + 1));
          descIndex++;
        } else {
          clearInterval(descInterval);
        }
      }, 25);
    }, 800);

    return () => {
      clearInterval(subtitleTimer);
      clearTimeout(titleTimer);
      clearTimeout(descTimer);
    };
  }, []);

  return (
    <section className="min-h-screen max-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-0 bg-gradient-to-br from-slate-50 via-white to-pink-50 overflow-hidden">
      {/* Content Section */}
      <div className={`flex-1 max-w-lg xl:max-w-xl text-center lg:text-left transition-all duration-1000 ease-out transform ${
        showContent 
          ? "translate-x-0 opacity-100" 
          : "-translate-x-10 opacity-0"
      }`}>
        {/* Subtitle */}
        <div className="mb-3">
          <p className="text-pink-600 font-semibold text-sm sm:text-base tracking-wide uppercase">
            {displayedSubtitle}
            {displayedSubtitle.length < subtitle.length && (
              <span className="animate-pulse text-pink-400">|</span>
            )}
          </p>
        </div>
        
        {/* Main Title */}
        <div className="mb-4">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-gray-900">
            {displayedTitle.split(" ").map((word, index) => {
              if (word === "Trends") {
                return (
                  <span key={index} className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    {word}
                  </span>
                );
              }
              if (word === "Collection") {
                return (
                  <span key={index} className="text-pink-600">
                    {word}{" "}
                  </span>
                );
              }
              return (
                <span key={index} className="inline-block mr-2">
                  {word}
                </span>
              );
            })}
            {displayedTitle.length < title.length && (
              <span className="animate-pulse text-gray-400">|</span>
            )}
          </h1>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0">
            {displayedDescription}
            {displayedDescription.length < description.length && (
              <span className="animate-pulse text-gray-400">|</span>
            )}
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start transition-all duration-1000 delay-1000 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            Shop Collection
          </button>
          <button className="px-6 py-3 border-2 border-pink-600 text-pink-600 font-semibold text-sm sm:text-base rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
            View Catalog
          </button>
        </div>
      </div>
      
      {/* Image Section */}
      <div className={`flex-1 flex justify-center items-center mt-8 lg:mt-0 transition-all duration-1000 ease-out transform ${
        showContent
          ? "translate-x-0 opacity-100 scale-100 rotate-0"
          : "translate-x-10 opacity-0 scale-90 rotate-6"
      }`}>
        <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          {/* Background decoration */}
          <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-xl lg:blur-2xl opacity-30 animate-pulse"></div>
          
          <Image
            src="https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
            width={350}
            height={350}
            alt="Premium Furniture Collection"
            unoptimized={true}
            className="relative z-10 w-full h-auto max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] object-contain transition-all duration-700 hover:scale-105 hover:rotate-2 drop-shadow-xl"
          />
          
          {/* Floating elements */}
          <div className="absolute top-4 lg:top-10 -left-3 lg:-left-6 w-12 h-12 lg:w-20 lg:h-20 bg-pink-200 rounded-full opacity-60 animate-bounce-slow"></div>
          <div className="absolute bottom-8 lg:bottom-16 -right-4 lg:-right-8 w-10 h-10 lg:w-16 lg:h-16 bg-purple-200 rounded-full opacity-40 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
