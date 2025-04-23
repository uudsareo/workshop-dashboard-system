"use client";
import { setData } from "@/redux/slices/dashboard";
import { dispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [text, setText] = useState<string | null>("");
  useEffect(() => {
    dispatch(setData(String(text)));
    console.log("text", text);
  }, [text])
  
  return (
    <div>
      <input
        type="text"
        value={text || ""}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="border border-gray-300 rounded p-2 mb-4"
      />
    </div>
  );
};

export default Admin;
