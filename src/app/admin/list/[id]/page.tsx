"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { dispatch, useSelector } from "@/redux/store";
import { getPartById, updatePart } from "@/redux/slices/part";

import FormProvider from "@/app/components/Form/hook-form/FormProvider";
import InputText from "@/app/components/Form/hook-form/InputText";
import SelectDropdown from "@/app/components/Form/hook-form/InputSelect";
import { XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { project } from "@/interfaces/project";
import { getProjects } from "@/redux/slices/project";
import { toast, ToastContainer } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";

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
      const res = await dispatch(updatePart(id, formValues));
      if (res?.status === 200) {
        toast.success("Part updated successfully");
      }
    }
  };

  return (
    <div className="py-2 pl-5 bg-white min-h-screen">
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
