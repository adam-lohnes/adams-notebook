import Link from 'next/link';
import { getAllTags } from '@/lib/db/posts';

export const metadata = {
  title: 'All Tags | Adam\'s Notebook',
  description: 'Browse all tags on Adam\'s Notebook',
};

export default async function TagsPage() {
  const tags = await getAllTags();
  
  // Sort tags by post count (descending)
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">All Tags</h1>
      
      <div className="flex flex-wrap gap-4">
        {sortedTags.map((tag) => (
          <Link 
            key={tag.id}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="font-medium">{tag.name}</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 