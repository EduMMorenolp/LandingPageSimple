// Log inicial
console.log("Hola Mundo");

let primeraCarga = true;

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  setupNavbarLinks();
  insertProjects(proyectos);
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

// Información de los proyectos
const proyectos = [
  {
    "nombre": "PetShop",
    "descripcion": "Este proyecto consiste en el desarrollo de una tienda virtual de productos para mascotas. Trabajé en colaboración con un equipo de 4 personas, donde asumimos roles específicos y dividimos tareas para maximizar la eficiencia. <strong>Mi contribución incluyó trabajo tanto en el backend como en el frontend</strong>, asegurando un flujo de trabajo integrado y una experiencia de usuario óptima.",
    "imagen": "./img/proyectos/petshop.png",
    "github": "https://github.com/EduMMorenolp/PetShop",
    "demo": "https://edummorenolp.github.io/PetShop/",
    "tec": ["HTML", "CSS", "JavaScript", "Nodejs", "Express", "MySQL"],
    "categoria": ["frontend", "backend"]
  },
  {
    "nombre": "ProJet",
    "descripcion": "Este proyecto colaborativo es una aplicación web integral desarrollada por un equipo de 10 personas.<strong> Mi contribución principal fue en el backend</strong>, donde trabajé con Nodejs. La aplicación permite la gestión eficiente de tareas, usuarios, proyectos, y mucho más, con un frontend dinámico construido en React.",
    "imagen": "./img/proyectos/Projet-min.jpg",
    "github": "https://github.com/EduMMorenolp/s16-09-n-node-react-Copia",
    "demo": " https://s16-09-n-node-react-1.onrender.com/",
    "tec": ["Node.js", "Express", "PostgreSQL", "TypeScript", "React"],
    "categoria": ["backend"]
  },
  {
    "nombre": "Aprender a Programar",
    "descripcion": "Proyecto comunitario que ofrece tutoriales detallados de diversos lenguajes de programación, diseñado para ayudar a los usuarios a desarrollar sus habilidades de programación de manera efectiva.",
    "imagen": "./img/proyectos/aprendeprogramacion.png",
    "github": "https://github.com/EduMMorenolp/Aprende-De-Programacion",
    "demo": "https://edummorenolp.github.io/Aprende-De-Programacion/",
    "tec": ["HTML", "CSS", "JavaScript"],
    "categoria": ["frontend"]
  },
  {
    "nombre": "Proyecto Final Springboot",
    "descripcion": "Proyecto final desarrollado en colaboración con un equipo de 10 personas, donde se implementaron Spring Boot y Thymeleaf.<strong> Asumí principalmente el rol en el frontend </strong>, contribuyendo al diseño y la implementación de la interfaz de usuario, mientras que el equipo trabajó en conjunto dividiendo las tareas y los roles para asegurar el éxito del proyecto.",
    "imagen": "./img/proyectos/propiedadesvanguardistas.png",
    "github": "https://github.com/EduMMorenolp/ProyectoFinal-Spring",
    "demo": "https://www.youtube.com/embed/Z70zCfUsE4s?si=1kybwL2th3agibVL",
    "tec": ["Java", "Springboot", "HTML", "CSS", "JavaScript", "Thymeleaf"],
    "categoria": ["frontend", "backend"]
  },
  {
    "nombre": "Proyecto Final Big Data",
    "descripcion": "Proyecto final donde se implementaron diferentes instrumentos de análisis de datos y big data.",
    "imagen": "./img/proyectos/bigdata.png",
    "github": "https://deepnote.com/workspace/eduardommoreno-34ae987d-0d5e-4172-936b-60005e69667f/project/c23664-Eduardo-Moreno-TPintegrador-57a710b8-5854-4f44-a9e8-4a17d1732d80/notebook/0.%20Consignas%20%2B%20Redes%20Sociales-a13245fd02f84ed48077777de1da7da5",
    "demo": "https://www.youtube.com/embed/kyzCkpCHaGI?si=smvaN9F9Wn75VZQq",
    "tec": ["Python", "SQLite", "Hojas de calculo", "Deepnote", "Looker", "Pandas", "Numpy", "Seaborn", "Matplotlib"],
    "categoria": ["dataanalist"]
  }
];

function filtrarProyectos(categoria) {
  const proyectosFiltrados = proyectos.filter(proyecto => {
    if (categoria === 'fullstack') {
      return proyecto.categoria.includes('frontend') || proyecto.categoria.includes('backend');
    }
    return proyecto.categoria.includes(categoria) || categoria === '';
  });
  insertProjects(proyectosFiltrados);
}

// Inserta proyectos en el DOM
function insertProjects(proyectosParaMostrar) {
  const proyectosHTML = proyectosParaMostrar.map((proyecto, index) => {
    const efectoClase = primeraCarga ? (index % 2 === 0 ? 'desde-la-izquierda' : 'desde-la-derecha') : '';
    return `
      <div class="proyecto ${efectoClase}">
        <img src="${proyecto.imagen}" alt="Imagen del ${proyecto.nombre}">
        <div class="proyecto-detalles">
          <h4>${proyecto.nombre}</h4>
          <p>${proyecto.descripcion}</p>
          <a href="${proyecto.github}" target="_blank">Ver Codigo</a>
          <a href="${proyecto.demo}" target="_blank">Ver Demo</a>
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
