# Adam's Notebook Migration Plan
## Migrating from Vanilla HTML/CSS/JS to Next.js with SQLite

This document outlines the step-by-step plan for migrating Adam's Notebook blog from its current vanilla HTML/CSS/JS implementation to a modern Next.js build with SQLite database backend, while maintaining GitHub Pages hosting through static site generation.

## 1. Project Setup and Initial Configuration

- [x] Create a new Next.js project
  - [x] Install Next.js: `npx create-next-app@latest adams-notebook-next`
  - [x] Configure TypeScript support
  - [x] Set up ESLint and Prettier
  - [x] Configure directory structure (pages, components, lib, etc.)
  - [x] Ensure compatibility with Node 22
  - [x] Use the latest stable Next.js version

- [x] Set up SQLite database
  - [x] Install required packages: `npm install sqlite sqlite3 better-sqlite3`
  - [x] Install Prisma ORM: `npm install prisma @prisma/client`
  - [x] Initialize Prisma: `npx prisma init --datasource-provider sqlite`
  - [x] Create database schema for blog posts, drafts, and metadata

- [x] Configure environment variables
  - [x] Create `.env.local` file for development
  - [x] Set up environment variables for GitHub Actions

## 2. Database Schema Design

- [x] Design post schema
  - [x] ID, title, slug, content, description, date, tags, status
  - [x] Consider adding author, featured image, and other metadata

- [x] Design drafts schema
  - [x] Similar to posts but with draft-specific fields (status, last edited)

- [x] Create schema migrations
  - [x] Run `npx prisma migrate dev --name init`
  - [x] Verify database tables are created correctly

## 3. Content Migration

- [x] Create migration script for existing posts
  - [x] Parse HTML files from `/posts/YYYY/MM/DD/` structure
  - [x] Extract metadata (title, date, description)
  - [x] Convert HTML content to appropriate format (HTML or Markdown)
  - [x] Insert into SQLite database

- [x] Create migration script for drafts
  - [x] Parse Markdown files from `/drafts/`
  - [x] Extract frontmatter metadata
  - [x] Insert into SQLite database

- [ ] Migrate images and other assets
  - [ ] Copy images to `/public/images/` directory
  - [ ] Update image references in content

## 4. Core Components Development

- [x] Create layout components
  - [x] Header with navigation
  - [x] Footer
  - [x] Theme toggle functionality (dark/light mode)
  - [x] SEO component for metadata

- [ ] Create page components
  - [x] Home page
  - [ ] All posts page
  - [ ] Individual post page
  - [ ] About page

- [ ] Create reusable UI components
  - [ ] Post card/preview
  - [ ] Tag list
  - [ ] Social share buttons
  - [ ] Section links/table of contents

## 5. Static Site Generation Configuration

- [x] Configure Next.js for static site generation
  - [x] Set up `next.config.js` for static exports
  - [ ] Configure `getStaticProps` and `getStaticPaths` for all dynamic routes
  - [ ] Ensure all pages are pre-rendered at build time

- [ ] Create data fetching utilities
  - [ ] Functions to query SQLite database during build time
  - [ ] Utilities to generate static paths for all posts

## 6. URL Structure and Routing

- [ ] Design URL structure
  - [ ] Consider `/posts/[slug]` vs. `/YYYY/MM/DD/[slug]`
  - [ ] Implement dynamic routes in Next.js

- [ ] Set up redirects for old URLs
  - [ ] Create redirects from old URL structure to new structure
  - [ ] Implement in `next.config.js`

## 7. SEO and Performance Optimization

- [ ] Implement SEO best practices
  - [ ] Set up metadata for all pages
  - [ ] Create dynamic Open Graph images
  - [ ] Implement structured data (JSON-LD)

- [ ] Optimize performance
  - [ ] Implement image optimization with Next.js Image component
  - [ ] Configure caching strategies
  - [ ] Implement code splitting and lazy loading
  - [ ] Optimize bundle size to reduce build times

## 8. Analytics and Monitoring

- [ ] Set up analytics
  - [ ] Migrate Google Analytics configuration
  - [ ] Implement as static client-side script

## 9. GitHub Actions for Static Site Generation

- [x] Create GitHub Actions workflow
  - [x] Set up Node 22 environment
  - [x] Install dependencies
  - [x] Build SQLite database from content
  - [x] Run Next.js static export
  - [x] Deploy to GitHub Pages

- [ ] Configure GitHub Pages
  - [ ] Set up custom domain
  - [ ] Configure CNAME file
  - [ ] Set up GitHub Pages in repository settings

## 10. Testing

- [ ] Set up testing framework
  - [ ] Unit tests for components and utilities
  - [ ] Integration tests for build process
  - [ ] Test static site generation process

- [ ] Create test data
  - [ ] Mock posts and drafts for testing

## 11. Post-Migration Tasks

- [ ] Verify all content has been migrated correctly
  - [ ] Check posts, drafts, images, and other assets
  - [ ] Verify metadata and formatting

- [ ] Set up redirects from old URLs
  - [ ] Ensure old links continue to work

- [ ] Update DNS and finalize cutover
  - [ ] Point domain to GitHub Pages
  - [ ] Monitor for any issues

## 12. Documentation

- [x] Create documentation for the new system
  - [x] Content management workflows
  - [x] Development guidelines
  - [x] Deployment procedures

- [x] Document database schema
  - [x] Document database structure

## 13. Future Enhancements

- [ ] Plan for Cloudflare migration
  - [ ] Research Cloudflare Pages + Workers
  - [ ] Plan database hosting options
  - [ ] Design migration path from GitHub Pages to Cloudflare

- [ ] Additional features to consider
  - [ ] Comments system
  - [ ] Newsletter integration
  - [ ] Search functionality
  - [ ] RSS feed

## 14. Optimization

- [ ] Optimize build times
  - [ ] Analyze and reduce bundle size
  - [ ] Implement incremental static regeneration when moving to Cloudflare
  - [ ] Optimize image processing pipeline

## Notes

- This migration maintains the static site approach while modernizing the codebase
- No authentication or CMS is implemented in this phase
- The SQLite database is only used during build time, not at runtime
- Future migration to Cloudflare will enable more dynamic features
