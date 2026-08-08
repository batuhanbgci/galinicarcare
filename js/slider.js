document.addEventListener('DOMContentLoaded', function(){
    const slides = Array.from(document.querySelectorAll('.slide'));
    const nextBtn = document.querySelector('.slider-nav.next');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const indicatorsContainer = document.querySelector('.indicators');
    const sliderWrapper = document.querySelector('.slider-wrapper');
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

    function addSwipeSupport(element) {
        if (!element) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchLastX = 0;
        let touchLastY = 0;
        let isSwiping = false;
        let isHorizontalSwipe = false;
        let activePointerId = null;

        function shouldSkipSwipe(target) {
            if (!target || typeof target.closest !== 'function') return false;
            return Boolean(target.closest('button, a'));
        }

        function beginSwipe(clientX, clientY) {
            touchStartX = clientX;
            touchStartY = clientY;
            touchLastX = touchStartX;
            touchLastY = touchStartY;
            isSwiping = true;
            isHorizontalSwipe = false;
            stopTimer();
        }

        function updateSwipe(clientX, clientY, event) {
            if (!isSwiping) return;

            touchLastX = clientX;
            touchLastY = clientY;
            const deltaX = touchLastX - touchStartX;
            const deltaY = touchLastY - touchStartY;

            if (!isHorizontalSwipe && Math.abs(deltaX) > 14 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
                isHorizontalSwipe = true;
            }

            if (isHorizontalSwipe && event.cancelable) event.preventDefault();
        }

        function finishSwipe(clientX, clientY) {
            if (!isSwiping) return;

            if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
                touchLastX = clientX;
                touchLastY = clientY;
            }

            const deltaX = touchLastX - touchStartX;
            const deltaY = touchLastY - touchStartY;
            isSwiping = false;

            if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) {
                resetTimer();
                return;
            }

            // Galeriyle aynı yön: sola sürükle = sonraki, sağa sürükle = önceki.
            if (deltaX < 0) nextSlide();
            else prevSlide();
        }

        function cancelSwipe() {
            isSwiping = false;
            activePointerId = null;
            resetTimer();
        }

        if ('PointerEvent' in window) {
            element.addEventListener('pointerdown', function(event) {
                if (!event.isPrimary || shouldSkipSwipe(event.target) || (event.pointerType === 'mouse' && event.button !== 0)) {
                    cancelSwipe();
                    return;
                }

                activePointerId = event.pointerId;
                beginSwipe(event.clientX, event.clientY);

                if (typeof element.setPointerCapture === 'function') {
                    element.setPointerCapture(event.pointerId);
                }
            });

            element.addEventListener('pointermove', function(event) {
                if (event.pointerId !== activePointerId) return;
                updateSwipe(event.clientX, event.clientY, event);
            });

            element.addEventListener('pointerup', function(event) {
                if (event.pointerId !== activePointerId) return;
                activePointerId = null;
                finishSwipe(event.clientX, event.clientY);
            });

            element.addEventListener('pointercancel', cancelSwipe);
        } else {
            element.addEventListener('touchstart', function(event) {
                if (event.touches.length !== 1 || shouldSkipSwipe(event.target)) {
                    cancelSwipe();
                    return;
                }

                const touch = event.touches[0];
                beginSwipe(touch.clientX, touch.clientY);
            }, { passive: true });

            element.addEventListener('touchmove', function(event) {
                if (!isSwiping || event.touches.length !== 1) return;
                const touch = event.touches[0];
                updateSwipe(touch.clientX, touch.clientY, event);
            }, { passive: false });

            element.addEventListener('touchend', function(event) {
                const touch = event.changedTouches[0];
                finishSwipe(touch && touch.clientX, touch && touch.clientY);
            });

            element.addEventListener('touchcancel', cancelSwipe);
        }

        element.dataset.swipeReady = 'true';
    }

    function getSlideInterval(){
        return current === 0 ? FIRST_SLIDE_DURATION : INTERVAL;
    }

    function startTimer(){ stopTimer(); timer = setTimeout(nextSlide, getSlideInterval()); }
    function stopTimer(){ if(timer){ clearTimeout(timer); timer = null; } }
    function resetTimer(){ stopTimer(); startTimer(); }

    // init
    createIndicators();
    showSlide(0);
    addSwipeSupport(sliderWrapper);

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
