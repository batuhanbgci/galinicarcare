document.addEventListener('DOMContentLoaded', function () {
    // 1. Yorum Verileri
    let reviews = [
        {
            name: `mehmetali can`,
            commentDate: `2025-11-08`,
            rating: 5,
            text: `Aracıma detaylı bir şekilde resterasyon yapıldı gerçekten kaliteli ve kusursuz işçilik`,
            color: `#f97316`,
            reviewImage: `img/mehmetAlican.jpeg`
        },
        {
            name: `Aras`,
            commentDate: `2025-08-08`,
            rating: 5,
            text: `BMW 3.20 konusunda uzman olarak aracımın boya korumasını yaptılar Yusuf bey'e de Furkan bey'e teşekkür ederim`,
            color: `#2563eb`,
            reviewImage: `img/ARAS.jpeg`
        },
        {
            name: `mert vurgun`,
            commentDate: `2026-01-08`,
            rating: 5,
            text: `Detaylı işçilik, mükemmel sonuç. Gönül rahatlığıyla tavsiye edilir 👍 …`,
            color: `#0f766e`,
            reviewImage: `img/mertvurgun.jpeg`
        },
        {
            name: `Mehmet Kurt`,
            commentDate: `2025-08-08`,
            rating: 5,
            text: `En kaliteli makinelerle boya koruma ve detaylı temizlik işini layıkıyla yapıyorlar. 2015 Scirocco aracımı faaliyet sonrasında 2025 model gibi parlattılar. Furkan beye teşekkür ediyorum.`,
            color: `#7c3aed`
        },
        {
            name: `İshak Şık`,
            commentDate: `2026-05-08`,
            rating: 5,
            text: `Aracıma kusursuz bir kaplama yapıldı 7 ay oldu tek bir kabarma yok teşekkür ediyorum`,
            color: `#7c3aed`
        },
        {
            name: `Efsanur Toy`,
            commentDate: `2025-08-08`,
            rating: 5,
            text: `Kaliteli ve ince işçiliklerinden dolayı teşekkür ediyorum her şey titizlikle ve üst düzey yapılıyor aracımın bakımı için tek adresim 🥰 …`,
            color: `#7c3aed`
        },
        {
            name: `Rasim Yılmaz`,
            commentDate: `2025-08-08`,
            rating: 5,
            text: `Boya korumada ve oto yıkamada Mersin'in en iyisi Furkan bey'e aracıma verdiği değer için teşekkür ediyorum.`,
            color: `#7c3aed`
        },
        {
            name: `Harun Bağcı`,
            commentDate: `2025-08-08`,
            rating: 5,
            text: `İşlerini çok iyi yapıyorlar gönül rahatlığıyla aracınızı teslim edebilirsiniz.`,
            color: `#7c3aed`
        },
        {
            name: `Selva Bal`,
            commentDate: `2025-08-08`,
            rating: 5,
            text: `İşini titizlikle yapan bir işletme, pişman olmazsınız. Aracım baştan yaratıldı diyebilirim.`,
            color: `#7c3aed`
        },
        {
            name: `Uçurtma Anaokulu`,
            commentDate: `2025-07-08`,
            rating: 5,
            text: `İşini hakkıyla ve tertemiz yapan bir işletme. Titizlikle araçlara gözbebekleri gibi bakıyorlar`,
            color: `#7c3aed`
        },
        {
            name: `Tarık Buğra Yiğiter`,
            commentDate: `2025-07-08`,
            rating: 5,
            text: `Hizmetten memnun kaldım işçilikler üst sınıf diyecek çok söz yok`,
            color: `#7c3aed`
        },
        {
            name: `Volkan Koçkar`,
            commentDate: `2025-07-08`,
            rating: 5,
            text: `Arabamı ilk halinden bile daha değerli gôsterdi. Emeklerine sağlık`,
            color: `#7c3aed`
        },
        {
            name: `Ferhatt İnan`,
            commentDate: `2026-05-08`,
            rating: 5,
            text: `Pasta cila işlemi sonrası aracın rengi resmen canlandı. Hem ilgi hem işçilik çok iyiydi, çok memnun kaldım. Teşekkür ederim 👍 …`,
            color: `#7c3aed`
        },
        {
            name: `muhammed suseven`,
            commentDate: `2026-05-08`,
            rating: 5,
            text: `Aracımı detaylı temizliğe vermiştim. Arkadaşlar işlerini gayet iyi yapıyorlar. Teşekkür ederim.`,
            color: `#7c3aed`
        },
        {
            name: `muhittin sedat kocatepe`,
            commentDate: `2026-05-08`,
            rating: 5,
            text: `Aracım için kaplama yaptırdım, işçilik gerçekten çok temiz ve özenliydi. İlgi alakaları da gayet iyiydi. Gönül rahatlığıyla tavsiye ederim, emeği geçen herkese teşekkür ederim 🙏✨ …`,
            color: `#7c3aed`,
            reviewImage: `img/muhittinSedatKocatepe.jpeg`
        },
        {
            name: `Ömer Arda Akyıldız`,
            commentDate: `2026-05-08`,
            rating: 5,
            text: `wunderbar`,
            color: `#7c3aed`
        }
    ];

    // 2. Zaman Farkını Hesaplayan Dinamik Fonksiyon
    function timeAgo(dateString) {
        if (!dateString) return 'Yeni';
        const commentDate = new Date(dateString);
        const now = new Date();
        const diffInMs = now - commentDate; 

        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInSeconds < 60) {
            return `Az önce`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} dakika önce`;
        } else if (diffInHours < 24) {
            return `${diffInHours} saat önce`;
        } else if (diffInDays < 30) {
            return `${diffInDays} gün önce`;
        } else if (diffInMonths < 12) {
            return `${diffInMonths} ay önce`;
        } else {
            return `${diffInYears} yıl önce`;
        }
    }

    const carousel = document.querySelector('#reviewsCarousel');
    const prevBtn = document.querySelector('.google-reviews-section .review-arrow.prev');
    const nextBtn = document.querySelector('.google-reviews-section .review-arrow.next');
    const REVIEWS_API_URL = window.GOOGLE_REVIEWS_API_URL || './reviews-data.json';
    let currentIndex = 0;
    let refreshTimer = null;

    function normalizeReview(item, index) {
        const defaultColors = ['#f97316', '#2563eb', '#0f766e', '#7c3aed', '#d97706'];
        const rawDate = item.commentDate || item.date || item.relative_time_description || item.time || '';
        const finalDate = (rawDate.includes('-') && rawDate.length >= 10) ? timeAgo(rawDate) : (rawDate || 'Yeni');

        return {
            name: item.name || item.author_name || item.author || `Müşteri ${index + 1}`,
            date: finalDate, 
            rating: Math.min(5, Math.max(1, Number(item.rating || item.star || 5))),
            text: item.text || item.review || 'Yorum içeriği mevcut değil.',
            color: item.color || defaultColors[index % defaultColors.length],
            avatarUrl: item.profile_photo_url || item.profile_photo || ''
        };
    }

    function buildStars(rating) {
        return Array.from({ length: 5 }, (_, index) => {
            return `<span class="star">${index < rating ? '★' : '☆'}</span>`;
        }).join('');
    }

    function createReviewCard(review, active) {
        const isLong = review.text.length > 220;
        const previewText = isLong ? review.text.slice(0, 220).trim() + '...' : review.text;
        const avatarHtml = review.avatarUrl
            ? `<img src="${review.avatarUrl}" alt="${review.name} profil fotoğrafı">`
            : `<div class="review-avatar-fallback">${review.name.charAt(0).toUpperCase()}</div>`;

        // YENİ DÜZELTME: Kart genişliğine tam oturan, ideal dengede boyut (145px)
        const imageHtml = '';

        return `
            <article class="review-card ${active ? 'active' : ''}">
                <div class="review-card-header">
                    <div class="review-avatar" style="background: ${review.color};">
                        ${avatarHtml}
                    </div>
                    <div class="review-author">
                        <strong>${review.name}</strong>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-rating">${buildStars(review.rating)}</div>
                <p class="review-text">${previewText}</p>
                ${imageHtml} ${isLong ? '<button class="review-more" type="button">Daha fazla oku</button>' : ''}
            </article>
        `;
    }

    function renderCarousel() {
        if (!carousel || !reviews.length) return;
        const start = currentIndex;
        
        const visibleReviews = [
            normalizeReview(reviews[start], start),
            normalizeReview(reviews[(start + 1) % reviews.length], (start + 1) % reviews.length),
            normalizeReview(reviews[(start + 2) % reviews.length], (start + 2) % reviews.length)
        ];

        carousel.innerHTML = visibleReviews.map((review, index) => createReviewCard(review, index === 0)).join('');
        attachReadMore();
    }

    function attachReadMore() {
        carousel.querySelectorAll('.review-more').forEach(button => {
            button.addEventListener('click', function () {
                const card = this.closest('.review-card');
                const reviewIndex = Array.from(carousel.children).indexOf(card);
                const rawReview = reviews[(currentIndex + reviewIndex) % reviews.length];
                const review = normalizeReview(rawReview, currentIndex + reviewIndex);
                const textEl = card.querySelector('.review-text');
                textEl.textContent = review.text;
                this.remove();
            });
        });
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
        renderCarousel();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % reviews.length;
        renderCarousel();
    }

    function addSwipeSupport() {
        if (!carousel) return;

        let startX = 0;
        let startY = 0;
        let lastX = 0;
        let lastY = 0;
        let isSwiping = false;
        let isHorizontalSwipe = false;

        carousel.addEventListener('touchstart', function (event) {
            if (event.touches.length !== 1 || event.target.closest('button, a')) {
                isSwiping = false;
                return;
            }

            const touch = event.touches[0];
            startX = lastX = touch.clientX;
            startY = lastY = touch.clientY;
            isSwiping = true;
            isHorizontalSwipe = false;
            clearInterval(autoRotate);
        }, { passive: true });

        carousel.addEventListener('touchmove', function (event) {
            if (!isSwiping || event.touches.length !== 1) return;

            const touch = event.touches[0];
            lastX = touch.clientX;
            lastY = touch.clientY;
            const deltaX = lastX - startX;
            const deltaY = lastY - startY;

            if (!isHorizontalSwipe && Math.abs(deltaX) > 14 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
                isHorizontalSwipe = true;
            }

            if (isHorizontalSwipe) event.preventDefault();
        }, { passive: false });

        carousel.addEventListener('touchend', function () {
            if (!isSwiping) return;

            const deltaX = lastX - startX;
            const deltaY = lastY - startY;
            isSwiping = false;

            if (Math.abs(deltaX) >= 48 && Math.abs(deltaX) >= Math.abs(deltaY) * 1.15) {
                deltaX < 0 ? showNext() : showPrev();
            }

            clearInterval(autoRotate);
            autoRotate = setInterval(showNext, 7000);
        });

        carousel.addEventListener('touchcancel', function () {
            isSwiping = false;
            clearInterval(autoRotate);
            autoRotate = setInterval(showNext, 7000);
        });
    }

    function updateReviews(newReviews) {
        if (!Array.isArray(newReviews) || !newReviews.length) return;
        reviews = newReviews; 
        currentIndex = 0;
        renderCarousel();
    }

    async function fetchReviews() {
        try {
            const response = await fetch(REVIEWS_API_URL, { cache: 'no-cache' });
            if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
            const payload = await response.json();
            updateReviews(Array.isArray(payload) ? payload : payload.reviews || []);
        } catch (error) {
            console.warn('Yorumlar API üzerinden alınamadı, yerel dizi kullanılıyor.', error);
        }
    }

    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    renderCarousel();
    fetchReviews();

    refreshTimer = setInterval(fetchReviews, 5 * 60 * 1000);

    let autoRotate = setInterval(showNext, 7000);
    addSwipeSupport();
    [prevBtn, nextBtn, carousel].forEach(item => {
        item?.addEventListener('mouseenter', () => clearInterval(autoRotate));
        item?.addEventListener('mouseleave', () => {
            clearInterval(autoRotate);
            autoRotate = setInterval(showNext, 7000);
        });
    });
});
