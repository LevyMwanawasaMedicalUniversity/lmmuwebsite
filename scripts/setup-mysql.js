#!/usr/bin/env node
// filepath: c:\Users\mulum\Desktop\CodeLab\lmmuwebsite\scripts\setup-mysql.js

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => {
  rl.question(query, resolve);
});

async function setupDatabase() {
  try {
    console.log('\n=== LMMU Website MySQL Database Setup ===\n');
      // Get MySQL connection details
    console.log('Please enter your MySQL connection details:');
    const host = await question('Host [localhost]: ') || 'localhost';
    const port = await question('Port [3306]: ') || '3306';
    const username = await question('Username [root]: ') || 'root';
    const password = await question('Password (leave blank if none): ');
    const dbName = await question('Database name [lmmu_blog]: ') || 'lmmu_blog';
    
    console.log('\nCreating database (if it doesn\'t exist)...');
    
    // Build connection URL for .env file
    const connectionUrl = `mysql://${username}:${password}@${host}:${port}/${dbName}`;
    
    // Update .env file
    const envPath = path.join(process.cwd(), '.env');
    let envContent;

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
      
      // Replace DATABASE_URL line if it exists
      if (envContent.includes('DATABASE_URL=')) {
        envContent = envContent.replace(
          /DATABASE_URL=.*/,
          `DATABASE_URL="${connectionUrl}"`
        );
      } else {
        envContent += `\nDATABASE_URL="${connectionUrl}"`;
      }
      
      // Ensure NEXTAUTH variables exist
      if (!envContent.includes('NEXTAUTH_SECRET=')) {
        const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        envContent += `\nNEXTAUTH_SECRET="${secret}"`;
      }
      
      if (!envContent.includes('NEXTAUTH_URL=')) {
        envContent += `\nNEXTAUTH_URL="http://localhost:3000"`;
      }
    } else {
      // Create new .env file
      const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      envContent = `DATABASE_URL="${connectionUrl}"
NEXTAUTH_SECRET="${secret}"
NEXTAUTH_URL="http://localhost:3000"`;
    }
    
    // Write the .env file
    fs.writeFileSync(envPath, envContent);
    console.log('Updated .env file with database connection details');
    
    // Create database
    console.log('Attempting to create database if it doesn\'t exist...');
    try {
      // Create database if it doesn't exist
      const createDbCommand = `mysql -h ${host} -P ${port} -u ${username} ${password ? `-p${password}` : ''} -e "CREATE DATABASE IF NOT EXISTS ${dbName}"`;
      execSync(createDbCommand, { stdio: 'pipe' });
      console.log(`Database '${dbName}' is ready.`);
    } catch (error) {
      console.log('Could not automatically create database. You may need to create it manually.');
      console.error(error.message);
    }
    
    // Run Prisma migrations
    console.log('\nRunning Prisma migrations...');
    try {
      execSync('npx prisma migrate dev --name init_mysql', { stdio: 'inherit' });
      console.log('Database migrations completed successfully');
      
      // Seed the database
      console.log('\nSeeding the database with initial data...');
      execSync('node prisma/seed-database.js', { stdio: 'inherit' });
      console.log('Database seeded successfully');
      
      console.log('\nDatabase setup completed!');
      console.log('You can now start the application with:');
      console.log('  npm run dev');
      console.log('\nLogin credentials:');
      console.log('  Username: admin');
      console.log('  Password: admin123');
    } catch (error) {
      console.error('Error running Prisma migrations:', error.message);
    }
  } catch (error) {
    console.error('An error occurred during setup:', error);
  } finally {
    rl.close();
  }
}

setupDatabase();
