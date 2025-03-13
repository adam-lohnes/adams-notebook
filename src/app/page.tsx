import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import { getRecentPosts } from '@/lib/db/posts';

export default async function Home() {
  const recentPosts = await getRecentPosts(5);
  
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-16 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Welcome to Adam&apos;s Notebook
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          A personal blog about software development, artificial intelligence, 
          and occasional thoughts on life and technology.
        </p>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
          <Link 
            href="/posts"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center"
          >
            View all posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
