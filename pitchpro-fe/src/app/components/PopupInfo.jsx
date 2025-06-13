import PropTypes from "prop-types";
import { useSelectedNode } from "@/app/context/SelectedNodeContext";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PopupInfo({ titleProp, descriptionProp }) {
  const router = useRouter();
  const { selectedNode } = useSelectedNode();
  const [loading, setLoading] = useState(false);
  const description = selectedNode?.desc || descriptionProp;
  const title = selectedNode?.title || titleProp;
  const isSelectedNodeNotEmpty = selectedNode && Object.keys(selectedNode).length > 0;

  const handlePlayClick = () => {
    setLoading(true);
    sessionStorage.setItem("userInteracted", "true");
    if (selectedNode?.id) {
      router.push(`${window.location.pathname}/scene?id=${selectedNode.id}`);
    }
  };

  return (
    <div className="w-full absolute px-3 top-[94px] left-0 right-0">
      <div
        className="w-full rounded-3xl bg-[#EBF4FF] py-4 px-3 flex-col items-start justify-start gap-1"
        style={{
          boxShadow: "0px 4px 0px 0px #ADD5FF",
        }}
      >
        <p className="text-body font-semibold text-neutral-900">{title}</p>
        <p className="text-label font-normal text-neutral-900 pb-3">{description}</p>
        {isSelectedNodeNotEmpty && (

            <Button onClick={handlePlayClick} className="py-1.2" disabled={loading}>
              {loading ? "Loading..." : "Play"}
            </Button>
        )}
      </div>
    </div>
  );
}

PopupInfo.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  children: PropTypes.node,
};