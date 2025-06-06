// seed-database.js
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash admin password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user if it doesn't exist already
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@lmmu.ac.zm' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@lmmu.ac.zm',
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      },
    });

    console.log('Admin user created/updated:', adminUser.name);

    // Add a sample blog post
    const samplePost = await prisma.post.create({
      data: {
        title: 'Welcome to the LMMU Blog',
        slug: 'welcome-to-lmmu-blog',
        summary: 'Introduction to the new LMMU blog system',
        content: `
# Welcome to the LMMU Blog System

This is the first post on our new blog system. Here we'll share important announcements, 
news, and updates about Levy Mwanawasa Medical University.

## Features

- Latest university news and events
- Academic announcements
- Student achievements
- Research highlights

Stay tuned for more content!
        `,
        published: true,
        categories: 'Announcements',
        tags: 'welcome,blog,news',
        authorId: adminUser.id
      }
    });

    console.log('Sample post created:', samplePost.title);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
