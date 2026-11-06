// Mobil menü
const menuBtn = document.querySelector('.menu-btn');
const navEl = document.querySelector('.nav nav');
menuBtn.addEventListener('click', () => {
  const open = navEl.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navEl.addEventListener('click', () => navEl.classList.remove('open'));

// Yıl
document.getElementById('year').textContent = new Date().getFullYear();

// Duyuru slider
(function () {
  const slider = document.querySelector('.slider');
  const track = slider.querySelector('.slides');
  const count = track.children.length;
  const dotsEl = slider.querySelector('.dots');
  let index = 0, timer;

  const dots = Array.from({ length: count }, (_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Slayt ${i + 1}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsEl.appendChild(b);
    return b;
  });

  function go(i) {
    index = (i + count) % count;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, n) => d.classList.toggle('active', n === index));
  }
  function restart() {
    clearInterval(timer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => go(index + 1), 5000);
    }
  }

  slider.querySelector('.prev').addEventListener('click', () => { go(index - 1); restart(); });
  slider.querySelector('.next').addEventListener('click', () => { go(index + 1); restart(); });
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restart);

  // Dokunmatik kaydırma
  let startX = null;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
    startX = null;
  });

  go(0); restart();
})();
