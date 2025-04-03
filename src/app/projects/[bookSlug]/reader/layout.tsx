import { getBookBySlug } from '@/lib/book-loader';
import { notFound } from 'next/navigation';
import BookReaderLayout from '@/components/layout/BookReaderLayout';
import fs from 'fs';
import path from 'path';
import SocialShare from '@/components/ui/SocialShare';

// Required for static exports (output: export)
export async function generateStaticParams() {
  // Get list of book directories
  const projectsDir = path.join(process.cwd(), 'projects');
  const bookDirectories = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ bookSlug: dirent.name }));
  
  return bookDirectories;
}

export default function Layout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: { bookSlug: string }
}) {
  const book = getBookBySlug(params.bookSlug);
  
  if (!book) {
    notFound();
  }

  const projectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adamsnotebook.com'}/projects/${params.bookSlug}/reader/cover`;

  
  return (
    <>
    <SocialShare url={projectUrl} title={params.bookSlug} className="w-fit mb-4 m-auto" />

    <BookReaderLayout
      chapters={book.chapters}
      bookSlug={params.bookSlug}
    >
      {children}
    </BookReaderLayout>
    </>
  );
} 