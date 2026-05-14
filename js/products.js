// ═══════════════════════════════════════════════════════
//  QASR PERFUMES — products.js  (all editable content)
// ═══════════════════════════════════════════════════════

const CONTACT = {
  whatsapp:  "918660453989",
  phone:     "+91 866 045 3989",
  email:     "qasralattar@gmail.com",
  instagram: "https://www.instagram.com/qasr_perfumes_attars",
  facebook:  "https://www.facebook.com/profile.php?id=61585818016523"
};

const saleOffer = {
  active: true,
  title: "Welcome to QASR",
  subtitle: "Get 15% OFF on your first order",
  code: "QASR15",
  buttonText: "Shop the Collection"
};

// ── ATTARS ─────────────────────────────────────────────
const attars = [
  { id:"a1",  name:"Musk Tahara",  family:"Musk",     tagline:"Pure & Sacred",        category:"attars", gender:"Unisex", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: White Musk, Soft Florals · Heart: Jasmine, Neroli · Base: Sandalwood, Ambergris.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a2",  name:"White Oud",    family:"Oud",      tagline:"Light & Luminous",     category:"attars", gender:"Unisex", sizes:[{label:"3ml",price:349},{label:"8ml",price:749},{label:"12ml",price:999}],   description:"Top: White Florals, Bergamot · Heart: White Oud, Iris · Base: Sandalwood, White Musk.", images:["images/attar-bottle.png"], badge:"Best Seller" },
  { id:"a3",  name:"Bin Sheik",    family:"Oud",      tagline:"Royal & Dark",         category:"attars", gender:"Men",    sizes:[{label:"3ml",price:399},{label:"8ml",price:849},{label:"12ml",price:1149}],  description:"Top: Saffron, Black Pepper · Heart: Dark Oud, Rose · Base: Patchouli, Agarwood.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a4",  name:"Zam Zam",      family:"Fresh",    tagline:"Fresh & Spiritual",    category:"attars", gender:"Unisex", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Fresh Aqua, Mint · Heart: White Musk, Clean Florals · Base: Vetiver, Cedarwood.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a5",  name:"Badi Al Oud",  family:"Oud",      tagline:"Deep & Smoky",         category:"attars", gender:"Men",    sizes:[{label:"3ml",price:449},{label:"8ml",price:949},{label:"12ml",price:1299}],  description:"Top: Smoky Oud, Incense · Heart: Dark Rose, Amber · Base: Agarwood, Leather.", images:["images/attar-bottle.png"], badge:"Best Seller" },
  { id:"a6",  name:"Ameer Al Oud", family:"Oud",      tagline:"Princely & Rich",      category:"attars", gender:"Men",    sizes:[{label:"3ml",price:499},{label:"8ml",price:1049},{label:"12ml",price:1399}], description:"Top: Saffron, Cardamom · Heart: Royal Oud, Bulgarian Rose · Base: Sandalwood, Amber.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a7",  name:"Shanaya",      family:"Floral",   tagline:"Feminine & Warm",      category:"attars", gender:"Women",  sizes:[{label:"3ml",price:349},{label:"8ml",price:749},{label:"12ml",price:999}],   description:"Top: Bergamot, Pink Pepper · Heart: Rose, Jasmine · Base: Musk, Vanilla.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a8",  name:"CR7",          family:"Fresh",    tagline:"Bold & Sporty",        category:"attars", gender:"Men",    sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Bergamot, Citrus, Mint · Heart: Lavender, Amber · Base: Vetiver, Cedarwood.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a9",  name:"Hudson Valley", family:"Woody",   tagline:"Crisp & Woody",        category:"attars", gender:"Men",    sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Apple, Green Leaves · Heart: Cedar, Vetiver · Base: Oakmoss, Sandalwood.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a10", name:"Cool Water",   family:"Aquatic",  tagline:"Marine & Aquatic",     category:"attars", gender:"Men",    sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Sea Breeze, Mint, Lavender · Heart: Jasmine, Geranium · Base: Sandalwood, Musk.", images:["images/attar-bottle.png"], badge:"" },
  { id:"a11", name:"Aqua Di Gio",  family:"Aquatic",  tagline:"Mediterranean Fresh",  category:"attars", gender:"Men",    sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Bergamot, Neroli, Sea Notes · Heart: Jasmine, Calone · Base: Cedarwood, White Musk.", images:["images/attar-bottle.png"], badge:"" }
];

// ── EDP & EDT (10 each for testing) ────────────────────
const perfumeData = [
  { name:"White Oud",    family:"Oud",      gender:"Unisex", img:"images/bottle-oud.png",     edpPrice:649, edtPrice:549, top:"White Florals, Bergamot",     heart:"White Oud, Jasmine, Iris",       base:"Sandalwood, White Musk, Ambergris", desc:"Pure, luminous and ethereal. A rare interpretation of oud stripped of darkness — light, clean and hauntingly beautiful.", badge:"Best Seller" },
  { name:"Khamra Qahwa", family:"Oriental", gender:"Men",    img:"images/bottle-luxury.png",  edpPrice:899, edtPrice:749, top:"Saffron, Cardamom, Coffee",   heart:"Oud, Rose, Amber",               base:"Sandalwood, Musk, Vanilla",         desc:"A rich, warming oriental inspired by the scent of Arabic coffee houses and smoky oud.", badge:"" },
  { name:"CR7",          family:"Fresh",    gender:"Men",    img:"images/bottle-fresh.png",   edpPrice:599, edtPrice:499, top:"Bergamot, Citrus, Pepper",    heart:"Lavender, Amber, Spice",         base:"Vetiver, Cedarwood, Musk",          desc:"Bold, confident and magnetic. Built for champions, worn by legends.", badge:"Best Seller" },
  { name:"Shanaya",      family:"Floral",   gender:"Women",  img:"images/bottle-floral.png",  edpPrice:579, edtPrice:479, top:"Bergamot, Pink Pepper, Peach", heart:"Rose, Jasmine, Tuberose",       base:"Musk, Vanilla, Sandalwood",         desc:"Soft, sensual and irresistibly feminine. A warm floral oriental.", badge:"" },
  { name:"Hawas",        family:"Aquatic",  gender:"Men",    img:"images/bottle-fresh.png",   edpPrice:599, edtPrice:499, top:"Cardamom, Lavender, Sea",     heart:"Driftwood, Jasmine, Geranium",   base:"Amberwood, Musk, Vetiver",          desc:"The perfect balance between aquatic freshness and warm sensuality.", badge:"" },
  { name:"Badee Al Oud", family:"Oud",      gender:"Men",    img:"images/bottle-oud.png",     edpPrice:699, edtPrice:599, top:"Smoky Oud, Incense, Saffron", heart:"Dark Rose, Amber, Agarwood",     base:"Patchouli, Leather, Musk",          desc:"A masterpiece of Arabic perfumery. Deep, smoky and intoxicating.", badge:"Best Seller" },
  { name:"1 Million",    family:"Spicy",    gender:"Men",    img:"images/bottle-luxury.png",  edpPrice:649, edtPrice:549, top:"Mandarin, Mint, Grapefruit",  heart:"Cinnamon, Spices, Rose",         base:"Leather, Amber, Patchouli",         desc:"Liquid gold in a bottle. Daring and seductive, radiating confidence.", badge:"" },
  { name:"Ultra Male",   family:"Oriental", gender:"Men",    img:"images/bottle-luxury.png",  edpPrice:669, edtPrice:569, top:"Pear, Pink Pepper, Bergamot", heart:"Lavender, Cinnamon, Iris",       base:"Vanilla, Cedarwood, Amberwood",     desc:"Rich, intense and deeply seductive. A powerhouse oriental for the modern man.", badge:"Best Seller" },
  { name:"Sauvage",      family:"Woody",    gender:"Men",    img:"images/bottle-fresh.png",   edpPrice:599, edtPrice:499, top:"Bergamot, Pepper, Lavender",  heart:"Pepper, Geranium, Vetiver",      base:"Ambroxan, Cedarwood, Patchouli",    desc:"Wild, raw and magnetic. An intense woody aromatic of vast open landscapes.", badge:"" },
  { name:"Gucci Flora",  family:"Floral",   gender:"Women",  img:"images/bottle-floral.png",  edpPrice:589, edtPrice:489, top:"Citrus, Mandarin, Pepper",    heart:"Rose, Peony, Osmanthus",         base:"Sandalwood, Musk, Patchouli",       desc:"A blooming garden of feminine elegance. Fresh, floral and radiant.", badge:"" }
];

const edps = perfumeData.map((p,i) => ({
  id:`e${i+1}`, name:p.name, family:p.family, tagline:p.name, category:"edp", gender:p.gender,
  sizes:[
    {label:"50ml",  price:p.edpPrice,                    img:p.img},
    {label:"100ml", price:Math.round(p.edpPrice * 1.55), img:"images/bottle-100ml.png"}
  ],
  description:`${p.desc} | Top: ${p.top} | Heart: ${p.heart} | Base: ${p.base}`,
  images:[p.img, "images/bottle-100ml.png"], badge:p.badge, originalPrice: Math.round(p.edpPrice * 1.25)
}));

const edts = perfumeData.map((p,i) => ({
  id:`t${i+1}`, name:p.name, family:p.family, tagline:p.name, category:"edt", gender:p.gender,
  sizes:[
    {label:"50ml",  price:p.edtPrice,                    img:p.img},
    {label:"100ml", price:Math.round(p.edtPrice * 1.55), img:"images/bottle-100ml.png"}
  ],
  description:`${p.desc} | Top: ${p.top} | Heart: ${p.heart} | Base: ${p.base}`,
  images:[p.img, "images/bottle-100ml.png"], badge:p.badge, originalPrice: Math.round(p.edtPrice * 1.25)
}));

// ── GIFT PACKS ──────────────────────────────────────────
const giftPacks = [
  { id:"g1", name:"Royal Oud Gift Set",   family:"Oud",     gender:"Men",    tagline:"The Arabic Oud Experience",   category:"gift", price:3999, originalPrice:5499, volume:"Any 4 Ouds · 20ml each",       description:"Pick any 4 Arabic oud fragrances in a premium white gift box.", images:["images/gift-1-a.png"], badge:"", pickCount:4, scentOptions:["Royal Oud","White Oud","Dahnl Al Oud","Badee Al Oud","Bin Sheik","Ameer Al Oud","24K","Sultan","Marj"] },
  { id:"g2", name:"Exclusive Gift Pack",  family:"Mixed",   gender:"Unisex", tagline:"4 Occasional Fragrances",     category:"gift", price:4499, originalPrice:5999, volume:"Any 4 Scents · 20ml each",     description:"Pick any 4 occasion-ready fragrances for any event.", images:["images/gift-2-a.png"], badge:"Best Seller", pickCount:4, scentOptions:["Wisal","Khamra Qahwa","Shanaya","Sauvage","Hudson Valley","9PM","Ultra Male","Hawas","CR7","1 Million","Aqua Di Gio","Pour Homme","Imagination","YSL-Y","Zam Zam","Gucci Flora","212 Men","Blue De Chanel"] },
  { id:"g3", name:"QASR Best Sellers",    family:"Mixed",   gender:"Unisex", tagline:"Our Most Loved Collection",   category:"gift", price:4999, originalPrice:6499, volume:"Any 4 Bestsellers · 20ml each", description:"Pick any 4 from our most-loved fragrances.", images:["images/gift-3-a.png"], badge:"", pickCount:4, scentOptions:["Wisal Dahab","CR7","1 Million","Musk Rijali","Khamra Qahwa","Badee Al Oud","Cool Water","Polo Sportz"] },
  { id:"g4", name:"Exclusive Attar Pack", family:"Attar",   gender:"Unisex", tagline:"4 Premium Attar Crystals",    category:"gift", price:2999, originalPrice:3999, volume:"Any 4 Attars · 3ml each",      description:"Pick any 4 handcrafted attars in exquisite 3ml crystal bottles.", images:["images/gift-4-a.png","images/gift-4-b.jpg"], badge:"", pickCount:4, scentOptions:["Musk Tahara","White Oud","Bin Sheik","Zam Zam","Badi Al Oud","Ameer Al Oud","Shanaya","CR7","Hudson Valley","Cool Water","Aqua Di Gio"] }
];

// ── POCKET SPRAY ────────────────────────────────────────
const pocketPacks = [{
  id:"pk1", name:"Pocket Spray", family:"Fresh", gender:"Unisex", tagline:"10ml · On-the-Go", category:"pocket",
  price:150, originalPrice:299, volume:"10ml",
  description:"Compact 10ml pocket spray. Fits in any pocket or handbag. Choose from 22 signature fragrances.",
  images:["images/pocket-spray-a.png","images/pocket-spray-b.png"], badge:"",
  scentOptions:["White Oud","CR7","Shanaya","Hawas","Badee Al Oud","1 Million","Sultan","Ultra Male","YSL-Y","Aqua Di Gio","Pour Homme","Hudson Valley","Bin Sheik","Imagination","9PM","24K","Sauvage","Tam Dao","212 Men","Cool Water","Le Male","Gucci Flora"]
}];

// ── TRIAL PACKS ─────────────────────────────────────────
const trialData = [
  {name:"White Oud",    img:"images/trial-wisak-0.png",  price:350, family:"Oud",      gender:"Unisex"},
  {name:"Le Male",      img:"images/trial-wisak-21.png", price:280, family:"Oriental",  gender:"Men"},
  {name:"Cool Water",   img:"images/trial-wisak-20.png", price:220, family:"Aquatic",   gender:"Men"},
  {name:"212 Men",      img:"images/trial-wisak-19.png", price:240, family:"Fresh",     gender:"Men"},
  {name:"Tam Dao",      img:"images/trial-wisak-18.png", price:260, family:"Woody",     gender:"Unisex"},
  {name:"Sauvage",      img:"images/trial-wisak-17.png", price:300, family:"Woody",     gender:"Men"},
  {name:"24K",          img:"images/trial-wisak-16.png", price:320, family:"Oriental",  gender:"Men"},
  {name:"9PM",          img:"images/trial-wisak-15.png", price:340, family:"Oriental",  gender:"Men"},
  {name:"Imagination",  img:"images/trial-wisak-14.png", price:250, family:"Fresh",     gender:"Men"},
  {name:"Bin Sheik",    img:"images/trial-wisak-13.png", price:380, family:"Oud",       gender:"Men"},
  {name:"Hudson Valley",img:"images/trial-wisak-12.png", price:260, family:"Woody",     gender:"Men"},
  {name:"Pour Homme",   img:"images/trial-wisak-11.png", price:270, family:"Classic",   gender:"Men"},
  {name:"Aqua Di Gio",  img:"images/trial-wisak-10.png", price:240, family:"Aquatic",   gender:"Men"},
  {name:"YSL-Y",        img:"images/trial-wisak-9.png",  price:260, family:"Fresh",     gender:"Men"},
  {name:"Ultra Male",   img:"images/trial-wisak-8.png",  price:350, family:"Oriental",  gender:"Men"},
  {name:"Sultan",       img:"images/trial-wisak-7.png",  price:370, family:"Oud",       gender:"Men"},
  {name:"1 Million",    img:"images/trial-wisak-6.png",  price:340, family:"Spicy",     gender:"Men"},
  {name:"Badee Al Oud", img:"images/trial-wisak-5.png",  price:390, family:"Oud",       gender:"Men"},
  {name:"Hawas",        img:"images/trial-wisak-4.png",  price:360, family:"Aquatic",   gender:"Men"},
  {name:"Shanaya",      img:"images/trial-wisak-3.png",  price:280, family:"Floral",    gender:"Women"},
  {name:"CR7",          img:"images/trial-wisak-2.png",  price:260, family:"Fresh",     gender:"Men"},
  {name:"Khamra Qahwa", img:"images/trial-wisak-21.png", price:400, family:"Oriental",  gender:"Men"}
];
const trialPacks = trialData.map((t,i) => ({
  id:`tr${i+1}`, name:`${t.name}`, family:t.family, tagline:"20ml Trial Size",
  category:"trial", gender:t.gender, price:t.price, originalPrice:499, volume:"20ml",
  description:`Experience ${t.name} in a sleek 20ml travel bottle. Try before you commit.`,
  images:[t.img], badge:""
}));

// ── REVIEWS ─────────────────────────────────────────────
const reviews = [
  {name:"Aisha M.",      location:"Dubai",     rating:5, text:"Oud Al Layl is absolutely mesmerising. Getting compliments everywhere!"},
  {name:"Rohan K.",      location:"Mumbai",    rating:5, text:"The packaging is premium and the fragrance lasts all day. Totally worth it."},
  {name:"Fatima S.",     location:"Hyderabad", rating:5, text:"Musk Tahara smells divine. Very authentic attar, not synthetic at all."},
  {name:"Arjun P.",      location:"Bangalore", rating:5, text:"Fast delivery, beautiful bottle and incredible fragrance. 10 out of 10!"},
  {name:"Sara Al Farsi", location:"Sharjah",   rating:5, text:"Finally a brand that understands real Arabic perfumery. Sultan is a masterpiece."},
  {name:"Imran T.",      location:"Chennai",   rating:5, text:"Ordered the Exclusive Attar Pack for my father. He absolutely loved it!"}
];

const allProducts = [...giftPacks, ...pocketPacks, ...edps, ...edts, ...attars, ...trialPacks];
