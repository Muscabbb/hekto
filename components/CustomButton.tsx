import Image from "next/image";
import { Button } from "./ui/button";

type SubmitTypes = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

const CustomButton = ({ isLoading, className, children }: SubmitTypes) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div
          className="flex items-center gap-4
      "
        >
          <Image
            src={"/assets/icons/loader.svg"}
            alt="loader"
            width={20}
            height={20}
            className="animate-spin"
          />
          loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
