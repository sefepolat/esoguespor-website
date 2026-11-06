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
      hasLink ? el('span', { class: 'cta' }, [document.createTextNode(a.linkText || 'Detaylar'), icon('arrow')]) : null
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

  // Kaydırınca beliren bölümler
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(i => io.observe(i));
  } else {
    items.forEach(i => i.classList.add('visible'));
  }
})();
