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
  const { data } = useSelector((state) => state.project);

  const methods = useForm<PartData>({
    resolver: yupResolver(partDataSchema),
    defaultValues: {
      name: "",
      projectId: "",
      locations: [],
      onHold: { name: "", value: "" },
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

  const onSubmit = (formValues: PartData) => {
    console.log("Submitted data", formValues);
    typeof id === "string" && dispatch(updatePart(id, formValues));
  };

  return (
    <div className="py-2 pl-5">
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
  );
};

export default EditPart;
