require("dotenv").config();
const prisma = require("./services/connection");
const bcrypt = require("bcryptjs");

async function clearDatabase() {
  console.log("Clearing database...");

  // Delete in reverse order of dependencies
  await prisma.user_detail.deleteMany({});
  await prisma.detail_progress.deleteMany({});
  await prisma.$executeRaw`DELETE FROM "post-test"`;
  await prisma.$executeRaw`DELETE FROM "pre-test"`;
  await prisma.user_progress.deleteMany({});
  await prisma.stories.deleteMany({});
  await prisma.badge.deleteMany({});
  await prisma.users.deleteMany({});

  console.log("Database cleared successfully!");
}

async function seedBadges() {
  console.log("Seeding badges...");

  const badges = [
    {
      badge_id: 1,
      badge_name: "Persuation Pro",
      category: "persuative",
      requirements: "when complete scenario to persuade dimas",
    },
    {
      badge_id: 2,
      badge_name: "Professor Favorite",
      category: "presentation QnA",
      requirements: "after correct answering question from the professor",
    },
    {
      badge_id: 3,
      badge_name: "From Blank To Bold",
      category: "train with friend",
      requirements: "when success training presentation with friends",
    },
  ];

  for (const badge of badges) {
    await prisma.badge.create({ data: badge });
  }

  console.log(`${badges.length} badges seeded successfully!`);
}

async function seedStories() {
  console.log("Seeding stories...");

  const stories = [
    {
      story_id: 1,
      tema: "Presentation With Friends",
      system_instruction:
        "Evaluasilah apakah inputan merupakan kalimat ajakan atau persuasif yang tepat untuk mengajak teman kampus bernama Dimas agar bersedia membantu Arga dalam belajar dan menyusun presentasi, termasuk mengajarkan cara mendeliver presentasi. Kalimat ajakan sebaiknya terdengar sopan, meyakinkan, dan relevan dengan konteks kerja sama tugas kuliah. Jika mengandung kata kasar atau tidak ada ajakan eksplisit, anggaplah tidak relevan.\\n\\nEvaluate whether the user input is a polite and persuasive invitation directed to a classmate named Dimas, asking him to help Arga with preparing and delivering a presentation. The sentence should sound friendly, clear, and relevant to a university collaboration context. If the sentence includes rude language or lacks an actual invitation, consider it irrelevant.\\n\\nContoh input yang sesuai / Valid examples:\\n- '''Dim, yuk kita kerja bareng buat presentasi ini.'''\\n- '''Gimana kalau kita bikin presentasinya bareng?'''\\n- '''Dim, aku bener-bener butuh bantuanmu buat belajar presentasi.'''\\n- '''Hey Dimas, would you like to work together on this presentation? I really need your help on how to deliver it well.'''\\n- '''I think we'''d make a great team for this project. Can you help me with the delivery part, Dimas?'''\\n\\nContoh input yang tidak sesuai / Invalid examples:\\n- '''Terserah lo mau ikut apa nggak.'''\\n- '''Gue males.'''\\n- '''You figure it out yourself.'''\\n- '''Why should I ask Dimas, he'''s arrogant.",
      chapter: 1,
      badge_id: 1,
      checkpoint_pack: 1,
    },
    {
      story_id: 2,
      tema: "Make Strong Hook For Opening Presentatian The Theme: The Artist vs The AI | AI's Threat to Artistic Integrity and Ghibli's Legacy",
      system_instruction:
        "Apakah inputan sesuai dengan opening presentasi dengan tema The Artist vs The AI: AI's Threat to Artistic Integrity and Ghibli's Legacy",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 2,
    },
    {
      story_id: 3,
      tema: "Content The Presentation About Differences Art From AI And Ghibli Studio, Include The Response of Artist from Ghibli Studio",
      system_instruction:
        "Apakah inputan sesuai untuk menjadi isi presentasi dengan pembahasan isi yaitu perbedaan antara gambaran yang dihasilkan AI sama karya asli Ghibli, plus tanggapan dari para artist Ghibli",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 2,
    },
    {
      story_id: 4,
      tema: "Content The Presentation About Risk, Negative Impact, and Concern For The Artist In Future",
      system_instruction:
        "Apakah inputan sesuai dengan pembahasan dari risiko, dampak negatif, dan kekhawatiran para seniman ke depannya mengenai The Artist vs AI'S: AI;s Threat to Artistic Integrity and Ghibli's Legacy",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 2,
    },
    {
      story_id: 5,
      tema: "Content The Presentation About Copyright Issue, Cause, And Ethic Side With The Issue",
      system_instruction:
        "Apakah inputan sesuai dengan isu copyright, kenapa hal The Artist vs AI'S: AI;s Threat to Artistic Integrity and Ghibli's Legacy bisa terjadi, dan sisi etnisnya",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 2,
    },
    {
      story_id: 6,
      tema: "Make Closing Statement For The Presentation",
      system_instruction:
        "Apakah inputan sesuai untuk menjadi penutup presentasi dengan tema The Artist vs The AI: AI's Threat to Artistic Integrity and Ghibli's Legacy",
      chapter: 1,
      badge_id: 3,
      checkpoint_pack: 2,
    },
    {
      story_id: 7,
      tema: "Answering Question From The Professor Part 1",
      system_instruction:
        "Apakah inputan sesuai dengan jawaban dari pertanyaan that AI can mimic styles without consent or compensation. In your opinion, how can we create a fair system where AI tools are still useful but artists are protected?",
      chapter: 1,
      badge_id: null,
      checkpoint_pack: 3,
    },
    {
      story_id: 8,
      tema: "Answering Question From The Professor Part 2",
      system_instruction:
        "Apakah inputan sesuai dengan jawaban dari pertanyaan You quoted Hayao Miyazaki calling AI art 'an insult to life itself.' Do you personally agree with that statement? Or do you think there's a way AI can be used ethically in the creative process?",
      chapter: 1,
      badge_id: 2,
      checkpoint_pack: 3,
    },
  ];

  for (const story of stories) {
    await prisma.stories.create({ data: story });
  }

  console.log(`${stories.length} stories seeded successfully!`);
}

