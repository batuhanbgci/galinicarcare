document.addEventListener('DOMContentLoaded', function () {
    const menuButtons = document.querySelectorAll('.mobile-menu-toggle');

    menuButtons.forEach(function (button) {
        const navbar = button.closest('.navbar');
        const nav = navbar ? navbar.querySelector('nav') : null;

        if (!navbar || !nav) return;

        const desktopQuery = window.matchMedia('(min-width: 981px)');
        const dropdowns = Array.from(nav.querySelectorAll('.dropdown'));

        function setDropdownState(dropdown, isOpen) {
            const trigger = dropdown.querySelector(':scope > a');
            dropdown.classList.toggle('submenu-open', isOpen);

            if (trigger) {
                trigger.setAttribute('aria-expanded', String(isOpen));
            }
        }

        function closeDropdowns(exceptDropdown) {
            dropdowns.forEach(function (dropdown) {
                if (dropdown !== exceptDropdown) {
                    setDropdownState(dropdown, false);
                }
            });
        }

        dropdowns.forEach(function (dropdown, index) {
            const trigger = dropdown.querySelector(':scope > a');
            const menu = dropdown.querySelector(':scope > .dropdown-menu');

            if (!trigger || !menu) return;

            if (!menu.id) {
                menu.id = `submenu-${index + 1}`;
            }

            trigger.textContent = trigger.textContent.replace(/[▼▲]/g, '').trim();
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-haspopup', 'true');
            trigger.setAttribute('aria-controls', menu.id);
            trigger.setAttribute('aria-expanded', 'false');

            trigger.addEventListener('click', function (event) {
                event.preventDefault();

                const willOpen = !dropdown.classList.contains('submenu-open');
                closeDropdowns(dropdown);
                setDropdownState(dropdown, willOpen);
            });
        });

        function setMenuState(isOpen) {
            navbar.classList.toggle('nav-open', isOpen);
            button.setAttribute('aria-expanded', String(isOpen));
            button.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');

            if (!isOpen) {
                closeDropdowns();
            }
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
