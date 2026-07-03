// Phone Contact Handler - Show choice between phone call and WhatsApp
function handlePhoneContact() {
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        background: #1A1A1A;
        border: 2px solid #24CAAC;
        border-radius: 16px;
        padding: 30px;
        max-width: 400px;
        text-align: center;
        color: #fff;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;
    
    dialog.innerHTML = `
        <h3 style="margin-top: 0; color: #24CAAC; margin-bottom: 16px; font-size: 1.3rem;">İletişim Yöntemi</h3>
        <p style="color: #D1D5DB; margin-bottom: 24px; font-size: 0.95rem;">Nasıl iletişim kurmak istersiniz?</p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="btn-whatsapp" style="
                flex: 1;
                padding: 12px 20px;
                background: linear-gradient(135deg, #24CAAC, #0EA5E9);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                WhatsApp
            </button>
            <button id="btn-phone" style="
                flex: 1;
                padding: 12px 20px;
                background: linear-gradient(135deg, #0EA5E9, #24CAAC);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Telefon Ara
            </button>
        </div>
    `;
    
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    
    // Handle WhatsApp click
    document.getElementById('btn-whatsapp').addEventListener('click', function() {
        window.open('https://wa.me/905523984678?text=Merhaba, Bilgi almak istiyorum', '_blank');
        modal.remove();
    });
    
    // Handle Phone click
    document.getElementById('btn-phone').addEventListener('click', function() {
        window.location.href = 'tel:+905523984678';
        modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.parentNode) {
            modal.remove();
        }
    });
}

// Convert phone numbers to clickable links
document.addEventListener('DOMContentLoaded', function() {
    // Find all paragraphs containing "Telefon:"
    const allP = document.querySelectorAll('p');
    allP.forEach(p => {
        if (p.textContent.includes('Telefon:') && p.textContent.includes('0 (552) 398 46 78')) {
            // Replace phone number with clickable link
            p.innerHTML = p.innerHTML.replace(
                '0 (552) 398 46 78',
                '<a href="javascript:void(0);" onclick="handlePhoneContact(); return false;" style="color: #24CAAC; text-decoration: underline; cursor: pointer;">0 (552) 398 46 78</a>'
            );
        }
    });
});
