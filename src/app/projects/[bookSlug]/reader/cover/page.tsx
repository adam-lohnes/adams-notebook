import { getCoverPage, getBookBySlug } from '@/lib/book-loader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Required for static exports (output: export)
export async function generateStaticParams() {
  // Get list of book directories
  const projectsDir = path.join(process.cwd(), 'projects');
  const bookDirectories = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ bookSlug: dirent.name }));
  
  return bookDirectories;
}

export default function CoverPage({ params }: { params: { bookSlug: string } }) {
  const book = getBookBySlug(params.bookSlug);
  const cover = getCoverPage(params.bookSlug);
  
  if (!book || !cover) {
    notFound();
  }
  
  return (
    <div className="flex flex-col items-center">
      {/* Start Reading Button */}
      <div className="w-full pb-6 flex justify-end">
        <Link
          href={`/projects/${params.bookSlug}/reader/chapter_1`}
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Start Reading
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="relative w-full max-w-lg aspect-[2/3] mb-8">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover rounded-lg shadow-lg"
          priority
        />
      </div>
      
      <div className="prose dark:prose-invert max-w-none w-full">
        <div dangerouslySetInnerHTML={{ __html: cover.html }} />
      </div>

      {/* Start Reading Button */}
      <div className="w-full pt-6 mt-6 flex justify-end border-t border-gray-200 dark:border-gray-600">
        <Link
          href={`/projects/${params.bookSlug}/reader/chapter_1`}
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Start Reading
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 