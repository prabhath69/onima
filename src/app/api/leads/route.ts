import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const leadData = await request.json();
    
    // We don't need to manually generate an ID, MongoDB will create an _id automatically.
    const newLead = await Lead.create(leadData);
    
    return NextResponse.json(newLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
