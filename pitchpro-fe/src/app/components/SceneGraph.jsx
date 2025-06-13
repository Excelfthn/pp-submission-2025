import SceneButton from "./Buttons/SceneButton";
import IcArrow from "../../../public/assets/icons/ic_arrow";
import { useRouter, usePathname } from "next/navigation";
import IcGraph from "../../../public/assets/icons/ic_graph";
import IcMic from "../../../public/assets/icons/ic_mic";
import { sceneData } from "../data/SceneData";
import { useMergedNodes } from "../hooks/useMergedNodes";
import { useSelectedNode } from "@/app/context/SelectedNodeContext";
import IcBook from "../../../public/assets/icons/ic_book";
const edges = [
  [1, 2],
  [1, 4],
  [2, 4],
  [2, 8],
  [4, 5],
  [5, 10],

  [8, 9],
  [9, 11],
  [10, 11],
  [11, 12],
];

const cellSize = 120;
function getIcon(type, status) {
  const baseProps = type === "cutscene" ? { width: 12, height: 12 } : { width: 14, height: 15 };
  const color = status === "locked" ? "#A6A6A6" : "#1F6DC2";
  switch (type) {
    case "click":
      return <IcGraph {...baseProps} backgroundColor={color} />;
    case "checkpoint":
      return <IcMic {...baseProps} backgroundColor={color} />;
    case "material":
      return <IcBook {...baseProps} backgroundColor={color} />;
    case "cutscene":
      return <IcArrow {...baseProps} backgroundColor={color} />;
    default:
      return <IcArrow {...baseProps} backgroundColor={color} />;
  }
}

function SceneGraph() {
  const router = useRouter();
  const pathname = usePathname();
  const { setSelectedNode } = useSelectedNode();

  const mergedNodes = useMergedNodes();
  const getNode = (id) => mergedNodes.find((node) => node.id === id);

  const handleClick = (node) => {
    if (node.status !== "locked") {
      setSelectedNode(node);
    }
  };

  console.log("this is merged nodes data",mergedNodes);


  return (
    <div className="relative w-[1100px] h-[400px] rounded-xl overflow-hidden">
      <svg className="absolute w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
        {edges.map(([fromId, toId], idx) => {
          const from = getNode(fromId);
          const to = getNode(toId);
          const getCenterOffset = (type) => (type === "cutscene" ? 40 : 40);
          const fromOffset = getCenterOffset(from.type);
          const toOffset = getCenterOffset(to.type);
          const fromX = from.x * cellSize + fromOffset;
          const fromY = from.y * cellSize + fromOffset;
          const toX = to.x * cellSize + toOffset;
          const toY = to.y * cellSize + toOffset;
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          const pathD = from.x === to.x || from.y === to.y ? `M${fromX},${fromY} L${toX},${toY}` : `M${fromX},${fromY} L${midX},${fromY} L${midX},${toY} L${toX},${toY}`;

          return <path key={idx} d={pathD} stroke="#E0E0E0" strokeWidth={2} strokeDasharray={from.x === to.x ? "4 4" : ""} fill="transparent" />;
        })}
      </svg>

      {/* Nodes */}
      {mergedNodes.map((node) => (
        <div
          key={node.id}
          className="absolute z-10"
          style={{
            left: `${node.x * cellSize + +(node.type === "cutscene" ? 20 : 0)}px `,
            // top: `${node.y * cellSize}px`,
            top: `${node.y * cellSize + (node.type === "cutscene" ? 20 : 0)}px`,
          }}
        >
          <SceneButton isLocked={node.status === "locked"} type={node.type} onClick={() => handleClick(node)}>
            {getIcon(node.type, node.status)}
          </SceneButton>
        </div>
      ))}
    </div>
  );
}
export default SceneGraph;
