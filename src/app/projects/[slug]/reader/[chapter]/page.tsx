import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import BookReader from '@/components/BookReader';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/markdown-loader';

type ChapterReaderProps = {
  params: { 
    slug: string;
    chapter: string;
  };
}

export async function generateStaticParams() {
  // Generate static params for all chapters of all projects
  const projectSlugs = getAllProjectSlugs();
  const params = [];
  
  for (const slug of projectSlugs) {
    const project = getProjectBySlug(slug);
    if (project?.chapters && project.chapters.length > 0) {
      for (let i = 1; i <= project.chapters.length; i++) {
        params.push({
          slug,
          chapter: String(i)
        });
      }
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: ChapterReaderProps): Promise<Metadata> {
  const { slug, chapter } = params;
  const chapterNumber = parseInt(chapter);
  const project = getProjectBySlug(slug);
  
  if (!project || !project.chapters || isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > project.chapters.length) {
    return {
      title: 'Chapter Not Found',
      description: 'The requested chapter could not be found.',
    };
  }
  
  const currentChapter = project.chapters[chapterNumber - 1];
  
  return {
    title: `${currentChapter.title} | ${project.title} | Adam's Notebook`,
    description: `Chapter ${chapterNumber} of ${project.title} - ${project.description}`,
  };
}

export default function ChapterReaderPage({ params }: ChapterReaderProps) {
  const { slug, chapter } = params;
  const chapterNumber = parseInt(chapter);
  const project = getProjectBySlug(slug);
  
  // Validate project and chapter number
  if (!project) {
    notFound();
  }
  
  if (!project.chapters || project.chapters.length === 0) {
    redirect(`/projects/${slug}`);
  }
  
  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > project.chapters.length) {
    redirect(`/projects/${slug}/reader/1`);
  }
  
  const currentChapter = project.chapters[chapterNumber - 1];
  const nextChapter = chapterNumber < project.chapters.length ? chapterNumber + 1 : null;
  const prevChapter = chapterNumber > 1 ? chapterNumber - 1 : null;
  
  return (
    <div className="reader-page-container min-h-screen">
      <BookReader
        project={project}
        chapter={currentChapter}
        prevChapterNum={prevChapter}
        nextChapterNum={nextChapter}
      />
    </div>
  );
} 