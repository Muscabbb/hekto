"use client";

import { useState } from "react";
import Image from "next/image";
import { CompactSpinner } from "./LoadingSpinner";

interface ImageWithSpinnerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
}

export default function ImageWithSpinner({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
}: ImageWithSpinnerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Loading spinner overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <CompactSpinner size="md" />
        </div>
      )}
      
      {/* Error state */}
      {hasError ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500 text-sm rounded-lg">
          <div className="text-2xl mb-2">📷</div>
          <span>No Image Available</span>
        </div>
      ) : (
        /* Actual image */
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={true}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        />
      )}
    </div>
  );
}