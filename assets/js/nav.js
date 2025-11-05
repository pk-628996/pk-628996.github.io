/**
 * Enhanced Navigation Script
 * Handles mobile navigation toggle and smooth scrolling
 */
document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector(".post-content")[0];
  if (!content) return;
  const text = content.innerText || "";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 180)); // ~180 wpm
  document.getElementById("reading-time-text").textContent = `${minutes} min read`;
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function() {
      siteNav.classList.toggle('active');
      
      // Update ARIA attribute
      const isExpanded = siteNav.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      
      // Animate hamburger icon
      const hamburgers = navToggle.querySelectorAll('.hamburger');
      if (isExpanded) {
        hamburgers[0].style.transform = 'rotate(45deg) translateY(8px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
      }
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !siteNav.contains(event.target)) {
        if (siteNav.classList.contains('active')) {
          siteNav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          
          // Reset hamburger animation
          const hamburgers = navToggle.querySelectorAll('.hamburger');
          hamburgers[0].style.transform = 'none';
          hamburgers[1].style.opacity = '1';
          hamburgers[2].style.transform = 'none';
        }
      }
    });
    
    // Close mobile nav when clicking a link
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          siteNav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          
          // Reset hamburger animation
          const hamburgers = navToggle.querySelectorAll('.hamburger');
          hamburgers[0].style.transform = 'none';
          hamburgers[1].style.opacity = '1';
          hamburgers[2].style.transform = 'none';
        }
      });
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#main-content') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL without jumping
          history.pushState(null, null, href);
        }
      }
    });
  });
  
  // Add reading progress bar for blog posts
  if (document.querySelector('.post-content')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, #74ebd5, #576a7d);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }
  
  // Add fade-in animation to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe post cards and items
  document.querySelectorAll('.post-card, .post-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close mobile nav on resize to desktop
      if (window.innerWidth > 768 && siteNav && siteNav.classList.contains('active')) {
        siteNav.classList.remove('active');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }, 250);
  });
  
  console.log('✨ Navigation enhanced and ready!');
});
