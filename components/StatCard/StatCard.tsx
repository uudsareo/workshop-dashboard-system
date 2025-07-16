import React from "react";
import { StatCardProps } from "./type";

const StatCard = ({ title, value, color = "DEFAULT" }: StatCardProps) => {
  const getColor = () => {
    switch (color) {
      case "DEFAULT":
        return "bg-[#424242]";
      case "RED":
        return "bg-[#F00B0F]";
      default:
        return "bg-[#424242]";
    }
  };
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 ${getColor()} rounded-lg 3xl:p-4 p-1 w-full`}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-white 3xl:text-2xl text-lg font-bold uppercase">
          {title}
        </div>
        <div className="text-white font-bold 3xl:text-8xl text-4xl">
          {value}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
