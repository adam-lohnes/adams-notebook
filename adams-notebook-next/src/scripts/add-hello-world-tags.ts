import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding tags to Hello World post...');

  // Create tags for Hello World post
  const helloWorldTags = ['personal', 'introduction', 'thoughts'];
  
  // Create tags if they don't exist
  for (const tagName of helloWorldTags) {
    const existingTag = await prisma.tag.findFirst({
      where: { name: tagName }
    });

    if (!existingTag) {
      await prisma.tag.create({
        data: { name: tagName }
      });
      console.log(`Created tag: ${tagName}`);
    }
  }

  // Find the Hello World post
  const helloWorldPost = await prisma.post.findFirst({
    where: {
      slug: 'hello-world'
    }
  });

  if (!helloWorldPost) {
    console.error('Hello World post not found!');
    return;
  }

  console.log(`Found post: ${helloWorldPost.title} (${helloWorldPost.id})`);

  // Get tag records
  const tagRecords = await prisma.tag.findMany({
    where: {
      name: {
        in: helloWorldTags
      }
    }
  });

  // Connect tags to post
  await prisma.post.update({
    where: { id: helloWorldPost.id },
    data: {
      tags: {
        connect: tagRecords.map(tag => ({ id: tag.id }))
      }
    }
  });

  console.log(`Connected ${tagRecords.length} tags to Hello World post`);
}

main()
  .catch((e) => {
    console.error('Error adding tags:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 