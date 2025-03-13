import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const postsDir = path.join(process.cwd(), '..', 'posts');
const outputDir = path.join(process.cwd(), 'imported-posts');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract metadata from HTML post
function extractPostMetadata(htmlContent: string, filePath: string) {
  const root = parse(htmlContent);
  
  // Extract title
  const titleElement = root.querySelector('article.post-content h1');
  const title = titleElement ? titleElement.text.trim() : 'Untitled Post';
  
  // Extract date
  const dateElement = root.querySelector('.post-meta');
  const dateText = dateElement ? dateElement.text.trim() : '';
  
  // Extract description
  const metaDescription = root.querySelector('meta[name="description"]');
  const description = metaDescription ? metaDescription.getAttribute('content') || '' : '';
  
  // Extract content
  const contentElement = root.querySelector('article.post-content');
  const content = contentElement ? contentElement.innerHTML : '';
  
  // Extract path components for date
  const pathParts = filePath.split(path.sep);
  const fileName = pathParts[pathParts.length - 1];
  const slug = fileName.replace('.html', '');
  
  // Get year, month, day from path
  const yearIndex = pathParts.indexOf('posts') + 1;
  const year = parseInt(pathParts[yearIndex] || '2025');
  const month = parseInt(pathParts[yearIndex + 1] || '1');
  const day = parseInt(pathParts[yearIndex + 2] || '1');
  
  // Parse date from path components
  const date = new Date(year, month - 1, day);
  
  return {
    title,
    description,
    content,
    date,
    year,
    month,
    day,
    slug,
  };
}

// Function to recursively find all HTML files
async function findHtmlFiles(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() 
        ? await findHtmlFiles(fullPath) 
        : entry.name.endsWith('.html') 
          ? [fullPath] 
          : [];
    })
  );
  
  return files.flat();
}

// Main import function
async function importPosts() {
  try {
    console.log('Starting post import...');
    
    // Find all HTML files
    const htmlFiles = await findHtmlFiles(postsDir);
    console.log(`Found ${htmlFiles.length} HTML files`);
    
    // Process each file
    for (const filePath of htmlFiles) {
      console.log(`Processing ${filePath}`);
      
      // Read file content
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      // Extract metadata
      const metadata = extractPostMetadata(htmlContent, filePath);
      
      // Save to database
      const post = await prisma.post.create({
        data: {
          title: metadata.title,
          slug: metadata.slug,
          description: metadata.description,
          content: metadata.content,
          date: metadata.date,
          year: metadata.year,
          month: metadata.month,
          day: metadata.day,
        },
      });
      
      console.log(`Imported post: ${post.title} (${post.slug})`);
      
      // Save a copy of the processed data
      fs.writeFileSync(
        path.join(outputDir, `${metadata.slug}.json`),
        JSON.stringify(metadata, null, 2)
      );
    }
    
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importPosts(); 