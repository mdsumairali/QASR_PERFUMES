// ═══════════════════════════════════════════════════════
//  QASR — product.js  (Product Detail Page Logic)
// ═══════════════════════════════════════════════════════

let pdProduct = null;
let pdCurImg = 0;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location.href = 'index.html'; return; }

  pdProduct = allProducts.find(p => p.id === id);
  if (!pdProduct) { window.location.href = 'index.html'; return; }

  loadProduct(pdProduct);
  loadRelated(pdProduct);
  updateCartUI();

  // WA float
  document.getElementById('waFloat').href = 'https://wa.me/' + CONTACT.whatsapp;
  document.getElementById('pdWaBtn').href = 'https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(`Hi, I'm interested in ${pdProduct.name}`);

  // Nav burger
  const burger = document.getElementById('burger');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    document.getElementById('mobileMenu').classList.toggle('open');
  });
});

function loadProduct(p) {
  // Breadcrumb
  document.title = `QASR — ${p.name}`;
  const catLabel = {attars:'Attars',edp:'Eau de Parfum',edt:'Eau de Toilette',gift:'Gift Packs',trial:'Trial Packs',pocket:'Pocket Perfume'}[p.category] || p.category;
  document.getElementById('bcCat').textContent = catLabel;
  document.getElementById('bcCat').href = `index.html#shop`;
  document.getElementById('bcName').textContent = p.name;

  // Badges
  const bWrap = document.getElementById('pdBadges');
  const catL = {attars:'Attar',edp:'EDP',edt:'EDT',gift:'Gift',trial:'Trial',pocket:'Pocket'}[p.category] || p.category;
  bWrap.innerHTML = `<span class="pd-badge pd-badge-cat">${catL}</span>${p.badge==='Best Seller'?'<span class="pd-badge pd-badge-best">Best Seller</span>':''}`;

  // Name, family, tagline
  document.getElementById('pdFamily').textContent = p.family || '';
  document.getElementById('pdName').textContent = p.name;
  document.getElementById('pdTagline').textContent = p.tagline || '';

  // Price
  const basePrice = p.sizes ? p.sizes[0].price : p.price;
  document.getElementById('pdPrice').textContent = `₹${basePrice.toLocaleString()}`;
  if (p.originalPrice) {
    document.getElementById('pdOrig').textContent = `₹${p.originalPrice.toLocaleString()}`;
    const off = Math.round((1 - basePrice / p.originalPrice) * 100);
    document.getElementById('pdOff').textContent = `${off}% OFF`;
  }

  // Description — parse notes from description string
  const rawDesc = p.description || '';
  const parts = rawDesc.split('|');
  document.getElementById('pdDesc').textContent = parts[0].trim();

  // Fragrance notes
  const topPart   = parts.find(x => x.toLowerCase().includes('top'));
  const heartPart = parts.find(x => x.toLowerCase().includes('heart'));
  const basePart  = parts.find(x => x.toLowerCase().includes('base'));
  if (topPart || heartPart || basePart) {
    document.getElementById('pdNotes').style.display = 'block';
    document.getElementById('pdTop').textContent   = topPart   ? topPart.replace(/top.*?:/i,'').trim() : '—';
    document.getElementById('pdHeart').textContent = heartPart ? heartPart.replace(/heart.*?:/i,'').trim() : '—';
    document.getElementById('pdBase').textContent  = basePart  ? basePart.replace(/base.*?:/i,'').trim() : '—';
  }

  // Build 3 image slots — use product images + fallback placeholders
  const imgSrcs = buildImages(p);
  loadGallery(imgSrcs, p);

  // Size buttons
  if (p.sizes?.length) {
    document.getElementById('pdSizesWrap').style.display = 'block';
    document.getElementById('pdSizes').innerHTML = p.sizes.map((s,i) =>
      `<button class="pd-sz-btn ${i===0?'active':''}" onclick="pdSelectSz(${i},this)">${s.label} — ₹${s.price.toLocaleString()}</button>`
    ).join('');
  }

  // Gift picks
  if (p.category === 'gift' && p.pickCount) {
    document.getElementById('pdGiftWrap').style.display = 'block';
    const opts = p.scentOptions.map(s => `<option value="${s}">${s}</option>`).join('');
    document.getElementById('pdGiftPicks').innerHTML = [1,2,3,4].map(n => `
      <div class="pd-gift-row">
        <span class="pd-gift-num">${n}</span>
        <select class="pd-gift-sel" id="pdgp-${n}" onchange="pdUpdateGiftSum()">
          <option value="">Select fragrance</option>${opts}
        </select>
      </div>`).join('');
  }

  // Scent selector
  if (p.scentOptions && p.category !== 'gift') {
    document.getElementById('pdScentWrap').style.display = 'block';
    document.getElementById('pdScentSel').innerHTML = p.scentOptions.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  // Add to cart button
  document.getElementById('pdAddBtn').onclick = () => pdAddToCart();

  // Image guide code
  const guideCode = `// In js/products.js, find the product "${p.name}" and update its images array:\n\nimages: [\n  "images/${p.id}-1.jpg",   // Image 1 — Front view (replace this file)\n  "images/${p.id}-2.jpg",   // Image 2 — Side / angle view\n  "images/${p.id}-3.jpg"    // Image 3 — Lifestyle shot\n]`;
  document.getElementById('imgGuideCode').textContent = guideCode;
}

