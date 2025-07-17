"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray, set } from "react-hook-form";
import * as Yup from "yup";
import { dispatch, useSelector } from "@/redux/store";
import { getPartById, updatePart, uploadImage } from "@/redux/slices/part";

import FormProvider from "../../../../../components/Form/hook-form/FormProvider";
import InputText from "../../../../../components/Form/hook-form/InputText";
import SelectDropdown from "../../../../../components/Form/hook-form/InputSelect";
import {
  XMarkIcon,
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { project } from "@/interfaces/project";
import { getProjects } from "@/redux/slices/project";
import { toast, ToastContainer } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";
import Breadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import Image from "next/image";

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
    name: Yup.string().required(),
    isComplete: Yup.boolean().optional(),
    value: Yup.mixed<string | number>().required(),
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

const EditPart = () => {
  const { id } = useParams();
  const partData = useSelector((state) => state.partData.selectedPart);
  const isLoading = useSelector((state) => state.partData.isLoading);
  const [image, setImage] = useState<File | null>(null);
  const { data } = useSelector((state) => state.project);

  const methods = useForm<PartData>({
    resolver: yupResolver(partDataSchema),
    defaultValues: {
      name: "",
      projectId: "",
      locations: [],
      onHold: { name: "", value: "", isComplete: false },
      tagLines: [],
    },
  });

  const { control, handleSubmit, reset } = methods;

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

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getPartById(id));
    }
  }, [id]);

  useEffect(() => {
    if (partData && partData._id === id) {
      reset({
        ...partData,
        projectId:
          typeof partData.projectId === "object"
            ? partData.projectId._id
            : partData.projectId,
      }); // Populate the form
    }
  }, [partData, id, reset]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const onSubmit = async (formValues: PartData) => {
    if (typeof id === "string") {
      if (image) {
        const imageRes = await dispatch(uploadImage(image));
        if (imageRes?.status === 200) {
          const res = await dispatch(
            updatePart(id, {
              ...formValues,
              imagePath: imageRes.data.filePath,
            })
          );
          if (res?.status === 200) {
            setImage(null); // Reset image after successful upload
            toast.success("Part updated successfully");
          }
        } else {
          toast.error("Failed to update");
          return;
        }
      } else {
        const res = await dispatch(updatePart(id, formValues));
        if (res?.status === 200) {
          toast.success("Part updated successfully");
        } else {
          toast.error("Failed to update");
        }
      }
    }
  };

  const navData = [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Parts List",
      href: "/admin/list",
    },
    {
      title: "Edit Part",
      href: "/admin/list",
      isHighlighted: true,
    },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="py-2 pl-5  min-h-screen">
      <div className="text-3xl font-bold pb-6 text-blue-900 flex gap-2">
        Edit Part <div className="text-orange-400"> {partData?.name}</div>
      </div>
      <div className="pb-10">
        <Breadcrumb items={navData} />
      </div>
      <div className="bg-white p-5 rounded-md">
        <div className="relative">
          <Image
            src={
              image
                ? URL.createObjectURL(image)
                : `${process.env.NEXT_PUBLIC_IMGPATH}/${partData?.imagePath}` ||
                  ""
            }
            alt="Part Image"
            width={200}
            height={250}
            className="rounded-md"
          />
          {image === null ? (
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
                    setImage(file);
                  }
                }}
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-2 left-2 text-black bg-white rounded-full p-1 hover:scale-105 hover:cursor-pointer"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <InputText
            type="text"
            name="name"
            label="Part Name"
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

          {/* Locations */}
          <div>
            <h3 className="font-semibold">Locations</h3>
            <button
              type="button"
              onClick={() => append({ name: "", value: "", isHold: false })}
            >
              <PlusCircleIcon className="w-5 h-5 text-blue-600" />
            </button>
            {locationFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mt-2">
                <input
                  {...methods.register(`locations.${index}.name`)}
                  placeholder="Name"
                />
                <input
                  {...methods.register(`locations.${index}.value`)}
                  placeholder="Value"
                />
                <input
                  type="checkbox"
                  {...methods.register(`locations.${index}.isHold`)}
                />
                <XMarkIcon
                  onClick={() => remove(index)}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* On Hold */}
          <InputText
            type="text"
            name="onHold.name"
            label="On Hold Name"
            control={control}
            required
          />
          <InputText
            type="text"
            name="onHold.value"
            label="On Hold Value"
            control={control}
            required
          />
          <label className="flex items-center gap-1 mt-1">
            <input
              type="checkbox"
              {...methods.register(`onHold.isComplete` as const)}
            />
            Completed
          </label>
          {/* Tag Lines */}
          <div>
            <h3 className="font-semibold">Tag Lines</h3>
            <button
              type="button"
              onClick={() => appendTagLine({ name: "", value: "" })}
            >
              <PlusCircleIcon className="w-5 h-5 text-blue-600" />
            </button>
            {tagLineFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mt-2">
                <input
                  {...methods.register(`tagLines.${index}.name`)}
                  placeholder="Name"
                />
                <input
                  {...methods.register(`tagLines.${index}.value`)}
                  placeholder="Value"
                />
                <XMarkIcon
                  onClick={() => removeTagLine(index)}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Part
          </button>
        </FormProvider>
      </div>
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default EditPart;
