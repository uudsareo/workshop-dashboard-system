"use client";
import {
  createProject,
  getProjects,
  resetSelectedProject,
  setSelectedProject,
  updateProject,
} from "@/redux/slices/project";
import { dispatch, useSelector } from "@/redux/store";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import MyModal from "../../../../components/Modal/Modal";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../../../../components/Form/hook-form/InputText";
import FormProvider from "../../../../components/Form/hook-form/FormProvider";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../../components/Loader/Loader";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { TableData, TableRow } from "../../../../components/Table";
import { current } from "@reduxjs/toolkit";
import { project } from "@/interfaces/project";

const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState<project[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { data, selectedProject, isLoading } = useSelector(
    (state) => state.project
  );

  type ProjectData = {
    _id?: string;
    name: string;
  };

  const partDataSchema: Yup.ObjectSchema<ProjectData> = Yup.object().shape({
    _id: Yup.string().optional(),
    name: Yup.string().required(),
  });

  const methods = useForm<ProjectData>({
    resolver: yupResolver(partDataSchema),
  });

  const { handleSubmit, control, reset, setValue } = methods;

  const onSubmit = async (formData: ProjectData) => {
    if (selectedProject?._id) {
      const res = await dispatch(
        updateProject(selectedProject._id, formData.name)
      );
      reset({
        _id: "",
        name: "",
      });

      if (res?.status == 200) {
        toast.success("Part Updated successfully!");
        setOpen(false);
        dispatch(resetSelectedProject());
      }
    } else {
      const res = await dispatch(createProject(formData.name));
      reset({
        _id: "",
        name: "",
      });
      if (res?.status === 200) {
        toast.success("Part inserted successfully!");
        setOpen(false);
        dispatch(resetSelectedProject());
      }
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      await dispatch(getProjects());
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (data) {
      const pageSize = 5;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setProjectData(data.slice(startIndex, endIndex));
    }
  }, [data, currentPage]);

  useEffect(() => {
    if (selectedProject) {
      reset({
        _id: selectedProject._id,
        name: selectedProject.name,
      });
    }
  }, [selectedProject]);

  const navData = [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Projects",
      href: "/admin/project",
      isHighlighted: true,
    },
  ];

  return (
    <div className="">
      <div className="text-3xl font-bold pb-6 text-blue-900">Projects</div>
      <Breadcrumb items={navData} />
      <ToastContainer />
      {isLoading && <Loader />}
      <MyModal
        isOpen={selectedProject != null || open}
        closeModal={() => {
          dispatch(resetSelectedProject());
          setOpen(false);
        }}
      >
        <div className="bg-white rounded-md py-4 px-2">
          <FormProvider
            className="space-y-6"
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <InputText
                size="small"
                type="text"
                label="Project Name"
                name="name"
                control={control}
                required
                fullWidth
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {selectedProject?._id ? "Update Project" : "Add Project"}
            </button>
          </FormProvider>
        </div>
      </MyModal>
      <button
        type="button"
        onClick={() => {
          dispatch(resetSelectedProject());
          setOpen(true);
          reset({
            _id: "",
            name: "",
          });
        }}
        className="fixed bottom-8 right-8 z-50 flex flex-col items-center"
      >
        <PlusCircleIcon className="size-14 text-blue-800 hover:text-blue-950 cursor-pointer" />
        <span className="sr-only">Add Project</span>
      </button>
      <div className="p-10">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {projectData &&
                projectData?.length > 0 &&
                projectData?.map((project) => (
                  <TableRow key={project._id}>
                    <TableData>{project._id}</TableData>
                    <TableData>{project.name}</TableData>
                    <TableData>
                      <div className="flex item-center justify-center">
                        <button
                          className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                          onClick={() => dispatch(setSelectedProject(project))}
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
                        <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-sm text-gray-700">
              {data && data.length > 0 ? (
                <>
                  Showing {(currentPage - 1) * 5 + 1} to{" "}
                  {Math.min(currentPage * 5, data.length)} of {data.length}{" "}
                  entries
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
        {/* <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((project) => (
                <tr
                  key={project._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {project._id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {project.name}
                  </th>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => dispatch(setSelectedProject(project))}
                    >
                      <Bars3Icon className="h-6 w-6 text-blue-800 hover:text-blue-950 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectPage;
