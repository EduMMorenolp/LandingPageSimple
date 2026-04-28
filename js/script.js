// ./js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Load Projects
    loadProjects();

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = 'es';

    const translations = {
        "es": {
            "inicio": "Inicio",
            "habilidades": "Habilidades",
            "proyectos": "Proyectos",
            "contacto": "Contacto",
            "badge": "Desarrollador Web",
            "heroTitle": "Creando experiencias <br> digitales <span class=\"text-gradient\">únicas</span>",
            "heroDesc": "Hola, soy <strong>Eduardo Moreno</strong>. Transformo ideas en realidad a través de código y diseño moderno.",
            "btnProyectos": "Ver Proyectos",
            "btnContacto": "Contactar",
            "herramientasTitulo": "Herramientas",
            "idiomasTitulo": "Idiomas",
            "habilidadesTitle": "Mis Habilidades",
            "proyectosTitle": "Proyectos Destacados",
            "contactoTitle": "¿Tienes un proyecto en mente?",
            "contactoDesc": "Hablemos sobre cómo puedo ayudarte a hacerlo realidad.",
            "labelNombre": "Nombre",
            "labelEmail": "Correo electrónico",
            "labelMensaje": "Mensaje",
            "btnEnviar": "Enviar Mensaje",
            "footer": "&copy; 2024 Eduardo M Moreno. Creado con pasión y código.",
            "idiomasTitulo": "Idiomas"
        },
        "en": {
            "inicio": "Home",
            "habilidades": "Skills",
            "proyectos": "Projects",
            "contacto": "Contact",
            "badge": "Web Developer",
            "heroTitle": "Creating unique <br> digital <span class=\"text-gradient\">experiences</span>",
            "heroDesc": "Hi, I'm <strong>Eduardo Moreno</strong>. I transform ideas into reality and modern design.",
            "btnProyectos": "View Projects",
            "btnContacto": "Contact Me",
            "herramientasTitulo": "Tools",
            "idiomasTitulo": "Languages",
            "habilidadesTitle": "My Skills",
            "proyectosTitle": "Featured Projects",
            "contactoTitle": "Have a project in mind?",
            "contactoDesc": "Let's talk about how I can help you make it real.",
            "labelNombre": "Name",
            "labelEmail": "Email",
            "labelMensaje": "Message",
            "btnEnviar": "Send Message",
            "footer": "&copy; 2024 Eduardo M Moreno. Created with passion and code.",
            "idiomasTitulo": "Languages"
        }
    };

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        langText.textContent = currentLang.toUpperCase();
        updateLanguage(currentLang);
        // notify i18n loader to fetch language-specific JSONs
        document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: currentLang } }));
    });

    function updateLanguage(lang) {
        const t = translations[lang];

        // Nav
        const navInicio = document.querySelector('a[href="#inicio"]');
        if (navInicio) navInicio.textContent = t.inicio;

        const navHabilidades = document.querySelector('a[href="#habilidades"]');
        if (navHabilidades) navHabilidades.textContent = t.habilidades;

        const navProyectos = document.querySelector('a[href="#proyectos"]');
        if (navProyectos) navProyectos.textContent = t.proyectos;

        const navContacto = document.querySelector('a[href="#contacto"]');
        if (navContacto) navContacto.textContent = t.contacto;

        // Hero
        const badge = document.querySelector('.badge');
        if (badge) badge.textContent = t.badge;

        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) heroTitle.innerHTML = t.heroTitle;

        const heroDesc = document.querySelector('.hero-text p');
        if (heroDesc) heroDesc.innerHTML = t.heroDesc;

        const btnProyectos = document.querySelector('a[href="#proyectos"].btn-primary');
        if (btnProyectos) btnProyectos.textContent = t.btnProyectos;

        const btnContacto = document.querySelector('a[href="#contacto"].btn-outline');
        if (btnContacto) btnContacto.textContent = t.btnContacto;

        // Sections
        document.querySelectorAll('.section-title').forEach(el => {
            if (el.textContent.includes('Habilidades') || el.textContent.includes('Skills')) el.textContent = t.habilidadesTitle;
            if (el.textContent.includes('Proyectos') || el.textContent.includes('Projects')) el.textContent = t.proyectosTitle;
        });

        const contactTitle = document.querySelector('.contact-content h2');
        if (contactTitle) contactTitle.textContent = t.contactoTitle;

        const contactDesc = document.querySelector('.contact-content p');
        if (contactDesc) contactDesc.textContent = t.contactoDesc;

        // Form
        const labelName = document.querySelector('label[for="name"]');
        if (labelName) labelName.textContent = t.labelNombre;

        const labelEmail = document.querySelector('label[for="email"]');
        if (labelEmail) labelEmail.textContent = t.labelEmail;

        const labelMessage = document.querySelector('label[for="message"]');
        if (labelMessage) labelMessage.textContent = t.labelMensaje;

        const btnSend = document.querySelector('.btn-full');
        if (btnSend) btnSend.textContent = t.btnEnviar;

        // Footer
        const footerText = document.querySelector('footer p');
        if (footerText) footerText.innerHTML = t.footer;

        // Skills Titles
        const toolsTitle = document.querySelector('.herramientasTitulo');
        if (toolsTitle) toolsTitle.textContent = t.herramientasTitulo;

        const langTitle = document.querySelector('.lang-card h3');
        if (langTitle) langTitle.textContent = t.idiomasTitulo;

        // Reload projects with new language
        loadProjects(lang);
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .bento-card, .project-card');

    animatedElements.forEach(el => {
        // el.style.animationPlayState = 'paused'; // Optional: pause until visible
        observer.observe(el);
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

function loadProjects(lang = 'es') {
    try {
        const projectsContainer = document.getElementById('proyecto');
        // prefer external projectsData provided by i18n.js, fallback to local projectsData
        const source = (typeof projectsData !== 'undefined') ? projectsData : (window.projectsData || null);
        const projects = source && source[lang] ? source[lang].proyecto : [];

        projectsContainer.innerHTML = projects.map(project => `
            <div class="proyecto fade-in-up">
                <img src="${project.imagen}" alt="${project.nombre}" loading="lazy">
                <div class="proyecto-detalles">
                    <h4>${project.nombre}</h4>
                    <p>${project.descripcion}</p>
                    <div class="tecnologias">
                        ${project.tec.map(tech => `<span class="tec">${tech}</span>`).join('')}
                    </div>
                    <div class="botones">
                        <a href="${project.github}" target="_blank" class="btn-small">${project.verCodigo}</a>
                        <a href="${project.demo}" target="_blank" class="btn-small">${project.verDemo}</a>
                    </div>
                </div>
            </div>
        `).join('');

        // Carousel Navigation Logic
        const prevBtn = document.getElementById('prev-project');
        const nextBtn = document.getElementById('next-project');

        if (prevBtn && nextBtn) {
            prevBtn.onclick = () => {
                projectsContainer.scrollBy({ left: -projectsContainer.clientWidth * 0.8, behavior: 'smooth' });
            };
            nextBtn.onclick = () => {
                projectsContainer.scrollBy({ left: projectsContainer.clientWidth * 0.8, behavior: 'smooth' });
            };
        }

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
