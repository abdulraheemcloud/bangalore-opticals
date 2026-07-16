// Gallery functionality
export function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    // Add lazy loading
    galleryImages.forEach(img => {
        img.loading = 'lazy';
        
        // Add click to enlarge
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                padding: 2rem;
            `;
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            `;
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                        document.removeEventListener('keydown', closeOnEscape);
                    }
                }
            });
        });
    });
}

// Image optimization
export function optimizeImages() {
    document.querySelectorAll('img').forEach(img => {
        // Add loading="lazy" if not already set
        if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
        }
        
        // Add alt text if missing
        if (!img.hasAttribute('alt') || img.alt === '') {
            img.alt = 'Banglore Opticals image';
        }
    });
}