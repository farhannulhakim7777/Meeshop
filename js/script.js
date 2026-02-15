// ========================================
// Mee.Shop - JavaScript Functionality
// Mobile-First, No Frameworks
// ========================================

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBackdrop = document.getElementById('navBackdrop');
    const mobileClose = document.getElementById('mobileClose');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialDots = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // ========================================
    // Sticky Navigation
    // ========================================
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function toggleMobileMenu() {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking backdrop
    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking close button
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    // ========================================
    // Smooth Scroll Navigation
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                closeMobileMenu();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Navigation Highlight on Scroll
    // ========================================
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 150;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionHeight = targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // ========================================
    // Back to Top Button
    // ========================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.service-card, .value-item, .portfolio-item, .team-card, .value-card');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Add fade-in class to elements
    document.querySelectorAll('.service-card, .value-item, .portfolio-item, .team-card, .value-card').forEach(element => {
        element.classList.add('fade-in');
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial call

    // ========================================
    // Testimonial Slider
    // ========================================
    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonialCards.length;

    // Create dots
    function createTestimonialDots() {
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(i));
            testimonialDots.appendChild(dot);
        }
    }

    function showTestimonial(index) {
        // Remove active class from all cards
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to current card
        testimonialCards[index].classList.add('active');
        
        // Update dots
        const dots = testimonialDots.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    }

    // Event listeners for testimonial controls
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    // Auto-play testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause auto-play on hover
    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }

    // Initialize testimonials
    createTestimonialDots();
    showTestimonial(0);

    // ========================================
    // Contact Form Validation
    // ========================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\+\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        
        input.style.borderColor = '#e74c3c';
        error.textContent = message;
        error.classList.add('show');
    }

    function clearError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        
        input.style.borderColor = '';
        error.classList.remove('show');
    }

    function validateForm(formData) {
        let isValid = true;
        
        // Clear all errors first
        clearError('name', 'nameError');
        clearError('email', 'emailError');
        clearError('phone', 'phoneError');
        clearError('message', 'messageError');
        
        // Validate name
        if (!formData.name || formData.name.trim().length < 2) {
            showError('name', 'nameError', 'Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        if (!formData.email || !validateEmail(formData.email)) {
            showError('email', 'emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        if (!formData.phone || !validatePhone(formData.phone)) {
            showError('phone', 'phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message
        if (!formData.message || formData.message.trim().length < 10) {
            showError('message', 'messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show success message
                const successMessage = document.getElementById('formSuccess');
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // In a real application, you would send the data to a server here
                console.log('Form submitted:', formData);
            }
        });
        
        // Real-time validation on blur
        const formInputs = ['name', 'email', 'phone', 'message'];
        formInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('blur', function() {
                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        message: document.getElementById('message').value
                    };
                    validateForm(formData);
                });
            }
        });
    }

    // ========================================
    // Lazy Loading Images
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ========================================
    // Parallax Effect on Hero
    // ========================================
    function handleParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-bg img');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    }

    window.addEventListener('scroll', handleParallax);

    // ========================================
    // Performance Optimization - Debounce
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScroll = debounce(() => {
        handleNavbarScroll();
        highlightActiveSection();
        handleBackToTop();
        revealOnScroll();
        handleParallax();
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // ========================================
    // Initialize on Page Load
    // ========================================
    window.addEventListener('load', function() {
        // Remove any loading states
        document.body.classList.add('loaded');
        
        // Initial scroll reveal
        revealOnScroll();
        
        // Set initial navbar state
        handleNavbarScroll();
    });

    // ========================================
    // Prevent Horizontal Scroll
    // ========================================
    function preventHorizontalScroll() {
        const body = document.body;
        const html = document.documentElement;
        
        if (body.scrollWidth > body.clientWidth || html.scrollWidth > html.clientWidth) {
            console.warn('Horizontal overflow detected');
        }
    }

    window.addEventListener('resize', debounce(preventHorizontalScroll, 250));
    preventHorizontalScroll();

    // ========================================
    // Service Card Interactions
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ========================================
    // Portfolio Item Click Handler
    // ========================================
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real application, this could open a modal or navigate to a detail page
            console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
        });
    });

    // ========================================
    // Console Message
    // ========================================
    console.log('%cMee.Shop', 'font-size: 24px; font-weight: bold; color: #ff6b9d;');
    console.log('%cWhere Every Bloom Tells a Story 🌸', 'font-size: 14px; color: #4caf50;');
    console.log('Website developed with care and attention to detail.');
    
})();