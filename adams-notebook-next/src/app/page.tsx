import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import { getRecentPosts } from '@/lib/db/posts';

export default async function Home() {
  const recentPosts = await getRecentPosts(5);
  
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
            <PostCard key={post.id} post={post} />
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
