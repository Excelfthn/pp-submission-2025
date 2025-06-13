const { date } = require("zod");
const { findUser } = require("../../repository/authRepository");
const {
  GetScenarioByChapter,
  GetUserById,
  GetUserProgress,
} = require("../../repository/commonFeature/storiesRepository");
const { checkPreTest } = require("../../repository/preTest.Repository");
const {
  checkPostTest,
  findProgressUserInStory,
} = require("../../repository/postTestRepository");
const {
  getDetailProgress,
} = require("../../repository/challengeFeedbackRepository");

const UserXp = async (user_id) => {
  user_id = parseInt(user_id);
  const user_data = await GetUserById(user_id);
  const user_xp = user_data.xp;
  return user_xp;
};

const ScenarioList = async (chapter, userId) => {
  chapter = parseInt(chapter);
  userId = parseInt(userId);
  const allScenario = await GetScenarioByChapter(chapter);
  var listProgress = await GetUserProgress(userId);
  const preTest = [];
  const postTest = [];
  const feedback = [];
  const storyIdProgress = [];
  listProgress.forEach(function (storyId, index) {
    storyIdProgress.push(storyId.story_id);
  });
  const result = [];
  console.log(allScenario);
  for (const data of allScenario) {
    // Check if user has progress for this story
    const hasProgress = storyIdProgress.includes(data.story_id);
    let hasPreTest = false;
    let hasPostTest = false;
    let isGenerated = false;

    if (hasProgress) {
      const { progress_id } = await findProgressUserInStory(
        userId,
        data.story_id
      );
      // Actually check if pre-test exists for this progress
      hasPreTest = (await checkPreTest(progress_id)) ? true : false;
      hasPostTest = (await checkPostTest(progress_id)) ? true : false;

      var generated = await getDetailProgress(progress_id);
      if (generated) {
        isGenerated = Boolean(generated.history_feedback);
      } else {
        isGenerated = false;
      }
    }

    let resultAkhir = {
      ...data,
      "is_pre-test": hasPreTest,
      "is_post-test": hasPostTest,
      is_generated: isGenerated,
    };

    result.push(resultAkhir);
  }

  return result;
};

module.exports = {
  UserXp,
  ScenarioList,
};
