import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import matter from 'gray-matter';

const prisma = new PrismaClient();

async function postProcessDrafts() {
  console.log('Post-processing drafts...');
  
  try {
    // Get all drafts from the database
    const drafts = await prisma.draft.findMany({
      include: {
        tags: true,
      },
    });
    
    console.log(`Found ${drafts.length} drafts in the database.`);
    
    // Process each draft
    for (const draft of drafts) {
      const { slug, status } = draft;
      const sourceFilePath = path.join(process.cwd(), 'drafts', `${slug}.md`);
      
      // Skip if the file doesn't exist
      if (!fs.existsSync(sourceFilePath)) {
        console.log(`Draft file not found: ${sourceFilePath}`);
        continue;
      }
      
      // Read the file content
      const fileContent = fs.readFileSync(sourceFilePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Update the status in the frontmatter
      data.status = status;
      
      // Write the updated content back to the file
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(sourceFilePath, updatedContent);
      
      // Move the file to the appropriate directory based on status
      let targetDir;
      switch (status) {
        case 'draft':
          targetDir = path.join(process.cwd(), 'drafts');
          break;
        case 'in-progress':
          targetDir = path.join(process.cwd(), 'drafts', 'in-progress');
          break;
        case 'ready':
        case 'published':
          targetDir = path.join(process.cwd(), 'drafts', 'published');
          break;
        default:
          targetDir = path.join(process.cwd(), 'drafts');
      }
      
      const targetFilePath = path.join(targetDir, `${slug}.md`);
      
      // Only move if the file isn't already in the right place
      if (sourceFilePath !== targetFilePath) {
        fs.renameSync(sourceFilePath, targetFilePath);
        console.log(`Moved ${slug}.md to ${path.relative(process.cwd(), targetDir)}`);
      }
    }
    
    // Move article-ideas.md to the ideas directory
    const ideasSourcePath = path.join(process.cwd(), 'drafts', 'article-ideas.md');
    const ideasTargetPath = path.join(process.cwd(), 'drafts', 'ideas', 'article-ideas.md');
    
    if (fs.existsSync(ideasSourcePath) && ideasSourcePath !== ideasTargetPath) {
      fs.renameSync(ideasSourcePath, ideasTargetPath);
      console.log('Moved article-ideas.md to drafts/ideas/');
    }
    
    console.log('Post-processing complete!');
  } catch (error) {
    console.error('Error during post-processing:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
postProcessDrafts(); 