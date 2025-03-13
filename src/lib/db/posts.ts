import prisma from './prisma';

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      tags: true,
    },
  });
  
  return posts;
}

export async function getRecentPosts(count = 5) {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: 'desc',
    },
    take: count,
    include: {
      tags: true,
    },
  });
  
  return posts;
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      tags: true,
    },
  });
  
  return post;
}

export async function getAllPostSlugs() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });
  
  return posts.map(post => post.slug);
}

export async function getPostsByTag(tagName: string) {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          name: tagName,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      tags: true,
    },
  });
  
  return posts;
}

export async function getAllTags() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
  
  return tags.map(tag => ({
    id: tag.id,
    name: tag.name,
    count: tag._count.posts,
  }));
} 