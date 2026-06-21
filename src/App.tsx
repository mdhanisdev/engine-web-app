/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, SearchFilters } from './types';
import { PRODUCTS, TESTIMONIALS, BRANDS, ENGINE_CODES } from './data';
import { TRANSLATIONS, formatPrice, LangType, CurrencyType } from './translations';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CustomPartRequest from './components/CustomPartRequest';
import { 
  Search, 
  ChevronDown, 
  ArrowRight,
  ArrowLeft,
  Star,
  BadgeCheck,
  Instagram,
  Linkedin,
  Send,
  Phone,
  ArrowUp,
  Cog,
  Settings2,
  Timer,
  CircleDot,
  Disc,
  Droplets,
  Fuel,
  Wrench,
  Sparkles,
  Info
} from 'lucide-react';

export default function App() {
  // --- Persistent State Variables ---
  const [language, setLanguage] = useState<LangType>(() => {
    const saved = localStorage.getItem('oem_yardak_lang');
    return (saved as LangType) || 'EN';
  });

  const [currency, setCurrency] = useState<CurrencyType>(() => {
    const saved = localStorage.getItem('oem_yardak_currency');
    return (saved as CurrencyType) || 'IRT';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('oem_yardak_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Active Search Filters ---
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    brand: 'all',
    compatibility: 'all',
    sortBy: 'relevance'
  });

  // --- Modal & Drawer States ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // --- Multi-item Carousel Index ---
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('oem_yardak_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('oem_yardak_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('oem_yardak_cart', JSON.stringify(cart));
  }, [cart]);

  const t = TRANSLATIONS[language];
  const isRTL = language === 'FA';

  // --- Handlers ---
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Fire elegant toast message
    setToastMessage(isRTL ? `قطعه ${product.name} به سبد استعلام اضافه شد` : `${product.name} added to sourcing cart`);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  // --- Filters Pipeline ---
  const filteredProducts = PRODUCTS.filter(product => {
    // Search query matches title, partNumber, description or brand
    const matchesQuery = 
      filters.query === '' ||
      product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(filters.query.toLowerCase()));

    // Category match
    const matchesCategory = 
      filters.category === 'all' || 
      product.category === filters.category;

    // Brand match
    const matchesBrand = 
      filters.brand === 'all' || 
      product.brand === filters.brand;

    // Engine Compatibility match
    const matchesCompatibility = 
      filters.compatibility === 'all' ||
      product.engineCode.some(code => code.toLowerCase() === filters.compatibility.toLowerCase());

    return matchesQuery && matchesCategory && matchesBrand && matchesCompatibility;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') {
      return a.priceIRT - b.priceIRT;
    }
    if (filters.sortBy === 'price-desc') {
      return b.priceIRT - a.priceIRT;
    }
    if (filters.sortBy === 'discount') {
      return (b.savePercentage || 0) - (a.savePercentage || 0);
    }
    // relevance - featured first
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Dynamic values
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Category Selector triggers
  const categoriesList = [
    { id: 'all', icon: Cog, label: isRTL ? 'همه قطعات' : 'All' },
    { id: 'engine', icon: Cog, label: isRTL ? 'موتور' : 'Engine' },
    { id: 'gearbox', icon: Settings2, label: isRTL ? 'گیربکس' : 'Gearbox' },
    { id: 'timing', icon: Timer, label: isRTL ? 'کیت تایم' : 'Timing' },
    { id: 'bearings', icon: CircleDot, label: isRTL ? 'برینگ ها' : 'Bearings' },
    { id: 'clutch', icon: Disc, label: isRTL ? 'کلاچ' : 'Clutch' },
    { id: 'gaskets', icon: Droplets, label: isRTL ? 'واشرها' : 'Gaskets' },
    { id: 'fuel', icon: Fuel, label: isRTL ? 'سوخت‌رسانی' : 'Fuel' },
    { id: 'tools', icon: Wrench, label: isRTL ? 'ابزارآلات' : 'Tools' }
  ];

  return (
    <div className="bg-[#c2c9c4] text-zinc-900 antialiased min-h-screen relative overflow-x-hidden font-sans pb-10">
      
      {/* Dynamic Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-950 text-white border border-lime-400/40 px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 text-xs md:text-sm font-semibold tracking-tight"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-lime-400 animate-ping shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Vintage Background Watermarks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none opacity-[0.04] z-0">
        <div className="absolute top-12 left-10 text-zinc-900 leading-none font-archivo font-black text-[18vw]">
          OEM<br />YADAK<br />PARTS<br />ENGINE
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <Header 
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        logoClick={() => setFilters({ query: '', category: 'all', brand: 'all', compatibility: 'all', sortBy: 'relevance' })}
      />

      {/* ============ MAIN HERO CONTAINER ============ */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="rounded-[2rem] bg-zinc-950 overflow-hidden shadow-2xl border border-white/5 relative">
          
          {/* Hero background gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 pointer-events-none" />
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(163,230,53,0.35), transparent 60%)' }} />

          {/* Hero Content Section */}
          <div className="relative px-5 sm:px-8 pt-16 pb-12 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-lime-400 font-black mb-3 font-mono">
                {t.precisionEngineered}
              </p>
              
              <h1 className="text-white tracking-tight leading-[0.9] font-archivo select-none">
                <span className="block text-4xl sm:text-6xl lg:text-7xl font-black">
                  {isRTL ? 'قطعات تخصصی موتور' : 'ENGINE &'}
                </span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl font-black text-lime-400 mt-1">
                  {isRTL ? 'گیربکس و کلاچ' : 'GEARBOX'}
                </span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
                {isRTL 
                  ? 'نمایش بیش از ۹۰۰ قطعه الکترونیکی، واشرجات و کیت زمان‌بندی موتور با تاییدیه اصالت. شناسنامه کامل ویژگی‌های مهندسی.' 
                  : '900+ specialized, knowledge-based parts. Standardized imagery, technical specs and instant availability — all in one place.'
                }
              </p>
            </motion.div>

            {/* Interactive Search Bar Panel */}
            <div className="mt-10 max-w-2xl mx-auto relative z-20">
              <div className="flex items-stretch rounded-2xl sm:rounded-full bg-white p-1.5 shadow-2xl border border-zinc-200">
                {/* Advanced Category Select widget within search */}
                <div className="hidden sm:flex items-center gap-1.5 px-5 text-xs font-bold text-zinc-700 border-r border-zinc-200 hover:text-zinc-950 transition cursor-pointer select-none">
                  <span className="truncate max-w-[110px]">
                    {filters.category === 'all' ? t.all : t[filters.category] || filters.category}
                  </span>
                  <ChevronDown className="h-3 w-3 text-zinc-400" />
                  
                  {/* Category Fast Selection Dropdown */}
                  <select 
                    value={filters.category}
                    onChange={(e) => setFilters(p => ({ ...p, category: e.target.value }))}
                    className="absolute opacity-0 cursor-pointer text-xs h-8 w-28 bg-white"
                  >
                    <option value="all">{isRTL ? 'همه دسته‌ها' : 'All Categories'}</option>
                    <option value="engine">{t.engineParts}</option>
                    <option value="gearbox">{t.gearbox}</option>
                    <option value="timing">{t.timingKits}</option>
                    <option value="bearings">{t.bearings}</option>
                    <option value="clutch">{t.clutch}</option>
                    <option value="gaskets">{t.gaskets}</option>
                    <option value="fuel">{t.fuel}</option>
                    <option value="tools">{t.tools}</option>
                  </select>
                </div>

                {/* Main Input */}
                <div className="flex-1 flex items-center relative">
                  <input
                    type="text"
                    value={filters.query}
                    onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                    placeholder={t.searchPlaceholder}
                    className="w-full px-4 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 bg-transparent focus:outline-none min-w-0"
                  />
                  {filters.query && (
                    <button 
                      onClick={() => setFilters(p => ({ ...p, query: '' }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs font-bold"
                    >
                      {isRTL ? 'حذف' : 'Clear'}
                    </button>
                  )}
                </div>

                <div className="bg-zinc-950 hover:bg-zinc-800 rounded-xl sm:rounded-full px-4 flex items-center justify-center text-lime-400 transition cursor-pointer">
                  <Search className="h-4 w-4 shrink-0" />
                </div>
              </div>

              {/* Popular quick-fill items */}
              <p className="mt-3 text-[11px] text-zinc-500 font-mono">
                {t.popular}:{' '}
                <span 
                  onClick={() => setFilters(p => ({ ...p, query: 'Timing Kit' }))}
                  className="text-zinc-300 hover:text-lime-400 cursor-pointer underline decoration-dotted decoration-zinc-600"
                >
                  Timing Kit EF7
                </span>{' '}
                ·{' '}
                <span 
                  onClick={() => setFilters(p => ({ ...p, query: 'Clutch AT6' }))}
                  className="text-zinc-300 hover:text-lime-400 cursor-pointer underline decoration-dotted decoration-zinc-600"
                >
                  Clutch AT6
                </span>{' '}
                ·{' '}
                <span 
                  onClick={() => setFilters(p => ({ ...p, query: 'Crankshaft' }))}
                  className="text-zinc-300 hover:text-lime-400 cursor-pointer underline decoration-dotted decoration-zinc-600"
                >
                  Crankshaft Bearings
                </span>{' '}
                ·{' '}
                <span 
                  onClick={() => setFilters(p => ({ ...p, query: 'CVT Belt' }))}
                  className="text-zinc-300 hover:text-lime-400 cursor-pointer underline decoration-dotted decoration-zinc-600"
                >
                  CVT Belt
                </span>
              </p>
            </div>
          </div>

          {/* Category Icons Row with Horizontal scroll or Grid */}
          <div className="relative border-t border-white/10 px-5 sm:px-8 py-6 bg-zinc-950/80 z-10 selection:bg-lime-400 selection:text-zinc-950">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              
              {/* Active list grid of categories */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5 flex-1 w-full text-center">
                {categoriesList.map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = filters.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
                      className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <div className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-lime-400 bg-lime-400 text-zinc-950 shadow-lg scale-105'
                          : 'border-white/10 text-zinc-300 group-hover:border-lime-400/60 group-hover:bg-lime-400/10'
                      }`}>
                        <CatIcon className="h-4 w-4" />
                      </div>
                      <span className={`text-[10px] font-semibold transition-colors duration-200 font-archivo uppercase ${
                        isActive ? 'text-lime-400' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Side Landing Promo Banner */}
              <a 
                href="#custom-order-req"
                className="group flex items-center gap-4 rounded-2xl bg-lime-400 hover:bg-lime-300 px-5 py-3 transition-colors duration-200 cursor-pointer shrink-0 w-full lg:w-auto"
              >
                <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  <p className="text-zinc-950 font-black text-lg tracking-tight leading-none font-archivo">900+ SPECIALIZED</p>
                  <p className="text-zinc-800 text-[10px] mt-1 font-medium italic">
                    {isRTL ? 'قطعات جدید مهندسی شده وارد انبار شد' : 'Sourcing lists just arrived in inventory'}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-zinc-950 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <span className="text-lime-400 text-xs font-bold leading-none">&#10138;</span>
                </div>
              </a>

            </div>
          </div>

        </div>
      </main>

      {/* ============ SPONSOR SOURCING BRANDS ============ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 text-center z-10 select-none">
        <p className="text-xs uppercase tracking-[0.5em] text-zinc-600 font-bold mb-2">SOURCING CO-PARTNERS</p>
        <h2 className="text-2xl sm:text-4xl font-black font-archivo text-neutral-900 tracking-tight">
          PREMIUM BRANDS
        </h2>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {BRANDS.slice(0, 3).map((br, idx) => (
            <div
              key={br.name}
              onClick={() => setFilters(p => ({ ...p, brand: br.name }))}
              className="group cursor-pointer bg-zinc-900 shadow-xl rounded-2xl p-6 text-white border border-white/5 hover:border-lime-400/40 transition duration-300 flex flex-col justify-between h-44 text-left"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              <div className="flex justify-between items-start">
                <Cog className="h-8 w-8 text-zinc-700 group-hover:text-lime-400 group-hover:scale-110 group-hover:rotate-45 transition-all duration-500" />
                <span className="text-[10px] font-mono tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase">
                  PARTNER {idx + 1}
                </span>
              </div>
              <div>
                <p className="font-archivo text-xl font-black tracking-tight text-lime-400">{br.name}</p>
                <p className="text-xs text-zinc-400 mt-1 lines-clamp-2">{br.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ DOUBLE ROTATED BRAND MARQUEE TRACKS ============ */}
      <section className="relative -rotate-1 my-10 overflow-hidden z-20 select-none">
        <div className="bg-zinc-950 py-3.5 border-y border-white/5">
          <div className="animate-marquee hover:pause-on-hover">
            <div className="flex gap-12 text-white font-archivo text-base md:text-lg font-black tracking-widest uppercase">
              <span>SKF BEARINGS</span><span>·</span>
              <span>MAHLE CYLINDERS</span><span>·</span>
              <span>INA BELT DRIVES</span><span>·</span>
              <span>ZF TRANSMISSIONS</span><span>·</span>
              <span>VALEO CLUTCH SYSTEMS</span><span>·</span>
              <span>LUK FLYWHEELS</span><span>·</span>
              <span>BOSCH COILS</span><span>·</span>
            </div>
            {/* Duplicate for infinite loop */}
            <div className="flex gap-12 text-white font-archivo text-base md:text-lg font-black tracking-widest uppercase ml-12">
              <span>SKF BEARINGS</span><span>·</span>
              <span>MAHLE CYLINDERS</span><span>·</span>
              <span>INA BELT DRIVES</span><span>·</span>
              <span>ZF TRANSMISSIONS</span><span>·</span>
              <span>VALEO CLUTCH SYSTEMS</span><span>·</span>
              <span>LUK FLYWHEELS</span><span>·</span>
              <span>BOSCH COILS</span><span>·</span>
            </div>
          </div>
        </div>
        
        {/* Anti-Rotated Overlay Track */}
        <div className="bg-lime-400 py-3 rotate-1 -mt-1.5 border-y border-zinc-950">
          <div className="animate-marquee-reverse hover:pause-on-hover">
            <div className="flex gap-12 text-zinc-950 font-archivo text-xs sm:text-sm font-black tracking-widest uppercase">
              <span>EF7 COMPATIBLE</span><span>·</span>
              <span>TU5 HIGH DENSITY</span><span>·</span>
              <span>XU7 PLUS RESISTANT</span><span>·</span>
              <span>K4M ALIGNMENT MATCH</span><span>·</span>
              <span>AL4 SOLENOIDS DEEP CALIBRATION</span><span>·</span>
              <span>OEM VALUE ASSURED</span><span>·</span>
            </div>
            {/* Duplicate */}
            <div className="flex gap-12 text-zinc-950 font-archivo text-xs sm:text-sm font-black tracking-widest uppercase ml-12">
              <span>EF7 COMPATIBLE</span><span>·</span>
              <span>TU5 HIGH DENSITY</span><span>·</span>
              <span>XU7 PLUS RESISTANT</span><span>·</span>
              <span>K4M ALIGNMENT MATCH</span><span>·</span>
              <span>AL4 SOLENOIDS DEEP CALIBRATION</span><span>·</span>
              <span>OEM VALUE ASSURED</span><span>·</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE DYNAMIC CATALOG FEED ============ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 z-10">
        
        {/* Feed Headers & Search feedback */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-zinc-600 font-bold mb-1">
              {t.trendingSubtitle}
            </p>
            <h2 className="text-3xl sm:text-5xl font-black font-archivo text-zinc-950 tracking-tight leading-none">
              {filters.category === 'all' ? t.allProductsLink : t[filters.category] || filters.category}
            </h2>
            
            {/* Filter tags list indicator */}
            {(filters.query || filters.category !== 'all' || filters.brand !== 'all') && (
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {filters.category !== 'all' && (
                  <span className="bg-zinc-950 text-white px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    Category: <span className="text-lime-400 font-semibold">{t[filters.category] || filters.category}</span>
                    <button onClick={() => setFilters(p => ({ ...p, category: 'all' }))} className="text-zinc-400 hover:text-white font-bold font-mono">×</button>
                  </span>
                )}
                {filters.brand !== 'all' && (
                  <span className="bg-zinc-950 text-white px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    Brand: <span className="text-lime-400 font-semibold">{filters.brand}</span>
                    <button onClick={() => setFilters(p => ({ ...p, brand: 'all' }))} className="text-zinc-400 hover:text-white font-bold font-mono">×</button>
                  </span>
                )}
                {filters.query && (
                  <span className="bg-zinc-950 text-white px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    Search: <span className="text-red-400 font-semibold italic truncate max-w-[150px]">"{filters.query}"</span>
                    <button onClick={() => setFilters(p => ({ ...p, query: '' }))} className="text-zinc-400 hover:text-white font-bold font-mono">×</button>
                  </span>
                )}
                <button 
                  onClick={() => setFilters({ query: '', category: 'all', brand: 'all', compatibility: 'all', sortBy: 'relevance' })}
                  className="text-zinc-650 hover:text-zinc-950 font-bold self-center hover:underline"
                >
                  {isRTL ? 'پاک کردن همه‌ی فیلترها' : 'Reset All Filters'}
                </button>
              </div>
            )}
          </div>

          {/* Sourcing Sort selector */}
          <div className="flex items-center gap-3">
            <label className="text-xs text-zinc-600 font-bold uppercase shrink-0 font-mono">
              SORT SOURCING
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white border border-zinc-300 rounded-xl px-3 py-1.5 text-xs text-zinc-800 font-bold focus:outline-none focus:border-zinc-900"
            >
              <option value="relevance">{isRTL ? 'پیشنهادی' : 'Relevance'}</option>
              <option value="price-asc">{isRTL ? 'ارزان‌ترین' : 'Price: Low to High'}</option>
              <option value="price-desc">{isRTL ? 'گران‌ترین' : 'Price: High to Low'}</option>
              <option value="discount">{isRTL ? 'بیشترین تخفیف' : 'Discount Percentage'}</option>
            </select>
          </div>
        </div>

        {/* Dynamic products layout grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center border border-zinc-200"
            >
              <Info className="h-12 w-12 text-zinc-400 mb-4 animate-bounce" />
              <h3 className="text-lg font-bold">{isRTL ? 'قطعه‌ای پیدا نشد' : 'No Specialized Parts Found'}</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                {isRTL 
                  ? 'بررسی‌ها برای ویژگی‌های درخواستی شما در کاتالوگ فعلی نتیجه‌ای نداشت. لطفاً فیلترها را کاهش دهید یا فرم استعلام موتور سفارشی را تکمیل نمایید.'
                  : 'We have 900+ items inside our larger physical warehouse. If your precise query is not in this short catalog, try resetting your parameters below.'
                }
              </p>
              <button
                onClick={() => setFilters({ query: '', category: 'all', brand: 'all', compatibility: 'all', sortBy: 'relevance' })}
                className="mt-6 px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800"
              >
                {isRTL ? 'بازگشت به کاتالوگ کامل' : 'Display Entire Catalog'}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    language={language}
                    currency={currency}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============ OFFER BANNER ROTATED MARQUEE ============ */}
      <section className="relative rotate-1 mt-24 mb-16 overflow-hidden z-20 select-none">
        <div className="bg-lime-400 py-3 border-y border-zinc-950">
          <div className="animate-marquee hover:pause-on-hover">
            <div className="text-zinc-950 text-lg md:text-xl font-extrabold tracking-tight px-4 font-archivo">
              900+ NEW GENUINE PARTS IN CATALOG &nbsp; | &nbsp; 100% ENGINE MATCH CHECK GUARANTEED &nbsp; | &nbsp; FAST WORLDWIDE CO-SOURCING &nbsp; | &nbsp; 
            </div>
            {/* Duplicate */}
            <div className="text-zinc-950 text-lg md:text-xl font-extrabold tracking-tight px-4 font-archivo">
              900+ NEW GENUINE PARTS IN CATALOG &nbsp; | &nbsp; 100% ENGINE MATCH CHECK GUARANTEED &nbsp; | &nbsp; FAST WORLDWIDE CO-SOURCING &nbsp; | &nbsp; 
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL CAROUSEL SECTION ============ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 z-10" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-zinc-650 font-bold mb-1">{t.trustSubtitle}</p>
            <h2 className="text-2xl sm:text-4xl font-archivo font-black text-zinc-950 tracking-tight">{t.trustTitle}</h2>
          </div>
          
          {/* Carousel Buttons */}
          <div className="flex items-center gap-2 select-none">
            <button
              onClick={() => setActiveCarouselIndex(prev => Math.max(0, prev - 1))}
              disabled={activeCarouselIndex === 0}
              className={`h-9 w-9 rounded-full border border-zinc-400 flex items-center justify-center transition-all cursor-pointer ${
                activeCarouselIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveCarouselIndex(prev => Math.min(TESTIMONIALS.length - 1, prev + 1))}
              disabled={activeCarouselIndex === TESTIMONIALS.length - 1}
              className={`h-9 w-9 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-zinc-800 transition cursor-pointer ${
                activeCarouselIndex === TESTIMONIALS.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Testimonials display cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((tItem, idx) => {
            const isMiddleFeatured = idx === 1;
            const isVisible = Math.abs(idx - activeCarouselIndex) <= 1; // Basic mobile sliding adaptation

            return (
              <motion.div
                key={tItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-3xl p-7 transition-all duration-300 ${
                  isMiddleFeatured 
                    ? 'bg-zinc-950 text-white shadow-2xl lg:-translate-y-3 border border-white/5' 
                    : 'bg-white text-zinc-900 border border-zinc-200'
                }`}
              >
                {/* Star rating icons */}
                <div className={`flex gap-1 ${isMiddleFeatured ? 'text-lime-400' : 'text-amber-400'}`}>
                  {[...Array(tItem.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-200">
                  "{tItem.text}"
                </p>

                <div className={`mt-5 flex items-center gap-3 pt-5 border-t ${
                  isMiddleFeatured ? 'border-white/10' : 'border-zinc-100'
                }`}>
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-black font-archivo ${
                    isMiddleFeatured ? 'bg-lime-400 text-zinc-950' : 'bg-zinc-900 text-lime-400'
                  }`}>
                    {tItem.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-archivo">{tItem.name}</h4>
                    <p className={`text-[10px] flex items-center gap-1 mt-0.5 ${isMiddleFeatured ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      <BadgeCheck className={`h-3.5 w-3.5 inline ${isMiddleFeatured ? 'text-lime-400' : 'text-emerald-500'}`} />
                      <span>{tItem.role} - {tItem.verified === 'workshop' ? t.verifiedWorkshop : tItem.verified === 'fleet' ? t.verifiedFleet : t.verifiedCustomer}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============ INTERACTIVE CUSTOM PARTS REQUEST FORM ============ */}
      <CustomPartRequest language={language} />

      {/* ============ DYNAMIC INTERACTIVE PARTS GALLERY SOURCING PREVIEWS ============ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 z-10" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black font-archivo text-zinc-950 tracking-tight">
              {t.catalogTitle}
            </h2>
            <p className="text-xs text-zinc-500 leading-snug">Original Factory Level Blueprints</p>
          </div>
          <a 
            href="#custom-order-req" 
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider cursor-pointer font-archivo"
          >
            <span>{t.catalogAction}</span>
            <span className="h-9 w-9 rounded-full bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-lime-400 flex items-center justify-center transition-all duration-300">
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </span>
          </a>
        </div>

        {/* Gallery Grid holding custom icon states */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
          <div 
            onClick={() => setFilters(p => ({ ...p, category: 'timing' }))}
            className="group h-48 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col justify-between p-5 cursor-pointer relative overflow-hidden border border-white/5"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">TIMING SYSTEMS</span>
            <Cog className="h-14 w-14 text-zinc-700 self-center group-hover:text-lime-400 group-hover:scale-110 group-hover:rotate-95 transition-all duration-500" />
            <span className="text-[10px] text-lime-400 font-bold font-archivo tracking-widest uppercase">DISCOVER Timers</span>
          </div>

          <div 
            onClick={() => setFilters(p => ({ ...p, category: 'gearbox' }))}
            className="group h-48 rounded-2xl bg-gradient-to-br from-lime-800 to-zinc-950 flex flex-col justify-between p-5 cursor-pointer relative overflow-hidden border border-white/5 lg:translate-y-4"
          >
            <span className="text-[9px] font-mono tracking-widest text-lime-200 uppercase">HYDRAULIC BLOCKS</span>
            <Settings2 className="h-14 w-14 text-lime-200/50 self-center group-hover:text-white group-hover:scale-110 transition-all duration-500" />
            <span className="text-[10px] text-white font-bold font-archivo tracking-widest uppercase">DISCOVER Gearbox</span>
          </div>

          <div 
            onClick={() => setFilters(p => ({ ...p, category: 'clutch' }))}
            className="group h-48 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex flex-col justify-between p-5 cursor-pointer relative overflow-hidden border border-white/5"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">CLUTCHES & PLATES</span>
            <Disc className="h-14 w-14 text-zinc-600 self-center group-hover:text-lime-400 group-hover:scale-110 group-hover:rotate-180 transition-all duration-500" />
            <span className="text-[10px] text-lime-400 font-bold font-archivo tracking-widest uppercase">DISCOVER Plates</span>
          </div>

          <div 
            onClick={() => setFilters(p => ({ ...p, category: 'fuel' }))}
            className="group h-48 rounded-2xl bg-gradient-to-br from-zinc-900 to-black flex flex-col justify-between p-5 cursor-pointer relative overflow-hidden border border-white/5 lg:translate-y-4"
          >
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">PRESSURE FEEDERS</span>
            <Fuel className="h-14 w-14 text-zinc-800 self-center group-hover:text-lime-400 group-hover:scale-110 transition-all duration-500" />
            <span className="text-[10px] text-lime-400 font-bold font-archivo tracking-widest uppercase">DISCOVER Pumps</span>
          </div>
        </div>
      </section>

      {/* ============ MIDDLE SPECIALISTS BANNER ============ */}
      <div className="relative mt-24 mb-14 -rotate-1 select-none">
        <div className="bg-zinc-950 py-8 text-center px-4 border-y border-white/5 shadow-xl">
          <p className="text-zinc-400 text-xs sm:text-xs uppercase tracking-[0.4em]">
            {t.specialistSubtitle}
          </p>
          <p className="text-lime-400 text-4xl sm:text-6xl font-black tracking-tight mt-2 font-archivo">
            {t.specialistTitle}
          </p>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <footer className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 text-zinc-300 z-10" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="rounded-[2rem] bg-zinc-950 p-8 sm:p-12 border border-white/5 shadow-2xl relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Branding Column */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-lime-400 flex items-center justify-center text-zinc-950">
                  <Cog className="h-5 w-5" />
                </div>
                <span className="text-white font-heavy font-archivo tracking-tight text-lg">
                  {t.title}
                </span>
              </div>
              <p className="mt-5 text-xs text-zinc-400 leading-relaxed">
                {t.footerDesc}
              </p>
              
              {/* Social Channels */}
              <div className="mt-6 flex gap-2.5">
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-lime-400 hover:text-zinc-950 text-zinc-400 flex items-center justify-center transition" title="Instagram">
                  <Instagram className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-lime-400 hover:text-zinc-950 text-zinc-400 flex items-center justify-center transition" title="LinkedIn">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-lime-400 hover:text-zinc-950 text-zinc-400 flex items-center justify-center transition" title="Telegram">
                  <Send className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-lime-400 hover:text-zinc-950 text-zinc-400 flex items-center justify-center transition" title="Call Support">
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Links Column 2 */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">{t.ordering}</p>
              <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                <li><a href="#" className="hover:text-lime-400 transition">{t.delivery}</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">{t.myAccount}</a></li>
                <li><a href="#custom-order-req" className="hover:text-lime-400 transition">{t.requestPart}</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">{t.compatibilityCheck}</a></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">OEM Yadak Corp</p>
              <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                <li><a href="#" className="hover:text-lime-400 transition">{t.aboutUs}</a></li>
                <li><a href="#" className="rose-hover hover:text-lime-400 transition">{t.brands}</a></li>
                <li><span className="text-zinc-500 hover:text-zinc-300 transition cursor-pointer">{t.services}</span></li>
                <li><a href="#" className="hover:text-lime-400 transition">{t.contactUs}</a></li>
              </ul>
            </div>

            {/* Links Column 4 */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">{t.supportLabel}</p>
              <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                <li><a href="#" className="hover:text-lime-400 transition">{t.faq}</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">{t.warrantyReturns}</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">{t.privacyPolicy}</a></li>
                <li><a href="#" className="hover:text-lime-400 transition">{t.termsConditions}</a></li>
              </ul>
            </div>

          </div>

          {/* Subfooter bottom details */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 select-none">
            <p>{t.rightsReserved}</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition cursor-pointer"
            >
              <span>{t.backToTop}</span> 
              <ArrowUp className="h-3.5 w-3.5 animate-bounce" />
            </button>
          </div>

        </div>
      </footer>

      {/* ============ DYNAMIC PORTAL OVERLAYS (MODALS & DRAWER) ============ */}
      {/* 1. Fully-featured specs sheet dialog */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedProduct(null);
        }}
        language={language}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Side Sliding Cart Order checkout panel */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        language={language}
        currency={currency}
      />

    </div>
  );
}
