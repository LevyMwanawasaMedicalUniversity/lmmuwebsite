// migrate-data.js
import { createRequire } from 'module';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

// Configuration options
const CONFIG = {
  dryRun: false, // Set to true to simulate without making actual changes
  generateReport: true, // Generate a detailed JSON report
  reportPath: './migration-report.json',
  cleanLegacyFields: false, // Set to true to clear legacy fields after migration
  logLevel: 'verbose' // Options: 'minimal', 'normal', 'verbose'
};

const prisma = new PrismaClient();

// Add ESM support for Node.js
const __filename = new URL(import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

// Global stats for reporting
const migrationStats = {
  startTime: new Date(),
  endTime: null,
  categoriesTotal: 0,
  tagsTotal: 0,
  imagesTotal: 0,
  postsProcessed: 0,
  errors: [],
  warnings: []
};

async function migrateData() {
  log('Starting migration process...', 'minimal')
  
  if (CONFIG.dryRun) {
    log('Running in DRY RUN mode - no database changes will be made', 'minimal', 'warning')
  }

  try {
    // Step 1: Migrate categories
    log('Migrating categories...', 'minimal')
    await migrateCategories()

    // Step 2: Migrate tags
    log('Migrating tags...', 'minimal')
    await migrateTags()

    // Step 3: Migrate images (will move existing single image to images array)
    log('Migrating images...', 'minimal')
    await migrateImages()

    // Step 4: Handle posts that may have been missed in the initial migration
    log('Fixing any posts with missing relations...', 'minimal')
    await fixMissingRelations()

    // Step 5: Verify and log migration stats
    log('Verifying migration...', 'minimal')
    await verifyMigration()

    // Step 6: Run cleanup and optimization
    log('Running cleanup and optimization...', 'minimal')
    await cleanupAfterMigration()

    // Step 7: Generate report if needed
    if (CONFIG.generateReport) {
      log('Generating migration report...', 'minimal')
      await generateMigrationReport()
    }

    migrationStats.endTime = new Date()
    const duration = (migrationStats.endTime - migrationStats.startTime) / 1000
    log(`Migration completed successfully in ${duration.toFixed(2)} seconds!`, 'minimal', 'success')
  } catch (error) {
    logError('Migration failed:', error)
    migrationStats.errors.push({
      phase: 'main',
      message: error.message,
      stack: error.stack
    })
    
    if (CONFIG.generateReport) {
      migrationStats.endTime = new Date()
      await generateMigrationReport()
    }
    
    throw error
  }
}

async function migrateCategories() {
  // Get all posts with categories
  const posts = await prisma.post.findMany({
    where: {
      categories: {
        not: null
      }
    },
    select: {
      id: true,
      title: true,
      categories: true,
      categoryRelations: {
        include: {
          category: true
        }
      }
    }
  })

  // Extract unique categories
  const uniqueCategories = new Set()
  posts.forEach(post => {
    if (post.categories) {
      const postCategories = post.categories.split(',').map(c => c.trim()).filter(Boolean)
      postCategories.forEach(cat => uniqueCategories.add(cat))
    }
  })

  log(`Found ${uniqueCategories.size} unique categories and ${posts.length} posts with categories`, 'normal')
  migrationStats.categoriesTotal = uniqueCategories.size

  // Create categories in database
  const categoryMap = new Map()
  for (const categoryName of Array.from(uniqueCategories)) {
    const slug = createSlug(categoryName)
    
    try {
      // Check if category already exists
      let category = await prisma.category.findFirst({
        where: { name: categoryName }
      })
      
      if (!category) {
        if (!CONFIG.dryRun) {
          category = await prisma.category.create({
            data: {
              name: categoryName,
              slug
            }
          })
          log(`Created category: ${categoryName} (id: ${category.id})`, 'normal', 'success')
        } else {
          log(`[DRY RUN] Would create category: ${categoryName}`, 'normal')
          // Simulate an ID for dry run mode
          category = { id: `dry-run-${Math.floor(Math.random() * 1000)}`, name: categoryName, slug }
        }
      } else {
        log(`Category already exists: ${categoryName} (id: ${category.id})`, 'verbose')
      }
      
      categoryMap.set(categoryName, category.id)
    } catch (error) {
      logError(`Error creating category ${categoryName}:`, error)
      migrationStats.errors.push({
        phase: 'categories',
        entity: categoryName,
        message: error.message
      })
    }
  }

  // Create relationships between posts and categories
  for (const post of posts) {
    if (!post.categories) continue
    migrationStats.postsProcessed++

    const postCategories = post.categories.split(',').map(c => c.trim()).filter(Boolean)
    
    for (const categoryName of postCategories) {
      const categoryId = categoryMap.get(categoryName)
      if (categoryId) {
        // Check if relationship already exists
        const existingRelation = post.categoryRelations?.find(
          rel => rel.category.name === categoryName
        )
        
        if (existingRelation) {
          log(`Relation already exists between post ${post.id} and category "${categoryName}"`, 'verbose')
          continue
        }
        
        try {
          if (!CONFIG.dryRun) {
            await prisma.postCategory.create({
              data: {
                postId: post.id,
                categoryId
              }
            })
            log(`Connected post ${post.id} "${post.title?.substring(0, 30)}..." to category "${categoryName}"`, 'normal', 'success')
          } else {
            log(`[DRY RUN] Would connect post ${post.id} to category "${categoryName}"`, 'normal')
          }
        } catch (error) {
          // If duplicate error, just log verbose
          if (error.message.includes('Unique constraint')) {
            log(`Duplicate relation for post ${post.id} and category "${categoryName}" - skipping`, 'verbose')
          } else {
            logError(`Error connecting post ${post.id} to category ${categoryName}:`, error)
            migrationStats.errors.push({
              phase: 'category-relations',
              postId: post.id,
              category: categoryName,
              message: error.message
            })
          }
        }
      }
    }
  }
}

async function migrateTags() {
  // Get all posts with tags
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        not: null
      }
    },
    select: {
      id: true,
      title: true,
      tags: true,
      tagRelations: {
        include: {
          tag: true
        }
      }
    }
  })

  // Extract unique tags
  const uniqueTags = new Set()
  posts.forEach(post => {
    if (post.tags) {
      const postTags = post.tags.split(',').map(t => t.trim()).filter(Boolean)
      postTags.forEach(tag => uniqueTags.add(tag))
    }
  })

  log(`Found ${uniqueTags.size} unique tags and ${posts.length} posts with tags`, 'normal')
  migrationStats.tagsTotal = uniqueTags.size

  // Create tags in database
  const tagMap = new Map()
  for (const tagName of Array.from(uniqueTags)) {
    const slug = createSlug(tagName)
    
    try {
      // Check if tag already exists
      let tag = await prisma.tag.findFirst({
        where: { name: tagName }
      })
      
      if (!tag) {
        if (!CONFIG.dryRun) {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
              slug
            }
          })
          log(`Created tag: ${tagName} (id: ${tag.id})`, 'normal', 'success')
        } else {
          log(`[DRY RUN] Would create tag: ${tagName}`, 'normal')
          // Simulate an ID for dry run mode
          tag = { id: `dry-run-${Math.floor(Math.random() * 1000)}`, name: tagName, slug }
        }
      } else {
        log(`Tag already exists: ${tagName} (id: ${tag.id})`, 'verbose')
      }
      
      tagMap.set(tagName, tag.id)
    } catch (error) {
      logError(`Error creating tag ${tagName}:`, error)
      migrationStats.errors.push({
        phase: 'tags',
        entity: tagName,
        message: error.message
      })
    }
  }

  // Create relationships between posts and tags
  for (const post of posts) {
    if (!post.tags) continue

    const postTags = post.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    for (const tagName of postTags) {
      const tagId = tagMap.get(tagName)
      if (tagId) {
        // Check if relationship already exists
        const existingRelation = post.tagRelations?.find(
          rel => rel.tag.name === tagName
        )
        
        if (existingRelation) {
          log(`Relation already exists between post ${post.id} and tag "${tagName}"`, 'verbose')
          continue
        }
        
        try {
          if (!CONFIG.dryRun) {
            await prisma.postTag.create({
              data: {
                postId: post.id,
                tagId
              }
            })
            log(`Connected post ${post.id} "${post.title?.substring(0, 30)}..." to tag "${tagName}"`, 'normal', 'success')
          } else {
            log(`[DRY RUN] Would connect post ${post.id} to tag "${tagName}"`, 'normal')
          }
        } catch (error) {
          // If duplicate error, just log verbose
          if (error.message.includes('Unique constraint')) {
            log(`Duplicate relation for post ${post.id} and tag "${tagName}" - skipping`, 'verbose')
          } else {
            logError(`Error connecting post ${post.id} to tag ${tagName}:`, error)
            migrationStats.errors.push({
              phase: 'tag-relations',
              postId: post.id,
              tag: tagName,
              message: error.message
            })
          }
        }
      }
    }
  }
}

