(function () {
  'use strict';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, props, children) {
    const n = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v);
    });
    (children || []).forEach(c => c && n.appendChild(c));
    return n;
  }
  function icon(name) {
    const s = document.createElementNS(SVG_NS, 'svg');
    s.setAttribute('class', 'icon');
    s.setAttribute('aria-hidden', 'true');
    const u = document.createElementNS(SVG_NS, 'use');
    u.setAttribute('href', '#i-' + name);
    s.appendChild(u);
    return s;
  }

  // Mobil menü
  const menuBtn = document.querySelector('.menu-btn');
  const navEl = document.querySelector('.nav nav');
  function closeMenu() { navEl.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => {
    const open = navEl.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navEl.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Duyurular
  const slider = document.querySelector('.slider');
  const track = slider.querySelector('.slides');
  const dotsEl = slider.querySelector('.dots');
  const announcements = typeof ANNOUNCEMENTS !== 'undefined' ? ANNOUNCEMENTS : [];

  announcements.forEach((a, i) => {
    const hasLink = Boolean(a.link);
    const slide = el(hasLink ? 'a' : 'div', {
      class: 'slide' + (hasLink ? ' clickable' : ''),
      role: 'group', 'aria-roledescription': 'slide',
      'aria-label': `${i + 1} / ${announcements.length}`
    });
    if (hasLink) { slide.href = a.link; slide.target = '_blank'; slide.rel = 'noopener'; }

    if (a.image) {
      // Görsel kırpılmadan tam gösterilir; metin görselin altında yer alır
      const img = el('img', { class: 'slide-img', src: a.image, alt: a.alt || a.title, width: 1600, height: 640 });
      if (i > 0) img.loading = 'lazy';
      slide.appendChild(img);
    }
    slide.appendChild(el('div', { class: 'slide-text' }, [
      a.tag ? el('span', { class: 'tag', text: a.tag }) : null,
      el('h3', { text: a.title }),
      a.text ? el('p', { text: a.text }) : null,
      hasLink ? el('span', { class: 'btn-3d primary slide-cta' }, [
        el('span', { class: 'btn-top' }, [
          document.createTextNode(a.linkText || 'Detaylar'),
          icon('arrow')
        ])
      ]) : null
    ]));
    track.appendChild(slide);
  });

  const count = announcements.length;
  if (count === 0) {
    document.getElementById('duyurular').hidden = true;
  } else {
    let index = 0, timer;
    const dots = announcements.map((_, i) => {
      const b = el('button', { 'aria-label': `Duyuru ${i + 1}` });
      b.addEventListener('click', () => { go(i); restart(); });
      dotsEl.appendChild(b);
      return b;
    });
    const go = i => {
      index = (i + count) % count;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, n) => d.classList.toggle('active', n === index));
      Array.from(track.children).forEach((s, n) => s.toggleAttribute('inert', n !== index));
    };
    const restart = () => {
      clearInterval(timer);
      if (count > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = setInterval(() => go(index + 1), 6000);
      }
    };
    if (count < 2) slider.querySelectorAll('.arrow, .dots').forEach(n => n.hidden = true);

    slider.querySelector('.prev').addEventListener('click', () => { go(index - 1); restart(); });
    slider.querySelector('.next').addEventListener('click', () => { go(index + 1); restart(); });
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', restart);
    slider.addEventListener('focusin', () => clearInterval(timer));
    slider.addEventListener('focusout', restart);
    document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : restart());

    let startX = null;
    slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
    slider.addEventListener('touchend', e => {
      if (startX !== null) {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        startX = null;
      }
      restart();
    });
    go(0); restart();
  }

  // Etkinlikler
  const events = (typeof EVENTS !== 'undefined' ? EVENTS : []).slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  if (events.length) {
    const now = new Date();
    const list = document.querySelector('#etkinlikler .events');
    const fmtMonth = new Intl.DateTimeFormat('tr-TR', { month: 'short' });
    const fmtFull = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    events.forEach(ev => {
      const d = new Date(ev.date);
      const hasTime = String(ev.date).includes('T');
      const past = d < now;
      const meta = [
        el('span', {}, [icon('calendar'), document.createTextNode(
          hasTime ? fmtFull.format(d) : new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(d))]),
        ev.place ? el('span', {}, [icon('pin'), document.createTextNode(ev.place)]) : null,
        ev.game ? el('span', { text: ev.game }) : null
      ];
      const li = el('li', { class: past ? 'past' : '' }, [
        el('div', { class: 'event-date' }, [el('b', { text: String(d.getDate()) }), el('span', { text: fmtMonth.format(d) })]),
        el('div', { class: 'event-info' }, [el('h3', { text: ev.title }), el('div', { class: 'event-meta' }, meta)]),
        ev.link && !past ? el('a', { class: 'btn ghost', href: ev.link, target: '_blank', rel: 'noopener', text: 'Detaylar' }) : null
      ]);
      list.appendChild(li);
    });
    document.getElementById('etkinlikler').hidden = false;
    document.getElementById('nav-events').hidden = false;
  }

  // ==========================================================================
  // Studio Animasyonları: Scramble, 3D Tilt, Magnetic, Progress & Parallax
  // ==========================================================================

  // 1. Text Scramble / Decoder (Alternatif C: Harf Harf Soldan Sağa Ritmik Çözücü)
  function scrambleText(element) {
    if (element._scrambling) return;
    const original = element.textContent;
    const chars = '01#X/<>[]&_$%+*';
    const len = original.length;
    let frame = 0;
    const speed = 3; // Her harf için 3 kare (~50ms)
    const cyclesPerLetter = 4;
    const totalFrames = len * speed + cyclesPerLetter * 2;
    element._scrambling = true;

    function update() {
      let output = '';
      const currentIndex = Math.floor(frame / speed);
      for (let i = 0; i < len; i++) {
        if (original[i] === ' ') {
          output += ' ';
          continue;
        }
        if (i < currentIndex - cyclesPerLetter) {
          // Çözülmüş, yerine kilitlenmiş orijinal harf
          output += original[i];
        } else if (i <= currentIndex) {
          // O an çözülmekte olan aktif siber karakter
          output += chars[Math.floor(Math.random() * chars.length)];
        } else {
          // Henüz sırası gelmemiş harf
          output += original[i];
        }
      }
      element.textContent = output;
      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(update);
      } else {
        element.textContent = original;
        element._scrambling = false;
      }
    }
    requestAnimationFrame(update);
  }

  // Scramble tetikleyicisi (Görüş alanına girince veya hover olunca)
  const scrambleElements = document.querySelectorAll('[data-scramble]');
  if ('IntersectionObserver' in window) {
    const scrambleObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          scrambleText(e.target);
          scrambleObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    scrambleElements.forEach(el => scrambleObserver.observe(el));
  }
  scrambleElements.forEach(el => {
    el.addEventListener('mouseenter', () => scrambleText(el));
  });

  // Kaydırınca beliren bölümler (Yumuşak kademeli geçiş)
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(i => io.observe(i));
  } else {
    items.forEach(i => i.classList.add('visible'));
  }

  // Masaüstü için Mikro Etkileşimler (Hover ve Pointer kontrolleri)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // 2. Spotlight Cursor Tracking (Kart üstü dinamik ışık)
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });

    // 3. 3D Interactive Tilt (Hero Logo & Oyun Kartları - Belirgin ve Güçlü)
    const tiltElements = document.querySelectorAll('.tilt-element');
    tiltElements.forEach(el => {
      const isHeroLogo = el.classList.contains('hero-logo');
      const maxRot = isHeroLogo ? 18 : 8; // Hero logosunda 18 derece belirgin eğim
      const maxScale = isHeroLogo ? 1.05 : 1.02;

      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        const rotX = -(y / (r.height / 2)) * maxRot;
        const rotY = (x / (r.width / 2)) * maxRot;
        el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${maxScale}, ${maxScale}, ${maxScale})`;
        if (isHeroLogo) {
          el.style.filter = `drop-shadow(${(-rotY * 2).toFixed(1)}px ${(rotX * 2 + 25).toFixed(1)}px 40px rgba(0, 0, 0, 0.75))`;
        }
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (isHeroLogo) {
          el.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65))';
        }
      });
    });

    // 4. Magnetic Button (Hero Ana Buton Mıknatıs Çekimi)
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // 5. Scroll İlerleme Çubuğu & Belirgin Parallax Grid Kayması (Sabit Katman Üzerinde)
  const progressBar = document.querySelector('.scroll-progress-bar');
  const parallaxGrid = document.querySelector('.bg-grid-parallax');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar && docHeight > 0) {
          const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }
        // Sonsuz tekrarlı gerçek parallax katman kayması (Asla altı boş kalmaz)
        if (parallaxGrid) {
          parallaxGrid.style.backgroundPositionY = `${-(scrollTop * 0.28)}px`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
