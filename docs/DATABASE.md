# MySQL Database Setup for LMMU Website

This document provides instructions for setting up the MySQL database for the LMMU website's blog system.

## Prerequisites

- MySQL Server (5.7+ or 8.0+) installed and running
- Node.js and npm/pnpm installed

## Setup Steps

### Automatic Setup

We've created a script to help you set up the database automatically. Run the following command:

```bash
npm run db:setup
# or
pnpm db:setup
```

This script will:
1. Prompt you for your MySQL connection details
2. Create the database if it doesn't exist
3. Update the `.env` file with the connection details
4. Run the Prisma migrations
5. Seed the database with initial data

### Manual Setup

If you prefer to set up the database manually, follow these steps:

1. **Create a MySQL database**

   ```sql
   CREATE DATABASE lmmu_blog;
   ```

2. **Update the `.env` file**

   Create or edit the `.env` file in the project root directory:

   ```
   DATABASE_URL="mysql://username:password@localhost:3306/lmmu_blog"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   Replace `username` and `password` with your MySQL credentials.

3. **Run the migrations**

   ```bash
   npm run db:migrate
   # or
   pnpm db:migrate
   ```

4. **Generate the Prisma client**

   ```bash
   npm run db:generate
   # or
   pnpm db:generate
   ```

5. **Seed the database**

   ```bash
   npm run db:seed
   # or
   pnpm db:seed
   ```

## Default Admin Account

After setting up the database, you can log in with the following credentials:

- Username: `admin`
- Password: `admin123`

Make sure to change this password as soon as possible after the initial login.

## Database Schema

The database includes the following tables:

- **User**: Stores user accounts with authentication details and roles
- **Post**: Stores blog posts with metadata, content, and author information

## Troubleshooting

- **Database Connection Issues**: Make sure your MySQL server is running and the credentials in the `.env` file are correct.
- **Prisma Errors**: If you encounter Prisma errors, try regenerating the Prisma client with `npm run db:generate` or `pnpm db:generate`.
- **Migration Errors**: If migrations fail, you can reset the database with `npx prisma migrate reset` (this will delete all data).