async function migrateImages() {
  // Get all posts with images
  const posts = await prisma.post.findMany({
    where: {
      image: {
        not: null
      }
    },
    select: {
      id: true,
      title: true,
      image: true,
      images: true
    }
  })

  log(`Found ${posts.length} posts with images to migrate`, 'normal')
  migrationStats.imagesTotal = posts.length

  // Convert each post's single image to PostImage
  for (const post of posts) {
    if (!post.image || post.image.trim() === '') {
      log(`Skipping post ${post.id} with empty image value`, 'verbose')
      continue
    }

    // Check if this image has already been migrated
    if (post.images && post.images.some(img => img.url === post.image)) {
      log(`Post ${post.id} image already migrated, skipping`, 'verbose')
      continue
    }

    try {
      // Clean up the URL (remove any whitespace)
      const cleanImageUrl = post.image.trim()
      
      // Validate URL format
      if (!cleanImageUrl.startsWith('http') && !cleanImageUrl.startsWith('/')) {
        logWarning(`Post ${post.id} has potentially invalid image URL: ${cleanImageUrl}`)
      }
      
      if (!CONFIG.dryRun) {
        await prisma.postImage.create({
          data: {
            url: cleanImageUrl,
            caption: `Featured image for "${post.title}"`,
            order: 0, // Primary image gets order 0
            postId: post.id
          }
        })
        log(`Created image entry for post ${post.id} with URL ${cleanImageUrl}`, 'normal', 'success')
      } else {
        log(`[DRY RUN] Would create image for post ${post.id} with URL ${cleanImageUrl}`, 'normal')
      }
    } catch (error) {
      logError(`Error creating image for post ${post.id}:`, error)
      migrationStats.errors.push({
        phase: 'images',
        postId: post.id,
        imageUrl: post.image,
        message: error.message
      })
    }
  }
  
  // Get stats after migration
  if (!CONFIG.dryRun) {
    const totalImages = await prisma.postImage.count()
    log(`Total PostImages after migration: ${totalImages}`, 'normal', 'success')
  }
}

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function verifyMigration() {
  log('Verifying migration...', 'normal')
  
  if (CONFIG.dryRun) {
    log('[DRY RUN] Skipping detailed verification', 'normal')
    return
  }
  
  // Get counts of original data
  const totalPosts = await prisma.post.count()
  const postsWithCategories = await prisma.post.count({
    where: {
      categories: {
        not: null
      }
    }
  })
  const postsWithTags = await prisma.post.count({
    where: {
      tags: {
        not: null
      }
    }
  })
  const postsWithImages = await prisma.post.count({
    where: {
      image: {
        not: null
      }
    }
  })
  
  // Get counts of migrated data
  const categoriesCreated = await prisma.category.count()
  const tagsCreated = await prisma.tag.count()
  const postCategoriesCreated = await prisma.postCategory.count()
  const postTagsCreated = await prisma.postTag.count()
  const postImagesCreated = await prisma.postImage.count()
  
  // Check for posts with missing relations
  const postsWithoutRelations = await findPostsWithMissingRelations()
  
  log('\n=== MIGRATION REPORT ===', 'minimal')
  log(`Total posts: ${totalPosts}`, 'minimal')
  log(`Posts with categories: ${postsWithCategories}`, 'minimal')
  log(`Posts with tags: ${postsWithTags}`, 'minimal')
  log(`Posts with images: ${postsWithImages}`, 'minimal')
  log('\n--- MIGRATION RESULTS ---', 'minimal')
  log(`Categories created: ${categoriesCreated}`, 'minimal')
  log(`Tags created: ${tagsCreated}`, 'minimal')
  log(`Post-category connections created: ${postCategoriesCreated}`, 'minimal')
  log(`Post-tag connections created: ${postTagsCreated}`, 'minimal')
  log(`Post images created: ${postImagesCreated}`, 'minimal')
  
  if (postsWithoutRelations.length > 0) {
    log('\n--- ATTENTION: POSTS WITH MISSING RELATIONS ---', 'minimal', 'warning')
    log(`Found ${postsWithoutRelations.length} posts with potential issues:`, 'minimal', 'warning')
    postsWithoutRelations.forEach(post => {
      log(`- Post ID ${post.id}: "${post.title}" (${post.issues.join(', ')})`, 'minimal', 'warning')
      
      // Store warnings in stats
      migrationStats.warnings.push({
        postId: post.id,
        title: post.title,
        issues: post.issues
      })
    })
    log('\nConsider running targeted fixes for these posts.', 'minimal')
  } else {
    log('\n✅ All posts have been properly migrated!', 'minimal', 'success')
  }
}

