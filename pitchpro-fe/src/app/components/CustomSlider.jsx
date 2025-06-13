"use client";
import { useState } from "react";

export default function CustomSlider({ onChange }) {
  const [value, setValue] = useState(5); 

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col items-center w-full px-6">
      <div className="relative w-full max-w-md">
        <div className="h-10 rounded-full bg-[#C7C7C7] relative overflow-hidden">
          <div className="h-full bg-blue-500 absolute top-0 left-0 rounded-tl-full rounded-bl-full" style={{ width: `${(value - 1) * 11.11}%` }}></div>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 bg-[#F6F5F4]  rounded-full"
            style={{
              left: `calc(${(value - 1) * (100 / 9)}% - ${value === 1 ? 0 : value === 10 ? 40 : 20}px)`,
              width: "40px",
              height: "40px",
            }}
          ></div>
        </div>
        <input type="range" min="1" max="10" value={value} onChange={handleChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}

