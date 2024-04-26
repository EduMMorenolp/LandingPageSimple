console.log("Hola Mundo")

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('section');

  function toggleSectionVisibility() {
      sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
              section.classList.add('visible');
          } else {
              section.classList.remove('visible');
          }
      });
  }

  // Ejecutar la función cuando se carga la página y se desplaza
  window.addEventListener('load', toggleSectionVisibility);
  window.addEventListener('scroll', toggleSectionVisibility);
});