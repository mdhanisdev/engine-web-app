/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { TRANSLATIONS, formatPrice, LangType, CurrencyType } from '../translations';
import { ENGINE_CODES } from '../data';
import { 
  X, 
  Check, 
  Cog, 
  ShieldAlert, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  ShoppingBag,
  Cpu
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: LangType;
  currency: CurrencyType;
  onAddToCart: (p: Product) => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  language,
  currency,
  onAddToCart
}: ProductDetailsModalProps) {
  const t = TRANSLATIONS[language];
  const [selectedEngineCheck, setSelectedEngineCheck] = useState<string>('');
  const [compatibilityResult, setCompatibilityResult] = useState<'none' | 'success' | 'failure'>('none');

  if (!product) return null;

  const handleCompatibilityCheck = (eCode: string) => {
    setSelectedEngineCheck(eCode);
    if (!eCode) {
      setCompatibilityResult('none');
      return;
    }
    const isCompatible = product.engineCode.some(
      code => code.toLowerCase().includes(eCode.toLowerCase()) || eCode.toLowerCase().includes(code.toLowerCase())
    );
    setCompatibilityResult(isCompatible ? 'success' : 'failure');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white z-10"
            style={{ direction: language === 'FA' ? 'rtl' : 'ltr' }}
          >
            {/* Top Close Bar */}
            <div className="absolute top-5 right-5 left-5 flex justify-between items-center z-20">
              <span className="text-xs font-mono tracking-widest text-lime-400 font-bold uppercase">
                {product.brand} OEM TECHNICAL SHEET
              </span>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-lime-400 hover:text-zinc-950 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 pt-16 h-full max-h-[85vh] overflow-y-auto">
              
              {/* Left Column: Visual Icon & Main Properties */}
              <div className="md:col-span-5 bg-zinc-950/50 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                <div>
                  <div className="h-44 bg-zinc-90 w-full rounded-2xl border border-white/5 flex items-center justify-center text-lime-400 py-6 mb-6">
                    <Cog className="h-28 w-28 animate-spin-slow text-lime-400/80" style={{ animationDuration: '24s' }} />
                  </div>

                  <h2 className="text-2xl font-black font-archivo tracking-tight mt-4">
                    {product.name}
                  </h2>
                  <p className="font-mono text-zinc-400 text-xs mt-1 tracking-widest uppercase">
                    PART ID: {product.partNumber}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold bg-white/5 border border-white/10 text-zinc-300 rounded-full px-3 py-1">
                      {t[product.category] || product.category}
                    </span>
                    <span className="text-xs font-semibold bg-lime-400/10 border border-lime-400/20 text-lime-400 rounded-full px-3 py-1">
                      {product.brand} Genuine
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4">
                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest">{t.estimatedValue}</p>
                    <p className="text-2xl font-black font-archivo text-lime-400 mt-1">
                      {formatPrice(product.priceIRT, currency, language)}
                    </p>
                    
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="w-full mt-4 py-3 px-4 bg-lime-400 hover:bg-lime-300 active:scale-95 text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Deep specs & Compatibility Checker */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Detailed Description */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Description</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {product.longDescription}
                    </p>
                  </div>

                  {/* Specifications Table */}
                  <div className="mt-6">
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">{t.specsHeader}</h3>
                    <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-950/30">
                      <table className="w-full text-xs text-left">
                        <tbody>
                          {Object.entries(product.specs).map(([key, val], idx) => (
                            <tr 
                              key={key} 
                              className={`border-b border-white/5 ${
                                idx % 2 === 0 ? 'bg-zinc-900/50' : 'bg-transparent'
                              }`}
                            >
                              <td className="px-4 py-2.5 font-bold text-zinc-400 uppercase tracking-wider font-mono">{key}</td>
                              <td className="px-4 py-2.5 text-zinc-200">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Engine Codes list */}
                  <div className="mt-6">
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Compatible Engine Blocks</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {product.engineCode.map(code => (
                        <span key={code} className="text-xs font-mono font-bold bg-zinc-800 text-lime-400 border border-white/5 rounded-md px-2.5 py-1">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compatibility Interactive Verification Box */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="bg-zinc-950 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-lime-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {t.compatibilityCheck}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3">
                      Select your target engine block code to run our instant compatibility simulation engine:
                    </p>

                    <div className="flex gap-2">
                      <select
                        value={selectedEngineCheck}
                        onChange={(e) => handleCompatibilityCheck(e.target.value)}
                        className="flex-1 bg-zinc-900 text-xs text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-lime-400"
                      >
                        <option value="">-- Choose Workshop Engine Code --</option>
                        {ENGINE_CODES.map(code => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>

                    {/* Compatibility Verdict Display */}
                    {compatibilityResult === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2.5 text-xs"
                      >
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        <div>
                          <p className="font-bold">100% Sourcing Compatibility Match!</p>
                          <p className="text-[11px] text-emerald-500/90">This part handles RPM tolerances of the {selectedEngineCheck} platform exactly.</p>
                        </div>
                      </motion.div>
                    )}

                    {compatibilityResult === 'failure' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2.5 text-xs"
                      >
                        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                        <div>
                          <p className="font-bold">Potential Mechanical Fit Issue!</p>
                          <p className="text-[11px] text-red-400/90">Selected engine block ({selectedEngineCheck}) clearance differs from this specific part.</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
