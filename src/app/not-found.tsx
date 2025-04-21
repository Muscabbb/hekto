import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-300">
      <h1 className="text-6xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="mt-4 text-2xl text-gray-700">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button className="shad-not-found-btn text-xl">
          Go back to the homepage
        </Button>
      </Link>
    </div>
  );
}
