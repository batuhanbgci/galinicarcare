document.addEventListener('DOMContentLoaded', function () {
    const menuButtons = document.querySelectorAll('.mobile-menu-toggle');

    menuButtons.forEach(function (button) {
        const navbar = button.closest('.navbar');
        const nav = navbar ? navbar.querySelector('nav') : null;

        if (!navbar || !nav) return;

        function setMenuState(isOpen) {
            navbar.classList.toggle('nav-open', isOpen);
            button.setAttribute('aria-expanded', String(isOpen));
            button.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
        }

        button.addEventListener('click', function () {
            setMenuState(!navbar.classList.contains('nav-open'));
        });

        nav.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (!link || link.getAttribute('href') === '#') return;
            setMenuState(false);
        });

        document.addEventListener('click', function (event) {
            if (!navbar.classList.contains('nav-open') || navbar.contains(event.target)) return;
            setMenuState(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });

        const desktopQuery = window.matchMedia('(min-width: 981px)');
        const closeOnDesktop = function (event) {
            if (event.matches) {
                setMenuState(false);
            }
        };

        if (desktopQuery.addEventListener) {
            desktopQuery.addEventListener('change', closeOnDesktop);
        } else {
            desktopQuery.addListener(closeOnDesktop);
        }
    });
});
