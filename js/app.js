// ═══════════════════════════════════════════════════════
//  QASR PERFUMES — app.js
// ═══════════════════════════════════════════════════════

let cart = JSON.parse(localStorage.getItem('qasr_cart') || '[]');
let activeQuickFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  updateFooterLinks();
  renderProducts();
  renderReviews();
  updateCartUI();
  initSalePopup();
  initNav();
  initReveal();
  initSidebarGroups();
});

// ── FOOTER LINKS ─────────────────────────────────────────────
function updateFooterLinks() {
  document.querySelectorAll('[data-instagram]').forEach(e => e.href = CONTACT.instagram);
  document.querySelectorAll('[data-facebook]').forEach(e => e.href = CONTACT.facebook);
  document.querySelectorAll('[data-whatsapp]').forEach(e => e.href = 'https://wa.me/' + CONTACT.whatsapp);
  document.querySelectorAll('[data-phone]').forEach(e => e.href = 'tel:' + CONTACT.phone.replace(/\s/g,''));
  document.querySelectorAll('[data-email]').forEach(e => e.href = 'mailto:' + CONTACT.email);
  document.querySelectorAll('.footer-phone').forEach(e => e.textContent = CONTACT.phone);
  document.querySelectorAll('.footer-email').forEach(e => e.textContent = CONTACT.email);
}

// ── FILTER & SORT ENGINE ──────────────────────────────────────
function getFiltered() {
  const all = [...giftPacks, ...pocketPacks, ...edps, ...edts, ...attars, ...trialPacks];

  // Checked categories
  const cats = [...document.querySelectorAll('input[name="cat"]:checked')].map(i => i.value);
  // Checked genders
  const genders = [...document.querySelectorAll('input[name="gender"]:checked')].map(i => i.value);
  // Checked families
  const families = [...document.querySelectorAll('input[name="family"]:checked')].map(i => i.value);
  // Price
  const minP = parseFloat(document.getElementById('priceMin').value) || 0;
  const maxP = parseFloat(document.getElementById('priceMax').value) || 999999;
  // Sort
  const sort = document.getElementById('sortSelect').value;
  // Search
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  // Quick pill filter
  const qf = activeQuickFilter;

  let products = all.filter(p => {
    const basePrice = p.sizes ? p.sizes[0].price : p.price;
    const catMatch   = qf !== 'all' ? p.category === qf : (cats.length === 0 || cats.includes(p.category));
    const genderMatch= genders.length === 0 || genders.includes(p.gender);
    const familyMatch= families.length === 0 || families.includes(p.family);
    const priceMatch = basePrice >= minP && basePrice <= maxP;
    const searchMatch= !q || p.name.toLowerCase().includes(q) || (p.family||'').toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q);
    return catMatch && genderMatch && familyMatch && priceMatch && searchMatch;
  });

  // Sort
  if (sort === 'price-asc')  products.sort((a,b) => (a.sizes?a.sizes[0].price:a.price) - (b.sizes?b.sizes[0].price:b.price));
  if (sort === 'price-desc') products.sort((a,b) => (b.sizes?b.sizes[0].price:b.price) - (a.sizes?a.sizes[0].price:a.price));
  if (sort === 'name-asc')   products.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc')  products.sort((a,b) => b.name.localeCompare(a.name));
  if (sort === 'discount')   products.sort((a,b) => {
    const da = a.originalPrice ? Math.round((1-(a.sizes?a.sizes[0].price:a.price)/a.originalPrice)*100) : 0;
    const db = b.originalPrice ? Math.round((1-(b.sizes?b.sizes[0].price:b.price)/b.originalPrice)*100) : 0;
    return db - da;
  });

  return products;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const noRes = document.getElementById('noResults');
  const products = getFiltered();

  if (products.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    count.textContent = '0 products';
    return;
  }
  noRes.style.display = 'none';
  count.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
  grid.innerHTML = products.map(productCard).join('');
  initReveal();
  initTouchSwipe();
}

function applyFilters() { renderProducts(); }

