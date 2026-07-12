import { create } from 'zustand';
import { Lead } from '@/types/lead.types';

interface DashboardState {
  leads: Lead[];
  loading: boolean;
  search: string;
  statusFilter: string;
  serviceFilter: string;
  priorityFilter: string;
  addedByFilter: string;
  sourceFilter: string;
  tagFilter: string;
  sortField: keyof Lead;
  sortDirection: 'asc' | 'desc';
  selectedLead: Lead | null;
  
  // Actions
  setLeads: (leads: Lead[]) => void;
  setLoading: (loading: boolean) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (filter: string) => void;
  setServiceFilter: (filter: string) => void;
  setPriorityFilter: (filter: string) => void;
  setAddedByFilter: (filter: string) => void;
  setSourceFilter: (filter: string) => void;
  setTagFilter: (filter: string) => void;
  setSortField: (field: keyof Lead) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setSelectedLead: (lead: Lead | null) => void;
  deleteLead: (id: string) => void;
  resetFilters: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  leads: [],
  loading: true,
  search: '',
  statusFilter: 'All',
  serviceFilter: 'All',
  priorityFilter: 'All',
  addedByFilter: 'All',
  sourceFilter: 'All',
  tagFilter: 'All',
  sortField: 'createdAt',
  sortDirection: 'desc',
  selectedLead: null,
  
  setLeads: (leads) => set({ leads }),
  setLoading: (loading) => set({ loading }),
  setSearch: (search) => set({ search }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setServiceFilter: (serviceFilter) => set({ serviceFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  setAddedByFilter: (addedByFilter) => set({ addedByFilter }),
  setSourceFilter: (sourceFilter) => set({ sourceFilter }),
  setTagFilter: (tagFilter) => set({ tagFilter }),
  setSortField: (sortField) => set({ sortField }),
  setSortDirection: (sortDirection) => set({ sortDirection }),
  setSelectedLead: (selectedLead) => set({ selectedLead }),
  deleteLead: (id) => set((state) => ({
    leads: state.leads.filter(l => l.id !== id),
    selectedLead: state.selectedLead?.id === id ? null : state.selectedLead
  })),
  resetFilters: () => set({
    search: '',
    statusFilter: 'All',
    serviceFilter: 'All',
    priorityFilter: 'All',
    addedByFilter: 'All',
    sourceFilter: 'All',
    tagFilter: 'All',
    sortField: 'createdAt',
    sortDirection: 'desc',
  })
}));
