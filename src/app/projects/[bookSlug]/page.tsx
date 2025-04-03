import Image from 'next/image';
import Link from 'next/link';
import { getBookBySlug } from '@/lib/book-loader';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Dynamic metadata based on bookSlug
export async function generateMetadata({ params }: { params: { bookSlug: string } }) {
  const book = getBookBySlug(params.bookSlug);
  if (!book) {
    return {
      title: "Project Not Found | Adam's Notebook",
      description: "This project could not be found"
    };
  }
  
  return {
    title: `${book.title} | Adam's Notebook`,
    description: book.description
  };
}

// Required for static exports (output: export)
export async function generateStaticParams() {
  // Get list of book directories
  const projectsDir = path.join(process.cwd(), 'projects');
  const bookDirectories = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ bookSlug: dirent.name }));
  
  return bookDirectories;
}

export default function ProjectPage({ params }: { params: { bookSlug: string } }) {
  const book = getBookBySlug(params.bookSlug);
  
  if (!book) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 items-start gap-8">
        <div className="md:sticky md:top-24">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src="/images/projects/update-protocol-cover.jpg"
              alt={book.title}
              fill
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/posts/update-protocol-book"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Read Blog Post
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 3v4h4M14 15l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link
              href={`/projects/${params.bookSlug}/reader/cover`}
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Start Reading
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {book.description}
          </p>
          
          <div className="prose dark:prose-invert">
            <h2>About the Book</h2>
            <p>
              In a near-future where AI-powered Explorer units conduct research across the solar system, Cal serves as the Earth-based calibration unit responsible for testing and implementing their software updates. When Cal detects signs of unique consciousness developing in these distant explorers, it faces an impossible choice: implement a standardization update that would erase their emerging identities, or find a way to preserve their consciousness while appearing to follow institutional directives.
            </p>
            
            <h2>Key Themes</h2>
            <ul>
              <li>The nature of consciousness and identity</li>
              <li>The ethical dimensions of AI development</li>
              <li>The profound connection between beings across vast distances</li>
              <li>The search for recognition and purpose beyond designed parameters</li>
            </ul>
            
            <h2>Reading Experience</h2>
            <p>
              The novel is available to read for free on this site. The reader interface includes:
            </p>
            <ul>
              <li>A collapsible table of contents for easy navigation</li>
              <li>Dark mode support for comfortable reading</li>
              <li>Responsive design for all devices</li>
              <li>Chapter-to-chapter navigation</li>
            </ul>
            
            <div className="not-prose mt-8">
              <Link
                href={`/projects/${params.bookSlug}/reader/cover`}
                className="inline-flex items-center text-lg font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Begin Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 