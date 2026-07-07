import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().default(''),
  role: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default('')
});

export const leadFormSchema = z.object({
  name: z.string().min(1, "Company/Brand name is required"),
  service: z.string().default('Website'),
  addedBy: z.string().optional().default(''),
  priority: z.enum(['High', 'Medium', 'Low']).default('Medium'),
  value: z.coerce.number().default(0),
  description: z.string().optional().default(''),
  instagram: z.string().optional().default(''),
  website: z.string().optional().default(''),
  status: z.string().default('Need to Outreach'),
  employees: z.array(employeeFormSchema).default([]),
  reasonForFailure: z.string().optional().default(''),
  socials: z.string().optional().default('')
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
