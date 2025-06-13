'use client';
import XpChip from "../../../components/XpChip";
import MenuButton from "@/app/components/Buttons/MenuButton";
import { useRouter } from "next/navigation";
export default function AwarenessPage() {
  const router = useRouter();

  const menuItems = [
    { id: 1, color: "#80CAEA", shadow: "#62A4C0", text: "Public Speaking Anxiety" },
    { id: 2, color: "#EAB280", shadow: "#E29450", text: "Breath Techniques" },
    { id: 3, color: "#BD8BF2", shadow: "#A35FEC", text: "Relaxation Techniques" },
    { id: 4, color: "#EA8080", shadow: "#E25050", text: "Public Speaking" },
  ];

  const handleMenuClick = (id) => {
    router.push(`${window.location.pathname}/${id}`);
  };
  return (
    <>
      <div className="bg-neutral-50 w-full min-h-screen overflow-y-auto flex flex-col relative ">
        <div className="bg-neutral-50 h-auto pt-14 flex items-end justify-end py-2 fixed w-full z-40 px-6">
          <XpChip></XpChip>
        </div>
        <div className="w-full flex flex-col px-6 bg-neutral-50 overflow-y-auto mb-[120px] pt-[120px] gap-8">
          <div className="w-full flex flex-col items-start gap-4 text-neutral-900">
            <p className="text-heading-h1 font-semibold">Anxiety Types</p>
            <p className="text-title font-[500]">Need to be known</p>
          </div>
          <div
            className="w-full  pb-2 h-auto menu grid grid-cols-2 gap-6
          justify-items-center items-center mx-auto"
          >
            {menuItems.map((item) => (
              <MenuButton onClick={()=>handleMenuClick(item.id)} key={item.id} color={item.color} shadowColor={item.shadow}>
                {item.text}
              </MenuButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
