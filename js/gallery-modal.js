document.addEventListener('DOMContentLoaded', function() {
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    const modalById = new Map(
        Array.from(document.querySelectorAll('.gallery-modal')).map(modal => [modal.id, modal])
    );
    const modalArray = galleryCards
        .map(card => modalById.get(card.getAttribute('data-modal')))
        .filter(Boolean);

    let activeModal = null;

    function pauseVideos(modal) {
        modal.querySelectorAll('video').forEach(video => {
            video.pause();
        });
    }

    function setupSlider(modal) {
        if (modal.dataset.sliderReady === 'true') {
            return;
        }

        const slides = Array.from(modal.querySelectorAll('.gallery-slide'));
        const prevBtn = modal.querySelector('.gallery-btn.prev');
        const nextBtn = modal.querySelector('.gallery-btn.next');
        const counter = modal.querySelector('.gallery-counter');
        let currentSlide = 0;

        function showSlide(index) {
            if (!slides.length) return;

            currentSlide = (index + slides.length) % slides.length;
            pauseVideos(modal);

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === currentSlide);
            });

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
