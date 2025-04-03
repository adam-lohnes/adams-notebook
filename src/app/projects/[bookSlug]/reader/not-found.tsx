import Link from 'next/link';

export default function ReaderNotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Chapter Not Found</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Sorry, the chapter you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          href="/projects"
          className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
        >
          View All Projects
        </Link>
        <Link 
          href="/projects/update-protocol-book/reader/cover"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Start from Cover
        </Link>
      </div>
    </div>
  );
} 