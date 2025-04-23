"use client";
import { useSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
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
import { dashboard, DashboardTile } from "../constants/dashboard";

const index = () => {
  const [count, setCount] = useState<number>(1);
  const [current, setCurrent] = useState<typeof dashboard>([dashboard[0]]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(dashboard.length);
  const [isShowing, setIsShowing] = useState(true);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrent(dashboard.slice(0, Math.max(0, count)));
  }, [count]);


  const secDelay = 2500;



  useEffect(() => {
    if (secDelay > 0) {
      setProgress(0);
  
      const increment = 100 / (secDelay / 100); 
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + increment;
          if (nextProgress >= 100) {
            clearInterval(timer); 
            return 100;
          }
          return nextProgress;
        });
      }, 100);
  
      return () => clearInterval(timer);
    }
  }, [secDelay, current]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const startIndex = (nextPage - 1) * count;
        const endIndex = startIndex + count;

        if (startIndex >= dashboard.length) {
          setPage(1);
          setCurrent(dashboard.slice(0, count));
          return 1;
        }
        setCurrent(dashboard.slice(startIndex, endIndex));
        return nextPage;
      });
    }, secDelay);
    setTotalCount(dashboard.length);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-600">
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
      <div className="grid grid-cols-2 gap-4 p-4">
        {current.map((item, idx) => (
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

export default index;
