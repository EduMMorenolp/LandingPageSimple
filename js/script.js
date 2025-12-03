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
            "badge": "Desarrollador Web Full Stack",
            "heroTitle": "Creando experiencias <br> digitales <span class=\"text-gradient\">únicas</span>",
            "heroDesc": "Hola, soy <strong>Eduardo Moreno</strong>. Transformo ideas en realidad a través de código limpio y diseño moderno.",
            "btnProyectos": "Ver Proyectos",
            "btnContacto": "Contactar",
            "habilidadesTitle": "Mis Habilidades",
            "proyectosTitle": "Proyectos Destacados",
            "contactoTitle": "¿Tienes un proyecto en mente?",
            "contactoDesc": "Hablemos sobre cómo puedo ayudarte a hacerlo realidad.",
            "labelNombre": "Nombre",
            "labelEmail": "Correo electrónico",
            "labelMensaje": "Mensaje",
            "btnEnviar": "Enviar Mensaje",
            "footer": "&copy; 2024 Eduardo M Moreno. Creado con pasión y código."
        },
        "en": {
            "inicio": "Home",
            "habilidades": "Skills",
            "proyectos": "Projects",
            "contacto": "Contact",
            "badge": "Full Stack Web Developer",
            "heroTitle": "Creating unique <br> digital <span class=\"text-gradient\">experiences</span>",
            "heroDesc": "Hi, I'm <strong>Eduardo Moreno</strong>. I transform ideas into reality through clean code and modern design.",
            "btnProyectos": "View Projects",
            "btnContacto": "Contact Me",
            "habilidadesTitle": "My Skills",
            "proyectosTitle": "Featured Projects",
            "contactoTitle": "Have a project in mind?",
            "contactoDesc": "Let's talk about how I can help you make it real.",
            "labelNombre": "Name",
            "labelEmail": "Email",
            "labelMensaje": "Message",
            "btnEnviar": "Send Message",
            "footer": "&copy; 2024 Eduardo M Moreno. Created with passion and code."
        }
    };

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        langText.textContent = currentLang.toUpperCase();
        updateLanguage(currentLang);
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

