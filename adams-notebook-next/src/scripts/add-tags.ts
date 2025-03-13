import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to add tags to posts...');

  // First, let's create some common tags
  const commonTags = [
    'javascript', 'typescript', 'react', 'nextjs', 'web-development',
    'programming', 'software', 'ai', 'machine-learning', 'tutorial',
    'guide', 'personal', 'thoughts', 'technology'
  ];

  // Create tags if they don't exist
  for (const tagName of commonTags) {
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

  // Get all posts
  const posts = await prisma.post.findMany();
  console.log(`Found ${posts.length} posts to process`);

  // Process each post and assign relevant tags
  for (const post of posts) {
    console.log(`Processing post: ${post.title}`);
    
    // Analyze post content and title to determine relevant tags
    const postTags: string[] = [];
    const lowerTitle = post.title.toLowerCase();
    const lowerContent = post.content.toLowerCase();
    const lowerDescription = post.description?.toLowerCase() || '';
    
    // Check for specific keywords in the post
    if (lowerTitle.includes('hello world') || lowerContent.includes('hello world')) {
      postTags.push('personal');
    }
    
    if (lowerContent.includes('javascript') || lowerContent.includes('js ')) {
      postTags.push('javascript');
    }
    
    if (lowerContent.includes('typescript') || lowerContent.includes('ts ')) {
      postTags.push('typescript');
    }
    
    if (lowerContent.includes('react') || lowerContent.includes('jsx')) {
      postTags.push('react');
    }
    
    if (lowerContent.includes('next.js') || lowerContent.includes('nextjs')) {
      postTags.push('nextjs');
    }
    
    if (lowerContent.includes('ai') || lowerContent.includes('artificial intelligence') || 
        lowerContent.includes('machine learning')) {
      postTags.push('ai');
      postTags.push('technology');
    }
    
    if (lowerContent.includes('tutorial') || lowerContent.includes('guide') || 
        lowerContent.includes('how to')) {
      postTags.push('tutorial');
    }
    
    // Add web-development tag if it's related to web technologies
    if (postTags.some(tag => ['javascript', 'typescript', 'react', 'nextjs'].includes(tag))) {
      postTags.push('web-development');
    }
    
    // Add programming tag for technical content
    if (postTags.some(tag => ['javascript', 'typescript', 'react', 'nextjs', 'web-development'].includes(tag))) {
      postTags.push('programming');
    }
    
    // Add technology tag for any tech-related content
    if (postTags.some(tag => ['javascript', 'typescript', 'react', 'nextjs', 'web-development', 'programming', 'ai'].includes(tag))) {
      postTags.push('technology');
    }
    
    // Add personal tag for reflective content
    if (lowerContent.includes('i think') || lowerContent.includes('my experience') || 
        lowerContent.includes('i believe') || lowerTitle.includes('thoughts')) {
      postTags.push('personal');
      postTags.push('thoughts');
    }
    
    // Remove duplicates
    const uniqueTags = [...new Set(postTags)];
    
    // If no tags were found, add a default tag
    if (uniqueTags.length === 0) {
      uniqueTags.push('general');
    }
    
    console.log(`Assigning tags to "${post.title}": ${uniqueTags.join(', ')}`);
    
    // Get tag IDs
    const tagRecords = await prisma.tag.findMany({
      where: {
        name: {
          in: uniqueTags
        }
      }
    });
    
    // Connect tags to post using the many-to-many relationship
    await prisma.post.update({
      where: { id: post.id },
      data: {
        tags: {
          connect: tagRecords.map(tag => ({ id: tag.id }))
        }
      }
    });
    
    console.log(`Connected ${tagRecords.length} tags to post "${post.title}"`);
  }

  console.log('Finished adding tags to posts!');
}

main()
  .catch((e) => {
    console.error('Error adding tags to posts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 