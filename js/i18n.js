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

    const slidesHTML = projects.proyecto.map(project => `
      <div class="proyecto ${project.imagen ? '' : 'proyecto-no-img'}">
        ${project.imagen ? `<img src="${project.imagen}" alt="${project.nombre}" loading="lazy">` : ''}
        <div class="proyecto-detalles">
          <h4>${project.nombre}</h4>
          ${project.status === 'en-desarrollo' ? `<span class="status-badge">${window.uiStrings?.statusEnDesarrollo || 'En desarrollo'}</span>` : ''}
          ${project.status === 'continua-mejora' ? `<span class="status-badge status-continua">${window.uiStrings?.statusContinuaMejora || 'Continua mejora'}</span>` : ''}
          <p>${project.descripcion}</p>
          <div class="tecnologias">
            ${(project.tec || []).map(tech => `<span class="tec">${tech}</span>`).join('')}
          </div>
          <div class="botones">
            <a href="${project.github}" target="_blank" class="btn-small btn-code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              ${project.verCodigo}
            </a>
            ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn-small btn-demo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              ${project.verDemo}
            </a>` : ''}
          </div>
        </div>
      </div>`).join('');

    container.innerHTML = `
      <div class="carousel-track">
        ${slidesHTML}
        ${slidesHTML}
      </div>`;

    const track = container.querySelector('.carousel-track');
    if (track) {
      container._carouselTrack = track;
      container._slideCount = projects.proyecto.length;
      container._carouselOffset = 0;

      const isMobile = () => window.innerWidth <= 992;
      const speed = () => isMobile() ? 0 : 0.25;

      const setSlideWidth = () => {
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const visible = isMobile() ? 1 : 3;
        const slideW = (container.offsetWidth - gap * (visible - 1)) / visible;
        track.querySelectorAll('.proyecto').forEach(s => { s.style.flex = `0 0 ${slideW}px`; });
        return slideW + gap;
      };

      let step = setSlideWidth();

      const autoScroll = () => {
        if (!container._carouselPaused && speed() > 0) {
          container._carouselOffset -= speed();
          track.style.transform = `translateX(${container._carouselOffset}px)`;
          if (Math.abs(container._carouselOffset) >= step * container._slideCount) {
            container._carouselOffset += step * container._slideCount;
            track.style.transform = `translateX(${container._carouselOffset}px)`;
          }
        }
        container._carouselRAF = requestAnimationFrame(autoScroll);
      };
      container._carouselRAF = requestAnimationFrame(autoScroll);

      container.addEventListener('mouseenter', () => { container._carouselPaused = true; });
      container.addEventListener('mouseleave', () => { container._carouselPaused = false; });

      document.getElementById('prev-project')?.addEventListener('click', () => {
        container._carouselOffset += step;
        if (container._carouselOffset > 0) {
          container._carouselOffset -= step * container._slideCount;
        }
        track.style.transform = `translateX(${container._carouselOffset}px)`;
      });

      document.getElementById('next-project')?.addEventListener('click', () => {
        container._carouselOffset -= step;
        if (Math.abs(container._carouselOffset) >= step * container._slideCount) {
          container._carouselOffset += step * container._slideCount;
        }
        track.style.transform = `translateX(${container._carouselOffset}px)`;
      });

      window.addEventListener('resize', () => {
        step = setSlideWidth();
        container._carouselOffset = 0;
        track.style.transform = 'translateX(0px)';
      });
    }
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

    document.dispatchEvent(new CustomEvent('i18n:rendered'));
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
