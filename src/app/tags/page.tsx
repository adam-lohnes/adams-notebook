import Link from 'next/link';
import { getAllTags } from '@/lib/markdown-loader';

export const metadata = {
  title: 'All Tags | Adam\'s Notebook',
  description: 'Browse all tags on Adam\'s Notebook',
};

export default function TagsPage() {
  const tags = getAllTags();
  
  // Filter out tags with no posts and sort by post count (descending)
  const filteredTags = tags.filter(tag => tag.count > 0);
  const sortedTags = [...filteredTags].sort((a, b) => b.count - a.count);
  
  // Transform tags to match expected format
  const formattedTags = sortedTags.map(tag => ({
    id: tag.name,
    name: tag.name,
    count: tag.count
  }));
  
  if (formattedTags.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">All Tags</h1>
          <p className="text-gray-600 dark:text-gray-400">
            No tags found with published content.
          </p>
        </header>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">All Tags</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse content by topic across {formattedTags.length} different tags
        </p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {formattedTags.map((tag) => (
          <Link 
            key={tag.id}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">{tag.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              {tag.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
} 