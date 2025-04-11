'use client';

import Link from 'next/link';
import Image from 'next/image';
import TagList from './TagList';

interface Tag {
  id: string;
  name: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: Date | null;
  tags: Tag[];
  heroImage?: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Format date in Pacific Time
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Los_Angeles'
      })
    : 'No date';

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {post.heroImage && (
        <Link href={`/posts/${post.slug}`} className="block relative w-full aspect-[16/9]">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider font-medium">
          <time dateTime={post.date ? new Date(post.date).toISOString() : ''}>{formattedDate}</time>
        </div>
        
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <div className="flex justify-between items-center">
          <TagList tags={post.tags} />
          
          <Link 
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
} 