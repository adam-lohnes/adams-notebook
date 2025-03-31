import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';

export interface MarkdownPost {
  slug: string;
  title: string;
  description: string;
  date: Date;
  content: string;
  html: string;
  tags: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: Date;
  content: string;
  html: string;
  tags: string[];
  coverImage?: string;
  cardImage?: string;
  chapters?: Chapter[];
}

export interface Chapter {
  number: number;
  title: string;
  content: string;
  html: string;
}

export function getPublishedPosts(): MarkdownPost[] {
  try {
    const publishedDir = path.join(process.cwd(), 'drafts', 'published');
    
    // Check if directory exists
    if (!fs.existsSync(publishedDir)) {
      console.warn(`Published directory not found: ${publishedDir}`);
      return [];
    }
    
    // Get all markdown files
    const files = fs.readdirSync(publishedDir).filter(file => file.endsWith('.md'));
    
    // Parse each file
    const posts = files.map(file => {
      const filePath = path.join(publishedDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Ensure date is properly parsed
      let date: Date;
      if (data.date) {
        // Handle date as string (from frontmatter)
        if (typeof data.date === 'string') {
          // Ensure the date is properly formatted
          const cleanDate = data.date.replace(/['"`]/g, '').trim();
          // Force a specific time to avoid timezone issues
          date = new Date(`${cleanDate}T12:00:00.000Z`);
        } else {
          // Handle date object
          date = new Date(data.date);
        }
      } else {
        date = new Date();
      }
      
      // Convert markdown to HTML
      const html = markdownToHtml(content);
      
      // Create slug from filename
      const slug = file.replace('.md', '');
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date,
        content,
        html,
        tags: data.tags || [],
      };
    });
    
    // Sort by date (newest first)
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error reading published posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): MarkdownPost | null {
  try {
    const publishedDir = path.join(process.cwd(), 'drafts', 'published');
    const filePath = path.join(publishedDir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Ensure date is properly parsed
    let date: Date;
    if (data.date) {
      // Handle date as string (from frontmatter)
      if (typeof data.date === 'string') {
        // Ensure the date is properly formatted
        const cleanDate = data.date.replace(/['"`]/g, '').trim();
        // Force a specific time to avoid timezone issues
        date = new Date(`${cleanDate}T12:00:00.000Z`);
      } else {
        // Handle date object
        date = new Date(data.date);
      }
    } else {
      date = new Date();
    }
    
    // Convert markdown to HTML
    const html = markdownToHtml(content);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date,
      content,
      html,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  try {
    const publishedDir = path.join(process.cwd(), 'drafts', 'published');
    
    // Check if directory exists
    if (!fs.existsSync(publishedDir)) {
      console.warn(`Published directory not found: ${publishedDir}`);
      return [];
    }
    
    // Get all markdown files and extract slugs
    return fs.readdirSync(publishedDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
}

export function getAllTags(): { name: string; count: number }[] {
  try {
    const posts = getPublishedPosts();
    const tagCounts = new Map<string, number>();
    
    // Count occurrences of each tag
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    
    // Convert to array of objects
    return Array.from(tagCounts.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  } catch (error) {
    console.error('Error getting tags:', error);
    return [];
  }
}

export function getPostsByTag(tagName: string): MarkdownPost[] {
  try {
    const posts = getPublishedPosts();
    return posts.filter(post => post.tags.includes(tagName));
  } catch (error) {
    console.error(`Error getting posts for tag ${tagName}:`, error);
    return [];
  }
}

export function getProjects(): Project[] {
  try {
    const projectsDir = path.join(process.cwd(), 'projects');
    
    // Check if directory exists
    if (!fs.existsSync(projectsDir)) {
      console.warn(`Projects directory not found: ${projectsDir}`);
      return [];
    }
    
    // Get all markdown files
    const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));
    
    // Parse each file
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Ensure date is properly parsed
      let date: Date;
      if (data.date) {
        // Handle date as string (from frontmatter)
        if (typeof data.date === 'string') {
          // Ensure the date is properly formatted
          const cleanDate = data.date.replace(/['"`]/g, '').trim();
          // Force a specific time to avoid timezone issues
          date = new Date(`${cleanDate}T12:00:00.000Z`);
        } else {
          // Handle date object
          date = new Date(data.date);
        }
      } else {
        date = new Date();
      }
      
      // Convert markdown to HTML
      const html = markdownToHtml(content);
      
      // Create slug from filename
      const slug = file.replace('.md', '');
      
      // Check for chapters in project directory
      const projectDir = path.join(projectsDir, slug.replace(/\.md$/, ''));
      let chapters: Chapter[] = [];
      
      if (fs.existsSync(projectDir) && fs.statSync(projectDir).isDirectory()) {
        const chapterFiles = fs.readdirSync(projectDir)
          .filter(file => file.match(/chapter_\d+\.md/))
          .sort((a, b) => {
            const numA = parseInt(a.match(/chapter_(\d+)\.md/)?.[1] || '0');
            const numB = parseInt(b.match(/chapter_(\d+)\.md/)?.[1] || '0');
            return numA - numB;
          });
          
        chapters = chapterFiles.map((chapterFile, index) => {
          const chapterPath = path.join(projectDir, chapterFile);
          const chapterFileContent = fs.readFileSync(chapterPath, 'utf8');
          const { data: chapterData, content: chapterMarkdown } = matter(chapterFileContent);
          const chapterHtml = markdownToHtml(chapterMarkdown);
          
          return {
            number: index + 1,
            title: chapterData.title || `Chapter ${index + 1}`,
            content: chapterMarkdown,
            html: chapterHtml
          };
        });
      }
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date,
        content,
        html,
        tags: data.tags || [],
        coverImage: data.coverImage,
        cardImage: data.cardImage,
        chapters
      };
    });
    
    // Sort by date (newest first)
    return projects.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const projectsDir = path.join(process.cwd(), 'projects');
    const filePath = path.join(projectsDir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Ensure date is properly parsed
    let date: Date;
    if (data.date) {
      // Handle date as string (from frontmatter)
      if (typeof data.date === 'string') {
        // Ensure the date is properly formatted
        const cleanDate = data.date.replace(/['"`]/g, '').trim();
        // Force a specific time to avoid timezone issues
        date = new Date(`${cleanDate}T12:00:00.000Z`);
      } else {
        // Handle date object
        date = new Date(data.date);
      }
    } else {
      date = new Date();
    }
    
    // Convert markdown to HTML
    const html = markdownToHtml(content);
    
    // Get chapters if they exist
    const projectDir = path.join(projectsDir, slug);
    let chapters: Chapter[] = [];
    
    if (fs.existsSync(projectDir) && fs.statSync(projectDir).isDirectory()) {
      const chapterFiles = fs.readdirSync(projectDir)
        .filter(file => file.match(/chapter_\d+\.md/))
        .sort((a, b) => {
          const numA = parseInt(a.match(/chapter_(\d+)\.md/)?.[1] || '0');
          const numB = parseInt(b.match(/chapter_(\d+)\.md/)?.[1] || '0');
          return numA - numB;
        });
        
      chapters = chapterFiles.map((chapterFile, index) => {
        const chapterPath = path.join(projectDir, chapterFile);
        const chapterFileContent = fs.readFileSync(chapterPath, 'utf8');
        const { data: chapterData, content: chapterMarkdown } = matter(chapterFileContent);
        const chapterHtml = markdownToHtml(chapterMarkdown);
        
        return {
          number: index + 1,
          title: chapterData.title || `Chapter ${index + 1}`,
          content: chapterMarkdown,
          html: chapterHtml
        };
      });
    }
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date,
      content,
      html,
      tags: data.tags || [],
      coverImage: data.coverImage,
      cardImage: data.cardImage,
      chapters
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export function getAllProjectSlugs(): string[] {
  try {
    const projectsDir = path.join(process.cwd(), 'projects');
    
    // Check if directory exists
    if (!fs.existsSync(projectsDir)) {
      console.warn(`Projects directory not found: ${projectsDir}`);
      return [];
    }
    
    // Get all markdown files and extract slugs
    return fs.readdirSync(projectsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error getting project slugs:', error);
    return [];
  }
}

export function getProjectChapter(projectSlug: string, chapterNumber: number): Chapter | null {
  try {
    const project = getProjectBySlug(projectSlug);
    if (!project || !project.chapters || project.chapters.length === 0) {
      return null;
    }
    
    return project.chapters.find(chapter => chapter.number === chapterNumber) || null;
  } catch (error) {
    console.error(`Error getting chapter ${chapterNumber} for project ${projectSlug}:`, error);
    return null;
  }
} 