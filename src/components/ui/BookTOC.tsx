'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Chapter {
  title: string;
  slug: string;
  number: number;
}

interface BookTOCProps {
  chapters: Chapter[];
  bookSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookTOC({ chapters, bookSlug, isOpen, onClose }: BookTOCProps) {
  const pathname = usePathname();
  
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold">Table of Contents</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close table of contents"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <nav className="p-4 pb-16 overflow-y-auto h-full">
        <Link
          href={`/projects/${bookSlug}/reader/cover`}
          className={`block px-4 py-2 mb-2 rounded-md transition-colors ${
            pathname === `/projects/${bookSlug}/reader/cover`
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
          onClick={onClose}
        >
          Cover
        </Link>
        
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/projects/${bookSlug}/reader/${chapter.slug}`}
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === `/projects/${bookSlug}/reader/${chapter.slug}`
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
            onClick={onClose}
          >
            {chapter.number} - {chapter.title}
          </Link>
        ))}
      </nav>
    </div>
  );
} 