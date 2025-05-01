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
  heroImage?: string;
}

export function getPublishedPosts(dir: string): MarkdownPost[] {
  try {
    const publishedDir = path.join(process.cwd(), dir);
    
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
        heroImage: data.heroImage,
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
      heroImage: data.heroImage,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(dir: string): string[] {
  try {
    const publishedDir = path.join(process.cwd(), dir);
    
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
    const posts = getPublishedPosts('posts');
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
    const posts = getPublishedPosts('posts');
    return posts.filter(post => post.tags.includes(tagName));
  } catch (error) {
    console.error(`Error getting posts for tag ${tagName}:`, error);
    return [];
  }
} 