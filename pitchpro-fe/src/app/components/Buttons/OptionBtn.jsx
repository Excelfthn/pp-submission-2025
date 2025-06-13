// 'use client';
// import { useState } from "react";

// export default function OptionButton({ label }) {
//     const [isClicked, setIsClicked] = useState(false);

//     const handleClick = () => {
//         setIsClicked(!isClicked);
//     };

//     return (
//         <button
//             onClick={handleClick}
//             className={`py-[6px] px-4 rounded-full border-2 font-[550] text-label ${
//                 isClicked
//                     ? "bg-neutral-50 text-primary-400 border-primary-300"
//                     : "bg-transparent text-neutral-300 border-neutral-300"
//             }`}
//         >
//             {label}
//         </button>
//     );
// }
"use client";
export default function OptionButton({ label, selected, onSelect }) {
  const handleClick = () => {
    onSelect(label);
  };
  return (
    <button onClick={handleClick} className={`py-[6px] px-4 rounded-full border-2 font-[550] text-label ${selected ? "bg-neutral-50 text-primary-400 border-primary-300" : "bg-transparent text-neutral-300 border-neutral-300"}`}>
      {label}
    </button>
  );
}
