import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/markdown-loader';

type ProjectPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
  
  return {
    title: `${project.title} | Adam's Notebook`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  const projectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adamsnotebook.com'}/projects/${project.slug}`;
  const tagObjects = project.tags.map(tag => ({ id: tag, name: tag }));
  const hasChapters = project.chapters && project.chapters.length > 0;
  
  return (
    <div className="max-w-4xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={new Date(project.date).toISOString()}>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'America/Los_Angeles'
              })}
            </time>
            
            {tagObjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tagObjects.map(tag => (
                  <span 
                    key={tag.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        <div className="prose dark:prose-invert prose-gray max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ __html: project.html }} 
            className="prose-headings:font-bold prose-headings:tracking-tight prose-a:text-gray-900 dark:prose-a:text-gray-100 prose-a:underline prose-a:decoration-gray-300 dark:prose-a:decoration-gray-700 hover:prose-a:decoration-gray-500 dark:hover:prose-a:decoration-gray-500 prose-img:rounded-lg prose-img:shadow-md"
          />
        </div>
        
        {hasChapters && (
          <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Book Contents</h2>
            <div className="grid gap-4">
              {project.chapters!.map((chapter) => (
                <Link 
                  key={chapter.number}
                  href={`/projects/${project.slug}/reader/${chapter.number}`}
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Chapter {chapter.number}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {chapter.title}
                      </h3>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Link 
                href={`/projects/${project.slug}/reader`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Start Reading
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </section>
        )}
        
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between">
            <Link 
              href="/projects"
              className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all projects
            </Link>
            
            {hasChapters && (
              <Link 
                href={`/projects/${project.slug}/reader`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Open Book Reader
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
} 