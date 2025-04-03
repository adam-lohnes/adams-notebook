import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    slug: string;
    coverImage: string;
    cardImage?: string;
    blogPostSlug?: string;
    readerPath?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Project Image */}
      <div className="relative w-full h-48">
        <Image
          src={project.cardImage || project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          <Link 
            href={`/projects/${project.slug}`}
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {project.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <Link 
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full transition-colors"
          >
            Project Details
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {project.blogPostSlug && (
            <Link 
              href={`/posts/${project.blogPostSlug}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full transition-colors"
            >
              Read Blog Post
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 3v4h4M14 15l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
          
          {project.readerPath && (
            <Link 
              href={project.readerPath}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full transition-colors"
            >
              Read Book
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
} 