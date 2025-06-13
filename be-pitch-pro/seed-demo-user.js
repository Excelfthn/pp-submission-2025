require("dotenv").config();
const prisma = require("./services/connection");
const bcrypt = require("bcryptjs");

async function main() {
  const demoEmail = "demo@gmail.com";
  const demoUsername = "demouser";
  const demoPassword = "demopassword"; // Ganti sesuai kebutuhan

  // Cek apakah user demo sudah ada
  const existing = await prisma.users.findUnique({
    where: { email: demoEmail },
  });
  if (existing) {
    console.log("Demo user sudah ada.");
    return;
  }

  // Hash password pakai bcryptjs (sesuai backend)
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(demoPassword, salt);

  // Buat user demo
  await prisma.users.create({
    data: {
      email: demoEmail,
      username: demoUsername,
      hash_password: hash,
      // xp, avatar, avatar_mimetype, created_at, updated_at: otomatis/null
    },
  });

  console.log("Demo user berhasil dibuat!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
