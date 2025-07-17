"use client";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../../../components/Form/hook-form/FormProvider";
import InputText from "../../../../components/Form/hook-form/InputText";
import { dispatch, useSelector } from "@/redux/store";
import { getProjects } from "@/redux/slices/project";
import SelectDropdown from "../../../../components/Form/hook-form/InputSelect";
import { project } from "@/interfaces/project";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { insertPart, resetPartData } from "@/redux/slices/part";
import { ToastContainer, toast } from "react-toastify";
import { locations, tagLines } from "@/app/constants/dashboard";
import { Box, CircularProgress } from "@mui/material";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Insert = () => {
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<number[]>([]);

  const { data } = useSelector((state) => state.project);
  const part = useSelector((state) => state.partData);

  type PartData = {
    name: string;
    projectId: string;
    locations: {
      name: string;
      value: string;
      isHold?: boolean;
    }[];
    onHold: {
      name: string;
      value: string | number;
      isComplete?: boolean;
    };
    tagLines: {
      name: string;
      value: string | number;
    }[];
  };

  const partDataSchema = Yup.object({
    name: Yup.string().required(),

    projectId: Yup.string().required(),

    locations: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required(),
          value: Yup.string().required(),
          isHold: Yup.boolean().optional(),
        })
      )
      .required(),

    onHold: Yup.object({
      name: Yup.string().required().default("On Hold"),
      value: Yup.mixed<string | number>().required(),
      isComplete: Yup.boolean().optional(),
    }).required(),

    tagLines: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required(),
          value: Yup.mixed<string | number>().required(),
        })
      )
      .required(),
  });

  const methods = useForm<PartData>({
    resolver: yupResolver(partDataSchema),
    defaultValues: {
      name: "",
      projectId: "",
      locations: locations,
      onHold: {
        name: "On Hold",
        value: "",
        isComplete: false,
      },
      tagLines: tagLines,
    },
  });

  const { handleSubmit, control, reset, setValue } = methods;

  const {
    fields: locationFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "locations",
  });

  const {
    fields: tagLineFields,
    append: appendTagLine,
    remove: removeTagLine,
  } = useFieldArray({
    control,
    name: "tagLines",
  });

  const onSubmit = async (formData: PartData) => {
    try {
      if (file) {
        const formBody = {
          ...formData,
          imagePath: part.imageUrl,
        };
        const res = await dispatch(insertPart(file, formBody));

        if (res?.status === 201) {
          toast.success("Part inserted successfully!");
          reset({
            name: "",
            projectId: "",
            locations: locations,
            onHold: {
              name: "On Hold",
              value: "",
              isComplete: false,
            },
            tagLines: tagLines,
          });
        }
      } else {
        console.error("No file selected for upload.");
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(resetPartData());
    dispatch(getProjects());
  }, []);

  const navData = [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Insert Part",
      href: "/admin/insert",
      isHighlighted: true,
    },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="text-3xl font-bold pb-6 text-blue-900">Insert Part</div>
      <Breadcrumb items={navData} />
      <div className="w-full pt-10">
        <FormProvider
          className="space-y-6"
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <InputText
              size="small"
              type="text"
              label="Part Name"
              name="name"
              control={control}
              required
              fullWidth
            />
            {(data ?? []).length > 0 && (
              <SelectDropdown
                options={
                  data?.map((project: project) => ({
                    label: project.name,
                    value: project._id,
                  })) || []
                }
                size="small"
                label="Select a Project"
                name="projectId"
                control={control}
                required
                fullWidth
              />
            )}
          </div>
          <div className="relative">
            {file ? (
              <Image
                src={URL.createObjectURL(file ?? new Blob())}
                alt="Part Image"
                width={200}
                height={250}
                className="rounded-md"
              />
            ) : (
              <div className="w-52 h-52  bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">No Image Selected</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleClick}
              className="absolute top-2 left-2 text-black bg-white rounded-full p-1 hover:scale-105 hover:cursor-pointer"
            >
              <PencilIcon className="w-6 h-6" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </button>
            {/* <label
              className="block mb-2 text-sm font-medium text-black"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              multiple={false}
              className="block text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50  sm:w-[500px] w-full"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
            />
            <p className="mt-1 text-sm" id="file_input_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p> */}
            <div className="py-2">
              <div className="flex gap-2">
                <div>Locations</div>
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      value: "",
                      isHold: false,
                    })
                  }
                >
                  <PlusCircleIcon className="h-6 w-6 text-blue-800" />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 h-96 overflow-scroll">
                {locationFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-2 border border-gray-300 p-2 rounded-md h-fit relative"
                  >
                    <div className="flex flex-col gap-1">
                      <span>Location {index + 1}</span>
                      <input
                        type="text"
                        placeholder="Location Name"
                        className="rounded-sm border border-gray-200 px-2 py-1 w-48"
                        {...methods.register(
                          `locations.${index}.name` as const
                        )}
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        className="rounded-sm border border-gray-200 px-2 py-1 w-48"
                        {...methods.register(
                          `locations.${index}.value` as const
                        )}
                      />
                      <label className="flex items-center gap-1 mt-1">
                        <input
                          type="checkbox"
                          {...methods.register(
                            `locations.${index}.isHold` as const
                          )}
                        />
                        Hold
                      </label>
                    </div>
                    <button
                      onClick={() => remove(index)}
                      className="absolute right-2 top-2"
                    >
                      <XMarkIcon className="h-6 w-6 text-red-600 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-4 w-full sm:w-1/4 border border-gray-300 rounded-md p-2">
                <label className="font-semibold">On Hold</label>
                <InputText
                  type="text"
                  label="Name"
                  name="onHold.name"
                  control={control}
                  fullWidth
                  required
                  size="small"
                />
                <InputText
                  type="text"
                  label="Value"
                  name="onHold.value"
                  control={control}
                  fullWidth
                  required
                  size="small"
                />
                <label className="flex items-center gap-1 mt-1">
                  <input
                    type="checkbox"
                    {...methods.register(`onHold.isComplete` as const)}
                  />
                  Completed
                </label>
              </div>
              <div>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center">
                    <span className="font-semibold">Tag Lines</span>
                    <button
                      type="button"
                      onClick={() =>
                        appendTagLine({
                          name: "",
                          value: "",
                        })
                      }
                      className="text-blue-700"
                    >
                      <PlusCircleIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {tagLineFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 border border-gray-300 p-2 rounded-md"
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        {...methods.register(`tagLines.${index}.name` as const)}
                        className="rounded-sm border border-gray-200 px-2 py-1"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        {...methods.register(
                          `tagLines.${index}.value` as const
                        )}
                        className="rounded-sm border border-gray-200 px-2 py-1"
                      />
                      <XMarkIcon
                        className="h-6 w-6 text-red-600 cursor-pointer"
                        onClick={() => removeTagLine(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </FormProvider>
      </div>
      <ToastContainer />
      {part.isLoading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Insert;