async function findPostsWithMissingRelations() {
  const problematicPosts = []
  
  const posts = await prisma.post.findMany({
    include: {
      categoryRelations: true,
      tagRelations: true,
      images: true
    }
  })
  
  for (const post of posts) {
    const issues = []
    
    // Check for categories mismatch
    if (post.categories && post.categories.trim() !== '' && post.categoryRelations.length === 0) {
      issues.push('missing category relations')
    }
    
    // Check for tags mismatch
    if (post.tags && post.tags.trim() !== '' && post.tagRelations.length === 0) {
      issues.push('missing tag relations')
    }
    
    // Check for image mismatch
    if (post.image && post.image.trim() !== '' && post.images.length === 0) {
      issues.push('missing image relations')
    }
    
    if (issues.length > 0) {
      problematicPosts.push({
        id: post.id,
        title: post.title,
        issues: issues
      })
    }
  }
  
  return problematicPosts
}

async function fixMissingRelations() {
  // Get all posts with potentially missing relations
  const postsToFix = await findPostsWithMissingRelations()
  
  console.log(`Found ${postsToFix.length} posts with missing relations to fix`)
  
  for (const post of postsToFix) {
    console.log(`Fixing relations for post ID ${post.id}: "${post.title}"`)
    
    // Get the complete post details
    const postDetails = await prisma.post.findUnique({
      where: { id: post.id },
      include: {
        categoryRelations: true,
        tagRelations: true,
        images: true
      }
    })
    
    if (!postDetails) continue
    
    // Fix missing category relations
    if (post.issues.includes('missing category relations') && postDetails.categories) {
      console.log(`Fixing categories for post ${post.id}`)
      const categoryNames = postDetails.categories.split(',').map(c => c.trim()).filter(Boolean)
      
      for (const categoryName of categoryNames) {
        // Try to find existing category
        let category = await prisma.category.findFirst({
          where: { name: categoryName }
        })
        
        // Create category if it doesn't exist
        if (!category) {
          const slug = createSlug(categoryName)
          try {
            category = await prisma.category.create({
              data: {
                name: categoryName,
                slug
              }
            })
            console.log(`Created new category: ${categoryName}`)
          } catch (error) {
            console.error(`Error creating category ${categoryName}:`, error)
            continue
          }
        }
        
        // Create relation
        try {
          await prisma.postCategory.create({
            data: {
              postId: post.id,
              categoryId: category.id
            }
          })
          console.log(`Connected post ${post.id} to category "${categoryName}"`)
        } catch (error) {
          // If it's a duplicate error, just ignore
          if (!error.message.includes('Unique constraint')) {
            console.error(`Error connecting post ${post.id} to category ${categoryName}:`, error)
          }
        }
      }
    }
    
    // Fix missing tag relations
    if (post.issues.includes('missing tag relations') && postDetails.tags) {
      console.log(`Fixing tags for post ${post.id}`)
      const tagNames = postDetails.tags.split(',').map(t => t.trim()).filter(Boolean)
      
      for (const tagName of tagNames) {
        // Try to find existing tag
        let tag = await prisma.tag.findFirst({
          where: { name: tagName }
        })
        
        // Create tag if it doesn't exist
        if (!tag) {
          const slug = createSlug(tagName)
          try {
            tag = await prisma.tag.create({
              data: {
                name: tagName,
                slug
              }
            })
            console.log(`Created new tag: ${tagName}`)
          } catch (error) {
            console.error(`Error creating tag ${tagName}:`, error)
            continue
          }
        }
        
        // Create relation
        try {
          await prisma.postTag.create({
            data: {
              postId: post.id,
              tagId: tag.id
            }
          })
          console.log(`Connected post ${post.id} to tag "${tagName}"`)
        } catch (error) {
          // If it's a duplicate error, just ignore
          if (!error.message.includes('Unique constraint')) {
            console.error(`Error connecting post ${post.id} to tag ${tagName}:`, error)
          }
        }
      }
    }
    
    // Fix missing image relations
    if (post.issues.includes('missing image relations') && postDetails.image) {
      console.log(`Fixing image for post ${post.id}`)
      try {
        await prisma.postImage.create({
          data: {
            url: postDetails.image.trim(),
            caption: `Featured image for "${postDetails.title}"`,
            order: 0,
            postId: post.id
          }
        })
        console.log(`Created image entry for post ${post.id}`)
      } catch (error) {
        console.error(`Error creating image for post ${post.id}:`, error)
      }
    }
  }
}

