"use client";
import React, { useCallback, useState, useEffect } from "react";
import { Button } from "../ui/button";
import FadeLoader from "react-spinners/FadeLoader";
import { useStore } from "../../zustand/useStore";
const SelectBackgroundImage = () => {
  const { setBackgroundImage, backgroundImage } = useStore();
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!image && backgroundImage) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImage(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(backgroundImage);
  //   }
  // }, [image, backgroundImage]);

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-black">Background Image to Add</h1>
      <div className="flex-1 flex flex-col justify-center items-center w-full h-full space-y-3">
        {image && !loading ? (
          <img
            src={image}
            alt="Selected Image"
            className="w-[60%] h-[60%] object-contain"
          />
        ) : (
          <span className="text-xl">No Image Selected</span>
        )}
        <Button
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                setBackgroundImage(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                  setImage(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
        >
          {image ? "Change Image" : "Select Image"}
        </Button>
      </div>
    </div>
  );
};

export default SelectBackgroundImage;
