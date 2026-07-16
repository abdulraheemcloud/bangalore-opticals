// Contact form and functionality
export function initContact() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data['Your Name'] || !data['Email']) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    });
    
    // Phone number formatting
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    });
}

// Initialize click-to-call and WhatsApp
export function initContactButtons() {
    const phoneNumbers = ['9843312423', '9843343300', '7502402502'];
    
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: track phone calls
            console.log(`Calling: ${this.href}`);
        });
    });
    
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log(`WhatsApp: ${this.href}`);
        });
    });
}