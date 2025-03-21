import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import matter from 'gray-matter';

const prisma = new PrismaClient();

async function importMyDrafts() {
  console.log('Importing drafts from in-progress directory...');
  
  try {
    const draftsDir = path.join(process.cwd(), 'drafts', 'in-progress');
    const files = fs.readdirSync(draftsDir).filter(file => file.endsWith('.md'));
    
    console.log(`Found ${files.length} draft files`);
    
    for (const file of files) {
      const filePath = path.join(draftsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      const slug = file.replace('.md', '');
      const title = data.title;
      const description = data.description;
      const date = data.date ? new Date(data.date) : new Date();
      const status = data.status || 'in-progress';
      const tags = data.tags || [];
      
      console.log(`Processing ${slug}: ${title}`);
      
      // Check if draft already exists
      const existingDraft = await prisma.draft.findUnique({
        where: { slug },
      });
      
      if (existingDraft) {
        console.log(`Updating existing draft: ${slug}`);
        await prisma.draft.update({
          where: { slug },
          data: {
            title,
            description,
            content,
            date,
            status,
            tags: {
              connectOrCreate: tags.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag }
              }))
            }
          }
        });
      } else {
        console.log(`Creating new draft: ${slug}`);
        await prisma.draft.create({
          data: {
            slug,
            title,
            description,
            content,
            date,
            status,
            tags: {
              connectOrCreate: tags.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag }
              }))
            }
          }
        });
      }
      
      console.log(`Draft ${slug} imported successfully`);
    }
    
    console.log('Drafts import complete!');
  } catch (error) {
    console.error('Error during drafts import:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
importMyDrafts(); 