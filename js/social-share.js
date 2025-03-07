// Social Share Component Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Social share script loaded');
    
    // Find all social share components
    const shareComponents = document.querySelectorAll('.social-share');
    
    if (shareComponents.length === 0) {
        console.log('No social share components found');
        return;
    }
    
    console.log(`Found ${shareComponents.length} social share components`);
    
    shareComponents.forEach(component => {
        const xBtn = component.querySelector('.share-x');
        const facebookBtn = component.querySelector('.share-facebook');
        const linkedinBtn = component.querySelector('.share-linkedin');
        const redditBtn = component.querySelector('.share-reddit');
        const emailBtn = component.querySelector('.share-email');
        const copyBtn = component.querySelector('.share-copy');
        
        // Get page details for sharing
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        const pageDescription = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');
        
        // X (formerly Twitter) share
        if (xBtn) {
            xBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const xUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                window.open(xUrl, '_blank', 'width=550,height=420');
            });
        }
        
        // Facebook share
        if (facebookBtn) {
            facebookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                window.open(facebookUrl, '_blank', 'width=550,height=420');
            });
        }
        
        // LinkedIn share
        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                window.open(linkedinUrl, '_blank', 'width=550,height=420');
            });
        }
        
        // Reddit share
        if (redditBtn) {
            redditBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const redditUrl = `https://www.reddit.com/submit?url=${pageUrl}&title=${pageTitle}`;
                window.open(redditUrl, '_blank', 'width=550,height=420');
            });
        }
        
        // Email share
        if (emailBtn) {
            emailBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const emailSubject = pageTitle;
                const emailBody = `I thought you might be interested in this article: ${window.location.href}`;
                window.location.href = `mailto:?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
            });
        }
        
        // Copy link
        if (copyBtn) {
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create the URL to copy
                const url = window.location.href;
                console.log(`Copying URL: ${url}`);
                
                // Copy to clipboard
                navigator.clipboard.writeText(url).then(function() {
                    console.log('URL copied to clipboard');
                    // Show a temporary tooltip
                    showTooltip(copyBtn, 'Link copied!');
                }).catch(function(err) {
                    console.error('Could not copy text: ', err);
                    
                    // Fallback for browsers that don't support clipboard API
                    fallbackCopyTextToClipboard(url, copyBtn);
                });
            });
        }
    });
    
    // Helper function to show tooltip
    function showTooltip(element, message) {
        // Check if tooltip already exists
        let tooltip = element.querySelector('.share-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('span');
            tooltip.className = 'share-tooltip';
            tooltip.textContent = message;
            
            // Position the tooltip relative to the button
            element.style.position = 'relative';
            element.appendChild(tooltip);
            
            // Remove tooltip after 2 seconds
            setTimeout(function() {
                if (tooltip && tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 2000);
        }
    }
    
    // Fallback copy method for browsers without clipboard API support
    function fallbackCopyTextToClipboard(text, button) {
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
                showTooltip(button, 'Link copied!');
            } else {
                console.error('Fallback: Unable to copy');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }
}); 