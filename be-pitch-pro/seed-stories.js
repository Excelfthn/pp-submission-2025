const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding stories...");

  // Create some sample stories with checkpoint_pack values
  const stories = [
    {
      story_id: 1,
      tema: "Introduction to Public Speaking",
      system_instruction: "Practice basic presentation skills",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 1,
    },
    {
      story_id: 2,
      tema: "Building Confidence",
      system_instruction: "Learn to overcome speaking anxiety",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 1,
    },
    {
      story_id: 3,
      tema: "Advanced Presentation Techniques",
      system_instruction: "Master advanced speaking skills",
      chapter: 2,
      badge_id: null,
      checkpoint_pack: 2,
    },
  ];

  for (const story of stories) {
    const existingStory = await prisma.stories.findUnique({
      where: { story_id: story.story_id },
    });

    if (!existingStory) {
      await prisma.stories.create({
        data: story,
      });
      console.log(`Created story: ${story.tema}`);
    } else {
      console.log(`Story ${story.story_id} already exists`);
    }
  }

  console.log("Stories seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
