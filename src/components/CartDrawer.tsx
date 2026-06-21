/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { TRANSLATIONS, formatPrice, LangType, CurrencyType, toPersianNumbers } from '../translations';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Check, 
  ShoppingBag, 
  FileText,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  language: LangType;
  currency: CurrencyType;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  language,
  currency
}: CartDrawerProps) {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'FA';

  // Sub-navigation step in drawer
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Checkout Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [engineCode, setEngineCode] = useState('');
  const [vinCode, setVinCode] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Generated Checkout Details
  const [generatedId, setGeneratedId] = useState('');
  const [formError, setFormError] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, curr) => acc + (curr.product.priceIRT * curr.quantity), 0);
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setFormError(isRTL ? 'لطفاً نام و شماره تلفن را وارد کنید.' : 'Please enter your name and phone number.');
      return;
    }
    setFormError('');
    // Generate a beautiful mock order ID
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    setGeneratedId(`OEM-${language === 'FA' ? 'FA' : 'EN'}-${orderNum}`);
    setStep('success');
  };

  const handleReset = () => {
    onClearCart();
    setStep('cart');
    setFullName('');
    setPhone('');
    setEmail('');
    setEngineCode('');
    setVinCode('');
    setSpecialNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer alignment based on RTL/LTR */}
          <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-full flex`}>
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-screen max-w-md bg-zinc-900 border-l border-white/10 text-white flex flex-col justify-between shadow-2xl relative"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-950">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-lime-400" />
                  <h2 className="text-lg font-black font-archivo tracking-tight uppercase">
                    {t.cartTitle}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/5 hover:bg-lime-400 hover:text-zinc-950 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Central Dynamic Content Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {step === 'cart' && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <ShoppingBag className="h-16 w-16 text-zinc-600 mb-4 animate-bounce" />
                        <h3 className="text-base font-bold">{t.cartEmpty}</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs">{t.addSomeParts}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div 
                            key={item.product.id}
                            className="bg-zinc-950/40 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all duration-200"
                          >
                            <div className="h-12 w-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-lime-400 text-sm font-bold shrink-0">
                              #
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold uppercase tracking-tight truncate">
                                {item.product.name}
                              </h4>
                              <p className="font-mono text-[10px] text-zinc-400 uppercase mt-0.5">
                                {item.product.brand} · {item.product.partNumber}
                              </p>
                              <p className="text-xs text-lime-400 font-bold mt-1 font-archivo">
                                {formatPrice(item.product.priceIRT * item.quantity, currency, language)}
                              </p>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex flex-col items-center gap-1.5 shrink-0">
                              <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-white/10 text-xs">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center cursor-pointer text-zinc-400 hover:text-white"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-5 text-center font-bold font-mono">
                                  {isRTL ? toPersianNumbers(item.quantity) : item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center cursor-pointer text-zinc-400 hover:text-white"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              
                              {/* Quick Delete */}
                              <button
                                onClick={() => onRemoveFromCart(item.product.id)}
                                className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5 cursor-pointer"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>{isRTL ? 'حذف' : 'Remove'}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {step === 'checkout' && (
                  <form onSubmit={handleSubmitCheckout} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setStep('cart')}
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white mb-2 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>{isRTL ? 'بازگشت به سبد' : 'Back to Cart'}</span>
                    </button>

                    <h3 className="text-sm font-black font-archivo tracking-tight uppercase border-b border-white/5 pb-2">
                      {t.checkoutTitle}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {t.checkoutDesc}
                    </p>

                    {formError && (
                      <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2 text-xs">
                        <AlertCircle className="h-4 w-4" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {t.fullName} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                        placeholder={isRTL ? 'مثال: امیر رضایی' : 'e.g. Amir Rezaei'}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {t.phone} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
                        placeholder="e.g. 09121234567"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
                        placeholder="name@workshop.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                          {t.engineCode}
                        </label>
                        <input
                          type="text"
                          value={engineCode}
                          onChange={(e) => setEngineCode(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
                          placeholder="e.g. EF7"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                          {t.vinText}
                        </label>
                        <input
                          type="text"
                          value={vinCode}
                          onChange={(e) => setVinCode(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
                          placeholder="e.g. IRK-XU7..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {t.specialNotes}
                      </label>
                      <textarea
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        rows={2}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                        placeholder={isRTL ? 'مثال: کیت پیستون اورسایز ۵۰٪' : 'e.g. oversize 0.5 piston requirements'}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 bg-lime-400 hover:bg-lime-300 active:scale-95 text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                    >
                      <FileText className="h-4 w-4" />
                      <span>{t.submitOrder}</span>
                    </button>
                  </form>
                )}

                {step === 'success' && (
                  <div className="text-center py-6 flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-950 mb-4 animate-pulse">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <h3 className="text-xl font-bold text-emerald-400 font-archivo">
                      {t.invoiceTitle}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed max-w-xs">
                      {t.invoiceDesc}
                    </p>

                    <div className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-5 mt-6 text-left space-y-3 font-mono text-xs max-w-sm">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">{t.fullName}</span>
                        <span className="text-white font-bold">{fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">{t.orderId}</span>
                        <span className="text-lime-400 font-bold font-mono">{generatedId}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">{t.deliveryEstimated}</span>
                        <span className="text-white font-bold">{t.hoursCount}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-1">
                        <span className="text-zinc-500 uppercase">{t.subtotal}</span>
                        <span className="text-white text-sm">{formatPrice(calculateSubtotal(), currency, language)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="w-full max-w-sm mt-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                    >
                      {t.close} & Return
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer with calculation */}
              {step === 'cart' && cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-zinc-950">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                      {t.subtotal}
                    </span>
                    <span className="text-lg font-black font-archivo text-lime-400">
                      {formatPrice(calculateSubtotal(), currency, language)}
                    </span>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={onClearCart}
                      className="flex-1 py-3 text-xs font-bold font-archivo tracking-wider border border-white/10 hover:border-red-500 text-zinc-400 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                    >
                      {t.clearCart}
                    </button>

                    <button
                      onClick={handleProceedToCheckout}
                      className="flex-[2] py-3 text-xs bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black font-archivo tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <span>{t.proceedToCheckout}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
