document.addEventListener('DOMContentLoaded', function() {
    const gallerySliders = document.querySelectorAll('.gallery-slider');
    
    gallerySliders.forEach((slider, sliderIndex) => {
        const slides = slider.querySelectorAll('.gallery-slide');
        const prevBtn = slider.parentElement.querySelector('.gallery-btn.prev');
        const nextBtn = slider.parentElement.querySelector('.gallery-btn.next');
        const counter = slider.parentElement.querySelector('.gallery-counter');
        
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[n].classList.add('active');
            
            if (counter) {
                counter.textContent = `${n + 1} / ${slides.length}`;
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Initialize
        showSlide(0);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    });
});
