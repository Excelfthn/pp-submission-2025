import { useMemo } from "react";
import { sceneMetaData } from "../data/SceneMetaData";
export default function useCombinedSceneData(videos) {
  const combinedData = useMemo(() => {
    if (!videos || videos.length === 0) return sceneMetaData;
    const videoMap = new Map();
    videos.forEach((video) => {
      videoMap.set(video.fileName, video.videoUrl);
    });

    const resolveSrc = (srcGroup) => {
      const newGroup = {};
      for (const key in srcGroup) {
        const fileName = srcGroup[key];
        newGroup[key] = {
          fileName,
          videoUrl: videoMap.get(fileName) || null,
        };
      }
      return newGroup;
    };

    return sceneMetaData.map((scene) => {
      const newScene = { ...scene };
      if (scene.src) {
        newScene.src = {};
        if (scene.src.checkpoint) {
          newScene.src.checkpoint = resolveSrc(scene.src.checkpoint);
        }
        if (scene.src.cutscene) {
          newScene.src.cutscene = resolveSrc(scene.src.cutscene);
        }
        if (scene.src.material) {
          newScene.src.material = resolveSrc(scene.src.material);
        }
      }
      return newScene;
    });
  }, [videos]);

  return combinedData;
}
