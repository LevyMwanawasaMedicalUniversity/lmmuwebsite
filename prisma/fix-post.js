// fix-post.js - Script to fix individual problematic posts
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper function to create a URL-friendly slug
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Fix a post's categories, tags, and images
async function fixPost(postId) {
  try {
    console.log(`Fixing post ID ${postId}...`);
    
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        categoryRelations: { include: { category: true } },
        tagRelations: { include: { tag: true } },
        images: true
      }
    });
    
    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return;
    }
    
    console.log(`Found post: "${post.title}"`);
    
    // Fix categories
    if (post.categories) {
      console.log('Fixing categories...');
      const categoryNames = post.categories.split(',').map(c => c.trim()).filter(Boolean);
      
      for (const categoryName of categoryNames) {
        // Find or create category
        let category = await prisma.category.findFirst({
          where: { name: categoryName }
        });
        
        if (!category) {
          category = await prisma.category.create({
            data: {
              name: categoryName,
              slug: createSlug(categoryName)
            }
          });
          console.log(`Created new category: ${categoryName}`);
        }
        
        // Check if relation already exists
        const existingRelation = post.categoryRelations.find(
          rel => rel.category.name === categoryName
        );
        
        if (!existingRelation) {
          await prisma.postCategory.create({
            data: {
              postId: post.id,
              categoryId: category.id
            }
          });
          console.log(`Connected post to category "${categoryName}"`);
        }
      }
    }
    
    // Fix tags
    if (post.tags) {
      console.log('Fixing tags...');
      const tagNames = post.tags.split(',').map(t => t.trim()).filter(Boolean);
      
      for (const tagName of tagNames) {
        // Find or create tag
        let tag = await prisma.tag.findFirst({
          where: { name: tagName }
        });
        
        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
              slug: createSlug(tagName)
            }
          });
          console.log(`Created new tag: ${tagName}`);
        }
        
        // Check if relation already exists
        const existingRelation = post.tagRelations.find(
          rel => rel.tag.name === tagName
        );
        
        if (!existingRelation) {
          await prisma.postTag.create({
            data: {
              postId: post.id,
              tagId: tag.id
            }
          });
          console.log(`Connected post to tag "${tagName}"`);
        }
      }
    }
    
    // Fix image
    if (post.image && post.images.length === 0) {
      console.log('Fixing image...');
      await prisma.postImage.create({
        data: {
          url: post.image.trim(),
          caption: `Featured image for "${post.title}"`,
          order: 0,
          postId: post.id
        }
      });
      console.log(`Created image entry for post`);
    }
    
    console.log('Post fixed successfully!');
  } catch (error) {
    console.error('Error fixing post:', error);
  }
}

// Check if a post ID was provided as an argument
const postId = process.argv[2];
if (!postId || isNaN(parseInt(postId))) {
  console.error('Please provide a valid post ID as an argument.');
  console.log('Usage: node fix-post.js <postId>');
  process.exit(1);
}

// Run the fix
fixPost(parseInt(postId))
  .catch((e) => {
    console.error('Error during fix:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
