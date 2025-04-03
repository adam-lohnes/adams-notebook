import { getChapterBySlug, getBookBySlug } from '@/lib/book-loader';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface ChapterPageProps {
  params: {
    bookSlug: string;
    chapterSlug: string;
  };
}

// Required for static exports (output: export)
export async function generateStaticParams() {
  // Get list of book directories
  const projectsDir = path.join(process.cwd(), 'projects');
  const bookDirectories = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());
  
  const params = [];
  
  // For each book, get list of chapter files
  for (const bookDir of bookDirectories) {
    const bookSlug = bookDir.name;
    const bookPath = path.join(projectsDir, bookSlug);
    
    const chapterFiles = fs.readdirSync(bookPath)
      .filter(file => file.startsWith('chapter_') && file.endsWith('.md'));
    
    // Add each chapter as a parameter
    for (const chapterFile of chapterFiles) {
      const chapterSlug = chapterFile.replace('.md', '');
      params.push({
        bookSlug,
        chapterSlug
      });
    }
  }
  
  return params;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const book = getBookBySlug(params.bookSlug);
  const chapter = getChapterBySlug(params.bookSlug, params.chapterSlug);
  
  if (!book || !chapter) {
    notFound();
  }
  
  // Find previous and next chapters
  const currentIndex = book.chapters.findIndex(ch => ch.slug === params.chapterSlug);
  const prevChapter = currentIndex > 0 ? book.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < book.chapters.length - 1 ? book.chapters[currentIndex + 1] : null;
  
  return (
    <div>
      <div className="prose dark:prose-invert max-w-none">
        <h1>{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.html }} />
      </div>
      
      {/* Navigation */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          {prevChapter ? (
            <Link
              href={`/projects/${params.bookSlug}/reader/${prevChapter.slug}`}
              className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous Chapter
            </Link>
          ) : (
            <Link
              href={`/projects/${params.bookSlug}/reader/cover`}
              className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cover
            </Link>
          )}
          
          {nextChapter && (
            <Link
              href={`/projects/${params.bookSlug}/reader/${nextChapter.slug}`}
              className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Next Chapter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 