/* ========================================
   MAIN JAVASCRIPT - BANGALORE OPTICALS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏪 Bangalore Opticals - Website Loaded');

    // ===== NAVIGATION =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== ACTIVE PAGE =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile-menu a').forEach(function(link) {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===== FOOTER YEAR =====
    document.querySelectorAll('.current-year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });

    // ===== SMOOTH SCROLL =====
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

    // ===== SCROLL ANIMATIONS - FADE UP =====
    const animateElements = document.querySelectorAll(
        '.stat-card, .product-card, .service-card, .brand-card, .testimonial-card, .branch-card, .gallery-image-wrapper'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animateElements.forEach(function(el) {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // ===== SECTION REVEAL ANIMATION =====
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(function(section) {
        section.classList.add('section-reveal');
        sectionObserver.observe(section);
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
            }
        } else {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 1px 20px rgba(0,0,0,0.04)';
        }
        
        lastScroll = currentScroll;
    });

    // ===== BUTTON RIPPLE EFFECT =====
    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: translate(-50%, -50%);
                transition: all 0.6s ease;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            requestAnimationFrame(function() {
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.opacity = '0';
            });
            
            setTimeout(function() {
                ripple.remove();
            }, 700);
        });
    });

    console.log('✅ Bangalore Opticals - All systems ready');
});