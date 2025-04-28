"use client";
import io, { Socket } from "socket.io-client";
import { dispatch, useSelector } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Dashboard } from "../components/DashboardTile";
import FormProvider from "../components/Form/hook-form/FormProvider";
import ImageBg from "../../../public/images/image 1.png";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { DashboardTile } from "../constants/dashboard";
import { getAllPart } from "@/redux/slices/dashboard";
import { PartData, PartWithProject } from "@/interfaces/part";
import { getPartList, removePartById } from "@/redux/slices/part";

const DashboardPage = () => {
  const socketRef = useRef<Socket | null>(null);

  const { partData: Part } = useSelector((state) => state.dashboard);

  const [count, setCount] = useState<number>(1);
  const [current, setCurrent] = useState<PartData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(Part.length);
  const [isShowing, setIsShowing] = useState(true);
  const [partData, setPartData] = useState<PartWithProject[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [projectCount, setProjectCount] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);

  const [progress, setProgress] = useState(0);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("register-tv", "tv-lobby");
    });

    socket.on("DASHBOARD", (payload) => {
      console.log("Received payload:", payload);
      if (payload.type === "UPDATE") {
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "ADD") {
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "DELETE") {
        console.log("Deleting part with ID:", payload.data._id);
        dispatch(getAllPart(formattedDate));
      } else if (payload.type === "UNARCHIVE") {
        dispatch(getAllPart(formattedDate));
      }
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
  }, []);

  useEffect(() => {
    setPartData(Part);
    console.log("PartData", Part);
  }, [Part]);

  useEffect(() => {
    if (Part.length > 0) {
      setTotalCount(Part[0].parts.length);
      setCurrentProject(0);
      setCurrent(Part[0].parts.slice(0, count));
      setCurrentPosition(count);
    } else if (Part.length === 0) {
      setTotalCount(0);
      setCurrentProject(0);
      setCurrent([]);
      setCurrentPosition(0);
    }
  }, [Part, count]);

  const secDelay = 2500;

  // useEffect(() => {
  //   if (secDelay > 0) {
  //     setProgress(0);

  //     const increment = 100 / (secDelay / 100);
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) => {
  //         const nextProgress = prevProgress + increment;
  //         if (nextProgress >= 100) {
  //           clearInterval(timer);
  //           return 100;
  //         }
  //         return nextProgress;
  //       });
  //     }, 100);

  //     return () => clearInterval(timer);
  //   }
  // }, [secDelay, current]);

  useEffect(() => {
    if (partData.length === 0) return;
    const interval = setInterval(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const currentParts = partData[currentProject].parts;
        const startIndex = (nextPage - 1) * count;
        const endIndex = startIndex + count;

        if (startIndex >= currentParts.length) {
          const nextProjectIndex = currentProject + 1;

          if (nextProjectIndex >= partData.length) {
            // Loop back to first project
            setCurrentProject(0);
            const firstParts = partData[0].parts;
            setPage(1);
            setTotalCount(firstParts.length);
            setCurrent(firstParts.slice(0, count));
            setCurrentPosition(count);
          } else {
            // Move to next project
            const nextParts = partData[nextProjectIndex].parts;
            setCurrentProject(nextProjectIndex);
            setPage(1);
            setTotalCount(nextParts.length);
            setCurrent(nextParts.slice(0, count));
            setCurrentPosition(count);
          }

          return 1; // reset page for new project
        } else {
          setCurrent(currentParts.slice(startIndex, endIndex));
          setCurrentPosition(endIndex);
          return nextPage;
        }
      });
    }, secDelay);

    return () => clearInterval(interval);
  }, [count, currentProject, Part]);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-950">
      <div className="fixed top-1 right-0 w-52 text-right">
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            GRID CONFIGURATION
            <ChevronDownIcon className="size-4 fill-white/60" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 bg-gray-400 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {DashboardTile.map((item, idx) => (
              <MenuItem key={idx}>
                <button
                  onClick={() => setCount(item)}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                >
                  {/* <PencilIcon className="size-4 fill-white/30" /> */}
                  {item} GRID
                  <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                    ⌘E
                  </kbd>
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
      <div>
        <h1 className="text-white font-bold text-5xl text-center py-5">
          {Part.length > 0 && Part[currentProject].projectId.name} -{" "}
          {/* {Part[currentProject].projectId.name} - 04/22/2025 */}
        </h1>
      </div>
      <div
        className={`grid gap-4 p-4 ${
          count === 1 ? "grid-cols-1 place-items-center" : "grid-cols-2"
        }`}
      >
        {current.length > 0 &&
          current.map((item, idx) => (
            <Dashboard
              key={idx}
              imageSrc={ImageBg}
              locations={item.locations}
              partName={item.name}
              tagLines={item.tagLines}
              onHold={item.onHold}
              progress={progress}
            />
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;
