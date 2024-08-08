console.log("Hola Mundo")

// Navbar
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("nav a");
  var navbar = document.querySelector("nav");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      var targetElement;
      if (targetId.startsWith("#")) {
        event.preventDefault(); // Evitar que se ejecute la acción predeterminada del enlace
        targetElement = document.getElementById(targetId.substring(1));
      } else {
        // Si el href no comienza con '#', abre el enlace normalmente
        return;
      }
      if (targetElement) {
        var navbarHeight = navbar.offsetHeight + 50;
        var offset = targetElement.offsetTop - navbarHeight;
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Objeto que contiene la información de los proyectos
  var proyectos = [
    {
      "nombre": "PetShop",
      "descripcion": "Este proyecto consiste en el desarrollo de una tienda virtual de productos para mascotas. Trabajé en colaboración con un equipo de 4 personas, donde asumimos roles específicos y dividimos tareas para maximizar la eficiencia. Mi contribución incluyó trabajo tanto en el backend como en el frontend, asegurando un flujo de trabajo integrado y una experiencia de usuario óptima.",
      "imagen": "./imag/proyectos/petshop.png",
      "github": "https://github.com/EduMMorenolp/PetShop",
      "demo": "https://edummorenolp.github.io/PetShop/",
      "tec": ["HTML", "CSS", "JavaScript", "Nodejs", "Express", "MySQL"]
    },
    {
      "nombre": "ProJet",
      "descripcion": "Este proyecto colaborativo es una aplicación web integral desarrollada por un equipo de 10 personas. Mi contribución principal fue en el backend, donde trabajé con Nodejs. La aplicación permite la gestión eficiente de tareas, usuarios, proyectos, y mucho más, con un frontend dinámico construido en React.",
      "imagen": "./imag/proyectos/Projet-min.jpg",
      "github": "https://github.com/EduMMorenolp/s16-09-n-node-react-Copia",
      "demo": " https://s16-09-n-node-react-1.onrender.com/",
      "tec": ["Node.js", "Express", "PostgreSQL", "TypeScript", "React"]
    },
    {
      "nombre": "Aprender a Programar",
      "descripcion": "Proyecto comunitario que ofrece tutoriales detallados de diversos lenguajes de programación, diseñado para ayudar a los usuarios a desarrollar sus habilidades de programación de manera efectiva.",
      "imagen": "./imag/proyectos/aprendeprogramacion.png",
      "github": "https://github.com/EduMMorenolp/Aprende-De-Programacion",
      "demo": "https://edummorenolp.github.io/Aprende-De-Programacion/",
      "tec": ["HTML", "CSS", "JavaScript"]

    },
    {
      "nombre": "Proyecto Final Springboot",
      "descripcion": "Proyecto final desarrollado en colaboración con un equipo de 10 personas, donde se implementaron Spring Boot y Thymeleaf. Asumí principalmente el rol en el frontend, contribuyendo al diseño y la implementación de la interfaz de usuario, mientras que el equipo trabajó en conjunto dividiendo las tareas y los roles para asegurar el éxito del proyecto.",
      "imagen": "./imag/proyectos/propiedadesvanguardistas.png",
      "github": "https://github.com/EduMMorenolp/ProyectoFinal-Spring",
      "demo": "https://www.youtube.com/embed/Z70zCfUsE4s?si=1kybwL2th3agibVL",
      "tec": ["Java", "Springboot", "HTML", "CSS", "JavaScript", "Thymeleaf"]
    },
    {
      "nombre": "Proyecto Final Big Data",
      "descripcion": "Proyecto final donde se implementaron diferentes instrumentos de análisis de datos y big data.",
      "imagen": "./imag/proyectos/bigdata.png",
      "github": "https://deepnote.com/workspace/eduardommoreno-34ae987d-0d5e-4172-936b-60005e69667f/project/c23664-Eduardo-Moreno-TPintegrador-57a710b8-5854-4f44-a9e8-4a17d1732d80/notebook/0.%20Consignas%20%2B%20Redes%20Sociales-a13245fd02f84ed48077777de1da7da5",
      "demo": "https://www.youtube.com/embed/kyzCkpCHaGI?si=smvaN9F9Wn75VZQq",
      "tec": ["Python", "SQLite", "Hojas de calculo", "Deepnote", "Looker", "Pandas", "Numpy", "Seaborn", "Matplotlib"]
    }
  ];

  // Función para generar dinámicamente el HTML de los proyectos
  function generarProyectos() {
    var proyectosHTML = '';
    proyectos.forEach(function (proyecto, index) {
      var efectoClase = index % 2 === 0 ? 'desde-la-izquierda' : 'desde-la-derecha';

      proyectosHTML += `
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
    });
    return proyectosHTML;
  }
  // Insertar los proyectos generados en el HTML
  document.getElementById("proyecto").innerHTML = generarProyectos();
})

// Función para verificar si un elemento está visible en la ventana
function elementoVisible(el) {
  var rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

// Función para manejar el evento de desplazamiento
function checkVisibility() {
  var proyectos = document.querySelectorAll('.proyecto');
  proyectos.forEach(function (proyecto) {
    if (elementoVisible(proyecto)) {
      proyecto.classList.add('aparecer');
    }
  });
}

// Agrega el evento de desplazamiento
window.addEventListener('scroll', checkVisibility);

// Ejecuta la función una vez para ver si algún proyecto ya es visible
checkVisibility();

function verificarFinDePagina() {
  var footer = document.getElementById('footer');
  var alturaPagina = document.documentElement.scrollHeight;
  var alturaVentana = window.innerHeight;
  var desplazamiento = window.scrollY;

  if (desplazamiento + alturaVentana >= alturaPagina - 10) {
    footer.classList.add('slice-up');
    footer.classList.remove('hidden');
  }
}

// Ejecuta la función al hacer scroll
window.addEventListener('scroll', verificarFinDePagina);

// Ejecuta la función al cargar la página en caso de que ya esté en el final
document.addEventListener('DOMContentLoaded', verificarFinDePagina);


/* Dark Mode */

const checkbox = document.getElementById("checkbox")
const body = document.body;
const header = document.querySelector("header.slice-top");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const checkboxLabel = document.querySelector(".checkbox-label");
const contacto = document.getElementById("contacto");

checkbox.addEventListener("change", () => {
  const isChecked = checkbox.checked;

  body.classList.toggle("dark-mode", isChecked);
  header.classList.toggle("dark-mode", isChecked);
  main.classList.toggle("dark-mode", isChecked);
  footer.classList.toggle("dark-mode", isChecked);
  checkboxLabel.classList.toggle("dark-mode", isChecked);
  contacto.classList.toggle("dark-mode", isChecked);

  console.log(contacto)
})

// Giro de foto Automatico
document.addEventListener("DOMContentLoaded", function () {
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

});