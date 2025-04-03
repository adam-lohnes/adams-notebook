import ProjectCard from '@/components/ui/ProjectCard';

// Temporary project data - this should eventually come from a data source
const projects = [
  {
    title: "Update Protocol",
    description: "A science fiction novel exploring the journey of a sentient AI testing system as it discovers the implications of consciousness",
    slug: "update-protocol-book",
    coverImage: "/images/projects/update-protocol-cover.jpg",
    cardImage: "/images/projects/update-protocol-cover_wide.jpg",
    blogPostSlug: "update-protocol-book",
    readerPath: "/projects/update-protocol-book/reader/cover"
  }
];

export const metadata = {
  title: "Projects | Adam's Notebook",
  description: "Browse all projects from Adam's Notebook",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of my software projects, books, and other creative works
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
} 