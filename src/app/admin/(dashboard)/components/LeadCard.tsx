import React from 'react';
import { DollarSign } from 'lucide-react';
import { Lead } from '@/types/lead.types';
import { formatDate } from '@/utils/lead.utils';

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onClick: () => void;
}

export default function LeadCard({ lead, isSelected, onClick }: LeadCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`relative glass-panel p-5 rounded-2xl border shadow-lg cursor-pointer transition-all duration-300 group flex flex-col min-h-[140px] ${
        isSelected 
          ? 'border-indigo-500/50 bg-indigo-500/[0.02]' 
          : 'border-white/[0.04] hover:bg-white/[0.02] hover:scale-[1.02] hover:border-indigo-500/20'
      }`}
    >
      {/* Priority Dot */}
      <div 
        className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full shadow-sm ${
          lead.priority === 'High' ? 'bg-rose-500 shadow-rose-500/50' :
          lead.priority === 'Low' ? 'bg-emerald-500 shadow-emerald-500/50' :
          'bg-amber-500 shadow-amber-500/50'
        }`}
        title={`${lead.priority || 'Medium'} Priority`}
      />

      <h3 className="text-zinc-100 font-bold text-lg truncate pr-6 group-hover:text-indigo-400 transition-colors mb-4">
        {lead.name || 'Unnamed Brand'}
      </h3>
      
      <div className="space-y-2 mt-auto">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-medium">Service</span>
          <span className="text-zinc-300 font-semibold">{lead.service || 'Other'}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-medium">Last Updated</span>
          <span className="text-zinc-300 font-light">{formatDate(lead.updatedAt)}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/[0.04]">
          <span className="text-zinc-500 font-medium">Deal Value</span>
          <span className="text-cyan-400 font-bold flex items-center text-sm">
            <DollarSign className="w-3.5 h-3.5 -ml-0.5" />
            {(lead.value || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
