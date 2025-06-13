const { findProgressUserInStory } = require("../repository/postTestRepository");
const {
  insertUserProgress,
  insertPreTestUser,
  checkPreTest,
  updatePreTest,
  getStoryPack,
  getPackage,
} = require("../repository/preTest.Repository");

const postUserProgress = async (
  story_id,
  user_id,
  anxiety_level,
  anxiety_reason
) => {
  const checkUserProgress = await findProgressUserInStory(
    parseInt(user_id),
    parseInt(story_id)
  );
  if (checkUserProgress) {
    const userPreTest = await checkPreTest(checkUserProgress.progress_id);
    if (userPreTest) {
      throw Error("this user has done a pre-test, can only update");
    }
  }
  const packageData = await getPackage(parseInt(story_id));
  if (!packageData || packageData.checkpoint_pack === null) {
    throw new Error(
      `Story with ID ${story_id} not found or has no checkpoint package`
    );
  }
  const { checkpoint_pack } = packageData;
  const dataStory = [];
  const story = await getStoryPack(checkpoint_pack);
  story.forEach((element) => {
    dataStory.push(element.story_id);
  });
  // Create user progress records sequentially to avoid race conditions
  for (const storyId of dataStory) {
    try {
      await insertUserProgress(parseInt(storyId), parseInt(user_id));
    } catch (error) {
      // If progress already exists, continue (ignore duplicate errors)
      if (
        !error.message.includes("duplicate") &&
        !error.message.includes("unique")
      ) {
        throw error;
      }
    }
  }

  const { progress_id } = await findProgressUserInStory(
    parseInt(user_id),
    parseInt(story_id)
  );

  // Double-check if pre-test already exists before creating
  const existingPreTest = await checkPreTest(progress_id);
  if (existingPreTest) {
    throw new Error("Pre-test already exists for this user and story");
  }

  const postUserPreTest = await insertPreTestUser(
    anxiety_level,
    anxiety_reason,
    progress_id
  );
  return postUserPreTest;
};

const updateUserPreTest = async (
  storyId,
  userId,
  anxiety_level,
  anxiety_reason
) => {
  storyId = parseInt(storyId);
  userId = parseInt(userId);
  const progressData = await findProgressUserInStory(userId, storyId);
  if (!progressData) {
    throw new Error("No progress found for this user and story");
  }

  const { progress_id } = progressData;
  const preTestData = await checkPreTest(progress_id);

  if (!preTestData) {
    throw new Error(
      "No pre-test found for this user. Please submit a pre-test first."
    );
  }

  const { pre_test_id } = preTestData;
  const updated = await updatePreTest(
    anxiety_level,
    anxiety_reason,
    pre_test_id
  );
  return updated;
};

module.exports = {
  postUserProgress,
  updateUserPreTest,
};
