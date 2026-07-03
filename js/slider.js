document.addEventListener('DOMContentLoaded', function(){
    const slides = Array.from(document.querySelectorAll('.slide'));
    const nextBtn = document.querySelector('.slider-nav.next');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const indicatorsContainer = document.querySelector('.indicators');
    let current = 0;
    let timer = null;
    const INTERVAL = 5000;
    const FIRST_SLIDE_DURATION = 63000;

    if(!slides.length) return;

    function createIndicators(){
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'indicator';
            btn.setAttribute('aria-label', `Slide ${i+1}`);
            btn.dataset.index = i;
            if(i === 0) btn.classList.add('active');
            indicatorsContainer.appendChild(btn);
        });
    }

    function stopCurrentVideo() {
        const activeVideo = document.querySelector('.slide.active video');
        if (activeVideo) {
            activeVideo.pause();
            activeVideo.currentTime = 0;
            activeVideo.onended = null;
        }
    }

    function showSlide(index){
        index = (index + slides.length) % slides.length;
        stopCurrentVideo();
        slides.forEach((s, i) => {
            const isActive = i === index;
            s.classList.toggle('active', isActive);
            s.setAttribute('aria-hidden', (!isActive).toString());
        });
        const dots = Array.from(document.querySelectorAll('.indicator'));
        dots.forEach(d => d.classList.toggle('active', Number(d.dataset.index) === index));
        current = index;

        const activeVideo = slides[index].querySelector('video');
        if (activeVideo) {
            stopTimer();
            activeVideo.muted = true;
            activeVideo.volume = 0;
            activeVideo.currentTime = 0;
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
            if (index === 0) {
                timer = setTimeout(nextSlide, FIRST_SLIDE_DURATION);
                activeVideo.onended = null;
            } else {
                activeVideo.onended = function() {
                    nextSlide();
                };
            }
        } else {
            resetTimer();
        }
    }

    function nextSlide(){ showSlide(current + 1); }
    function prevSlide(){ showSlide(current - 1); }

    function getSlideInterval(){
        return current === 0 ? FIRST_SLIDE_DURATION : INTERVAL;
    }

    function startTimer(){ stopTimer(); timer = setTimeout(nextSlide, getSlideInterval()); }
    function stopTimer(){ if(timer){ clearTimeout(timer); timer = null; } }
    function resetTimer(){ stopTimer(); startTimer(); }

    // init
    createIndicators();
    showSlide(0);

    // events
    nextBtn && nextBtn.addEventListener('click', function(){ nextSlide(); resetTimer(); });
    prevBtn && prevBtn.addEventListener('click', function(){ prevSlide(); resetTimer(); });

    indicatorsContainer.addEventListener('click', function(e){
        const btn = e.target.closest('.indicator');
        if(!btn) return;
        const idx = Number(btn.dataset.index);
        showSlide(idx);
        resetTimer();
    });

    // keyboard support
    document.addEventListener('keydown', function(e){
        if(e.key === 'ArrowRight'){ nextSlide(); resetTimer(); }
        if(e.key === 'ArrowLeft'){ prevSlide(); resetTimer(); }
    });
});
