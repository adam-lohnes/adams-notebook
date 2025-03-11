# Adam's Notebook

A personal blog built with [Eleventy](https://www.11ty.dev/) (11ty), a simpler static site generator.

## Features

- Responsive design that works on all devices
- Dark mode support (automatically detects system preference and allows manual toggle)
- Markdown content with support for custom frontmatter
- Automatic post listing and pagination
- Tags support for categorizing content
- Optimized for performance and SEO
- GitHub Actions for automated builds and deployments

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/adams-notebook.git
cd adams-notebook
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The site will be available at http://localhost:8080

## Project Structure

```
adams-notebook/
├── .github/                # GitHub Actions workflows
├── src/                    # Source files
│   ├── _data/              # Global site data
│   ├── _includes/          # Reusable components
│   ├── _layouts/           # Page layouts
│   ├── assets/             # Static assets
│   │   ├── css/            # Stylesheets
│   │   ├── images/         # Images
│   │   └── js/             # JavaScript files
│   ├── posts/              # Blog posts (Markdown)
│   └── index.njk           # Homepage
├── .eleventy.js            # Eleventy configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Creating Content

### Blog Posts

Create a new Markdown file in the `src/posts/` directory with the following frontmatter:

```markdown
---
title: Your Post Title
description: A brief description of your post
date: 2023-01-01
tags: 
  - tag1
  - tag2
---

Your post content goes here...
```

## Building for Production

To build the site for production:

```bash
npm run build
```

The built site will be in the `_site` directory.

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 