import { Flame, Zap, Moon } from 'lucide-react';
import { Lead } from '@/types/lead.types';

export const STATUSES = [
  'Need to Outreach',
  'Outreach Done',
  'Rejected',
  'Under objection handling',
  'Booked a call'
] as const;

export const SERVICES = [
  'AI',
  'Website',
  'Outreach',
  'Social Media',
  'Other'
] as const;

export const PRIORITIES = [
  'High',
  'Medium',
  'Low'
] as const;

export const TEAM_MEMBERS = [
  'Pavan',
  'Prabhath',
  'Nitish'
] as const;

export const getPriorityBadge = (priority: Lead['priority']) => {
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

export const getStatusStepNumber = (status: Lead['status']) => {
  switch (status) {
    case 'Need to Outreach': return 1;
    case 'Outreach Done': return 2;
    case 'Under objection handling': return 3;
    case 'Booked a call': return 4;
    case 'Rejected': return -1;
    default: return 0;
  }
};

export const calculateDashboardKPIs = (leads: Lead[]) => {
  const totalLeads = leads.length;
  const bookedCalls = leads.filter(l => l.status === 'Booked a call').length;
  const activeOutreach = leads.filter(l => l.status === 'Outreach Done' || l.status === 'Under objection handling').length;
  const needToOutreach = leads.filter(l => l.status === 'Need to Outreach').length;
  const conversionRate = totalLeads > 0 ? ((bookedCalls / totalLeads) * 100).toFixed(1) : '0';

  const totalPipelineValue = leads
    .filter(l => l.status !== 'Rejected')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);

  const expectedRevenue = Math.round(totalPipelineValue * (Number(conversionRate) / 100));

  return {
    totalLeads,
    bookedCalls,
    activeOutreach,
    needToOutreach,
    conversionRate,
    totalPipelineValue,
    expectedRevenue
  };
};

export const SOURCES_LIST = [
  'LinkedIn',
  'Cold Email',
  'Inbound',
  'Twitter',
  'Referral'
] as const;

export const TAGS_LIST = [
  'Outreach',
  'SAAS',
  'Design',
  'Development',
  'Hot Lead',
  'Enterprise'
] as const;

export const decorateLead = (lead: Lead): Lead => {
  const code = (lead.id || lead.name || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const source = lead.source || SOURCES_LIST[code % SOURCES_LIST.length];
  
  const tag1 = TAGS_LIST[code % TAGS_LIST.length];
  const tag2 = TAGS_LIST[(code + 3) % TAGS_LIST.length];
  const tags = lead.tags && lead.tags.length > 0 ? lead.tags : (tag1 === tag2 ? [tag1] : [tag1, tag2]);

  const dateBase = new Date(lead.updatedAt || lead.createdAt || Date.now());
  const daysToAdd = (code % 7) + 1;
  const followUp = new Date(dateBase.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  const nextFollowUpDate = lead.nextFollowUpDate || followUp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return {
    ...lead,
    source,
    tags,
    nextFollowUpDate
  };
};

export const processLeads = (
  leads: Lead[],
  search: string,
  statusFilter: string,
  serviceFilter: string,
  priorityFilter: string,
  addedByFilter: string,
  sourceFilter: string,
  tagFilter: string,
  sortField: keyof Lead,
  sortDirection: 'asc' | 'desc'
) => {
  return leads
    .map(decorateLead)
    .filter(lead => {
      const matchesSearch = 
        (lead.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (lead.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (lead.contactName || '').toLowerCase().includes(search.toLowerCase()) ||
        (lead.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (lead.emails || []).some(email => (email || '').toLowerCase().includes(search.toLowerCase())) ||
        (lead.source || '').toLowerCase().includes(search.toLowerCase()) ||
        (lead.tags || []).some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
        (lead.employees || []).some(emp => 
          (emp.name || '').toLowerCase().includes(search.toLowerCase()) ||
          (emp.role || '').toLowerCase().includes(search.toLowerCase()) ||
          (emp.email || '').toLowerCase().includes(search.toLowerCase()) ||
          (emp.phone || '').toLowerCase().includes(search.toLowerCase())
        );

      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesService = serviceFilter === 'All' || lead.service === serviceFilter;
      const matchesPriority = priorityFilter === 'All' || lead.priority === priorityFilter;
      const matchesAddedBy = addedByFilter === 'All' || lead.addedBy === addedByFilter;
      const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;
      const matchesTag = tagFilter === 'All' || (lead.tags || []).includes(tagFilter);

      return matchesSearch && matchesStatus && matchesService && matchesPriority && matchesAddedBy && matchesSource && matchesTag;
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
};
