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
    <div className="flex bg-[#1E1D1D] p-4 gap-5">
      <div className="w-52">
        <div className="text-white font-black text-3xl w-full text-center py-2">
          {partName}
        </div>
        <div className="h-[450px] relative overflow-hidden">
          <Image src={imageSrc} alt="Image" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
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
      <div className="flex flex-col justify-between">
        <div className="bg-[#F00B0F] flex flex-col items-center px-5 py-10 rounded-lg gap-5">
          <div className="text-white font-bold text-6xl">{onHold.name}</div>
          <div className="text-white font-bold text-9xl">{onHold.value}</div>
        </div>
        <div className="pt-3 flex flex-col gap-3">
          {tagLines.map((tagLine, idx) => (
            <TagLine key={idx} name={tagLine.name} value={tagLine.value} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <div className="text-white">
          {/* {progress.toFixed(0)}% */}
          <CircularProgress
            variant="determinate"
            value={progress}
            color="error"
            size="80px"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
