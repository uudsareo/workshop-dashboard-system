import React from "react";
import { TagLineProps } from "./type";
import { TagLine } from "@/interfaces/part";

const Tag_Line = ({ name, value }: TagLine) => {
  return (
    <div className="bg-[#424242] rounded-md">
      <div className="flex justify-between text-white font-bold px-4 py-2 text-xl">
        <div className="uppercase">{name}</div>
        <div className="uppercase">{value}</div>
      </div>
    </div>
  );
};

export default Tag_Line;
