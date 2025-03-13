import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  // Print the first 200 characters of the content to verify
  console.log(`Post: ${post.title} (${post.id})`);
  console.log('Content preview:');
  console.log(post.content.substring(0, 200) + '...');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 