import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Adam\'s Notebook',
  description: 'Get in touch with me via this contact form.',
};

export default function ContactPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      
      <div className="prose max-w-none mb-8">
        <p>
          Have a question, comment, or just want to say hello? Feel free to reach out using the form below, 
          and I'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="w-full overflow-hidden rounded-lg shadow-md bg-white dark:bg-slate-800 p-4 mb-8">
        <div className="relative w-full h-[1132px] min-h-[600px] max-w-[640px] mx-auto">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLScFZMxKLRR-QOAQQ7IMtf1iW3sxBkc-D0r3rDOVzGx34xLrKQ/viewform?embedded=true" 
            width="100%" 
            height="100%" 
            style={{ position: 'absolute', top: 0, left: 0 }}
            frameBorder="0"
          >
            Loading…
          </iframe>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <h2>Other Ways to Connect</h2>
        <p>
          You can also find me on <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a> and 
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"> LinkedIn</a> where I regularly share thoughts on 
          technology, AI, and software development.
        </p>
      </div>
    </main>
  );
} 