import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/db/posts';
import PostTagList from '@/components/ui/PostTagList';
import SocialShare from '@/components/ui/SocialShare';

type PostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adamsnotebook.com'}/posts/${post.slug}`;
  
  return (
    <div className="max-w-3xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={new Date(post.date).toISOString()}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <PostTagList tags={post.tags} maxVisible={5} />
          </div>
          <SocialShare url={postUrl} title={post.title} className="mt-4" />
        </header>
        
        <div className="prose dark:prose-invert prose-gray max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="prose-headings:font-bold prose-headings:tracking-tight prose-a:text-gray-900 dark:prose-a:text-gray-100 prose-a:underline prose-a:decoration-gray-300 dark:prose-a:decoration-gray-700 hover:prose-a:decoration-gray-500 dark:hover:prose-a:decoration-gray-500 prose-img:rounded-lg prose-img:shadow-md"
          />
        </div>
        
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-start">
            <Link 
              href="/posts"
              className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
} 