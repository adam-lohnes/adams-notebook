'use client';

import Link from 'next/link';
import { Tag } from '@prisma/client';
import { usePathname } from 'next/navigation';

interface TagListProps {
  tags: Tag[];
  className?: string;
  maxVisible?: number;
}

export default function TagList({ tags, className = '', maxVisible = 2 }: TagListProps) {
  const pathname = usePathname();
  
  if (!tags || tags.length === 0) {
    return null;
  }
  
  // Check if we're on a tag page
  const currentTag = pathname.startsWith('/tags/') 
    ? decodeURIComponent(pathname.split('/').pop() || '') 
    : null;
  
  // Prioritize the current tag if we're on a tag page
  const displayTags = [...tags];
  
  if (currentTag) {
    // Find the current tag in the tags array
    const currentTagIndex = displayTags.findIndex(tag => tag.name === currentTag);
    
    // If the current tag exists in the array, move it to the front
    if (currentTagIndex !== -1) {
      const currentTagItem = displayTags.splice(currentTagIndex, 1)[0];
      displayTags.unshift(currentTagItem);
    }
  }
  
  // If there are 3 or fewer tags, show all of them
  const actualMaxVisible = tags.length <= 3 ? tags.length : maxVisible;
  
  // Determine how many tags to show and how many are hidden
  const visibleTags = displayTags.slice(0, actualMaxVisible);
  const hiddenCount = displayTags.length - visibleTags.length;
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleTags.map((tag) => (
        <Link 
          key={tag.id}
          href={`/tags/${encodeURIComponent(tag.name)}`}
        >
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors ${tag.name === currentTag ? 'ring-1 ring-gray-400 dark:ring-gray-600' : ''}`}>
            {tag.name}
          </span>
        </Link>
      ))}
      
      {hiddenCount > 0 && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
} 