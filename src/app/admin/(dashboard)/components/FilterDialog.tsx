import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STATUSES, SERVICES, PRIORITIES, TEAM_MEMBERS } from '../dashboard.helpers';
import { useDashboardStore } from '../store/dashboardStore';

export default function FilterDialog() {
  const {
    statusFilter, setStatusFilter,
    serviceFilter, setServiceFilter,
    priorityFilter, setPriorityFilter,
    addedByFilter, setAddedByFilter
  } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const [tempStatus, setTempStatus] = useState(statusFilter);
  const [tempService, setTempService] = useState(serviceFilter);
  const [tempPriority, setTempPriority] = useState(priorityFilter);
  const [tempAddedBy, setTempAddedBy] = useState(addedByFilter);

  // Sync state when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempStatus(statusFilter);
      setTempService(serviceFilter);
      setTempPriority(priorityFilter);
      setTempAddedBy(addedByFilter);
    }
    setOpen(isOpen);
  };

  const handleApply = () => {
    setStatusFilter(tempStatus);
    setServiceFilter(tempService);
    setPriorityFilter(tempPriority);
    setAddedByFilter(tempAddedBy);
    setOpen(false);
  };

  const handleClear = () => {
    setTempStatus('All');
    setTempService('All');
    setTempPriority('All');
    setTempAddedBy('All');
  };

  const activeFiltersCount = [
    statusFilter !== 'All',
    serviceFilter !== 'All',
    priorityFilter !== 'All',
    addedByFilter !== 'All',
  ].filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center space-x-2 glass-pill px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.04] text-sm font-semibold transition-all relative"
        >
          <Filter className="w-4.5 h-4.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center border-2 border-zinc-950">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-zinc-950/95 border-white/[0.08] shadow-2xl p-6 text-white rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold font-outfit">Filter Leads</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Status</label>
            <Select value={tempStatus} onValueChange={setTempStatus}>
              <SelectTrigger className="w-full bg-zinc-900/60 border-white/[0.05] text-zinc-300 text-sm focus:ring-0">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/[0.05] text-zinc-300">
                <SelectItem value="All">All Statuses</SelectItem>
                {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Service */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Service</label>
            <Select value={tempService} onValueChange={setTempService}>
              <SelectTrigger className="w-full bg-zinc-900/60 border-white/[0.05] text-zinc-300 text-sm focus:ring-0">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/[0.05] text-zinc-300">
                <SelectItem value="All">All Services</SelectItem>
                {SERVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Priority</label>
            <Select value={tempPriority} onValueChange={setTempPriority}>
              <SelectTrigger className="w-full bg-zinc-900/60 border-white/[0.05] text-zinc-300 text-sm focus:ring-0">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/[0.05] text-zinc-300">
                <SelectItem value="All">All Priorities</SelectItem>
                {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p} Priority</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Added By */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Owner (Added By)</label>
            <Select value={tempAddedBy} onValueChange={setTempAddedBy}>
              <SelectTrigger className="w-full bg-zinc-900/60 border-white/[0.05] text-zinc-300 text-sm focus:ring-0">
                <SelectValue placeholder="All Owners" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/[0.05] text-zinc-300">
                <SelectItem value="All">All Owners</SelectItem>
                {TEAM_MEMBERS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-3 mt-6 pt-4 border-t border-white/[0.05]">
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex-1 bg-transparent border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.02]"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 font-bold hover:opacity-90"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
