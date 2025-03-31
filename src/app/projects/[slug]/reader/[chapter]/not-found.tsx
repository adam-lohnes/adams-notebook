import Link from 'next/link';

export default function ChapterNotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Chapter Not Found</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Sorry, the chapter you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex justify-center space-x-4">
        <Link 
          href="/projects"
          className="inline-block bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded"
        >
          View All Projects
        </Link>
        <Link 
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
} 