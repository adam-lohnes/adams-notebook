import Link from 'next/link';
import ProjectCard from '@/components/ui/ProjectCard';
import { getProjects } from '@/lib/markdown-loader';

export const metadata = {
  title: 'Projects | Adam\'s Notebook',
  description: 'Browse my creative and software projects, including books, applications, and experiments.',
};

export default function ProjectsPage() {
  const projects = getProjects();
  
  // Format projects for display
  const formattedProjects = projects.map(project => ({
    slug: project.slug,
    title: project.title,
    description: project.description,
    date: project.date || new Date(),
    coverImage: project.coverImage,
    cardImage: project.cardImage,
    tags: project.tags.map(tag => ({ id: tag, name: tag })),
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">All Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through all {formattedProjects.length} projects and creative works
        </p>
      </header>
      
      {formattedProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No projects available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {formattedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
} 