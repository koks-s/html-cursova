/* =============================================
   BUKO Furniture Store — main.js
   ============================================= */

/* === PRODUCTS DATA === */
const DISCOUNT_PERCENT = 15;
let discountActive = false;

function applyDiscount(price) {
  return Math.round(price * (1 - DISCOUNT_PERCENT / 100));
}

const productsData = [
  {
    id: 1, cat: 'living',
    name: 'Диван Oslo',
    desc: 'М\'який трьохмісний диван, тканина букле',
    price: 34500 ,
    image: 'assets/images/divan-oslo.jpg',
    bg: 'linear-gradient(135deg, #e8ddd0, #d4c4b0)'
  },
  {
    id: 2, cat: 'living',
    name: 'Стіл Nordic',
    desc: 'Кавовий столик, масив дуба, 80×80 см',
    price: 11800 ,
    image: 'assets/images/stil-nordic.jpg',
    bg: 'linear-gradient(135deg, #d4c4a8, #c4b090)'
  },
  {
    id: 3, cat: 'bedroom',
    name: 'Ліжко Bergen',
    desc: 'Дерев\'яне узголів\'я, 160×200 см',
    price: 23900 ,
    image: 'assets/images/lizko-bergen.jpg',
    bg: 'linear-gradient(135deg, #e0d8d0, #cdc0b0)'
  },
  {
    id: 4, cat: 'kitchen',
    name: 'Стіл Fjord',
    desc: 'Обідній стіл, 140×80 см, масив сосни',
    price: 16200 ,
    image: 'assets/images/stil-fjord.jpg',
    bg: 'linear-gradient(135deg, #d8cfc0, #c8bba0)'
  },
  {
    id: 5, cat: 'living',
    name: 'Крісло Havn',
    desc: 'Крісло-реклайнер, шкіра, бежевий',
    price: 16500 ,
    image: 'assets/images/krislo-havn.jpeg',
    bg: 'linear-gradient(135deg, #ddd4c4, #c8b898)'
  },
  {
    id: 6, cat: 'office',
    name: 'Стіл Arbeid',
    desc: 'Робочий стіл з ящиками, 150×70 см',
    price: 18300 ,
    image: 'assets/images/stil-arbeid.jpg',
    bg: 'linear-gradient(135deg, #c8c0b8, #b8b0a0)'
  },
  {
    id: 7, cat: 'bedroom',
    name: 'Комод Lund',
    desc: 'Дерев\'яний комод, 4 ящики, натуральний дуб',
    price: 13600 ,
    image: 'assets/images/komod-lund.jpg',
    bg: 'linear-gradient(135deg, #d0c8b8, #c0b8a0)'
  },
  {
    id: 8, cat: 'kitchen',
    name: 'Стільці Set Hav',
    desc: 'Набір 4 стільці, плетений ротанг',
    price: 12800 ,
    image: 'assets/images/stilci-sethav.jpg',
    bg: 'linear-gradient(135deg, #c8c0a8, #b8a888)'
  },
  {
    id: 9, cat: 'office',
    name: 'Полиця Hylle',
    desc: 'Навісна полиця, масив берези',
    price: 4200 ,
    image: 'assets/images/polica-hylle.jpg',
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
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="product-card__img-wrapper">
        ${p.image 
          ? `<img src="${p.image}" alt="${p.name}" class="product-card__real-img">`
          : `<div class="product-card__visual" style="background:${p.bg};font-size:4rem;">${p.emoji || '🪑'}</div>`
        }
      </div>
      <div class="product-card__body">
        <p class="product-card__cat">${catLabel(p.cat)}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__footer">
          ${discountActive ? `<span class="product-card__old-price">${p.price.toLocaleString('uk-UA')} ₴</span>` : ''}
          <span class="product-card__price${discountActive ? ' product-card__price--sale' : ''}">
            ${discountActive ? applyDiscount(p.price).toLocaleString('uk-UA') + ' ₴' : p.price.toLocaleString('uk-UA') + ' ₴'}
          </span>
          <button class="product-card__btn" onclick="addToCart(${p.id})">Замовити</button>
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

  let endTimestamp = localStorage.getItem('buko_sale_end');
if (!endTimestamp) {
  const end = new Date();
  end.setDate(end.getDate() + 30);
  end.setHours(23, 59, 59, 0);
  endTimestamp = end.getTime();
  localStorage.setItem('buko_sale_end', endTimestamp);
}
const endDate = new Date(parseInt(endTimestamp));

  function update() {
    const now = new Date();
    let diff = Math.floor((endDate - now) / 1000);
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const mins = Math.floor((diff % 3600) / 60);

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

function toggleDiscount() {
  discountActive = !discountActive;
  renderProducts('productsList', 6);
  renderProducts('catalogList');
}

// === MODAL AUTHORIZATION WINDOW LOGIC === */

const accountBtn = document.getElementById('account-btn');
const authModal = document.getElementById('auth-modal');
const closeAuthBtn = document.getElementById('close-auth-btn');
const authForm = document.getElementById('auth-form');

if (accountBtn && authModal) {
  accountBtn.addEventListener('click', () => {
    authModal.classList.add('open');
  });
}

if (closeAuthBtn && authModal) {
  closeAuthBtn.addEventListener('click', () => {
    authModal.classList.remove('open');
  });
}

if (authModal) {
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('open');
    }
  });
}

