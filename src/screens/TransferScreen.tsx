import React, { useState } from 'react';
import {
  Send,
  QrCode,
  Scan,
  Zap,
  CreditCard,
  Landmark,
  Clipboard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TransactionItem } from '../types';

interface TransferScreenProps {
  balanceRial: number;
  initialMode?: 'mounes' | 'card' | 'sheba';
  onCompleteTransfer: (tx: TransactionItem) => void;
  onOpenQrScreen: () => void;
}

export const TransferScreen: React.FC<TransferScreenProps> = ({
  balanceRial,
  initialMode = 'mounes',
  onCompleteTransfer,
  onOpenQrScreen,
}) => {
  const [transferMode, setTransferMode] = useState<'mounes' | 'card' | 'sheba'>(initialMode);
  const [destination, setDestination] = useState<string>('ali_k@');
  const [amount, setAmount] = useState<number>(10000000);
  const [selectedNote, setSelectedNote] = useState<string>('خرید کالا و خدمات');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [lastTx, setLastTx] = useState<TransactionItem | null>(null);

  const notesList = [
    'خرید کالا و خدمات',
    'قرض‌الحسنه و خانوادگی',
    'تسویه فاکتور',
    'سرمایه‌گذاری'
  ];

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) setDestination(text.trim());
      }
    } catch {
      // Fallback
      if (transferMode === 'card') {
        setDestination('۶۰۳۷ - ۶۹۱۹ - ۲۸۴۰ - ۵۵۴۱');
      } else if (transferMode === 'sheba') {
        setDestination('IR5401200000000012345678');
      } else {
        setDestination('sara_m@');
      }
    }
  };

  const getTomanString = (val: number) => {
    const tomans = Math.floor(val / 10);
    if (tomans >= 1000000) {
      const millions = tomans / 1000000;
      return `معادل ${millions.toLocaleString('fa-IR')} میلیون تومان`;
    }
    return `معادل ${tomans.toLocaleString('fa-IR')} تومان`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('لطفاً مبلغ معتبری را وارد نمایید.');
      return;
    }
    if (amount > balanceRial) {
      alert('موجودی کیف پول شما برای این انتقال کافی نیست.');
      return;
    }
    if (!destination.trim()) {
      alert('لطفاً مقصد انتقال را مشخص نمایید.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newTx: TransactionItem = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        title:
          transferMode === 'mounes'
            ? `انتقال به ${destination}`
            : transferMode === 'card'
            ? `کارت به کارت به ${destination.slice(-4)}`
            : `انتقال شبا به ${destination.slice(-6)}`,
        category: 'transfer',
        categoryLabel:
          transferMode === 'mounes'
            ? 'انتقال مونس به مونس'
            : transferMode === 'card'
            ? 'کارت به کارت شتابی'
            : 'حواله پایا / ساتنا',
        type: 'outflow',
        amount: amount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'تراکنش موفق شاپرک',
        trackingCode: `TRF-${Math.floor(10000000 + Math.random() * 90000000)}`,
        counterparty: destination,
        cardOrAccount:
          transferMode === 'card'
            ? destination
            : transferMode === 'sheba'
            ? destination
            : 'کیف پول مونس',
        note: selectedNote,
      };

      setLastTx(newTx);
      onCompleteTransfer(newTx);
      setShowSuccessModal(true);
    }, 900);
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Action Switcher */}
      <div className="bg-slate-200/80 p-1 rounded-2xl flex text-xs font-bold">
        <button className="flex-1 py-2 rounded-xl bg-white text-slate-900 shadow-xs flex items-center justify-center gap-1.5 transition">
          <Send className="w-3.5 h-3.5 text-emerald-600" />
          <span>انتقال پول</span>
        </button>

        <button
          onClick={onOpenQrScreen}
          className="flex-1 py-2 rounded-xl text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>دریافت و QR من</span>
        </button>

        <button
          onClick={onOpenQrScreen}
          className="flex-1 py-2 rounded-xl text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Scan className="w-3.5 h-3.5" />
          <span>اسکن بارکد</span>
        </button>
      </div>

      {/* Transfer Mode Selector */}
      <div className="grid grid-cols-3 gap-2">
        {/* ۱. مونس به مونس */}
        <button
          onClick={() => {
            setTransferMode('mounes');
            setDestination('ali_k@');
          }}
          className={`p-3 rounded-2xl text-center space-y-1 transition cursor-pointer ${
            transferMode === 'mounes'
              ? 'bg-slate-900 text-white border-2 border-emerald-400 shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Zap
            className={`w-5 h-5 mx-auto ${
              transferMode === 'mounes' ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-600'
            }`}
          />
          <span className="text-xs font-bold block">مونس به مونس</span>
          <span
            className={`text-[10px] block ${
              transferMode === 'mounes' ? 'text-emerald-300' : 'text-slate-400'
            }`}
          >
            بدون کارمزد و آنی
          </span>
        </button>

        {/* ۲. کارت به کارت */}
        <button
          onClick={() => {
            setTransferMode('card');
            setDestination('۶۰۳۷ - ۶۹۱۹ - ۲۸۴۰ - ۵۵۴۱');
          }}
          className={`p-3 rounded-2xl text-center space-y-1 transition cursor-pointer ${
            transferMode === 'card'
              ? 'bg-slate-900 text-white border-2 border-emerald-400 shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <CreditCard
            className={`w-5 h-5 mx-auto ${
              transferMode === 'card' ? 'text-emerald-400' : 'text-slate-600'
            }`}
          />
          <span className="text-xs font-bold block">کارت به کارت</span>
          <span
            className={`text-[10px] block ${
              transferMode === 'card' ? 'text-emerald-300' : 'text-slate-400'
            }`}
          >
            شتاب بانکی
          </span>
        </button>

        {/* ۳. شماره شبا */}
        <button
          onClick={() => {
            setTransferMode('sheba');
            setDestination('IR5401200000000012345678');
          }}
          className={`p-3 rounded-2xl text-center space-y-1 transition cursor-pointer ${
            transferMode === 'sheba'
              ? 'bg-slate-900 text-white border-2 border-emerald-400 shadow-xs'
              : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Landmark
            className={`w-5 h-5 mx-auto ${
              transferMode === 'sheba' ? 'text-emerald-400' : 'text-slate-600'
            }`}
          />
          <span className="text-xs font-bold block">شماره شبا</span>
          <span
            className={`text-[10px] block ${
              transferMode === 'sheba' ? 'text-emerald-300' : 'text-slate-400'
            }`}
          >
            پایا و ساتنا
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Destination */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <label className="text-xs font-bold text-slate-800 block">
            {transferMode === 'mounes'
              ? 'شناسه کاربری یا شماره همراه مونس مقصد:'
              : transferMode === 'card'
              ? 'شماره کارت ۱۶ رقمی مقصد:'
              : 'شناسه ۲۴ رقمی شبا (با IR):'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={
                transferMode === 'mounes'
                  ? 'مثال: ali_k@ یا ۰۹۱۲...'
                  : transferMode === 'card'
                  ? '۶۰۳۷ - ۹۹۷۵ - ۴۳۲۱ - ۱۰۸۹'
                  : 'IR0901700000001029384756'
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pr-4 pl-24 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute left-2.5 top-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 transition cursor-pointer"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>چسباندن</span>
            </button>
          </div>

          {/* Quick Frequent Contacts */}
          <div className="flex items-center gap-1.5 pt-1 overflow-x-auto hide-scrollbar text-[10px]">
            <span className="text-slate-400 whitespace-nowrap">مخاطبین پرتکرار:</span>
            <button
              type="button"
              onClick={() => setDestination('ali_k@')}
              className="bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2 py-1 rounded-lg whitespace-nowrap transition cursor-pointer"
            >
              علی کاظمی
            </button>
            <button
              type="button"
              onClick={() => setDestination('sara_m@')}
              className="bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2 py-1 rounded-lg whitespace-nowrap transition cursor-pointer"
            >
              سارا محمدی
            </button>
            <button
              type="button"
              onClick={() => setDestination('reza_p@')}
              className="bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2 py-1 rounded-lg whitespace-nowrap transition cursor-pointer"
            >
              رضا پناهی
            </button>
          </div>
        </div>

        {/* Input Amount */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-800">مبلغ انتقال (ریال):</label>
            <span className="text-[10px] text-slate-400">سقف روزانه: ۵۰۰,۰۰۰,۰۰۰ ریال</span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={amount.toLocaleString('fa-IR')}
              onChange={(e) => {
                const numeric = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                setAmount(numeric);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-center font-black text-xl text-slate-900 font-display focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
            <span className="absolute left-4 top-4 text-xs font-bold text-slate-400">ریال</span>
          </div>

          <p className="text-center text-xs font-medium text-emerald-700">
            {getTomanString(amount)}
          </p>

          {/* Quick Amount Chips */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setAmount(5000000)}
              className={`py-2 text-[11px] font-bold rounded-xl transition cursor-pointer ${
                amount === 5000000
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ۵,۰۰۰,۰۰۰
            </button>
            <button
              type="button"
              onClick={() => setAmount(10000000)}
              className={`py-2 text-[11px] font-bold rounded-xl transition cursor-pointer ${
                amount === 10000000
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ۱۰,۰۰۰,۰۰۰
            </button>
            <button
              type="button"
              onClick={() => setAmount(20000000)}
              className={`py-2 text-[11px] font-bold rounded-xl transition cursor-pointer ${
                amount === 20000000
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ۲۰,۰۰۰,۰۰۰
            </button>
            <button
              type="button"
              onClick={() => setAmount(balanceRial)}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition cursor-pointer"
            >
              کل موجودی
            </button>
          </div>
        </div>

        {/* Note / Category */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <label className="text-xs font-bold text-slate-800 block">بابت انتقال (اختیاری):</label>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {notesList.map((note) => (
              <span
                key={note}
                onClick={() => setSelectedNote(note)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${
                  selectedNote === note
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-98 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              در حال تایید و ثبت تراکنش...
            </span>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>تایید و ادامه پرداخت امن</span>
            </>
          )}
        </button>
      </form>

      {/* Success Dialog Modal */}
      {showSuccessModal && lastTx && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl text-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">تراکنش با موفقیت انجام شد</h3>
              <p className="text-xs text-slate-500 mt-1">مبلغ انتقال بلافاصله از حساب شما کسر گردید.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-200/80 font-persian-num">
              <div className="flex justify-between">
                <span className="text-slate-400">مبلغ واریزی:</span>
                <span className="font-bold text-slate-900">{lastTx.amount.toLocaleString('fa-IR')} ریال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">مقصد:</span>
                <span className="font-bold text-slate-900">{lastTx.counterparty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">کد رهگیری:</span>
                <span className="font-mono font-bold text-slate-700">{lastTx.trackingCode}</span>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-2xl text-xs hover:bg-slate-800 transition cursor-pointer"
            >
              بازگشت به برنامه
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
