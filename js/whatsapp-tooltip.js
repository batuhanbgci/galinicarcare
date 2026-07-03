// WhatsApp Tooltip - Auto show for 6 seconds on page load, then show for 6 seconds on hover
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    const tooltipDuration = 6000;
    
    whatsappBtns.forEach(btn => {
        let tooltipTimeout;
        let hasInitiallyShown = false;
        
        // Auto-show tooltip for 6 seconds on page load
        function showInitialTooltip() {
            if (!hasInitiallyShown) {
                btn.classList.add('tooltip-active');
                hasInitiallyShown = true;
                
                tooltipTimeout = setTimeout(() => {
                    btn.classList.remove('tooltip-active');
                }, tooltipDuration);
            }
        }
        
        // Show tooltip on hover for 6 seconds
        btn.addEventListener('mouseenter', function() {
            // Clear previous timeout if exists
            if (tooltipTimeout) {
                clearTimeout(tooltipTimeout);
            }
            
            // Show tooltip
            this.classList.add('tooltip-active');
            
            // Hide tooltip after 6 seconds
            tooltipTimeout = setTimeout(() => {
                this.classList.remove('tooltip-active');
            }, tooltipDuration);
        });
        
        // Optional: hide tooltip on mouse leave before timeout
        btn.addEventListener('mouseleave', function() {
            // Tooltip will stay visible for full duration
        });
        
        // Trigger initial tooltip display
        showInitialTooltip();
    });
});
