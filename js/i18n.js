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

  async function init(){
    const [nav, hero, experiencia, contacto, footer] = await Promise.all([
      fetchJSON('./json/nav.json'),
      fetchJSON('./json/hero.json'),
      fetchJSON('./json/experiencia.json'),
      fetchJSON('./json/contacto.json'),
      fetchJSON('./json/footer.json')
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

  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
