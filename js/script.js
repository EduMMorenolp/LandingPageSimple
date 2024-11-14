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
    const response = await fetch('../js/proyectos.json');
    const data = await response.json();
    const proyectos = data[language].proyecto;
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
    const response = await fetch('../js/proyectos.json');
    const data = await response.json();

    const proyectos = data[idioma].proyecto;

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
          <a href="${proyecto.github}" target="_blank">${proyecto.verCodigo || 'Ver Código'}</a>
          <a href="${proyecto.demo}" target="_blank">${proyecto.verDemo || 'Ver Demo'}</a>
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
  this.textContent = this.textContent.includes('Nombres') ? 'Mostrar Iconos' : 'Mostrar Nombres';
});

// Cambio de idiomas
function loadLanguage(lang) {
  fetch('../js/idiomas.json')
    .then(response => response.json())
    .then(data => {
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
    });
}