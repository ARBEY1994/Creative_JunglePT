import React from "react";
import Image from "next/image";
import FoodImage from "../../public/Images/Plate _of_food.png";
import Icon from "./Icon";

interface Tcard {
  Title: string;
  Text: string;
  onDelete: () => void;
}

export default function Card({ Title, Text, onDelete }: Tcard) {
  return (
    <>
      <div className="relative mx-[2%]">
        <div className="h-[98px] bg-[#1B6B93] mx-auto rounded-t-3xl"></div>
        <div className="absolute left-[38%] top-[40%] ">
          <Image src={FoodImage} alt="" className="" />
        </div>
        <div className="absolute left-[87%] top-[12%] text-white cursor-pointer">
          <Icon iconName="cancel" className="text-4xl" onClick={onDelete} />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-[#164B60] font-bold text-lg text-center mx-[5%]">
          {Title}
        </h3>
        <p className="text-[#164B60] text-sm text-center mx-[5%]">{Text}</p>
      </div>
    </>
  );
}

Card.defaultProps = {
  Title: "",
  Text: "",
};
