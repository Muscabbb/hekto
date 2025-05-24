import Image from "next/image";
import { Button } from "./ui/button";

const MainSection = () => {
  return (
    <section className="flex items-center justify-center px-5 md:px-0">
      <section className="flex flex-col gap-3">
        <p className="text-pink-500 capitalize font-medium">
          Best Furniture For Your Castle....
        </p>
        <h2 className="font-bold text-2xl md:text-5xl leading-[1.5]">
          New Furniture Collection <br /> Trends in 2020
        </h2>
        <p className="text-dark-400 w-[400px] text-wrap text-xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          aspernatur blanditiis minus maxime voluptate excepturi nostrum
          praesentium sit totam, neque enim. Aliquam et quo, cumque facere
          placeat id magnam reiciendis.
        </p>
        <Button
          className={"bg-pink-500 text-white py-3 w-[150px] mt-5 text-center"}
        >
          Shop Now
        </Button>
      </section>
      <section className=" hidden md:flex md:w-[50%] justify-end">
        <Image
          src={
            "https://sutta7ix17.ufs.sh/f/m8ZBLSTuDwTHdRVUenWmg0hruiY87B3aslWCSOIPJ4XMbpGn"
          }
          width={1000}
          height={1000}
          alt="jack"
          unoptimized={true}
          className="max-w-[490px]"
        />
      </section>
    </section>
  );
};

export default MainSection;
