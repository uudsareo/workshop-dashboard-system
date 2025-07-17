"use client";

import React, { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";

import { dispatch, useSelector } from "@/redux/store";
import { getSettings, updateSettings } from "@/redux/slices/setting";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";

const SettingPage = () => {
  const settingsData = useSelector((state) => state.settings);
  const [duration, setDuration] = useState<number>(0);
  const [gridCount, setGridCount] = useState<number>(0);

  useEffect(() => {
    if (settingsData.data) {
      setDuration(settingsData.data.setting.duration);
      setGridCount(settingsData.data.setting.gridCount);
    }
  }, [settingsData.data]);

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  const onSubmit = async () => {
    console.log("duration", duration);
    const res = await dispatch(updateSettings(duration, gridCount));
  };

  const navData = [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      isHighlighted: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="text-3xl font-bold pb-6 text-blue-900">Settings</div>
      <Breadcrumb items={navData} />
      <div className="pt-5 px-10 flex items-center gap-2">
        <div className="text-lg"></div>
      </div>
      <div className="p-5 bg-white w-full h-full rounded-lg shadow-md">
        <div className="p-5">
          <TextField
            required
            type="number"
            id="duration"
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            variant="outlined"
          />
          <TextField
            required
            id="grid"
            type="number"
            label="Grid Count"
            value={gridCount}
            onChange={(e) => setGridCount(Number(e.target.value))}
            variant="outlined"
          />
          <Button
            onClick={() => {
              onSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
