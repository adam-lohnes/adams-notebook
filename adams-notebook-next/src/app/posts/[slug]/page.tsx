import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/db/posts';
import TagList from '@/components/ui/TagList';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Adam's Notebook`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose dark:prose-invert lg:prose-lg mx-auto">
        <h1>{post.title}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-6">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        
        <TagList tags={post.tags} className="mb-8" />
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/posts"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
} 