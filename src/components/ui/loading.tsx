import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton" | "card";
}

export function Loading({ text = "Loading...", size = "md", variant = "spinner" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  if (variant === "spinner") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-pink-600`} />
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className="space-y-4 p-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className={`${sizeClasses[size]} animate-spin text-pink-600`} />
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}