"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MainSection = () => {
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [showImage, setShowImage] = useState(false);

  const subtitle = "Best Furniture For Your Castle....";
  const title = "New Furniture Collection Trends in 2025";
  const description = "Find your next favorite outfit with styles made for real life. Whether you're dressing up or keeping it casual, our collection of clothing and accessories makes it easy to look and feel good. Explore fresh arrivals, seasonal picks, and everyday pieces that fit your vibe.";

  useEffect(() => {
    // Typewriter effect for subtitle
    let subtitleIndex = 0;
    const subtitleTimer = setInterval(() => {
      if (subtitleIndex < subtitle.length) {
        setDisplayedSubtitle(subtitle.slice(0, subtitleIndex + 1));
        subtitleIndex++;
      } else {
        clearInterval(subtitleTimer);
        // Start title animation after subtitle completes
        let titleIndex = 0;
        const titleTimer = setInterval(() => {
          if (titleIndex < title.length) {
            setDisplayedTitle(title.slice(0, titleIndex + 1));
            titleIndex++;
          } else {
            clearInterval(titleTimer);
            // Start description animation after title completes
            let descIndex = 0;
            const descTimer = setInterval(() => {
              if (descIndex < description.length) {
                setDisplayedDescription(description.slice(0, descIndex + 1));
                descIndex++;
              } else {
                clearInterval(descTimer);
                // Show image with animation after all text is complete
                setTimeout(() => setShowImage(true), 300);
              }
            }, 20);
          }
        }, 50);
      }
    }, 80);

    return () => {
      clearInterval(subtitleTimer);
    };
  }, []);

  return (
    <section className="flex items-center justify-center px-5 md:px-0">
      <section className="flex flex-col gap-3">
        <p className="text-pink-500 capitalize font-medium min-h-[24px]">
          {displayedSubtitle}
          <span className="animate-pulse">|</span>
        </p>
        <h2 className="font-bold text-2xl md:text-5xl leading-[1.5] min-h-[120px] md:min-h-[240px]">
          {displayedTitle.split(" ").map((word, index) => {
            if (word === "Trends") {
              return (
                <span key={index}>
                  <br className="hidden md:block" />
                  {word}{" "}
                </span>
              );
            }
            return word + " ";
          })}
          {displayedTitle.length < title.length && (
            <span className="animate-pulse">|</span>
          )}
        </h2>
        <p className="text-dark-400 w-[400px] text-wrap text-xl leading-relaxed min-h-[200px]">
          {displayedDescription}
          {displayedDescription.length < description.length && (
            <span className="animate-pulse">|</span>
          )}
        </p>
      </section>
      <section className="hidden md:flex md:w-[50%] justify-end">
        <div
          className={`transition-all duration-1000 ease-out transform ${
            showImage
              ? "translate-x-0 opacity-100 scale-100 rotate-0"
              : "translate-x-20 opacity-0 scale-75 rotate-12"
          }`}
        >
          <Image
            src={
              "https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
            }
            width={500}
            height={500}
            alt="Furniture Collection"
            unoptimized={true}
            className={`max-w-[490px] max-h-[490px] transition-all duration-1000 hover:scale-105 hover:rotate-2 ${
              showImage ? "animate-bounce-slow" : ""
            }`}
          />
        </div>
      </section>
    </section>
  );
};

export default MainSection;
