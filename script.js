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
          "nombre": "Aprender a Programar",
          "descripcion": "Proyecto para la comunidad, con tutoriales de cada lenguaje para aprender a programar.",
          "imagen": "./imag/proyectos/aprendeprogramacion.png",
          "github": "https://github.com/EduMMorenolp/Aprende-De-Programacion",
          "demo": "https://edummorenolp.github.io/Aprende-De-Programacion/"
      },
      {
          "nombre": "Proyecto Final Springboot",
          "descripcion": "Proyecto final donde se implementó Springboot y Thymeleaf para su realización, en colaboración con un equipo de 10 personas, tomando roles y dividiendo las tareas.",
          "imagen": "./imag/proyectos/propiedadesvanguardistas.png",
          "github": "https://github.com/EduMMorenolp/ProyectoFinal-Spring",
          "demo": "https://www.youtube.com/embed/Z70zCfUsE4s?si=1kybwL2th3agibVL"
      },
      {
          "nombre": "Proyecto Final Big Data",
          "descripcion": "Proyecto final donde se implementaron diferentes instrumentos de análisis de datos y big data.",
          "imagen": "./imag/proyectos/bigdata.png",
          "github": "https://deepnote.com/workspace/eduardommoreno-34ae987d-0d5e-4172-936b-60005e69667f/project/c23664-Eduardo-Moreno-TPintegrador-57a710b8-5854-4f44-a9e8-4a17d1732d80/notebook/0.%20Consignas%20%2B%20Redes%20Sociales-a13245fd02f84ed48077777de1da7da5",
          "demo": "https://www.youtube.com/embed/kyzCkpCHaGI?si=smvaN9F9Wn75VZQq"
      },
      {
          "nombre": "PetShop",
          "descripcion": "PetShop es un proyecto para una tienda virtual de productos para mascotas. En colaboración con un equipo de 4 personas, tomando roles y dividiendo las tareas.",
          "imagen": "./imag/proyectos/petshop.png",
          "github": "https://github.com/EduMMorenolp/PetShop",
          "demo": "https://edummorenolp.github.io/PetShop/"
      }
  ];

  // Función para generar dinámicamente el HTML de los proyectos
  function generarProyectos() {
    var proyectosHTML = '';
    proyectos.forEach(function (proyecto) {
      proyectosHTML += `
          <div class="proyecto">
              <img src="${proyecto.imagen}" alt="Imagen del ${proyecto.nombre}">
              <div class="proyecto-detalles">
                  <h4>${proyecto.nombre}</h4>
                  <p>${proyecto.descripcion}</p>
                  <a href="${proyecto.github}" target="_blank">Ver en GitHub</a>
                  <a href="${proyecto.demo}" target="_blank">Ver Demo</a>
              </div>
          </div>
      `;
    });
    return proyectosHTML;
  }
  // Insertar los proyectos generados en el HTML
  document.getElementById("proyecto").innerHTML = generarProyectos();
})
