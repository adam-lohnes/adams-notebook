document.addEventListener('DOMContentLoaded', () => {
  // Add anchor links to headings in post content
  const articleContent = document.querySelector('.post-content');
  
  if (articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3, h4, h5, h6');
    
    headings.forEach(heading => {
      if (heading.id) {
        const anchor = document.createElement('a');
        anchor.className = 'heading-anchor';
        anchor.href = `#${heading.id}`;
        anchor.innerHTML = '#';
        heading.appendChild(anchor);
      }
    });
  }
  
  // Initialize responsive navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}); 