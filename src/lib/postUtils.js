/**
 * Utility functions for dealing with blog posts data
 */

/**
 * Get the main image URL for a post, prioritizing the images relation
 * @param {Object} post - The post object 
 * @returns {string} - The image URL or default image path
 */
export function getPostMainImage(post) {
  // First try the new images relation structure - this should be the primary source
  if (post?.images && Array.isArray(post.images) && post.images.length > 0) {
    // Sort by order field if it exists
    const sortedImages = [...post.images].sort((a, b) => (a.order || 0) - (b.order || 0));
    if (sortedImages[0]?.url) {
      return sortedImages[0].url;
    }
  }
  
  // If no images in the relation or no url in the first image, fall back to legacy field
  if (post?.image) {
    console.log(`Using legacy image field for post ${post.id}: ${post.image}`);
    return post.image;
  }
  
  // As a last resort, use default image
  return '/assets/images/news/default-blog.jpg';
}

/**
 * Get all images for a post
 * @param {Object} post - The post object
 * @returns {Array} - Array of image objects with url and caption
 */
export function getPostImages(post) {
  const images = [];
  
  // First try the new images relation structure
  if (post?.images && Array.isArray(post.images) && post.images.length > 0) {
    // Log successful finding of images
    console.log(`Found ${post.images.length} images for post ${post.id || post.title}`);
    
    // Sort by order field
    const sortedImages = [...post.images].sort((a, b) => (a.order || 0) - (b.order || 0));
    return sortedImages.map(img => ({
      url: img.url,
      caption: img.caption || '',
      id: img.id || null,
      order: img.order || 0
    }));
  }
  
  // If no images in relation but we have a legacy image, use that
  if (post?.image) {
    console.log(`Using legacy image field for post ${post.id || post.title}`);
    images.push({
      url: post.image,
      caption: '',
      id: null,
      order: 0
    });
  }
  
  // If no images were found
  if (images.length === 0) {
    console.log(`No images found for post ${post.id || post.title}`);
  }
  
  return images;
}

/**
 * Get formatted categories from a post
 * @param {Object} post - The post object
 * @returns {Array} - Array of category objects with name, id and slug
 */
export function getPostCategories(post) {
  if (!post) {
    return [];
  }

  // First try the new categoryRelations structure
  if (post.categoryRelations && Array.isArray(post.categoryRelations) && post.categoryRelations.length > 0) {
    try {
      // Make sure we only get valid category objects
      const validCategories = post.categoryRelations
        .filter(rel => rel && rel.category && typeof rel.category === 'object')
        .map(rel => {
          // Ensure category has at least a name property
          if (rel.category.name) {
            return rel.category;
          }
          // If the category object doesn't have a name, create a sanitized version
          return { name: `Category ${rel.categoryId || 'Unknown'}`, id: rel.categoryId };
        });
        
      if (validCategories.length > 0) {
        return validCategories;
      }
    } catch (error) {
      console.error(`Error extracting categories from relations for post ${post.id || post.title}:`, error);
      // Continue to fallback method
    }
  }
  
  // If no valid categories in relations, try the legacy field
  if (post.categories && typeof post.categories === 'string') {
    try {
      const categoryNames = post.categories.split(',').map(name => name.trim()).filter(Boolean);
      // Create simple category objects from names
      return categoryNames.map(name => ({
        id: name,
        name: name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }));
    } catch (error) {
      console.error(`Error parsing legacy categories for post ${post.id || post.title}:`, error);
      // Return empty array on error
    }
  }
  
  return [];
}

/**
 * Get formatted tags from a post
 * @param {Object} post - The post object
 * @returns {Array} - Array of tag names
 */
export function getPostTags(post) {
  // First try the new tagRelations structure
  if (post?.tagRelations && Array.isArray(post.tagRelations) && post.tagRelations.length > 0) {
    const validTags = post.tagRelations
      .filter(rel => rel && rel.tag && rel.tag.name)
      .map(rel => rel.tag);
      
    if (validTags.length > 0) {
      return validTags;
    }
  }
  
  // If no valid tags in relations, try the legacy field
  if (post?.tags) {
    const tagNames = post.tags.split(',').map(name => name.trim()).filter(Boolean);
    // Create simple tag objects from names
    return tagNames.map(name => ({
      id: name,
      name: name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));
  }
  
  return [];
}

/**
 * Get the URL for a post
 * @param {Object} post - The post object
 * @returns {string} - The post URL
 */
export function getPostUrl(post) {
  if (!post) return '/blog';
  // Always use ID for routes as we've standardized on [id] parameter
  return `/blog/${post.id}`;
}

/**
 * Format post categories as a comma-separated string
 * @param {Object} post - The post object
 * @returns {string} - Formatted category string
 */
export function getCategoriesString(post) {
  const categories = getPostCategories(post);
  if (!categories.length) return '';
  
  // Map through categories, handling both object and string formats
  return categories.map(cat => {
    if (typeof cat === 'object' && cat !== null && cat.name) {
      return cat.name;
    }
    return String(cat); // Ensure we have a string even if category is something unexpected
  }).join(', ');
}

/**
 * Format post tags as a comma-separated string
 * @param {Object} post - The post object
 * @returns {string} - Formatted tag string
 */
export function getTagsString(post) {
  const tags = getPostTags(post);
  if (!tags.length) return '';
  
  // Map through tags, handling both object and string formats
  return tags.map(tag => {
    if (typeof tag === 'object' && tag !== null && tag.name) {
      return tag.name;
    }
    return String(tag); // Ensure we have a string even if tag is something unexpected
  }).join(', ');
}
