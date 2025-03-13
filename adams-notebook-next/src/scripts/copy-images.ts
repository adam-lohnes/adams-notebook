import fs from 'fs';
import path from 'path';

const sourceImagesDir = path.join(process.cwd(), '..', 'images');
const targetImagesDir = path.join(process.cwd(), 'public', 'images');

// Ensure target directory exists
if (!fs.existsSync(targetImagesDir)) {
  fs.mkdirSync(targetImagesDir, { recursive: true });
}

// Function to recursively copy files
function copyFilesRecursively(source: string, target: string) {
  // Check if source exists
  if (!fs.existsSync(source)) {
    console.log(`Source directory does not exist: ${source}`);
    return;
  }

  // Get all files and directories in the source
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      // Create the target directory if it doesn't exist
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      // Recursively copy files from this directory
      copyFilesRecursively(sourcePath, targetPath);
    } else {
      // Copy the file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${sourcePath} -> ${targetPath}`);
    }
  }
}

// Function to update image references in post content
async function updateImageReferences() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  try {
    // Update posts
    const posts = await prisma.post.findMany();
    for (const post of posts) {
      let updatedContent = post.content;
      
      // Replace image paths
      // This regex looks for image tags with relative paths
      updatedContent = updatedContent.replace(
        /src="(\.\.\/)*images\//g, 
        'src="/images/'
      );
      
      // Update the post if content changed
      if (updatedContent !== post.content) {
        await prisma.post.update({
          where: { id: post.id },
          data: { content: updatedContent },
        });
        console.log(`Updated image references in post: ${post.title}`);
      }
    }

    console.log('Image reference update completed successfully!');
  } catch (error) {
    console.error('Error updating image references:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Main function
async function main() {
  console.log('Starting image migration...');
  
  // Copy images
  copyFilesRecursively(sourceImagesDir, targetImagesDir);
  
  // Update image references in content
  await updateImageReferences();
  
  console.log('Image migration completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('Error during image migration:', error);
}); 