// Log inicial
console.log("Hola Mundo");

let primeraCarga = true;
let language = "es";

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Definir un valor inicial para el idioma

  const toggleLanguage = document.querySelector("#toggle-checkbox");

  toggleLanguage.addEventListener("change", () => {
    language = toggleLanguage.checked ? "en" : "es";
    loadLanguage(language);
    cargarProyectos(language);
  });

  setupNavbarLinks();
  cargarProyectos(language);
  initializeDarkModeToggle();
  setupPhotoFlip();
  setupFilterButtons();

  // Verificar la visibilidad inicial de elementos y el pie de página
  checkVisibility();
  checkPageEndVisibility();
});

// Configura los enlaces de la barra de navegación para desplazamiento suave
function setupNavbarLinks() {
  const links = document.querySelectorAll("nav a");
  const navbar = document.querySelector("nav");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (!targetId.startsWith("#")) return; // Permitir enlaces normales

      event.preventDefault();
      const targetElement = document.getElementById(targetId.substring(1));
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight + 50;
        const offset = targetElement.offsetTop - navbarHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });
}

async function filtrarProyectos(categoria) {
  try {
    // const response = await fetch('https://edummorenolp.github.io/LandingPageSimple/js/proyectos.json');
    // const data = await response.json();
    // const proyectos = data[language].proyecto;

    const proyectos = proyectosJson[language].proyecto
    const proyectosFiltrados = proyectos.filter(proyecto => {
      if (categoria === 'fullstack') {
        return proyecto.categoria.includes('frontend') || proyecto.categoria.includes('backend');
      }
      return proyecto.categoria.includes(categoria) || categoria === '';
    });
    insertProjects(proyectosFiltrados, language);
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}

// Inserta proyectos en el DOM
async function cargarProyectos(idioma = 'es') {
  try {
    const proyectos = proyectosJson[idioma].proyecto;

    insertProjects(proyectos);
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}

function insertProjects(proyectos) {
  const proyectosHTML = proyectos.map((proyecto, index) => {
    const efectoClase = primeraCarga ? (index % 2 === 0 ? 'desde-la-izquierda' : 'desde-la-derecha') : '';
    return `
      <div class="proyecto ${efectoClase}">
        <img src="${proyecto.imagen}" alt="Imagen del ${proyecto.nombre}">
        <div class="proyecto-detalles">
          <h4>${proyecto.nombre}</h4>
          <p>${proyecto.descripcion}</p>
          <div class="botones">
          <a href="${proyecto.github}" target="_blank">${proyecto.verCodigo || 'Ver Código'}</a>
          <a href="${proyecto.demo}" target="_blank">${proyecto.verDemo || 'Ver Demo'}</a>
          </div>
        </div>
        <div class="linea-separadora"></div>
        <div class="tecnologias">
          ${proyecto.tec.map(tec => `<span class="tec">${tec}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
  document.getElementById("proyecto").innerHTML = proyectosHTML;

  primeraCarga = false;

  checkVisibility();
}

function setupFilterButtons() {
  const botonesFiltrar = document.querySelectorAll(".boton-filtrar");
  botonesFiltrar.forEach(boton => {
    boton.addEventListener("click", function () {
      botonesFiltrar.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
    });
  });
}

// Comprueba si un elemento es visible en la ventana
function elementoVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

// Controla la visibilidad de los elementos de los proyectos
function checkVisibility() {
  const proyectos = document.querySelectorAll('.proyecto');
  proyectos.forEach(proyecto => {
    if (elementoVisible(proyecto)) {
      proyecto.classList.add('aparecer');
    }
  });
}

// Verifica si el usuario ha alcanzado el final de la página
function checkPageEndVisibility() {
  const footer = document.getElementById('footer');
  const alturaPagina = document.documentElement.scrollHeight;
  const alturaVentana = window.innerHeight;
  const desplazamiento = window.scrollY;

  if (desplazamiento + alturaVentana >= alturaPagina - 10) {
    footer.classList.add('slice-up');
    footer.classList.remove('hidden');
  }
}

// Configura el modo oscuro
function initializeDarkModeToggle() {
  const checkbox = document.getElementById("checkbox");
  const toggleElements = [
    document.body,
    document.querySelector("header.slice-top"),
    document.querySelector("main"),
    document.getElementById("footer"),
    document.querySelector(".checkbox-label"),
    document.getElementById("contacto")
  ];

  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    toggleElements.forEach(element => {
      element.classList.toggle("dark-mode", isChecked);
    });
  });
}

// Configura el giro automático de fotos
function setupPhotoFlip() {
  const contenedor = document.querySelector(".contenedor");
  const delantera = contenedor.querySelector(".delantera");
  const trasera = contenedor.querySelector(".trasera");

  setInterval(() => {
    delantera.style.transform = "rotateY(180deg)";
    delantera.style.visibility = "hidden";
    trasera.style.transform = "rotateY(0deg)";
    trasera.style.visibility = "visible";
    setTimeout(() => {
      delantera.style.transform = "";
      delantera.style.visibility = "";
      trasera.style.transform = "";
      trasera.style.visibility = "";
    }, 1000);
  }, 8000);
}

// Escuchar eventos de desplazamiento
window.addEventListener('scroll', checkVisibility);
window.addEventListener('scroll', checkPageEndVisibility);

// Cambio de Iconos a Texto y Viceversa
document.getElementById('toggleView').addEventListener('click', function () {
  const iconContainers = document.querySelectorAll('.icon-container');

  iconContainers.forEach(container => {
    container.classList.toggle('list-view');
  });

  // Cambiar el texto del botón
  if (language === "es") {
    this.textContent = this.textContent.includes('Nombres') ? 'Mostrar Iconos' : 'Mostrar Nombres';
  } else {
    this.textContent = this.textContent.includes('Names') ? 'Show Icons' : 'Show Names';
  }

});

// Cambio de idiomas
function loadLanguage(lang) {

  data = traducciones

  document.querySelector(".inicio").textContent = data[lang].inicio;
  document.querySelector(".habilidades").textContent = data[lang].habilidades;
  document.querySelector(".proyectos").textContent = data[lang].proyectos;
  document.querySelector(".contacto").textContent = data[lang].contacto;
  document.querySelector(".desarrollador").textContent = data[lang].desarrolladorWeb;
  document.querySelector(".presentacion-texto").innerHTML = data[lang].presentacion;
  document.querySelector(".toggle-view").textContent = data[lang].toggleView;

  document.querySelector(".herramientas h3").textContent = data[lang].herramientasTitulo;
  document.querySelector(".idiomas-titulo").textContent = data[lang].idiomasTitulo;
  document.querySelector(".idiomas-espanol").innerHTML = data[lang].idiomasEspanol;
  document.querySelector(".idiomas-ingles").innerHTML = data[lang].idiomasIngles;

  document.querySelector("#proyectos h3").textContent = data[lang].proyectosTitulo;

  document.querySelector(".boton-filtrar:nth-child(4)").textContent = data[lang].todos;
  document.querySelector(".proyectos-github").textContent = data[lang].proyectosGithub;

  document.querySelector("#contacto h4").textContent = data[lang].contactoTitulo;
  document.querySelector("label[for='name']").textContent = data[lang].formLabelName;
  document.querySelector("label[for='email']").textContent = data[lang].formLabelEmail;
  document.querySelector("label[for='message']").textContent = data[lang].formLabelMessage;
  document.querySelector("button[type='submit']").textContent = data[lang].contactoSubmit;

  document.querySelector(".contacto-info p").textContent = data[lang].contactoDesc;

  document.querySelector(".contacto-redes").textContent = data[lang].contactoRedes;

  document.querySelectorAll("#footer p")[1].textContent = data[lang].footerRights;
};


const traducciones = {
  "es": {
    "inicio": "Inicio",
    "habilidades": "Habilidades",
    "proyectos": "Proyectos",
    "contacto": "Contacto",
    "desarrolladorWeb": "Desarrollador Web",
    "presentacion": "¡Holis! <strong>Soy Eduardo Moreno</strong>, un apasionado programador con <strong>experiencia en desarrollo frontend, backend y data analyst como hobby</strong>. Mi objetivo es crear soluciones que impulsen el éxito de los proyectos en los que participo.",
    "toggleView": "Mostrar Nombres",
    "herramientasTitulo": "Herramientas",
    "idiomasTitulo": "Idiomas",
    "idiomasEspanol": "<strong>Español:</strong> Nativo",
    "idiomasIngles": "<strong>Inglés:</strong> B2",
    "proyectosTitulo": "Proyectos",
    "todos": "Mostrar Todos",
    "proyectosGithub": "Para más proyectos, visita mi ",
    "contactoTitulo": "Contacto",
    "formLabelName": "Nombre:",
    "formLabelEmail": "Correo electrónico:",
    "formLabelMessage": "Mensaje:",
    "contactoSubmit": "Enviar Correo",
    "contactoDesc": "Puedes descargar mi CV",
    "contactoRedes": "O también puedes contactarme a través de mis redes sociales:",
    "footerRights": "© Todos los derechos reservados"
  },
  "en": {
    "inicio": "Home",
    "habilidades": "Skills",
    "proyectos": "Projects",
    "contacto": "Contact",
    "desarrolladorWeb": "Web Developer",
    "presentacion": "Hi! <strong>I am Eduardo Moreno</strong>, a passionate programmer with <strong>experience in frontend, backend development, and data analysis as a hobby</strong>. My goal is to create solutions that drive the success of the projects I participate in.",
    "toggleView": "Show Names",
    "herramientasTitulo": "Tools",
    "idiomasTitulo": "Languages",
    "idiomasEspanol": "<strong>Spanish:</strong> Native",
    "idiomasIngles": "<strong>English:</strong> B2",
    "proyectosTitulo": "Projects",
    "todos": "Show All",
    "proyectosGithub": "For more projects, visit my ",
    "contactoTitulo": "Contact",
    "formLabelName": "Name:",
    "formLabelEmail": "Email:",
    "formLabelMessage": "Message:",
    "contactoSubmit": "Send Email",
    "contactoDesc": "You can download my CV",
    "contactoRedes": "Or you can also contact me through my social networks:",
    "footerRights": "© All rights reserved"
  }
}

const proyectosJson = {
  "es": {
    "proyecto": [
      {
        "nombre": "DevXp",
        "descripcion": "DevXp es una organización que fundé con el objetivo de fomentar la colaboración entre desarrolladores de distintas áreas. A través de esta plataforma, los miembros pueden aprender, trabajar en equipo y desarrollar proyectos innovadores. <strong> Me centré en crear un espacio donde la comunidad pueda crecer, compartir conocimientos y desarrollar soluciones tecnológicas de alto impacto. </strong>",
        "imagen": "./img/proyectos/8.png",
        "github": "https://github.com/orgs/Organization-DevXP/repositories",
        "demo": "https://github.com/Organization-DevXP",
        "tec": [
          "Gestión de comunidades",
          "Liderazgo en desarrollo",
          "Coordinación de equipos",
          "🧑‍🤝‍🧑 Networking y colaboración"
        ],
        "categoria": ["gestión", "colaborativo"],
        "verCodigo": "Ver Código",
        "verDemo": "Ver Demo"
      },
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
  },
  "en": {
    "proyecto": [
      {
        "nombre": "DevXp",
        "descripcion": "DevXp is an organization I founded with the goal of fostering collaboration among developers from various fields. Through this platform, members can learn, work as a team, and develop innovative projects. <strong> I focused on creating a space where the community can grow, share knowledge, and develop high-impact technological solutions. </strong>",
        "imagen": "./img/proyectos/8.png",
        "github": "https://github.com/orgs/Organization-DevXP/repositories",
        "demo": "https://github.com/Organization-DevXP",
        "tec": [
          "Community management",
          "Development leadership",
          "Team coordination",
          "🧑‍🤝‍🧑 Networking and collaboration"
        ],
        "categoria": ["management", "collaborative"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "PetShop",
        "descripcion": "This project involves the development of an online store for pet products. I worked in collaboration with a team of 4 people, where we took on specific roles and divided tasks to maximize efficiency. <strong>My contribution included both backend and frontend work</strong>, ensuring an integrated workflow and an optimal user experience.",
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
          "🧑‍🤝‍🧑 Collaborative"
        ],
        "categoria": ["frontend", "backend"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "UserFlow",
        "descripcion": "UserFlow is an API designed to manage a client CRUD, incorporating an authentication system based on API keys. Registered users can generate and use a unique API key to securely interact with the backend.",
        "imagen": "./img/proyectos/6.png",
        "github": "https://github.com/EduMMorenolp/UserFlow",
        "demo": "https://userflow-7y2o.onrender.com",
        "tec": ["Node.js", "Express", "MySQL", "Prisma", "Swagger"],
        "categoria": ["backend"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "ProJet",
        "descripcion": "This collaborative project is a comprehensive web application developed by a team of 10 people.<strong> My main contribution was in the backend</strong>, where I worked with Nodejs. The application allows for efficient management of tasks, users, projects, and more, with a dynamic frontend built with React.",
        "imagen": "./img/proyectos/5.png",
        "github": "https://github.com/EduMMorenolp/s16-09-n-node-react-Copia",
        "demo": "https://s16-09-n-node-react-1.onrender.com/",
        "tec": [
          "Node.js",
          "Express",
          "PostgreSQL",
          "TypeScript",
          "React",
          "🧑‍🤝‍🧑 Collaborative"
        ],
        "categoria": ["backend"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "Aprender a Programar",
        "descripcion": "A community project that offers detailed tutorials for various programming languages, designed to help users develop their programming skills effectively.",
        "imagen": "./img/proyectos/1.png",
        "github": "https://github.com/EduMMorenolp/Aprende-De-Programacion",
        "demo": "https://edummorenolp.github.io/Aprende-De-Programacion/",
        "tec": ["HTML", "CSS", "JavaScript"],
        "categoria": ["frontend"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "Proyecto Final Springboot",
        "descripcion": "Final project developed in collaboration with a team of 10 people, where Spring Boot and Thymeleaf were implemented.<strong> I primarily took the frontend role </strong>, contributing to the design and implementation of the user interface, while the team worked together, dividing tasks and roles to ensure the success of the project.",
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
          "🧑‍🤝‍🧑 Collaborative"
        ],
        "categoria": ["frontend"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "Proyecto Final Big Data",
        "descripcion": "Final project where various data analysis and big data tools were implemented.",
        "imagen": "./img/proyectos/4.png",
        "github": "https://deepnote.com/workspace/eduardommoreno-34ae987d-0d5e-4172-936b-60005e69667f/project/c23664-Eduardo-Moreno-TPintegrador-57a710b8-5854-4f44-a9e8-4a17d1732d80/notebook/0.%20Consignas%20%2B%20Redes%20Sociales-a13245fd02f84ed48077777de1da7da5",
        "demo": "https://www.youtube.com/embed/kyzCkpCHaGI?si=smvaN9F9Wn75VZQq",
        "tec": [
          "Python",
          "SQLite",
          "Spreadsheets",
          "Deepnote",
          "Looker",
          "Pandas",
          "Numpy",
          "Seaborn",
          "Matplotlib"
        ],
        "categoria": ["dataanalist"],
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      },
      {
        "nombre": "Stockify",
        "descripcion": "Project developed from scratch, where I implemented secure authentication with JWT and OAuth in a backend based on Node.js, Express, and Sequelize. <strong> I focused on backend architecture </strong>, ensuring a scalable and efficient design. Additionally, I collaborated with the team using GitHub Projects for task management and workflow organization.",
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
        "verCodigo": "View Code",
        "verDemo": "View Demo"
      }
    ]
  }
}