async function cleanupAfterMigration() {
  log('Running cleanup and optimization...', 'normal')
  
  if (CONFIG.dryRun) {
    log('[DRY RUN] Skipping cleanup operations', 'normal')
    return
  }
  
  // Analyze any posts with both old and new data formats
  const mixedFormatPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          categories: { not: null },
          categoryRelations: { some: {} }
        },
        {
          tags: { not: null },
          tagRelations: { some: {} }
        },
        {
          image: { not: null },
          images: { some: {} }
        }
      ]
    },
    include: {
      categoryRelations: { include: { category: true } },
      tagRelations: { include: { tag: true } },
      images: true
    }
  })
  
  log(`Found ${mixedFormatPosts.length} posts with both legacy and new format data`, 'normal')
  
  // Print summary of category mapping
  if (CONFIG.logLevel === 'verbose') {
    log('\n--- Category Mapping Summary ---', 'verbose')
    const categories = await prisma.category.findMany({
      include: { posts: true }
    })
    categories.forEach(category => {
      log(`Category "${category.name}" has ${category.posts.length} associated posts`, 'verbose')
    })
    
    // Print summary of tag mapping
    log('\n--- Tag Mapping Summary ---', 'verbose')
    const tags = await prisma.tag.findMany({
      include: { posts: true }
    })
    tags.forEach(tag => {
      log(`Tag "${tag.name}" has ${tag.posts.length} associated posts`, 'verbose')
    })
  }
  
  // If configured to clean legacy fields
  if (CONFIG.cleanLegacyFields) {
    log('Cleaning up legacy fields (setting to null)...', 'normal', 'warning')
    
    // Count posts to update
    const postsWithCategoryRelations = await prisma.post.count({
      where: { categoryRelations: { some: {} } }
    })
    
    const postsWithTagRelations = await prisma.post.count({
      where: { tagRelations: { some: {} } }
    })
    
    const postsWithImageRelations = await prisma.post.count({
      where: { images: { some: {} } }
    })
    
    log(`Clearing legacy category field for ${postsWithCategoryRelations} posts`, 'normal')
    await prisma.post.updateMany({
      where: {
        categoryRelations: { some: {} }
      },
      data: {
        categories: null
      }
    })
    
    log(`Clearing legacy tag field for ${postsWithTagRelations} posts`, 'normal')
    await prisma.post.updateMany({
      where: {
        tagRelations: { some: {} }
      },
      data: {
        tags: null
      }
    })
    
    log(`Clearing legacy image field for ${postsWithImageRelations} posts`, 'normal')
    await prisma.post.updateMany({
      where: {
        images: { some: {} }
      },
      data: {
        image: null
      }
    })
    log('Legacy fields cleared successfully', 'normal', 'success')
  } else {
    log('Legacy fields have been preserved for backward compatibility.', 'normal')
    log('To clear legacy fields, run the script with the --clean flag', 'normal')
  }
}

