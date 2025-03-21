import { marked } from 'marked';

/**
 * Converts markdown content to HTML
 * @param markdown The markdown content to convert
 * @returns The HTML content
 */
export function markdownToHtml(markdown: string): string {
  try {
    // Configure marked options
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Convert line breaks to <br>
    });
    
    // Convert markdown to HTML
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown; // Return original content if conversion fails
  }
} 