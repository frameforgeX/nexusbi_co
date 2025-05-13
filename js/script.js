/* ----------------------------------------------
   Nexus Business Intelligence Website
   JavaScript Functionality
---------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initTypingAnimation();
  initSVGAnimation();
  // Replaced initMouseGradient with particle animation
  initParticles();
  addCursorEffect();
  initScrollAnimations();
  initCounters();
  initDashboardCharts();
  initCarousel();
  initAIWidget();
  initFormAnimations();
  initRandomBITip();
  initFAQInteraction();
  initStudiosSection(); // Replacing duplicate initialization with a single function call
});

// Navigation functionality
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');
  const header = document.querySelector('header');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Improve accessibility
      const expanded = navLinks.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded.toString());
    });
  }

  // Handle dropdown menus in mobile view
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    // For mobile devices
    dropdownLink.addEventListener('click', function(e) {
      if (window.innerWidth < 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Smooth scroll for navigation links that point to sections within the current page
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      
      // Skip dropdown toggles on mobile
      if (window.innerWidth < 768 && link.parentElement.classList.contains('dropdown')) {
        return;
      }
      
      // Only handle links that are anchor links or point to sections within the current page
      if (href.startsWith('#') || (href.includes('#') && href.split('#')[0] === window.location.pathname.split('/').pop())) {
        e.preventDefault();
        const targetId = href.includes('#') ? href.substring(href.indexOf('#')) : href;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
          });
        }

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Change header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && 
        navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Handle window resize - reset mobile menu state when returning to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      
      // Reset dropdowns
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
}

// Typing Animation in Hero Section
function initTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  const text = "Decisions Backed by Data. Growth Powered by Insight.";
  let index = 0;
  let isDeleting = false;
  let typingInterval;

  function type() {
    // Create cursor effect
    const currentText = text.substring(0, index);
    typingElement.textContent = currentText + (index < text.length ? '|' : '');

    if (!isDeleting && index < text.length) {
      // Typing forward
      index++;
      typingInterval = setTimeout(type, 80 + Math.random() * 50); // Variable speed
    } else if (isDeleting && index > 0) {
      // Deleting
      index--;
      typingInterval = setTimeout(type, 40);
    } else {
      // Change direction
      isDeleting = !isDeleting;
      
      if (isDeleting) {
        // Pause before deleting
        typingInterval = setTimeout(type, 2000);
      } else {
        // Pause before typing again
        typingInterval = setTimeout(type, 500);
      }
    }
  }

  // Start typing animation
  type();
}

// SVG Data Flow Animation
function initSVGAnimation() {
  const svg = document.getElementById('data-flow-svg');
  
  if (!svg) return;
  
  // Create SVG data flow elements
  const numNodes = 20;
  const numConnections = 25;
  
  // Create nodes
  for (let i = 0; i < numNodes; i++) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    const size = 3 + Math.random() * 5;
    
    node.setAttribute('cx', x);
    node.setAttribute('cy', y);
    node.setAttribute('r', size);
    node.setAttribute('fill', 'rgba(0, 194, 255, 0.7)');
    
    // Add pulse animation
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'opacity');
    animate.setAttribute('values', '0.3;0.7;0.3');
    animate.setAttribute('dur', `${2 + Math.random() * 3}s`);
    animate.setAttribute('repeatCount', 'indefinite');
    
    node.appendChild(animate);
    svg.appendChild(node);
  }
  
  // Create connections between random nodes
  for (let i = 0; i < numConnections; i++) {
    const x1 = Math.random() * 800;
    const y1 = Math.random() * 600;
    const x2 = Math.random() * 800;
    const y2 = Math.random() * 600;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'rgba(0, 194, 255, 0.2)');
    line.setAttribute('stroke-width', 1);
    
    // Add animation for data flow
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'stroke-dashoffset');
    animate.setAttribute('from', '100');
    animate.setAttribute('to', '0');
    animate.setAttribute('dur', `${5 + Math.random() * 10}s`);
    animate.setAttribute('repeatCount', 'indefinite');
    
    line.setAttribute('stroke-dasharray', '5,5');
    line.appendChild(animate);
    svg.appendChild(line);
  }
  
  // Add gradient defs for glowing effect
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
  gradient.setAttribute('id', 'node-glow');
  
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', 'rgba(0, 194, 255, 1)');
  
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', 'rgba(0, 194, 255, 0)');
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);
}

// Initialize particles
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
          particles: {
              number: {
                  value: 85,  // Slightly reduced for better performance
                  density: {
                      enable: true,
                      value_area: 1200  // Increased for better distribution
                  }
              },
              color: {
                  value: ["#cea64e", "#07b2b2", "#e8d4ff", "#0B3040"]  // Theme colors: gold, teal, light purple, dark blue
              },
              shape: {
                  type: ["circle", "triangle"],  // Added triangle shape for visual interest
                  stroke: {
                      width: 0,
                      color: "#000000"
                  },
              },
              opacity: {
                  value: 0.5,  // Slightly increased visibility
                  random: true,
                  anim: {
                      enable: true,
                      speed: 0.6,  // Slightly slower for smoother animation
                      opacity_min: 0.1,
                      sync: false
                  }
              },
              size: {
                  value: 4,  // Slightly larger particles
                  random: true,
                  anim: {
                      enable: true,  // Enable size animation
                      speed: 3,
                      size_min: 0.5,
                      sync: false
                  }
              },
              line_linked: {
                  enable: true,
                  distance: 170,  // Increased connection distance
                  color: "#cea64e",  // Gold theme color
                  opacity: 0.35,  // Slightly increased opacity
                  width: 1.2  // Slightly wider lines
              },
              move: {
                  enable: true,
                  speed: 1.2,  // Slightly slower for smoother movement
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",  // Changed to "out" so particles leave the canvas and new ones appear
                  bounce: false,
                  attract: {
                      enable: true,
                      rotateX: 800,
                      rotateY: 1500
                  }
              }
          },
          interactivity: {
              detect_on: "canvas",
              events: {
                  onhover: {
                      enable: true,
                      mode: "grab"  // Changed to "grab" for a more intuitive interaction
                  },
                  onclick: {
                      enable: true,
                      mode: "push"  // Changed to "push" to add particles on click
                  },
                  resize: true
              },
              modes: {
                  grab: {
                      distance: 180,
                      line_linked: {
                          opacity: 0.8
                      }
                  },
                  push: {
                      particles_nb: 4  // Add 4 particles on click
                  }
              }
          },
          retina_detect: true,
          fps_limit: 60  // Limit FPS for better performance
      });
  }
}

// Add interactive cursor trail effect
function addCursorEffect() {
  // Interactive cursor effect
  document.addEventListener('mousemove', (e) => {
      const cursor = document.createElement('div');
      cursor.classList.add('cursor-trail');
      cursor.style.left = e.pageX + 'px';
      cursor.style.top = e.pageY + 'px';
      document.body.appendChild(cursor);
      
      setTimeout(() => {
          cursor.remove();
      }, 1000);
  });
}

// Reveal animations on scroll using IntersectionObserver
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-animation');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px'
  });
  
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const delay = element.getAttribute('data-delay');
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
    
    revealObserver.observe(element);
  });
  
  // Initialize progress bars in dashboard
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
          bar.style.width = `${progress}%`;
        }, 300);
        progressObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.1
  });
  
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

// Animated counters for KPI section
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 80; // Adjust speed
        const duration = 1500; // Animation duration in ms
        const stepTime = duration / 80; // Time between each increment
        
        const updateCounter = () => {
          current += increment;
          
          if (current < target) {
            counter.textContent = `${prefix}${Math.ceil(current).toLocaleString()}${suffix}`;
            setTimeout(updateCounter, stepTime);
          } else {
            counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px'
  });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Dashboard charts and visualizations
function initDashboardCharts() {
  // Initialize acquisition donut chart
  const acquisitionCanvas = document.getElementById('acquisition-chart');
  
  if (acquisitionCanvas) {
    const ctx = acquisitionCanvas.getContext('2d');
    
    // Define chart colors
    const colors = [
      '#00c2ff',
      '#6e56cf',
      '#00ffaa'
    ];
    
    // Draw donut chart manually
    const centerX = acquisitionCanvas.width / 2;
    const centerY = acquisitionCanvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * 0.6;
    
    // Data values
    const data = [45, 30, 25]; // percentages
    let startAngle = -Math.PI / 2; // Start at the top
    
    // Draw each segment
    data.forEach((value, i) => {
      // Calculate segment angle
      const segmentAngle = (value / 100) * Math.PI * 2;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
      ctx.closePath();
      
      // Fill segment
      ctx.fillStyle = colors[i];
      ctx.fill();
      
      // Update start angle for next segment
      startAngle += segmentAngle;
    });
    
    // Draw inner circle (for donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 10, 20, 0.95)';
    ctx.fill();
  }
  
  // Initialize sparkline charts
  createSparkline('sales-sparkline', [30, 50, 35, 60, 40, 45, 70, 75], '#00c2ff');
  createSparkline('marketing-sparkline', [40, 30, 45, 35, 50, 55, 45, 60], '#6e56cf');
  createSparkline('operations-sparkline', [60, 50, 55, 45, 40, 35, 40, 30], '#ef4444');
  createSparkline('finance-sparkline', [45, 50, 40, 55, 60, 70, 65, 75], '#00ffaa');
}

// Create sparkline charts
function createSparkline(elementId, data, color) {
  const sparklineElement = document.getElementById(elementId);
  
  if (!sparklineElement) return;
  
  // Clear any existing content
  sparklineElement.innerHTML = '';
  
  // Normalize data to fit the container
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${data.length - 1} 100`);
  svg.setAttribute('preserveAspectRatio', 'none');
  
  // Create path for the line
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let pathDefinition = `M0,${100 - ((data[0] - min) / range) * 100}`;
  
  for (let i = 1; i < data.length; i++) {
    const x = i;
    const y = 100 - ((data[i] - min) / range) * 100;
    pathDefinition += ` L${x},${y}`;
  }
  
  path.setAttribute('d', pathDefinition);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '3');
  path.setAttribute('stroke-linecap', 'round');
  
  // Add gradient area under the sparkline
  const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let areaDefinition = pathDefinition;
  // Add points to complete the area
  areaDefinition += ` L${data.length - 1},100 L0,100 Z`;
  
  areaPath.setAttribute('d', areaDefinition);
  areaPath.setAttribute('fill', color);
  areaPath.setAttribute('opacity', '0.2');
  
  // Create animation for the path
  const pathLength = path.getTotalLength ? path.getTotalLength() : 500;
  
  path.setAttribute('stroke-dasharray', pathLength);
  path.setAttribute('stroke-dashoffset', pathLength);
  
  // Add animation
  const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  animate.setAttribute('attributeName', 'stroke-dashoffset');
  animate.setAttribute('from', pathLength);
  animate.setAttribute('to', '0');
  animate.setAttribute('dur', '1.5s');
  animate.setAttribute('fill', 'freeze');
  
  path.appendChild(animate);
  
  // Add the paths to the SVG
  svg.appendChild(areaPath);
  svg.appendChild(path);
  
  // Add the SVG to the container
  sparklineElement.appendChild(svg);
}

// Case Studies Carousel functionality
function initCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');
  const indicators = document.querySelector('.carousel-indicators');
  
  if (!carouselTrack || !prevButton || !nextButton) return;
  
  const cards = carouselTrack.querySelectorAll('.case-study-card');
  let currentIndex = 0;
  let startX, scrollLeft, isDown = false;
  
  // Add indicators dots
  cards.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    
    indicator.addEventListener('click', () => {
      scrollToCard(index);
    });
    
    indicators.appendChild(indicator);
  });
  
  // Next and Previous buttons
  nextButton.addEventListener('click', () => {
    scrollToCard(currentIndex + 1);
  });
  
  prevButton.addEventListener('click', () => {
    scrollToCard(currentIndex - 1);
  });
  
  // Scroll to specific card
  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    
    currentIndex = index;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(carouselTrack).gap) || 0;
    const scrollPosition = index * (cardWidth + gap);
    
    carouselTrack.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    updateIndicators();
  }
  
  // Update indicators based on current index
  function updateIndicators() {
    const allIndicators = indicators.querySelectorAll('.indicator');
    
    allIndicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Mouse drag scrolling
  carouselTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carouselTrack.offsetLeft;
    scrollLeft = carouselTrack.scrollLeft;
    carouselTrack.style.cursor = 'grabbing';
  });
  
  carouselTrack.addEventListener('mouseleave', () => {
    isDown = false;
    carouselTrack.style.cursor = 'grab';
  });
  
  carouselTrack.addEventListener('mouseup', () => {
    isDown = false;
    carouselTrack.style.cursor = 'grab';
    
    // Find current card after dragging
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(carouselTrack).gap) || 0;
    currentIndex = Math.round(carouselTrack.scrollLeft / (cardWidth + gap));
    updateIndicators();
  });
  
  carouselTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselTrack.scrollLeft = scrollLeft - walk;
  });
  
  // Touch events for mobile
  carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - carouselTrack.offsetLeft;
    scrollLeft = carouselTrack.scrollLeft;
  });
  
  carouselTrack.addEventListener('touchmove', (e) => {
    if (e.cancelable) e.preventDefault();
    const x = e.touches[0].pageX - carouselTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselTrack.scrollLeft = scrollLeft - walk;
  });
  
  carouselTrack.addEventListener('touchend', () => {
    // Find current card after dragging
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(carouselTrack).gap) || 0;
    currentIndex = Math.round(carouselTrack.scrollLeft / (cardWidth + gap));
    updateIndicators();
  });
  
  // Update indicators on scroll
  carouselTrack.addEventListener('scroll', () => {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(carouselTrack).gap) || 0;
    const index = Math.round(carouselTrack.scrollLeft / (cardWidth + gap));
    
    if (index !== currentIndex) {
      currentIndex = index;
      updateIndicators();
    }
  });
}

// AI Consultation Widget
function initAIWidget() {
  const toggleButton = document.getElementById('ai-widget-toggle');
  const closeButton = document.getElementById('ai-widget-close');
  const widgetPanel = document.getElementById('ai-widget-panel');
  const submitButton = document.getElementById('ai-submit');
  const questionInput = document.getElementById('ai-question');
  
  if (!toggleButton || !closeButton || !widgetPanel) return;
  
  // Toggle widget visibility
  toggleButton.addEventListener('click', () => {
    widgetPanel.style.display = widgetPanel.style.display === 'block' ? 'none' : 'block';
  });
  
  // Close widget
  closeButton.addEventListener('click', () => {
    widgetPanel.style.display = 'none';
  });
  
  // Submit question
  submitButton.addEventListener('click', handleQuestion);
  questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleQuestion();
    }
  });
  
  function handleQuestion() {
    const question = questionInput.value.trim();
    
    if (question) {
      // Create user message
      const messageContainer = document.createElement('div');
      messageContainer.className = 'ai-message';
      messageContainer.innerHTML = `<p><strong>You:</strong> ${question}</p>`;
      
      // Insert before input area
      const widgetBody = document.querySelector('.ai-widget-body');
      widgetBody.insertBefore(messageContainer, document.querySelector('.ai-widget-input'));
      
      // Clear input
      questionInput.value = '';
      
      // Simulate response after a short delay
      setTimeout(() => {
        const responseContainer = document.createElement('div');
        responseContainer.className = 'ai-message';
        responseContainer.innerHTML = `<p><strong>InsightPulse AI:</strong> Thank you for your question. A consultant will review your inquiry and get back to you shortly. For immediate assistance, please contact our support team.</p>`;
        widgetBody.insertBefore(responseContainer, document.querySelector('.ai-widget-input'));
        
        // Scroll to bottom
        widgetBody.scrollTop = widgetBody.scrollHeight;
      }, 1000);
    }
  }
}

// Form Animation & Validation
function initFormAnimations() {
  const form = document.getElementById('contact-form');
  const formInputs = document.querySelectorAll('.form-input');
  
  // Add focus animation for form labels
  formInputs.forEach(input => {
    // Set initial state for inputs that might have values (e.g., after page refresh)
    if (input.value.trim() !== '') {
      const label = input.nextElementSibling;
      if (label && label.classList.contains('form-label')) {
        label.classList.add('active');
      }
    }
    
    // Handle focus and blur events
    input.addEventListener('focus', () => {
      const label = input.nextElementSibling;
      if (label && label.classList.contains('form-label')) {
        label.classList.add('active');
      }
    });
    
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        const label = input.nextElementSibling;
        if (label && label.classList.contains('form-label')) {
          label.classList.remove('active');
        }
      }
    });
  });
  
  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (input.value.trim() === '') {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        setTimeout(() => {
          form.reset();
          submitButton.textContent = 'Sent Successfully!';
          
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 3000);
        }, 1500);
      }
    });
  }
}

// Random BI Tips in Footer
function initRandomBITip() {
  const tipElement = document.getElementById('bi-tip');
  
  if (!tipElement) return;
  
  const tips = [
    "Always validate your data sources before making critical decisions.",
    "KPIs should be specific, measurable, achievable, relevant, and time-bound (SMART).",
    "Data visualization is most effective when it tells a clear, focused story.",
    "Regularly review and clean your data to ensure accuracy in reporting.",
    "Combine quantitative metrics with qualitative insights for better context.",
    "Dashboard design should follow the 5-second rule: key insights visible within 5 seconds.",
    "Predictive analytics works best with high-quality historical data.",
    "Start with business questions, not available data sets.",
    "Use cohort analysis to understand customer lifetime value trends.",
    "When presenting data, always provide context and actionable insights."
  ];
  
  // Set initial tip
  const randomIndex = Math.floor(Math.random() * tips.length);
  tipElement.textContent = tips[randomIndex];
  
  // Change tip every 30 seconds
  setInterval(() => {
    const newIndex = Math.floor(Math.random() * tips.length);
    
    // Fade out
    tipElement.style.opacity = '0';
    
    setTimeout(() => {
      // Change tip
      tipElement.textContent = tips[newIndex];
      // Fade in
      tipElement.style.opacity = '1';
    }, 500);
    
  }, 30000);
}

// Interactive FAQ Section Functionality
function initFAQInteraction() {
  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const expandAllBtn = document.getElementById('faq-expand-all');
  const resetSearchBtn = document.getElementById('reset-search');
  const resultsInfo = document.getElementById('faq-results-info');
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('faq-no-results');

  let allExpanded = false;
  
  // Toggle FAQ items when clicked
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Set initial state correctly
    if (!item.classList.contains('active')) {
      answer.style.height = '0';
    } else {
      answer.style.height = answer.scrollHeight + 'px';
    }
    
    question.addEventListener('click', () => {
      // Check if this item is already active
      const isActive = item.classList.contains('active');
      
      // First close all FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherAnswer.style.height = '0';
        }
      });
      
      // Then toggle the clicked item only if it wasn't already active
      if (!isActive) {
        item.classList.add('active');
        answer.style.height = answer.scrollHeight + 'px';
      } else {
        // If it was active, now close it too
        item.classList.remove('active');
        answer.style.height = '0';
      }
      
      // Update expand all button text
      updateExpandAllButton();
    });
  });
  
  // Filter by category
  if (filterButtons) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter FAQs based on category
        const category = button.getAttribute('data-category');
        filterFAQByCategory(category);
      });
    });
  }
  
  // Reset search button
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      // Show all FAQ items
      faqItems.forEach(item => {
        item.style.display = '';
      });
      
      // Reset filter buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
          btn.classList.add('active');
        }
      });
      
      // Hide results info
      if (resultsInfo) resultsInfo.classList.add('hide');
      if (noResults) noResults.classList.add('hide');
      
      // Update expand all button
      updateExpandAllButton();
    });
  }
  
  // Expand/Collapse all FAQs
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', toggleAllFAQs);
  }
  
  // Filter FAQs by category
  function filterFAQByCategory(category) {
    let visibleCount = 0;
    
    faqItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });
    
    // Update results count
    if (resultsCount) resultsCount.textContent = visibleCount;
    
    // Show/hide results info
    if (resultsInfo) {
      if (category !== 'all') {
        resultsInfo.classList.remove('hide');
      } else {
        resultsInfo.classList.add('hide');
      }
    }
    
    // Show/hide no results message
    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.remove('hide');
      } else {
        noResults.classList.add('hide');
      }
    }
    
    // Close all FAQs when changing category
    faqItems.forEach(item => {
      item.classList.remove('active');
      const answer = item.querySelector('.faq-answer');
      if (answer) answer.style.height = '0';
    });
    
    // Update expand all button
    updateExpandAllButton();
  }
  
  // Toggle all FAQs between expanded and collapsed states
  function toggleAllFAQs() {
    if (allExpanded) {
      // Collapse all
      faqItems.forEach(item => {
        if (item.style.display !== 'none') {
          const answer = item.querySelector('.faq-answer');
          item.classList.remove('active');
          answer.style.height = '0';
        }
      });
      expandAllBtn.textContent = 'Show All Answers';
    } else {
      // Expand all
      faqItems.forEach(item => {
        if (item.style.display !== 'none') {
          const answer = item.querySelector('.faq-answer');
          item.classList.add('active');
          answer.style.height = answer.scrollHeight + 'px';
        }
      });
      expandAllBtn.textContent = 'Hide All Answers';
    }
    
    allExpanded = !allExpanded;
  }
  
  // Update Expand All button text based on current state
  function updateExpandAllButton() {
    if (!expandAllBtn) return;
    
    // Check if all visible FAQs are expanded
    const visibleItems = Array.from(faqItems).filter(item => item.style.display !== 'none');
    const expandedItems = visibleItems.filter(item => item.classList.contains('active'));
    
    if (expandedItems.length === visibleItems.length && visibleItems.length > 0) {
      expandAllBtn.textContent = 'Hide All Answers';
      allExpanded = true;
    } else {
      expandAllBtn.textContent = 'Show All Answers';
      allExpanded = false;
    }
  }
  
  // Setup feedback functionality
  setupFeedbackButtons();
}

// Handle feedback on FAQ answers
function setupFeedbackButtons() {
  const feedbackButtons = document.querySelectorAll('.feedback-btn');
  
  feedbackButtons.forEach(button => {
    button.addEventListener('click', function() {
      const feedback = this.getAttribute('data-value');
      const feedbackContainer = this.closest('.faq-feedback');
      const buttons = feedbackContainer.querySelectorAll('.feedback-btn');
      
      // Reset all buttons in this container
      buttons.forEach(btn => btn.classList.remove('selected'));
      
      // Mark this button as selected
      this.classList.add('selected');
      
      // Show thank you message
      setTimeout(() => {
        feedbackContainer.innerHTML = '<p>Thank you for your feedback!</p>';
      }, 500);
      
      // Here you could send the feedback to a backend system
      // For now, we'll just log it
      console.log('FAQ feedback:', feedback);
    });
  });
}

// FAQ toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items when one is opened
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Rest of your existing script.js code below
});

// Studios Section Interactive Tabs - Single implementation
function initStudiosSection() {
  // Studio tabs functionality
  const studioTabs = document.querySelectorAll('.studio-tab');
  const studioContents = document.querySelectorAll('.studio-content');
  const studiosWrapper = document.querySelector('.studios-tabs-wrapper');
  
  if (!studioTabs.length || !studioContents.length) return;
  
  // Initialize with the first tab active if none are marked as active
  const hasActiveTab = Array.from(studioTabs).some(tab => tab.classList.contains('active'));
  if (!hasActiveTab && studioTabs.length > 0) {
    studioTabs[0].classList.add('active');
    if (studioContents.length > 0) {
      const firstContentId = studioTabs[0].getAttribute('data-studio');
      const firstContent = document.getElementById(firstContentId);
      if (firstContent) firstContent.classList.add('active');
    }
  }
  
  studioTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      studioTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding content
      const targetStudio = this.getAttribute('data-studio');
      studioContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetStudio) {
          content.classList.add('active');
        }
      });
      
      // If we're on mobile, scroll the clicked tab into view
      if (window.innerWidth < 768 && studiosWrapper) {
        const tabRect = this.getBoundingClientRect();
        const wrapperRect = studiosWrapper.getBoundingClientRect();
        
        // If tab is not fully visible in the wrapper
        if (tabRect.right > wrapperRect.right || tabRect.left < wrapperRect.left) {
          const scrollAmount = this.offsetLeft - (studiosWrapper.offsetWidth / 2) + (this.offsetWidth / 2);
          studiosWrapper.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add hover effects for visual elements - only on devices that support hover
  if (window.matchMedia("(hover: hover)").matches) {
    const studioVisuals = document.querySelectorAll('.studio-content-visual');
    
    studioVisuals.forEach(visual => {
      visual.addEventListener('mousemove', function(e) {
        // Create subtle parallax effect on hover
        const rect = visual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;
        
        visual.style.transform = `perspective(1000px) rotateY(${xPercent * 3}deg) rotateX(${yPercent * -3}deg)`;
      });
      
      visual.addEventListener('mouseleave', function() {
        // Reset transform on mouse leave
        visual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        visual.style.transition = 'transform 0.5s ease';
      });
    });
  }
  
  // Performance indicator animation
  const piCircles = document.querySelectorAll('.pi-circle-fill');
  if (piCircles.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          circle.style.animation = 'none';
          setTimeout(() => {
            circle.style.animation = 'circle-fill 2s ease-out forwards';
          }, 100);
        }
      });
    });
    
    piCircles.forEach(circle => observer.observe(circle));
  }
  
  // Ensure responsive behavior on window resize
  window.addEventListener('resize', () => {
    // Reset transforms on resize to prevent glitches
    document.querySelectorAll('.studio-content-visual').forEach(visual => {
      visual.style.transform = 'none';
    });
  });
}

// Initialize tab functionality for specialization tabs
function initSpecializationTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Show the corresponding tab pane
      const targetId = this.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Add direct implementation of tabs to run immediately
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.specialization-tabs .tab-button');
  const tabPanes = document.querySelectorAll('.specialization-tabs .tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Find and activate the corresponding pane
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId)?.classList.add('active');
    });
  });
});

// Create folder structure if it doesn't exist
function ensureFolderStructure() {
  // This would require backend functionality, but we're doing frontend only
}