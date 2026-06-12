import { NextResponse } from 'next/server';
import { getDirectives, saveDirective } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = getDirectives();
  return NextResponse.json({
    success: true,
    data
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.status) {
      return NextResponse.json({ success: false, error: 'Missing title or status' }, { status: 400 });
    }
    const newDirective = saveDirective(body);
    return NextResponse.json({ success: true, data: newDirective });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
