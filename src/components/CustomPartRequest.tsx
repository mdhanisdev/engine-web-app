/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, LangType } from '../translations';
import { Wrench, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';

interface CustomPartRequestProps {
  language: LangType;
}

export default function CustomPartRequest({ language }: CustomPartRequestProps) {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'FA';

  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [engineModel, setEngineModel] = useState('');
  const [partDescription, setPartDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !partDescription) {
      setErrorMsg(isRTL ? 'لطفاً تمامی فیلدهای الزامی (*) را تکمیل کنید.' : 'Please fill out all required (*) fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear form
      setFullName('');
      setPhone('');
      setEngineModel('');
      setPartDescription('');
      setPriority('medium');
    }, 5000);
  };

  return (
    <div id="custom-order-req" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 select-none">
      <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Toggle Head segment */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors duration-200"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-lime-400 flex items-center justify-center text-zinc-950 shrink-0">
              <Wrench className="h-6 w-6" />
            </div>
            <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
              <p className="text-lime-400 text-xs font-black tracking-widest uppercase font-mono">{t.customPartReq}</p>
              <h2 className="text-white text-lg sm:text-xl font-bold font-archivo tracking-tight mt-1">
                {t.customPartTitle}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden md:inline">
              {isOpen ? (isRTL ? 'پنهان کردن فرم' : 'Collapse Form') : (isRTL ? 'نمایش فرم ارسال' : 'Expand Request Form')}
            </span>
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>
        </div>

        {/* Collapsible Body Form */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="border-t border-white/10 bg-zinc-900/55 p-6 sm:p-8"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-4xl">
                {t.customPartDesc}
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/40 border border-emerald-500/20 p-6 rounded-2xl text-center flex flex-col items-center justify-center"
                >
                  <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-950 mb-3">
                    <CheckCircle2 className="h-6 w-6 stroke-[3]" />
                  </div>
                  <h4 className="text-emerald-400 font-bold font-archivo">{isRTL ? 'درخواست استعلام ثبت شد' : 'Sourcing Ticket Created'}</h4>
                  <p className="text-xs text-emerald-500/90 mt-1 max-w-lg">
                    {t.requestSubmitted}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-zinc-800 text-xs text-zinc-300 rounded-lg hover:bg-zinc-700 transition"
                  >
                    {isRTL ? 'ارسال یک درخواست دیگر' : 'Send Another Request'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-2 text-xs">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {isRTL ? 'کارگاه / نماینده فنی' : 'Your Name / Garage'} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                        placeholder={isRTL ? 'مثال: علیرضا رضایی' : 'e.g. Alireza Rezaei'}
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
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
                        placeholder="e.g. +98 912..."
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {isRTL ? 'مدل موتور مورد نظر' : 'Target Engine Block Model'}
                      </label>
                      <input
                        type="text"
                        value={engineModel}
                        onChange={(e) => setEngineModel(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
                        placeholder="e.g. Peugeot 508 / THP200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {isRTL ? 'شرح و شماره فنی قطعه درخواستی' : 'Part Description & Cross Reference'} <span className="text-lime-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={partDescription}
                        onChange={(e) => setPartDescription(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                        placeholder={isRTL ? 'مثال: دست رینگ پیستون استاندارد مدل Goetze آلمانی' : 'e.g. Goetze Standard Piston Ring Set'}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 font-semibold">
                        {isRTL ? 'اولویت استعلام' : 'Urgency Tracker'}
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-lime-400"
                      >
                        <option value="low">{t.prioLow}</option>
                        <option value="medium">{t.prioMed}</option>
                        <option value="high">{t.prioHigh}</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl active:scale-95 transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                    >
                      <Sparkles className="h-4 w-4 text-zinc-950" />
                      <span>{isRTL ? 'ثبت و استعلام تخصصی کالا' : 'Submit Sourcing Request'}</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
