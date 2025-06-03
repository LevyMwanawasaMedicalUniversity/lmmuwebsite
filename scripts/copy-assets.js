const fs = require('fs-extra');
const path = require('path');

// Configuration
const sourceDir = path.join(__dirname, '../lmmu.ac.zm');
const targetDir = path.join(__dirname, '../public/assets');
const logFile = path.join(__dirname, '../asset-migration-log.txt');

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
  'images/graduation',
  'images/tradefair',
  'images/university',
  'images/academics',
  'images/administration',
  'files',
  'css',
  'js',
  'fonts',
];

// Logging function
function log(message, isError = false) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  // Console output
  if (isError) {
    console.error(logMessage);
  } else {
    console.log(logMessage);
  }
  
  // File output
  fs.appendFileSync(logFile, logMessage + '\n');
}

// Initialize log file
function initLogFile() {
  fs.writeFileSync(logFile, `=== LMMU Website Asset Migration Log - ${new Date().toISOString()} ===\n\n`);
  log('Starting asset migration process');
}

// Create directories
async function createDirectories() {
  log('Creating asset directories...');
  
  try {
    // Ensure the target directory exists
    await fs.ensureDir(targetDir);
    
    // Create all asset folders
    for (const folder of assetFolders) {
      await fs.ensureDir(path.join(targetDir, folder));
      log(`Created directory: ${folder}`);
    }
    
    log('All directories created successfully');
  } catch (err) {
    log(`Error creating directories: ${err.message}`, true);
    throw err;
  }
}

// Copy images with tracking
async function copyImages() {
  log('Copying images...');
  
  try {
    // Check if source directory exists
    if (!await fs.pathExists(path.join(sourceDir, 'images'))) {
      log('Source images directory not found', true);
      return;
    }
    
    // Get list of all image files
    const imageFiles = await fs.readdir(path.join(sourceDir, 'images'), { recursive: true });
    log(`Found ${imageFiles.length} image files/directories to process`);
    
    // Copy main images directory with all subdirectories
    await fs.copy(
      path.join(sourceDir, 'images'),
      path.join(targetDir, 'images'),
      { 
        overwrite: true,
        filter: (src) => {
          // Skip temporary files like .DS_Store
          const filename = path.basename(src);
          return !filename.startsWith('.');
        }
      }
    );
    
    log('Images copied successfully');
  } catch (err) {
    log(`Error copying images: ${err.message}`, true);
    throw err;
  }
}

// Copy files (PDFs, docs, etc.)
async function copyFiles() {
  log('Copying document files...');
  
  try {
    // Check if source directory exists
    if (!await fs.pathExists(path.join(sourceDir, 'files'))) {
      log('Source files directory not found. Skipping this step.');
      return;
    }
    
    await fs.copy(
      path.join(sourceDir, 'files'),
      path.join(targetDir, 'files'),
      { 
        overwrite: true,
        filter: (src) => {
          const filename = path.basename(src);
          return !filename.startsWith('.');
        }
      }
    );
    
    log('Document files copied successfully');
  } catch (err) {
    log(`Error copying document files: ${err.message}`, true);
    throw err;
  }
}

// Copy CSS with tracking
async function copyCss() {
  log('Copying CSS files...');
  
  try {
    // Check if source directory exists
    if (!await fs.pathExists(path.join(sourceDir, 'css'))) {
      log('Source CSS directory not found. Skipping this step.');
      return;
    }
    
    // Get list of CSS files
    const cssFiles = await fs.readdir(path.join(sourceDir, 'css'));
    log(`Found ${cssFiles.length} CSS files to copy`);
    
    await fs.copy(
      path.join(sourceDir, 'css'),
      path.join(targetDir, 'css'),
      { overwrite: true }
    );
    
    log('CSS files copied successfully');
  } catch (err) {
    log(`Error copying CSS files: ${err.message}`, true);
    throw err;
  }
}

// Copy JS with tracking
async function copyJs() {
  log('Copying JavaScript files...');
  
  try {
    // Check if source directory exists
    if (!await fs.pathExists(path.join(sourceDir, 'js'))) {
      log('Source JS directory not found. Skipping this step.');
      return;
    }
    
    // Get list of JS files
    const jsFiles = await fs.readdir(path.join(sourceDir, 'js'));
    log(`Found ${jsFiles.length} JavaScript files to copy`);
    
    await fs.copy(
      path.join(sourceDir, 'js'),
      path.join(targetDir, 'js'),
      { overwrite: true }
    );
    
    log('JavaScript files copied successfully');
  } catch (err) {
    log(`Error copying JavaScript files: ${err.message}`, true);
    throw err;
  }
}

