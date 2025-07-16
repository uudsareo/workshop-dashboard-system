"use client";
import { useSelector } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AddProject = () => {
  const project = useSelector((state) => state.project);

  type ProjectData = {
    name: string;
  };

  const projectDataSchema = Yup.object({
    name: Yup.string().required(),
  });

  const methods = useForm<ProjectData>({
    resolver: yupResolver(projectDataSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control, reset, setValue } = methods;

  return <div>page</div>;
};

export default AddProject;
