"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  X,
  FileSpreadsheet,
  MoreVertical,
  Edit,
  DollarSign,
  Flame,
  Zap,
  Moon,
  ArrowUpDown,
  Copy,
  Check,
  Layers,
} from 'lucide-react';
import { FaInstagram as Instagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  description: string;
  instagram: string;
  website: string;
  email: string;
  contactName: string;
  phone: string;
  service: string;
  status: 'Need to Outreach' | 'Outreach Done' | 'Rejected' | 'Under objection handling' | 'Booked a call';
  reasonForFailure: string;
  socials: string;
  priority: 'Low' | 'Medium' | 'High';
  value: number;
  addedBy?: 'Pavan' | 'Prabhath' | 'Nitish' | '';
  createdAt?: string;
  updatedAt?: string;
}

const STATUSES = [
  'Need to Outreach',
  'Outreach Done',
  'Rejected',
  'Under objection handling',
  'Booked a call'
] as const;

const SERVICES = [
  'AI',
  'Website',
  'Outreach',
  'Social Media',
  'Other'
] as const;

const PRIORITIES = [
  'High',
  'Medium',
  'Low'
] as const;

const TEAM_MEMBERS = [
  'Pavan',
  'Prabhath',
  'Nitish'
] as const;

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
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  // Active items
  const [activeMenuLeadId, setActiveMenuLeadId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [newLead, setNewLead] = useState<Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    instagram: '',
    website: '',
    email: '',
    contactName: '',
    phone: '',
    service: 'Website',
    status: 'Need to Outreach',
    reasonForFailure: '',
    socials: '',
    priority: 'Medium',
    value: 0,
    addedBy: ''
  });

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchLeads();
    
    // Close 3-dot menu on click outside
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveMenuLeadId(null);
      } else {
        setActiveMenuLeadId(null);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
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

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });

      if (response.ok) {
        const createdLead = await response.json();
        setLeads([createdLead, ...leads]);
        setIsAddModalOpen(false);
        // Reset form
        setNewLead({
          name: '',
          description: '',
          instagram: '',
          website: '',
          email: '',
          contactName: '',
          phone: '',
          service: 'Website',
          status: 'Need to Outreach',
          reasonForFailure: '',
          socials: '',
          priority: 'Medium',
          value: 0,
          addedBy: ''
        });
      } else {
        alert('Failed to add lead');
      }
    } catch (error) {
      alert('An error occurred.');
    }
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    try {
      const response = await fetch(`/api/leads/${editingLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLead),
      });

      if (response.ok) {
        const updated = await response.json();
        setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
        
        // Update selectedLead detail drawer if open
        if (selectedLead && selectedLead.id === updated.id) {
          setSelectedLead(updated);
        }
        
        setEditingLead(null);
      } else {
        alert('Failed to update lead');
      }
    } catch (error) {
      alert('An error occurred while updating.');
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
    } catch (error) {
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

    const headers = [
      'Name',
      'Description/Thoughts',
      'Instagram',
      'Website',
      'Email',
      'Contact Name',
      'Phone',
      'Service',
      'Status',
      'Priority',
      'Estimated Value ($)',
      'Reason for failure',
      'Socials/Notes',
      'Added By'
    ];

    const rows = leads.map(lead => [
      lead.name,
      lead.description,
      lead.instagram,
      lead.website,
      lead.email,
      lead.contactName,
      lead.phone,
      lead.service,
      lead.status,
      lead.priority,
      lead.value,
      lead.reasonForFailure,
      lead.socials,
      lead.addedBy || ''
    ]);

    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(','), ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `onima_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // KPI Calculations
  const totalLeads = leads.length;
  const bookedCalls = leads.filter(l => l.status === 'Booked a call').length;
  const activeOutreach = leads.filter(l => l.status === 'Outreach Done' || l.status === 'Under objection handling').length;
  const needToOutreach = leads.filter(l => l.status === 'Need to Outreach').length;
  const conversionRate = totalLeads > 0 ? ((bookedCalls / totalLeads) * 100).toFixed(1) : '0';
  
  // Pipeline Value (sum of values of all active/non-rejected leads)
  const totalPipelineValue = leads
    .filter(l => l.status !== 'Rejected')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);

  const expectedRevenue = Math.round(totalPipelineValue * (Number(conversionRate) / 100));

  // Sorting & Filtering Logic
  const processedLeads = leads
    .filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.description.toLowerCase().includes(search.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());
        
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesService = serviceFilter === 'All' || lead.service === serviceFilter;
      const matchesPriority = priorityFilter === 'All' || lead.priority === priorityFilter;
      const matchesAddedBy = addedByFilter === 'All' || lead.addedBy === addedByFilter;
      
      return matchesSearch && matchesStatus && matchesService && matchesPriority && matchesAddedBy;
    })
    .sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (sortField === 'value') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // KPI Card Filter Trigger
  const handleKpiCardClick = (filterType: string) => {
    setStatusFilter(filterType);
  };

  const getStatusStyle = (status: Lead['status']) => {
    switch (status) {
      case 'Need to Outreach':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Outreach Done':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Under objection handling':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Booked a call':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const getServiceStyle = (service: string) => {
    switch (service?.toLowerCase()) {
      case 'ai':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'website':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      case 'outreach':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'social media':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const getAddedByStyle = (addedBy?: string) => {
    switch (addedBy) {
      case 'Pavan':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Prabhath':
        return 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20';
      case 'Nitish':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const getPriorityBadge = (priority: Lead['priority']) => {
    switch (priority) {
      case 'High':
        return (
          <span className="flex items-center space-x-1 py-1 px-2.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/20">
            <Flame className="w-3 h-3" />
            <span>High</span>
          </span>
        );
      case 'Medium':
        return (
          <span className="flex items-center space-x-1 py-1 px-2.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <Zap className="w-3 h-3" />
            <span>Medium</span>
          </span>
        );
      case 'Low':
        return (
          <span className="flex items-center space-x-1 py-1 px-2.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
            <Moon className="w-3 h-3" />
            <span>Low</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Status Funnel Progress Bar Helpers
  const getStatusStepNumber = (status: Lead['status']) => {
    switch (status) {
      case 'Need to Outreach': return 1;
      case 'Outreach Done': return 2;
      case 'Under objection handling': return 3;
      case 'Booked a call': return 4;
      case 'Rejected': return -1;
      default: return 0;
    }
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
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-indigo-500/10 hover:scale-[1.02]"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Add Brand Lead</span>
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex items-center space-x-2 glass-pill px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.04] text-sm font-semibold transition-all"
          >
            <Download className="w-4.5 h-4.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </button>
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
            <input
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:outline-none cursor-pointer hover:bg-zinc-900"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Service Selector */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:outline-none cursor-pointer hover:bg-zinc-900"
            >
              <option value="All">All Services</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Priority Selector */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:outline-none cursor-pointer hover:bg-zinc-900"
            >
              <option value="All">All Priorities</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p} Priority</option>)}
            </select>

            {/* Added By Selector */}
            <select
              value={addedByFilter}
              onChange={(e) => setAddedByFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.05] text-xs text-zinc-300 focus:outline-none cursor-pointer hover:bg-zinc-900"
            >
              <option value="All">All Owners</option>
              {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/[0.05] bg-zinc-900/40 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <th 
                    onClick={() => handleSort('name')} 
                    className="py-4.5 px-6 w-[320px] cursor-pointer hover:text-white transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1.5">
                      <span>Brand & Thoughts</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </th>
                  <th className="py-4.5 px-6 w-[200px]">Contact Person</th>
                  <th 
                    onClick={() => handleSort('service')} 
                    className="py-4.5 px-6 w-[120px] cursor-pointer hover:text-white transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1.5">
                      <span>Service</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('addedBy')} 
                    className="py-4.5 px-6 w-[120px] cursor-pointer hover:text-white transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1.5">
                      <span>Added By</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('priority')} 
                    className="py-4.5 px-6 w-[120px] cursor-pointer hover:text-white transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1.5">
                      <span>Priority</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('value')} 
                    className="py-4.5 px-6 w-[110px] cursor-pointer hover:text-white transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1.5">
                      <span>Value</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </th>
                  <th className="py-4.5 px-6 w-[180px]">Status</th>
                  <th className="py-4.5 px-6 w-[130px] text-center">Links</th>
                  <th className="py-4.5 px-6 text-center w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] text-sm">
                <AnimatePresence initial={false}>
                  {processedLeads.map((lead, index) => {
                    return (
                      <motion.tr 
                        key={lead.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.4) }}
                        onClick={() => setSelectedLead(lead)}
                        className={`hover:bg-white/[0.02] transition-colors group align-top cursor-pointer ${
                          selectedLead?.id === lead.id ? 'bg-indigo-500/[0.04]' : ''
                        }`}
                      >
                        {/* Name & Description */}
                        <td className="py-4.5 px-6">
                          <div className="font-semibold text-zinc-100 text-base tracking-wide group-hover:text-indigo-400 transition-colors">
                            {lead.name}
                          </div>
                          {lead.description ? (
                            <div className="text-zinc-400 text-xs mt-1 leading-relaxed font-light line-clamp-2 max-w-xs break-words pr-2">
                              {lead.description}
                            </div>
                          ) : (
                            <div className="text-zinc-600 text-xs mt-1 italic font-light">
                              No notes added yet.
                            </div>
                          )}
                        </td>

                        {/* Contact Info */}
                        <td className="py-4.5 px-6" onClick={(e) => e.stopPropagation()}>
                          {lead.contactName ? (
                            <div className="text-zinc-200 font-medium text-sm">
                              {lead.contactName}
                            </div>
                          ) : (
                            <div className="text-zinc-600 text-xs italic font-light">No name</div>
                          )}
                          
                          <div className="space-y-1 mt-1.5">
                            {lead.email && (
                              <a 
                                href={`mailto:${lead.email}`}
                                className="text-[11px] text-zinc-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                              >
                                <Mail className="w-3 h-3 text-zinc-500" />
                                <span className="truncate max-w-[150px]">{lead.email}</span>
                              </a>
                            )}
                            
                            {lead.phone && (
                              <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-zinc-500" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Service */}
                        <td className="py-4.5 px-6">
                          <span className={`inline-block py-1 px-2.5 rounded-full text-xs font-semibold border ${getServiceStyle(lead.service)}`}>
                            {lead.service || 'Other'}
                          </span>
                        </td>

                        {/* Added By */}
                        <td className="py-4.5 px-6">
                          <span className={`inline-block py-1 px-2.5 rounded-full text-xs font-semibold border ${getAddedByStyle(lead.addedBy)}`}>
                            {lead.addedBy || 'N/A'}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="py-4.5 px-6">
                          {getPriorityBadge(lead.priority || 'Medium')}
                        </td>

                        {/* Deal Value */}
                        <td className="py-4.5 px-6 font-semibold text-zinc-200 text-sm">
                          ${(lead.value || 0).toLocaleString()}
                        </td>

                        {/* Status */}
                        <td className="py-4.5 px-6">
                          <span className={`inline-block py-1 px-2.5 rounded-full text-xs font-bold border ${getStatusStyle(lead.status)}`}>
                            {lead.status}
                          </span>
                          
                          {lead.status === 'Rejected' && lead.reasonForFailure && (
                            <div className="text-[11px] text-rose-400 mt-1.5 leading-tight font-light border-l border-rose-500/20 pl-2 max-w-[150px] break-words">
                              {lead.reasonForFailure}
                            </div>
                          )}
                        </td>

                        {/* Quick Links */}
                        <td className="py-4.5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-2">
                            {/* Instagram */}
                            {lead.instagram ? (
                              <a
                                href={formatUrl(lead.instagram)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/25 border border-pink-500/20 text-pink-400 transition-all hover:scale-105"
                                title="Instagram Link"
                              >
                                <Instagram className="w-4 h-4" />
                              </a>
                            ) : (
                              <div 
                                className="p-2 rounded-lg bg-zinc-900/40 border border-white/[0.03] text-zinc-700 cursor-not-allowed" 
                                title="No Instagram Link"
                              >
                                <Instagram className="w-4 h-4" />
                              </div>
                            )}

                            {/* Website */}
                            {lead.website ? (
                              <a
                                href={formatUrl(lead.website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/20 text-cyan-400 transition-all hover:scale-105"
                                title="Website Link"
                              >
                                <Globe className="w-4 h-4" />
                              </a>
                            ) : (
                              <div 
                                className="p-2 rounded-lg bg-zinc-900/40 border border-white/[0.03] text-zinc-700 cursor-not-allowed" 
                                title="No Website Link"
                              >
                                <Globe className="w-4 h-4" />
                              </div>
                            )}

                            {/* Other Socials/Notes */}
                            {lead.socials ? (
                              <a
                                href={formatUrl(lead.socials)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-400 transition-all hover:scale-105"
                                title="Socials/Other Link"
                              >
                                <FileSpreadsheet className="w-4 h-4" />
                              </a>
                            ) : (
                              <div 
                                className="p-2 rounded-lg bg-zinc-900/40 border border-white/[0.03] text-zinc-700 cursor-not-allowed" 
                                title="No Socials/Other Link"
                              >
                                <FileSpreadsheet className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Actions (3-dot menu) */}
                        <td className="py-4.5 px-6 text-center relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuLeadId(activeMenuLeadId === lead.id ? null : lead.id);
                            }}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all"
                            title="Actions Menu"
                          >
                            <MoreVertical className="w-4.5 h-4.5" />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {activeMenuLeadId === lead.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.15 }}
                                ref={dropdownRef}
                                className="absolute right-6 top-13 z-20 w-36 glass-panel rounded-xl border border-white/[0.08] shadow-2xl p-1 text-left"
                              >
                                <button
                                  onClick={() => {
                                    setEditingLead(lead);
                                    setActiveMenuLeadId(null);
                                  }}
                                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                                >
                                  <Edit className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>Edit Lead</span>
                                </button>
                                
                                <button
                                  onClick={() => {
                                    handleDeleteLead(lead.id);
                                    setActiveMenuLeadId(null);
                                  }}
                                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors mt-0.5"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over Lead Detail Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-40 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md"
              >
                <div className="h-full flex flex-col bg-zinc-950/95 border-l border-white/[0.08] shadow-2xl relative">
                  {/* Glowing vertical line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-500" />

                  {/* Header */}
                  <div className="px-6 py-6 border-b border-white/[0.05] flex justify-between items-start bg-zinc-900/20">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">Lead Details</div>
                      <h2 className="text-2xl font-bold text-white mt-1 font-outfit break-words pr-4">{selectedLead.name}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                    
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
                          ].map((stage, i) => {
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
                        {selectedLead.email && (
                          <div className="flex justify-between items-center glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500">Email Address</span>
                              <span className="text-xs text-zinc-200 mt-0.5 break-all max-w-[220px]">{selectedLead.email}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(selectedLead.email, 'email')}
                              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
                              title="Copy Email"
                            >
                              {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        )}

                        {/* Phone */}
                        {selectedLead.phone && (
                          <div className="flex justify-between items-center glass-panel px-4 py-3 rounded-xl border border-white/[0.04]">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500">Phone Number</span>
                              <span className="text-xs text-zinc-200 mt-0.5">{selectedLead.phone}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(selectedLead.phone, 'phone')}
                              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
                              title="Copy Phone"
                            >
                              {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

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
                  </div>

                  {/* Footer Actions */}
                  <div className="px-6 py-6 border-t border-white/[0.05] bg-zinc-900/30 flex space-x-3">
                    <button
                      onClick={() => setEditingLead(selectedLead)}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 font-bold text-sm hover:opacity-95 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Brand</span>
                    </button>
                    
                    <button
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel w-full max-w-2xl rounded-2xl border border-white/[0.08] shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4.5 border-b border-white/[0.05] flex justify-between items-center bg-zinc-900/40">
                <h3 className="text-lg font-bold text-white font-outfit">Add New Brand / Lead</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCreateLead} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Company/Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={newLead.name}
                      onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                      placeholder="e.g. Atlas Kitchen"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Services Type</label>
                    <select
                      value={newLead.service}
                      onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {SERVICES.map(service => (
                        <option key={service} value={service} className="bg-zinc-950 text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Added By *</label>
                    <select
                      required
                      value={newLead.addedBy || ''}
                      onChange={(e) => setNewLead({ ...newLead, addedBy: e.target.value as Lead['addedBy'] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-zinc-950 text-zinc-600">Select...</option>
                      {TEAM_MEMBERS.map(member => (
                        <option key={member} value={member} className="bg-zinc-950 text-white">
                          {member}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Deal Priority</label>
                    <select
                      value={newLead.priority}
                      onChange={(e) => setNewLead({ ...newLead, priority: e.target.value as Lead['priority'] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {PRIORITIES.map(priority => (
                        <option key={priority} value={priority} className="bg-zinc-950 text-white">
                          {priority} Priority
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Estimated Monthly Budget ($)</label>
                    <input
                      type="number"
                      value={newLead.value || ''}
                      onChange={(e) => setNewLead({ ...newLead, value: Number(e.target.value) || 0 })}
                      placeholder="e.g. 1500"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Description / Notes / Thoughts</label>
                  <textarea
                    rows={3}
                    value={newLead.description}
                    onChange={(e) => setNewLead({ ...newLead, description: e.target.value })}
                    placeholder="This is a B2B business that has a website, but needs direct sales automation..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm resize-none focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Contact Person</label>
                    <input
                      type="text"
                      value={newLead.contactName}
                      onChange={(e) => setNewLead({ ...newLead, contactName: e.target.value })}
                      placeholder="e.g. Ernest, Shawn"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                      placeholder="ernest@atlas.kit"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="text"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                      placeholder="e.g. +65 9123 4567"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Instagram Profile</label>
                    <input
                      type="text"
                      value={newLead.instagram}
                      onChange={(e) => setNewLead({ ...newLead, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Website URL</label>
                    <input
                      type="text"
                      value={newLead.website}
                      onChange={(e) => setNewLead({ ...newLead, website: e.target.value })}
                      placeholder="https://atlas.kitchen"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Other Socials/Links</label>
                    <input
                      type="text"
                      value={newLead.socials}
                      onChange={(e) => setNewLead({ ...newLead, socials: e.target.value })}
                      placeholder="Twitter, LinkedIn..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Initial Status</label>
                    <select
                      value={newLead.status}
                      onChange={(e) => setNewLead({ ...newLead, status: e.target.value as Lead['status'] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {STATUSES.map(stat => (
                        <option key={stat} value={stat} className="bg-zinc-950 text-white">
                          {stat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Failure Reason (If any)</label>
                    <input
                      type="text"
                      value={newLead.reasonForFailure}
                      onChange={(e) => setNewLead({ ...newLead, reasonForFailure: e.target.value })}
                      placeholder="Leave blank if not failed..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex justify-end space-x-3 bg-zinc-900/10">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl glass-pill text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.02] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 font-bold text-sm hover:opacity-95 transition-all hover:scale-[1.02]"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Lead Modal */}
      <AnimatePresence>
        {editingLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingLead(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel w-full max-w-2xl rounded-2xl border border-white/[0.08] shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4.5 border-b border-white/[0.05] flex justify-between items-center bg-zinc-900/40">
                <h3 className="text-lg font-bold text-white font-outfit">Edit Brand / Lead</h3>
                <button 
                  onClick={() => setEditingLead(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdateLead} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Company/Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={editingLead.name}
                      onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                      placeholder="e.g. Atlas Kitchen"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Services Type</label>
                    <select
                      value={SERVICES.includes(editingLead.service as any) ? editingLead.service : 'Other'}
                      onChange={(e) => setEditingLead({ ...editingLead, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {SERVICES.map(service => (
                        <option key={service} value={service} className="bg-zinc-950 text-white">
                          {service}
                        </option>
                      ))}
                      {!SERVICES.includes(editingLead.service as any) && editingLead.service && (
                        <option value={editingLead.service} className="bg-zinc-950 text-white">
                          {editingLead.service}
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Added By *</label>
                    <select
                      required
                      value={editingLead.addedBy || ''}
                      onChange={(e) => setEditingLead({ ...editingLead, addedBy: e.target.value as Lead['addedBy'] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-zinc-950 text-zinc-600">Select...</option>
                      {TEAM_MEMBERS.map(member => (
                        <option key={member} value={member} className="bg-zinc-950 text-white">
                          {member}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Deal Priority</label>
                    <select
                      value={editingLead.priority || 'Medium'}
                      onChange={(e) => setEditingLead({ ...editingLead, priority: e.target.value as Lead['priority'] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {PRIORITIES.map(priority => (
                        <option key={priority} value={priority} className="bg-zinc-950 text-white">
                          {priority} Priority
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Estimated Monthly Budget ($)</label>
                    <input
                      type="number"
                      value={editingLead.value || ''}
                      onChange={(e) => setEditingLead({ ...editingLead, value: Number(e.target.value) || 0 })}
                      placeholder="e.g. 1500"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Description / Notes / Thoughts</label>
                  <textarea
                    rows={3}
                    value={editingLead.description}
                    onChange={(e) => setEditingLead({ ...editingLead, description: e.target.value })}
                    placeholder="This is a B2B business that has a website, but needs direct sales automation..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm resize-none focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Contact Person</label>
                    <input
                      type="text"
                      value={editingLead.contactName}
                      onChange={(e) => setEditingLead({ ...editingLead, contactName: e.target.value })}
                      placeholder="e.g. Ernest, Shawn"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      value={editingLead.email}
                      onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                      placeholder="ernest@atlas.kit"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="text"
                      value={editingLead.phone}
                      onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                      placeholder="e.g. +65 9123 4567"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Instagram Profile</label>
                    <input
                      type="text"
                      value={editingLead.instagram}
                      onChange={(e) => setEditingLead({ ...editingLead, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Website URL</label>
                    <input
                      type="text"
                      value={editingLead.website}
                      onChange={(e) => setEditingLead({ ...editingLead, website: e.target.value })}
                      placeholder="https://atlas.kitchen"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Other Socials/Links</label>
                    <input
                      type="text"
                      value={editingLead.socials}
                      onChange={(e) => setEditingLead({ ...editingLead, socials: e.target.value })}
                      placeholder="Twitter, LinkedIn..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Lead Status</label>
                    <select
                      value={editingLead.status}
                      onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as Lead['status'] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {STATUSES.map(stat => (
                        <option key={stat} value={stat} className="bg-zinc-950 text-white">
                          {stat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Failure Reason (If any)</label>
                    <input
                      type="text"
                      value={editingLead.reasonForFailure || ''}
                      onChange={(e) => setEditingLead({ ...editingLead, reasonForFailure: e.target.value })}
                      placeholder="Leave blank if not failed..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex justify-end space-x-3 bg-zinc-900/10">
                  <button
                    type="button"
                    onClick={() => setEditingLead(null)}
                    className="px-5 py-2.5 rounded-xl glass-pill text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.02] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 font-bold text-sm hover:opacity-95 transition-all hover:scale-[1.02]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
