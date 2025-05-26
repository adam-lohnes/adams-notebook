import PostCard from '@/components/ui/PostCard';
import { getPublishedPosts } from '@/lib/markdown-loader';

export default function LabPage() {
  // Get all draft posts from the drafts folder
  const allDrafts = getPublishedPosts('drafts');
  
  // Format drafts for display
  const formattedDrafts = allDrafts.map(draft => ({
    id: draft.slug,
    slug: draft.slug,
    title: draft.title,
    description: draft.description,
    content: draft.content,
    date: draft.date || new Date(),
    year: draft.date ? draft.date.getFullYear() : new Date().getFullYear(),
    month: draft.date ? draft.date.getMonth() + 1 : new Date().getMonth() + 1,
    day: draft.date ? draft.date.getDate() : new Date().getDate(),
    createdAt: draft.date || new Date(),
    updatedAt: draft.date || new Date(),
    tags: draft.tags.map(tag => ({ id: tag, name: tag })),
    heroImage: draft.heroImage,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Lab Header with Special Styling */}
      <section className="mb-12 py-8">
        <div className="relative">
          {/* Subtle background pattern for lab theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-green-950/20 rounded-2xl -m-4"></div>
          <div className="relative">
            <div className="flex items-center mb-6">
              {/* Lab icon */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-3 mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Content Lab
                </h1>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Private Testing Environment
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              A private testing ground for content before it goes live. 
              Experiment, refine, and perfect your ideas in this isolated environment.
            </p>
          </div>
        </div>
      </section>
      
      {/* Draft Content Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold tracking-tight mr-4">
              Draft Content
            </h2>
            {/* Draft counter with styling */}
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {formattedDrafts.length} {formattedDrafts.length === 1 ? 'draft' : 'drafts'}
            </div>
          </div>
        </div>
        
        {formattedDrafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {formattedDrafts.map((draft) => (
              <div key={draft.id} className="relative group">
                {/* Draft badge overlay */}
                <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide shadow-sm">
                  Draft
                </div>
                <PostCard post={draft} basePath="/lab" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Enhanced empty state */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center">
              <div className="text-gray-400 dark:text-gray-600 mb-6">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Lab is Empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Ready to start experimenting? Drop some markdown files in the drafts folder to see them here.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 inline-block">
                <code className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                  drafts/your-article.md
                </code>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Lab Instructions */}
      <section className="mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Use the Lab
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Create Draft</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add markdown files to the <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">drafts/</code> folder</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Preview & Edit</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Review your content in the same layout as your live blog</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Test Everything</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check formatting, images, links, and overall presentation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Publish</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Move to <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">posts/</code> when ready to go live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// This prevents the page from being indexed by search engines
export const metadata = {
  title: "Content Lab | Adam's Notebook",
  description: "Private content testing area",
  robots: {
    index: false,
    follow: false,
  },
}; 