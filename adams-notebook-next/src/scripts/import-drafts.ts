import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import matter from 'gray-matter';

const prisma = new PrismaClient();
const draftsDir = path.join(process.cwd(), '..', 'drafts');
const outputDir = path.join(process.cwd(), 'imported-drafts');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract metadata from Markdown draft
function extractDraftMetadata(filePath: string) {
  // Read file content
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContent);
  
  // Extract filename for slug
  const fileName = path.basename(filePath);
  const slug = fileName.replace('.md', '');
  
  // Parse date if available
  let date = null;
  if (data.date) {
    date = new Date(data.date);
  }
  
  // Extract tags
  const tags = Array.isArray(data.tags) ? data.tags : [];
  
  return {
    title: data.title || 'Untitled Draft',
    description: data.description || '',
    content,
    date,
    slug,
    status: data.status || 'draft',
    tags,
  };
}

// Main import function
async function importDrafts() {
  try {
    console.log('Starting draft import...');
    
    // Get all markdown files
    const files = fs.readdirSync(draftsDir)
      .filter(file => file.endsWith('.md') && file !== 'README.md' && file !== 'article-ideas.md');
    
    console.log(`Found ${files.length} draft files`);
    
    // Process each file
    for (const fileName of files) {
      const filePath = path.join(draftsDir, fileName);
      console.log(`Processing ${filePath}`);
      
      // Extract metadata
      const metadata = extractDraftMetadata(filePath);
      
      // Create tags first
      const tagObjects = [];
      for (const tagName of metadata.tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
        tagObjects.push({ id: tag.id });
      }
      
      // Save to database
      const draft = await prisma.draft.create({
        data: {
          title: metadata.title,
          slug: metadata.slug,
          description: metadata.description,
          content: metadata.content,
          date: metadata.date,
          status: metadata.status,
          tags: {
            connect: tagObjects,
          },
        },
      });
      
      console.log(`Imported draft: ${draft.title} (${draft.slug})`);
      
      // Save a copy of the processed data
      fs.writeFileSync(
        path.join(outputDir, `${metadata.slug}.json`),
        JSON.stringify(metadata, null, 2)
      );
    }
    
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing drafts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importDrafts(); 