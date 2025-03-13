import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Sorry, the post you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/posts"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        View All Posts
      </Link>
    </div>
  );
} 