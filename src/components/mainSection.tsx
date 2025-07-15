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
    <section className="min-h-screen max-h-screen flex items-center justify-between px-6 md:px-12 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-pink-50 overflow-hidden">
      {/* Content Section */}
      <div className={`flex-1 max-w-2xl transition-all duration-1000 ease-out transform ${
        showContent 
          ? "translate-x-0 opacity-100" 
          : "-translate-x-10 opacity-0"
      }`}>
        {/* Subtitle */}
        <div className="mb-4">
          <p className="text-pink-600 font-semibold text-lg tracking-wide uppercase">
            {displayedSubtitle}
            {displayedSubtitle.length < subtitle.length && (
              <span className="animate-pulse text-pink-400">|</span>
            )}
          </p>
        </div>
        
        {/* Main Title */}
        <div className="mb-6">
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight text-gray-900">
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
                <span key={index} className="inline-block mr-3">
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
        <div className="mb-8">
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
            {displayedDescription}
            {displayedDescription.length < description.length && (
              <span className="animate-pulse text-gray-400">|</span>
            )}
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}>
          <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            Shop Collection
          </button>
          <button className="px-8 py-4 border-2 border-pink-600 text-pink-600 font-semibold rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
            View Catalog
          </button>
        </div>
      </div>
      
      {/* Image Section */}
      <div className={`hidden lg:flex flex-1 justify-center items-center transition-all duration-1000 ease-out transform ${
        showContent
          ? "translate-x-0 opacity-100 scale-100 rotate-0"
          : "translate-x-10 opacity-0 scale-90 rotate-6"
      }`}>
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          
          <Image
            src="https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
            width={450}
            height={450}
            alt="Premium Furniture Collection"
            unoptimized={true}
            className="relative z-10 max-w-[450px] max-h-[450px] object-contain transition-all duration-700 hover:scale-105 hover:rotate-2 drop-shadow-2xl"
          />
          
          {/* Floating elements */}
          <div className="absolute top-10 -left-6 w-20 h-20 bg-pink-200 rounded-full opacity-60 animate-bounce-slow"></div>
          <div className="absolute bottom-16 -right-8 w-16 h-16 bg-purple-200 rounded-full opacity-40 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* Mobile Image */}
      <div className={`lg:hidden absolute bottom-0 right-0 w-64 h-64 opacity-20 transition-all duration-1000 ${
        showContent ? "opacity-20" : "opacity-0"
      }`}>
        <Image
          src="https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
          fill
          alt="Furniture"
          unoptimized={true}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default MainSection;
