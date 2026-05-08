// ╔══════════════════════════════════════════════════════════════╗
// ║  QASR PERFUMES — products.js                                ║
// ╚══════════════════════════════════════════════════════════════╝

const CONTACT = {
  whatsapp:  "918660453989",
  phone:     "+91 866 045 3989",
  email:     "qasralattar@gmail.com",
  instagram: "https://www.instagram.com/qasr_perfumes_attars",
  facebook:  "https://www.facebook.com/profile.php?id=61585818016523"
};

const saleOffer = {
  active: true, title: "Welcome to QASR",
  subtitle: "Get 15% OFF on your first order",
  code: "QASR15", buttonText: "Shop the Collection"
};

// ── ATTARS (3ml / 8ml / 12ml) ────────────────────────────────
const attars = [
  { id:"a1",  name:"Musk Tahara",   tagline:"Pure & Sacred",       category:"attars", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: White Musk, Soft Florals · Heart: Jasmine, Neroli · Base: Sandalwood, Ambergris. A divine, skin-close sacred musk.", images:["images/attar-bottle.png"] },
  { id:"a2",  name:"White Oud",     tagline:"Light & Luminous",    category:"attars", sizes:[{label:"3ml",price:349},{label:"8ml",price:749},{label:"12ml",price:999}],   description:"Top: White Florals, Bergamot · Heart: White Oud, Iris · Base: Sandalwood, White Musk. Pure, ethereal and hauntingly beautiful.", images:["images/attar-bottle.png"] },
  { id:"a3",  name:"Bin Sheik",     tagline:"Royal & Dark",        category:"attars", sizes:[{label:"3ml",price:399},{label:"8ml",price:849},{label:"12ml",price:1149}],  description:"Top: Saffron, Black Pepper · Heart: Dark Oud, Rose · Base: Patchouli, Agarwood. Bold, commanding and truly regal.", images:["images/attar-bottle.png"] },
  { id:"a4",  name:"Zam Zam",       tagline:"Fresh & Spiritual",   category:"attars", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Fresh Aqua, Mint · Heart: White Musk, Clean Florals · Base: Vetiver, Cedarwood. Spiritual, clean and pure.", images:["images/attar-bottle.png"] },
  { id:"a5",  name:"Badi Al Oud",   tagline:"Deep & Smoky",        category:"attars", sizes:[{label:"3ml",price:449},{label:"8ml",price:949},{label:"12ml",price:1299}],  description:"Top: Smoky Oud, Incense · Heart: Dark Rose, Amber · Base: Agarwood, Leather. Intense, primal and unforgettable.", images:["images/attar-bottle.png"] },
  { id:"a6",  name:"Ameer Al Oud",  tagline:"Princely & Rich",     category:"attars", sizes:[{label:"3ml",price:499},{label:"8ml",price:1049},{label:"12ml",price:1399}], description:"Top: Saffron, Cardamom · Heart: Royal Oud, Bulgarian Rose · Base: Sandalwood, Amber. Luxurious and commanding.", images:["images/attar-bottle.png"] },
  { id:"a7",  name:"Shanaya",       tagline:"Feminine & Warm",     category:"attars", sizes:[{label:"3ml",price:349},{label:"8ml",price:749},{label:"12ml",price:999}],   description:"Top: Bergamot, Pink Pepper · Heart: Rose, Jasmine · Base: Musk, Vanilla. Soft, sensual and irresistibly feminine.", images:["images/attar-bottle.png"] },
  { id:"a8",  name:"CR7",           tagline:"Bold & Sporty",       category:"attars", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Bergamot, Citrus, Mint · Heart: Lavender, Amber · Base: Vetiver, Cedarwood. Built for champions, worn by legends.", images:["images/attar-bottle.png"] },
  { id:"a9",  name:"Hudson Valley",  tagline:"Crisp & Woody",      category:"attars", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Apple, Green Leaves · Heart: Cedar, Vetiver · Base: Oakmoss, Sandalwood. Clean, grounded and elegant.", images:["images/attar-bottle.png"] },
  { id:"a10", name:"Cool Water",    tagline:"Marine & Aquatic",    category:"attars", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Sea Breeze, Mint, Lavender · Heart: Jasmine, Geranium · Base: Sandalwood, Musk. Cool, clean and refreshing.", images:["images/attar-bottle.png"] },
  { id:"a11", name:"Aqua Di Gio",   tagline:"Mediterranean Fresh", category:"attars", sizes:[{label:"3ml",price:299},{label:"8ml",price:649},{label:"12ml",price:899}],   description:"Top: Bergamot, Neroli, Sea Notes · Heart: Jasmine, Calone · Base: Cedarwood, White Musk. Iconic and universally loved.", images:["images/attar-bottle.png"] }
];

// ── PERFUME DATA ─────────────────────────────────────────────
// Images: bottle-luxury (copper rope cap, square) = seductive/nocturnal
//         bottle-oud    (tall gold cap, amber)    = oud/oriental
//         bottle-floral (round disc cap, gold)    = floral/feminine
//         bottle-fresh  (wood cap, clear)          = fresh/aquatic/woody
//         bottle-100ml  (diamond black cap, big)  = Khamra Qahwa signature 100ml
// ALL EDP/EDT = 70ml fixed price
const perfumeData = [
  // NAME              TAGLINE                   IMAGE                      EDP₹  EDT₹   TOP NOTES                     HEART NOTES                    BASE NOTES                     DESCRIPTION
  ["White Oud",       "Pure & Ethereal",        "images/bottle-oud.png",   649,  549,  "White Florals, Bergamot",    "White Oud, Jasmine, Iris",    "Sandalwood, White Musk",      "Pure, luminous and ethereal. A rare interpretation of oud stripped of darkness — light, clean and hauntingly beautiful."],
  ["Khamra Qahwa",    "Rich & Warming",         "images/bottle-100ml.png", 899,  749,  "Saffron, Cardamom, Coffee",  "Oud, Rose, Amber",            "Sandalwood, Musk, Vanilla",   "A rich, warming oriental inspired by the scent of Arabic coffee houses and smoky oud. Deep and intoxicating."],
  ["CR7",             "Bold & Champion",        "images/bottle-fresh.png", 599,  499,  "Bergamot, Citrus, Pepper",   "Lavender, Amber, Spice",      "Vetiver, Cedarwood, Musk",    "Bold, confident and magnetic. Built for champions, worn by legends. A modern oriental that commands attention."],
  ["Shanaya",         "Feminine & Warm",        "images/bottle-floral.png",579,  479,  "Bergamot, Pink Pepper, Peach","Rose, Jasmine, Tuberose",    "Musk, Vanilla, Sandalwood",   "Soft, sensual and irresistibly feminine. A warm floral oriental that wraps you in timeless elegance."],
  ["Hawas",           "Fresh & Sensual",        "images/bottle-fresh.png", 599,  499,  "Cardamom, Lavender, Sea",    "Driftwood, Jasmine, Geranium","Amberwood, Musk, Vetiver",    "The perfect balance between aquatic freshness and warm sensuality. Bold yet breezy, seductive yet clean."],
  ["Badee Al Oud",    "Deep & Smoky",           "images/bottle-oud.png",   699,  599,  "Smoky Oud, Incense, Saffron","Dark Rose, Amber, Agarwood",  "Patchouli, Leather, Musk",    "A masterpiece of Arabic perfumery. Deep, smoky and intoxicating — the scent of ancient Arabia."],
  ["1 Million",       "Gold & Spicy",           "images/bottle-luxury.png",649,  549,  "Blood Mandarin, Grapefruit", "Cinnamon, Spices, Rose",      "Leather, Amber, Patchouli",   "Liquid gold in a bottle. Daring and seductive, it radiates confidence and irresistible luxury."],
  ["Sultan",          "Royal & Majestic",       "images/bottle-oud.png",   679,  579,  "Bergamot, Saffron, Cardamom","Oud, Rose, Sandalwood",       "Amber, Musk, Agarwood",       "Majestic, powerful and regal. A fragrance worthy of a sultan — commanding respect wherever you go."],
  ["Ultra Male",      "Intense & Seductive",    "images/bottle-luxury.png",669,  569,  "Pear, Pink Pepper, Bergamot","Lavender, Cinnamon, Iris",    "Vanilla, Cedarwood, Amberwood","Rich, intense and deeply seductive. A powerhouse oriental for the modern man who owns every room."],
  ["YSL-Y",           "Fresh & Modern",         "images/bottle-fresh.png", 589,  489,  "Bergamot, Ginger, Apple",    "Sage, Geranium, Juniper",     "Cedarwood, Amberwood, Tonka", "A modern, fresh and magnetic fragrance. Clean, confident and perfectly crafted for the contemporary man."],
  ["Aqua Di Gio",     "Mediterranean Fresh",    "images/bottle-fresh.png", 579,  479,  "Bergamot, Neroli, Sea Notes","Jasmine, Calone, Rosemary",   "Cedarwood, Patchouli, Musk",  "Mediterranean sunshine in a bottle. Iconic, fresh and universally beloved — a timeless aquatic masterpiece."],
  ["Pour Homme",      "Classic & Timeless",     "images/bottle-luxury.png",629,  529,  "Bergamot, Lemon, Lavender",  "Geranium, Patchouli, Oakmoss","Vetiver, Sandalwood, Musk",   "A timeless classic for the refined gentleman. Sophisticated, clean and effortlessly elegant."],
  ["Hudson Valley",   "Crisp & Woody",          "images/bottle-fresh.png", 589,  489,  "Apple, Fresh Air, Green Leaf","Cedar, Vetiver, Violet",      "Oakmoss, Sandalwood, Musk",   "Inspired by crisp autumn air — a fresh woody fragrance of open landscapes, fallen leaves and quiet forests."],
  ["Bin Sheik",       "Royal Arabic",           "images/bottle-oud.png",   659,  559,  "Saffron, Black Pepper, Cardamom","Dark Oud, Rose, Amber",  "Patchouli, Agarwood, Leather","A royal Arabic masterpiece. Dark, commanding and deeply sophisticated — the scent of desert royalty."],
  ["Imagination",     "Fresh & Creative",       "images/bottle-fresh.png", 569,  469,  "Grapefruit, Bergamot, Sea",  "Jasmine, Geranium, Cedar",    "Musk, Amberwood, Oakmoss",    "A creative, fresh and uplifting fragrance that sparks the imagination and lifts the spirit."],
  ["9PM",             "Intense & Nocturnal",    "images/bottle-luxury.png",649,  549,  "Lemon, Pink Pepper, Cardamom","Lavender, Jasmine, Geranium","Vanilla, Tonka Bean, Patchouli","Made for the night. Intense, warm and deeply seductive — the fragrance for unforgettable evenings."],
  ["24K",             "Golden & Luxurious",     "images/bottle-luxury.png",669,  569,  "Bergamot, Lemon, Mandarin",  "Saffron, Rose, Amber",        "Oud, Sandalwood, Musk",       "Liquid luxury inspired by 24-karat gold — rich, warm and opulent. A fragrance that radiates prosperity."],
  ["Sauvage",         "Wild & Magnetic",        "images/bottle-fresh.png", 599,  499,  "Bergamot, Pepper, Lavender", "Pepper, Geranium, Vetiver",   "Ambroxan, Cedarwood, Patchouli","Wild, raw and magnetic. An intense woody aromatic that captures the spirit of vast open landscapes."],
  ["Tam Dao",         "Woody & Sacred",         "images/bottle-fresh.png", 569,  469,  "Bergamot, Myrtle, Rosewood", "Sandalwood, Cypress, Milky",  "White Musk, Cedarwood",       "A sacred woody fragrance centred around precious sandalwood. Serene, meditative and deeply comforting."],
  ["212 Men",         "Urban & Fresh",          "images/bottle-fresh.png", 569,  469,  "Lavender, Cardamom, Bergamot","Violet, White Tea, Cactus",  "Sandalwood, Musk, Vetiver",   "The urban gentleman's signature. Fresh, modern and effortlessly cool — made for the city."],
  ["Cool Water",      "Marine & Refreshing",    "images/bottle-fresh.png", 579,  479,  "Sea Breeze, Mint, Lavender", "Jasmine, Geranium, Rosemary", "Sandalwood, Cedarwood, Musk", "A timeless aquatic classic. Cool, clean and invigorating — like diving into the open ocean on a perfect day."],
  ["Le Male",         "Bold & Masculine",       "images/bottle-luxury.png",649,  549,  "Mint, Lavender, Bergamot",   "Cumin, Cinnamon, Orange Blossom","Vanilla, Sandalwood, Musk","An iconic masculine fragrance. Bold, sensual and magnetic — a unique blend of freshness and warm sensuality."],
  ["Gucci Flora",     "Floral & Feminine",      "images/bottle-floral.png",589,  489,  "Citrus, Mandarin, Pink Pepper","Rose, Peony, Osmanthus",    "Sandalwood, Musk, Patchouli", "A blooming garden of feminine elegance. Fresh, floral and radiant — the perfect expression of feminine grace."]
];

// Build EDP & EDT arrays — ALL strictly 70ml
const edps = perfumeData.map(([name,tagline,img,edpPrice,,top,heart,base,desc], i) => ({
  id:`e${i+1}`, name, tagline, category:"edp",
  sizes:[{label:"70ml", price:edpPrice}],
  description:`${desc} | Top Notes: ${top} | Heart Notes: ${heart} | Base Notes: ${base}`,
  images:[img]
}));

const edts = perfumeData.map(([name,tagline,img,,edtPrice,top,heart,base,desc], i) => ({
  id:`t${i+1}`, name, tagline, category:"edt",
  sizes:[{label:"70ml", price:edtPrice}],
  description:`${desc} | Top Notes: ${top} | Heart Notes: ${heart} | Base Notes: ${base}`,
  images:[img]
}));

// ── GIFT PACKS — professional 4-slot picker ──────────────────
const giftPacks = [
  {
    id:"g1", name:"Royal Oud Gift Set", tagline:"The Arabic Oud Experience", category:"gift",
    price:3999, originalPrice:5499, volume:"Choose Any 4 · 20ml each",
    description:"A regal collection — select any 4 Arabic oud fragrances, beautifully presented in a premium white gift box.",
    images:["images/gift-1-a.png"],
    scentOptions:["Royal Oud","White Oud","Dahnl Al Oud","Badee Al Oud","Bin Sheik","Ameer Al Oud","24K","Sultan","Marj"],
    pickCount:4
  },
  {
    id:"g2", name:"Exclusive Gift Pack", tagline:"4 Occasional Fragrances", category:"gift",
    price:4499, originalPrice:5999, volume:"Choose Any 4 · 20ml each",
    description:"Select any 4 occasion-ready fragrances for parties, weddings, clubbing and special evenings.",
    images:["images/gift-2-a.png"],
    scentOptions:["Wisal","Khamra Qahwa","Shanaya","Sauvage","Hudson Valley","9PM","Ultra Male","Hawas","CR7","1 Million","Aqua Di Gio","Pour Homme","Imagination","YSL-Y","Zam Zam","Gucci Flora","212 Men","Blue De Chanel"],
    pickCount:4
  },
  {
    id:"g3", name:"QASR Best Sellers", tagline:"Our Most Loved Collection", category:"gift",
    price:4999, originalPrice:6499, volume:"Choose Any 4 · 20ml each",
    description:"Select any 4 from our most-loved fragrances — handpicked by thousands of loyal customers.",
    images:["images/gift-3-a.png"],
    scentOptions:["Wisal Dahab","CR7","1 Million","Musk Rijali","Khamra Qahwa","Badee Al Oud","Cool Water","Polo Sportz"],
    pickCount:4
  },
  {
    id:"g4", name:"Exclusive Attar Pack", tagline:"4 Premium Attar Crystals", category:"gift",
    price:2999, originalPrice:3999, volume:"Choose Any 4 Attars · 3ml each",
    description:"Select any 4 handcrafted attars in exquisite 3ml green crystal bottles, presented in a luxurious black QASR gift box.",
    images:["images/gift-4-a.png","images/gift-4-b.jpg"],
    scentOptions:["Musk Tahara","White Oud","Bin Sheik","Zam Zam","Badi Al Oud","Ameer Al Oud","Shanaya","CR7","Hudson Valley","Cool Water","Aqua Di Gio"],
    pickCount:4
  }
];

// ── POCKET SPRAY ─────────────────────────────────────────────
const pocketPacks = [{
  id:"tr_pocket", name:"Pocket Spray", tagline:"Your Scent, Anywhere — 10ml",
  category:"pocket", price:150, originalPrice:299, volume:"10ml",
  description:"A sleek compact 10ml pocket spray. Fits in any pocket or handbag. Choose from 22 signature fragrances.",
  images:["images/pocket-spray-a.png","images/pocket-spray-b.png"],
  scentOptions:["White Oud","CR7","Shanaya","Hawas","Badee Al Oud","1 Million","Sultan","Ultra Male","YSL-Y","Aqua Di Gio","Pour Homme","Hudson Valley","Bin Sheik","Imagination","9PM","24K","Sauvage","Tam Dao","212 Men","Cool Water","Le Male","Gucci Flora"]
}];

// ── TRIAL PACKS (20ml, ₹200–₹400) ───────────────────────────
const trialData = [
  {name:"White Oud",    img:"images/trial-wisak-0.png",  price:350},
  {name:"Le Male",      img:"images/trial-wisak-21.png", price:280},
  {name:"Cool Water",   img:"images/trial-wisak-20.png", price:220},
  {name:"212 Men",      img:"images/trial-wisak-19.png", price:240},
  {name:"Tam Dao",      img:"images/trial-wisak-18.png", price:260},
  {name:"Sauvage",      img:"images/trial-wisak-17.png", price:300},
  {name:"24K",          img:"images/trial-wisak-16.png", price:320},
  {name:"9PM",          img:"images/trial-wisak-15.png", price:340},
  {name:"Imagination",  img:"images/trial-wisak-14.png", price:250},
  {name:"Bin Sheik",    img:"images/trial-wisak-13.png", price:380},
  {name:"Hudson Valley",img:"images/trial-wisak-12.png", price:260},
  {name:"Pour Homme",   img:"images/trial-wisak-11.png", price:270},
  {name:"Aqua Di Gio",  img:"images/trial-wisak-10.png", price:240},
  {name:"YSL-Y",        img:"images/trial-wisak-9.png",  price:260},
  {name:"Ultra Male",   img:"images/trial-wisak-8.png",  price:350},
  {name:"Sultan",       img:"images/trial-wisak-7.png",  price:370},
  {name:"1 Million",    img:"images/trial-wisak-6.png",  price:340},
  {name:"Badee Al Oud", img:"images/trial-wisak-5.png",  price:390},
  {name:"Hawas",        img:"images/trial-wisak-4.png",  price:360},
  {name:"Shanaya",      img:"images/trial-wisak-3.png",  price:280},
  {name:"CR7",          img:"images/trial-wisak-2.png",  price:260},
  {name:"Khamra Qahwa", img:"images/trial-wisak-21.png", price:400}
];
const trialPacks = trialData.map((t,i) => ({
  id:`tr${i+1}`, name:`${t.name} — Trial`, tagline:"20ml Travel Size",
  category:"trial", price:t.price, originalPrice:499, volume:"20ml",
  description:`Experience ${t.name} in a sleek 20ml travel bottle. Perfect for trying before committing to full size.`,
  images:[t.img]
}));

// ── REVIEWS ──────────────────────────────────────────────────
const reviews = [
  {name:"Aisha M.",      location:"Dubai",     rating:5, text:"Oud Al Layl is absolutely mesmerising. Getting compliments everywhere I go!"},
  {name:"Rohan K.",      location:"Mumbai",    rating:5, text:"The packaging is premium and the fragrance lasts all day. Totally worth every rupee."},
  {name:"Fatima S.",     location:"Hyderabad", rating:5, text:"Musk Tahara smells divine. Very authentic attar, not synthetic at all. Love it!"},
  {name:"Arjun P.",      location:"Bangalore", rating:5, text:"Fast delivery, beautiful bottle and incredible fragrance. 10 out of 10!"},
  {name:"Sara Al Farsi", location:"Sharjah",   rating:5, text:"Finally a brand that understands real Arabic perfumery. Sultan is a masterpiece."},
  {name:"Imran T.",      location:"Chennai",   rating:5, text:"Ordered the Exclusive Attar Pack for my father. He absolutely loved it!"}
];

const allProducts = [...giftPacks, ...pocketPacks, ...edps, ...edts, ...attars, ...trialPacks];
