// seed-database.js
import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding process...');
    
    // ---- 1. Create admin role ----
    console.log('Creating admin role...');
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'Administrator with full system access'
      }
    });
    console.log(`Role created: ${adminRole.name}`);
    
    // ---- 2. Create essential permissions ----
    console.log('Creating permissions...');
    const permissions = [
      { name: 'manage_users', description: 'Can manage all users' },
      { name: 'manage_roles', description: 'Can manage roles' },
      { name: 'manage_permissions', description: 'Can manage permissions' },
      { name: 'manage_posts', description: 'Can manage all blog posts' },
      { name: 'publish_posts', description: 'Can publish blog posts' },
      { name: 'edit_own_posts', description: 'Can edit own blog posts' }
    ];
    
    // Create all permissions
    for (const perm of permissions) {
      await prisma.permission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm
      });
      console.log(`Permission created: ${perm.name}`);
    }
    
    // ---- 3. Assign all permissions to admin role ----
    console.log('Assigning permissions to admin role...');
    const allPermissions = await prisma.permission.findMany();
    
    for (const permission of allPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: permission.id
        }
      });
      console.log(`Assigned permission "${permission.name}" to role "${adminRole.name}"`);
    }

    // ---- 4. Create admin user ----
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
        role: 'admin' // Keep the legacy role field
      },
    });

    console.log('Admin user created/updated:', adminUser.name);
    
    // ---- 5. Assign admin role to admin user ----
    console.log('Assigning admin role to admin user...');
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: adminRole.id
        }
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    });
    console.log(`Assigned role "${adminRole.name}" to user "${adminUser.name}"`);

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
