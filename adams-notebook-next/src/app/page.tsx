import Link from 'next/link';
import prisma from '@/lib/db/prisma';

async function getRecentPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 5,
    include: {
      tags: true,
    },
  });
  
  return posts;
}

export default async function Home() {
  const recentPosts = await getRecentPosts();
  
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Adam&apos;s Notebook</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          A personal blog about software projects, AI thoughts, and life experiences.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Recent Posts</h2>
        <div className="space-y-8">
          {recentPosts.map((post) => (
            <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-8">
              <h3 className="text-2xl font-bold mb-2">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="text-gray-600 dark:text-gray-400 mb-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag.id}
                    className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8">
          <Link 
            href="/posts"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            View All Posts
          </Link>
        </div>
      </section>
    </div>
  );
}
