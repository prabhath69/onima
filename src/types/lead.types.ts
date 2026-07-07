export interface Employee {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface Lead {
  id: string;
  name?: string;
  description: string;
  instagram: string;
  website: string;
  email?: string;
  emails?: string[];
  employees?: Employee[];
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
