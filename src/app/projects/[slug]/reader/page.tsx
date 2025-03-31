import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/markdown-loader';

type ReaderProps = {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ReaderProps): Promise<Metadata> {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
  
  return {
    title: `${project.title} | Reader | Adam's Notebook`,
    description: `Read ${project.title} online - ${project.description}`,
  };
}

export default function ReaderPage({ params }: ReaderProps) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project || !project.chapters || project.chapters.length === 0) {
    redirect(`/projects/${slug}`);
  }
  
  // Redirect to the first chapter
  redirect(`/projects/${slug}/reader/1`);
} 