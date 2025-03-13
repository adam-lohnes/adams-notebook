import { Metadata } from 'next';
import Link from 'next/link';
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
  const tag = await Promise.resolve(params.tag);
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Posts tagged with "${decodedTag}" | Adam's Notebook`,
    description: `Browse all posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = await Promise.resolve(params.tag);
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);
  
  if (posts.length === 0) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link href="/tags" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            All Tags
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{decodedTag}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Posts tagged with &quot;{decodedTag}&quot;
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400">
          Found {posts.length} {posts.length === 1 ? 'post' : 'posts'} with this tag
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