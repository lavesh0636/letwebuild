const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define directories to be cleared
const DIRECTORIES_TO_CLEAR = [
  '.next',
  'node_modules/.cache'
];

/**
 * Clear specified directories
 */
function clearDirectories() {
  DIRECTORIES_TO_CLEAR.forEach((dir) => {
    const directoryPath = path.join(process.cwd(), dir);
    
    try {
      if (fs.existsSync(directoryPath)) {
        console.log(`🗑️  Removing ${dir}...`);
        fs.rmSync(directoryPath, { recursive: true, force: true });
        console.log(`✅ Successfully removed ${dir}`);
      } else {
        console.log(`ℹ️  ${dir} directory doesn't exist, skipping...`);
      }
    } catch (error) {
      console.error(`❌ Error removing ${dir}:`, error);
    }
  });
}

/**
 * Run necessary commands after clearing cache
 */
function runPostCleanupCommands() {
  console.log('🔍 Running npm install...');
  
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error during npm install:', error);
      return;
    }
    
    console.log(stdout);
    console.log('✅ Cache cleared successfully!');
    console.log('➡️  You can now run npm run dev to start your development server');
  });
}

// Execute script
console.log('🧹 Starting cache cleanup...');
clearDirectories();
runPostCleanupCommands(); 