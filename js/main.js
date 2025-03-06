// Main JavaScript file for Adam's Notebook

document.addEventListener('DOMContentLoaded', function() {
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