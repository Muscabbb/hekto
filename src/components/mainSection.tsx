import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";

const MainSection = () => {
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [displayedStat1, setDisplayedStat1] = useState("");
  const [displayedStat2, setDisplayedStat2] = useState("");
  const [displayedStat3, setDisplayedStat3] = useState("");

  const subtitle = "Premium Furniture Collection";
  const title = "Transform Your Space with Luxury";
  const description =
    "Discover handcrafted furniture that combines timeless elegance with modern functionality. Create your perfect sanctuary.";
  const stat1 = "10K+";
  const stat2 = "500+";
  const stat3 = "4.9";

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

    const timer5 = setTimeout(() => {
      setShowStats(true);
      typeWriter(stat1, setDisplayedStat1, 150);
    }, 2000);

    const timer6 = setTimeout(() => {
      typeWriter(stat2, setDisplayedStat2, 150);
    }, 2300);

    const timer7 = setTimeout(() => {
      typeWriter(stat3, setDisplayedStat3, 150);
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
    };
  }, []);

  return (
    <section className="flex items-center justify-center px-5 md:px-0">
      <section className="flex flex-col gap-2">
        <div className="space-y-6 transition-all duration-1000 ease-out transform">
          {/* Subtitle */}
          <div>
            <p className="text-pink-500 capitalize font-medium text-sm">
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
          >
            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-sm rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold text-sm rounded-2xl hover:border-pink-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300">
              Watch Story
            </button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-4 pt-4 transition-all duration-1000 delay-1500 ${
              showStats
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">
                {displayedStat1}
                {displayedStat1.length < stat1.length && (
                  <span className="animate-pulse text-gray-400">|</span>
                )}
              </div>
              <div className="text-xs text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">
                {displayedStat2}
                {displayedStat2.length < stat2.length && (
                  <span className="animate-pulse text-gray-400">|</span>
                )}
              </div>
              <div className="text-xs text-gray-600">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  {displayedStat3}
                  {displayedStat3.length < stat3.length && (
                    <span className="animate-pulse text-gray-400">|</span>
                  )}
                </span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
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
