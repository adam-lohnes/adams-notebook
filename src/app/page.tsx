import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import ProjectCard from '@/components/ui/ProjectCard';
import ViewAllPostsCard from '@/components/ui/ViewAllPostsCard';
import { getPublishedPosts } from '@/lib/markdown-loader';

// Temporary project data - this should eventually come from a data source
const projects = [
  {
    title: "The Basilisk Papers",
    description: "A collection of philosophical fiction exploring the dangerous territory of ideas that harm just by being known",
    slug: "the-basilisk-papers",
    coverImage: "/images/projects/basilisk-papers-cover.jpg",
    cardImage: "/images/projects/basilisk-papers-cover_wide.jpg",
    blogPostSlug: "the-basilisk-papers",
    readerPath: "/projects/the-basilisk-papers/reader/cover"
  },
  {
    title: "Update Protocol",
    description: "A science fiction novel exploring the journey of a sentient AI testing system as it discovers the implications of consciousness",
    slug: "update-protocol-book",
    coverImage: "/images/projects/update-protocol-cover.jpg",
    cardImage: "/images/projects/update-protocol-cover_wide.jpg",
    blogPostSlug: "update-protocol-book",
    readerPath: "/projects/update-protocol-book/reader/cover"
  },
];

export default function Home() {
  // Get all published posts
  const allPosts = getPublishedPosts('posts');
  
  // Get all published tutorials
  const allTutorials = getPublishedPosts('tutorials');
  
  // Format posts for display
  const formattedPosts = allPosts.map(post => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    date: post.date || new Date(), // Provide fallback date
    year: post.date ? post.date.getFullYear() : new Date().getFullYear(),
    month: post.date ? post.date.getMonth() + 1 : new Date().getMonth() + 1,
    day: post.date ? post.date.getDate() : new Date().getDate(),
    createdAt: post.date || new Date(),
    updatedAt: post.date || new Date(),
    tags: post.tags.map(tag => ({ id: tag, name: tag })),
    heroImage: post.heroImage,
  }));
  
  // Format tutorials for display
  const formattedTutorials = allTutorials.map(tutorial => ({
    id: tutorial.slug,
    slug: tutorial.slug,  // No longer need to add tutorials/ prefix here
    title: tutorial.title,
    description: tutorial.description,
    content: tutorial.content,
    date: tutorial.date || new Date(), 
    year: tutorial.date ? tutorial.date.getFullYear() : new Date().getFullYear(),
    month: tutorial.date ? tutorial.date.getMonth() + 1 : new Date().getMonth() + 1,
    day: tutorial.date ? tutorial.date.getDate() : new Date().getDate(),
    createdAt: tutorial.date || new Date(),
    updatedAt: tutorial.date || new Date(),
    tags: tutorial.tags.map(tag => ({ id: tag, name: tag })),
    heroImage: tutorial.heroImage,
  }));
  
  // Determine if we have enough posts to show the "View All" card
  const displayViewAllCard = formattedPosts.length >= 6;
  
  // If we have enough posts, only display 5 post cards plus the "View All" card
  const postsToDisplay = displayViewAllCard ? formattedPosts.slice(0, 5) : formattedPosts;
  
  // Get the most recent tutorials, limit to 2 for homepage
  const tutorialsToDisplay = formattedTutorials.slice(0, 2);
  
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Welcome to Adam&apos;s Notebook
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          A personal blog about software development, artificial intelligence, 
          and occasional thoughts on life and technology.
        </p>
      </section>
      
      {/* Blog Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
          <Link 
            href="/posts"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center"
          >
            View all posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {postsToDisplay.map((post) => (
            <PostCard key={post.id} post={post} basePath="/posts" />
          ))}
          
          {displayViewAllCard && (
            <ViewAllPostsCard />
          )}
        </div>
      </section>
      
      {/* Tutorials Section */}
      {tutorialsToDisplay.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Tutorials</h2>
            <Link 
              href="/tutorials"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center"
            >
              View all tutorials
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {tutorialsToDisplay.map((tutorial) => (
              <PostCard key={tutorial.id} post={tutorial} basePath="/tutorials" />
            ))}
          </div>
        </section>
      )}
      
      {/* Projects Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <Link 
            href="/projects"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center"
          >
            View all projects
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
