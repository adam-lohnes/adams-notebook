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

## Path Handling
- Use relative paths instead of absolute paths for all links and resources
- For post files, use relative paths with the appropriate number of "../" to navigate up to the root
- In templates, use "ROOT_PATH" as a placeholder that will be replaced with the appropriate relative path
- Ensure all paths work both locally and when deployed to GitHub Pages or other hosting services
- For links between posts, use relative paths that navigate through the directory structure

## Lists
- Lists should have custom styling with primary color bullets/numbers
- Proper spacing and indentation for better readability
- Consistent styling for both ordered and unordered lists

## Citations and References
- Academic-style articles should include proper citations
- Citations should be formatted as superscript links with the class "citation"
- Citations should link to the references section using anchor links
- The references section should have the ID "references"
- Each reference item should have a unique ID for linking
- Citations should use the primary blue color to stand out
- References should include proper links to external sources when available
- Citation format should follow the pattern: (Author, Year)
- References should be listed in a consistent format with proper spacing

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

## Analytics
- Google Analytics tracking code (G-F89LERZZ23) should be included on all pages
- The tracking script should be placed immediately after the opening `<head>` tag
- Analytics code should be properly commented for easy identification
- Respect user privacy by not collecting unnecessary personal information 