function buildImages(p) {
  // Only use the FIRST image (50ml bottle) for gallery — never show bottle-100ml.png as default thumbnail
  // bottle-100ml.png is only shown when 100ml size is selected
  const allImgs = p.images?.length ? [...p.images] : [];
  // Filter out bottle-100ml.png from gallery thumbnails
  const filtered = allImgs.filter(src => !src.includes('bottle-100ml'));
  const base = filtered.length ? filtered : ['images/attar-bottle.png'];
  // Pad to 3 slots with product-specific placeholder paths
  while (base.length < 3) base.push(`images/${p.id}-${base.length + 1}.jpg`);
  return base.slice(0, 3);
}

function loadGallery(imgs, p) {
  const main = document.getElementById('pdMainImgEl');
  const thumbsWrap = document.getElementById('pdThumbs');
  const dotsWrap = document.getElementById('pdDots');
  const labels = ['Front View', 'Side View', 'Lifestyle Shot'];

  // Main image
  main.src = imgs[0];
  main.alt = p.name;
  main.onerror = function() { this.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:var(--muted)"><span style="font-size:48px;opacity:.3">🪔</span><p style="font-size:12px">${p.name}</p></div>`; };

  // Thumbnails
  thumbsWrap.innerHTML = imgs.map((src, i) => `
    <div class="pd-thumb ${i===0?'active':''}" onclick="pdChangeImg(${i})">
      <img src="${src}" alt="${labels[i]}" onerror="this.parentElement.innerHTML='<div class=pd-thumb-ph>🪔</div>'">
    </div>`).join('');

  // Dots
  dotsWrap.innerHTML = imgs.map((_, i) => `<span class="pd-dot ${i===0?'active':''}" onclick="pdChangeImg(${i})"></span>`).join('');

  // Arrows
  document.getElementById('pdPrev').onclick = () => pdSlide(-1, imgs, p);
  document.getElementById('pdNext').onclick = () => pdSlide(1, imgs, p);

  // Touch swipe
  const mainWrap = document.getElementById('pdMainImg');
  let startX = 0;
  mainWrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  mainWrap.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) pdSlide(diff > 0 ? 1 : -1, imgs, p);
  }, {passive:true});
}

function pdChangeImg(idx) {
  pdCurImg = idx;
  const main = document.getElementById('pdMainImgEl');
  const thumbs = document.querySelectorAll('.pd-thumb');
  const dots = document.querySelectorAll('.pd-dot');
  const imgs = buildImages(pdProduct);
  main.src = imgs[idx];
  thumbs.forEach((t,i) => t.classList.toggle('active', i===idx));
  dots.forEach((d,i) => d.classList.toggle('active', i===idx));
}

function pdSlide(dir, imgs) {
  pdCurImg = (pdCurImg + dir + imgs.length) % imgs.length;
  pdChangeImg(pdCurImg);
}

function pdSelectSz(idx, btn) {
  document.querySelectorAll('.pd-sz-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  pdProduct._sz = idx;
  const sz = pdProduct.sizes[idx];
  // Update price
  document.getElementById('pdPrice').textContent = `₹${sz.price.toLocaleString()}`;
  // Swap main image to match bottle size (50ml=original, 100ml=khamra)
  if (sz.img) {
    const mainImg = document.getElementById('pdMainImgEl');
    if (mainImg) {
      mainImg.src = sz.img;
      mainImg.onerror = function() { this.src = 'images/attar-bottle.png'; };
    }
    // Also update active thumbnail
    const thumbs = document.querySelectorAll('.pd-thumb');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
    const dots = document.querySelectorAll('.pd-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    pdCurImg = idx;
  }
}

function pdUpdateGiftSum() {
  const picks = [1,2,3,4].map(n => document.getElementById(`pdgp-${n}`)?.value || '').filter(Boolean);
  const el = document.getElementById('pdGiftSummary');
  if (picks.length) {
    el.textContent = 'Selected: ' + picks.join(', ');
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
}

function pdAddToCart() {
  const p = pdProduct;
  if (!p) return;
  const sIdx = p._sz || 0;
  const sz = p.sizes?.[sIdx];
  const price = sz ? sz.price : p.price;
  const vol = sz ? sz.label : (p.volume || '');

  let scent = null;
  if (p.category === 'gift' && p.pickCount) {
    const picks = [1,2,3,4].map(n => document.getElementById(`pdgp-${n}`)?.value || '').filter(Boolean);
    if (picks.length < 4) { showToast('Please select all 4 fragrances', 'err'); return; }
    scent = picks.join(', ');
  } else if (p.scentOptions) {
    scent = document.getElementById('pdScentSel')?.value || null;
  }

  const key = p.id + (sz?`-${sz.label}`:'') + (scent?`-${scent.substring(0,12)}`:'');
  const ex = cart.find(i => i.key === key);
  if (ex) { ex.qty++; }
  else { cart.push({id:p.id, key, name: p.name + (scent?` (${scent})`:''), price, qty:1, vol}); }
  saveCart(); updateCartUI();
  showToast(`${p.name} added to cart`);
  openCart();
}

function loadRelated(p) {
  const all = [...giftPacks, ...pocketPacks, ...edps, ...edts, ...attars, ...trialPacks];
  const related = all
    .filter(x => x.id !== p.id && (x.category === p.category || x.family === p.family))
    .slice(0, 5);
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;
  grid.innerHTML = related.map(r => {
    const img = r.images?.[0] || 'images/attar-bottle.png';
    const price = r.sizes?.[0]?.price || r.price;
    return `
      <a href="product.html?id=${r.id}" class="rel-card">
        <div class="rel-img"><img src="${img}" alt="${r.name}" onerror="this.src='images/attar-bottle.png'"></div>
        <div class="rel-info">
          <div class="rel-family">${r.family || ''}</div>
          <div class="rel-name">${r.name}</div>
          <div class="rel-price">₹${price.toLocaleString()}</div>
        </div>
      </a>`;
  }).join('');
}
