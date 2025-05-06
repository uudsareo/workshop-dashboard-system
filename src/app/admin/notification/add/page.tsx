"use client";
import nextDynamic from "next/dynamic"; // <-- renamed to avoid conflict
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toast, ToastContainer } from "react-toastify";
import { dispatch } from "@/redux/store";
import { createNotification } from "@/redux/slices/notification";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = nextDynamic(() => import("react-quill-new"), {
  ssr: false,
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Page = () => {
  const [value, setValue] = useState("");
  const [immediate, setImmediate] = useState(false);
  const [date, setDate] = useState<string | null>(new Date().toISOString());
  const [duration, setDuration] = useState<number>(5);

  const submitNotification = async () => {
    if (!immediate && date === null) {
      toast.error(
        "Please select a date and time for the notification to be sent."
      );
      return;
    }
    const res = await dispatch(
      createNotification(value, date || "", immediate, duration)
    );
    if (res?.status === 201) {
      toast.success("Notification created successfully.");
      setValue("");
      setDate(new Date().toISOString());
    } else {
      toast.error("Failed to create notification.");
    }
  };

  return (
    <div className="p-5">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Set Start Date and Time"
            disabled={immediate}
            onChange={(date) => {
              setDate(date ? date.toISOString() : null);
            }}
          />
        </LocalizationProvider>
        <div>
          <span className="uppercase">immediate</span>{" "}
          <Checkbox
            {...label}
            onClick={() => {
              setImmediate(!immediate);
            }}
          />
        </div>
        <input
          type="number"
          placeholder="Duration"
          value={duration}
          min={5}
          onChange={(event) => {
            setDuration(Number(event.target.value));
          }}
          required
          className="border-2 border-gray-300 rounded-md p-2"
        />
        &nbsp; seconds
      </div>
      <div className="py-4">
        <Button title="Submit" variant="contained" onClick={submitNotification}>
          Submit
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

// Fix: no conflict with imported `nextDynamic`
export const dynamic = "force-dynamic";
export default Page;
