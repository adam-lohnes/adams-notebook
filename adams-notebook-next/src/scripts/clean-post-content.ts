import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning post content...');

  // Find the Hello World post
  const post = await prisma.post.findFirst({
    where: {
      slug: 'hello-world'
    }
  });

  if (!post) {
    console.error('Hello World post not found!');
    return;
  }

  console.log(`Found post: ${post.title} (${post.id})`);

  // Clean up the content by removing the title, date, and social share elements
  let cleanedContent = post.content;
  
  // Remove the title
  cleanedContent = cleanedContent.replace(/<h1>Hello World<\/h1>/, '');
  
  // Remove the date
  cleanedContent = cleanedContent.replace(/<div class="post-meta">March 6, 2025<\/div>/, '');
  
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

  console.log('Post content cleaned successfully!');
}

main()
  .catch((e) => {
    console.error('Error cleaning post content:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 