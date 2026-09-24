import React from 'react';
import { CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { SmartCard } from '../components/SmartCard';
import { CryptoPocket } from '../components/CryptoPocket';
import { QuickBankingServices } from '../components/QuickBankingServices';
import { ForeignServicesCard } from '../components/ForeignServicesCard';
import { TouristHubCard } from '../components/TouristHubCard';
import { InvestmentFundsCard } from '../components/InvestmentFundsCard';
import { CashbackBanner } from '../components/CashbackBanner';
import { RecentTransactionsList } from '../components/RecentTransactionsList';
import { TabType, ForeignCitizenService, TouristService, InvestmentFund, TransactionItem } from '../types';

interface HomeScreenProps {
  balanceRial: number;
  balanceUsdt: number;
  rate: number;
  transactions: TransactionItem[];
  onDeposit: () => void;
  onWithdraw: () => void;
  onOpenSwap: () => void;
  onOpenSendReceive: () => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenTransferMode: (mode: 'mounes' | 'card' | 'sheba') => void;
  onOpenBills: () => void;
  onOpenRecharge: () => void;
  onOpenCrypto: () => void;
  onOpenQr: () => void;
  onSelectForeignService: (service: ForeignCitizenService) => void;
  onSelectTouristService: (service: TouristService) => void;
  onSelectFund: (fund: InvestmentFund) => void;
  onSelectTransaction: (tx: TransactionItem) => void;
  onCopySuccess: (text: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  balanceRial,
  balanceUsdt,
  rate,
  transactions,
  onDeposit,
  onWithdraw,
  onOpenSwap,
  onOpenSendReceive,
  onNavigateTab,
  onOpenTransferMode,
  onOpenBills,
  onOpenRecharge,
  onOpenCrypto,
  onOpenQr,
  onSelectForeignService,
  onSelectTouristService,
  onSelectFund,
  onSelectTransaction,
  onCopySuccess,
}) => {
  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            سلام پوریا عزیز، روزتون بخیر ✨
          </h1>
          <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>حساب تایید شده سطح طلایی</span>
          </p>
        </div>

        <button
          onClick={() => alert('تنظیمات امنیتی و نمایش صفحه اصلی')}
          aria-label="شخصی‌سازی صفحه"
          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Master Smart Card */}
      <SmartCard
        balanceRial={balanceRial}
        onDeposit={onDeposit}
        onWithdraw={onWithdraw}
        onCopySuccess={onCopySuccess}
      />

      {/* جیب ارزی مونس (USDT تتر) */}
      <CryptoPocket
        balanceUsdt={balanceUsdt}
        rate={rate}
        onOpenSwap={onOpenSwap}
        onOpenSendReceive={onOpenSendReceive}
      />

      {/* خدمات پرکاربرد بانکی */}
      <QuickBankingServices
        onNavigateTab={onNavigateTab}
        onOpenTransferMode={onOpenTransferMode}
        onOpenBills={onOpenBills}
        onOpenRecharge={onOpenRecharge}
        onOpenCrypto={onOpenCrypto}
        onOpenQr={onOpenQr}
      />

      {/* خدمات اتباع و مهاجرین خارجی */}
      <ForeignServicesCard onSelectService={onSelectForeignService} />

      {/* خدمات ویژه گردشگران خارجی (Tourist Hub) */}
      <TouristHubCard onSelectTouristService={onSelectTouristService} />

      {/* سرمایه‌گذاری مونس (صندوق‌های طلا، نقره و درآمد ثابت) */}
      <InvestmentFundsCard onSelectFund={onSelectFund} />

      {/* بنر باشگاه مشتریان و ۱۰ فروشگاه */}
      <CashbackBanner onNavigateToStores={() => onNavigateTab('stores')} />

      {/* آخرین تراکنش‌ها */}
      <RecentTransactionsList
        transactions={transactions}
        onViewAll={() => onNavigateTab('transactions')}
        onSelectTransaction={onSelectTransaction}
      />
    </div>
  );
};
