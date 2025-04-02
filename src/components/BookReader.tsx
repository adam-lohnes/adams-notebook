'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Chapter, Project } from '@/lib/markdown-loader';

interface BookReaderProps {
  project: Project;
  chapter: Chapter;
  prevChapterNum: number | null;
  nextChapterNum: number | null;
}

export default function BookReader({ project, chapter, prevChapterNum, nextChapterNum }: BookReaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showToc, setShowToc] = useState(false);
  const [bookmark, setBookmark] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Set up progress tracking using localStorage
  useEffect(() => {
    // Save reading progress
    if (typeof window !== 'undefined') {
      localStorage.setItem(`book_progress_${project.slug}`, chapter.number.toString());
      
      // Load bookmark if exists
      const savedBookmark = localStorage.getItem(`bookmark_${project.slug}_chapter_${chapter.number}`);
      if (savedBookmark) {
        setBookmark(parseInt(savedBookmark));
        // Scroll to bookmark position after content is rendered
        setTimeout(() => {
          if (contentRef.current && bookmark) {
            contentRef.current.scrollTo(0, bookmark);
          }
        }, 100);
      }
    }
  }, [project.slug, chapter.number, bookmark]);

  const saveBookmark = () => {
    if (contentRef.current) {
      const scrollPosition = contentRef.current.scrollTop;
      localStorage.setItem(`bookmark_${project.slug}_chapter_${chapter.number}`, scrollPosition.toString());
      setBookmark(scrollPosition);
      // Show visual feedback
      alert('Bookmark saved!');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Left arrow to go to previous chapter
    if (e.key === 'ArrowLeft' && prevChapterNum) {
      router.push(`/projects/${project.slug}/reader/${prevChapterNum}`);
    }
    // Right arrow to go to next chapter
    else if (e.key === 'ArrowRight' && nextChapterNum) {
      router.push(`/projects/${project.slug}/reader/${nextChapterNum}`);
    }
    // B key to bookmark
    else if (e.key === 'b' || e.key === 'B') {
      saveBookmark();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevChapterNum, nextChapterNum]);

  const toggleTableOfContents = () => {
    setShowToc(!showToc);
  };

  // Check if we're on the cover page (chapter 0)
  const isCoverPage = chapter.number === 0;

  return (
    <div className="reader-container relative">
      {/* Backdrop for mobile */}
      {showToc && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
          onClick={toggleTableOfContents}
          aria-hidden="true"
        />
      )}

      {/* TOC Sidebar */}
      <div 
        className={`toc-sidebar fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 p-4 overflow-y-auto z-40 transform transition-transform duration-300 ${
          showToc ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Table of Contents</h3>
          <button 
            onClick={toggleTableOfContents}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close table of contents"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cover thumbnail */}
        {project.coverImage && (
          <Link 
            href={`/projects/${project.slug}/reader/cover`}
            className="block mb-4 hover:opacity-90 transition-opacity"
            onClick={toggleTableOfContents}
          >
            <div className="relative w-full" style={{ paddingTop: '150%' }}>
              <Image
                src={project.coverImage}
                alt={`${project.title} Cover`}
                fill
                className="rounded-lg shadow object-cover"
              />
            </div>
          </Link>
        )}

        <div className="grid gap-2">
          {project.chapters?.map((c) => {
            const isActive = c.number === chapter.number;
            const linkClass = isActive
              ? 'py-2 px-3 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
              : 'py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700';
            
            return (
              <Link
                key={c.number}
                href={`/projects/${project.slug}/reader/${c.number}`}
                className={linkClass}
                onClick={toggleTableOfContents}
              >
                <span className="mr-2 text-gray-500 dark:text-gray-400">
                  {c.number}.
                </span> 
                {c.title}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="reader-content-container" ref={contentRef}>
        <div className="reader-header sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 mb-6 p-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={toggleTableOfContents}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle table of contents"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="text-center flex-1">
              <h2 className="text-sm md:text-base font-medium truncate">
                {project.title} - {isCoverPage ? 'Cover' : `Chapter ${chapter.number}`}
              </h2>
            </div>
            
            <button 
              onClick={saveBookmark}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Save bookmark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4">
          {isCoverPage ? (
            <div className="flex flex-col items-center">
              {project.coverImage && (
                <div className="relative w-full max-w-lg mx-auto mb-8" style={{ paddingTop: '150%' }}>
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} Cover`}
                    fill
                    className="rounded-lg shadow-lg object-cover"
                    priority
                  />
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{project.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">{project.description}</p>
              <Link
                href={`/projects/${project.slug}/reader/1`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Begin Reading
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="reader-title mb-8 text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{chapter.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">Chapter {chapter.number} of {project.chapters?.length}</p>
              </div>
              
              <div 
                className="reader-content prose dark:prose-invert max-w-none mb-12"
                style={{
                  lineHeight: 1.7,
                }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: chapter.html }}
                  className="prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-img:mx-auto"
                />
              </div>
            </>
          )}
          
          <div className="reader-navigation flex justify-between items-center mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            {prevChapterNum ? (
              <Link
                href={`/projects/${project.slug}/reader/${prevChapterNum}`}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Chapter
              </Link>
            ) : (
              <div className="w-24"></div>
            )}
            
            <Link
              href={`/projects/${project.slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
            >
              Back to Project
            </Link>
            
            {nextChapterNum ? (
              <Link
                href={`/projects/${project.slug}/reader/${nextChapterNum}`}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Next Chapter
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="w-24"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 