if (authForm) {
  authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки
    
    const email = document.getElementById('auth-email').value;
    
    // Показуємо красиве сповіщення
    alert(`Вітаємо! Ви успішно увійшли як: ${email}`);
    
    // Закриваємо модалку та очищаємо поля
    authModal.classList.remove('open');
    authForm.reset();
  });
}

/* === CART === */
let cart = [];

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartBadge();
  animateCartFly(productId);
}

function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function animateCartFly(productId) {
  const card = document.querySelector(`[data-id="${productId}"]`);
  const cartBtn = document.querySelector('.btn-icon[onclick*="openCart"]');
  if (!card || !cartBtn) return;

  const cardRect = card.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  const fly = document.createElement('div');
  fly.className = 'cart-fly';
  const visual = card.querySelector('.product-card__visual');
  const product = productsData.find(p => p.id === productId);
  fly.textContent = visual ? visual.textContent.trim() : (product ? (product.emoji || '🛋️') : '🛋️');
  fly.style.cssText = `
    position: fixed;
    left: ${cardRect.left + cardRect.width / 2}px;
    top: ${cardRect.top + cardRect.height / 2}px;
    font-size: 2rem;
    z-index: 9999;
    pointer-events: none;
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1);
    opacity: 1;
  `;
  document.body.appendChild(fly);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fly.style.left = cartRect.left + cartRect.width / 2 + 'px';
      fly.style.top = cartRect.top + cartRect.height / 2 + 'px';
      fly.style.transform = 'scale(0.2)';
      fly.style.opacity = '0';
    });
  });

  setTimeout(() => fly.remove(), 750);
}

function openCart() {
  renderCartModal();
  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart(el) {
  if (el && el.id !== 'cartOverlay') return;
  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartModal() {
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('cartTotal');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty">Кошик порожній</p>';
    if (totalEl) totalEl.textContent = '0 ₴';
    return;
  }

  // Показуємо лише 2 товари в рядку
  list.innerHTML = '';
  cart.forEach(item => {
    const price = discountActive ? applyDiscount(item.price) : item.price;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      ${item.image 
        ? `<img src="${item.image}" alt="${item.name}" class="cart-item__img">`
        : `<span class="cart-item__emoji">${item.emoji || '🪑'}</span>`
      }
      <div class="cart-item__info">
        <span class="cart-item__name">${item.name}</span>
        <span class="cart-item__price">${(price * item.qty).toLocaleString('uk-UA')} ₴</span>
      </div>
      <div class="cart-item__qty">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart(${item.id})">✕</button>
    `;
    list.appendChild(el);
  });

  const total = cart.reduce((sum, item) => {
    const price = discountActive ? applyDiscount(item.price) : item.price;
    return sum + price * item.qty;
  }, 0);
  if (totalEl) totalEl.textContent = total.toLocaleString('uk-UA') + ' ₴';
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { updateCartBadge(); renderCartModal(); }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartBadge();
  renderCartModal();
}

function checkoutCart() {
  closeCart();
  openModal();
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
