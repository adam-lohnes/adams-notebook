import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostCard from '@/components/ui/PostCard';
import { getPostsByTag, getAllTags } from '@/lib/db/posts';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  
  return tags.map(tag => ({
    tag: tag.name,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  
  return {
    title: `Posts tagged with "${decodedTag}" | Adam's Notebook`,
    description: `Browse all posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);
  
  if (posts.length === 0) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Posts tagged with &quot;{decodedTag}&quot;
      </h1>
      
      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 