"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-300">
      <h1 className="text-6xl font-bold text-gray-900">
        Something went wrong!
      </h1>
      <p className="mt-4 text-2xl text-gray-700">{error.message}</p>
      <Button onClick={() => reset()} className="text-xl">
        Try again
      </Button>
    </div>
  );
}
