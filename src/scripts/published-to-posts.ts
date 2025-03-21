import { PrismaClient } from '@prisma/client';
import { markdownToHtml } from '../lib/markdown';

const prisma = new PrismaClient();

async function convertPublishedDraftsToPost() {
  console.log('Converting published drafts to posts...');
  
  try {
    // Get all published drafts
    const publishedDrafts = await prisma.draft.findMany({
      where: {
        status: 'published',
      },
      include: {
        tags: true,
      },
    });
    
    console.log(`Found ${publishedDrafts.length} published drafts to convert`);
    
    // Convert each published draft to a post
    for (const draft of publishedDrafts) {
      const { slug, title, description, content, tags, date } = draft;
      
      // Skip if date is null
      if (!date) {
        console.log(`Skipping ${slug} because date is null`);
        continue;
      }
      
      // Convert markdown content to HTML
      const htmlContent = markdownToHtml(content);
      console.log(`Converted markdown to HTML for ${slug}`);
      
      // Check if post already exists
      const existingPost = await prisma.post.findUnique({
        where: { slug },
      });
      
      if (existingPost) {
        console.log(`Post already exists: ${slug}, updating...`);
        await prisma.post.update({
          where: { slug },
          data: {
            title,
            description,
            content: htmlContent,
            date,
            year: date.getFullYear(),
            month: date.getMonth() + 1, // Months are 0-indexed in JS
            day: date.getDate(),
            tags: {
              connect: tags.map(tag => ({ id: tag.id })),
            },
          },
        });
      } else {
        console.log(`Creating new post: ${slug}`);
        await prisma.post.create({
          data: {
            slug,
            title,
            description,
            content: htmlContent,
            date,
            year: date.getFullYear(),
            month: date.getMonth() + 1, // Months are 0-indexed in JS
            day: date.getDate(),
            tags: {
              connect: tags.map(tag => ({ id: tag.id })),
            },
          },
        });
      }
      
      console.log(`Draft ${slug} converted to post successfully`);
    }
    
    console.log('Conversion complete!');
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
convertPublishedDraftsToPost(); 