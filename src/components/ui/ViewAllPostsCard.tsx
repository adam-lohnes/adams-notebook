'use client';

import Link from 'next/link';

export default function ViewAllPostsCard() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex items-center justify-center">
      <Link
        href="/posts"
        className="p-6 flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-700 p-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          View All Posts
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Explore the complete collection of articles and insights
        </p>
      </Link>
    </article>
  );
} 