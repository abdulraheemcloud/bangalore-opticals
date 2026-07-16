/* ========================================
   PREMIUM ANIMATIONS MODULE
   ======================================== */

/**
 * Initialize all premium animations
 */
export function initAnimations() {
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize counter animations
    initPremiumCounters();
    
    // Initialize particle background
    initParticles();
    
    // Initialize 3D tilt effect
    initTiltEffect();
    
    // Initialize magnetic hover
    initMagneticHover();
    
    // Initialize gold shimmer on badges
    initShimmerBadges();
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger-scroll');
    
    if (!revealElements.length) return;
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stagger container, add visible to children
                if (entry.target.classList.contains('stagger-scroll')) {
                    entry.target.classList.add('visible');
                }
                
                // Optionally unobserve after animation
                if (entry.target.dataset.once !== 'false') {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Initialize premium counter animations
 */
function initPremiumCounters() {
    const counters = document.querySelectorAll('.counter-premium');
    
    if (!counters.length) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.dataset.target) || 0;
                const duration = parseInt(target.dataset.duration) || 2000;
                const suffix = target.dataset.suffix || '';
                const prefix = target.dataset.prefix || '';
                
                animatePremiumCounter(target, endValue, duration, suffix, prefix);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate premium counter with easing
 */
function animatePremiumCounter(element, target, duration, suffix, prefix) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic - premium feel
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (target - startValue) * eased;
        
        // Format with commas for large numbers
        let displayValue;
        if (target > 1000) {
            displayValue = Math.round(currentValue).toLocaleString();
        } else if (target > 100) {
            displayValue = Math.round(currentValue);
        } else {
            displayValue = Math.round(currentValue);
        }
        
        element.textContent = prefix + displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
            
            // Add a subtle sparkle on completion
            element.style.transition = 'transform 0.3s ease';
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Initialize particle background
 */
function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 12;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--gold);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
            opacity: ${Math.random() * 0.3 + 0.1};
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
}

/**
 * Initialize 3D tilt effect on cards
 */
function initTiltEffect() {
    const cards = document.querySelectorAll('.premium-card, .product-card, .service-card, .brand-premium');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Initialize magnetic hover effect on buttons
 */
function initMagneticHover() {
    const buttons = document.querySelectorAll('.btn-gold, .btn-accent, .btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 8;
            const moveY = (y - centerY) / centerY * 8;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

/**
 * Initialize shimmer effect on badges
 */
function initShimmerBadges() {
    const badges = document.querySelectorAll('.badge-premium, .hero-badge');
    
    badges.forEach(badge => {
        badge.style.position = 'relative';
        badge.style.overflow = 'hidden';
        
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: goldShimmer 3s ease-in-out infinite;
            pointer-events: none;
        `;
        
        badge.appendChild(shimmer);
    });
}

/**
 * Initialize luxury text animation
 */
export function initLuxuryText() {
    const textElements = document.querySelectorAll('.luxury-text');
    
    textElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        
        // Split text into characters for staggered reveal
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `revealText 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.03}s forwards`;
            span.style.transition = 'all 0.3s ease';
            
            el.appendChild(span);
        });
    });
}

/**
 * Initialize smooth page transitions
 */
export function initPageTransitions() {
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                e.preventDefault();
                
                // Add fade out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.4s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}