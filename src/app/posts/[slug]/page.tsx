import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PostTagList from '@/components/ui/PostTagList';
import SocialShare from '@/components/ui/SocialShare';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown-loader';

type PostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs('posts');
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug('posts', slug);
    
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
  } catch (error) {
    console.error('Error generating metadata for post:', error);
    return {
      title: 'Adam\'s Notebook',
      description: 'A personal blog about software development, AI, and technology',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = getPostBySlug('posts', slug);
    
    if (!post) {
      notFound();
    }
    
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adamsnotebook.com'}/posts/${post.slug}`;
    
    // Transform tags array into the expected format
    const tagObjects = post.tags.map(tag => ({ id: tag, name: tag }));
    
    return (
      <div className="max-w-3xl mx-auto">
        <article>
          <header className="mb-8">
            <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden">
              {post.heroVideo && (
                <video
                  src={post.heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {post.heroImage && !post.heroVideo && (
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-600 dark:text-gray-400 mb-4">
              <time dateTime={new Date(post.date).toISOString()}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'America/Los_Angeles'
                })}
              </time>
              <PostTagList tags={tagObjects} maxVisible={5} />
            </div>
            <SocialShare url={postUrl} title={post.title} className="mt-4" />
          </header>
          
          <div className="prose dark:prose-invert prose-gray max-w-none mb-12">
            <div 
              dangerouslySetInnerHTML={{ __html: post.html }} 
              className="prose-headings:font-bold prose-headings:tracking-tight prose-img:rounded-lg prose-img:shadow-md"
            />
            <SocialShare url={postUrl} title={post.title} className="mt-4" />
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
  } catch (error) {
    console.error(`Error rendering post:`, error);
    notFound();
  }
} 