import { NextResponse } from 'next/server';
import { getIncidentLogs, saveIncidentLog } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = getIncidentLogs();
  return NextResponse.json({
    success: true,
    data
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.vector || !body.coordinates || !body.severity || !body.notes) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: vector, coordinates, severity, or notes' },
        { status: 400 }
      );
    }
    const newLog = saveIncidentLog(body);
    return NextResponse.json({ success: true, data: newLog });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
