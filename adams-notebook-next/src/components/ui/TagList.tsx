import Link from 'next/link';
import { Tag } from '@prisma/client';

interface TagListProps {
  tags: Tag[];
  className?: string;
}

export default function TagList({ tags, className = '' }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link 
          key={tag.id}
          href={`/tags/${encodeURIComponent(tag.name)}`}
        >
          <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            {tag.name}
          </span>
        </Link>
      ))}
    </div>
  );
} 