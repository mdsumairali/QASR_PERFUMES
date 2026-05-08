// QASR Perfumes — app.js

let cart = JSON.parse(localStorage.getItem('qasr_cart') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  renderAllProducts('all');
  renderReviews();
  updateCartUI();
  initSalePopup();
  initNav();
  initReveal();
  updateFooterLinks();
});

function updateFooterLinks() {
  document.querySelectorAll('[data-instagram]').forEach(e => e.href = CONTACT.instagram);
  document.querySelectorAll('[data-facebook]').forEach(e => e.href = CONTACT.facebook);
  document.querySelectorAll('[data-whatsapp]').forEach(e => e.href = 'https://wa.me/' + CONTACT.whatsapp);
  document.querySelectorAll('[data-phone]').forEach(e => e.href = 'tel:' + CONTACT.phone.replace(/\s/g,''));
  document.querySelectorAll('[data-email]').forEach(e => e.href = 'mailto:' + CONTACT.email);
  document.querySelectorAll('.footer-phone').forEach(e => e.textContent = CONTACT.phone);
  document.querySelectorAll('.footer-email').forEach(e => e.textContent = CONTACT.email);
}

// ── RENDER PRODUCTS ───────────────────────────────────────────
function renderAllProducts(cat) {
  const grid = document.getElementById('allProductsGrid');
  if (!grid) return;
  const all = [...giftPacks, ...pocketPacks, ...edps, ...edts, ...attars, ...trialPacks];
  const filtered = cat === 'all' ? all : all.filter(p => p.category === cat);
  grid.innerHTML = filtered.map(productCard).join('');
  initReveal();
  initTouchSlider();
}

function filterCat(cat, btn) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderAllProducts(cat);
  document.getElementById('shop').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ── PRODUCT CARD ──────────────────────────────────────────────
