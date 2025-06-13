import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchStories } from "@/redux/features/Story/StorySlice";
import { sceneData } from "../data/SceneData";

export const useMergedNodes = () => {
  const dispatch = useDispatch();
  const { stories, status } = useSelector((state) => state.stories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStories());
    }
  }, [dispatch, status]);

  const mergedNodes = useMemo(() => {
    // Merge the initial nodes with the stories data
    const initialNodes = sceneData.map((node) => {
      if (node.story_id) {
        const matchedStory = stories.find((s) => s.story_id === node.story_id);
        if (matchedStory) {
          return {
            ...node,
            // replace status based on is_post-test
            status: matchedStory["is_post-test"] ? "unlocked" : "locked",
          };
        }
      }
      return node;
    });
    

    // Convert to a map for easy lookup by id
    const nodeMap = Object.fromEntries(initialNodes.map((n) => [n.id, { ...n }]));

    // Step 2: Apply your custom unlock rules
    const isUnlocked = (id) => nodeMap[id]?.status === "unlocked";

    if (isUnlocked(2) && isUnlocked(9)) {
      [6, 7, 8].forEach((id) => {
        if (nodeMap[id]) nodeMap[id].status = "unlocked";
      });
    }

    if (isUnlocked(2) && isUnlocked(11)) {
      if (nodeMap[3]) nodeMap[3].status = "unlocked";
    }

    if (isUnlocked(11)) {
      [4, 5, 10].forEach((id) => {
        if (nodeMap[id]) nodeMap[id].status = "unlocked";
      });
    }

    const allUnlocked = Object.values(nodeMap).every((n) => n.status === "unlocked");
    if (allUnlocked && nodeMap[12]) {
      nodeMap[12].status = "unlocked";
    }

    return Object.values(nodeMap);
  }, [stories]);

  return mergedNodes;
};