function clearAllFilters() {
  document.querySelectorAll('input[name="cat"],input[name="gender"],input[name="family"]').forEach(i => i.checked = false);
  document.getElementById('priceMin').value = '';
  document.getElementById('priceMax').value = '';
  document.getElementById('sortSelect').value = 'default';
  if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
  activeQuickFilter = 'all';
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.cat-pill')?.classList.add('active');
  renderProducts();
}

function quickFilter(cat, btn) {
  activeQuickFilter = cat;
  // Uncheck sidebar category checkboxes when using pills
  document.querySelectorAll('input[name="cat"]').forEach(i => i.checked = false);
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts();
}

function filterAndScroll(cat) {
  quickFilter(cat, null);
  document.querySelectorAll('.cat-pill').forEach(p => {
    p.classList.toggle('active', p.textContent.toLowerCase().includes(cat === 'all' ? 'all' : cat.substring(0,4)));
  });
  document.getElementById('shop').scrollIntoView({ behavior:'smooth', block:'start' });
  closeMobile();
}

function handleSearch(val) { renderProducts(); }

// ── PRODUCT CARD ──────────────────────────────────────────────
function productCard(p) {
  // Only show the 50ml bottle image by default — filter out bottle-100ml.png
  const allImgs = p.images?.length ? p.images : ['images/attar-bottle.png'];
  const filtered = allImgs.filter(src => !src.includes('bottle-100ml'));
  const imgs = filtered.length ? filtered : ['images/attar-bottle.png'];
  const basePrice = p.sizes ? p.sizes[0].price : p.price;
  const discount = p.originalPrice ? Math.round((1 - basePrice / p.originalPrice) * 100) : null;
  const catLabel = {attars:'Attar',edp:'EDP',edt:'EDT',gift:'Gift',trial:'Trial',pocket:'Pocket'}[p.category] || p.category;

  // Images
  const slides = imgs.map((src,i) => `
    <div class="p-img-slide ${i===0?'on':''}">
      <img src="${src}" alt="${p.name}" loading="lazy"
        onerror="this.parentElement.innerHTML='<div class=\\'p-img-ph\\'><span>🪔</span><p>${p.name}</p></div>'">
    </div>`).join('');

  const arrows = imgs.length > 1 ? `
    <div class="p-img-arrows">
      <button class="p-arr" onclick="slideP('${p.id}',-1,event)">&#8249;</button>
      <button class="p-arr" onclick="slideP('${p.id}',1,event)">&#8250;</button>
    </div>` : '';

  const dots = imgs.length > 1 ? `
    <div class="p-dots">
      ${imgs.map((_,i) => `<span class="p-dot ${i===0?'on':''}" onclick="dotP('${p.id}',${i},event)"></span>`).join('')}
    </div>` : '';

  // Badges
  const badges = `
    <div class="p-badges">
      <span class="p-badge p-badge-cat">${catLabel}</span>
      ${p.badge === 'Best Seller' ? '<span class="p-badge p-badge-best">Best Seller</span>' : ''}
      ${discount ? `<span class="p-badge p-badge-off">${discount}% OFF</span>` : ''}
    </div>`;

  // Size buttons
  const sizes = p.sizes?.length ? `
    <div class="p-sizes">
      ${p.sizes.map((s,i) => `<button class="p-sz ${i===0?'on':''}" onclick="selectSz('${p.id}',${i},this)">${s.label} — ₹${s.price.toLocaleString()}</button>`).join('')}
    </div>` : '';

  // Gift 4-picker — numbers only, clean
  let extra = '';
  if (p.category === 'gift' && p.pickCount) {
    const opts = p.scentOptions.map(s => `<option value="${s}">${s}</option>`).join('');
    extra = `<div class="p-gift-picks">
      ${[1,2,3,4].map(n => `
        <div class="p-gift-row">
          <span class="p-gift-num">${n}</span>
          <select class="p-gift-sel" id="gp-${p.id}-${n}" onchange="updateGiftSum('${p.id}')">
            <option value="">—</option>
            ${opts}
          </select>
        </div>`).join('')}
      <div class="p-gift-summary" id="gs-${p.id}"></div>
    </div>`;
  } else if (p.scentOptions) {
    extra = `<div class="p-scent">
      <label>Choose Fragrance</label>
      <select id="sc-${p.id}">
        ${p.scentOptions.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
    </div>`;
  }

  const price = `
    <div class="p-price-row">
      <div>
        <div class="p-price" id="pr-${p.id}">₹${basePrice.toLocaleString()}</div>
        ${p.originalPrice ? `<div class="p-orig">₹${p.originalPrice.toLocaleString()}</div>` : ''}
      </div>
    </div>`;

  return `
  <div class="p-card reveal" id="pc-${p.id}" data-id="${p.id}" onclick="goToProduct(event,'${p.id}')" style="cursor:pointer">
    <div class="p-img">
      <div id="ps-${p.id}">${slides}</div>
      ${arrows}${dots}${badges}
    </div>
    <div class="p-info">
      <div class="p-family">${p.family || ''}</div>
      <div class="p-name">${p.name}</div>
      <div class="p-desc">${p.description || ''}</div>
      ${sizes}${extra}${price}
      <button class="p-add" onclick="addToCart('${p.id}')">+ Add to Cart</button>
    </div>
  </div>`;
}

