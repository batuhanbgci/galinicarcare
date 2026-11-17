/**
 * Galini Premium Car Care — Site-Wide Luxury Motion & Interactive Effects
 * Provides scroll-reveal animations, cursor-tracking radial glow, subtle 3D card tilt,
 * and a header scroll progress bar across all pages while respecting prefers-reduced-motion.
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.add('motion-ready');

        initScrollProgress();
        initScrollReveal();
        initHomeFaqAccordion();
        initMaterialImageFallbacks();
        initInlineVideoPlayers();

        if (!prefersReducedMotion) {
            initCardSpotlightAndTilt();
            initMagneticButtons();
            initServiceVideos();
        }
    });

    /**
     * Thin gold progress line at the bottom of the sticky header
     */
    function initScrollProgress() {
        const header = document.querySelector('header');
        if (!header) return;

        const bar = document.createElement('div');
        bar.className = 'scroll-progress-bar';
        bar.setAttribute('aria-hidden', 'true');
        header.appendChild(bar);

        let ticking = false;
        function updateProgress() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
            bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
            header.classList.toggle('header-scrolled', scrollTop > 36);
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });

        updateProgress();
    }

    /**
     * IntersectionObserver scroll-reveal with automatic stagger grouping across all pages
     */
    function initScrollReveal() {
        const revealConfigs = [
            // Shared
            { selector: '.breadcrumbs', effect: 'reveal-up', stagger: 0 },
            { selector: '.section-title, .pricing-section-heading', effect: 'reveal-up', stagger: 0 },

            // Homepage
            { selector: '.services-grid .service-card', effect: 'reveal-up', stagger: 95 },
            { selector: '.home-faq-intro', effect: 'reveal-up', stagger: 0 },
            { selector: '.home-faq-list .home-faq-item', effect: 'reveal-up', stagger: 70 },
            { selector: '.google-reviews-card', effect: 'reveal-scale', stagger: 0 },

            // Gallery Page
            { selector: '.gallery-grid .gallery-card', effect: 'reveal-up', stagger: 105 },

            // Service Detail Pages (Boya Koruma, Detaylı Temizlik, PPF)
            { selector: '.service-details .detail-card', effect: 'reveal-up', stagger: 110 },
            { selector: '.video-card', effect: 'reveal-scale', stagger: 0 },
            { selector: '.ppf-intro', effect: 'reveal-up', stagger: 0 },
            { selector: '.feature-box, .comparison-box, .cta-box', effect: 'reveal-up', stagger: 90 },
            { selector: '.ppf-aside .summary-card', effect: 'reveal-up', stagger: 120 },
            { selector: '.service-actions', effect: 'reveal-up', stagger: 0 },

            // About Page (Hakkımızda)
            { selector: '.about-hero-copy, .about-hero-panel', effect: 'reveal-up', stagger: 120 },
            { selector: '.about-story', effect: 'reveal-up', stagger: 0 },
            { selector: '.values-grid .about-card', effect: 'reveal-up', stagger: 110 },
            { selector: '.about-services-grid .about-service-card', effect: 'reveal-up', stagger: 95 },
            { selector: '.about-cta', effect: 'reveal-scale', stagger: 0 },

            // Pricing Page (Fiyat Listesi)
            { selector: '.price-hero', effect: 'reveal-up', stagger: 0 },
            { selector: '.price-note-panel', effect: 'reveal-scale', stagger: 0 },
            { selector: '.price-services-grid .price-service-card', effect: 'reveal-up', stagger: 95 },
            { selector: '.pricing-steps-intro', effect: 'reveal-up', stagger: 0 },
            { selector: '.pricing-steps-grid article', effect: 'reveal-step', stagger: 130 },
            { selector: '.price-detail-grid .price-card', effect: 'reveal-scale', stagger: 0 },
            { selector: '.price-aside > *', effect: 'reveal-up', stagger: 120 },

            // Contact Page (İletişim)
            { selector: '.contact-heading', effect: 'reveal-up', stagger: 0 },
            { selector: '.contact-methods .contact-method', effect: 'reveal-up', stagger: 105 },
            { selector: '.appointment-note', effect: 'reveal-scale', stagger: 0 },

            // Products Page (Ürünler)
            { selector: '.materials-hero', effect: 'reveal-up', stagger: 0 },
            { selector: '.materials-category-nav', effect: 'reveal-up', stagger: 0 },
            { selector: '.materials-category-header', effect: 'reveal-up', stagger: 0 },
            { selector: '.materials-grid .material-card', effect: 'reveal-up', stagger: 90 },
            { selector: '.materials-cta', effect: 'reveal-scale', stagger: 0 },

            // Shared Bottom Sections
            { selector: '.faq-grid .faq-item', effect: 'reveal-up', stagger: 100 },
            { selector: '.contact-card', effect: 'reveal-scale', stagger: 0 },
            { selector: '.map-card', effect: 'reveal-scale', stagger: 0 },
            { selector: '.footer-promo-grid .promo-box', effect: 'reveal-up', stagger: 110 }
        ];

        const allTargets = [];

        revealConfigs.forEach(function (cfg) {
            const nodes = Array.from(document.querySelectorAll(cfg.selector));
            nodes.forEach(function (node, index) {
                node.classList.add('reveal-item', cfg.effect);
                if (cfg.stagger > 0) {
                    node.style.setProperty('--reveal-delay', (index * cfg.stagger) + 'ms');
                }
                allTargets.push(node);
            });
        });

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            allTargets.forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -6% 0px',
            threshold: 0.1
        });

        allTargets.forEach(function (el) {
            observer.observe(el);
        });
    }

    /**
     * Interactive cursor spotlight + 3D perspective tilt on cards (desktop fine pointer only)
     */
    function initCardSpotlightAndTilt() {
        const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!hasFinePointer) return;

        const tiltCards = document.querySelectorAll([
            '.services-section .service-card',
            '.gallery-grid .gallery-card',
            '.service-details .detail-card',
            '.video-card',
            '.feature-box',
            '.comparison-box',
            '.cta-box',
            '.summary-card',
            '.about-hero-panel',
            '.values-grid .about-card',
            '.about-services-grid .about-service-card',
            '.about-cta',
            '.price-services-grid .price-service-card',
            '.pricing-steps-grid article',
            '.price-detail-grid .price-card',
            '.price-factor-card',
            '.price-cta-card',
            '.contact-methods .contact-method',
            '.appointment-note',
            '.process-grid article',
            '.faq-item',
            '.reviews-sidecard',
            '.contact-card',
            '.footer-promo-grid .promo-box'
        ].join(', '));

        tiltCards.forEach(function (card) {
            card.classList.add('interactive-card');

            // Create spotlight overlay element
            const glow = document.createElement('span');
            glow.className = 'card-spotlight';
            glow.setAttribute('aria-hidden', 'true');
            card.appendChild(glow);

            const isLargeCard =
                card.classList.contains('video-card') ||
                card.classList.contains('comparison-box') ||
                card.classList.contains('feature-box') ||
                card.classList.contains('price-card') ||
                card.classList.contains('about-cta') ||
                card.classList.contains('contact-card');

            const maxTilt = isLargeCard ? 2.0 : 3.8;
            let rafId = null;

            card.addEventListener('pointermove', function (e) {
                if (e.pointerType && e.pointerType !== 'mouse') return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const pctX = x / rect.width;
                const pctY = y / rect.height;

                const rotateY = ((pctX - 0.5) * maxTilt * 2).toFixed(2);
                const rotateX = ((0.5 - pctY) * maxTilt * 2).toFixed(2);

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(function () {
                    card.style.setProperty('--mouse-x', x.toFixed(1) + 'px');
                    card.style.setProperty('--mouse-y', y.toFixed(1) + 'px');
                    card.style.setProperty('--rx', rotateX + 'deg');
                    card.style.setProperty('--ry', rotateY + 'deg');
                });
            });

            card.addEventListener('pointerleave', function () {
                if (rafId) cancelAnimationFrame(rafId);
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
            });
        });
    }

    /**
     * Subtle magnetic pull & shimmer position on primary CTA buttons
     */
    function initMagneticButtons() {
        const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!hasFinePointer) return;

        const buttons = document.querySelectorAll(
            '.hero-actions .btn.cta, .service-actions .btn, .about-hero-actions .btn, .about-cta .btn, .price-hero-actions .btn, .price-cta-card .btn, .contact-primary, .review-cta, .map-btn, .contact-card .btn'
        );

        buttons.forEach(function (btn) {
            btn.addEventListener('pointermove', function (e) {
                if (e.pointerType && e.pointerType !== 'mouse') return;
                const rect = btn.getBoundingClientRect();
                const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
                const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
                btn.style.setProperty('--btn-tx', offsetX.toFixed(1) + 'px');
                btn.style.setProperty('--btn-ty', offsetY.toFixed(1) + 'px');
            });

            btn.addEventListener('pointerleave', function () {
                btn.style.setProperty('--btn-tx', '0px');
                btn.style.setProperty('--btn-ty', '0px');
            });
        });
    }

    /**
     * Autoplay service card videos smoothly when in viewport and pause when off-screen
     */
    function initServiceVideos() {
        const videos = document.querySelectorAll('.service-visual video');
        if (!videos.length) return;

        if (!('IntersectionObserver' in window)) {
            videos.forEach(function (v) {
                v.muted = true;
                const p = v.play();
                if (p && typeof p.catch === 'function') p.catch(function () {});
            });
            return;
        }

        const videoObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.muted = true;
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === 'function') {
                        playPromise.catch(function () {});
                    }
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.15 });

        videos.forEach(function (v) {
            videoObserver.observe(v);
        });
    }

    /**
     * Accordion behavior for homepage FAQ (<details class="home-faq-item">):
     * opening one item closes any other open item in the list.
     */
    function initHomeFaqAccordion() {
        const faqItems = document.querySelectorAll('.home-faq-list .home-faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(function (item) {
            item.addEventListener('toggle', function () {
                if (item.open) {
                    faqItems.forEach(function (other) {
                        if (other !== item && other.open) {
                            other.open = false;
                        }
                    });
                }
            });
        });
    }

    /**
     * Graceful placeholder fallback for product images on malzemeler.html
     */
    function initMaterialImageFallbacks() {
        const visuals = document.querySelectorAll('.material-card-visual');
        if (!visuals.length) return;

        visuals.forEach(function (visual) {
            const imgs = Array.from(visual.querySelectorAll('img.material-img'));
            if (!imgs.length) {
                visual.classList.add('is-placeholder');
                return;
            }

            imgs.forEach(function (img) {
                if (!img.getAttribute('src')) {
                    visual.classList.add('is-placeholder');
                    return;
                }
                img.addEventListener('error', function () {
                    visual.classList.add('is-placeholder');
                });
                if (img.complete && img.naturalWidth === 0) {
                    visual.classList.add('is-placeholder');
                }
            });
        });
    }

    /**
     * Ensures inline controlled videos (PPF, Detaylı Temizlik, İletişim) display
     * their video cover clearly on mobile with a centered play button overlay.
     */
    function initInlineVideoPlayers() {
        const wrappers = document.querySelectorAll('.video-wrapper');
        if (!wrappers.length) return;

        wrappers.forEach(function (wrapper) {
            const video = wrapper.querySelector('video');
            if (!video) return;

            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('x5-playsinline', '');

            if (!wrapper.querySelector('.inline-video-play')) {
                const playBtn = document.createElement('button');
                playBtn.type = 'button';
                playBtn.className = 'inline-video-play';
                playBtn.setAttribute('aria-label', 'Videoyu oynat');

                const startPlay = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const p = video.play();
                    if (p && typeof p.catch === 'function') {
                        p.catch(function () {});
                    }
                };

                playBtn.addEventListener('click', startPlay);
                wrapper.appendChild(playBtn);
            }

            video.addEventListener('play', function () {
                wrapper.classList.add('is-playing');
            });

            video.addEventListener('pause', function () {
                wrapper.classList.remove('is-playing');
            });

            video.addEventListener('ended', function () {
                wrapper.classList.remove('is-playing');
            });
        });
    }

})();
