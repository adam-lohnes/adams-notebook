# Adam's Notebook Blog Project Rules

## Project Overview
This is a personal blog called "Adam's Notebook" built with vanilla HTML, CSS, and JavaScript. The blog focuses on software projects, AI thoughts, and miscellaneous life experiences.

## Directory Structure
- `/css`: Contains styling files
- `/js`: Contains JavaScript files
- `/posts`: Contains blog posts organized by date (YYYY/MM/DD-title-slug.html)
- `/templates`: Contains templates for creating new posts

## Styling Guidelines
- Use the existing color scheme defined in CSS variables
- Support both light and dark themes
- Maintain responsive design for all screen sizes
- Keep styling consistent across all pages

## Content Structure
- Blog posts should be organized by date: `/posts/YYYY/MM/DD/title-slug.html`
- Each post should use the template structure from `/templates/post-template.html`
- Post metadata should include title, date, and description

## Navigation
- The site header ("Adam's Notebook") serves as the home link
- Navigation includes "All Posts" and "About" (which links to the Hello World post)
- The theme toggle button should always be present in the header

## Post Cards
- Post cards should be fully clickable
- Cards should have a consistent design with title, date, description, and link
- Cards should have hover effects for better user interaction

## Footer
- Footer should be sticky to the bottom of the viewport when content is shorter
- Copyright year should be 2025
- Footer should be consistent across all pages

## Theme Toggle
- Support system preference detection for dark/light mode
- Provide a toggle button with sun/moon animation
- Persist user preference using localStorage

## Lists
- Lists should have custom styling with primary color bullets/numbers
- Proper spacing and indentation for better readability
- Consistent styling for both ordered and unordered lists

## Creating New Posts
1. Use the template in `/templates/post-template.md` for drafting
2. Convert to HTML using the structure in `/templates/post-template.html`
3. Place in the correct date-based directory: `/posts/YYYY/MM/DD/`
4. Update index.html and posts.html with links to the new post

## Code Conventions
- Use consistent indentation (2 spaces)
- Include appropriate meta tags for SEO
- Maintain semantic HTML structure
- Keep JavaScript minimal and focused on functionality

## Performance Considerations
- Optimize images before adding to the site
- Keep external dependencies to a minimum
- Ensure fast loading times for all pages 