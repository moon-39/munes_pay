import React from 'react';
import { LayoutGrid, Store, QrCode, FileText, ArrowLeftRight } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 absolute bottom-0 inset-x-0 z-40">
      <div className="flex items-center justify-around">
        {/* تب ۱: خانه */}
        <button
          id="nav-btn-home"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'home'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">خانه</span>
        </button>

        {/* تب ۲: فروشگاه‌ها */}
        <button
          id="nav-btn-stores"
          onClick={() => onTabChange('stores')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'stores'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Store className={`w-5 h-5 ${activeTab === 'stores' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">فروشگاه‌ها</span>
        </button>

        {/* دکمه ویژه اسکن و پرداخت QR (مرکز) */}
        <button
          id="nav-btn-qr"
          onClick={() => onTabChange('qr')}
          aria-label="پرداخت و اسکن QR"
          className="relative -top-3 w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-95 transition cursor-pointer"
        >
          <QrCode className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* تب ۳: تراکنش‌ها */}
        <button
          id="nav-btn-transactions"
          onClick={() => onTabChange('transactions')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'transactions'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === 'transactions' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">تراکنش‌ها</span>
        </button>

        {/* تب ۴: انتقال وجه */}
        <button
          id="nav-btn-transfer"
          onClick={() => onTabChange('transfer')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'transfer'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <ArrowLeftRight className={`w-5 h-5 ${activeTab === 'transfer' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">انتقال</span>
        </button>
      </div>
    </nav>
  );
};