// ── GIFT SUMMARY ──────────────────────────────────────────────
function updateGiftSum(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const picks = [1,2,3,4].map(n => {
    const el = document.getElementById(`gp-${id}-${n}`);
    return el?.value || '';
  }).filter(Boolean);
  const el = document.getElementById(`gs-${id}`);
  if (!el) return;
  if (picks.length) {
    el.textContent = 'Selected: ' + picks.join(', ');
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
}

// ── SIZE SELECT ───────────────────────────────────────────────
function selectSz(id, idx, btn) {
  const p = allProducts.find(x => x.id === id);
  if (!p?.sizes) return;
  document.querySelectorAll(`#pc-${id} .p-sz`).forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  p._sz = idx;
  const sz = p.sizes[idx];
  // Update price display
  const prEl = document.getElementById(`pr-${id}`);
  if (prEl) prEl.textContent = `₹${sz.price.toLocaleString()}`;
  // Swap active slide image to the size-specific bottle
  if (sz.img) {
    const wrap = document.getElementById(`ps-${id}`);
    if (wrap) {
      // Hide all slides, show the matching one
      const slides = wrap.querySelectorAll('.p-img-slide');
      slides.forEach((s, i) => {
        s.classList.toggle('on', i === idx);
        // Update img src to the size-specific image
        const imgEl = s.querySelector('img');
        if (imgEl && i === idx) imgEl.src = sz.img;
      });
      // If no slide at this index exists, just update first slide
      if (idx >= slides.length && slides[0]) {
        slides[0].querySelector('img').src = sz.img;
        slides[0].classList.add('on');
      }
    }
    // Update dots
    document.querySelectorAll(`#pc-${id} .p-dot`).forEach((d,i) => d.classList.toggle('on', i===idx));
  }
}

// ── IMAGE SLIDER ──────────────────────────────────────────────
function slideP(id, dir, e) {
  e?.stopPropagation();
  const wrap = document.getElementById(`ps-${id}`);
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.p-img-slide');
  const dots = document.querySelectorAll(`#pc-${id} .p-dot`);
  let cur = [...slides].findIndex(s => s.classList.contains('on'));
  slides[cur].classList.remove('on');
  dots[cur]?.classList.remove('on');
  cur = (cur + dir + slides.length) % slides.length;
  slides[cur].classList.add('on');
  dots[cur]?.classList.add('on');
}
function dotP(id, idx, e) {
  e?.stopPropagation();
  const wrap = document.getElementById(`ps-${id}`);
  if (!wrap) return;
  wrap.querySelectorAll('.p-img-slide').forEach((s,i) => s.classList.toggle('on', i===idx));
  document.querySelectorAll(`#pc-${id} .p-dot`).forEach((d,i) => d.classList.toggle('on', i===idx));
}
function initTouchSwipe() {
  document.querySelectorAll('.p-img').forEach(wrap => {
    let sx = 0;
    const card = wrap.closest('.p-card');
    const id = card?.dataset.id;
    if (!id) return;
    wrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, {passive:true});
    wrap.addEventListener('touchend', e => {
      const diff = sx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) slideP(id, diff > 0 ? 1 : -1, null);
    }, {passive:true});
  });
}

