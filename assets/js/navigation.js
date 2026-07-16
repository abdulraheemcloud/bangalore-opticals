/* ========================================
   NAVIGATION MODULE
   ======================================== */

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        // Remove any existing event listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        const newMobileMenu = mobileMenu.cloneNode(true);
        mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);
        
        // Get fresh references
        const freshHamburger = document.getElementById('hamburger');
        const freshMobileMenu = document.getElementById('mobileMenu');
        
        // Toggle mobile menu on hamburger click
        freshHamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu(freshHamburger, freshMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (freshMobileMenu.classList.contains('open') && 
                !freshMobileMenu.contains(e.target) && 
                !freshHamburger.contains(e.target)) {
                closeMobileMenu(freshHamburger, freshMobileMenu);
            }
        });
        
        // Close menu when a link is clicked
        freshMobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                closeMobileMenu(freshHamburger, freshMobileMenu);
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && freshMobileMenu.classList.contains('open')) {
                closeMobileMenu(freshHamburger, freshMobileMenu);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 767 && freshMobileMenu.classList.contains('open')) {
                closeMobileMenu(freshHamburger, freshMobileMenu);
            }
        });
    }
    
    // Highlight active page
    highlightActivePage();
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu(hamburger, menu) {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
}

/**
 * Close mobile menu
 */
function closeMobileMenu(hamburger, menu) {
    menu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
}

/**
 * Highlight active page in navigation
 */
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a, .mobile-menu a');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}