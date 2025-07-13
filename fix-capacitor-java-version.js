const fs = require('fs');
const path = require('path');

const files = [
  '@capacitor/android/capacitor/build.gradle',
  '@capacitor/app/android/build.gradle',
  '@capacitor/haptics/android/build.gradle',
  '@capacitor/keyboard/android/build.gradle',
  '@capacitor/status-bar/android/build.gradle',
];

files.forEach((relPath) => {
  const fullPath = path.join('node_modules', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/JavaVersion\.VERSION_21/g, 'JavaVersion.VERSION_17');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Patched: ${relPath}`);
  }
});
