document.addEventListener('DOMContentLoaded', function(){
    const slides = Array.from(document.querySelectorAll('.slide'));
    if (!slides.length) return;

    const firstSlide = slides[0];
    firstSlide.classList.add('active');
    firstSlide.setAttribute('aria-hidden', 'false');

    const activeVideo = firstSlide.querySelector('video');
    if (activeVideo) {
        activeVideo.muted = true;
        activeVideo.volume = 0;
        const playPromise = activeVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
    }
});
