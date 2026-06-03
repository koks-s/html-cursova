/* =============================================
   BUKO Furniture Store — main.js
   ============================================= */

/* === PRODUCTS DATA === */
const productsData = [
  {
    id: 1, cat: 'living',
    name: 'Диван Oslo',
    desc: 'М\'який тризмісний диван, тканина букле',
    price: '42 500 ₴',
    emoji: '🛋️',
    bg: 'linear-gradient(135deg, #e8ddd0, #d4c4b0)'
  },
  {
    id: 2, cat: 'living',
    name: 'Стіл Nordic',
    desc: 'Кавовий столик, масив дуба, 80×80 см',
    price: '12 800 ₴',
    emoji: '🪵',
    bg: 'linear-gradient(135deg, #d4c4a8, #c4b090)'
  },
  {
    id: 3, cat: 'bedroom',
    name: 'Ліжко Bergen',
    desc: 'Дерев\'яне узголів\'я, 160×200 см',
    price: '28 900 ₴',
    emoji: '🛏️',
    bg: 'linear-gradient(135deg, #e0d8d0, #cdc0b0)'
  },
  {
    id: 4, cat: 'kitchen',
    name: 'Стіл Fjord',
    desc: 'Обідній стіл, 140×80 см, масив сосни',
    price: '18 200 ₴',
    emoji: '🍽️',
    bg: 'linear-gradient(135deg, #d8cfc0, #c8bba0)'
  },
  {
    id: 5, cat: 'living',
    name: 'Крісло Havn',
    desc: 'Крісло-реклайнер, шкіра, бежевий',
    price: '24 500 ₴',
    emoji: '🪑',
    bg: 'linear-gradient(135deg, #ddd4c4, #c8b898)'
  },
  {
    id: 6, cat: 'office',
    name: 'Стіл Arbeid',
    desc: 'Робочий стіл з ящиками, 150×70 см',
    price: '21 300 ₴',
    emoji: '💼',
    bg: 'linear-gradient(135deg, #c8c0b8, #b8b0a0)'
  },
  {
    id: 7, cat: 'bedroom',
    name: 'Комод Lund',
    desc: 'Дерев\'яний комод, 5 ящиків, натуральний дуб',
    price: '15 600 ₴',
    emoji: '🗄️',
    bg: 'linear-gradient(135deg, #d0c8b8, #c0b8a0)'
  },
  {
    id: 8, cat: 'kitchen',
    name: 'Стільці Set Hav',
    desc: 'Набір 4 стільці, плетений ротанг',
    price: '16 800 ₴',
    emoji: '🪑',
    bg: 'linear-gradient(135deg, #c8c0a8, #b8a888)'
  },
  {
    id: 9, cat: 'office',
    name: 'Полиця Hylle',
    desc: 'Навісна полиця, 3 рівні, масив берези',
    price: '8 200 ₴',
    emoji: '📚',
    bg: 'linear-gradient(135deg, #d4ccc0, #c4bca8)'
  }
];

/* === RENDER PRODUCTS === */
function renderProducts(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = limit ? productsData.slice(0, limit) : productsData;

  container.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.dataset.cat = p.cat;
    card.innerHTML = `
      <div class="product-card__img">
        <div class="product-card__visual" style="background:${p.bg}; font-size:4rem;">
          ${p.emoji}
        </div>
      </div>
      <div class="product-card__body">
        <p class="product-card__cat">${catLabel(p.cat)}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${p.price}</span>
          <button class="product-card__btn" onclick="openModal()">Замовити</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Trigger reveal
  setTimeout(activateReveal, 100);
}

function catLabel(cat) {
  const map = { living: 'Вітальня', bedroom: 'Спальня', kitchen: 'Кухня', office: 'Офіс' };
  return map[cat] || cat;
}

/* === MOBILE MENU === */
const burgerIcons = document.getElementById('burgerIcons');
const iconBars = document.getElementById('iconBars');
const iconXmark = document.getElementById('iconXmark');
const menuList = document.getElementById('menuList');

if (burgerIcons && menuList) {
  burgerIcons.addEventListener('click', () => {
    menuList.classList.toggle('open');
    iconXmark && iconXmark.classList.toggle('hide');
    iconBars && iconBars.classList.toggle('hide');
  });
}

/* === HEADER SCROLL === */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  // Back to top
  const btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* === BACK TO TOP === */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* === MODAL === */
function openModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(el) {
  if (el && el.id !== 'modalOverlay') return;
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* === FORM SUBMIT === */
function submitForm() {
  closeModal();
  alert('Дякуємо! Ваша заявка прийнята. Ми передзвонимо найближчим часом.');
}

/* === NEWSLETTER === */
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  if (!input) return;
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    alert('Будь ласка, введіть коректну електронну пошту.');
    return;
  }
  input.value = '';
  alert(`Дякуємо! ${email} додано до розсилки. Чекайте на знижку 10%!`);
}

/* === COUNTDOWN TIMER === */
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 24);
  endDate.setHours(23, 59, 59, 0);

  function update() {
    const now = new Date();
    let diff = Math.floor((endDate - now) / 1000);
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    const secs = diff % 60;

    el.innerHTML = `
      <div class="countdown__item">
        <span class="countdown__num">${String(days).padStart(2, '0')}</span>
        <span class="countdown__label">Днів</span>
      </div>
      <div class="countdown__item">
        <span class="countdown__num">${String(hours).padStart(2, '0')}</span>
        <span class="countdown__label">Годин</span>
      </div>
      <div class="countdown__item">
        <span class="countdown__num">${String(mins).padStart(2, '0')}</span>
        <span class="countdown__label">Хвилин</span>
      </div>
      <div class="countdown__item">
        <span class="countdown__num">${String(secs).padStart(2, '0')}</span>
        <span class="countdown__label">Секунд</span>
      </div>
    `;
  }
  update();
  setInterval(update, 1000);
}

/* === TESTIMONIALS SLIDER === */
function initSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!testimonials.length) return;

  let current = 0;

  function goTo(idx) {
    testimonials[current].classList.remove('active');
    current = (idx + testimonials.length) % testimonials.length;
    testimonials[current].classList.add('active');
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  setInterval(() => goTo(current + 1), 5000);
}

/* === SCROLL REVEAL === */
function activateReveal() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

/* === ADD REVEAL CLASS TO SECTIONS === */
function initReveal() {
  const targets = document.querySelectorAll(
    '.feature-card, .value-card, .team-card, .testimonial, .about-intro__text, .about-intro__visual, .section-header, .contact-form-block, .contact-info-block'
  );
  targets.forEach(el => el.classList.add('reveal'));
  activateReveal();
}

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  // Render products
  renderProducts('productsList', 6);   // home: 6 items
  renderProducts('catalogList');       // catalog: all items

  initCountdown();
  initSlider();
  initReveal();
});
