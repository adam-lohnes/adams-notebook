'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Tag {
  id: string;
  name: string;
}

interface Project {
  slug: string;
  title: string;
  description: string;
  date: Date | null;
  tags: Tag[];
  coverImage?: string;
  cardImage?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full" style={{ paddingTop: '66.67%' }}>
        {project.cardImage ? (
          <Image
            src={project.cardImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover absolute top-0 left-0"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg font-medium">Coming soon</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {project.title}
        </h3>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {project.date && (
            <time dateTime={new Date(project.date).toISOString()}>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Link 
              href={`/projects/${project.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
            >
              View Details
            </Link>
            <Link 
              href={`/projects/${project.slug}/reader`}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium text-sm"
            >
              Read Book
            </Link>
          </div>
          
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag.id}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  {tag.name}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400">
                  +{project.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 