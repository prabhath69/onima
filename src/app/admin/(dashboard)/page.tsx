"use client";

import  { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Search, 
  Download, 
  Globe, 
  Mail, 
  Phone, 
  LogOut, 
  AlertCircle, 
  Filter,
  FileSpreadsheet,
  Edit,
  DollarSign,
  Copy,
  Check,
  Layers,
} from 'lucide-react';
import { FaInstagram as Instagram } from 'react-icons/fa';
import { formatUrl, getStatusStyle, getServiceStyle, getAddedByStyle, generateCSVContent, formatDate } from '@/utils/lead.utils';
import {  Lead } from '@/types/lead.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { 
  STATUSES, 
  SERVICES, 
  PRIORITIES, 
  TEAM_MEMBERS, 
  getPriorityBadge, 
  getStatusStepNumber, 
  calculateDashboardKPIs, 
  processLeads 
} from './dashboard.helpers';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [addedByFilter, setAddedByFilter] = useState<string>('All');

  // Sorting State
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Copy indicators
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Active items
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    const prevLeads = [...leads];
    setLeads(leads.filter(l => l.id !== id));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setLeads(prevLeads);
        alert('Failed to delete lead.');
      }
    } catch {
      setLeads(prevLeads);
      alert('An error occurred while deleting.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const csvContent = "data:text/csv;charset=utf-8," + generateCSVContent(leads);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `onima_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // KPI Calculations
  const {
    totalLeads,
    bookedCalls,
    activeOutreach,
    needToOutreach,
    conversionRate,
    totalPipelineValue,
    expectedRevenue
  } = calculateDashboardKPIs(leads);

  // Sorting & Filtering Logic
  const processedLeads = processLeads(
    leads,
    search,
    statusFilter,
    serviceFilter,
    priorityFilter,
    addedByFilter,
    sortField,
    sortDirection
  );

  // KPI Card Filter Trigger
  const handleKpiCardClick = (filterType: string) => {
    setStatusFilter(filterType);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col space-y-8 min-h-screen pb-24 relative">
      {/* Upper bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight font-outfit text-white">
              Leads Pipeline
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-medium">
              Live DB
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1 font-light">
            Manage your outreach campaigns, brands list, and booked calls.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <Button
            onClick={() => router.push('/admin/add-lead')}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-indigo-500/10 hover:scale-[1.02]"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Add Brand Lead</span>
          </Button>

          <Button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex items-center space-x-2 glass-pill px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.04] text-sm font-semibold transition-all"
          >
            <Download className="w-4.5 h-4.5" />
            <span>Export CSV</span>
          </Button>

          <Button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div 
          onClick={() => handleKpiCardClick('All')}
          className={`glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
            statusFilter === 'All' ? 'ring-2 ring-indigo-500/50 bg-indigo-500/[0.03]' : ''
          }`}
        >
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Total Leads</div>
          <div className="text-3xl font-extrabold text-white mt-2 font-outfit">{totalLeads}</div>
          <div className="h-1 w-full bg-indigo-500/30 absolute bottom-0 left-0" />
        </div>

        <div 
          onClick={() => handleKpiCardClick('Need to Outreach')}
          className={`glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
            statusFilter === 'Need to Outreach' ? 'ring-2 ring-amber-500/50 bg-amber-500/[0.03]' : ''
          }`}
        >
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Need to Outreach</div>
          <div className="text-3xl font-extrabold text-amber-500 mt-2 font-outfit">{needToOutreach}</div>
          <div className="h-1 w-full bg-amber-500/30 absolute bottom-0 left-0" />
        </div>

        <div 
          onClick={() => handleKpiCardClick('Outreach Done')}
          className={`glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
            statusFilter === 'Outreach Done' ? 'ring-2 ring-blue-500/50 bg-blue-500/[0.03]' : ''
          }`}
        >
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Outreach Active</div>
          <div className="text-3xl font-extrabold text-blue-400 mt-2 font-outfit">{activeOutreach}</div>
          <div className="h-1 w-full bg-blue-500/30 absolute bottom-0 left-0" />
        </div>

        <div 
          onClick={() => handleKpiCardClick('Booked a call')}
          className={`glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
            statusFilter === 'Booked a call' ? 'ring-2 ring-emerald-500/50 bg-emerald-500/[0.03]' : ''
          }`}
        >
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Booked Calls</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-outfit">{bookedCalls}</div>
          <div className="h-1 w-full bg-emerald-500/30 absolute bottom-0 left-0" />
        </div>

        <div 
          className="glass-panel p-5 rounded-2xl col-span-2 md:col-span-1 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
        >
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Pipeline Value</div>
          <div className="flex flex-col mt-2">
            <span className="text-2xl font-extrabold text-cyan-400 font-outfit">${totalPipelineValue.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-500 mt-0.5">Exp. Revenue: ${expectedRevenue.toLocaleString()} ({conversionRate}%)</span>
          </div>
          <div className="h-1 w-full bg-cyan-500/30 absolute bottom-0 left-0" />
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col gap-4 glass-panel p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search leads, descriptions, contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/50 border border-white/[0.05] text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400 mr-2 whitespace-nowrap">Filters:</span>

            {/* Status Selector */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:ring-0">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Service Selector */}
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[140px] px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:ring-0">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Services</SelectItem>
                {SERVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Priority Selector */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px] px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:ring-0">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p} Priority</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Added By Selector */}
            <Select value={addedByFilter} onValueChange={setAddedByFilter}>
              <SelectTrigger className="w-[140px] px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:ring-0">
                <SelectValue placeholder="All Owners" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Owners</SelectItem>
                {TEAM_MEMBERS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Spreadsheet / Leads Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="h-8 w-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-zinc-500 text-sm">Loading leads database...</span>
            </div>
          </div>
        ) : processedLeads.length === 0 ? (
          <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center text-zinc-500 text-sm">
            <AlertCircle className="w-8 h-8 text-zinc-600 mb-2" />
            <span>No leads found matching current filters.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-6 w-full overflow-y-auto">
            {processedLeads.map((lead) => (
              <div 
                key={lead.id} 
                onClick={() => setSelectedLead(lead)}
                className={`glass-panel p-5 rounded-2xl border shadow-lg cursor-pointer transition-all duration-300 group flex flex-col min-h-[160px] ${
                  selectedLead?.id === lead.id 
                    ? 'border-indigo-500/50 bg-indigo-500/[0.02]' 
                    : 'border-white/[0.04] hover:bg-white/[0.02] hover:scale-[1.02] hover:border-indigo-500/20'
                }`}
              >
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-zinc-100 font-bold text-base truncate group-hover:text-indigo-400 transition-colors">
                    {lead.name || 'Unnamed Brand'}
                  </h3>
                  <span className={`inline-block py-0.5 px-2 rounded-full text-[9px] font-bold border shrink-0 ${getStatusStyle(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                
                {lead.description ? (
                  <p className="text-zinc-400 text-[11px] font-light line-clamp-2 mb-4 leading-relaxed">
                    {lead.description}
                  </p>
                ) : (
                  <p className="text-zinc-600 text-[11px] italic font-light mb-4">No notes added.</p>
                )}
                
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-medium">Service</span>
                    <span className={`py-0.5 px-2 rounded-md font-semibold border text-[10px] ${getServiceStyle(lead.service)}`}>
                      {lead.service || 'Other'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-medium">Priority</span>
                    <span>{getPriorityBadge(lead.priority || 'Medium')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-white/[0.04]">
                    <span className="text-zinc-500 font-medium">Deal Value</span>
                    <span className="text-cyan-400 font-bold flex items-center">
                      <DollarSign className="w-3.5 h-3.5 -ml-0.5" />
                      {(lead.value || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detailed Lead Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-2xl bg-zinc-950/95 border-white/[0.08] shadow-2xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
          {selectedLead && (
            <>
              {/* Glowing horizontal line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500" />

              {/* Header */}
              <div className="px-6 py-6 border-b border-white/[0.05] bg-zinc-900/40 shrink-0">
                <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">Lead Details</div>
                <DialogTitle className="text-2xl font-bold text-white mt-1 font-outfit break-words pr-8">
                  {selectedLead.name || 'Unnamed Brand'}
                </DialogTitle>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">


                    {/* Deal Value, Priority & Added By Row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="glass-panel p-3.5 rounded-xl flex flex-col justify-center">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Deal Value</div>
                        <div className="text-lg font-extrabold text-cyan-400 font-outfit mt-1 flex items-center">
                          <DollarSign className="w-3.5 h-3.5 text-cyan-400 -ml-0.5" />
                          <span>{(selectedLead.value || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="glass-panel p-3.5 rounded-xl flex flex-col justify-center">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Priority</div>
                        <div className="mt-1">{getPriorityBadge(selectedLead.priority || 'Medium')}</div>
                      </div>

                      <div className="glass-panel p-3.5 rounded-xl flex flex-col justify-center">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold font-outfit">Added By</div>
                        <div className="mt-1">
                          <span className={`inline-block py-0.5 px-2 rounded-full text-[11px] font-bold border ${getAddedByStyle(selectedLead.addedBy)}`}>
                            {selectedLead.addedBy || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pathway Timeline */}
                    <div className="glass-panel p-4 rounded-xl">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold mb-4 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Outreach Stage</span>
                      </div>

                      {selectedLead.status === 'Rejected' ? (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                          <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Outreach Terminated</div>
                          <div className="text-sm text-zinc-300 mt-1 leading-normal font-light">
                            {selectedLead.reasonForFailure || 'No failure reason specified.'}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {[
                            { name: 'Need to Outreach', step: 1 },
                            { name: 'Outreach Done', step: 2 },
                            { name: 'Under Objection', step: 3 },
                            { name: 'Booked Call 🎉', step: 4 }
                          ].map((stage, _i) => {
                            const currentStep = getStatusStepNumber(selectedLead.status);
                            const isActive = currentStep >= stage.step;
                            const isCurrent = currentStep === stage.step;

                            return (
                              <div key={stage.name} className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${
                                  isActive 
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-sm shadow-emerald-500/10' 
                                    : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                                }`}>
                                  {stage.step}
                                </div>
                                <span className={`text-xs font-semibold ${
                                  isCurrent 
                                    ? 'text-white font-bold' 
                                    : isActive ? 'text-zinc-300' : 'text-zinc-500'
                                }`}>
                                  {stage.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* About Section */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Notes & Thoughts</h4>
                      <div className="glass-panel p-4 rounded-xl bg-zinc-900/10 border border-white/[0.04] text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                        {selectedLead.description || 'No description notes saved for this brand yet.'}
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Contact Details</h4>

                      <div className="space-y-2">
                        {/* Contact Name */}
                        <div className="flex justify-between items-center glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                          <span className="text-xs text-zinc-500">Contact Person</span>
                          <span className="text-sm font-semibold text-zinc-200">{selectedLead.contactName || 'N/A'}</span>
                        </div>
                         {/* Email */}
                         {selectedLead.emails && selectedLead.emails.length > 0 ? (
                           selectedLead.emails.map((email, idx) => email && (
                             <div key={idx} className="flex justify-between items-center glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                               <div className="flex flex-col">
                                 <span className="text-[10px] text-zinc-500">Email Address {selectedLead.emails && selectedLead.emails.length > 1 ? `#${idx + 1}` : ''}</span>
                                 <span className="text-xs text-zinc-200 mt-0.5 break-all max-w-[220px]">{email}</span>
                               </div>
                               <Button
                                 onClick={() => copyToClipboard(email, email)}
                                 className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
                                 title="Copy Email"
                               >
                                 {copiedField === email ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                               </Button>
                             </div>
                           ))
                         ) : (
                           selectedLead.email && (
                             <div className="flex justify-between items-center glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                               <div className="flex flex-col">
                                 <span className="text-[10px] text-zinc-500">Email Address</span>
                                 <span className="text-xs text-zinc-200 mt-0.5 break-all max-w-[220px]">{selectedLead.email}</span>
                               </div>
                               <Button
                                 onClick={() => copyToClipboard(selectedLead.email || '', selectedLead.email || '')}
                                 className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
                                 title="Copy Email"
                               >
                                 {copiedField === selectedLead.email ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                               </Button>
                             </div>
                           )
                         )}

                        {/* Phone */}
                        {selectedLead.phone && (
                          <div className="flex justify-between items-center glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500">Phone Number</span>
                              <span className="text-xs text-zinc-200 mt-0.5">{selectedLead.phone}</span>
                            </div>
                            <Button
                              onClick={() => copyToClipboard(selectedLead.phone, 'phone')}
                              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
                              title="Copy Phone"
                            >
                              {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Employees list in details drawer */}
                    {selectedLead.employees && selectedLead.employees.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Employees / Team Members</h4>
                        <div className="space-y-3">
                          {selectedLead.employees.map((emp, idx) => (
                            <div key={idx} className="glass-panel p-3.5 rounded-xl border border-white/[0.04] space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-sm font-bold text-zinc-100">{emp.name || 'Unnamed Employee'}</div>
                                  {emp.role && <div className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">{emp.role}</div>}
                                </div>
                              </div>

                              <div className="space-y-1.5 pt-1.5 border-t border-white/[0.02] text-xs">
                                {emp.email && (
                                  <div className="flex justify-between items-center">
                                    <a 
                                      href={`mailto:${emp.email}`} 
                                      className="text-zinc-400 hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                                    >
                                      <Mail className="w-3 h-3 text-zinc-500" />
                                      <span className="truncate max-w-[180px]">{emp.email}</span>
                                    </a>
                                    <Button
                                      onClick={() => copyToClipboard(emp.email || '', `emp-email-${idx}`)}
                                      className="p-1 rounded text-zinc-500 hover:text-zinc-200 transition-colors"
                                      title="Copy Email"
                                    >
                                      {copiedField === `emp-email-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </Button>
                                  </div>
                                )}

                                {emp.phone && (
                                  <div className="flex justify-between items-center">
                                    <div className="text-zinc-400 flex items-center gap-1.5">
                                      <Phone className="w-3 h-3 text-zinc-500" />
                                      <span>{emp.phone}</span>
                                    </div>
                                    <Button
                                      onClick={() => copyToClipboard(emp.phone || '', `emp-phone-${idx}`)}
                                      className="p-1 rounded text-zinc-500 hover:text-zinc-200 transition-colors"
                                      title="Copy Phone"
                                    >
                                      {copiedField === `emp-phone-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Access Large Social Cards */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">External Links</h4>

                      <div className="grid grid-cols-3 gap-2">
                        {/* Instagram */}
                        {selectedLead.instagram ? (
                          <a
                            href={formatUrl(selectedLead.instagram)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/15 border border-pink-500/20 text-pink-400 transition-all hover:scale-102 text-center"
                          >
                            <Instagram className="w-5 h-5 mb-1.5" />
                            <span className="text-[10px] font-semibold">Instagram</span>
                          </a>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/40 border border-white/[0.03] text-zinc-700 text-center cursor-not-allowed">
                            <Instagram className="w-5 h-5 mb-1.5" />
                            <span className="text-[10px] font-semibold">Instagram</span>
                          </div>
                        )}

                        {/* Website */}
                        {selectedLead.website ? (
                          <a
                            href={formatUrl(selectedLead.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 transition-all hover:scale-102 text-center"
                          >
                            <Globe className="w-5 h-5 mb-1.5" />
                            <span className="text-[10px] font-semibold">Website</span>
                          </a>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/40 border border-white/[0.03] text-zinc-700 text-center cursor-not-allowed">
                            <Globe className="w-5 h-5 mb-1.5" />
                            <span className="text-[10px] font-semibold">Website</span>
                          </div>
                        )}

                        {/* Other Socials */}
                        {selectedLead.socials ? (
                          <a
                            href={formatUrl(selectedLead.socials)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 transition-all hover:scale-102 text-center"
                          >
                            <FileSpreadsheet className="w-5 h-5 mb-1.5" />
                            <span className="text-[10px] font-semibold">Socials/Notes</span>
                          </a>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/40 border border-white/[0.03] text-zinc-700 text-center cursor-not-allowed">
                            <FileSpreadsheet className="w-5 h-5 mb-1.5" />
                            <span className="text-[10px] font-semibold">Socials</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Added On</div>
                        <div className="text-xs text-zinc-300 font-light">{formatDate(selectedLead.createdAt)}</div>
                      </div>
                      <div className="glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Last Updated</div>
                        <div className="text-xs text-zinc-300 font-light">{formatDate(selectedLead.updatedAt)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-6 py-5 border-t border-white/[0.05] bg-zinc-900/40 flex space-x-3 shrink-0">
                    <Button
                      onClick={() => router.push('/admin/edit-lead/' + selectedLead.id)}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 font-bold text-sm hover:opacity-95 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Brand</span>
                    </Button>

                    <Button
                      onClick={() => {
                        handleDeleteLead(selectedLead.id);
                        setSelectedLead(null);
                      }}
                      className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