function productCard(p) {
  const imgs = (p.images && p.images.length) ? p.images : ['images/attar-bottle.png'];
  const basePrice = p.sizes ? p.sizes[0].price : p.price;
  const discount = p.originalPrice ? Math.round((1 - basePrice / p.originalPrice) * 100) : null;
  const catLabel = {attars:'Attar',edp:'EDP',edt:'EDT',gift:'Gift',trial:'Trial',pocket:'Pocket'}[p.category] || p.category;

  const imgSlides = imgs.map((src,i) => `
    <div class="img-slide ${i===0?'active':''}">
      <img src="${src}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'img-ph\\'><span>🪔</span><p>${p.name}</p></div>'">
    </div>`).join('');

  const arrowsHtml = imgs.length > 1 ? `
    <div class="img-nav">
      <button class="img-arr" onclick="slideImg('${p.id}',-1,event)">&#8249;</button>
      <button class="img-arr" onclick="slideImg('${p.id}',1,event)">&#8250;</button>
    </div>` : '';

  const dotsHtml = imgs.length > 1 ? `
    <div class="img-dots">
      ${imgs.map((_,i)=>`<span class="dot ${i===0?'active':''}" onclick="changeImg('${p.id}',${i},event)"></span>`).join('')}
    </div>` : '';

  // Size buttons
  let sizeHtml = '';
  if (p.sizes && p.sizes.length) {
    sizeHtml = `<div class="size-sel">
      ${p.sizes.map((s,i)=>`<button class="sz-btn ${i===0?'active':''}" onclick="selectSize('${p.id}',${i},this)">${s.label} — ₹${s.price.toLocaleString()}</button>`).join('')}
    </div>`;
  }

  // Gift pack: clean numbered 4-slot selector
  let scentHtml = '';
  if (p.category === 'gift' && p.scentOptions && p.pickCount) {
    const opts = p.scentOptions.map(s=>`<option value="${s}">${s}</option>`).join('');
    scentHtml = `<div class="gift-picks">
      <div class="gift-picks-header">
        <span class="gift-picks-title">Select Your Fragrances</span>
        <span class="gift-picks-hint">Choose ${p.pickCount}</span>
      </div>
      ${[1,2,3,4].map(n=>`
        <div class="gift-pick-row">
          <div class="gift-pick-badge">${n}</div>
          <select class="gift-pick-sel" id="gift-${p.id}-${n}" onchange="updateGiftSummary('${p.id}')">
            <option value="">Choose fragrance ${n}</option>
            ${opts}
          </select>
        </div>`).join('')}
      <div class="gift-summary" id="gift-summary-${p.id}"></div>
    </div>`;
  } else if (p.scentOptions) {
    // Pocket spray: single dropdown
    scentHtml = `<div class="scent-wrap">
      <span class="scent-lbl">Choose Fragrance</span>
      <select class="scent-sel" id="scent-${p.id}">
        ${p.scentOptions.map(s=>`<option value="${s}">${s}</option>`).join('')}
      </select>
    </div>`;
  }

  const displayPrice = `₹${basePrice.toLocaleString()}`;
  const origHtml = p.originalPrice ? `<span class="prod-orig">₹${p.originalPrice.toLocaleString()}</span>` : '';
  const offHtml = discount ? `<span class="bdg bdg-off">${discount}% OFF</span>` : '';

  return `
  <div class="product-card reveal" id="card-${p.id}" data-cat="${p.category}" data-slider-id="${p.id}">
    <div class="prod-img-wrap">
      <div id="slider-${p.id}">${imgSlides}</div>
      ${arrowsHtml}${dotsHtml}
      <div class="prod-badges">
        <span class="bdg bdg-cat">${catLabel}</span>
        ${offHtml}
      </div>
    </div>
    <div class="prod-info">
      <div class="prod-name">${p.name}</div>
      <div class="prod-tag">${p.tagline}</div>
      ${p.description ? `<div class="prod-notes">${p.description}</div>` : ''}
      ${sizeHtml}
      ${scentHtml}
      <div class="price-row">
        <div>
          <div class="prod-price" id="price-${p.id}">${displayPrice}</div>
          ${origHtml}
        </div>
      </div>
      <button class="add-btn" onclick="addToCart('${p.id}')">+ Add to Cart</button>
    </div>
  </div>`;
}

// ── GIFT SUMMARY ──────────────────────────────────────────────
function updateGiftSummary(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p || !p.pickCount) return;
  const picks = [];
  for (let n = 1; n <= p.pickCount; n++) {
    const el = document.getElementById(`gift-${id}-${n}`);
    if (el && el.value) picks.push(el.value);
  }
  const summary = document.getElementById(`gift-summary-${id}`);
  if (summary) {
    summary.innerHTML = picks.length > 0
      ? `<span class="gift-summary-text">Selected: ${picks.join(', ')}</span>`
      : '';
  }
}

// ── SIZE SELECT ───────────────────────────────────────────────
function selectSize(id, idx, btn) {
  const p = allProducts.find(x => x.id === id);
  if (!p || !p.sizes) return;
  document.querySelectorAll(`#card-${id} .sz-btn`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  p._selectedSize = idx;
  const el = document.getElementById(`price-${id}`);
  if (el) el.textContent = `₹${p.sizes[idx].price.toLocaleString()}`;
}

// ── IMAGE SLIDER ──────────────────────────────────────────────
function slideImg(id, dir, e) {
  if (e) e.stopPropagation();
  const wrap = document.getElementById(`slider-${id}`);
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.img-slide');
  const dots = document.querySelectorAll(`#card-${id} .dot`);
  let cur = [...slides].findIndex(s => s.classList.contains('active'));
  slides[cur].classList.remove('active');
  if (dots[cur]) dots[cur].classList.remove('active');
  cur = (cur + dir + slides.length) % slides.length;
  slides[cur].classList.add('active');
  if (dots[cur]) dots[cur].classList.add('active');
}
function changeImg(id, idx, e) {
  if (e) e.stopPropagation();
  const wrap = document.getElementById(`slider-${id}`);
  if (!wrap) return;
  wrap.querySelectorAll('.img-slide').forEach((s,i) => s.classList.toggle('active', i===idx));
  document.querySelectorAll(`#card-${id} .dot`).forEach((d,i) => d.classList.toggle('active', i===idx));
}

function initTouchSlider() {
  document.querySelectorAll('.prod-img-wrap').forEach(wrap => {
    let startX = 0;
    const card = wrap.closest('.product-card');
    const id = card ? card.dataset.sliderId : null;
    if (!id) return;
    wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
    wrap.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) slideImg(id, diff > 0 ? 1 : -1, null);
    }, {passive:true});
  });
}

