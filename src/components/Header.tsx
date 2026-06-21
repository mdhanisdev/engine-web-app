/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cog, ChevronDown, User, ShoppingCart, Languages, Globe } from 'lucide-react';
import { LangType, CurrencyType } from '../translations';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  language: LangType;
  setLanguage: (lang: LangType) => void;
  currency: CurrencyType;
  setCurrency: (cur: CurrencyType) => void;
  cartCount: number;
  onOpenCart: () => void;
  logoClick?: () => void;
}

export default function Header({
  language,
  setLanguage,
  currency,
  setCurrency,
  cartCount,
  onOpenCart,
  logoClick
}: HeaderProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="relative w-full z-40 select-none">
      {/* Top Utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-900">
        <div className="flex items-center gap-3 cursor-pointer" onClick={logoClick}>
          <div className="h-10 w-10 rounded-xl bg-zinc-950 flex items-center justify-center text-lime-400 hover:rotate-45 transition-transform duration-300">
            <Cog className="h-5 w-5" />
          </div>
          <span className="text-lg font-black tracking-tight font-archivo">
            {t.title}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="hidden md:block">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">{t.emailLabel}</p>
            <p className="font-semibold text-zinc-800">sales@oemyadak.com</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">{t.supportLabel}</p>
            <p className="font-semibold text-zinc-800 dir-ltr">+98 21 8888 9900</p>
          </div>
          
          {/* Quick Stats Banner */}
          <div className="bg-zinc-950 text-white rounded-lg px-3 py-1 font-mono text-[11px] leading-none flex items-center gap-1.5 border border-white/5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse"></span>
            DISPATCH ACTIVE
          </div>
        </div>
      </div>

      {/* Hero card container - Inner Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-zinc-950 rounded-t-3xl border-b border-white/10">
          <nav className="flex items-center justify-between px-4 sm:px-8 py-4">
            {/* Nav Menu Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={logoClick}>
              <div className="h-9 w-9 rounded-lg bg-lime-400 flex items-center justify-center">
                <Cog className="h-5 w-5 text-zinc-950" />
              </div>
              <span className="text-white font-black tracking-tight text-base font-archivo">
                {t.title}
              </span>
            </div>

            {/* Middle navigation links - Scrolls or triggers filters */}
            <div className="hidden lg:flex items-center gap-6 text-sm text-zinc-400">
              <span className="hover:text-white transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider">{t.engineParts}</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider">{t.gearbox}</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider">{t.timingKits}</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider">{t.bearings}</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider">{t.brands}</span>
              <span className="hover:text-white transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider">{t.services}</span>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <button
                id="language-switcher"
                onClick={() => setLanguage(language === 'EN' ? 'FA' : 'EN')}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                title="Switch Language"
              >
                <Languages className="h-3.5 w-3.5 text-lime-400" />
                <span className="font-semibold font-mono">{language === 'EN' ? 'FA' : 'EN'}</span>
              </button>

              {/* Currency Selector */}
              <button
                id="currency-switcher"
                onClick={() => setCurrency(currency === 'IRT' ? 'USD' : 'IRT')}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                title="Switch Currency Display"
              >
                <Globe className="h-3.5 w-3.5 text-lime-400" />
                <span className="font-semibold font-mono">{currency === 'IRT' ? 'IRT' : 'USD'}</span>
              </button>

              {/* Customer Account Button */}
              <div className="relative group">
                <button 
                  id="user-menu-btn"
                  className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 transition-colors duration-200 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                </button>
                <div className="absolute top-11 right-0 hidden group-hover:block w-48 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-xl z-50 text-xs">
                  <p className="text-zinc-400 mb-1 font-semibold">{t.myAccount}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">ID: OEM-YADAK-2026</p>
                  <div className="h-px bg-white/10 my-2"></div>
                  <a href="#custom-order-req" className="block text-lime-400 hover:underline">{t.requestPart}</a>
                </div>
              </div>

              {/* Shopping Cart Button */}
              <button
                id="shopping-cart-launcher"
                onClick={onOpenCart}
                className="relative h-9 w-9 rounded-full bg-lime-400 hover:bg-lime-300 flex items-center justify-center text-zinc-950 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-zinc-900 text-[10px] font-bold flex items-center justify-center border border-zinc-950"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
