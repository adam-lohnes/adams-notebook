import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the post tags with some consolidation for better interlinking
const postTags = [
  {
    slug: 'ai-superpowers-redefining-possible',
    tags: ['ai', 'software-development', 'productivity', 'learning', 'innovation', 'technology', 
           'career-development', 'polymath', 'future-of-work']
  },
  {
    slug: 'core-skills-ai-era',
    tags: ['ai', 'learning', 'skill-development', 'education', 'critical-thinking', 
           'adaptability', 'systems-thinking', 'ethics', 'future-of-work']
  },
  {
    slug: 'ethical-considerations-ai-development',
    tags: ['ai', 'ethics', 'responsible-ai', 'technology', 'decision-making', 
           'data-privacy', 'ai-governance', 'ai-safety']
  }
];

// Helper function to normalize tag names (lowercase, replace spaces with hyphens)
function normalizeTagName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

async function main() {
  console.log('Adding tags to posts...');

  for (const postData of postTags) {
    // Find the post by slug
    const post = await prisma.post.findFirst({
      where: { slug: postData.slug },
      include: { tags: true }
    });

    if (!post) {
      console.error(`Post with slug "${postData.slug}" not found!`);
      continue;
    }

    console.log(`Processing post: ${post.title} (${post.id})`);
    
    // Process each tag
    for (const tagName of postData.tags) {
      const normalizedTagName = normalizeTagName(tagName);
      
      // Check if tag already exists in the database
      let tag = await prisma.tag.findFirst({
        where: { name: normalizedTagName }
      });
      
      // Create the tag if it doesn't exist
      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: normalizedTagName }
        });
        console.log(`Created new tag: ${normalizedTagName}`);
      }
      
      // Check if the post already has this tag
      const hasTag = post.tags.some(t => t.name === normalizedTagName);
      
      // Connect the tag to the post if not already connected
      if (!hasTag) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            tags: {
              connect: { id: tag.id }
            }
          }
        });
        console.log(`Added tag "${normalizedTagName}" to post "${post.title}"`);
      } else {
        console.log(`Post "${post.title}" already has tag "${normalizedTagName}"`);
      }
    }
    
    console.log(`Finished processing tags for post: ${post.title}`);
  }
  
  console.log('All tags added successfully!');
}

main()
  .catch((e) => {
    console.error('Error adding tags:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 