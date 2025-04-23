import React from "react";
import { TagLineProps } from "./type";

const TagLine = ({ title, value }: TagLineProps) => {
  return (
    <div className="bg-[#424242] rounded-md">
      <div className="flex justify-between text-white font-bold px-4 py-2 text-xl">
        <div className="uppercase">{title}</div>
        <div className="uppercase">{value}</div>
      </div>
    </div>
  );
};

export default TagLine;
