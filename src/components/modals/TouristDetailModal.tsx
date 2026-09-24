import React, { useState } from 'react';
import { X, Plane, CheckCircle2, CreditCard, Hotel, Send } from 'lucide-react';
import { TouristService } from '../../types';

interface TouristDetailModalProps {
  service: TouristService | null;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export const TouristDetailModal: React.FC<TouristDetailModalProps> = ({
  service,
  onClose,
  onSubmit,
}) => {
  if (!service) return null;

  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('العراق (Iraq)');
  const [hotelName, setHotelName] = useState('هتل اسپیناس پالاس (Espinas Palace)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      onSubmit(service.title);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              {service.id === 'tour-1' ? (
                <Plane className="w-4 h-4" />
              ) : service.id === 'tour-2' ? (
                <CreditCard className="w-4 h-4" />
              ) : (
                <Hotel className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{service.title}</h3>
              <span className="text-[10px] text-slate-400">Tourist Hub Services</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">درخواست شما با موفقیت ثبت شد</h4>
            <p className="text-[11px] text-slate-500">
              کارت توریستی به آدرس هتل شما ارسال شده و نسخه دیجیتال فعال گردید.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 text-xs">
            <p className="text-slate-600 leading-relaxed">{service.description}</p>

            <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-200 space-y-1.5">
              <span className="font-bold text-indigo-950 block">مزایای ویژه گردشگران:</span>
              <ul className="space-y-1 text-[11px] text-indigo-900">
                {service.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">شماره گذرنامه (Passport No):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A92834710"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">ملیت (Nationality):</label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  <option>العراق (Iraq)</option>
                  <option>Turkey (ترکیه)</option>
                  <option>Russia (روسیه)</option>
                  <option>China (چین)</option>
                  <option>Afghanistan (افغانستان)</option>
                  <option>UAE / Oman (امارات و عمان)</option>
                  <option>سایر کشورها (Other Countries)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">محل اقامت یا هتل تحویل:</label>
                <input
                  type="text"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer shadow-xs"
              >
                {isProcessing ? 'در حال تایید گذرنامه...' : 'ثبت و صدور آنی'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
