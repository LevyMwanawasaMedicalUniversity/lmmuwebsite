const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../lmmu.ac.zm');
const targetDir = path.join(__dirname, '../public/assets');

// Create structure for assets
const assetFolders = [
  'images',
  'images/about',
  'images/all-icon',
  'images/gallary',
  'images/hubs',
  'images/induction',
  'images/labour',
  'images/library',
  'images/news',
  'images/officers',
  'images/portals',
  'images/schools',
  'images/slider',
  'files',
  'css',
  'js',
];

// Create directories
async function createDirectories() {
  console.log('Creating asset directories...');
  
  for (const folder of assetFolders) {
    await fs.ensureDir(path.join(targetDir, folder));
    console.log(`Created: ${folder}`);
  }
}

// Copy images
async function copyImages() {
  console.log('Copying images...');
  
  try {
    // Copy main images
    await fs.copy(
      path.join(sourceDir, 'images'),
      path.join(targetDir, 'images'),
      { overwrite: true }
    );
    console.log('Images copied successfully');
  } catch (err) {
    console.error('Error copying images:', err);
  }
}

// Copy files (PDFs, etc.)
async function copyFiles() {
  console.log('Copying files...');
  
  try {
    await fs.copy(
      path.join(sourceDir, 'files'),
      path.join(targetDir, 'files'),
      { overwrite: true }
    );
    console.log('Files copied successfully');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

// Copy CSS
async function copyCss() {
  console.log('Copying CSS files...');
  
  try {
    await fs.copy(
      path.join(sourceDir, 'css'),
      path.join(targetDir, 'css'),
      { overwrite: true }
    );
    console.log('CSS files copied successfully');
  } catch (err) {
    console.error('Error copying CSS files:', err);
  }
}

// Copy JS
async function copyJs() {
  console.log('Copying JavaScript files...');
  
  try {
    await fs.copy(
      path.join(sourceDir, 'js'),
      path.join(targetDir, 'js'),
      { overwrite: true }
    );
    console.log('JavaScript files copied successfully');
  } catch (err) {
    console.error('Error copying JavaScript files:', err);
  }
}

// Main function
async function copyAssets() {
  try {
    await createDirectories();
    await copyImages();
    await copyFiles();
    await copyCss();
    await copyJs();
    console.log('All assets have been copied successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Execute
copyAssets();