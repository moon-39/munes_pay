import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, Copy, Check, PlusCircle, ArrowDownCircle } from 'lucide-react';
import { VIRTUAL_CARD_NUMBER, VIRTUAL_CARD_SHEBA } from '../data/mockData';

interface SmartCardProps {
  balanceRial: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  onCopySuccess: (text: string) => void;
}

export const SmartCard: React.FC<SmartCardProps> = ({
  balanceRial,
  onDeposit,
  onWithdraw,
  onCopySuccess,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copiedCard, setCopiedCard] = useState(false);
  const [copiedSheba, setCopiedSheba] = useState(false);

  const formattedRials = balanceRial.toLocaleString('fa-IR');
  const formattedTomans = Math.floor(balanceRial / 10).toLocaleString('fa-IR');

  const handleCopy = (text: string, type: 'card' | 'sheba') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (type === 'card') {
      setCopiedCard(true);
      setTimeout(() => setCopiedCard(false), 2000);
    } else {
      setCopiedSheba(true);
      setTimeout(() => setCopiedSheba(false), 2000);
    }
    onCopySuccess(type === 'card' ? 'شماره کارت کپی شد' : 'شناسه شبا کپی شد');
  };

  return (
    <div className="glass-card rounded-3xl p-5 text-white relative overflow-hidden transition-all duration-300">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute -right-16 -top-16 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-44 h-44 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-300 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-xs">
            کارت هوشمند دیجیتال مونس
          </span>
        </div>
        <CreditCard className="w-5 h-5 text-emerald-400" />
      </div>

      {/* Balance Section */}
      <div className="space-y-1.5 my-3 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <span>موجودی در دسترس کیف پول</span>
          <button
            id="btn-toggle-balance-visibility"
            onClick={() => setShowBalance(!showBalance)}
            className="text-slate-400 hover:text-white p-0.5 transition"
            aria-label={showBalance ? 'مخفی‌سازی موجودی' : 'نمایش موجودی'}
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        <div className="flex items-baseline gap-2">
          {showBalance ? (
            <>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
                {formattedRials}
              </span>
              <span className="text-xs text-emerald-300 font-bold">ریال</span>
              <span className="text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md font-normal border border-white/5">
                {formattedTomans} تومان
              </span>
            </>
          ) : (
            <span className="text-2xl sm:text-3xl font-black tracking-widest text-slate-400">
              ••••••••••••
            </span>
          )}
        </div>
      </div>

      {/* Card Credentials Box */}
      <div className="bg-black/35 rounded-2xl p-3.5 border border-white/10 space-y-2 mt-4 text-xs font-mono relative z-10 backdrop-blur-xs">
        {/* Virtual Card Number */}
        <div className="flex justify-between items-center text-slate-300">
          <span className="font-sans text-[11px] text-slate-400">شماره کارت مجازی:</span>
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-slate-100">
            <button
              id="btn-copy-card-number"
              onClick={() => handleCopy(VIRTUAL_CARD_NUMBER, 'card')}
              className="text-emerald-400 hover:text-emerald-300 p-1 rounded-md hover:bg-white/10 transition"
              title="کپی شماره کارت"
            >
              {copiedCard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <span className="select-all">{VIRTUAL_CARD_NUMBER}</span>
          </div>
        </div>

        {/* Sheba Number */}
        <div className="flex justify-between items-center text-slate-300">
          <span className="font-sans text-[11px] text-slate-400">شناسه شبا:</span>
          <div className="flex items-center gap-1.5 text-slate-200">
            <button
              id="btn-copy-sheba-number"
              onClick={() => handleCopy(VIRTUAL_CARD_SHEBA, 'sheba')}
              className="text-emerald-400 hover:text-emerald-300 p-1 rounded-md hover:bg-white/10 transition"
              title="کپی شناسه شبا"
            >
              {copiedSheba ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[11px] select-all tracking-wider font-sans">{VIRTUAL_CARD_SHEBA}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 mt-4 relative z-10">
        <button
          id="btn-card-deposit"
          onClick={onDeposit}
          className="bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.2]" />
          <span>افزایش موجودی</span>
        </button>

        <button
          id="btn-card-withdraw"
          onClick={onWithdraw}
          className="bg-white/10 hover:bg-white/15 active:scale-98 text-white font-bold py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 border border-white/10 transition cursor-pointer"
        >
          <ArrowDownCircle className="w-4 h-4 stroke-[2.2]" />
          <span>برداشت وجه</span>
        </button>
      </div>
    </div>
  );
};
