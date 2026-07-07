"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { leadFormSchema, LeadFormValues } from '@/schemas/lead.schema';
import { SERVICES, PRIORITIES, TEAM_MEMBERS, STATUSES } from '../dashboard.helpers';

export default function AddLeadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(leadFormSchema) as any,
    defaultValues: {
      name: '',
      service: 'Website',
      addedBy: '',
      priority: 'Medium',
      value: 0,
      description: '',
      instagram: '',
      website: '',
      status: 'Need to Outreach',
      employees: [],
      reasonForFailure: '',
      socials: ''
    }
  });

  const { fields: employees, append, remove } = useFieldArray({
    control: form.control,
    name: "employees"
  });

  const handleSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        contactName: data.employees[0]?.name || '',
        email: data.employees[0]?.email || '',
        emails: data.employees.map(emp => emp.email).filter(Boolean) as string[],
        phone: data.employees[0]?.phone || '',
        reasonForFailure: '',
        socials: ''
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        alert('Failed to add lead');
      }
    } catch {
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-8 flex flex-col space-y-8 min-h-screen pb-24 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="ghost" className="p-2 hover:bg-white/[0.05] rounded-xl text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-white">
            Add New Brand / Lead
          </h1>
        </div>
      </div>

      <div className="glass-panel w-full rounded-2xl border border-white/[0.08] shadow-2xl relative overflow-hidden bg-zinc-950 text-white flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Company/Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Atlas Kitchen"
                        className="w-full px-4 py-3 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Services Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:ring-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICES.map(item => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="addedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Added By</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:ring-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TEAM_MEMBERS.map(item => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Priority</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:ring-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRIORITIES.map(item => (
                            <SelectItem key={item} value={item}>
                              {item} Priority
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Estimated Monthly Budget ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 1500"
                        className="w-full px-4 py-3 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Description / Notes / Thoughts</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="This is a B2B business that has a website, but needs direct sales automation..."
                      className="w-full px-4 py-3 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm resize-none focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employees section */}
            <div className="space-y-4 glass-panel p-5 rounded-xl border border-white/[0.04]">
              <div className="flex justify-between items-center">
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider">Employees / Brand Contacts</label>
                <Button
                  type="button"
                  onClick={() => append({ name: '', role: '', email: '', phone: '' })}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Contact</span>
                </Button>
              </div>

              {employees.map((emp, idx) => (
                <div key={emp.id} className="p-4 bg-black/20 rounded-xl border border-white/[0.02] relative group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                    <FormField
                      control={form.control}
                      name={`employees.${idx}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Employee Name"
                              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/[0.04] text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`employees.${idx}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Role / Job Title (e.g. CEO, Marketing)"
                              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/[0.04] text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                    <FormField
                      control={form.control}
                      name={`employees.${idx}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email Address"
                              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/[0.04] text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`employees.${idx}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Phone Number (Optional)"
                              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/[0.04] text-zinc-200 placeholder-zinc-700 text-sm focus:outline-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {employees.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(idx)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-md text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Instagram Link</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="https://instagram.com/..."
                        className="w-full px-4 py-3 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Website URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-xl glass-input text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 border-t border-white/[0.05]">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Initial Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-200 text-sm focus:ring-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STATUSES.map(item => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6 flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-zinc-950 hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <span>{isSubmitting ? 'Saving...' : 'Save Lead'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
