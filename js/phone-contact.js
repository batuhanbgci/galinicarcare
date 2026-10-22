// Telefon ve WhatsApp seçeneklerini güvenli DOM API'leriyle gösterir.
function handlePhoneContact() {
    const modal = document.createElement('div');
    modal.className = 'phone-contact-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:10000;padding:16px;';

    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'phoneContactTitle');
    dialog.style.cssText = 'background:#1A1A1A;border:2px solid #24CAAC;border-radius:16px;padding:30px;max-width:400px;text-align:center;color:#fff;box-shadow:0 10px 40px rgba(0,0,0,.5);';

    const title = document.createElement('h3');
    title.id = 'phoneContactTitle';
    title.textContent = 'İletişim Yöntemi';
    title.style.cssText = 'margin:0 0 16px;color:#24CAAC;font-size:1.3rem;';
    const prompt = document.createElement('p');
    prompt.textContent = 'Nasıl iletişim kurmak istersiniz?';
    prompt.style.cssText = 'color:#D1D5DB;margin:0 0 24px;font-size:.95rem;';
    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:12px;justify-content:center;';

    function makeButton(label, colors) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.style.cssText = `flex:1;padding:12px 20px;background:linear-gradient(135deg,${colors});color:white;border:0;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer;`;
        return button;
    }

    const whatsappButton = makeButton('WhatsApp', '#24CAAC,#0EA5E9');
    const phoneButton = makeButton('Telefon Ara', '#0EA5E9,#24CAAC');
    function closeModal() {
        modal.remove();
        document.removeEventListener('keydown', closeOnEscape);
    }

    whatsappButton.addEventListener('click', function () {
        window.open('https://wa.me/905523984678?text=Merhaba%2C%20bilgi%20almak%20istiyorum', '_blank', 'noopener,noreferrer');
        closeModal();
    });
    phoneButton.addEventListener('click', function () {
        window.location.href = 'tel:+905523984678';
        closeModal();
    });

    actions.append(whatsappButton, phoneButton);
    dialog.append(title, prompt, actions);
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    whatsappButton.focus();

    function closeOnEscape(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
    document.addEventListener('keydown', closeOnEscape);
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('p').forEach(function (paragraph) {
        if (!paragraph.textContent.includes('Telefon:') || !paragraph.textContent.includes('0 (552) 398 46 78')) return;

        const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
        let textNode;
        while ((textNode = walker.nextNode())) {
            const marker = '0 (552) 398 46 78';
            const index = textNode.nodeValue.indexOf(marker);
            if (index < 0) continue;

            const before = textNode.nodeValue.slice(0, index);
            const after = textNode.nodeValue.slice(index + marker.length);
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = marker;
            button.style.cssText = 'color:#24CAAC;text-decoration:underline;cursor:pointer;background:none;border:0;padding:0;font:inherit;';
            button.addEventListener('click', handlePhoneContact);
            const replacement = document.createDocumentFragment();
            if (before) replacement.append(document.createTextNode(before));
            replacement.append(button);
            if (after) replacement.append(document.createTextNode(after));
            textNode.parentNode.replaceChild(replacement, textNode);
            break;
        }
    });
});
