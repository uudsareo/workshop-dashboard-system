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
      className={`flex flex-col justify-center items-center gap-2 ${getColor()} rounded-lg p-4 w-56`}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-white text-2xl font-bold uppercase">{title}</div>
        <div className="text-white font-bold text-8xl">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