// ── PRODUCT REDIRECT ─────────────────────────────────────────
function goToProduct(e, id) {
  // Don't redirect if clicking buttons, selects or inputs
  if (e.target.closest('button,select,input,label,.p-gift-sel,.p-sz,.p-arr,.p-dot')) return;
  window.location.href = `product.html?id=${id}`;
}

// ── CART ──────────────────────────────────────────────────────
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const sIdx = p._sz || 0;
  const sz = p.sizes?.[sIdx];
  const price = sz ? sz.price : p.price;
  const vol = sz ? sz.label : (p.volume || '');

  let scent = null;
  if (p.category === 'gift' && p.pickCount) {
    const picks = [1,2,3,4].map(n => document.getElementById(`gp-${id}-${n}`)?.value || '').filter(Boolean);
    if (picks.length < 4) { showToast('Please select all 4 fragrances', 'err'); return; }
    scent = picks.join(', ');
  } else if (p.scentOptions) {
    scent = document.getElementById(`sc-${id}`)?.value || null;
  }

  const key = id + (sz?`-${sz.label}`:'') + (scent?`-${scent.substring(0,12)}`:'');
  const ex = cart.find(i => i.key === key);
  if (ex) { ex.qty++; }
  else { cart.push({id, key, name: p.name + (scent?` (${scent})`:''), price, qty:1, vol}); }
  saveCart(); updateCartUI();
  showToast(`${p.name} added to cart`);
}

function openCart()  { renderCart(); document.getElementById('cartSidebar').classList.add('open'); document.getElementById('overlay').classList.add('on'); }
function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('overlay').classList.remove('on'); }

