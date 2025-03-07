# Adam's Notebook Blog Project

This is a personal blog built with vanilla HTML, CSS, and JavaScript. The blog focuses on software projects, AI thoughts, and miscellaneous life experiences.

## Project Rules

For detailed project rules, please refer to:
- [Blog Project Rules](./rules/blog-rules.md)
- [AI Behavior Rules](./rules/ai-behavior.md)
- [HTML Rules](.rules/html-rules.md)
- [CSS Rules](.rules/css-rules.md)

## Key Principles

1. **Simplicity**: Maintain the vanilla HTML/CSS/JS approach without frameworks
2. **Organization**: Follow the date-based directory structure for posts
3. **Consistency**: Keep styling and navigation consistent across all pages
4. **Responsiveness**: Ensure the site works well on all device sizes
5. **Accessibility**: Maintain good accessibility practices throughout the site

## Quick Reference

- **Directory Structure**:
  - `/css`: Styling files
  - `/js`: JavaScript files
  - `/posts`: Blog posts organized by date (YYYY/MM/DD-title-slug.html)
  - `/templates`: Templates for creating new posts

- **Navigation**:
  - Site header links to home
  - "All Posts" links to posts.html
  - "About" links to the Hello World post

- **Theme Toggle**:
  - Supports system preference detection
  - Provides manual toggle with animation
  - Persists user preference in localStorage

- **Post Creation**:
  - Use templates in `/templates` directory
  - Follow date-based structure
  - Update index.html and posts.html with links to new posts 