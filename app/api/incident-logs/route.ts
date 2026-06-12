import { NextResponse } from 'next/server';
import { getIncidentLogs, saveIncidentLog } from '@/lib/db';
import { sendIncidentNotification } from '@/lib/mailer';

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
    
    // Send email alert (await to ensure it dispatches before response completes)
    try {
      await sendIncidentNotification(newLog);
    } catch (emailErr) {
      console.error('Failed to send email notification:', emailErr);
    }

    return NextResponse.json({ success: true, data: newLog });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}