async function seedUsers() {
  console.log("Seeding users...");

  // Create demo user first
  const demoPassword = "demopassword";
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(demoPassword, salt);

  const demoUser = {
    user_id: 1,
    email: "demo@gmail.com",
    username: "demouser",
    hash_password: hash,
    xp: 0,
    avatar: null,
    avatar_mimetype: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await prisma.users.create({ data: demoUser });

  // Create other users from backup
  const users = [
    {
      user_id: 6,
      email: "andi@gmail.com",
      username: "andi riogi",
      xp: 0,
      avatar: null,
      hash_password:
        "$2b$10$8K15Y7P.xzQ/So6kTaOB/eSTwPueuCHRt6jHUkKL63vopHMTVpGUG",
      created_at: new Date("2025-04-17 08:18:08.031"),
      updated_at: new Date("2025-04-17 08:18:08.031"),
      avatar_mimetype: null,
    },
    {
      user_id: 7,
      email: "andiharjo@gmail.com",
      username: "diharjo",
      xp: 0,
      avatar: null,
      hash_password:
        "$2b$10$b.7KcSGuJV/RQmKTgSxZf.vvM/2eabNSHlRFryQCJXgbmiA5lGSBa",
      created_at: new Date("2025-04-24 07:07:53.563"),
      updated_at: new Date("2025-04-24 07:07:53.563"),
      avatar_mimetype: null,
    },
    {
      user_id: 8,
      email: "andihadiamanah@gmail.com",
      username: "dihakimi",
      xp: 27,
      avatar: null,
      hash_password:
        "$2b$10$Cdj9HFGIkNiSmCavrER/ju78mLmhpsEQruFSiALW0Xg1OETPd61j2",
      created_at: new Date("2025-04-26 06:43:25.151"),
      updated_at: new Date("2025-04-26 06:43:25.151"),
      avatar_mimetype: null,
    },
    {
      user_id: 9,
      email: "tes1@gmail.com",
      username: "altes1",
      xp: 0,
      avatar: null,
      hash_password:
        "$2b$10$GSsHaFOj7qC1sYRmV4tt2O7ToxL04Da7p3V/6udxxhlAcghmxG4q6",
      created_at: new Date("2025-05-04 06:42:04.341"),
      updated_at: new Date("2025-05-04 06:42:04.341"),
      avatar_mimetype: null,
    },
    {
      user_id: 10,
      email: "andihadiamanahh@gmail.com",
      username: "dihakimin",
      xp: 0,
      avatar: null,
      hash_password:
        "$2b$10$j2IKUDIhfWrau80ulOxL3.AVGRomjnoLDT.o4CqNTHW8Sif55ttEe",
      created_at: new Date("2025-05-04 07:38:30.171"),
      updated_at: new Date("2025-05-04 07:38:30.171"),
      avatar_mimetype: null,
    },
    {
      user_id: 11,
      email: "ryandi@gmail.com",
      username: "dihakiminBpk",
      xp: 0,
      avatar: null,
      hash_password:
        "$2b$10$gagHHBcy6Rkm5QXzYAQtVe32mmG41d1QPmoc3L9EU2rJfwq1NSsu6",
      created_at: new Date("2025-05-04 08:25:36.223"),
      updated_at: new Date("2025-05-04 08:25:36.223"),
      avatar_mimetype: null,
    },
    {
      user_id: 12,
      email: "abcdef@gmail.com",
      username: "Ryandi47",
      xp: 250,
      avatar: null,
      hash_password:
        "$2b$10$Ed4gr.j0rAtBfV/GWh6sPepewadDjTMfNuXbj4CHK9YqTWTsJEKSK",
      created_at: new Date("2025-05-07 02:06:08.228"),
      updated_at: new Date("2025-05-07 02:06:08.228"),
      avatar_mimetype: null,
    },
    {
      user_id: 13,
      email: "andihh@gmail.com",
      username: "dihakmin",
      xp: 0,
      avatar: null,
      hash_password:
        "$2b$10$2eylHwPBftVChCoIe39BO.OS3Yug/I/RFHze724WUxbIzwJhCgnXe",
      created_at: new Date("2025-05-08 02:01:15.061"),
      updated_at: new Date("2025-05-08 02:01:15.061"),
      avatar_mimetype: null,
    },
    {
      user_id: 25,
      email: "altest4@gmail.com",
      username: "altest4",
      xp: 3368,
      avatar: null,
      hash_password:
        "$2b$10$urFE6y15NO8ME.LU4ET5fOzVOxX3wJenqSzFJyf/wH6rm8ua1TN86",
      created_at: new Date("2025-05-12 23:25:22.550"),
      updated_at: new Date("2025-05-12 23:25:22.550"),
      avatar_mimetype: null,
    },
    {
      user_id: 30,
      email: "altest5@gmail.com",
      username: "altoplelah",
      xp: 1258,
      avatar: null,
      hash_password:
        "$2b$10$5Vqt2N28YoaUF7974dCbUuvM0uJPBxupU0zqiKtyCgvUOMKj6SLZq",
      created_at: new Date("2025-05-16 01:10:18.785"),
      updated_at: new Date("2025-05-16 01:10:18.785"),
      avatar_mimetype: null,
    },
    {
      user_id: 33,
      email: "Top10@gmail.com",
      username: "Pitchpro",
      xp: 922,
      avatar: null,
      hash_password:
        "$2b$10$czp/oPTp5.S8sjBCowZBx.bUTmXKWZCPHoTU24SrKQt/uGFbXcZci",
      created_at: new Date("2025-05-16 09:22:34.232"),
      updated_at: new Date("2025-05-16 09:22:34.232"),
      avatar_mimetype: null,
    },
    {
      user_id: 35,
      email: "alfianc220@gmail.com",
      username: "alfianadicandra",
      xp: 1140,
      avatar: null,
      hash_password:
        "$2b$10$Gbeu3MBmXp1Lgqj9YAwLg.ej1uj05KcpssTqX6T437lWQS6Ix/ysi",
      created_at: new Date("2025-05-16 11:36:24.458"),
      updated_at: new Date("2025-05-16 11:36:24.458"),
      avatar_mimetype: null,
    },
  ];

  for (const user of users) {
    await prisma.users.create({ data: user });
  }

  console.log(
    `${users.length + 1} users seeded successfully! (including demo user)`
  );
}

async function seedUserProgress() {
  console.log("Seeding user progress...");

  // Get existing user IDs to validate foreign keys
  const existingUsers = await prisma.users.findMany({
    select: { user_id: true },
  });
  const validUserIds = new Set(existingUsers.map((u) => u.user_id));

  const allUserProgress = [
    {
      progress_id: 1,
      user_id: 7,
      story_id: 1,
      time_do: new Date("2025-04-24 07:22:14.785"),
    },
    {
      progress_id: 3,
      user_id: 8,
      story_id: 1,
      time_do: new Date("2025-04-26 18:22:48.218"),
    },
    {
      progress_id: 5,
      user_id: 8,
      story_id: 1,
      time_do: new Date("2025-04-26 18:26:24.235"),
    },
    {
      progress_id: 6,
      user_id: 12,
      story_id: 1,
      time_do: new Date("2025-05-07 02:07:06.966"),
    },
    {
      progress_id: 7,
      user_id: 8,
      story_id: 2,
      time_do: new Date("2025-05-09 14:25:14.735"),
    },
    {
      progress_id: 8,
      user_id: 8,
      story_id: 4,
      time_do: new Date("2025-05-09 14:43:36.863"),
    },
    {
      progress_id: 9,
      user_id: 12,
      story_id: 6,
      time_do: new Date("2025-05-09 20:46:18.690"),
    },
    {
      progress_id: 10,
      user_id: 12,
      story_id: 2,
      time_do: new Date("2025-05-09 20:46:18.691"),
    },
    {
      progress_id: 11,
      user_id: 12,
      story_id: 3,
      time_do: new Date("2025-05-09 20:46:18.691"),
    },
    {
      progress_id: 12,
      user_id: 12,
      story_id: 4,
      time_do: new Date("2025-05-09 20:46:18.691"),
    },
    {
      progress_id: 13,
      user_id: 12,
      story_id: 5,
      time_do: new Date("2025-05-09 20:46:18.690"),
    },
    {
      progress_id: 14,
      user_id: 12,
      story_id: 7,
      time_do: new Date("2025-05-09 20:49:58.566"),
    },
    {
      progress_id: 23,
      user_id: 25,
      story_id: 1,
      time_do: new Date("2025-05-12 23:26:08.922"),
    },
  ];

  // Filter to only include progress for users that exist
  const userProgress = allUserProgress.filter((progress) =>
    validUserIds.has(progress.user_id)
  );

  for (const progress of userProgress) {
    await prisma.user_progress.create({ data: progress });
  }

  console.log(
    `${userProgress.length} user progress records seeded successfully!`
  );
}

async function seedPreTests() {
  console.log("Seeding pre-tests...");

  // Get existing progress IDs to validate foreign keys
  const existingProgress = await prisma.user_progress.findMany({
    select: { progress_id: true },
  });
  const validProgressIds = new Set(existingProgress.map((p) => p.progress_id));

  const allPreTests = [
    {
      pre_test_id: 1,
      progress_id: 1,
      anxiety_level: 6,
      anxiety_reason: "The Topic",
    },
    {
      pre_test_id: 3,
      progress_id: 3,
      anxiety_level: 6,
      anxiety_reason: "The Topic",
    },
    {
      pre_test_id: 5,
      progress_id: 5,
      anxiety_level: 6,
      anxiety_reason: "The Topic",
    },
    {
      pre_test_id: 6,
      progress_id: 6,
      anxiety_level: 6,
      anxiety_reason: "The Topic",
    },
    {
      pre_test_id: 7,
      progress_id: 7,
      anxiety_level: 7,
      anxiety_reason: "The topic",
    },
    {
      pre_test_id: 8,
      progress_id: 8,
      anxiety_level: 6,
      anxiety_reason: "The Topic",
    },
    {
      pre_test_id: 15,
      progress_id: 23,
      anxiety_level: 7,
      anxiety_reason: "The topic",
    },
  ];

  // Filter to only include pre-tests for progress records that exist
  const preTests = allPreTests.filter((preTest) =>
    validProgressIds.has(preTest.progress_id)
  );

  for (const preTest of preTests) {
    await prisma.$executeRaw`
      INSERT INTO "pre-test" (pre_test_id, progress_id, anxiety_level, anxiety_reason)
      VALUES (${preTest.pre_test_id}, ${preTest.progress_id}, ${preTest.anxiety_level}, ${preTest.anxiety_reason})
    `;
  }

  console.log(`${preTests.length} pre-test records seeded successfully!`);
}

async function main() {
  try {
    console.log("Starting database seeding...");

    // Clear database first
    await clearDatabase();

    // Seed data in order of dependencies
    await seedBadges();
    await seedStories();
    await seedUsers();
    await seedUserProgress();
    await seedPreTests();

    // Get actual counts for summary
    const badgeCount = await prisma.badge.count();
    const storyCount = await prisma.stories.count();
    const userCount = await prisma.users.count();
    const progressCount = await prisma.user_progress.count();
    const preTestCountResult =
      await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM "pre-test"`;
    const preTestCount = preTestCountResult[0].count;

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`- ${badgeCount} badges`);
    console.log(`- ${storyCount} stories`);
    console.log(`- ${userCount} users (including demo user)`);
    console.log(`- ${progressCount} user progress records`);
    console.log(`- ${preTestCount} pre-test records`);
    console.log("\n🔑 Demo user credentials:");
    console.log("Email: demo@gmail.com");
    console.log("Password: demopassword");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
