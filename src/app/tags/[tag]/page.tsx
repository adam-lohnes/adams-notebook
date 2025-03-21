import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/ui/PostCard';
import { getPostsByTag, getAllTags } from '@/lib/markdown-loader';

type TagPageProps = {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({
    tag: tag.name,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  try {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag);
    
    if (!posts.length) {
      return {
        title: 'Tag Not Found',
        description: 'The requested tag could not be found.',
      };
    }
    
    return {
      title: `${decodedTag} | Adam's Notebook`,
      description: `Posts tagged with ${decodedTag}`,
    };
  } catch (error) {
    console.error('Error generating metadata for tag:', error);
    return {
      title: 'Tags | Adam\'s Notebook',
      description: 'Browse posts by tag',
    };
  }
}

export default async function TagPage({ params }: TagPageProps) {
  try {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag);
    
    if (!posts.length) {
      notFound();
    }
    
    // Transform posts to match expected format
    const formattedPosts = posts.map(post => ({
      id: post.slug,
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      date: post.date || new Date(),
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
          {formattedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering tag page:`, error);
    notFound();
  }
} 