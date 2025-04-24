import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Content Policy | Adam\'s Notebook',
  description: 'Learn about how Adam\'s Notebook leverages AI technology while maintaining human creativity and authenticity.',
};

export default function AIContentPolicyPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Content Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: {new Date().toISOString().split('T')[0]}
        </p>
        
        <h2>My Approach to AI-Assisted Content</h2>
        <p>
          As someone deeply interested in artificial intelligence and its implications, I believe in 
          transparent disclosure about how AI tools are used in my work. This policy explains my approach 
          to creating content for Adam's Notebook in an era where AI writing and editing assistance is 
          increasingly common.
        </p>
        
        <h2>Human-Driven Ideas, AI-Enhanced Execution</h2>
        <p>
          The core ideas, opinions, perspectives, and experiences shared on this blog are authentically mine. 
          I use AI tools as assistants in the creation process, not as the source of my thinking or values. 
          The relationship is comparable to how writers have always used tools—from dictionaries to 
          spell-checkers to research assistants—to refine their expression.
        </p>
        
        <h3>What I Use AI For:</h3>
        <ul>
          <li><strong>Drafting and editing:</strong> Assistance with grammar, sentence structure, and readability</li>
          <li><strong>Formatting:</strong> Generating consistent markdown, code blocks, and structural elements</li>
          <li><strong>Idea expansion:</strong> Exploring different angles of topics I've already conceptualized</li>
          <li><strong>Research summaries:</strong> Collecting and synthesizing information from various sources</li>
          <li><strong>Visual elements:</strong> Creating image concepts or layouts for illustrations</li>
        </ul>
        
        <h3>What I Don't Use AI For:</h3>
        <ul>
          <li><strong>Core opinions and values:</strong> These remain entirely my own</li>
          <li><strong>Personal experiences:</strong> Stories about my life and work are genuine</li>
          <li><strong>Original ideas:</strong> The central theories and concepts I explore come from my thinking</li>
          <li><strong>Critical analysis:</strong> Evaluations of technologies and practices represent my true assessment</li>
        </ul>
        
        <h2>My AI Collaboration Process</h2>
        <p>
          My typical workflow involves:
        </p>
        <ol>
          <li>Developing an original idea or concept through personal reflection and experience</li>
          <li>Creating an initial outline or rough draft based on my thinking</li>
          <li>Using AI tools to help expand on sections, suggest phrasings, or improve clarity</li>
          <li>Carefully reviewing all AI-suggested content to ensure it aligns with my intent and voice</li>
          <li>Editing, refining, and often substantially revising the content to maintain authenticity</li>
          <li>Final human review before publication</li>
        </ol>
        
        <h2>Behind Every Post is a Human</h2>
        <p>
          While AI tools may assist with aspects of content creation, I want to emphasize that there is 
          always a human (me) behind every post on this blog. The thoughts, insights, and perspectives 
          shared here reflect my authentic voice and experiences, even when AI has helped me express 
          them more clearly or effectively.
        </p>
        
        <p>
          I believe AI tools are most valuable when they amplify human creativity rather than replace it. 
          In that spirit, I use these tools to enhance my expression while ensuring the substance remains 
          genuinely mine.
        </p>
        
        <h2>Transparency and Evolution</h2>
        <p>
          As AI technology evolves, so too will my approach to using it. I commit to maintaining transparency 
          about how AI is integrated into my creative process and will update this policy as practices change.
        </p>
        
        <p>
          If you have questions about my use of AI or would like to discuss this topic further, please don't 
          hesitate to <a href="/contact">contact me</a>.
        </p>
      </div>
    </main>
  );
} 