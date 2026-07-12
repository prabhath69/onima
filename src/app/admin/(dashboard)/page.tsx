"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Download,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import { generateCSVContent } from '@/utils/lead.utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { processLeads } from './dashboard.helpers';
import FilterDialog from './components/FilterDialog';
import LeadCard from './components/LeadCard';
import LeadDetailsDialog from './components/LeadDetailsDialog';
import DashboardAnalytics from './components/DashboardAnalytics';
import { useDashboardStore } from './store/dashboardStore';

export default function AdminDashboard() {
  const {
    leads, setLeads,
    loading, setLoading,
    search, setSearch,
    statusFilter, 
    serviceFilter,
    priorityFilter,
    addedByFilter,
    sortField,
    sortDirection,
    selectedLead, setSelectedLead
  } = useDashboardStore();

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

  // Sorting & Filtering Logic
  const processedLeads = processLeads(
    leads,
    search,
    statusFilter,
    serviceFilter,
    priorityFilter,
    addedByFilter,
    'All', // sourceFilter
    'All', // tagFilter
    sortField,
    sortDirection
  );

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 flex flex-col space-y-8 min-h-screen pb-24 relative">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content (Left Side) */}
        <div className="flex-1 flex flex-col space-y-6 min-w-0 w-full">
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

              <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                <FilterDialog />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 p-6 w-full overflow-y-auto">
                {processedLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLead?.id === lead.id}
                    onClick={() => setSelectedLead(lead)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KPI Section (Right Side) */}
        <div className="flex flex-col space-y-6 w-full lg:w-auto">
          <DashboardAnalytics />
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push('/admin/add-lead')}
              className="flex justify-center items-center space-x-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-95 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-indigo-500/10 hover:scale-[1.02] w-full"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Add Brand Lead</span>
            </Button>

            <Button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="flex justify-center items-center space-x-2 glass-pill px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.04] text-sm font-semibold transition-all w-full"
            >
              <Download className="w-4.5 h-4.5" />
              <span>Export CSV</span>
            </Button>

            <Button
              onClick={handleLogout}
              className="flex justify-center items-center space-x-2 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-full"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Detailed Lead Dialog */}
      <LeadDetailsDialog />

    </div>
  );
}
