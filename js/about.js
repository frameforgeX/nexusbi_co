/* ----------------------------------------------
   NexusBI Business Intelligence Website
   About Page JavaScript
---------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all about page components
    initCounterAnimation();
    initValueCards();
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

// Value cards flip functionality
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details about ${card.querySelector('h3').textContent}`);
    });
}

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
