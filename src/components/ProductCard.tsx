/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { TRANSLATIONS, formatPrice, LangType, CurrencyType } from '../translations';
import { 
  Cog, 
  CircleDot, 
  Layers, 
  Gauge, 
  Settings2, 
  Disc, 
  GitMerge, 
  Component, 
  Wrench, 
  Droplets, 
  Fuel, 
  Heart,
  ShoppingCart,
  ArrowUpRight
} from 'lucide-react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  language: LangType;
  currency: CurrencyType;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

export default function ProductCard({
  product,
  language,
  currency,
  onAddToCart,
  onViewDetails
}: ProductCardProps) {
  const t = TRANSLATIONS[language];
  const [isLiked, setIsLiked] = useState(false);

  // Map imageType string to real Lucide Icon Component
  const getIcon = () => {
    switch (product.imageType) {
      case 'cog': return <Cog className="h-20 w-20" />;
      case 'circle-dot': return <CircleDot className="h-20 w-20" />;
      case 'layers': return <Layers className="h-20 w-20" />;
      case 'gauge': return <Gauge className="h-20 w-20" />;
      case 'settings-2': return <Settings2 className="h-20 w-20" />;
      case 'disc': return <Disc className="h-20 w-20" />;
      case 'git-merge': return <GitMerge className="h-20 w-20" />;
      case 'component': return <Component className="h-20 w-20" />;
      case 'wrench': return <Wrench className="h-20 w-20" />;
      case 'droplets': return <Droplets className="h-20 w-20" />;
      case 'fuel': return <Fuel className="h-20 w-20" />;
      default: return <Cog className="h-20 w-20" />;
    }
  };

  const isDarkMode = product.featured === true;

  return (
    <motion.div
      layoutId={`card-${product.id}`}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer ${
        isDarkMode 
          ? 'bg-zinc-950 text-white border border-white/5' 
          : 'bg-white text-zinc-900 border border-zinc-200/80 hover:border-lime-500/30'
      }`}
      onClick={() => onViewDetails(product)}
    >
      {/* Absolute top glowing background for featured dark card */}
      {isDarkMode && (
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-lime-400/20 blur-3xl rounded-full pointer-events-none" />
      )}

      {/* Top badges bar */}
      <div className="relative flex items-center justify-between z-10">
        <div>
          {product.savePercentage && product.savePercentage > 0 ? (
            <span className="text-[10px] font-black tracking-wider bg-red-600 text-white rounded-full px-2.5 py-1 uppercase">
              {t.save} {product.savePercentage}%
            </span>
          ) : product.featured ? (
            <span className="text-[10px] font-black tracking-wider bg-lime-400 text-zinc-950 rounded-full px-2.5 py-1 uppercase">
              {t.featured}
            </span>
          ) : product.isNew ? (
            <span className="text-[10px] font-black tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-full px-2.5 py-1 uppercase border border-white/10">
              {t.new}
            </span>
          ) : (
            <span className="text-[10px] font-bold tracking-wider bg-zinc-100 text-zinc-500 rounded-full px-2.5 py-1">
              OEM
            </span>
          )}
        </div>

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
            isLiked 
              ? 'text-red-500 bg-red-50' 
              : 'text-zinc-400 hover:text-red-500 hover:bg-zinc-100'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Placement using dynamic Lucide Icons */}
      <div className="h-44 flex items-center justify-center relative my-2">
        <div className={`p-4 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'text-lime-400 group-hover:scale-110' 
            : 'text-zinc-400 group-hover:text-zinc-700 group-hover:rotate-12 group-hover:scale-110'
        }`}>
          {getIcon()}
        </div>
      </div>

      {/* Part Title and Part Numbers */}
      <div className="text-center mt-1 z-10">
        <h3 className="text-sm font-bold uppercase tracking-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">
          {product.brand} · {product.partNumber}
        </p>
      </div>

      {/* Pricing display */}
      <div className="mt-4 text-center z-10">
        <p className={`text-lg font-black font-archivo tracking-tight ${
          isDarkMode ? 'text-lime-400' : 'text-zinc-950'
        }`}>
          {formatPrice(product.priceIRT, currency, language)}
        </p>
      </div>

      {/* Stock status and fast buy button */}
      <div className="mt-4 pt-3 border-t border-zinc-100/50 dark:border-white/5 flex items-center justify-between gap-1 z-10">
        {/* Status indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <span className={`h-2 w-2 rounded-full ${
            product.stockStatus === 'in-stock' 
              ? 'bg-emerald-500 animate-pulse' 
              : product.stockStatus === 'limited' 
                ? 'bg-amber-500 animate-pulse' 
                : 'bg-zinc-400'
          }`} />
          <span>
            {product.stockStatus === 'in-stock' 
              ? t.inStock 
              : product.stockStatus === 'limited' 
                ? t.limitedStock 
                : t.outOfStock}
          </span>
        </div>

        {/* Buy Action buttons */}
        <div className="flex gap-1.5">
          {/* Quick Details View */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className={`h-7 w-7 rounded-md flex items-center justify-center text-xs border cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5 ${
              isDarkMode ? 'border-white/10 text-zinc-300' : 'border-zinc-200 text-zinc-600'
            }`}
            title={t.viewDetails}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Quick Sourcing Add */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="h-7 px-2.5 rounded-md text-xs font-bold leading-none bg-lime-400 hover:bg-lime-300 text-zinc-950 flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:scale-105"
            title={t.addToCart}
          >
            <ShoppingCart className="h-3 w-3" />
            <span className="hidden sm:inline font-archivo text-[10px]">{t.addToCart.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
