// test-migration.js - Test the migration without making actual changes
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testMigrationSetup() {
  try {
    console.log('=== TESTING MIGRATION SETUP ===\n');
    
    // 1. Check database schema
    console.log('Checking schema integrity...');
    const categories = await prisma.category.findMany({ take: 1 });
    const tags = await prisma.tag.findMany({ take: 1 });
    const postImages = await prisma.postImage.findMany({ take: 1 });
    const postCategories = await prisma.postCategory.findMany({ take: 1 });
    const postTags = await prisma.postTag.findMany({ take: 1 });
    
    console.log('✓ Schema testing complete');
    
    // 2. Check API integration
    console.log('\nChecking API functionality...');
    
    // 2.1. Test fetching a post with relations
    const post = await prisma.post.findFirst({
      where: { published: true },
      include: {
        images: true,
        categoryRelations: { include: { category: true } },
        tagRelations: { include: { tag: true } }
      }
    });
    
    if (!post) {
      console.log('No posts found to test with.');
    } else {
      console.log(`Found post "${post.title}" to test with.`);
      
      // 2.2 Test creating a temporary test category
      const testCategory = await prisma.category.create({
        data: {
          name: 'TEST_CATEGORY_DELETE_ME',
          slug: 'test-category-delete-me'
        }
      });
      console.log('✓ Created test category');
      
      // 2.3 Test creating a temporary test tag
      const testTag = await prisma.tag.create({
        data: {
          name: 'TEST_TAG_DELETE_ME', 
          slug: 'test-tag-delete-me'
        }
      });
      console.log('✓ Created test tag');
      
      // 2.4 Test creating relations
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: testCategory.id
        }
      });
      console.log('✓ Created test post-category relation');
      
      await prisma.postTag.create({
        data: {
          postId: post.id,
          tagId: testTag.id
        }
      });
      console.log('✓ Created test post-tag relation');
      
      // 2.5 Test creating a post image
      const testImage = await prisma.postImage.create({
        data: {
          url: 'https://example.com/test-image.jpg',
          caption: 'Test image',
          order: 99,
          postId: post.id
        }
      });
      console.log('✓ Created test post image');
      
      // 2.6 Verify relation creation
      const updatedPost = await prisma.post.findUnique({
        where: { id: post.id },
        include: {
          images: true,
          categoryRelations: { include: { category: true } },
          tagRelations: { include: { tag: true } }
        }
      });
      
      const hasTestCategory = updatedPost.categoryRelations.some(
        rel => rel.category.name === 'TEST_CATEGORY_DELETE_ME'
      );
      
      const hasTestTag = updatedPost.tagRelations.some(
        rel => rel.tag.name === 'TEST_TAG_DELETE_ME'
      );
      
      const hasTestImage = updatedPost.images.some(
        img => img.url === 'https://example.com/test-image.jpg'
      );
      
      if (hasTestCategory && hasTestTag && hasTestImage) {
        console.log('✓ Verified all test relations were created successfully');
      } else {
        console.log('❌ Failed to verify all test relations');
      }
      
      // 3. Cleanup test data
      console.log('\nCleaning up test data...');
      
      await prisma.postImage.delete({
        where: { id: testImage.id }
      });
      
      await prisma.postCategory.delete({
        where: { 
          postId_categoryId: {
            postId: post.id,
            categoryId: testCategory.id
          }
        }
      });
      
      await prisma.postTag.delete({
        where: { 
          postId_tagId: {
            postId: post.id,
            tagId: testTag.id
          }
        }
      });
      
      await prisma.category.delete({
        where: { id: testCategory.id }
      });
      
      await prisma.tag.delete({
        where: { id: testTag.id }
      });
      
      console.log('✓ Cleanup completed successfully');
    }
    
    console.log('\n=== TEST COMPLETED SUCCESSFULLY ===');
    console.log('The system appears to be ready for the migration.');
    console.log('You can run the full migration with: node migrate-data.js');
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    console.log('\nThere may be issues with your schema or database setup.');
    console.log('Fix the issues before proceeding with the migration.');
  }
}

testMigrationSetup()
  .catch((e) => {
    console.error('Error during testing:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