function renderCart() {
  const body = document.getElementById('cartBody');
  const total = cart.reduce((s,i) => s+i.price*i.qty, 0);
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty-state"><div class="cart-empty-ico">🛒</div><p>Your cart is empty</p></div>`;
    return;
  }
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div><div class="cart-item-name">${item.name}</div><div class="cart-item-vol">${item.vol}</div></div>
      <div class="cart-qty">
        <button class="cart-qty-btn" onclick="chQty('${item.key}',-1)">−</button>
        <span class="cart-qty-num">${item.qty}</span>
        <button class="cart-qty-btn" onclick="chQty('${item.key}',1)">+</button>
      </div>
      <div class="cart-item-price">₹${(item.price*item.qty).toLocaleString()}</div>
      <button class="cart-item-rm" onclick="rmItem('${item.key}')">✕</button>
    </div>`).join('');
}

function chQty(key, d) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
  saveCart(); updateCartUI(); renderCart();
}
function rmItem(key) { cart = cart.filter(i => i.key !== key); saveCart(); updateCartUI(); renderCart(); }
function saveCart() { localStorage.setItem('qasr_cart', JSON.stringify(cart)); }
function updateCartUI() {
  const count = cart.reduce((s,i) => s+i.qty, 0);
  const total = cart.reduce((s,i) => s+i.price*i.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
  const bar = document.getElementById('cartBar');
  bar?.classList.toggle('show', count > 0);
  const bc = document.getElementById('barCount');
  const bt = document.getElementById('barTotal');
  if (bc) bc.textContent = `${count} item${count!==1?'s':''}`;
  if (bt) bt.textContent = `₹${total.toLocaleString()}`;
}

// ── ORDER MODAL ───────────────────────────────────────────────
function openOrderModal() {
  if (!cart.length) { showToast('Cart is empty', 'err'); return; }
  closeCart();
  document.getElementById('orderModal').classList.add('on');
}
function closeModal(e) {
  if (e.target.id === 'orderModal') document.getElementById('orderModal').classList.remove('on');
}

function submitOrder() {
  document.querySelectorAll('.field-err').forEach(e => e.remove());
  document.querySelectorAll('.err').forEach(e => e.classList.remove('err'));
  const n = document.getElementById('custName');
  const m = document.getElementById('custMobile');
  const a = document.getElementById('custAddress');
  const pin = document.getElementById('custPincode');
  const em = document.getElementById('custEmail');
  let ok = true;
  const err = (el, msg) => {
    el.classList.add('err');
    const s = document.createElement('span');
    s.className = 'field-err'; s.textContent = msg;
    el.parentElement.appendChild(s); ok = false;
  };
  if (!n.value.trim()) err(n, 'Full name required');
  if (!/^\d{10}$/.test(m.value.trim())) err(m, 'Valid 10-digit number required');
  if (!a.value.trim()) err(a, 'Address required');
  if (!/^\d{6}$/.test(pin.value.trim())) err(pin, 'Valid 6-digit pincode required');
  if (!ok) return;
  const total = cart.reduce((s,i) => s+i.price*i.qty, 0);
  const items = cart.map((i,n) => `${n+1}. ${i.name} (${i.vol}) x${i.qty} = Rs.${(i.price*i.qty).toLocaleString()}`).join('\n');
  const emailLine = em.value.trim() ? `\nEmail: ${em.value.trim()}` : '';
  const msg = encodeURIComponent(
    `*New Order — QASR Perfumes*\n——————————\n\n*Customer*\nName: ${n.value.trim()}\nMobile: ${m.value.trim()}${emailLine}\nAddress: ${a.value.trim()}\nPincode: ${pin.value.trim()}\n\n*Order*\n——————————\n${items}\n——————————\n*Total: Rs. ${total.toLocaleString()}*\n\nKindly confirm and share payment details.\nThank you.`
  );
  window.open(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`, '_blank');
  document.getElementById('orderModal').classList.remove('on');
  cart = []; saveCart(); updateCartUI();
  showToast('Order sent!');
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
  document.getElementById('saleTitle').textContent = saleOffer.title;
  document.getElementById('saleSub').textContent = saleOffer.subtitle;
  document.getElementById('saleCode').textContent = saleOffer.code;
  document.getElementById('saleBtn').textContent = saleOffer.buttonText;
  setTimeout(() => document.getElementById('salePopup').classList.add('on'), 1200);
}
function closeSale() { document.getElementById('salePopup').classList.remove('on'); }
function copyCode() {
  navigator.clipboard.writeText(saleOffer.code).catch(()=>{});
  const b = document.querySelector('.sale-copy');
  if (b) { b.textContent = 'Copied!'; setTimeout(() => b.textContent = 'Copy', 2000); }
}

// ── NAV ───────────────────────────────────────────────────────
function initNav() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });
}
function closeMobile() {
  document.getElementById('burger')?.classList.remove('open');
  document.getElementById('mobileMenu')?.classList.remove('open');
}

// ── SIDEBAR TOGGLE (mobile) ───────────────────────────────────
function toggleSidebar() {
  const s = document.getElementById('sidebar');
  s.classList.toggle('mobile-open');
  document.getElementById('overlay').classList.toggle('on');
  if (!s.classList.contains('mobile-open')) {
    document.getElementById('overlay').classList.remove('on');
  } else {
    document.getElementById('overlay').onclick = () => {
      s.classList.remove('mobile-open');
      document.getElementById('overlay').classList.remove('on');
      document.getElementById('overlay').onclick = () => closeCart();
    };
  }
}

// ── SIDEBAR GROUPS (collapse/expand) ─────────────────────────
function initSidebarGroups() {
  document.querySelectorAll('.filter-group-head').forEach(head => {
    head.addEventListener('click', () => toggleGroup(head));
  });
}
function toggleGroup(head) {
  const body = head.nextElementSibling;
  if (!body) return;
  const collapsed = body.style.display === 'none';
  body.style.display = collapsed ? 'block' : 'none';
  head.classList.toggle('collapsed', !collapsed);
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type='ok') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold:0.05});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

// ── REVEAL ANIMATION CSS ───────────────────────────────────────
const revealStyle = document.createElement('style');
revealStyle.textContent = '.reveal{opacity:0;transform:translateY(14px);transition:opacity .45s ease,transform .45s ease}.reveal.visible{opacity:1;transform:none}';
document.head.appendChild(revealStyle);
