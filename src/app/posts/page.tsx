import PostCard from '@/components/ui/PostCard';
import { getAllPosts } from '@/lib/db/posts';

export const metadata = {
  title: "All Posts | Adam's Notebook",
  description: "Browse all blog posts from Adam's Notebook",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">All Posts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through all {posts.length} articles and tutorials
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 