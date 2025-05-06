"use client";
import io, { Socket } from "socket.io-client";
import { dispatch, useSelector } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";

import { Dashboard } from "../components/DashboardTile";

import { DashboardTile } from "../constants/dashboard";
import { getAllPart } from "@/redux/slices/dashboard";
import { PartData, PartWithProject } from "@/interfaces/part";
import { getPartList, removePartById } from "@/redux/slices/part";
import { INotification } from "@/interfaces/notification";
import { getSettings } from "@/redux/slices/setting";
import { ISetting } from "@/interfaces/setting";
import { DefaultSetting } from "../constants/setting";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const DashboardPage = () => {
  const socketRef = useRef<Socket | null>(null);

  const { partData: Part } = useSelector((state) => state.dashboard);
  const { data: settingsData } = useSelector((state) => state.settings);

  // const [count, setCount] = useState<number>(1);
  const [current, setCurrent] = useState<PartData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(Part.length);
  const [isShowing, setIsShowing] = useState(true);
  const [partData, setPartData] = useState<PartWithProject[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [projectCount, setProjectCount] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);

  const [setting, setSetting] = useState<ISetting | null>(DefaultSetting);

  const [progress, setProgress] = useState(0);

  //----- NOTIFI
  const [immediateNotification, setImmediateNotification] =
    useState<INotification | null>();

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("connect", () => {
      socket.emit("register-tv", "tv-lobby");
    });

    socket.on("DASHBOARD", (payload) => {
      if (payload.type === "UPDATE") {
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "ADD") {
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "DELETE") {
        console.log("Deleting part with ID:", payload.data._id);
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "UNARCHIVE") {
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "SETTINGS") {
        setSetting(payload.data);
      }
    });

    socket.on("NOTIFICATION", (payload) => {
      setImmediateNotification(payload.notification);

      setTimeout(() => {
        setImmediateNotification(null);
      }, payload.notification.duration * 1000);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    dispatch(getAllPart(formattedDate));
    dispatch(getSettings());
  }, []);

  useEffect(() => {
    setPartData(Part);
  }, [Part]);

  useEffect(() => {
    if (settingsData) {
      setSetting(settingsData);
    }
  }, [settingsData]);

  useEffect(() => {
    if (Part.length > 0) {
      setTotalCount(Part[0].parts.length);
      setCurrentProject(0);
      setCurrent(Part[0].parts.slice(0, setting?.setting.gridCount ?? 1));
      setCurrentPosition(setting?.setting.gridCount ?? 1);
    } else if (Part.length === 0) {
      setTotalCount(0);
      setCurrentProject(0);
      setCurrent([]);
      setCurrentPosition(0);
    }
  }, [Part, setting?.setting.gridCount]);

  useEffect(() => {
    const durationInSeconds = setting?.setting?.duration ?? 60; // default 60 seconds

    if (durationInSeconds > 0) {
      const durationInMs = durationInSeconds * 1000;
      const intervalMs = 100; // update every 100ms
      const increment = (100 * intervalMs) / durationInMs;

      setProgress(0); // reset when duration changes

      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + increment;
          return nextProgress >= 100 ? 0 : nextProgress;
        });
      }, intervalMs);

      return () => clearInterval(timer);
    }
  }, [setting?.setting?.duration]);

  useEffect(() => {
    if (partData.length === 0) return;
    const interval = setInterval(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const currentParts = partData[currentProject].parts;
        const startIndex = (nextPage - 1) * setting?.setting.gridCount!;
        const endIndex = startIndex + setting?.setting.gridCount!;

        if (startIndex >= currentParts.length) {
          const nextProjectIndex = currentProject + 1;

          if (nextProjectIndex >= partData.length) {
            // Loop back to first project
            setCurrentProject(0);
            const firstParts = partData[0].parts;
            setPage(1);
            setTotalCount(firstParts.length);
            setCurrent(firstParts.slice(0, setting?.setting.gridCount!));
            setCurrentPosition(setting?.setting.gridCount!);
          } else {
            // Move to next project
            const nextParts = partData[nextProjectIndex].parts;
            setCurrentProject(nextProjectIndex);
            setPage(1);
            setTotalCount(nextParts.length);
            setCurrent(nextParts.slice(0, setting?.setting.gridCount!));
            setCurrentPosition(setting?.setting.gridCount!);
          }

          return 1; // reset page for new project
        } else {
          setCurrent(currentParts.slice(startIndex, endIndex));
          setCurrentPosition(endIndex);
          return nextPage;
        }
      });
    }, (setting?.setting?.duration ?? 60) * 1000);

    return () => clearInterval(interval);
  }, [setting?.setting.gridCount!, currentProject, partData, currentPosition]);

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      {immediateNotification && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-800 text-white h-screen">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <Square2StackIcon className="h-6 w-6" /> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: immediateNotification.content,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <h1 className="text-white font-bold 3xl:text-5xl text-xl text-center py-5">
          {Part.length > 0 &&
            Part[currentProject]?.projectId?.name +
              " - " +
              new Date(Part[currentProject]?.parts[0]?.createdAt ?? "")
                .toISOString()
                .split("T")[0]}
        </h1>
      </div>
      <div
        className={`grid gap-4 p-1 ${
          setting?.setting.gridCount! === 1
            ? "grid-cols-1 place-items-center"
            : "grid-cols-2"
        }`}
      >
        {current.length > 0 &&
          current.map((item, idx) => (
            <Dashboard
              key={idx}
              imageSrc={item.imagePath}
              locations={item.locations}
              partName={item.name}
              tagLines={item.tagLines}
              onHold={item.onHold}
              progress={0}
            />
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;
