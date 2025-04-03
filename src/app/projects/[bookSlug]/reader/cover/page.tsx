import { getCoverPage, getBookBySlug } from '@/lib/book-loader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface CoverPageProps {
  params: {
    bookSlug: string;
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

export default function CoverPage({ params }: CoverPageProps) {
  const book = getBookBySlug(params.bookSlug);
  const cover = getCoverPage(params.bookSlug);
  
  if (!book || !cover) {
    notFound();
  }
  
  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
} 