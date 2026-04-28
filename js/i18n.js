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

  function setText(selector, text, isHTML = false){
    const el = document.querySelector(selector);
    if(!el) return;
    if(isHTML) el.innerHTML = text;
    else el.textContent = text;
  }

  function setAttr(selector, attr, value){
    const el = document.querySelector(selector);
    if(!el) return;
    el.setAttribute(attr, value);
  }

  function applyMeta(meta){
    if(!meta) return;
    if(meta.title) document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if(description && meta.description) description.setAttribute('content', meta.description);
  }

  function applyUI(ui){
    if(!ui) return;
    window.uiStrings = ui;

    setAttr('#menu-toggle', 'aria-label', ui.menuLabel || 'Menu');
    setAttr('#theme-toggle', 'aria-label', ui.themeLabel || 'Cambiar tema');
    setAttr('#lang-toggle', 'aria-label', ui.langLabel || 'Cambiar idioma');
    setText('.logo', ui.logoText || 'EM');
    setAttr('a[aria-label="GitHub"]', 'aria-label', ui.socialGithubLabel || 'GitHub');
    setAttr('a[aria-label="LinkedIn"]', 'aria-label', ui.socialLinkedinLabel || 'LinkedIn');
    setAttr('.profile-back img', 'alt', ui.profileRealAlt || 'Foto real');
    setAttr('.profile-front img', 'alt', ui.profileAiAlt || 'Foto IA');
    setAttr('#prev-project', 'aria-label', ui.projectPrevLabel || 'Anterior proyecto');
    setAttr('#next-project', 'aria-label', ui.projectNextLabel || 'Siguiente proyecto');
  }

  function applyNav(nav){
    if(!nav) return;
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

  function applyHero(hero){
    if(!hero) return;
    setText('.badge', hero.badge);
    setText('.hero-text h1', hero.title, true);
    setText('.hero-text > p', hero.subtitle, true);
    setText('.hero-buttons .btn-primary', hero.primaryBtn);
    setText('.hero-buttons .btn-outline', hero.secondaryBtn);
  }

  function renderSkills(skills){
    if(!skills) return;
    const section = document.querySelector('#habilidades');
    if(!section) return;

    setText('#habilidades .section-title', skills.sectionTitle);
    const grid = section.querySelector('.bento-grid');
    if(!grid) return;

    grid.innerHTML = (skills.cards || []).map((card) => {
      if(card.kind === 'tech') {
        const items = (card.items || []).map((item) => `
          <div class="tech-item ${item.tier || ''}">
            <img src="https://skillicons.dev/icons?i=${item.icon}" alt="${item.alt || item.label}" />
            <span>${item.label}</span>
          </div>`).join('');
        return `
          <div class="bento-card ${card.className || ''}">
            <h3>${card.title}</h3>
            <div class="tech-stack">${items}</div>
          </div>`;
      }

      if(card.kind === 'icons') {
        const items = (card.items || []).map((item) => `<img src="https://skillicons.dev/icons?i=${item.icon}" alt="${item.alt || item.icon}" />`).join('');
        return `
          <div class="bento-card ${card.className || ''}">
            <h3 class="herramientasTitulo">${card.title}</h3>
            <div class="tech-stack mini">${items}</div>
          </div>`;
      }

      if(card.kind === 'languages') {
        const items = (card.items || []).map((item) => `<p>${item}</p>`).join('');
        return `
          <div class="bento-card ${card.className || ''}">
            <h3>${card.title}</h3>
            ${items}
          </div>`;
      }

      return '';
    }).join('');
  }

  function applyExperience(experiencia){
    if(!Array.isArray(experiencia)) return;
    const container = document.querySelector('.experience-timeline');
    if(!container) return;

    setText('#experiencia .section-title', window.uiStrings?.experienceSectionTitle || 'Experiencia Laboral');
    container.innerHTML = experiencia.map(item => {
      const tech = (item.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('');
      return `
        <div class="experience-item">
          <div class="experience-date">
            <span class="date-badge">${item.period}</span>
          </div>
          <div class="experience-content">
            <h3>${item.title}</h3>
            <p class="company">${item.company}</p>
            <p class="description">${item.description}</p>
            <div class="tech-tags">${tech}</div>
          </div>
        </div>`;
    }).join('');
  }

  function applyContact(contact){
    if(!contact) return;
    setText('.contact-content h2', contact.heading);
    setText('.contact-content p', contact.subheading);
    setText('label[for="name"]', contact.nameLabel || 'Nombre');
    setText('label[for="email"]', contact.emailLabel || 'Correo electrónico');
    setText('label[for="message"]', contact.messageLabel || 'Mensaje');
    setText('.btn-full', contact.sendButton || 'Enviar Mensaje');
    const emailLink = document.querySelector('.email-link');
    if(emailLink) emailLink.dataset.email = contact.emailEncoded;
    const form = document.getElementById('contact-form');
    if(form){
      form.dataset.email = contact.emailEncoded;
      const next = form.querySelector('input[name="_next"]');
      if(next) next.value = contact.formNext;
    }
    const emailText = document.querySelector('.email-text');
    if(emailText && window.uiStrings?.emailInitialText) emailText.textContent = window.uiStrings.emailInitialText;
  }

  function applyFooter(footer){
    if(!footer) return;
    setText('footer .container p', footer.copyright);
  }

  function renderProjects(projects){
    if(!projects) return;
    window.projectsData = projects;
    const container = document.getElementById('proyecto');
    if(!container || !Array.isArray(projects.proyecto)) return;

    setText('#proyectos .section-title', window.uiStrings?.projectsSectionTitle || 'Proyectos Destacados');

    container.innerHTML = projects.proyecto.map(project => `
      <div class="proyecto fade-in-up">
        <img src="${project.imagen}" alt="${project.nombre}" loading="lazy">
        <div class="proyecto-detalles">
          <h4>${project.nombre}</h4>
          <p>${project.descripcion}</p>
          <div class="tecnologias">
            ${(project.tec || []).map(tech => `<span class="tec">${tech}</span>`).join('')}
          </div>
          <div class="botones">
            <a href="${project.github}" target="_blank" class="btn-small">${project.verCodigo}</a>
            <a href="${project.demo}" target="_blank" class="btn-small">${project.verDemo}</a>
          </div>
        </div>
      </div>`).join('');
  }

  async function loadForLang(lang = 'es'){
    const [meta, nav, hero, skills, experiencia, contacto, footer, proyectos, ui] = await Promise.all([
      fetchJSON(`./json/meta.${lang}.json`),
      fetchJSON(`./json/nav.${lang}.json`),
      fetchJSON(`./json/hero.${lang}.json`),
      fetchJSON(`./json/skills.${lang}.json`),
      fetchJSON(`./json/experiencia.${lang}.json`),
      fetchJSON(`./json/contacto.${lang}.json`),
      fetchJSON(`./json/footer.${lang}.json`),
      fetchJSON(`./json/proyectos.${lang}.json`),
      fetchJSON(`./json/ui.${lang}.json`)
    ]);

    applyMeta(meta);
    applyUI(ui);
    applyNav(nav);
    applyHero(hero);
    renderSkills(skills);
    applyExperience(experiencia);
    applyContact(contacto);
    applyFooter(footer);
    renderProjects(proyectos);
  }

  window.i18nLoad = function(lang = 'es'){
    loadForLang(lang).catch(e => console.error('i18n loadForLang failed', e));
  };

  const initialLang = document.documentElement.lang || 'es';
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.i18nLoad(initialLang));
  } else {
    window.i18nLoad(initialLang);
  }

  document.addEventListener('i18n:change', (e) => {
    const lang = e?.detail?.lang || document.documentElement.lang || 'es';
    window.i18nLoad(lang);
  });
})();
