// Script to export published posts from the database to markdown files
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Initialize Prisma client
const prisma = new PrismaClient();

// Directory where the markdown files will be saved
const publishedDir = path.join(process.cwd(), 'drafts', 'published');

// Ensure the published directory exists
if (!fs.existsSync(publishedDir)) {
  fs.mkdirSync(publishedDir, { recursive: true });
}

async function exportPostsToMarkdown() {
  try {
    // Fetch all published posts with their tags
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    console.log(`Found ${posts.length} posts to export`);

    for (const post of posts) {
      const { slug, title, description, date, content, tags } = post;

      // Format the tags array for frontmatter
      const tagNames = tags.map(tag => tag.name);

      // Create frontmatter
      const frontmatter = {
        title,
        description,
        date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        tags: tagNames,
        status: 'ready',
      };

      // Create markdown content with frontmatter
      const markdown = matter.stringify(content, frontmatter);

      // Write to file
      const filePath = path.join(publishedDir, `${slug}.md`);
      fs.writeFileSync(filePath, markdown, 'utf8');

      console.log(`Exported ${slug}.md`);
    }

    console.log('Export completed successfully!');
  } catch (error) {
    console.error('Error exporting posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the export function
exportPostsToMarkdown(); 