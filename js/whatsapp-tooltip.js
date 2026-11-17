// Galini Mersin Asistanı — Adım adım sohbet akışlı ve geri dönüş destekli interaktif WhatsApp asistanı
const whatsappNumber = "905523984678";

document.addEventListener('DOMContentLoaded', function () {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    const tooltipDuration = 6000;
    let lastFocusedElement = null;

    if (!whatsappBtns.length) {
        return;
    }

    const categories = {
        ppf: {
            title: 'Boya Koruma Filmi',
            shortDesc: 'Taş izi, çizik ve çevresel etkilere karşı kendini onaran şeffaf film.',
            intro: 'Taş izi, çizik ve çevresel etkilere karşı kendini onaran %100 TPU şeffaf film.',
            question: 'Hangi kapsamı düşünüyorsunuz?',
            pageUrl: 'ppf-kaplama.html',
            pageLabel: 'BOYA KORUMA FİLMİ SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — kesim şablonu araca özel hazırlanır.',
            options: [
                {
                    id: 'ppf-full',
                    title: 'Tam araç',
                    subtitle: 'Gövdenin tamamı'
                },
                {
                    id: 'ppf-front',
                    title: 'Ön paket',
                    subtitle: 'Kaput, ön tampon, aynalar, farlar'
                },
                {
                    id: 'ppf-regional',
                    title: 'Bölgesel',
                    subtitle: 'Tek parça ya da lokal bölge'
                },
                {
                    id: 'ppf-matte',
                    title: 'Renk değiştiren kaplama',
                    subtitle: 'Color PPF / Saten Mat'
                }
            ]
        },
        ceramic: {
            title: 'Seramik Kaplama',
            shortDesc: 'Çok yüzeyli, su iten uzun ömürlü seramik koruma.',
            intro: 'Derin ayna parlaklığı, UV direnci ve yüksek su iticilik kazandıran nano-seramik yüzey koruması.',
            question: 'Hangi kapsamı düşünüyorsunuz?',
            pageUrl: 'boya-koruma-uygulamalari.html',
            pageLabel: 'SERAMİK KAPLAMA SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — yüzey hazırlığı ve paket araca özel planlanır.',
            options: [
                {
                    id: 'ceramic-full',
                    title: 'Komple seramik kaplama',
                    subtitle: 'Tüm gövde, polisaj hazırlığı dahil'
                },
                {
                    id: 'ceramic-new',
                    title: 'Sıfır araç koruma paketi',
                    subtitle: 'Yeni teslim alınan araçlar için koruma'
                },
                {
                    id: 'ceramic-combo',
                    title: 'Ön paket PPF + Seramik',
                    subtitle: 'Ön bölgeler film, kalan gövde seramik koruma'
                },
                {
                    id: 'ceramic-glass-rim',
                    title: 'Cam & Jant seramik koruma',
                    subtitle: 'Su kaydırıcı cam ve ısıya dayanıklı jant kaplama'
                }
            ]
        },
        polish: {
            title: 'Boya Düzeltme',
            shortDesc: 'Koruma öncesi kusursuz yüzey için profesyonel pasta/polisaj.',
            intro: 'Kılcal çizikleri, fırça izlerini ve matlaşmayı vernik kalınlığını ölçerek gideren profesyonel pasta/polisaj.',
            question: 'Aracınızın durumu için hangisi uygun?',
            pageUrl: 'boya-koruma-uygulamalari.html',
            pageLabel: 'BOYA KORUMA SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — vernik ve boya tipine göre aşama planlanır.',
            options: [
                {
                    id: 'polish-multi',
                    title: 'Çok aşamalı çizik giderme',
                    subtitle: 'Yoğun fırça ve yıkama çizikleri için pasta/polisaj'
                },
                {
                    id: 'polish-gloss',
                    title: 'Parlaklık yenileme & boya koruma',
                    subtitle: 'Hafif hare giderme ve koruyucu katman'
                },
                {
                    id: 'polish-headlight',
                    title: 'Far parlatma & PPF koruma',
                    subtitle: 'Sararan farların yenilenip filmle korunması'
                }
            ]
        },
        cleaning: {
            title: 'Detaylı Temizlik',
            shortDesc: 'Buharlı, ozonlu derinlemesine iç ve dış hijyen uygulaması.',
            intro: 'Koltuk, taban, tavan, torpido ve havalandırma kanallarında buhar ve ozonla derinlemesine arındırma.',
            question: 'Hangi uygulamayı düşünüyorsunuz?',
            pageUrl: 'detayli-temizlik.html',
            pageLabel: 'DETAYLI TEMİZLİK SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — iç mekan ve koltuk yapısına göre süre belirlenir.',
            options: [
                {
                    id: 'clean-full',
                    title: 'Komple iç & dış detaylı temizlik',
                    subtitle: 'Koltuk, tavan, taban, bagaj ve dış detay'
                },
                {
                    id: 'clean-sale',
                    title: 'Satış öncesi oto kuaför',
                    subtitle: 'Aracın değerini artıran kapsamlı yenileme'
                },
                {
                    id: 'clean-leather',
                    title: 'Deri temizliği & losyon bakımı',
                    subtitle: 'Deri koltuk arındırma ve mat koruma'
                },
                {
                    id: 'clean-ozone',
                    title: 'Motor temizliği & ozon dezenfeksiyon',
                    subtitle: 'Güvenli motor detayı ve kötü koku giderme'
                }
            ]
        },
        restoration: {
            title: 'Jant & Restorasyon',
            shortDesc: 'Jant CNC, fırın boya, deri ve trim yenileme işlemleri.',
            intro: 'Çizilmiş jantlar, yıpranan deri koltuk/direksiyon ve soyulan iç plastik aksamlar için profesyonel yenileme.',
            question: 'Hangi restorasyon işlemini düşünüyorsunuz?',
            pageUrl: 'fiyat-listesi.html',
            pageLabel: 'HİZMET & FİYAT SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — parça ve jant ebadına göre planlama yapılır.',
            options: [
                {
                    id: 'rest-rim',
                    title: 'Jant CNC & Elektrostatik Boya',
                    subtitle: 'Elmas kesim ve fırın boya ile fabrika görünümü'
                },
                {
                    id: 'rest-leather',
                    title: 'Deri koltuk & direksiyon yenileme',
                    subtitle: 'Soyulan ve yıpranan derilerin restorasyonu'
                },
                {
                    id: 'rest-trim',
                    title: 'İç trim & plastik yenileme',
                    subtitle: 'Tuş takımı ve iç aksam onarımı'
                },
                {
                    id: 'rest-full',
                    title: 'Komple restorasyon',
                    subtitle: 'Boya, far, jant ve iç mekanda kapsamlı yenileme'
                }
            ]
        },
        quote: {
            title: 'Fiyat teklifi almak istiyorum',
            shortDesc: '',
            intro: 'Her aracın ölçüsü ve boya durumu farklı olduğu için aracınıza özel net teklif hazırlıyoruz.',
            question: 'Hangi hizmet için fiyat düşünüyorsunuz?',
            pageUrl: 'fiyat-listesi.html',
            pageLabel: 'FİYAT LİSTESİ SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — aracınızın ölçüsüne göre net fiyat çıkarılır.',
            options: [
                {
                    id: 'quote-ppf',
                    title: 'Boya Koruma Filmi (PPF)',
                    subtitle: 'Tam araç veya bölgesel şeffaf koruma filmi'
                },
                {
                    id: 'quote-ceramic',
                    title: 'Seramik Kaplama & Boya Düzeltme',
                    subtitle: 'Polisaj ve nano-seramik koruma paketleri'
                },
                {
                    id: 'quote-clean',
                    title: 'Detaylı Temizlik & Restorasyon',
                    subtitle: 'İç-dış detay, jant CNC, deri ve trim yenileme'
                },
                {
                    id: 'quote-all',
                    title: 'Komple bakım & koruma paketi',
                    subtitle: 'Birden fazla işlem için toplu teklif'
                }
            ]
        },
        products: {
            title: 'Ürünler',
            shortDesc: 'Angelwax, Koch-Chemie, POLYTOP ve ADBL profesyonel bakım ürünleri.',
            intro: 'Uygulamalarımızda araç yüzeyine uyumlu Angelwax, Koch-Chemie, POLYTOP ve ADBL profesyonel bakım, temizlik ve pasta-cila ürünleri kullanıyoruz.',
            question: 'Hangi ürün grubumuz veya bakım uygulamamızla ilgileniyorsunuz?',
            pageUrl: 'malzemeler.html',
            pageLabel: 'ÜRÜNLER SAYFASI',
            vehicleHint: 'Bu bilgi teklifi hızlandırır — aracınızdaki mevcut duruma ve yüzeye göre uygun ürün ve uygulama planlanır.',
            options: [
                {
                    id: 'prod-polish',
                    title: 'Pasta & Boya Düzeltme Ürünleri',
                    subtitle: 'Angelwax (Resurrection, Regenerate, Redemption) ve Koch-Chemie (H9.02, F6.01, M3.02)'
                },
                {
                    id: 'prod-cleaning',
                    title: 'Detaylı Temizlik & Yüzey Bakım Ürünleri',
                    subtitle: 'Koch-Chemie (MZR, GS, PSS, TS, Pol Star) ve POLYTOP Polystar'
                },
                {
                    id: 'prod-wash',
                    title: 'Araç Yıkama & Aktif Köpük',
                    subtitle: 'ADBL Yeti pH nötr boya koruma uyumlu yoğun aktif köpük'
                },
                {
                    id: 'prod-ppf-care',
                    title: 'PPF & Seramik periyodik bakım',
                    subtitle: 'Profesyonel ürünlerle kaplama yüzeyi arındırma ve koruma bakımı'
                }
            ]
        },
        location: {
            title: 'Konum ve çalışma saatleri',
            shortDesc: '',
            isLocationCard: true,
            pageUrl: 'iletisim.html#konum',
            pageLabel: 'İLETİŞİM & KONUM SAYFASI',
            mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Galini%20Premium%20Car%20Care%2C%20QHX5%2B4X%20Yeni%C5%9Fehir%2C%20Mersin'
        }
    };

    const DEFAULT_PLACEHOLDER = 'İhtiyacınızı yazın... (örn. kaputta taş izi var)';
    const VEHICLE_PLACEHOLDER = 'Örn. BMW 320i 2021';

    const modal = document.createElement('div');
    modal.className = 'wa-assistant-backdrop';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="wa-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="waAssistantTitle">
            <div class="wa-assistant-header">
                <div class="wa-assistant-brand">
                    <div class="wa-assistant-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            <circle cx="9" cy="11.5" r="1" fill="currentColor" stroke="none"></circle>
                            <circle cx="12" cy="11.5" r="1" fill="currentColor" stroke="none"></circle>
                            <circle cx="15" cy="11.5" r="1" fill="currentColor" stroke="none"></circle>
                        </svg>
                    </div>
                    <div class="wa-assistant-titles">
                        <h2 id="waAssistantTitle">Galini Mersin Asistanı</h2>
                        <p>Seçin ya da yazın — çözümü birlikte bulalım</p>
                    </div>
                </div>
                <div class="wa-assistant-header-actions">
                    <button class="wa-assistant-back" type="button" aria-label="Önceki menüye dön" hidden title="Önceki menüye dön">&#8592;</button>
                    <button class="wa-assistant-close" type="button" aria-label="Asistanı kapat">&times;</button>
                </div>
            </div>

            <div class="wa-assistant-body" id="waAssistantBody" aria-live="polite"></div>

            <form class="wa-assistant-composer" autocomplete="off">
                <input
                    type="text"
                    name="customQuery"
                    class="wa-assistant-input"
                    placeholder="${DEFAULT_PLACEHOLDER}"
                    aria-label="İhtiyacınızı yazın"
                >
                <button class="wa-assistant-send" type="submit" aria-label="Gönder">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </form>

            <div class="wa-assistant-footer">
                Yanıtlar bu sitenin içeriğinden gelir. Fiyat ve süre bilgisini uzman ekibimiz verir.
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const bodyEl = modal.querySelector('#waAssistantBody');
    const backBtn = modal.querySelector('.wa-assistant-back');
    const closeBtn = modal.querySelector('.wa-assistant-close');
    const composerForm = modal.querySelector('.wa-assistant-composer');
    const composerInput = modal.querySelector('.wa-assistant-input');

    // State
    let state = {
        stage: 'home', // 'home' | 'scope' | 'vehicle' | 'ready'
        categoryKey: null,
        categoryLabel: null,
        scopeOption: null,
        vehicleText: null,
        customIssue: null
    };

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function openWhatsApp(text) {
        const cleanText = (text || 'Merhaba Galini Car Care, bilgi almak istiyorum.').trim();
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(cleanText)}`, '_blank', 'noopener,noreferrer');
    }

    function updateBackButtonVisibility() {
        backBtn.hidden = state.stage === 'home';
    }

    function scrollToLatest(element) {
        window.requestAnimationFrame(function () {
            if (element && typeof element.scrollIntoView === 'function') {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            bodyEl.scrollTop = bodyEl.scrollHeight;
        });
    }

    function clearActiveOptionGroups() {
        bodyEl.querySelectorAll('.wa-options-grid').forEach(function (grid) {
            grid.remove();
        });
    }

    function removeStepNodes(stepName) {
        bodyEl.querySelectorAll(`[data-step="${stepName}"]`).forEach(function (node) {
            node.remove();
        });
    }

    function appendUserBubble(text, stepName) {
        const bubble = document.createElement('div');
        bubble.className = 'wa-user-choice-bubble';
        if (stepName) bubble.dataset.step = stepName;
        bubble.textContent = text;
        bodyEl.appendChild(bubble);
        return bubble;
    }

    function buildWhatsAppMessage() {
        const cat = state.categoryKey ? categories[state.categoryKey] : null;
        const lines = ['Merhaba Galini Car Care, bilgi ve fiyat teklifi almak istiyorum.'];

        if (cat) {
            lines.push(`• Hizmet: ${cat.title}`);
        }
        if (state.scopeOption) {
            lines.push(`• Kapsam: ${state.scopeOption.title}`);
        }
        if (state.vehicleText) {
            lines.push(`• Araç: ${state.vehicleText}`);
        }
        if (state.customIssue) {
            lines.push(`• Not: ${state.customIssue}`);
        }
        return lines.join('\n');
    }

    function buildScopeOptionsGrid(cat) {
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'wa-options-grid one-col';
        optionsGrid.dataset.step = 'scope';
        optionsGrid.innerHTML = cat.options.map(function (opt) {
            return `
                <button type="button" class="wa-option-card full-row" data-option-id="${opt.id}">
                    <span class="wa-option-title">${escapeHtml(opt.title)}</span>
                    <span class="wa-option-desc">${escapeHtml(opt.subtitle)}</span>
                </button>
            `;
        }).join('') + `
            <button type="button" class="wa-option-card full-row wa-compact-card wa-back-card" data-action="prev-menu">
                <span class="wa-option-title">&#8592; Önceki menü</span>
            </button>
        `;
        return optionsGrid;
    }

    function buildVehicleOptionsGrid() {
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'wa-options-grid one-col';
        optionsGrid.dataset.step = 'vehicle';
        optionsGrid.innerHTML = `
            <button type="button" class="wa-option-card full-row wa-compact-card" data-action="skip-vehicle">
                <span class="wa-option-title">Şimdilik geçelim</span>
            </button>
            <button type="button" class="wa-option-card full-row wa-compact-card wa-back-card" data-action="prev-menu">
                <span class="wa-option-title">&#8592; Önceki menü</span>
            </button>
        `;
        return optionsGrid;
    }

    // STEP 1: Initial Home View
    function startConversation() {
        state = {
            stage: 'home',
            categoryKey: null,
            categoryLabel: null,
            scopeOption: null,
            vehicleText: null,
            customIssue: null
        };
        updateBackButtonVisibility();
        composerInput.placeholder = DEFAULT_PLACEHOLDER;
        composerInput.value = '';

        const cardsHtml = Object.keys(categories).map(function (key) {
            const cat = categories[key];
            const hasDesc = Boolean(cat.shortDesc);
            return `
                <button type="button" class="wa-option-card ${!hasDesc ? 'wa-title-only-card' : ''}" data-category="${key}">
                    <span class="wa-option-title">${escapeHtml(cat.title)}</span>
                    ${hasDesc ? `<span class="wa-option-desc">${escapeHtml(cat.shortDesc)}</span>` : ''}
                </button>
            `;
        }).join('');

        bodyEl.innerHTML = `
            <div class="wa-assistant-bubble" data-step="home">
                <p><strong>Merhaba! Size uygun çözümü birlikte bulalım.</strong></p>
                <p>Aşağıdan seçin ya da ihtiyacınızı kendi cümlenizle yazın.</p>
            </div>
            <div class="wa-options-grid two-col" data-step="home">
                ${cardsHtml}
            </div>
        `;
        bodyEl.scrollTop = 0;
    }

    // Special handler for "Konum ve çalışma saatleri"
    function renderLocationStep(customUserLabel) {
        const cat = categories.location;
        clearActiveOptionGroups();
        removeStepNodes('scope');
        removeStepNodes('vehicle');
        removeStepNodes('ready');

        appendUserBubble(customUserLabel || cat.title, 'scope');

        state.stage = 'scope';
        state.categoryKey = 'location';
        state.scopeOption = null;
        updateBackButtonVisibility();
        composerInput.placeholder = DEFAULT_PLACEHOLDER;

        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'wa-assistant-bubble';
        assistantMsg.dataset.step = 'scope';
        assistantMsg.innerHTML = `
            <p><strong>Galini Premium Car Care — Mersin Yenişehir</strong></p>
            <p><strong>Adres:</strong> 50. Yıl Mah., 15. Cd., 33150 Yenişehir / Mersin<br>
            <strong>Çalışma Saatleri:</strong> Pazartesi – Cumartesi, 09:00 – 19:00<br>
            <strong>Telefon:</strong> 0 (552) 398 46 78</p>
            <a class="wa-page-link" href="${escapeHtml(cat.pageUrl)}">${escapeHtml(cat.pageLabel)}</a>
        `;
        bodyEl.appendChild(assistantMsg);

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'wa-options-grid one-col';
        optionsGrid.dataset.step = 'scope';
        optionsGrid.innerHTML = `
            <button type="button" class="wa-option-card full-row is-featured" data-external-url="${escapeHtml(cat.mapsUrl)}">
                <span class="wa-option-title">Google Haritalar'da Yol Tarifi Al &#8599;</span>
                <span class="wa-option-desc">Uygulama merkezimize navigasyonu başlatın</span>
            </button>
            <button type="button" class="wa-option-card full-row is-whatsapp-cta" data-wa-text="Merhaba Galini Car Care, uygulama merkezinize gelmek için konum ve müsaitlik bilgisi almak istiyorum.">
                <span class="wa-option-title">WhatsApp'tan Randevu &amp; Konum İste &#8599;</span>
                <span class="wa-option-desc">Müsaitlik durumunu uzman ekibimize sorun</span>
            </button>
            <button type="button" class="wa-option-card full-row wa-compact-card wa-back-card" data-action="prev-menu">
                <span class="wa-option-title">&#8592; Önceki menü</span>
            </button>
        `;
        bodyEl.appendChild(optionsGrid);

        scrollToLatest(assistantMsg);
    }

    // STEP 2: Category Selected -> Ask Scope
    function selectCategory(categoryKey, customUserLabel) {
        const cat = categories[categoryKey];
        if (!cat) return;

        if (cat.isLocationCard) {
            renderLocationStep(customUserLabel);
            return;
        }

        clearActiveOptionGroups();
        removeStepNodes('scope');
        removeStepNodes('vehicle');
        removeStepNodes('ready');

        const label = customUserLabel || cat.title;
        appendUserBubble(label, 'scope');

        state.stage = 'scope';
        state.categoryKey = categoryKey;
        state.categoryLabel = label;
        state.scopeOption = null;
        state.vehicleText = null;
        updateBackButtonVisibility();
        composerInput.placeholder = DEFAULT_PLACEHOLDER;

        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'wa-assistant-bubble';
        assistantMsg.dataset.step = 'scope';
        assistantMsg.innerHTML = `
            <p><strong>${escapeHtml(cat.intro)}</strong></p>
            <p><strong>${escapeHtml(cat.question)}</strong></p>
            <a class="wa-page-link" href="${escapeHtml(cat.pageUrl)}">${escapeHtml(cat.pageLabel)}</a>
        `;
        bodyEl.appendChild(assistantMsg);

        const optionsGrid = buildScopeOptionsGrid(cat);
        bodyEl.appendChild(optionsGrid);

        scrollToLatest(assistantMsg);
    }

    // STEP 3: Scope Selected -> Ask Vehicle Brand/Model/Year + "Şimdilik geçelim"
    function selectScope(optionId) {
        const cat = categories[state.categoryKey];
        if (!cat || !cat.options) return;

        const opt = cat.options.find(function (o) { return o.id === optionId; }) || cat.options[0];
        clearActiveOptionGroups();
        removeStepNodes('vehicle');
        removeStepNodes('ready');

        appendUserBubble(opt.title, 'vehicle');

        state.stage = 'vehicle';
        state.scopeOption = opt;
        state.vehicleText = null;
        updateBackButtonVisibility();
        composerInput.placeholder = VEHICLE_PLACEHOLDER;

        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'wa-assistant-bubble';
        assistantMsg.dataset.step = 'vehicle';
        assistantMsg.innerHTML = `
            <p><strong>Aracınızın marka, model ve yılını yazar mısınız?</strong></p>
            <p><strong>${escapeHtml(cat.vehicleHint)}</strong></p>
        `;
        bodyEl.appendChild(assistantMsg);

        const optionsGrid = buildVehicleOptionsGrid();
        bodyEl.appendChild(optionsGrid);

        scrollToLatest(assistantMsg);
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            window.requestAnimationFrame(function () {
                composerInput.focus();
            });
        }
    }

    // STEP 4: Vehicle Provided or Skipped -> Show Ready Summary & WhatsApp Action
    function finishFlow(vehicleInput, skipped) {
        clearActiveOptionGroups();
        removeStepNodes('ready');

        appendUserBubble(skipped ? 'Şimdilik geçelim' : vehicleInput, 'ready');

        state.stage = 'ready';
        state.vehicleText = skipped ? null : vehicleInput;
        updateBackButtonVisibility();
        composerInput.placeholder = DEFAULT_PLACEHOLDER;

        const cat = state.categoryKey ? categories[state.categoryKey] : null;
        const summaryParts = [];
        if (cat) summaryParts.push(cat.title);
        if (state.scopeOption) summaryParts.push(state.scopeOption.title);
        if (state.vehicleText) summaryParts.push(state.vehicleText);

        const waMessage = buildWhatsAppMessage();

        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'wa-assistant-bubble';
        assistantMsg.dataset.step = 'ready';
        assistantMsg.innerHTML = `
            <span class="wa-selected-badge">${escapeHtml(summaryParts.join(' • ') || 'Galini Çözüm Özeti')}</span>
            <p><strong>Harika! Seçiminize göre WhatsApp mesajınızı hazırladık.</strong></p>
            <p>Fiyat ve randevu bilgisi için aşağıdan doğrudan uzmanımıza bağlanabilir veya önceki menüye dönebilirsiniz.</p>
            ${cat ? `<a class="wa-page-link" href="${escapeHtml(cat.pageUrl)}">${escapeHtml(cat.pageLabel)}</a>` : ''}
        `;
        bodyEl.appendChild(assistantMsg);

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'wa-options-grid one-col';
        optionsGrid.dataset.step = 'ready';
        optionsGrid.innerHTML = `
            <button type="button" class="wa-option-card full-row is-whatsapp-cta" data-wa-text="${escapeHtml(waMessage)}">
                <span class="wa-option-title">WhatsApp'tan Fiyat &amp; Bilgi Al &#8599;</span>
                <span class="wa-option-desc">Hazır mesajınızla hemen görüşmeyi başlatın</span>
            </button>
            <button type="button" class="wa-option-card full-row wa-compact-card wa-back-card" data-action="prev-menu">
                <span class="wa-option-title">&#8592; Önceki menü</span>
            </button>
            <button type="button" class="wa-option-card full-row wa-compact-card" data-action="restart">
                <span class="wa-option-title">Baştan başla</span>
            </button>
        `;
        bodyEl.appendChild(optionsGrid);

        scrollToLatest(assistantMsg);
    }

    // Go back one step in the conversation
    function goBackOneStep() {
        if (state.stage === 'ready') {
            removeStepNodes('ready');
            clearActiveOptionGroups();
            state.stage = 'vehicle';
            state.vehicleText = null;
            updateBackButtonVisibility();
            composerInput.placeholder = VEHICLE_PLACEHOLDER;

            const vehicleGrid = buildVehicleOptionsGrid();
            bodyEl.appendChild(vehicleGrid);
            scrollToLatest(vehicleGrid);
            return;
        }

        if (state.stage === 'vehicle' && state.categoryKey) {
            removeStepNodes('vehicle');
            removeStepNodes('ready');
            clearActiveOptionGroups();
            state.stage = 'scope';
            state.scopeOption = null;
            updateBackButtonVisibility();
            composerInput.placeholder = DEFAULT_PLACEHOLDER;

            const cat = categories[state.categoryKey];
            if (cat && cat.options) {
                const scopeGrid = buildScopeOptionsGrid(cat);
                bodyEl.appendChild(scopeGrid);
                scrollToLatest(scopeGrid);
            } else {
                startConversation();
            }
            return;
        }

        startConversation();
    }

    function detectCategoryKeyFromText(query) {
        const q = query.toLocaleLowerCase('tr-TR');
        if (q.includes('konum') || q.includes('adres') || q.includes('nerede') || q.includes('saat') || q.includes('açık') || q.includes('harita') || q.includes('yol tarifi')) {
            return 'location';
        }
        if (
            q.includes('ürün') || q.includes('urun') || q.includes('malzeme') ||
            q.includes('angelwax') || q.includes('koch') || q.includes('polytop') ||
            q.includes('polystar') || q.includes('adbl') || q.includes('yeti') ||
            q.includes('green star') || q.includes('plast star') || q.includes('top star') ||
            q.includes('pol star') || q.includes('mzr') || q.includes('periyodik') || q.includes('ekran')
        ) {
            return 'products';
        }
        if (q.includes('ppf') || q.includes('taş') || q.includes('tas') || q.includes('kaput') || q.includes('film') || q.includes('şeffaf') || q.includes('tpu') || q.includes('tampon')) {
            return 'ppf';
        }
        if (q.includes('seramik') || q.includes('parlak') || q.includes('su itici') || q.includes('hidrofobik')) {
            return 'ceramic';
        }
        if (q.includes('temiz') || q.includes('koltuk') || q.includes('detay') || q.includes('kuaför') || q.includes('koku') || q.includes('ozon') || q.includes('tavan') || q.includes('motor')) {
            return 'cleaning';
        }
        if (q.includes('çizik') || q.includes('cizik') || q.includes('pasta') || q.includes('polisaj') || q.includes('hare') || q.includes('far')) {
            return 'polish';
        }
        if (q.includes('jant') || q.includes('cnc') || q.includes('deri') || q.includes('direksiyon') || q.includes('trim') || q.includes('restorasyon')) {
            return 'restoration';
        }
        return 'quote';
    }

    function openModal(trigger) {
        lastFocusedElement = trigger;
        if (!bodyEl.children.length) {
            startConversation();
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('whatsapp-modal-open');
        document.body.classList.add('whatsapp-modal-open');
        whatsappBtns.forEach(function (btn) {
            btn.classList.add('assistant-open');
            btn.classList.remove('tooltip-active');
        });
    }

    function closeModal() {
        if (!modal.classList.contains('is-open')) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('whatsapp-modal-open');
        document.body.classList.remove('whatsapp-modal-open');
        if (document.activeElement === composerInput) {
            composerInput.blur();
        }
        whatsappBtns.forEach(function (btn) {
            btn.classList.remove('assistant-open');
        });
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    function toggleModal(trigger) {
        if (modal.classList.contains('is-open')) {
            closeModal();
        } else {
            openModal(trigger);
        }
    }

    whatsappBtns.forEach(function (btn) {
        let tooltipTimeout;

        btn.addEventListener('click', function (event) {
            event.preventDefault();
            toggleModal(btn);
        });

        btn.classList.add('tooltip-active');
        tooltipTimeout = setTimeout(function () {
            btn.classList.remove('tooltip-active');
        }, tooltipDuration);

        btn.addEventListener('mouseenter', function () {
            if (modal.classList.contains('is-open')) return;
            clearTimeout(tooltipTimeout);
            btn.classList.add('tooltip-active');
            tooltipTimeout = setTimeout(function () {
                btn.classList.remove('tooltip-active');
            }, tooltipDuration);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backBtn.addEventListener('click', goBackOneStep);

    bodyEl.addEventListener('click', function (event) {
        const card = event.target.closest('.wa-option-card');
        if (!card) return;

        if (card.dataset.externalUrl) {
            window.open(card.dataset.externalUrl, '_blank', 'noopener,noreferrer');
            return;
        }

        if (card.dataset.waText) {
            openWhatsApp(card.dataset.waText);
            return;
        }

        if (card.dataset.action === 'prev-menu') {
            goBackOneStep();
            return;
        }

        if (card.dataset.action === 'skip-vehicle') {
            finishFlow('', true);
            return;
        }

        if (card.dataset.action === 'restart') {
            startConversation();
            return;
        }

        if (card.dataset.category) {
            selectCategory(card.dataset.category);
            return;
        }

        if (card.dataset.optionId) {
            selectScope(card.dataset.optionId);
        }
    });

    composerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const val = composerInput.value.trim();
        if (!val) {
            composerInput.focus();
            return;
        }
        composerInput.value = '';

        if (state.stage === 'vehicle') {
            finishFlow(val, false);
            return;
        }

        state.customIssue = val;
        const detectedCatKey = detectCategoryKeyFromText(val);
        selectCategory(detectedCatKey, val);
    });

    let touchStartY = 0;

    modal.addEventListener('touchstart', function (event) {
        if (event.touches.length === 1) {
            touchStartY = event.touches[0].clientY;
        }
    }, { passive: true });

    modal.addEventListener('touchmove', function (event) {
        if (!modal.classList.contains('is-open') || event.touches.length !== 1) return;

        const targetInBody = event.target instanceof Element && bodyEl.contains(event.target);
        if (!targetInBody) {
            if (event.cancelable) event.preventDefault();
            return;
        }

        const currentY = event.touches[0].clientY;
        const deltaY = currentY - touchStartY;
        const scrollTop = bodyEl.scrollTop;
        const maxScroll = bodyEl.scrollHeight - bodyEl.clientHeight;

        if (maxScroll <= 0) {
            if (event.cancelable) event.preventDefault();
            return;
        }

        if ((scrollTop <= 0 && deltaY > 0) || (scrollTop >= maxScroll - 1 && deltaY < 0)) {
            if (event.cancelable) event.preventDefault();
        }
    }, { passive: false });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (!modal.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
