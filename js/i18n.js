(function(){
  async function fetchJSON(path){
    try{
      const res = await fetch(path);
      if(!res.ok) throw new Error('Fetch error '+path);
      return await res.json();
    }catch(e){
      console.error('i18n load failed:', path, e);
      return null;
    }
  }

  function setText(selector, text, isHTML){
    const el = document.querySelector(selector);
    if(!el) return;
    if(isHTML) el.innerHTML = text; else el.textContent = text;
  }

  async function loadForLang(lang = 'es'){
    const [nav, hero, experiencia, contacto, footer, proyectos] = await Promise.all([
      fetchJSON(`./json/nav.${lang}.json`),
      fetchJSON(`./json/hero.${lang}.json`),
      fetchJSON(`./json/experiencia.${lang}.json`),
      fetchJSON(`./json/contacto.${lang}.json`),
      fetchJSON(`./json/footer.${lang}.json`),
      fetchJSON(`./json/proyectos.${lang}.json`)
    ]);

    // Nav
    if(nav){
      const linkMap = {
        '#habilidades': nav.habilidades,
        '#proyectos': nav.proyectos,
        '#experiencia': nav.experiencia,
        '#contacto': nav.contacto
      };
      Object.keys(linkMap).forEach(href => {
        const a = document.querySelector('nav ul li a[href="'+href+'"]');
        if(a) a.textContent = linkMap[href];
      });
    }

    // Hero
    if(hero){
      setText('.badge', hero.badge);
      setText('.hero-text h1', hero.title, true);
      setText('.hero-text > p', hero.subtitle, true);
      const primary = document.querySelector('.hero-buttons .btn-primary');
      const secondary = document.querySelector('.hero-buttons .btn-outline');
      if(primary) primary.textContent = hero.primaryBtn;
      if(secondary) secondary.textContent = hero.secondaryBtn;
    }

    // Experiencia
    if(Array.isArray(experiencia)){
      const container = document.querySelector('.experience-timeline');
      if(container){
        container.innerHTML = experiencia.map(item => {
          const tech = (item.tech||[]).map(t => `<span class=\"tech-tag\">${t}</span>`).join('');
          return `\n            <div class=\"experience-item\">\n              <div class=\"experience-date\">\n                <span class=\"date-badge\">${item.period}</span>\n              </div>\n              <div class=\"experience-content\">\n                <h3>${item.title}</h3>\n                <p class=\"company\">${item.company}</p>\n                <p class=\"description\">${item.description}</p>\n                <div class=\"tech-tags\">${tech}</div>\n              </div>\n            </div>`;
        }).join('');
      }
    }

    // Contacto
    if(contacto){
      setText('.contact-content h2', contacto.heading);
      setText('.contact-content p', contacto.subheading);
      const emailLink = document.querySelector('.email-link');
      if(emailLink) emailLink.dataset.email = contacto.emailEncoded;
      const form = document.getElementById('contact-form');
      if(form) { form.dataset.email = contacto.emailEncoded; const next = form.querySelector('input[name="_next"]'); if(next) next.value = contacto.formNext; }
    }

    // Footer
    if(footer){
      setText('footer .container p', footer.copyright);
    }

    // Proyectos
    if(proyectos){
      // proyectos is expected to be an object with "proyecto" array (we created per-lang simple files)
      window.projectsData = proyectos;
      const projectsContainer = document.getElementById('proyecto');
      if(projectsContainer && Array.isArray(proyectos.proyecto)){
        const list = proyectos.proyecto;
        projectsContainer.innerHTML = list.map(project => `\n            <div class="proyecto fade-in-up">\n                <img src="${project.imagen}" alt="${project.nombre}" loading="lazy">\n                <div class="proyecto-detalles">\n                    <h4>${project.nombre}</h4>\n                    <p>${project.descripcion}</p>\n                    <div class="tecnologias">\n                        ${project.tec.map(tech => `<span class="tec">${tech}</span>`).join('')}\n                    </div>\n                    <div class="botones">\n                        <a href="${project.github}" target="_blank" class="btn-small">${project.verCodigo}</a>\n                        <a href="${project.demo}" target="_blank" class="btn-small">${project.verDemo}</a>\n                    </div>\n                </div>\n            </div>`).join('');
      }
    }
  }

  // public loader
  window.i18nLoad = function(lang = 'es'){
    loadForLang(lang).catch(e => console.error('i18n loadForLang failed', e));
  };

  // load initial language
  const initialLang = document.documentElement.lang || 'es';
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => window.i18nLoad(initialLang)); else window.i18nLoad(initialLang);

  // listen to language change events
  document.addEventListener('i18n:change', (e) => {
    const lang = e?.detail?.lang || (document.documentElement.lang || 'es');
    window.i18nLoad(lang);
  });

})();
