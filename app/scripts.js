"use client";

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll effect for anchor links
  const handleAnchorClick = (e) => {
    const target = e.target.closest('a');
    if (target && target.hash && target.hash.startsWith('#')) {
      const element = document.querySelector(target.hash);
      if (element) {
        e.preventDefault();
        
        // Get navbar height dynamically for accurate scrolling
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
        
        // Add a small buffer for better visual spacing
        const buffer = 20;
        
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - navbarHeight - buffer,
          behavior: 'smooth'
        });
        
        // Update URL without scrolling
        history.pushState(null, '', target.hash);
      }
    }
  };

  document.addEventListener('click', handleAnchorClick);

  // Handle initial hash navigation on page load
  if (window.location.hash) {
    setTimeout(() => {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
        const buffer = 20;
        
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - navbarHeight - buffer,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});
