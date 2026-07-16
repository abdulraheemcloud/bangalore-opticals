/* ========================================
   COMPONENT LOADER - BANGLORE OPTICALS
   ======================================== */

(function() {
    'use strict';

    /**
     * ComponentLoader - Handles loading HTML components
     */
    class ComponentLoader {
        constructor() {
            this.components = [
                { name: 'header', path: 'assets/components/header.html' },
                { name: 'footer', path: 'assets/components/footer.html' },
                { name: 'floating-buttons', path: 'assets/components/floating-buttons.html' }
            ];
            this.loaded = false;
        }

        /**
         * Initialize component loading
         */
        async init() {
            try {
                await this.loadAllComponents();
                this.loaded = true;
                this.initializeComponents();
                console.log('✅ Components loaded successfully');
            } catch (error) {
                console.error('❌ Failed to load components:', error);
                this.showFallback();
            }
        }

        /**
         * Load all components
         */
        async loadAllComponents() {
            const promises = this.components.map(comp => this.loadComponent(comp));
            await Promise.all(promises);
        }

        /**
         * Load a single component
         */
        async loadComponent(component) {
            try {
                const response = await fetch(component.path);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const html = await response.text();
                this.insertComponent(component.name, html);
            } catch (error) {
                console.error(`Failed to load ${component.name}:`, error);
                throw error;
            }
        }

        /**
         * Insert component into DOM
         */
        insertComponent(name, html) {
            const placeholder = document.querySelector(`[data-component="${name}"]`);
            if (placeholder) {
                placeholder.outerHTML = html;
            } else {
                // Fallback: insert at specific positions
                if (name === 'header' && document.body.firstChild) {
                    document.body.insertAdjacentHTML('afterbegin', html);
                } else if (name === 'floating-buttons') {
                    document.body.insertAdjacentHTML('beforeend', html);
                } else if (name === 'footer') {
                    document.body.insertAdjacentHTML('beforeend', html);
                }
            }
        }

        /**
         * Initialize components after loading
         */
        initializeComponents() {
            this.initNavigation();
            this.initActivePage();
            this.initFooterYear();
            this.initLogoDisplay();
            this.initHeaderScroll();
        }

        /**
         * Initialize navigation functionality
         */
        initNavigation() {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');

            if (hamburger && mobileMenu) {
                // Remove existing listeners (prevent duplicates)
                const newHamburger = hamburger.cloneNode(true);
                const newMobileMenu = mobileMenu.cloneNode(true);
                hamburger.parentNode.replaceChild(newHamburger, hamburger);
                mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);

                const freshHamburger = document.getElementById('hamburger');
                const freshMobileMenu = document.getElementById('mobileMenu');

                // Toggle menu on hamburger click
                freshHamburger.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.classList.toggle('active');
                    freshMobileMenu.classList.toggle('open');
                    document.body.style.overflow = freshMobileMenu.classList.contains('open') ? 'hidden' : '';
                    this.setAttribute('aria-expanded', freshMobileMenu.classList.contains('open'));
                });

                // Close menu on link click
                freshMobileMenu.querySelectorAll('a').forEach(function(link) {
                    link.addEventListener('click', function() {
                        freshHamburger.classList.remove('active');
                        freshMobileMenu.classList.remove('open');
                        document.body.style.overflow = '';
                        freshHamburger.setAttribute('aria-expanded', 'false');
                    });
                });

                // Close menu on outside click
                document.addEventListener('click', function(e) {
                    if (freshMobileMenu.classList.contains('open') && 
                        !freshMobileMenu.contains(e.target) && 
                        !freshHamburger.contains(e.target)) {
                        freshHamburger.classList.remove('active');
                        freshMobileMenu.classList.remove('open');
                        document.body.style.overflow = '';
                        freshHamburger.setAttribute('aria-expanded', 'false');
                    }
                });

                // Close menu on Escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && freshMobileMenu.classList.contains('open')) {
                        freshHamburger.classList.remove('active');
                        freshMobileMenu.classList.remove('open');
                        document.body.style.overflow = '';
                        freshHamburger.setAttribute('aria-expanded', 'false');
                    }
                });

                // Close menu on resize to desktop
                window.addEventListener('resize', function() {
                    if (window.innerWidth > 768 && freshMobileMenu.classList.contains('open')) {
                        freshHamburger.classList.remove('active');
                        freshMobileMenu.classList.remove('open');
                        document.body.style.overflow = '';
                        freshHamburger.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        }

        /**
         * Highlight active page in navigation
         */
        initActivePage() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav a, .mobile-menu a');
            
            navLinks.forEach(function(link) {
                const href = link.getAttribute('href');
                link.classList.remove('active');
                if (href === currentPage || 
                    (currentPage === 'index.html' && href === 'index.html') ||
                    (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }

        /**
         * Update footer year
         */
        initFooterYear() {
            document.querySelectorAll('.current-year').forEach(function(el) {
                el.textContent = new Date().getFullYear();
            });
        }

        /**
         * Handle logo display
         */
        initLogoDisplay() {
            const logoImg = document.getElementById('logo-image');
            const logoText = document.getElementById('logo-text');
            
            if (logoImg && logoText) {
                // Check if logo image contains text
                logoImg.addEventListener('load', function() {
                    // If logo contains text, hide the text span
                    // This is a simple check - you can customize based on your logo
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = this.naturalWidth;
                    canvas.height = this.naturalHeight;
                    ctx.drawImage(this, 0, 0);
                    
                    // Check if logo has text content (basic check)
                    // In production, you'd use a more sophisticated method
                    // or simply hide/show based on preference
                });
                
                // Fallback if image fails to load
                logoImg.addEventListener('error', function() {
                    if (logoText) {
                        logoText.style.display = 'block';
                    }
                });
            }
        }

        /**
         * Handle header scroll effect
         */
        initHeaderScroll() {
            const header = document.querySelector('.header');
            let lastScroll = 0;

            if (header) {
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
            }
        }

        /**
         * Show fallback content if components fail to load
         */
        showFallback() {
            document.querySelectorAll('[data-component]').forEach(function(el) {
                el.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #6b7a8a;">
                        <p>⚠️ Unable to load component</p>
                        <p style="font-size: 0.875rem;">Please refresh the page</p>
                    </div>
                `;
            });
        }
    }

    // ========================================
    // INITIALIZE
    // ========================================

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }

    function initComponents() {
        const loader = new ComponentLoader();
        loader.init();
    }

})();