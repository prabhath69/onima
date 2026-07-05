import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind class merger utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URL formatting helper
export function formatUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

// Styling badge color mapper for status
export function getStatusStyle(status: string) {
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
}

// Styling badge color mapper for services
export function getServiceStyle(service: string) {
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
}

// Styling badge color mapper for lead creator
export function getAddedByStyle(addedBy?: string) {
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
}

// CSV content generator helper
export function generateCSVContent(leads: any[]) {
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
    lead.name || '',
    lead.description || '',
    lead.instagram || '',
    lead.website || '',
    lead.emails && lead.emails.length > 0 ? lead.emails.join('; ') : (lead.email || ''),
    lead.employees && lead.employees.length > 0 
      ? lead.employees.map((e: any) => `${e.name || ''} (${e.role || ''})`).join('; ')
      : (lead.contactName || ''),
    lead.phone || '',
    lead.service || '',
    lead.status || '',
    lead.priority || '',
    lead.value || 0,
    lead.reasonForFailure || '',
    lead.socials || '',
    lead.addedBy || ''
  ]);

  return [
    headers.join(','), 
    ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
  ].join('\n');
}
