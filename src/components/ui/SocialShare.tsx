'use client';

import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

export default function SocialShare({ url, title, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  // Ensure we have the full URL
  const fullUrl = url.startsWith('http') ? url : `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`;
  
  // Encode for sharing
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  
  // Share URLs
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
  
  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className={`${className}`}>
      <div className="flex items-center flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">Share:</span>
        
        {/* Twitter/X */}
        <a 
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on X (Twitter)"
          title="Share on X"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 300 300.251" fill="currentColor" className="text-gray-700 dark:text-gray-300">
            <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"></path>
          </svg>
        </a>
        
        {/* Facebook */}
        <a 
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        
        {/* LinkedIn */}
        <a 
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        
        {/* Reddit */}
        <a 
          href={redditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share on Reddit"
          title="Share on Reddit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700 dark:text-gray-300">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M17 12a2 2 0 0 0-2-2 2 2 0 0 0-1.41.59 7.5 7.5 0 0 0-4.18-1.54h0a7.5 7.5 0 0 0-4.18 1.54A2 2 0 0 0 3.82 10 2 2 0 0 0 7 12c0 .74.4 1.39 1 1.73a4.5 4.5 0 0 0 8 0c.6-.34 1-.99 1-1.73z"></path>
            <circle cx="8" cy="12" r="1"></circle>
            <circle cx="16" cy="12" r="1"></circle>
          </svg>
        </a>
        
        {/* Email */}
        <a 
          href={emailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
        
        {/* Copy Link */}
        <button 
          onClick={copyToClipboard}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors relative"
          aria-label="Copy link"
          title="Copy Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          
          {copied && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Copied!
            </div>
          )}
        </button>
      </div>
    </div>
  );
} 