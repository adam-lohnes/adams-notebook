# Drafts Folder

This folder contains draft posts and article ideas for Adam's Notebook. Use this space to develop content before publishing it to the main blog.

## Directory Structure

- `/drafts`: Root directory for all draft content
  - `/drafts/in-progress`: Drafts that are actively being worked on
  - `/drafts/published`: Drafts that have been published as posts
  - `/drafts/ideas`: Article ideas and planning documents
- New drafts should be created in the root `/drafts` directory
- Drafts will be automatically moved to the appropriate subdirectory during post-processing

## Structure

- Use Markdown (`.md`) files for drafts
- Name files with a descriptive title: `article-title-slug.md`
- Include frontmatter at the top of each file with metadata

## Frontmatter Template

```yaml
---
title: "Article Title"
description: "Brief description of the article"
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
status: draft|in-progress|ready
---
```

## Workflow

1. Create a new draft in this folder
2. Develop and refine the content
3. When ready, import the draft into the database using `npm run import:drafts`
4. The draft will be automatically post-processed and moved to the appropriate subdirectory
5. Update the status in the database to publish the post

## Post-Processing

After importing drafts, the post-processing script will:
- Update the frontmatter in each draft file to match the database
- Move drafts to the appropriate subdirectory based on status:
  - `draft` → stays in root `/drafts`
  - `in-progress` → moves to `/drafts/in-progress`
  - `ready` or `published` → moves to `/drafts/published`
- Move article ideas to the `/drafts/ideas` directory

## Publishing Checklist

- [ ] Proofread content
- [ ] Add appropriate citations and references
- [ ] Include relevant images/media
- [ ] Format code snippets properly
- [ ] Add meta description
- [ ] Set appropriate tags
- [ ] Update status to "ready" 