const projectsData = {
    "es": {
        "proyecto": [
            {
                "nombre": "PetShop",
                "descripcion": "Este proyecto consiste en el desarrollo de una tienda virtual de productos para mascotas. Trabajé en colaboración con un equipo de 4 personas, donde asumimos roles específicos y dividimos tareas para maximizar la eficiencia. <strong>Mi contribución incluyó trabajo tanto en el backend como en el frontend</strong>, asegurando un flujo de trabajo integrado y una experiencia de usuario óptima.",
                "imagen": "./img/proyectos/2.png",
                "github": "https://github.com/EduMMorenolp/PetShop",
                "demo": "https://edummorenolp.github.io/PetShop/",
                "tec": [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Nodejs",
                    "Express",
                    "MySQL",
                    "🧑‍🤝‍🧑 Colaborativo"
                ],
                "categoria": ["frontend", "backend"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            },
            {
                "nombre": "UserFlow",
                "descripcion": "UserFlow es una API diseñada para gestionar un CRUD de clientes, incorporando un sistema de autenticación basado en API keys. Los usuarios registrados pueden generar y utilizar una API key única para interactuar de manera segura con el backend.",
                "imagen": "./img/proyectos/6.png",
                "github": "https://github.com/EduMMorenolp/UserFlow",
                "demo": "https://userflow-7y2o.onrender.com",
                "tec": ["Node.js", "Express", "MySQL", "Prisma", "Swagger"],
                "categoria": ["backend"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            },
            {
                "nombre": "ProJet",
                "descripcion": "Este proyecto colaborativo es una aplicación web integral desarrollada por un equipo de 10 personas.<strong> Mi contribución principal fue en el backend</strong>, donde trabajé con Nodejs. La aplicación permite la gestión eficiente de tareas, usuarios, proyectos, y mucho más, con un frontend dinámico construido en React.",
                "imagen": "./img/proyectos/5.png",
                "github": "https://github.com/EduMMorenolp/s16-09-n-node-react-Copia",
                "demo": "https://s16-09-n-node-react-1.onrender.com/",
                "tec": [
                    "Node.js",
                    "Express",
                    "PostgreSQL",
                    "TypeScript",
                    "React",
                    "🧑‍🤝‍🧑 Colaborativo"
                ],
                "categoria": ["backend"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            },
            {
                "nombre": "Aprender a Programar",
                "descripcion": "Proyecto comunitario que ofrece tutoriales detallados de diversos lenguajes de programación, diseñado para ayudar a los usuarios a desarrollar sus habilidades de programación de manera efectiva.",
                "imagen": "./img/proyectos/1.png",
                "github": "https://github.com/EduMMorenolp/Aprende-De-Programacion",
                "demo": "https://edummorenolp.github.io/Aprende-De-Programacion/",
                "tec": ["HTML", "CSS", "JavaScript"],
                "categoria": ["frontend"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            },
            {
                "nombre": "Proyecto Final Springboot",
                "descripcion": "Proyecto final desarrollado en colaboración con un equipo de 10 personas, donde se implementaron Spring Boot y Thymeleaf.<strong> Asumí principalmente el rol en el frontend </strong>, contribuyendo al diseño y la implementación de la interfaz de usuario, mientras que el equipo trabajó en conjunto dividiendo las tareas y los roles para asegurar el éxito del proyecto.",
                "imagen": "./img/proyectos/3.png",
                "github": "https://github.com/EduMMorenolp/ProyectoFinal-Spring",
                "demo": "https://www.youtube.com/embed/Z70zCfUsE4s?si=1kybwL2th3agibVL",
                "tec": [
                    "Java",
                    "Springboot",
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Thymeleaf",
                    "🧑‍🤝‍🧑 Colaborativo"
                ],
                "categoria": ["frontend"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            },
            {
                "nombre": "Proyecto Final Big Data",
                "descripcion": "Proyecto final donde se implementaron diferentes instrumentos de análisis de datos y big data.",
                "imagen": "./img/proyectos/4.png",
                "github": "https://deepnote.com/workspace/eduardommoreno-34ae987d-0d5e-4172-936b-60005e69667f/project/c23664-Eduardo-Moreno-TPintegrador-57a710b8-5854-4f44-a9e8-4a17d1732d80/notebook/0.%20Consignas%20%2B%20Redes%20Sociales-a13245fd02f84ed48077777de1da7da5",
                "demo": "https://www.youtube.com/embed/kyzCkpCHaGI?si=smvaN9F9Wn75VZQq",
                "tec": [
                    "Python",
                    "SQLite",
                    "Hojas de calculo",
                    "Deepnote",
                    "Looker",
                    "Pandas",
                    "Numpy",
                    "Seaborn",
                    "Matplotlib"
                ],
                "categoria": ["dataanalist"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            },
            {
                "nombre": "Stockify",
                "descripcion": "Proyecto desarrollado desde cero, donde implementé la autenticación segura con JWT y OAuth en un backend basado en Node.js, Express y Sequelize. <strong> Me enfoqué en la arquitectura del backend </strong>, asegurando un diseño escalable y eficiente. Además, colaboré con el equipo utilizando GitHub Projects para la gestión de tareas y flujos de trabajo.",
                "imagen": "./img/proyectos/7.png",
                "github": "https://s20-05-n-webapp-backend.onrender.com/api-docs/",
                "demo": "https://stock-dep-xi.vercel.app/main",
                "tec": [
                    "Node.js",
                    "Express",
                    "Sequelize",
                    "JWT",
                    "OAuth",
                    "GitHub Projects",
                    "🧑‍🤝‍🧑 Collaborative"
                ],
                "categoria": ["backend"],
                "verCodigo": "Ver Código",
                "verDemo": "Ver Demo"
            }
        ]
    }
};

function loadProjects() {
    try {
        const projectsContainer = document.getElementById('proyecto');
        const projects = projectsData.es.proyecto; // Default to Spanish

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
                        <a href="${project.github}" target="_blank" class="btn-small">Código</a>
                        <a href="${project.demo}" target="_blank" class="btn-small">Demo</a>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