// ── CART ──────────────────────────────────────────────────────
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const sizeIdx = p._selectedSize || 0;
  const size = p.sizes ? p.sizes[sizeIdx] : null;
  const price = size ? size.price : p.price;
  const volume = size ? size.label : (p.volume || '');

  let scent = null;
  if (p.category === 'gift' && p.pickCount) {
    const picks = [];
    for (let n = 1; n <= p.pickCount; n++) {
      const el = document.getElementById(`gift-${id}-${n}`);
      if (el && el.value) picks.push(el.value);
    }
    if (picks.length < p.pickCount) {
      showToast(`Please select all ${p.pickCount} fragrances`, 'error'); return;
    }
    scent = picks.join(', ');
  } else {
    const scentEl = document.getElementById(`scent-${id}`);
    scent = scentEl ? scentEl.value : null;
  }

  const cartKey = id + (size?`-${size.label}`:'') + (scent?`-${scent.substring(0,15)}`:'');
  const existing = cart.find(i => i.cartKey === cartKey);
  if (existing) { existing.qty++; }
  else { cart.push({id, cartKey, name: p.name + (scent ? ` (${scent})` : ''), price, qty:1, volume}); }
  saveCart(); updateCartUI();
  showToast(`${p.name} added to cart`);
}

function openCart() { renderCart(); document.getElementById('cartSide').classList.add('open'); document.getElementById('overlay').classList.add('on'); }
function closeCart() { document.getElementById('cartSide').classList.remove('open'); document.getElementById('overlay').classList.remove('on'); }

function renderCart() {
  const body = document.getElementById('cartBody');
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-ico">🛒</div><p>Your cart is empty</p></div>`;
    return;
  }
  body.innerHTML = cart.map(item => `
    <div class="c-item">
      <div><div class="c-name">${item.name}</div><div class="c-vol">${item.volume}</div></div>
      <div class="qty-row">
        <button class="qty-btn" onclick="changeQty('${item.cartKey}',-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.cartKey}',1)">+</button>
      </div>
      <div class="c-price">₹${(item.price*item.qty).toLocaleString()}</div>
      <button class="c-rm" onclick="removeItem('${item.cartKey}')">✕</button>
    </div>`).join('');
}

function changeQty(key, d) {
  const item = cart.find(i => i.cartKey === key);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) cart = cart.filter(i => i.cartKey !== key);
  saveCart(); updateCartUI(); renderCart();
}
function removeItem(key) { cart = cart.filter(i => i.cartKey !== key); saveCart(); updateCartUI(); renderCart(); }
function saveCart() { localStorage.setItem('qasr_cart', JSON.stringify(cart)); }

function updateCartUI() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
  const bar = document.getElementById('cartBar');
  if (bar) bar.classList.toggle('show', count > 0);
  const bc = document.getElementById('barCount');
  const bt = document.getElementById('barTotal');
  if (bc) bc.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  if (bt) bt.textContent = `₹${total.toLocaleString()}`;
}

