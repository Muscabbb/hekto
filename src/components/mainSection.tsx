import Image from "next/image";

const MainSection = () => {
  return (
    <section className="flex items-center justify-center px-5 md:px-0">
      <section className="flex flex-col gap-3">
        <p className="text-pink-500 capitalize font-medium">
          Best Furniture For Your Castle....
        </p>
        <h2 className="font-bold text-2xl md:text-5xl leading-[1.5]">
          New Furniture Collection <br /> Trends in 2025
        </h2>
        <p className="text-dark-400 w-[400px] text-wrap text-xl leading-relaxed">
          Find your next favorite outfit with styles made for real life. Whether{" "}
          {"you're"} dressing up or keeping it casual, our collection of
          clothing and accessories makes it easy to look and feel good. Explore
          fresh arrivals, seasonal picks, and everyday pieces that fit your
          vibe.{" "}
        </p>
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
