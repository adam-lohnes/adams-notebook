import React from 'react';
import PostCard from '@/components/ui/PostCard';
import { getPublishedPosts } from '@/lib/markdown-loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorials | Adam\'s Notebook',
  description: 'Step-by-step tutorials on technology, AI, self-hosting, and more.',
};

export default function TutorialsPage() {
  // Get all published tutorials
  const allTutorials = getPublishedPosts('tutorials');
  
  // Format tutorials for display
  const formattedTutorials = allTutorials.map(tutorial => ({
    id: tutorial.slug,
    slug: tutorial.slug,
    title: tutorial.title,
    description: tutorial.description,
    content: tutorial.content,
    date: tutorial.date || new Date(), // Provide fallback date
    year: tutorial.date ? tutorial.date.getFullYear() : new Date().getFullYear(),
    month: tutorial.date ? tutorial.date.getMonth() + 1 : new Date().getMonth() + 1,
    day: tutorial.date ? tutorial.date.getDate() : new Date().getDate(),
    createdAt: tutorial.date || new Date(),
    updatedAt: tutorial.date || new Date(),
    tags: tutorial.tags.map(tag => ({ id: tag, name: tag })),
    heroImage: tutorial.heroImage,
  }));
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Tutorials</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Step-by-step guides to help you build, configure, and master various technical projects.
        </p>
      </div>
      
      {formattedTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {formattedTutorials.map((tutorial) => (
            <PostCard key={tutorial.id} post={tutorial} basePath="/tutorials" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No tutorials found.</p>
        </div>
      )}
    </div>
  );
} 