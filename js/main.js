// Main JavaScript file for Adam's Notebook

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply the saved theme or use system preference
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        // If no saved preference, we don't need to add any class
        // as the CSS will use the system preference via media query
    }
    
    // Toggle theme when button is clicked
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // If currently using dark mode
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } 
            // If currently using light mode
            else if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } 
            // If no class is applied (using system preference)
            else {
                // If system prefers dark, switch to light
                if (prefersDarkScheme.matches) {
                    document.body.classList.add('light-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    // If system prefers light, switch to dark
                    document.body.classList.add('dark-theme');
                    localStorage.setItem('theme', 'dark');
                }
            }
        });
    }
    
    // Add mobile menu toggle functionality if needed
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('show');
        });
    }

    // You can add more functionality here as your blog grows
    console.log('Adam\'s Notebook is ready!');
}); 