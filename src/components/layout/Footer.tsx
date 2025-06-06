import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              © {currentYear} Adam Lohnes. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {/* <Link 
              href="https://github.com/alohnes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link> */}

            <Link 
              href="https://x.com/adamsnotebook" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">X / Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 300 300.251" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
              </svg>
            </Link>

            {/* <Link 
              href="/rss.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">RSS Feed</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 3a1 1 0 000 2c7.18 0 13 5.82 13 13a1 1 0 002 0C20 9.716 13.284 3 5 3zm0 6a1 1 0 000 2c3.9 0 7 3.1 7 7a1 1 0 002 0c0-4.962-4.037-9-9-9zm0 6a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </Link> */}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/privacy-policy" className="hover:text-gray-900 dark:hover:text-white transition-colors mb-2">
            Privacy Policy
          </Link>
          <Link href="/ai-content-policy" className="hover:text-gray-900 dark:hover:text-white transition-colors mb-2">
            AI Content Policy
          </Link>
          <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors mb-2">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
} 