// Utility functions for logging and reporting
function log(message, level = 'normal', type = 'info') {
  const levels = {
    minimal: 0,
    normal: 1,
    verbose: 2
  }
  
  // Only log if the message's level is <= configured level
  if (levels[level] <= levels[CONFIG.logLevel]) {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0]
    
    if (type === 'error') {
      console.error(`[${timestamp}] ❌ ${message}`)
    } else if (type === 'warning') {
      console.warn(`[${timestamp}] ⚠️  ${message}`)
    } else if (type === 'success') {
      console.log(`[${timestamp}] ✅ ${message}`)
    } else {
      console.log(`[${timestamp}] ℹ️  ${message}`)
    }
  }
}

function logWarning(message) {
  log(message, 'normal', 'warning')
  migrationStats.warnings.push(message)
}

function logError(message, error = null) {
  const errorMessage = error ? `${message} ${error.message}` : message
  log(errorMessage, 'minimal', 'error')
  if (error) {
    log(error.stack, 'verbose', 'error')
  }
}

async function generateMigrationReport() {
  const reportData = {
    ...migrationStats,
    startTime: migrationStats.startTime.toISOString(),
    endTime: migrationStats.endTime ? migrationStats.endTime.toISOString() : new Date().toISOString(),
    configuration: CONFIG,
    summary: {
      categories: await prisma.category.count(),
      tags: await prisma.tag.count(),
      postImages: await prisma.postImage.count(),
      postCategories: await prisma.postCategory.count(),
      postTags: await prisma.postTag.count()
    }
  }
  
  try {
    await writeFile(CONFIG.reportPath, JSON.stringify(reportData, null, 2))
    log(`Migration report saved to ${CONFIG.reportPath}`, 'normal', 'success')
  } catch (error) {
    logError('Failed to save migration report:', error)
  }
}

// Simple CLI argument parser for configuration
function parseArgs() {
  const args = process.argv.slice(2)
  
  if (args.includes('--dry-run')) {
    CONFIG.dryRun = true
  }
  
  if (args.includes('--no-report')) {
    CONFIG.generateReport = false
  }
  
  if (args.includes('--clean')) {
    CONFIG.cleanLegacyFields = true
  }
  
  const logLevelArg = args.find(arg => arg.startsWith('--log-level='))
  if (logLevelArg) {
    const level = logLevelArg.split('=')[1]
    if (['minimal', 'normal', 'verbose'].includes(level)) {
      CONFIG.logLevel = level
    }
  }
}

// Parse arguments before executing
parseArgs()

// Run the migration
migrateData()
  .catch((e) => {
    console.error('Error during migration:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
