import React from 'react';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/markdown-loader';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../../../lib/utils';
import TagList from '@/components/ui/TagList';

// Simple arrow left SVG icon
const ArrowLeftIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

type TutorialPageProps = {
  params: {
    slug: string;
  };
};

// Generate static params for all tutorials
export async function generateStaticParams() {
  const tutorials = getPublishedPosts('tutorials');
  
  return tutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

export async function generateMetadata(
  { params }: TutorialPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const tutorials = getPublishedPosts('tutorials');
  const tutorial = tutorials.find((tutorial) => tutorial.slug === slug);

  if (!tutorial) {
    return {
      title: 'Tutorial Not Found',
    };
  }

  return {
    title: `${tutorial.title} | Adam's Notebook`,
    description: tutorial.description,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      url: `https://adamsnotebook.com/tutorials/${slug}`,
      type: 'article',
      images: tutorial.heroImage
        ? [{ url: tutorial.heroImage, width: 1200, height: 630, alt: tutorial.title }]
        : undefined,
    },
  };
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const slug = params.slug;
  const tutorials = getPublishedPosts('tutorials');
  const tutorial = tutorials.find((tutorial) => tutorial.slug === slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <Link
        href="/tutorials"
        className="inline-flex items-center mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeftIcon />
        <span className="ml-2">Back to Tutorials</span>
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{tutorial.title}</h1>
        
        {tutorial.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{tutorial.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <time dateTime={tutorial.date.toISOString()}>{formatDate(tutorial.date)}</time>
          
          {tutorial.tags && tutorial.tags.length > 0 && (
            <div className="flex items-center">
              <span className="mx-2">•</span>
              <TagList tags={tutorial.tags.map(tag => ({ id: tag, name: tag }))} />
            </div>
          )}
        </div>
        
        {tutorial.heroImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={tutorial.heroImage}
              alt={tutorial.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: tutorial.html }}
      />
    </article>
  );
} 