// Copy fonts
async function copyFonts() {
  log('Copying font files...');
  
  try {
    // Check if source directory exists
    if (!await fs.pathExists(path.join(sourceDir, 'fonts'))) {
      log('Source fonts directory not found. Skipping this step.');
      return;
    }
    
    await fs.copy(
      path.join(sourceDir, 'fonts'),
      path.join(targetDir, 'fonts'),
      { overwrite: true }
    );
    
    log('Font files copied successfully');
  } catch (err) {
    log(`Error copying font files: ${err.message}`, true);
    throw err;
  }
}

// Create a manifest of all copied assets
async function createAssetManifest() {
  log('Creating asset manifest...');
  
  try {
    const manifest = {
      timestamp: new Date().toISOString(),
      assetCount: {
        images: 0,
        css: 0,
        js: 0,
        fonts: 0,
        files: 0
      },
      assetPaths: {
        images: [],
        css: [],
        js: [],
        fonts: [],
        files: []
      }
    };
    
    // Count and list images
    if (await fs.pathExists(path.join(targetDir, 'images'))) {
      const walkImages = async (dir) => {
        const items = await fs.readdir(dir, { withFileTypes: true });
        
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          const relativePath = path.relative(targetDir, fullPath);
          
          if (item.isDirectory()) {
            await walkImages(fullPath);
          } else {
            manifest.assetCount.images++;
            manifest.assetPaths.images.push(relativePath);
          }
        }
      };
      
      await walkImages(path.join(targetDir, 'images'));
    }
    
    // Count and list CSS files
    if (await fs.pathExists(path.join(targetDir, 'css'))) {
      const cssFiles = await fs.readdir(path.join(targetDir, 'css'));
      manifest.assetCount.css = cssFiles.length;
      manifest.assetPaths.css = cssFiles.map(file => `css/${file}`);
    }
    
    // Count and list JS files
    if (await fs.pathExists(path.join(targetDir, 'js'))) {
      const jsFiles = await fs.readdir(path.join(targetDir, 'js'));
      manifest.assetCount.js = jsFiles.length;
      manifest.assetPaths.js = jsFiles.map(file => `js/${file}`);
    }
    
    // Count and list font files
    if (await fs.pathExists(path.join(targetDir, 'fonts'))) {
      const fontFiles = await fs.readdir(path.join(targetDir, 'fonts'));
      manifest.assetCount.fonts = fontFiles.length;
      manifest.assetPaths.fonts = fontFiles.map(file => `fonts/${file}`);
    }
    
    // Count and list document files
    if (await fs.pathExists(path.join(targetDir, 'files'))) {
      const docFiles = await fs.readdir(path.join(targetDir, 'files'));
      manifest.assetCount.files = docFiles.length;
      manifest.assetPaths.files = docFiles.map(file => `files/${file}`);
    }
    
    // Write manifest to file
    await fs.writeJSON(path.join(targetDir, 'asset-manifest.json'), manifest, { spaces: 2 });
    
    log(`Asset manifest created with ${manifest.assetCount.images} images, ${manifest.assetCount.css} CSS files, ${manifest.assetCount.js} JS files, ${manifest.assetCount.fonts} font files, and ${manifest.assetCount.files} document files`);
  } catch (err) {
    log(`Error creating asset manifest: ${err.message}`, true);
  }
}

// Main function
async function copyAssets() {
  try {
    // Initialize log file
    initLogFile();
    
    // Start timer
    const startTime = Date.now();
    
    // Run all asset copying functions
    await createDirectories();
    await copyImages();
    await copyFiles();
    await copyCss();
    await copyJs();
    await copyFonts();
    await createAssetManifest();
    
    // Calculate execution time
    const executionTime = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`Asset migration completed successfully in ${executionTime} seconds!`);
    
    console.log('\n==============================================');
    console.log('✅ Asset migration completed successfully!');
    console.log(`📊 Execution time: ${executionTime} seconds`);
    console.log('📄 See asset-migration-log.txt for details');
    console.log('==============================================\n');
  } catch (error) {
    log(`Asset migration failed: ${error.message}`, true);
    console.error('\n❌ Asset migration failed. See log file for details.\n');
  }
}

// Execute the script
copyAssets();