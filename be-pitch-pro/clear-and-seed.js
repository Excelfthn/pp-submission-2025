require("dotenv").config();
const { execSync } = require("child_process");
const path = require("path");

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: "inherit", cwd: __dirname });
    console.log(`✅ ${description} completed successfully!`);
  } catch (error) {
    console.error(
      `❌ Error during ${description.toLowerCase()}:`,
      error.message
    );
    process.exit(1);
  }
}

async function main() {
  console.log("🚀 Starting database reset and seeding process...");
  console.log("⚠️  WARNING: This will completely clear your database!");

  // Wait for user confirmation in production
  if (process.env.NODE_ENV === "production") {
    console.log(
      "\n❌ This script is not allowed to run in production environment!"
    );
    process.exit(1);
  }

  try {
    // Reset database schema using Prisma
    runCommand("npx prisma db push --force-reset", "Resetting database schema");

    // Run the full database seeder
    runCommand(
      "node seed-full-database.js",
      "Seeding database with sample data"
    );

    console.log("\n🎉 Database reset and seeding completed successfully!");
    console.log("\n📋 What was done:");
    console.log("1. Database schema was reset");
    console.log("2. All tables were recreated");
    console.log("3. Sample data was inserted");
    console.log("4. Demo user was created");

    console.log("\n🔑 Demo user credentials:");
    console.log("Email: demo@gmail.com");
    console.log("Password: demopassword");
  } catch (error) {
    console.error("\n❌ Process failed:", error.message);
    process.exit(1);
  }
}

main();
