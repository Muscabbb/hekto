"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";

const MainSection = () => {
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const subtitle = "Premium Furniture Collection";
  const title = "Transform Your Space with Luxury";
  const description = "Discover handcrafted furniture that combines timeless elegance with modern functionality. Create your perfect sanctuary.";

  const typeWriter = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    delay: number = 50
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setter((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      typeWriter(subtitle, setDisplayedSubtitle, 80);
    }, 500);

    const timer2 = setTimeout(() => {
      typeWriter(title, setDisplayedTitle, 100);
    }, 800);

    const timer3 = setTimeout(() => {
      typeWriter(description, setDisplayedDescription, 30);
    }, 1200);

    const timer4 = setTimeout(() => {
      setShowContent(true);
    }, 300);

    const timer5 = setTimeout(() => {
      setShowStats(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className={`space-y-8 transition-all duration-1000 ease-out transform ${
            showContent 
              ? "translate-x-0 opacity-100" 
              : "-translate-x-10 opacity-0"
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-pink-600">
                {displayedSubtitle}
                {displayedSubtitle.length < subtitle.length && (
                  <span className="animate-pulse text-pink-400">|</span>
                )}
              </span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                {displayedTitle.split(" ").map((word, index) => {
                  if (word === "Transform") {
                    return (
                      <span key={index} className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                        {word}
                      </span>
                    );
                  }
                  if (word === "Luxury") {
                    return (
                      <span key={index} className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        {word}
                      </span>
                    );
                  }
                  return (
                    <span key={index} className="text-gray-900 mr-3">
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
            <div className="max-w-lg">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
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
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-pink-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300">
                Watch Story
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-1000 delay-1500 ${
              showStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">4.9</span>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className={`relative transition-all duration-1000 ease-out transform ${
            showContent
              ? "translate-x-0 opacity-100 scale-100 rotate-0"
              : "translate-x-10 opacity-0 scale-90 rotate-6"
          }`}>
            {/* Main Image Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-20 scale-110"></div>
              
              {/* Image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <Image
                  src="https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
                  width={500}
                  height={500}
                  alt="Premium Furniture Collection"
                  unoptimized={true}
                  className="w-full h-auto object-contain transition-all duration-700 hover:scale-105 hover:rotate-2"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce-slow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Star className="w-10 h-10 text-white fill-current" />
              </div>
              
              {/* Decorative Dots */}
              <div className="absolute top-1/4 -left-8 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 -right-8 w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
