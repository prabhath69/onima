"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Search, 
  Download, 
  Globe, 
  Mail, 
  Phone, 
  User, 
  LogOut, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Filter, 
  Save, 
  X,
  FileSpreadsheet
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
}

const STATUSES = [
  'Need to Outreach',
  'Outreach Done',
  'Rejected',
  'Under objection handling',
  'Booked a call'
] as const;

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [savingStatus, setSavingStatus] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({});
  
  // Add Lead Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState<Omit<Lead, 'id'>>({
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
    socials: ''
  });

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

  const handleLocalFieldChange = (id: string, field: keyof Lead, value: string) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => (lead.id === id ? { ...lead, [field]: value } : lead))
    );
  };

  const handleSaveField = async (id: string, field: keyof Lead, value: string) => {
    setSavingStatus(prev => ({ ...prev, [id]: 'saving' }));

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        setSavingStatus(prev => ({ ...prev, [id]: 'saved' }));
        setTimeout(() => {
          setSavingStatus(prev => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
          });
        }, 1500);
      } else {
        setSavingStatus(prev => ({ ...prev, [id]: 'error' }));
      }
    } catch (error) {
      setSavingStatus(prev => ({ ...prev, [id]: 'error' }));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    // Save previous state for rollback
    const prevLeads = [...leads];
    setLeads(leads.filter(l => l.id !== id));

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
        setLeads([...leads, createdLead]);
        setIsModalOpen(false);
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
          socials: ''
        });
      } else {
        alert('Failed to add lead');
      }
    } catch (error) {
      alert('An error occurred.');
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

  // CSV export handler
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
      'Reason for failure',
      'Socials/Notes'
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
      lead.reasonForFailure,
      lead.socials
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

  // Filtering
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.description.toLowerCase().includes(search.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalLeads = leads.length;
  const bookedCalls = leads.filter(l => l.status === 'Booked a call').length;
  const activeOutreach = leads.filter(l => l.status === 'Outreach Done' || l.status === 'Under objection handling').length;
  const needToOutreach = leads.filter(l => l.status === 'Need to Outreach').length;
  const conversionRate = totalLeads > 0 ? ((bookedCalls / totalLeads) * 100).toFixed(1) : '0';

  // Status Styling map matching the user's screenshot
  const getStatusStyle = (status: Lead['status']) => {
    switch (status) {
      case 'Need to Outreach':
        return 'bg-[#5e3a24] text-[#ffd6b5] border-[#8a5234]';
      case 'Outreach Done':
        return 'bg-[#404040] text-[#e3e3e3] border-[#5e5e5e]';
      case 'Rejected':
        return 'bg-[#7f1d1d] text-[#fecaca] border-[#991b1b]';
      case 'Under objection handling':
        return 'bg-[#1e3a8a] text-[#dbeafe] border-[#1e40af]';
      case 'Booked a call':
        return 'bg-[#064e3b] text-[#d1fae5] border-[#065f46]';
      default:
        return 'bg-[#27272a] text-[#e4e4e7] border-[#3f3f46]';
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col space-y-8 min-h-screen pb-24">
      {/* Upper bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight font-outfit text-white">
              Leads Pipeline
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
              Live DB
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1 font-light">
            Manage your outreach campaigns, brands list, and booked calls.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 text-zinc-950 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md shadow-indigo-500/10 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brand Lead</span>
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex items-center space-x-2 glass-pill px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.03] text-sm font-semibold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Total Leads</div>
          <div className="text-3xl font-extrabold text-white mt-2 font-outfit">{totalLeads}</div>
          <div className="h-1 w-full bg-indigo-500/30 absolute bottom-0 left-0" />
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Need to Outreach</div>
          <div className="text-3xl font-extrabold text-amber-500 mt-2 font-outfit">{needToOutreach}</div>
          <div className="h-1 w-full bg-amber-500/30 absolute bottom-0 left-0" />
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Outreach Active</div>
          <div className="text-3xl font-extrabold text-blue-400 mt-2 font-outfit">{activeOutreach}</div>
          <div className="h-1 w-full bg-blue-500/30 absolute bottom-0 left-0" />
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Booked Calls</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-outfit">{bookedCalls}</div>
          <div className="h-1 w-full bg-emerald-500/30 absolute bottom-0 left-0" />
        </div>

        <div className="glass-panel p-5 rounded-2xl col-span-2 md:col-span-1 flex flex-col justify-between relative overflow-hidden">
          <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Conversion Rate</div>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="text-3xl font-extrabold text-cyan-400 font-outfit">{conversionRate}%</span>
            <TrendingUp className="w-4 h-4 text-cyan-400 inline" />
          </div>
          <div className="h-1 w-full bg-cyan-500/30 absolute bottom-0 left-0" />
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-4 rounded-2xl">
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
          <span className="text-xs text-zinc-400 mr-2 whitespace-nowrap">Status Filter:</span>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...STATUSES].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === status
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium'
                    : 'bg-zinc-900/30 hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spreadsheet grid */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="h-8 w-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-zinc-500 text-sm">Loading leads database...</span>
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center text-zinc-500 text-sm">
            <AlertCircle className="w-8 h-8 text-zinc-600 mb-2" />
            <span>No leads found matching current filters.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="border-b border-white/[0.05] bg-zinc-900/40 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-4 w-[160px]">Name</th>
                  <th className="py-4 px-4 w-[280px]">Description/Thoughts</th>
                  <th className="py-4 px-4 w-[140px]">Contact Person</th>
                  <th className="py-4 px-4 w-[160px]">Email</th>
                  <th className="py-4 px-4 w-[120px]">Phone</th>
                  <th className="py-4 px-4 w-[110px]">Service</th>
                  <th className="py-4 px-4 w-[170px]">Status</th>
                  <th className="py-4 px-4 w-[180px]">Failure Reason</th>
                  <th className="py-4 px-4 w-[130px]">Instagram / Web / Socials</th>
                  <th className="py-4 px-4 text-center w-[70px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] text-sm">
                {filteredLeads.map((lead) => {
                  const saveState = savingStatus[lead.id] || 'idle';

                  return (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      {/* Name */}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={lead.name}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'name', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'name', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-zinc-100 font-medium"
                        />
                      </td>

                      {/* Description */}
                      <td className="py-3 px-4">
                        <textarea
                          rows={2}
                          value={lead.description}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'description', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'description', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-zinc-400 text-xs resize-none"
                          placeholder="Add thoughts..."
                        />
                      </td>

                      {/* Contact Name */}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={lead.contactName}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'contactName', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'contactName', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-zinc-300 text-xs"
                          placeholder="Contact Name"
                        />
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4">
                        <input
                          type="email"
                          value={lead.email}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'email', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'email', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-zinc-300 text-xs"
                          placeholder="email@address.com"
                        />
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={lead.phone}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'phone', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'phone', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-zinc-300 text-xs"
                          placeholder="Phone"
                        />
                      </td>

                      {/* Service */}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={lead.service}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'service', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'service', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-zinc-300 text-xs"
                          placeholder="e.g. AI / Web"
                        />
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => {
                            const val = e.target.value as Lead['status'];
                            handleLocalFieldChange(lead.id, 'status', val);
                            handleSaveField(lead.id, 'status', val);
                          }}
                          className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold border focus:outline-none cursor-pointer ${getStatusStyle(lead.status)}`}
                        >
                          {STATUSES.map(stat => (
                            <option key={stat} value={stat} className="bg-zinc-950 text-white">
                              {stat}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Failure Reason */}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={lead.reasonForFailure}
                          onChange={(e) => handleLocalFieldChange(lead.id, 'reasonForFailure', e.target.value)}
                          onBlur={(e) => handleSaveField(lead.id, 'reasonForFailure', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-1 text-red-300/80 text-xs"
                          placeholder="Reason if fail..."
                        />
                      </td>

                      {/* Links / Socials */}
                      <td className="py-3 px-4">
                        <div className="space-y-1 text-xs">
                          {/* Instagram Link input */}
                          <div className="flex items-center space-x-1">
                            <Instagram className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                            <input
                              type="text"
                              value={lead.instagram}
                              onChange={(e) => handleLocalFieldChange(lead.id, 'instagram', e.target.value)}
                              onBlur={(e) => handleSaveField(lead.id, 'instagram', e.target.value)}
                              onKeyDown={handleKeyDown}
                              className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-0.5 text-[11px] text-zinc-400 placeholder-zinc-700"
                              placeholder="Instagram link"
                            />
                          </div>

                          {/* Website Link input */}
                          <div className="flex items-center space-x-1">
                            <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <input
                              type="text"
                              value={lead.website}
                              onChange={(e) => handleLocalFieldChange(lead.id, 'website', e.target.value)}
                              onBlur={(e) => handleSaveField(lead.id, 'website', e.target.value)}
                              onKeyDown={handleKeyDown}
                              className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-0.5 text-[11px] text-zinc-400 placeholder-zinc-700"
                              placeholder="Website link"
                            />
                          </div>

                          {/* Other Socials/Notes input */}
                          <div className="flex items-center space-x-1">
                            <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                            <input
                              type="text"
                              value={lead.socials}
                              onChange={(e) => handleLocalFieldChange(lead.id, 'socials', e.target.value)}
                              onBlur={(e) => handleSaveField(lead.id, 'socials', e.target.value)}
                              onKeyDown={handleKeyDown}
                              className="w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none py-0.5 text-[11px] text-zinc-400 placeholder-zinc-700"
                              placeholder="Other socials/notes"
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {/* Live save indicator */}
                          {saveState === 'saving' && (
                            <span className="h-3.5 w-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                          )}
                          {saveState === 'saved' && (
                            <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Saved</span>
                          )}
                          {saveState === 'error' && (
                            <span className="text-[10px] text-red-400 font-bold uppercase">Fail</span>
                          )}
                          
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel w-full max-w-2xl rounded-2xl border border-white/[0.08] shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-zinc-900/40">
                <h3 className="text-lg font-bold text-white font-outfit">Add New Brand / Lead</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCreateLead} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
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
                    <input
                      type="text"
                      value={newLead.service}
                      onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                      placeholder="e.g. Website, AI"
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
                      placeholder="Purchase Paid..."
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/[0.06] text-zinc-200 text-sm focus:outline-none cursor-pointer"
                    >
                      {STATUSES.map(stat => (
                        <option key={stat} value={stat}>
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
                    onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}
