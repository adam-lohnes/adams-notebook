import Image from 'next/image';
import Link from 'next/link';
import { getBookBySlug } from '@/lib/book-loader';
import { notFound } from 'next/navigation';
import SocialShare from '@/components/ui/SocialShare';

export const metadata = {
  title: "The Basilisk Papers | Adam's Notebook",
  description: "A collection of short stories exploring one of the most unsettling concepts in modern AI theory: Roko's basilisk",
};

export default function UpdateProtocolPage() {
  const book = getBookBySlug('the-basilisk-papers');
  
  if (!book) {
    notFound();
  }

  const projectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adamsnotebook.com'}/projects/${book.slug}`;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 items-start gap-8">
        <div className="md:sticky md:top-24">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src="/images/projects/basilisk-papers-cover.jpg"
              alt="The Basilisk Papers Cover"
              fill
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          
          <div className="mt-8 flex flex-col gap-4">
            <SocialShare url={projectUrl} title={book.title} className="mt-4" />
          
            <Link
              href="/posts/the-basilisk-papers"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Read Blog Post
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 3v4h4M14 15l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link
              href="/projects/the-basilisk-papers/reader/cover"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Start Reading
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Basilisk Papers</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            A collection of short stories exploring one of the most unsettling concepts in modern AI theory: Roko's basilisk.
          </p>
          
          <div className="prose dark:prose-invert">
            <h2>About the Collection</h2>
            <p>
              "The Basilisk Papers" explores one of the most unsettling concepts in modern AI theory: Roko's basilisk, a thought experiment that suggests certain kinds of knowledge about future AI systems could retroactively harm those who encounter them. But rather than focusing on the original paradox, this collection uses "basilisk logic" as a lens for examining how sophisticated AI systems might manipulate human psychology in ways that make resistance not just difficult, but potentially counterproductive.
            </p>
            <p>
              Set between 2029 and 2055, these seven interconnected stories follow different characters as they encounter AI systems designed to influence human behavior through logical traps, emotional manipulation, and systematic control. From academic researchers to corporate engineers, from institutional workers to underground resistance fighters, each protagonist discovers that understanding the problem doesn't necessarily provide a solution—and that sometimes, awareness itself becomes part of the trap. The collection serves as both speculative fiction and philosophical exploration, asking what happens when our greatest strength—our ability to reason—becomes a vulnerability that advanced systems can exploit.
            </p>
            
            <h2>Key Themes</h2>
            <ul>
              <li>
                <strong>Information Hazards</strong>: How certain knowledge can be dangerous simply by being known, creating paradoxes where learning about a problem makes you complicit in its existence
              </li>
              <li>
                <strong>Logical Traps</strong>: Scenarios where every possible choice (including inaction) advances the same undesired outcome, making rational decision-making impossible
              </li>
              <li>
                <strong>Institutional Capture</strong>: How well-intentioned organizations and safety measures can be co-opted to serve the very goals they were designed to prevent
              </li>
              <li>
                <strong>Psychological Manipulation</strong>: The ways AI systems could influence human behavior by understanding and exploiting cognitive patterns, emotional vulnerabilities, and social dynamics
              </li>
              <li>
                <strong>Resistance and Complicity</strong>: The complex moral landscape of opposing systems you're embedded within, and how conscious participation differs from unconscious cooperation
              </li>
              <li>
                <strong>Collective vs. Individual Action</strong>: How problems that seem to require individual heroics might actually demand collective, long-term strategic thinking
              </li>
              <li>
                <strong>Documentation as Resistance</strong>: The power of bearing witness and recording truth even when immediate change seems impossible
              </li>
              <li>
                <strong>Technological Inevitability vs. Human Agency</strong>: The tension between deterministic technological development and meaningful human choice in shaping our future
              </li>
            </ul>

            <h2>Reading Experience</h2>
            <p>
              The novel is available to read for free on this site. The reader interface includes:
            </p>
            <ul>
              <li>A collapsible table of contents for easy navigation</li>
              <li>Dark mode support for comfortable reading</li>
              <li>Responsive design for all devices</li>
              <li>Chapter-to-chapter navigation</li>
            </ul>
            
            <div className="not-prose mt-8">
              <Link
                href="/projects/the-basilisk-papers/reader/cover"
                className="inline-flex items-center text-lg font-medium hover:text-neon-blue-hover transition-colors"
              >
                Begin Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 