// ── ORDER MODAL ───────────────────────────────────────────────
function openOrderModal() {
  if (!cart.length) { showToast('Your cart is empty', 'error'); return; }
  closeCart();
  document.getElementById('orderModal').classList.add('on');
}
function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('on');
  document.querySelectorAll('.ferr').forEach(e => e.remove());
  document.querySelectorAll('.err').forEach(e => e.classList.remove('err'));
}
document.addEventListener('click', e => { if (e.target.id === 'orderModal') closeOrderModal(); });

function submitOrder() {
  document.querySelectorAll('.ferr').forEach(e => e.remove());
  document.querySelectorAll('.err').forEach(e => e.classList.remove('err'));
  const name = document.getElementById('custName');
  const mobile = document.getElementById('custMobile');
  const address = document.getElementById('custAddress');
  const pincode = document.getElementById('custPincode');
  const email = document.getElementById('custEmail');
  let ok = true;
  const err = (el, msg) => { el.classList.add('err'); const s=document.createElement('span'); s.className='ferr'; s.textContent=msg; el.parentElement.appendChild(s); ok=false; };
  if (!name.value.trim()) err(name, 'Full name is required');
  if (!/^\d{10}$/.test(mobile.value.trim())) err(mobile, 'Enter a valid 10-digit number');
  if (!address.value.trim()) err(address, 'Address is required');
  if (!/^\d{6}$/.test(pincode.value.trim())) err(pincode, 'Enter a valid 6-digit pincode');
  if (!ok) return;
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const items = cart.map((i,n) => `${n+1}. ${i.name} (${i.volume}) x${i.qty}  =  Rs. ${(i.price*i.qty).toLocaleString()}`).join('\n');
  const emailLine = email.value.trim() ? `\nEmail       : ${email.value.trim()}` : '';
  const msg = encodeURIComponent(
    `*New Order — QASR Perfumes*\n——————————————\n\n` +
    `*Customer Details*\nName        : ${name.value.trim()}\nMobile      : ${mobile.value.trim()}${emailLine}\nAddress     : ${address.value.trim()}\nPincode     : ${pincode.value.trim()}\n\n` +
    `*Order Summary*\n——————————————\n${items}\n——————————————\n*Order Total : Rs. ${total.toLocaleString()}*\n\nKindly confirm the order and share payment details.\nThank you.`
  );
  window.open(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`, '_blank');
  closeOrderModal();
  cart = []; saveCart(); updateCartUI();
  showToast('Order sent successfully!');
}

// ── REVIEWS ───────────────────────────────────────────────────
function renderReviews() {
  const g = document.getElementById('reviewsGrid');
  if (!g) return;
  g.innerHTML = reviews.map(r => `
    <div class="rev-card reveal">
      <div class="rev-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <p class="rev-text">"${r.text}"</p>
      <div class="rev-name">${r.name}</div>
      <div class="rev-loc">${r.location}</div>
    </div>`).join('');
}

// ── SALE POPUP ────────────────────────────────────────────────
function initSalePopup() {
  if (!saleOffer.active) return;
  const pop = document.getElementById('salePop');
  pop.querySelector('.sale-title-txt').textContent = saleOffer.title;
  pop.querySelector('.sale-sub-txt').textContent = saleOffer.subtitle;
  pop.querySelector('.sale-code-txt').textContent = saleOffer.code;
  pop.querySelector('.sale-cta-txt').textContent = saleOffer.buttonText;
  setTimeout(() => pop.classList.add('on'), 1200);
}
function closeSalePop() { document.getElementById('salePop').classList.remove('on'); }
function copyCode() {
  navigator.clipboard.writeText(saleOffer.code).catch(()=>{});
  const btn = document.querySelector('.copy-btn');
  if (btn) { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 2000); }
}

// ── NAV ───────────────────────────────────────────────────────
function initNav() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  }, {passive:true});
  const burger = document.getElementById('burger');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    document.getElementById('mobileNav').classList.toggle('open');
  });
}
function closeMobileNav() {
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── REVEAL ────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.05});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}
