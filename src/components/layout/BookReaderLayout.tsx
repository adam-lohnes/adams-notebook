'use client';

import { useState } from 'react';
import BookTOC from '@/components/ui/BookTOC';

interface Chapter {
  title: string;
  slug: string;
  number: number;
}

interface BookReaderLayoutProps {
  children: React.ReactNode;
  chapters: Chapter[];
  bookSlug: string;
}

export default function BookReaderLayout({ children, chapters, bookSlug }: BookReaderLayoutProps) {
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* TOC Toggle Button */}
      <button
        onClick={() => setIsTOCOpen(true)}
        className={`fixed top-24 left-4 z-20 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
          isTOCOpen ? 'hidden' : ''
        }`}
        aria-label="Open table of contents"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Table of Contents */}
      <BookTOC
        chapters={chapters}
        bookSlug={bookSlug}
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
      />
      
      {/* Main Content */}
      <main className="transition-all duration-300">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile */}
      {isTOCOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsTOCOpen(false)}
        />
      )}
    </div>
  );
} 