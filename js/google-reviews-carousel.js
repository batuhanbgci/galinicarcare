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
    const REVIEWS_API_URL = window.location.protocol !== 'file:'
        && typeof window.GOOGLE_REVIEWS_API_URL === 'string'
        ? window.GOOGLE_REVIEWS_API_URL.trim()
        : '';
    let currentIndex = 0;

    function normalizeReview(item, index) {
        const defaultColors = ['#f97316', '#2563eb', '#0f766e', '#7c3aed', '#d97706'];
        item = item && typeof item === 'object' ? item : {};
        const rawDateValue = item.commentDate || item.date || item.relative_time_description || item.time || '';
        const rawDate = typeof rawDateValue === 'string' ? rawDateValue : '';
        const finalDate = (rawDate.includes('-') && rawDate.length >= 10) ? timeAgo(rawDate) : (rawDate || 'Yeni');
        const rawRating = Number(item.rating || item.star || 5);
        const rawAvatar = item.profile_photo_url || item.profile_photo || '';
        let avatarUrl = '';
        try {
            const parsedAvatar = new URL(rawAvatar, window.location.origin);
            if (parsedAvatar.protocol === 'https:' || parsedAvatar.origin === window.location.origin) avatarUrl = parsedAvatar.href;
        } catch (_) {}

        return {
            name: String(item.name || item.author_name || item.author || `Müşteri ${index + 1}`).slice(0, 100),
            date: finalDate, 
            rating: Number.isFinite(rawRating) ? Math.min(5, Math.max(1, rawRating)) : 5,
            text: String(item.text || item.review || 'Yorum içeriği mevcut değil.').slice(0, 5000),
            color: defaultColors[index % defaultColors.length],
            avatarUrl
        };
    }

    function createReviewCard(review, active) {
        const isLong = review.text.length > 220;
        const previewText = isLong ? review.text.slice(0, 220).trim() + '...' : review.text;
        const card = document.createElement('article');
        card.className = `review-card${active ? ' active' : ''}`;
        const header = document.createElement('div');
        header.className = 'review-card-header';
        const avatar = document.createElement('div');
        avatar.className = 'review-avatar';
        avatar.style.backgroundColor = review.color;

        function showAvatarFallback() {
            const fallback = document.createElement('div');
            fallback.className = 'review-avatar-fallback';
            fallback.textContent = review.name.charAt(0).toLocaleUpperCase('tr-TR');
            avatar.replaceChildren(fallback);
        }

        if (review.avatarUrl) {
            const image = document.createElement('img');
            image.src = review.avatarUrl;
            image.alt = `${review.name} profil fotoğrafı`;
            image.referrerPolicy = 'no-referrer';
            image.addEventListener('error', showAvatarFallback, { once: true });
            avatar.appendChild(image);
        } else {
            showAvatarFallback();
        }
        const author = document.createElement('div');
        author.className = 'review-author';
        const name = document.createElement('strong');
        name.textContent = review.name;
        const date = document.createElement('span');
        date.className = 'review-date';
        date.textContent = review.date;
        author.append(name, date);
        header.append(avatar, author);

        const rating = document.createElement('div');
        rating.className = 'review-rating';
        for (let index = 0; index < 5; index += 1) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = index < review.rating ? '★' : '☆';
            rating.appendChild(star);
        }
        const text = document.createElement('p');
        text.className = 'review-text';
        text.textContent = previewText;
        card.append(header, rating, text);
        if (isLong) {
            const more = document.createElement('button');
            more.className = 'review-more';
            more.type = 'button';
            more.textContent = 'Daha fazla oku';
            card.appendChild(more);
        }
        return card;
    }

    function renderCarousel() {
        if (!carousel || !reviews.length) return;
        const start = currentIndex;
        
        const visibleReviews = [
            normalizeReview(reviews[start], start),
            normalizeReview(reviews[(start + 1) % reviews.length], (start + 1) % reviews.length),
            normalizeReview(reviews[(start + 2) % reviews.length], (start + 2) % reviews.length)
        ];

        carousel.replaceChildren(...visibleReviews.map((review, index) => createReviewCard(review, index === 0)));
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
        if (!REVIEWS_API_URL) return;

        try {
            const response = await fetch(REVIEWS_API_URL, { cache: 'no-cache' });
            if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
            const payload = await response.json();
            const apiReviews = Array.isArray(payload) ? payload : payload?.reviews;
            if (!Array.isArray(apiReviews) || !apiReviews.length) {
                throw new Error('API response does not contain any reviews.');
            }
            updateReviews(apiReviews);
        } catch (error) {
            console.warn('Yorumlar API üzerinden alınamadı, yerel yorumlar gösteriliyor.', error);
        }
    }

    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    renderCarousel();
    if (REVIEWS_API_URL) {
        fetchReviews();
        window.setInterval(fetchReviews, 5 * 60 * 1000);
    }

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
