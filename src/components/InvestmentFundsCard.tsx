import React from 'react';
import { INVESTMENT_FUNDS } from '../data/mockData';
import { InvestmentFund } from '../types';

interface InvestmentFundsCardProps {
  onSelectFund: (fund: InvestmentFund) => void;
}

export const InvestmentFundsCard: React.FC<InvestmentFundsCardProps> = ({ onSelectFund }) => {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>سرمایه‌گذاری مونس (صندوق‌ها)</span>
        </h2>
        <span className="text-[10px] text-slate-500 font-medium">سود روزشمار و مصون از تورم</span>
      </div>

      {/* 3 Funds Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {INVESTMENT_FUNDS.map((fund) => (
          <div
            key={fund.id}
            className={`p-3 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
              fund.id === 'fund-gold'
                ? 'bg-amber-50/50 border-amber-200'
                : fund.id === 'fund-silver'
                ? 'bg-slate-50 border-slate-200'
                : 'bg-blue-50/40 border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{fund.title}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${fund.badgeColor}`}>
                {fund.badge}
              </span>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed">{fund.description}</p>

            <button
              onClick={() => onSelectFund(fund)}
              className={`w-full py-1.5 text-[11px] font-bold rounded-xl transition active:scale-98 cursor-pointer ${fund.buttonColor}`}
            >
              {fund.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
