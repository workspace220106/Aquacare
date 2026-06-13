import { NextResponse } from 'next/server';
import { PATHOGENS_DB } from '@/lib/pathogens-db';

export const revalidate = 86400; // Cache daily

export async function GET() {
  return NextResponse.json({
    success: true,
    data: Object.values(PATHOGENS_DB)
  });
}
