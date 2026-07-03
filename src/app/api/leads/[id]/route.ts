import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { verifyAdmin } from '@/lib/auth';

const dataFilePath = path.join(process.cwd(), 'src/data/leads.json');

async function readLeads() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeLeads(leads: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const updatedLeadData = await request.json();
    const leads = await readLeads();
    
    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      ...updatedLeadData,
      id
    };
    
    await writeLeads(leads);
    return NextResponse.json(leads[leadIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const leads = await readLeads();
    
    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    leads.splice(leadIndex, 1);
    await writeLeads(leads);
    
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
