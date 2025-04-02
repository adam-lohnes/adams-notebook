'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReaderLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if consent has been given previously
    const hasConsent = localStorage.getItem('cookie_consent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowConsent(false);
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'false');
    setShowConsent(false);
    // Clear any reading progress
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('book_progress_') || key.startsWith('bookmark_')) {
        localStorage.removeItem(key);
      }
    });
  };
  
  return (
    <div className="reader-layout min-h-screen bg-white dark:bg-gray-900">
      {children}
      
      {showConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">
                <strong>Cookie Notice:</strong> This book reader uses cookies to save your reading progress, bookmarks, and preferences.
              </p>
              <p>
                We only store information locally on your device and do not track your reading behavior.
                You can decline if you prefer not to have your progress saved.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={declineCookies}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Accept
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
              View Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 