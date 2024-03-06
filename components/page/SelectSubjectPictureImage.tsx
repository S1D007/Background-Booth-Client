"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import FadeLoader from "react-spinners/FadeLoader";
import { useStore } from "@/zustand/useStore";
import axios from "axios";
const SelectSubjectPictureImage = () => {
  const { setSubjectImage, process, response, emptyResponse } = useStore();
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-black">Subject Picture Image to Add</h1>
      <div className="flex-1 flex flex-col justify-center items-center w-full h-full space-y-3">
        {image && !loading ? (
          <img
            src={response || image}
            alt="Selected Image"
            className="w-[80%] h-[80%] object-contain"
          />
        ) : (
          <span className="text-xl">No Image Selected</span>
        )}
        <div className="flex flex-row space-x-4">
          <Button
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  setSubjectImage(file);
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setImage(e.target?.result as string);
                    emptyResponse();
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
          >
            {image ? "Change Image" : "Select Image"}
          </Button>
          {image && (
            <Button
              onClick={() => {
                process();
              }}
            >
              Process
            </Button>
          )}
          {response && (
            <Button
              onClick={async () => {
                const data = await axios.get(response, {
                  responseType: "blob",
                });
                const url = window.URL.createObjectURL(new Blob([data.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "result.png");
                document.body.appendChild(link);
                link.click();
              }}
            >
              Download Image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectSubjectPictureImage;
