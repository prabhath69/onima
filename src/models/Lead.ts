import mongoose from 'mongoose';

export interface IEmployee {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface ILead extends mongoose.Document {
  name?: string;
  description?: string;
  instagram?: string;
  website?: string;
  email?: string;
  emails?: string[];
  employees?: IEmployee[];
  contactName?: string;
  phone?: string;
  service?: string;
  status: string;
  reasonForFailure?: string;
  socials?: string;
  priority: 'Low' | 'Medium' | 'High';
  value: number;
  addedBy?: 'Pavan' | 'Prabhath' | 'Nitish' | '';
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new mongoose.Schema<ILead>(
  {
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    instagram: { type: String, default: '' },
    website: { type: String, default: '' },
    email: { type: String, default: '' },
    emails: { type: [String], default: [] },
    employees: {
      type: [
        {
          name: { type: String, default: '' },
          role: { type: String, default: '' },
          email: { type: String, default: '' },
          phone: { type: String, default: '' },
        }
      ],
      default: []
    },
    contactName: { type: String, default: '' },
    phone: { type: String, default: '' },
    service: { type: String, default: '' },
    status: { type: String, default: 'Need to Outreach' },
    reasonForFailure: { type: String, default: '' },
    socials: { type: String, default: '' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    value: { type: Number, default: 0 },
    addedBy: { type: String, enum: ['Pavan', 'Prabhath', 'Nitish', ''], default: '' },
  },
  {
    timestamps: true,
  }
);

// This ensures that when the object is converted to JSON, _id becomes id
LeadSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
