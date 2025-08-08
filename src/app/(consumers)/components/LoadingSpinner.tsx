"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  className = "",
  text = "Loading..."
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      {/* Animated spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className={cn(
          "animate-spin rounded-full border-4 border-gray-200",
          sizeClasses[size]
        )}>
          <div className={cn(
            "absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin",
            "[animation-duration:1.5s]"
          )}></div>
        </div>
        
        {/* Inner pulsing dot */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center"
        )}>
          <div className={cn(
            "rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse",
            size === "sm" ? "w-1.5 h-1.5" :
            size === "md" ? "w-2 h-2" :
            size === "lg" ? "w-3 h-3" : "w-4 h-4"
          )}></div>
        </div>
      </div>
      
      {/* Loading text */}
      {text && (
        <p className={cn(
          "text-gray-600 font-medium animate-pulse",
          size === "sm" ? "text-xs" :
          size === "md" ? "text-sm" :
          size === "lg" ? "text-base" : "text-lg"
        )}>
          {text}
        </p>
      )}
      
      {/* Floating dots animation */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-bounce",
              size === "sm" ? "w-1 h-1" :
              size === "md" ? "w-1.5 h-1.5" :
              size === "lg" ? "w-2 h-2" : "w-2.5 h-2.5"
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s"
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

// Compact version for small spaces
export function CompactSpinner({ 
  size = "sm", 
  className = "" 
}: { size?: "sm" | "md"; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-200 border-t-blue-500",
        size === "sm" ? "w-4 h-4" : "w-6 h-6"
      )}></div>
    </div>
  );
}