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

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await readLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const lead = await request.json();
    const leads = await readLeads();
    
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    };
    
    leads.push(newLead);
    await writeLeads(leads);
    
    return NextResponse.json(newLead);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
