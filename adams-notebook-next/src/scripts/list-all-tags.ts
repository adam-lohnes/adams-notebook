import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Listing all tags and their associated posts...\n');

  // Get all tags with their associated posts
  const tags = await prisma.tag.findMany({
    include: {
      posts: {
        select: {
          title: true,
          slug: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
  
  console.log(`Found ${tags.length} tags in the database:\n`);

  // Display each tag and its associated posts
  for (const tag of tags) {
    console.log(`Tag: ${tag.name} (${tag.posts.length} posts)`);
    
    if (tag.posts.length > 0) {
      console.log('Associated posts:');
      tag.posts.forEach(post => {
        console.log(`  - ${post.title} (${post.slug})`);
      });
    }
    
    console.log(''); // Empty line for readability
  }
}

main()
  .catch((e) => {
    console.error('Error listing tags:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 