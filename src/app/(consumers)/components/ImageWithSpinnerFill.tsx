"use client";

import { useState } from "react";
import Image from "next/image";
import { CompactSpinner } from "./LoadingSpinner";

interface ImageWithSpinnerFillProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  containerClassName?: string;
}

export default function ImageWithSpinnerFill({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  containerClassName = "",
}: ImageWithSpinnerFillProps) {
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
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-md">
          <CompactSpinner size="md" />
        </div>
      )}
      
      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md">
          <div className="text-2xl mb-2">📷</div>
          <span className="text-sm">No Image</span>
        </div>
      ) : (
        /* Actual image */
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
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