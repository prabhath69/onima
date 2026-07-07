import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const lead = await Lead.findById(id);

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Ensure _id is transformed to id and map employees
    const formattedLead = {
      ...lead.toObject(),
      id: lead._id.toString(),
      _id: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      employees: lead.employees?.map((emp: any) => ({
        ...emp,
        _id: emp._id?.toString()
      })) || []
    };

    return NextResponse.json(formattedLead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
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

    await connectToDatabase();

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { $set: updatedLeadData },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
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

    await connectToDatabase();

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
