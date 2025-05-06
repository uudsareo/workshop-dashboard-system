"use client";
import { dispatch, useSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";

import { archivePart, getPartList } from "@/redux/slices/part";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Checkbox from "@mui/material/Checkbox";
import { PartData } from "@/interfaces/part";
import dayjs from "dayjs";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PartList = () => {
  const [date, setDate] = useState<string | null>();
  const [isActive, setIsActive] = useState<PartData | null>();
  const { data } = useSelector((state) => state.partData);
  const router = useRouter();

  useEffect(() => {
    if (date) {
      dispatch(getPartList(date));
    } else {
      dispatch(getPartList(dayjs().format("YYYY-MM-DD")));
    }
  }, [date]);

  useEffect(() => {
    if (isActive?._id) {
      (async () => {
        if (isActive?._id) {
          const res = await dispatch(
            archivePart(isActive._id, isActive.isActive ? false : true)
          );
          if (res?.status === 200) {
            const date = new Date();
            dispatch(getPartList(date.toISOString().split("T")[0]));
          }
        }
      })();
    }
  }, [isActive]);

  return (
    <div className="bg-white min-h-screen">
      <div className="pt-5 px-10 flex items-center gap-2">
        <div className="text-lg">Filter By Date</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs()}
            label="Pick a date"
            onChange={(date) => {
              setDate(date ? date.format("YYYY-MM-DD") : null);
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="p-10">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Project
                </th>
                <th scope="col" className="px-6 py-3">
                  Part Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((part) => (
                <tr
                  key={part._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {part.projectId.name}
                  </th>
                  <td className="px-6 py-4">{part.name}</td>
                  <td className="px-6 py-4">
                    <Checkbox
                      {...label}
                      checked={part.isActive ? true : false}
                      size="small"
                      onClick={() => {
                        setIsActive(part);
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/list/${part._id}`)}
                    >
                      <Bars3Icon className="h-6 w-6 text-blue-800 hover:text-blue-950 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartList;
