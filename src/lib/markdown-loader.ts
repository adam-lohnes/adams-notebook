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
      
      // Convert markdown to HTML
      const html = markdownToHtml(content);
      
      // Create slug from filename
      const slug = file.replace('.md', '');
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
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
    
    // Convert markdown to HTML
    const html = markdownToHtml(content);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date: new Date(data.date),
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