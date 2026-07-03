// Smooth navigation for single-page app
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-anchor');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an anchor link, prevent default and scroll smoothly
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll to target with offset for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(href);
                }
            }
        });
    });
    
    // Update active link on page scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLinkOnScroll();
    });
    
    // Initial active link update
    updateActiveNavLinkOnScroll();
});

function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav-anchor');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    let currentSection = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active link
    const navLinks = document.querySelectorAll('.nav-anchor');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}
