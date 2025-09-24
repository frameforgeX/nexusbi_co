/* ----------------------------------------------
   NexusBI Business Intelligence Website
   About Page JavaScript
---------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all about page components
    initCounterAnimation();
    
    // Handle tab preloading to prevent layout shifts
    const valuesSection = document.querySelector('.about-values');
    if (valuesSection) {
        valuesSection.classList.add('is-loading');
        
        // Wait for images and resources to load
        window.addEventListener('load', () => {
            // Short timeout to ensure smooth transition
            setTimeout(() => {
                valuesSection.classList.remove('is-loading');
                valuesSection.classList.add('is-loaded');
                
                // Initialize tabs after loading state is removed
                initValueTabs();
            }, 300);
        });
    }
    
    initApproachSteps();
    initTestimonialCarousel();
});

// Counter animation for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    // Intersection Observer to start counter when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds duration
                const startTime = performance.now();
                const startValue = 0;
                
                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuad = progress * (2 - progress);
                    const currentValue = Math.floor(easeOutQuad * (target - startValue) + startValue);
                    
                    counter.textContent = currentValue;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target; // Ensure final value is exact
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter); // Stop observing once animation starts
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Tab-based Values functionality
function initValueTabs() {
    // Get all card tab containers
    const valueCardContainers = document.querySelectorAll('.value-card-container');
    
    // Initialize tabs for each card
    valueCardContainers.forEach(container => {
        const tabs = container.querySelectorAll('.value-card-tab');
        const contents = container.querySelectorAll('.value-card-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Get the tab and card identifiers
                const tabType = tab.getAttribute('data-tab');
                const cardId = tab.getAttribute('data-card');
                
                // Remove active class from all tabs and contents within this card
                container.querySelectorAll('.value-card-tab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.value-card-content').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show the selected content
                const targetContent = container.querySelector(`.value-card-content[data-content="${tabType}"][data-card="${cardId}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Apply animation to pillars if they exist
                    const pillars = targetContent.querySelectorAll('.value-pillar-list li');
                    pillars.forEach((pillar, index) => {
                        pillar.style.animationDelay = `${index * 0.15}s`;
                        pillar.style.animation = `pillarAppear 0.5s ease forwards`;
                    });
                }
                
                // Update ARIA attributes for accessibility
                tabs.forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.setAttribute('tabindex', '-1');
                });
                
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
            });
            
            // Keyboard accessibility for tabs
            tab.addEventListener('keydown', (e) => {
                // Handle keyboard navigation
                const tabsList = Array.from(tabs);
                let index = tabsList.indexOf(tab);
                let nextTab;
                
                switch(e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        nextTab = tabsList[(index + 1) % tabsList.length];
                        nextTab.click();
                        nextTab.focus();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        nextTab = tabsList[(index - 1 + tabsList.length) % tabsList.length];
                        nextTab.click();
                        nextTab.focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        tabsList[0].click();
                        tabsList[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        tabsList[tabsList.length - 1].click();
                        tabsList[tabsList.length - 1].focus();
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        tab.click();
                        break;
                }
            });
        });
        
        // Set ARIA roles and attributes for accessibility
        const tabList = container.querySelector('.value-card-tabs');
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
            
            tabs.forEach((tab, index) => {
                const tabType = tab.getAttribute('data-tab');
                const cardId = tab.getAttribute('data-card');
                const isActive = tab.classList.contains('active');
                
                tab.setAttribute('role', 'tab');
                tab.setAttribute('id', `tab-${cardId}-${tabType}`);
                tab.setAttribute('aria-controls', `content-${cardId}-${tabType}`);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
            });
            
            contents.forEach(content => {
                const tabType = content.getAttribute('data-content');
                const cardId = content.getAttribute('data-card');
                
                content.setAttribute('role', 'tabpanel');
                content.setAttribute('id', `content-${cardId}-${tabType}`);
                content.setAttribute('aria-labelledby', `tab-${cardId}-${tabType}`);
            });
            
            // If no tab is active in this card, activate the first one
            if (!container.querySelector('.value-card-tab.active') && tabs.length > 0) {
                tabs[0].click();
            }
        }
        
        // Add swipe functionality for each card
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            
            // Handle swipe
            const activeTab = container.querySelector('.value-card-tab.active');
            if (activeTab) {
                const tabsList = Array.from(tabs);
                const currentIndex = tabsList.indexOf(activeTab);
                let nextIndex;
                
                // Minimum distance required for swipe (px)
                const swipeThreshold = 50;
                
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe left, go to next tab
                    nextIndex = (currentIndex + 1) % tabsList.length;
                    tabsList[nextIndex].click();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe right, go to previous tab
                    nextIndex = (currentIndex - 1 + tabsList.length) % tabsList.length;
                    tabsList[nextIndex].click();
                }
            }
        }, false);
    });
    
    // Add visual swipe indicator for mobile devices
    if (window.innerWidth < 768) {
        const valuesSection = document.querySelector('.about-values');
        const swipeIndicator = document.createElement('div');
        swipeIndicator.className = 'swipe-indicator';
        swipeIndicator.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" />
            </svg>
            <span>Swipe to view details</span>
        `;
        
        valuesSection.appendChild(swipeIndicator);
        
        // Hide the indicator after a few seconds
        setTimeout(() => {
            swipeIndicator.style.opacity = '0';
            setTimeout(() => {
                swipeIndicator.style.display = 'none';
            }, 1000);
        }, 3000);
    }
}

// Add CSS animation keyframes dynamically for pillar animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes pillarAppear {
    0% { 
        opacity: 0;
        transform: translateY(15px);
    }
    100% { 
        opacity: 1;
        transform: translateY(0);
    }
}`;
document.head.appendChild(styleSheet);

// Approach step carousel
function initApproachSteps() {
    const steps = document.querySelectorAll('.approach-step');
    const dots = document.querySelectorAll('.step-dot');
    const prevBtn = document.querySelector('.prev-step');
    const nextBtn = document.querySelector('.next-step');
    let currentStep = 0;
    
    function showStep(index) {
        // Hide all steps and remove active class from dots
        steps.forEach(step => step.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current step and activate current dot
        steps[index].classList.add('active');
        dots[index].classList.add('active');
        currentStep = index;
    }
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentStep = (currentStep + 1) % steps.length;
        showStep(currentStep);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentStep = (currentStep - 1 + steps.length) % steps.length;
        showStep(currentStep);
    });
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showStep(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.approach-section:hover')) {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            }
        }
    });
    
    // Auto-rotation for the steps
    let stepInterval = setInterval(() => {
        currentStep = (currentStep + 1) % steps.length;
        showStep(currentStep);
    }, 5000);
    
    // Pause auto-rotation on hover
    const approachSection = document.querySelector('.approach-section');
    approachSection.addEventListener('mouseenter', () => {
        clearInterval(stepInterval);
    });
    
    approachSection.addEventListener('mouseleave', () => {
        stepInterval = setInterval(() => {
            currentStep = (currentStep + 1) % steps.length;
            showStep(currentStep);
        }, 5000);
    });
    
    // Initialize with the first step
    showStep(0);
}

// Testimonial carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials and remove active class from dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current testimonial and activate current dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    
    testimonialCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    testimonialCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left, show next
            nextBtn.click();
        } else if (touchEndX > touchStartX) {
            // Swipe right, show previous
            prevBtn.click();
        }
    }
    
    // Auto-rotation for testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 7000);
    
    // Pause auto-rotation on hover
    const testimonialSection = document.querySelector('.about-testimonials');
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 7000);
    });
    
    // Initialize with the first testimonial
    showTestimonial(0);
}
