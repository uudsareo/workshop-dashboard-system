import React, { useEffect, useState } from "react";
import { TagLine } from "../TagLine";
import { StatCard } from "../StatCard";
import { dashboard } from "@/app/constants/dashboard";
import Image from "next/image";
import ImageBg from "../../../../public/images/image 1.png";
import { DashboardTileProps } from "./type";
import { CircularProgress } from "@mui/material";
import { set } from "react-hook-form";

const Dashboard = ({
  partName,
  imageSrc,
  locations,
  tagLines,
  onHold,
  progress,
}: DashboardTileProps) => {
  return (
    <div className="flex bg-[#1E1D1D] 3xl:p-4 p-2 3xl:gap-5 gap-2 h-fit w-full">
      <div className="w-3/12">
        <div className="text-white font-black 3xl:text-3xl text-lg w-full text-center py-2 h-2/12">
          {partName}
        </div>
        <div className="relative overflow-hidden 3xl:pb-10 pb-1 h-10/12">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMGPATH}/${imageSrc}`}
            alt="Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 3xl:gap-4 gap-1 w-6/12">
        {locations.map((location, idx) => (
          <div key={idx}>
            <StatCard
              title={location.name}
              value={location.value}
              color={location.isHold ? "RED" : "DEFAULT"}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between w-3/12">
        <div
          className={`${
            onHold.isComplete ? "bg-green-400" : "bg-[#F00B0F]"
          } flex flex-col items-center px-5 3xl:py-10 py-5 rounded-lg gap-5 w-full`}
        >
          <div className="text-white font-bold text-3xl 3xl:text-6xl">
            {onHold.name}
          </div>
          <div className="text-white font-bold text-7xl 3xl:text-6xl">
            {onHold.value}
          </div>
        </div>
        <div className="pt-3 flex flex-col 3xl:gap-3 gap-1">
          {tagLines.map((tagLine, idx) => (
            <TagLine key={idx} name={tagLine.name} value={tagLine.value} />
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col justify-end">
        <div className="text-white">
          <CircularProgress
            variant="determinate"
            value={progress}
            color="error"
            size="80px"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
