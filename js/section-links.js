// Section link copy functionality for Adam's Notebook

document.addEventListener('DOMContentLoaded', function() {
    console.log('Section links script loaded');
    
    // Select all headings in the post content
    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {
        console.log('No article content found');
        return; // Exit if not on a post page
    }
    
    const headings = articleContent.querySelectorAll('h2, h3, h4, h5, h6');
    console.log(`Found ${headings.length} headings`);
    
    // Keep track of used IDs to avoid duplicates
    const usedIds = {};
    
    headings.forEach((heading, index) => {
        // Create an ID for the heading if it doesn't have one
        if (!heading.id || heading.id.trim() === '') {
            // Create a slug from the heading text
            let slug = heading.textContent
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
                .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
            
            // Handle duplicate IDs by adding a number suffix
            if (usedIds[slug]) {
                let count = 1;
                let newSlug = `${slug}-${count}`;
                while (usedIds[newSlug]) {
                    count++;
                    newSlug = `${slug}-${count}`;
                }
                slug = newSlug;
            }
            
            // Store the ID as used
            usedIds[slug] = true;
            
            // Set the ID on the heading
            heading.id = slug;
            console.log(`Added ID to heading ${index + 1}: ${slug}`);
        } else {
            // If heading already has an ID, mark it as used
            usedIds[heading.id] = true;
            console.log(`Heading ${index + 1} already has ID: ${heading.id}`);
        }
        
        // Create the copy link button
        const linkButton = document.createElement('button');
        linkButton.className = 'section-link-button';
        linkButton.setAttribute('aria-label', 'Copy link to this section');
        linkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        
        // Create a wrapper for the heading to position the button properly
        const wrapper = document.createElement('div');
        wrapper.className = 'heading-wrapper';
        
        // Insert the wrapper before the heading
        heading.parentNode.insertBefore(wrapper, heading);
        
        // Move the heading into the wrapper
        wrapper.appendChild(heading);
        
        // Add the button to the wrapper
        wrapper.appendChild(linkButton);
        
        // Add click event to copy the link
        linkButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create the full URL with the section ID
            const url = window.location.href.split('#')[0] + '#' + heading.id;
            console.log(`Copying URL: ${url}`);
            
            // Copy to clipboard
            navigator.clipboard.writeText(url).then(function() {
                console.log('URL copied to clipboard');
                // Show a temporary tooltip
                const tooltip = document.createElement('span');
                tooltip.className = 'copy-tooltip';
                tooltip.textContent = 'Link copied!';
                wrapper.appendChild(tooltip);
                
                // Remove tooltip after 2 seconds
                setTimeout(function() {
                    tooltip.remove();
                }, 2000);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
                
                // Fallback for browsers that don't support clipboard API
                fallbackCopyTextToClipboard(url, wrapper);
            });
        });
    });
    
    // Fallback copy method for browsers without clipboard API support
    function fallbackCopyTextToClipboard(text, wrapper) {
        console.log('Using fallback clipboard method');
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                console.log('Fallback: Copied successfully');
                const tooltip = document.createElement('span');
                tooltip.className = 'copy-tooltip';
                tooltip.textContent = 'Link copied!';
                wrapper.appendChild(tooltip);
                
                setTimeout(function() {
                    tooltip.remove();
                }, 2000);
            } else {
                console.error('Fallback: Unable to copy');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }
}); 