import React from 'react';
import { Plane, CreditCard, Hotel } from 'lucide-react';
import { TOURIST_SERVICES } from '../data/mockData';
import { TouristService } from '../types';

interface TouristHubCardProps {
  onSelectTouristService: (service: TouristService) => void;
}

export const TouristHubCard: React.FC<TouristHubCardProps> = ({ onSelectTouristService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-4 h-4" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4" />;
      case 'Hotel':
        return <Hotel className="w-4 h-4" />;
      default:
        return <Plane className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-4 border border-indigo-500/30 shadow-xs space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold flex items-center gap-1.5 text-white">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span>خدمات ویژه گردشگران خارجی (Tourist Services)</span>
        </h2>
        <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
          Tourist Hub
        </span>
      </div>

      {/* Grid of Tourist Services */}
      <div className="grid grid-cols-1 gap-2.5">
        {TOURIST_SERVICES.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/20">
                {getIcon(item.iconName)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  {item.title}
                  {item.badge && (
                    <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-1 rounded font-medium">
                      {item.badge}
                    </span>
                  )}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.description}</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTouristService(item)}
              className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition active:scale-95 cursor-pointer whitespace-nowrap ${
                item.actionText === 'درخواست'
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
            >
              {item.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
