import PostCard from '@/components/ui/PostCard';
import { getPublishedPosts } from '@/lib/markdown-loader';

export const metadata = {
  title: "All Posts | Adam's Notebook",
  description: "Browse all blog posts from Adam's Notebook",
};

export default function PostsPage() {
  const posts = getPublishedPosts();
  
  // Format posts for display
  const formattedPosts = posts.map(post => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    date: post.date || new Date(), // Provide fallback date
    year: post.date ? post.date.getFullYear() : new Date().getFullYear(),
    month: post.date ? post.date.getMonth() + 1 : new Date().getMonth() + 1,
    day: post.date ? post.date.getDate() : new Date().getDate(),
    createdAt: post.date || new Date(),
    updatedAt: post.date || new Date(),
    tags: post.tags.map(tag => ({ id: tag, name: tag })),
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">All Posts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through all {formattedPosts.length} articles and tutorials
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {formattedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 