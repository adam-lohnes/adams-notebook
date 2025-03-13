import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning all posts content...');

  // Get all posts
  const posts = await prisma.post.findMany();
  
  console.log(`Found ${posts.length} posts to clean`);

  for (const post of posts) {
    console.log(`Processing post: ${post.title} (${post.id})`);
    
    // Clean up the content by removing the title, date, and social share elements
    let cleanedContent = post.content;
    
    // Remove the title (matches h1 with the post title)
    cleanedContent = cleanedContent.replace(new RegExp(`<h1>${post.title}<\\/h1>`), '');
    
    // Remove the date (matches div with class post-meta containing a date)
    const dateRegex = /<div class="post-meta">.*?<\/div>/;
    cleanedContent = cleanedContent.replace(dateRegex, '');
    
    // Remove the social share section
    cleanedContent = cleanedContent.replace(
      /<div class="social-share">[\s\S]*?<\/div>\s*<\/div>\s*/, 
      ''
    );
    
    // Remove any extra whitespace at the beginning
    cleanedContent = cleanedContent.trim();

    // Update the post with the cleaned content
    await prisma.post.update({
      where: { id: post.id },
      data: {
        content: cleanedContent
      }
    });

    console.log(`Post "${post.title}" cleaned successfully!`);
  }
  
  console.log('All posts content cleaned successfully!');
}

main()
  .catch((e) => {
    console.error('Error cleaning posts content:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 