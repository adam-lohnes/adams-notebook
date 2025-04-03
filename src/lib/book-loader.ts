import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface Chapter {
  title: string;
  slug: string;
  number: number;
  content: string;
  html: string;
}

interface Book {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  chapters: Chapter[];
}

const booksDirectory = path.join(process.cwd(), 'projects');

export function getBookBySlug(bookSlug: string): Book | null {
  try {
    const bookDirectory = path.join(booksDirectory, bookSlug);
    
    // Get all chapter files
    const chapterFiles = fs.readdirSync(bookDirectory)
      .filter(file => file.startsWith('chapter_') && file.endsWith('.md'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_')[1].split('.')[0]);
        const numB = parseInt(b.split('_')[1].split('.')[0]);
        return numA - numB;
      });
    
    // Process each chapter
    const chapters = chapterFiles.map(filename => {
      const filePath = path.join(bookDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(fileContents);
      
      // Convert markdown to HTML
      const processedContent = remark()
        .use(html)
        .processSync(content)
        .toString();
      
      const chapterNumber = parseInt(filename.split('_')[1].split('.')[0]);
      
      return {
        title: `Chapter ${chapterNumber}`,
        slug: `chapter_${chapterNumber}`,
        number: chapterNumber,
        content,
        html: processedContent
      };
    });
    
    // Get book metadata from cover.md
    const coverPath = path.join(bookDirectory, 'cover.md');
    const coverContents = fs.readFileSync(coverPath, 'utf8');
    const { data: coverData, content: coverContent } = matter(coverContents);
    
    // Convert cover markdown to HTML
    const coverHtml = remark()
      .use(html)
      .processSync(coverContent)
      .toString();
    
    return {
      slug: bookSlug,
      title: coverData.title || 'Untitled Book',
      description: coverData.description || '',
      coverImage: coverData.coverImage || '',
      chapters
    };
  } catch (error) {
    console.error(`Error loading book ${bookSlug}:`, error);
    return null;
  }
}

export function getChapterBySlug(bookSlug: string, chapterSlug: string): Chapter | null {
  const book = getBookBySlug(bookSlug);
  if (!book) return null;
  
  return book.chapters.find(chapter => chapter.slug === chapterSlug) || null;
}

export function getCoverPage(bookSlug: string): { html: string } | null {
  try {
    const coverPath = path.join(booksDirectory, bookSlug, 'cover.md');
    const coverContents = fs.readFileSync(coverPath, 'utf8');
    const { content } = matter(coverContents);
    
    // Convert markdown to HTML
    const coverHtml = remark()
      .use(html)
      .processSync(content)
      .toString();
    
    return { html: coverHtml };
  } catch (error) {
    console.error(`Error loading cover for ${bookSlug}:`, error);
    return null;
  }
} 