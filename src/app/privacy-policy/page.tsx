import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Adam\'s Notebook',
  description: 'Learn how Adam\'s Notebook handles your personal information and protects your privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: {new Date().toISOString().split('T')[0]}
        </p>
        
        <h2>Introduction</h2>
        <p>
          Welcome to Adam's Notebook. This Privacy Policy explains how we collect, use, disclose, 
          and safeguard your information when you visit our website. Please read this policy carefully.
        </p>
        
        <h2>Information We Collect</h2>
        <p>
          <strong>Personal Information:</strong> We may collect personal information that you voluntarily 
          provide when using our contact form, subscribing to newsletters, or engaging with our content.
          This may include your name, email address, and any other information you choose to provide.
        </p>
        <p>
          <strong>Usage Data:</strong> We automatically collect certain information about how you interact 
          with our website, including your IP address, browser type, pages visited, time spent on pages, 
          and other diagnostic data.
        </p>
        
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain our website</li>
          <li>To notify you about changes to our services</li>
          <li>To respond to your inquiries and provide support</li>
          <li>To gather analysis or valuable information to improve our services</li>
          <li>To monitor the usage of our website</li>
        </ul>
        
        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and store 
          certain information. These technologies help us understand user preferences and improve the 
          website experience.
        </p>
        
        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics, embedding services like Google Forms, 
          and social media platforms. These third parties may collect information about you according to 
          their own privacy policies.
        </p>
        
        <h2>Data Security</h2>
        <p>
          We implement reasonable precautions to protect your information. However, no method of 
          transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee 
          absolute security.
        </p>
        
        <h2>Children's Privacy</h2>
        <p>
          Our website is not intended for children under the age of 13. We do not knowingly collect 
          personally identifiable information from children under 13.
        </p>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by 
          posting the new Privacy Policy on this page and updating the "last updated" date.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our 
          <a href="/contact"> contact form</a>.
        </p>
      </div>
    </main>
  );
} 