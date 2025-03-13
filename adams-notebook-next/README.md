# Adam's Notebook - Next.js Blog

A modern blog built with Next.js and SQLite, statically generated for GitHub Pages hosting.

## Features

- Next.js 15+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- SQLite database for content storage
- Prisma ORM for database access
- Dark/light mode support
- Static site generation for GitHub Pages
- Responsive design

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/adams-notebook.git
   cd adams-notebook-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Import content from the original blog:
   ```bash
   npm run import:all
   ```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Management

- Open Prisma Studio to manage the database:
  ```bash
  npm run db:studio
  ```

- Reset the database:
  ```bash
  npm run db:reset
  ```

### Building for Production

Build the static site:
```bash
npm run build
```

The static site will be generated in the `out` directory.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - React components
- `/src/lib` - Utility functions and database access
- `/src/scripts` - Import scripts for content migration
- `/prisma` - Prisma schema and migrations
- `/public` - Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.
