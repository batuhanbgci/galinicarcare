document.addEventListener('DOMContentLoaded', function() {
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    const modalById = new Map(
        Array.from(document.querySelectorAll('.gallery-modal')).map(modal => [modal.id, modal])
    );
    const modalArray = galleryCards
        .map(card => modalById.get(card.getAttribute('data-modal')))
        .filter(Boolean);

    let activeModal = null;

    function updateVideoPlayingState(modal) {
        if (!modal) return;

        const hasPlayingVideo = Array.from(modal.querySelectorAll('video')).some(video => !video.paused && !video.ended);
        modal.classList.toggle('gallery-video-playing', hasPlayingVideo);
    }

    function playVideo(video) {
        if (!video) return;

        const modal = video.closest('.gallery-modal');
        const slide = video.closest('.gallery-slide');

        if (modal) {
            modal.querySelectorAll('video').forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        }

        if (video.readyState === 0) {
            video.load();
        }

        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                if (slide) {
                    slide.classList.remove('is-playing');
                }
                updateVideoPlayingState(modal);
            });
        }
    }

    function pauseVideos(modal) {
        if (!modal) return;

        modal.querySelectorAll('video').forEach(video => {
            video.pause();
            const slide = video.closest('.gallery-slide');
            if (slide) {
                slide.classList.remove('is-playing');
            }
        });
        modal.classList.remove('gallery-video-playing');
    }

    function setupVideos(modal) {
        modal.querySelectorAll('video').forEach(video => {
            if (video.dataset.galleryVideoReady === 'true') {
                return;
            }

            const slide = video.closest('.gallery-slide');

            video.controls = true;
            video.preload = 'metadata';
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('x5-playsinline', '');

            if (slide) {
                slide.classList.add('has-video');

                const playButton = document.createElement('button');
                playButton.type = 'button';
                playButton.className = 'gallery-video-play';
                playButton.setAttribute('aria-label', 'Videoyu oynat');

                const startVideo = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    playVideo(video);
                };

                playButton.addEventListener('click', startVideo);
                playButton.addEventListener('touchend', startVideo);
                slide.appendChild(playButton);
            }

            video.addEventListener('click', function(event) {
                event.stopPropagation();
            });

            video.addEventListener('play', function() {
                if (slide) {
                    slide.classList.add('is-playing');
                }
                updateVideoPlayingState(modal);
            });

            video.addEventListener('pause', function() {
                if (slide) {
                    slide.classList.remove('is-playing');
                }
                updateVideoPlayingState(modal);
            });

            video.addEventListener('ended', function() {
                if (slide) {
                    slide.classList.remove('is-playing');
                }
                updateVideoPlayingState(modal);
            });

            video.dataset.galleryVideoReady = 'true';
        });
    }

    function setupSlider(modal) {
        if (modal.dataset.sliderReady === 'true') {
            return;
        }

        setupVideos(modal);

        const slides = Array.from(modal.querySelectorAll('.gallery-slide'));
        const prevBtn = modal.querySelector('.gallery-btn.prev');
        const nextBtn = modal.querySelector('.gallery-btn.next');
        const counter = modal.querySelector('.gallery-counter');
        const sliderWrapper = modal.querySelector('.gallery-slider-wrapper');
        let currentSlide = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        let touchLastX = 0;
        let touchLastY = 0;
        let isSwiping = false;
        let isHorizontalSwipe = false;

        function showSlide(index) {
            if (!slides.length) return;

            currentSlide = (index + slides.length) % slides.length;
            pauseVideos(modal);

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === currentSlide);
            });

            const activeSlide = slides[currentSlide];
            const activeVideo = activeSlide ? activeSlide.querySelector('video') : null;
            modal.classList.toggle('gallery-video-active', Boolean(activeVideo));

            if (activeVideo && activeVideo.readyState === 0) {
                activeVideo.load();
            }

            if (counter) {
                counter.textContent = `${currentSlide + 1} / ${slides.length}`;
            }
        }

        modal.galleryShowSlide = showSlide;
        modal.galleryNextSlide = function() {
            showSlide(currentSlide + 1);
        };
        modal.galleryPrevSlide = function() {
            showSlide(currentSlide - 1);
        };

        function shouldSkipSwipe(target) {
            if (!target || typeof target.closest !== 'function') {
                return false;
            }

            return Boolean(target.closest('button, a, .gallery-video-play'));
        }

        function startSwipe(event) {
            if (event.touches.length !== 1 || shouldSkipSwipe(event.target)) {
                isSwiping = false;
                return;
            }

            const touchedVideo = event.target.closest('video');
            if (touchedVideo && !touchedVideo.paused) {
                isSwiping = false;
                return;
            }

            const touch = event.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchLastX = touchStartX;
            touchLastY = touchStartY;
            isSwiping = true;
            isHorizontalSwipe = false;
        }

        function moveSwipe(event) {
            if (!isSwiping || event.touches.length !== 1) {
                return;
            }

            const touch = event.touches[0];
            touchLastX = touch.clientX;
            touchLastY = touch.clientY;

            const deltaX = touchLastX - touchStartX;
            const deltaY = touchLastY - touchStartY;

            if (!isHorizontalSwipe && Math.abs(deltaX) > 14 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
                isHorizontalSwipe = true;
            }

            if (isHorizontalSwipe) {
                event.preventDefault();
            }
        }

        function endSwipe() {
            if (!isSwiping) {
                return;
            }

            const deltaX = touchLastX - touchStartX;
            const deltaY = touchLastY - touchStartY;
            isSwiping = false;

            if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) {
                return;
            }

            if (deltaX < 0) {
                modal.galleryNextSlide();
            } else {
                modal.galleryPrevSlide();
            }
        }

        if (sliderWrapper) {
            sliderWrapper.addEventListener('touchstart', startSwipe, { passive: true });
            sliderWrapper.addEventListener('touchmove', moveSwipe, { passive: false });
            sliderWrapper.addEventListener('touchend', endSwipe);
            sliderWrapper.addEventListener('touchcancel', function() {
                isSwiping = false;
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                modal.galleryPrevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                modal.galleryNextSlide();
            });
        }

        modal.dataset.sliderReady = 'true';
        showSlide(0);
    }

    function openModal(modal, resetSlide) {
        if (!modal) return;

        if (activeModal && activeModal !== modal) {
            closeModal(activeModal);
        }

        setupSlider(modal);
        activeModal = modal;
        modal.classList.add('active');
        document.body.classList.add('gallery-modal-open');

        if (resetSlide && typeof modal.galleryShowSlide === 'function') {
            modal.galleryShowSlide(0);
        }
    }

    function closeModal(modal) {
        if (!modal) return;

        pauseVideos(modal);
        modal.classList.remove('active');

        if (activeModal === modal) {
            activeModal = null;
            document.body.classList.remove('gallery-modal-open');
        }
    }

    function switchModal(direction) {
        if (!activeModal || modalArray.length < 2) return;

        const currentIndex = modalArray.indexOf(activeModal);
        const offset = direction === 'next' ? 1 : -1;
        const nextIndex = (currentIndex + offset + modalArray.length) % modalArray.length;
        openModal(modalArray[nextIndex], true);
    }

    galleryCards.forEach(card => {
        const openCardModal = function() {
            openModal(modalById.get(card.getAttribute('data-modal')), true);
        };

        card.addEventListener('click', openCardModal);
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openCardModal();
            }
        });
    });

    modalArray.forEach(modal => {
        const closeBtn = modal.querySelector('.gallery-modal-close');
        const content = modal.querySelector('.gallery-modal-content');
        const prevNavBtn = modal.querySelector('.modal-nav-btn.prev-modal');
        const nextNavBtn = modal.querySelector('.modal-nav-btn.next-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                closeModal(modal);
            });
        }

        if (content) {
            content.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }

        if (prevNavBtn) {
            prevNavBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                switchModal('prev');
            });
        }

        if (nextNavBtn) {
            nextNavBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                switchModal('next');
            });
        }

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', function(event) {
        if (!activeModal) return;

        if (event.key === 'Escape') {
            closeModal(activeModal);
        }

        if (event.key === 'ArrowLeft' && typeof activeModal.galleryPrevSlide === 'function') {
            activeModal.galleryPrevSlide();
        }

        if (event.key === 'ArrowRight' && typeof activeModal.galleryNextSlide === 'function') {
            activeModal.galleryNextSlide();
        }
    });
});
