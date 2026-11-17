const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Scroll progress
const progress = document.querySelector('.scroll-progress');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Small 3D hover interaction for desktop/pointer devices.
// The effect is intentionally subtle so the site still feels academic.
const canTilt = window.matchMedia('(pointer: fine)').matches &&
                !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canTilt) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
