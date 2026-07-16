// Testimonials management
export function initTestimonials() {
    // Sample testimonials (will be replaced with Google Business Profile reviews)
    const testimonials = [
        {
            name: 'R. Krishnan',
            rating: 5,
            text: 'Banglore Opticals has been our family\'s trusted choice for decades. Exceptional service and quality.'
        },
        {
            name: 'S. Priya',
            rating: 5,
            text: 'The best optical store in Coimbatore! Wide range of frames and professional eye testing.'
        },
        {
            name: 'A. Kumar',
            rating: 5,
            text: 'I love my new Varilux lenses. The staff is knowledgeable and patient. Highly recommend!'
        }
    ];
    
    const container = document.querySelector('.testimonial-grid');
    if (container) {
        container.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
                <p>"${t.text}"</p>
                <p style="margin-top:0.5rem; font-weight:600;">— ${t.name}</p>
            </div>
        `).join('');
    }
}

// Star rating display
export function displayStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5-rating);
}