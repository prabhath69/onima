import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, Layers, Mail, Phone, Copy, Check, 
  Globe, FileSpreadsheet, Edit, Trash2 
} from 'lucide-react';
import { FaInstagram as Instagram } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  formatUrl, 
  getAddedByStyle, 
  formatDate 
} from '@/utils/lead.utils';
import { getPriorityBadge, getStatusStepNumber } from '../dashboard.helpers';
import { useDashboardStore } from '../store/dashboardStore';

export default function LeadDetailsDialog() {
  const { selectedLead, setSelectedLead, leads, setLeads } = useDashboardStore();
  const router = useRouter();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleEditClick = (id: string) => {
    router.push(`/admin/edit-lead/${id}`);
    setSelectedLead(null);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    const prevLeads = [...leads];
    setLeads(leads.filter(l => l.id !== id));
    setSelectedLead(null);

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

  return (
    <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
      <DialogContent className="max-w-2xl bg-zinc-950/95 border-white/[0.08] shadow-2xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col rounded-2xl text-white">
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
                    ].map((stage) => {
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
                        onClick={() => copyToClipboard(selectedLead.phone || '', 'phone')}
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
                onClick={() => handleEditClick(selectedLead.id)}
                className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 font-bold text-sm hover:opacity-95 transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Brand</span>
              </Button>

              <Button
                onClick={() => handleDeleteClick(selectedLead.id)}
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
  );
}
