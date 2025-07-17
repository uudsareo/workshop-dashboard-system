"use client";
import { dispatch, useSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";

import { archivePart, getPartList } from "@/redux/slices/part";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Checkbox from "@mui/material/Checkbox";
import { PartData } from "@/interfaces/part";
import dayjs from "dayjs";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import { IOSSwitch } from "@/styles/styles";
import { TableData, TableRow } from "../../../../components/Table";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PartList = () => {
  const [isActive, setIsActive] = useState<PartData | null>();
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");

  const [filteredParttData, setFilteredPartData] = useState<PartData[] | null>(
    null
  );
  const [parttData, setPartData] = useState<PartData[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterActive, setFilterActive] = useState<boolean>(true);
  const { data, isLoading } = useSelector((state) => state.partData);
  const router = useRouter();

  useEffect(() => {
    dispatch(getPartList(null));
  }, []);

  useEffect(() => {
    // const filteredData = filterActive
    //   ? data?.filter((part) => part.isActive) ?? null
    //   : data?.filter((part) => !part.isActive) ?? null;

    // setFilteredPartData(filteredData);
    if (data) {
      let filteredData: PartData[] | null = null;

      if (filter === "Active") {
        filteredData = data.filter((part) => part.isActive);
      } else if (filter === "Inactive") {
        filteredData = data.filter((part) => !part.isActive);
      } else {
        filteredData = data;
      }

      setFilteredPartData(filteredData);
    }
  }, [data, filter]);

  useEffect(() => {
    if (filteredParttData && filteredParttData?.length > 0) {
      const startIndex = (currentPage - 1) * 5;
      const endIndex = startIndex + 5;
      setPartData(filteredParttData?.slice(startIndex, endIndex));
    }
  }, [filteredParttData, currentPage]);

  useEffect(() => {
    if (isActive?._id) {
      (async () => {
        if (isActive?._id) {
          const res = await dispatch(
            archivePart(isActive._id, isActive.isActive ? false : true)
          );
          if (res?.status === 200) {
            dispatch(getPartList(null));
          }
        }
      })();
    }
  }, [isActive]);

  const navData = [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Parts List",
      href: "/admin/list",
      isHighlighted: true,
    },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as "All" | "Active" | "Inactive");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold pb-6 text-blue-900">Part List</div>
      <Breadcrumb items={navData} />
      <div className="pt-5 px-10 flex items-center gap-2">
        <div className="text-lg"></div>
      </div>
      <div className="p-10 ">
        <div className="relative overflow-x-auto">
          <div className="pl-5 flex justify-between items-center">
            <Box sx={{ maxWidth: 150, minWidth: 150, paddingY: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter Parts
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="Filter"
                  onChange={handleChange}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <button
              onClick={() => router.push("/admin/insert")}
              className="cursor-pointer h-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Add New Part
              </span>
            </button>
          </div>
          <div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Project</th>
                    <th className="py-3 px-6 text-left">Part Name</th>
                    <th className="py-3 px-6 text-left">Status</th>

                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {parttData &&
                    parttData?.length > 0 &&
                    parttData?.map((part) => (
                      <TableRow key={part._id}>
                        <TableData>{part._id}</TableData>
                        <TableData>{part.projectId.name}</TableData>
                        <TableData>{part.name}</TableData>

                        <TableData>
                          {part.isActive ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">
                              ACTIVE
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-red-400 border border-red-400">
                              INACTIVE
                            </span>
                          )}
                        </TableData>
                        <TableData>
                          <div className="flex item-center justify-center">
                            <Switch
                              {...label}
                              checked={part.isActive}
                              onClick={() => setIsActive(part)}
                            />
                            <button
                              onClick={() =>
                                router.push(`/admin/list/${part._id}`)
                              }
                              className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </TableData>
                      </TableRow>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div>
              <span className="text-sm text-gray-700">
                {filteredParttData && filteredParttData.length > 0 ? (
                  <>
                    Showing {(currentPage - 1) * 5 + 1} to{" "}
                    {Math.min(currentPage * 5, filteredParttData.length)} of{" "}
                    {filteredParttData.length} entries
                  </>
                ) : (
                  "No entries"
                )}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                Previous
              </button>

              <button
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50"
                onClick={() => {
                  if (currentPage < (data?.length ?? 0)) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                Next
              </button>
            </div>
          </div>
          {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              {partData?.map((part) => (
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
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/list/${part._id}`)}
                    >
                      <PencilIcon className="h-6 w-6 text-blue-800 hover:text-blue-950 cursor-pointer" />
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/list/${part._id}`)}
                    >
                      <TrashIcon className="h-6 w-6 text-red-600 hover:text-blue-950 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
        {isLoading && (
          <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartList;
