import { 
  Users, 
  PhoneCall, 
  Activity, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp,
  Target
} from 'lucide-react';

import { useDashboardStore } from '../store/dashboardStore';
import { calculateDashboardKPIs } from '../dashboard.helpers';

export default function DashboardAnalytics() {
  const { leads, statusFilter, setStatusFilter } = useDashboardStore();
  
  const {
    totalLeads,
    needToOutreach,
    activeOutreach,
    bookedCalls,
    totalPipelineValue,
    expectedRevenue,
    conversionRate
  } = calculateDashboardKPIs(leads);

  const handleKpiCardClick = (filter: string) => {
    setStatusFilter(filter);
  };
  return (
    <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col space-y-5">
      <div className="flex items-center space-x-2 px-1">
        <Activity className="w-5 h-5 text-indigo-400" />
        <h2 className="text-zinc-100 font-bold text-lg font-outfit tracking-wide">
          Dashboard Analytics
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Total Leads */}
        <div 
          onClick={() => handleKpiCardClick('All')}
          className={`relative overflow-hidden p-4 rounded-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/10 ${
            statusFilter === 'All' 
              ? 'bg-indigo-950/20 border border-indigo-500/40' 
              : 'bg-zinc-900/30 border border-white/[0.05] hover:border-indigo-500/30'
          }`}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Total</span>
            </div>
            <span className="flex items-center text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
              +12%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2.5 font-outfit z-10">{totalLeads}</div>
          
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all duration-500" />
          <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500/50 to-cyan-500/50 absolute bottom-0 left-0" />
        </div>

        {/* Need to Outreach */}
        <div 
          onClick={() => handleKpiCardClick('Need to Outreach')}
          className={`relative overflow-hidden p-4 rounded-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-500/10 ${
            statusFilter === 'Need to Outreach' 
              ? 'bg-amber-950/20 border border-amber-500/40' 
              : 'bg-zinc-900/30 border border-white/[0.05] hover:border-amber-500/30'
          }`}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <Target className="w-3.5 h-3.5 text-amber-500/70" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Need Out.</span>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-2.5 font-outfit z-10">{needToOutreach}</div>
          
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all duration-500" />
          <div className="h-0.5 w-full bg-gradient-to-r from-amber-500/50 to-orange-500/50 absolute bottom-0 left-0" />
        </div>

        {/* Active Outreach */}
        <div 
          onClick={() => handleKpiCardClick('Outreach Done')}
          className={`relative overflow-hidden p-4 rounded-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/10 ${
            statusFilter === 'Outreach Done' 
              ? 'bg-blue-950/20 border border-blue-500/40' 
              : 'bg-zinc-900/30 border border-white/[0.05] hover:border-blue-500/30'
          }`}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <PhoneCall className="w-3.5 h-3.5 text-blue-500/70" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Active</span>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-blue-400 mt-2.5 font-outfit z-10">{activeOutreach}</div>
          
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/50 to-indigo-500/50 absolute bottom-0 left-0" />
        </div>

        {/* Booked Calls */}
        <div 
          onClick={() => handleKpiCardClick('Booked a call')}
          className={`relative overflow-hidden p-4 rounded-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 ${
            statusFilter === 'Booked a call' 
              ? 'bg-emerald-950/20 border border-emerald-500/40' 
              : 'bg-zinc-900/30 border border-white/[0.05] hover:border-emerald-500/30'
          }`}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Calls</span>
            </div>
            <span className="flex items-center text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
              High
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2.5 font-outfit z-10">{bookedCalls}</div>
          
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all duration-500" />
          <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500/50 to-teal-500/50 absolute bottom-0 left-0" />
        </div>

        {/* Pipeline Value */}
        <div className="col-span-2 relative overflow-hidden p-4 rounded-xl flex flex-col justify-between group transition-all duration-300 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/[0.05] hover:border-cyan-500/30">
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <DollarSign className="w-3.5 h-3.5 text-cyan-500/70" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Pipeline Value</span>
            </div>
            <span className="flex items-center text-[9px] text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded-full">
              {conversionRate}% Win Rate
            </span>
          </div>
          
          <div className="flex items-end justify-between mt-3.5 z-10">
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-outfit">
              ${totalPipelineValue.toLocaleString()}
            </span>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-zinc-500 font-medium">Expected Revenue</span>
              <span className="text-xs font-bold text-cyan-500/80">
                ${expectedRevenue.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all duration-500" />
          <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 absolute bottom-0 left-0" />
        </div>

      </div>
    </div>
  );
}
