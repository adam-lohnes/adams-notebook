import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PostTagList from '@/components/ui/PostTagList';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown-loader';

type DraftPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs('drafts');
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: DraftPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug('drafts', slug);
    
    if (!post) {
      return {
        title: 'Draft Not Found',
        description: 'The requested draft could not be found.',
        robots: {
          index: false,
          follow: false,
        },
      };
    }
    
    return {
      title: `[DRAFT] ${post.title} | Adam's Lab`,
      description: post.description,
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for draft:', error);
    return {
      title: 'Adam\'s Lab',
      description: 'Private content testing area',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function DraftPage({ params }: DraftPageProps) {
  try {
    const { slug } = await params;
    const post = getPostBySlug('drafts', slug);
    
    if (!post) {
      notFound();
    }
    
    // Transform tags array into the expected format
    const tagObjects = post.tags.map(tag => ({ id: tag, name: tag }));
    
    return (
      <div className="max-w-3xl mx-auto">
        {/* Lab Navigation */}
        <div className="mb-6">
          <Link 
            href="/lab"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Content Lab
          </Link>
        </div>

        {/* Enhanced Draft Warning Banner */}
        <div className="bg-gradient-to-r from-yellow-50 via-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-start">
            <div className="bg-yellow-500 rounded-lg p-2 mr-4 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                Content Lab Preview
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                This is a private draft preview. Only you can see this content - it won't appear in search engines or your public blog.
              </p>
            </div>
          </div>
        </div>

        <article>
          <header className="mb-8">
            {/* Hero Image/Video with enhanced styling */}
            {(post.heroImage || post.heroVideo) && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
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
                {/* Draft overlay on hero image */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
                  DRAFT
                </div>
              </div>
            )}

            {/* Enhanced metadata section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <time dateTime={new Date(post.date).toISOString()}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'America/Los_Angeles'
                  })}
                </time>
              </div>
              <PostTagList tags={tagObjects} maxVisible={5} />
            </div>
            
            {/* Enhanced title and description */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {post.description}
              </p>
            </div>
          </header>
          
          {/* Enhanced content area */}
          <div className="prose dark:prose-invert prose-gray max-w-none mb-12 prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-img:rounded-lg prose-img:shadow-md prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
            <div 
              dangerouslySetInnerHTML={{ __html: post.html }} 
            />
          </div>
          
          {/* Enhanced footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link 
                href="/lab"
                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Content Lab
              </Link>
              
              {/* Additional draft actions */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Draft Mode
                </div>
                <span>•</span>
                <span>Not indexed</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering draft:`, error);
    notFound();
  }
} 