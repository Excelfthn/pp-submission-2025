# Database Seeding Guide

This guide explains how to use the database seeding scripts for the PitchPro backend.

## Available Scripts

### 1. Full Database Reset and Seed

```bash
npm run db:clear-and-seed
```

**⚠️ WARNING: This will completely clear your database!**

This script will:

- Reset the database schema using Prisma
- Clear all existing data
- Seed the database with sample data including:
  - 3 badges
  - 8 stories
  - 13 users (including demo user)
  - 20 user progress records
  - 12 pre-test records

### 2. Seed Only (without clearing)

```bash
npm run seed
```

Runs the full database seeder without clearing existing data. Use this if you want to add sample data to an existing database.

### 3. Demo User Only

```bash
npm run seed:demo
```

Creates only the demo user. This is the original seeder script that checks if the demo user already exists.

### 4. Database Reset Only

```bash
npm run db:reset
```

Resets the database schema without seeding any data.

## Demo User Credentials

After running any seeding script that includes the demo user:

- **Email**: `demo@gmail.com`
- **Password**: `demopassword`

## Sample Data Overview

### Badges

1. **Persuation Pro** - persuative category
2. **Professor Favorite** - presentation QnA category
3. **From Blank To Bold** - train with friend category

### Stories

1. **Presentation With Friends** - Badge: Persuation Pro
2. **Make Strong Hook For Opening Presentation** - AI vs Artist theme
3. **Content About Differences Art From AI And Ghibli Studio**
4. **Content About Risk, Negative Impact, and Concern For The Artist**
5. **Content About Copyright Issue, Cause, And Ethic Side**
6. **Make Closing Statement For The Presentation** - Badge: From Blank To Bold
7. **Answering Question From The Professor Part 1**
8. **Answering Question From The Professor Part 2** - Badge: Professor Favorite

### Users

The seeder includes 13 users with various XP levels and progress data, plus the demo user.

## Safety Features

- The `clear-and-seed.js` script will **refuse to run in production** environment
- All scripts include error handling and detailed logging
- The demo user seeder checks for existing users to prevent duplicates

## Troubleshooting

### Common Issues

1. **Prisma Client not generated**

   ```bash
   npx prisma generate
   ```

2. **Database connection issues**

   - Check your `.env` file has correct `DATABASE_URL`
   - Ensure PostgreSQL is running

3. **Foreign key constraint errors**

   - Use `npm run db:clear-and-seed` to reset everything
   - Make sure to seed in the correct order (badges → stories → users → progress → tests)

4. **Permission errors**
   - Ensure your database user has CREATE, DROP, and INSERT permissions

### Manual Seeding Order

If you need to run seeders manually in parts:

1. Clear database: `npm run db:reset`
2. Seed badges first
3. Seed stories (depends on badges)
4. Seed users
5. Seed user progress (depends on users and stories)
6. Seed pre-tests (depends on user progress)

## File Structure

```
be-pitch-pro/
├── seed-demo-user.js          # Original demo user seeder
├── seed-full-database.js      # Complete database seeder
├── clear-and-seed.js          # Reset and seed script
├── SEEDING_README.md          # This documentation
└── package.json               # Updated with new scripts
```

## Development Workflow

1. **Starting fresh**: `npm run db:clear-and-seed`
2. **Adding demo user only**: `npm run seed:demo`
3. **Testing with sample data**: `npm run seed`
4. **Resetting for clean slate**: `npm run db:reset`

Remember to always backup your production data before running any seeding scripts!
