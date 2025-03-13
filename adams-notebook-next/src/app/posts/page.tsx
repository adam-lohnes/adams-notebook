import PostCard from '@/components/ui/PostCard';
import { getAllPosts } from '@/lib/db/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">All Posts</h1>
      
      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 