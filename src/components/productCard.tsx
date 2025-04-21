import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { BsCart4 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { LiaSearchPlusSolid } from "react-icons/lia";

type ProductCardType = {
  imgSrc: string;
  imgAlt: string;
  productName: string;
  price: string;
  discountPrice: string;
};

const ProductCard = ({
  imgSrc,
  imgAlt,
  productName,
  price,
  discountPrice,
}: ProductCardType) => {
  return (
    <Card className="h-[206px] w-[290px] md:h-[306px] md:w-[390px]  rounded-none shadow-none border-none">
      <CardContent className="card-img h-4/5 group flex justify-center items-center bg-slate-200 relative hover:bg-white">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={200}
          height={200}
          className="md:mx-auto w-[150px] h-[150px] md:max-h-[200px]"
        />
        <div className="hidden group-hover:flex flex-col gap-2 transition absolute bottom-4 left-4 primary-text">
          <span className="p-2 rounded-full hover:text-pink-500 hover:bg-slate-400 bg-opacity-25 text-xl">
            <BsCart4 />
          </span>
          <span className="p-2 rounded-full hover:text-pink-500 hover:bg-slate-400 bg-opacity-25 text-xl">
            <CiHeart />
          </span>
          <span className="p-2 rounded-full hover:text-pink-500 hover:bg-slate-400 bg-opacity-25 text-xl">
            <LiaSearchPlusSolid />
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 font-semibold">
        <h3 className="capitalize primary-text">{productName}</h3>
        <h4 className="space-x-2">
          <span className="primary-text">${discountPrice}</span>
          <span className="line-through text-red-700">${price}</span>
        </h4>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
