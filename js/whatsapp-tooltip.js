// Tekliflerin gönderileceği WhatsApp numarası (ülke koduyla, + ve boşluk olmadan).
const whatsappNumber = "905523984678";

document.addEventListener('DOMContentLoaded', function () {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    const tooltipDuration = 6000;
    let lastFocusedElement = null;

    if (!whatsappBtns.length) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'whatsapp-quote-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="whatsapp-quote-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsappQuoteTitle">
            <button class="whatsapp-quote-close" type="button" aria-label="Teklif formunu kapat">&times;</button>
            <div class="whatsapp-quote-heading">
                <p class="whatsapp-quote-kicker">GALINI CAR CARE</p>
                <h2 id="whatsappQuoteTitle">WhatsApp'tan Teklif Alın</h2>
                <p>Bilgilerinizi paylaşın, talebinizi WhatsApp üzerinden hazır mesaj olarak iletin.</p>
            </div>
            <form class="whatsapp-quote-form">
                <div class="whatsapp-quote-grid">
                    <label>Ad Soyad
                        <input type="text" name="fullName" autocomplete="name" required>
                    </label>
                    <label>Telefon numarası
                        <input type="tel" name="phone" autocomplete="tel" inputmode="tel" required>
                    </label>
                    <label>Araç markası
                        <input type="text" name="brand" autocomplete="off" required>
                    </label>
                    <label>Araç modeli
                        <input type="text" name="model" autocomplete="off" required>
                    </label>
                    <label>Araç yılı
                        <input type="number" name="year" inputmode="numeric" min="1900" max="2100" placeholder="Örn. 2024" required>
                    </label>
                    <label>İstenen hizmet
                        <select name="service" required>
                            <option value="" selected disabled>Hizmet seçin</option>
                            <option>PPF Kaplama</option>
                            <option>Seramik Kaplama</option>
                            <option>Detaylı Temizlik</option>
                            <option>Boya Koruma</option>
                            <option>Jant CNC & Elektrostatik Boya</option>
                            <option>Deri & Trim Yenileme</option>
                            <option>Komple Restorasyon</option>
                            <option>Diğer</option>
                        </select>
                    </label>
                </div>
                <label class="whatsapp-quote-full">Ek açıklama
                    <textarea name="notes" rows="4" placeholder="Aracınız veya talebinizle ilgili eklemek istedikleriniz"></textarea>
                </label>
                <button class="whatsapp-quote-submit" type="submit">WhatsApp'tan Gönder</button>
            </form>
        </div>`;
    document.body.appendChild(modal);

    const dialog = modal.querySelector('.whatsapp-quote-dialog');
    const form = modal.querySelector('.whatsapp-quote-form');
    const closeButton = modal.querySelector('.whatsapp-quote-close');

    function openModal(trigger) {
        lastFocusedElement = trigger;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('whatsapp-modal-open');
        window.requestAnimationFrame(() => form.elements.fullName.focus());
    }

    function closeModal() {
        if (!modal.classList.contains('is-open')) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('whatsapp-modal-open');
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    whatsappBtns.forEach(function (btn) {
        let tooltipTimeout;

        btn.addEventListener('click', function (event) {
            event.preventDefault();
            openModal(btn);
        });

        btn.classList.add('tooltip-active');
        tooltipTimeout = setTimeout(() => btn.classList.remove('tooltip-active'), tooltipDuration);

        btn.addEventListener('mouseenter', function () {
            clearTimeout(tooltipTimeout);
            btn.classList.add('tooltip-active');
            tooltipTimeout = setTimeout(() => btn.classList.remove('tooltip-active'), tooltipDuration);
        });
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('mousedown', function (event) {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (event) {
        if (!modal.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            const focusable = dialog.querySelectorAll('button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const message = [
            'Merhaba Galini Car Care, fiyat teklifi almak istiyorum.',
            '',
            '*Müşteri Bilgileri*',
            `Ad Soyad: ${data.get('fullName').trim()}`,
            `Telefon: ${data.get('phone').trim()}`,
            '',
            '*Araç Bilgileri*',
            `Marka: ${data.get('brand').trim()}`,
            `Model: ${data.get('model').trim()}`,
            `Yıl: ${data.get('year').trim()}`,
            '',
            '*Talep*',
            `İstenen Hizmet: ${data.get('service')}`,
            `Ek Açıklama: ${data.get('notes').trim() || 'Belirtilmedi'}`
        ].join('\n');

        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
});
