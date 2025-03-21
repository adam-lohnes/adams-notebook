import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function publishDrafts() {
  console.log('Publishing drafts...');
  
  try {
    // Get all "ready" drafts from the database
    const drafts = await prisma.draft.findMany({
      where: {
        status: 'ready',
      },
      include: {
        tags: true,
      },
    });
    
    console.log(`Found ${drafts.length} ready drafts in the database.`);
    
    // Create the published directory if it doesn't exist
    const publishedDir = path.join(process.cwd(), 'drafts', 'published');
    if (!fs.existsSync(publishedDir)) {
      fs.mkdirSync(publishedDir, { recursive: true });
    }
    
    // Process each draft
    for (const draft of drafts) {
      const { slug } = draft;
      const inProgressFilePath = path.join(process.cwd(), 'drafts', 'in-progress', `${slug}.md`);
      const publishedFilePath = path.join(publishedDir, `${slug}.md`);
      
      // Skip if the in-progress file doesn't exist
      if (!fs.existsSync(inProgressFilePath)) {
        console.log(`Draft file not found: ${inProgressFilePath}`);
        continue;
      }
      
      // Move the file to the published directory
      fs.copyFileSync(inProgressFilePath, publishedFilePath);
      fs.unlinkSync(inProgressFilePath);
      console.log(`Moved ${slug}.md to drafts/published/`);
      
      // Update status to published in the database
      await prisma.draft.update({
        where: { slug },
        data: { status: 'published' },
      });
      console.log(`Updated status of ${slug} to 'published'`);
    }
    
    console.log('Publishing complete!');
  } catch (error) {
    console.error('Error during publishing:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
publishDrafts(); 