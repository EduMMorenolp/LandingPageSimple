// ./js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            sunIcon?.classList.toggle('hidden');
            moonIcon?.classList.toggle('hidden');
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    const langToggle = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = document.documentElement.lang || 'es';

    if (langText) {
        langText.textContent = currentLang.toUpperCase();
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            document.documentElement.lang = currentLang;
            if (langText) langText.textContent = currentLang.toUpperCase();
            document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: currentLang } }));
        });
    }

    const emailLink = document.querySelector('.email-link');
    const emailText = emailLink?.querySelector('.email-text');
    if (emailLink && emailText) {
        const setInitialText = () => {
            const text = window.uiStrings?.emailInitialText || 'Contacta conmigo';
            emailText.textContent = text;
        };

        setInitialText();

        emailLink.addEventListener('mouseenter', () => {
            emailText.textContent = window.uiStrings?.emailHoverText || '👉 Click aquí';
        });

        emailLink.addEventListener('mouseleave', () => {
            if (!emailLink.dataset.revealed) {
                setInitialText();
            }
        });

        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const encodedEmail = emailLink.dataset.email;
            if (!encodedEmail) return;

            const email = atob(encodedEmail);
            if (!emailLink.dataset.revealed) {
                emailText.textContent = email;
                emailLink.dataset.revealed = 'true';
            } else {
                window.location.href = 'mailto:' + email;
            }
        });
    }

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', () => {
            const encodedEmail = form.dataset.email;
            if (!encodedEmail) return;
            const email = atob(encodedEmail);
            form.action = 'https://formsubmit.co/' + email;
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .bento-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
