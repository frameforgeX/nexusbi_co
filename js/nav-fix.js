/* 
   Navigation Fix - Modern Mobile Menu JavaScript
   Enhanced mobile navigation with smooth transitions and dropdown support
*/

document.addEventListener('DOMContentLoaded', function() {
  // Modern mobile navigation implementation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  const body = document.body;
    if (hamburger && navLinks) {
    // Force hamburger visibility on mobile
    if (window.innerWidth < 768) {
      hamburger.style.display = 'flex';
      console.log('Hamburger display set to flex'); // Debug log
    }
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function(e) {
      console.log('Hamburger clicked'); // Debug log
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = navLinks.classList.contains('active');
        // Toggle active classes
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      body.classList.toggle('menu-open');
      
      // Debug log the state
      console.log('Navigation active state:', navLinks.classList.contains('active'));
      
      // Set aria-expanded attribute for accessibility
      hamburger.setAttribute('aria-expanded', !isActive);
      
      if (!isActive) {
        // Animate items when menu opens with staggered delay
        const navItems = navLinks.querySelectorAll('li');
        navItems.forEach((item, index) => {
          // Reset initial state
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          
          // Animate in with delay
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50 + (index * 50));
        });
      }
    });
    
    // Handle dropdown toggles for mobile
    if (dropdowns) {
      dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        if (link && window.innerWidth < 768) {
          // Create dropdown toggle indicator if it doesn't exist
          if (!link.querySelector('.dropdown-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'dropdown-indicator';
            indicator.innerHTML = ' &#9662;'; // Unicode down arrow
            indicator.style.marginLeft = '5px';
            link.appendChild(indicator);
          }
          
          link.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
              e.preventDefault();
              e.stopPropagation();
              dropdown.classList.toggle('active');
              
              const indicator = link.querySelector('.dropdown-indicator');
              if (indicator) {
                indicator.innerHTML = dropdown.classList.contains('active') ? ' &#9652;' : ' &#9662;';
              }
            }
          });
        }
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Adjust behavior on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        hamburger.style.display = 'flex';
      }
    });
  }
});
