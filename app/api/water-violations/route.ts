import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache and revalidate every 24 hours

export async function GET() {
  try {
    // In a real implementation, this would fetch from EPA SDWIS API
    // https://data.epa.gov/efservice/VIOLATION/
    
    // Using robust fallback data as specified in the implementation plan
    const mockViolations = [
      {
        id: 'V-2024-001',
        system_name: 'ALBANY WATER BOARD',
        state: 'NY',
        violation_type: 'Maximum Contaminant Level (MCL)',
        contaminant: 'Lead',
        date: new Date(Date.now() - 5 * 86400000).toISOString(),
        status: 'Unresolved',
        severity: 'High'
      },
      {
        id: 'V-2024-002',
        system_name: 'AUSTIN WATER',
        state: 'TX',
        violation_type: 'Monitoring and Reporting',
        contaminant: 'Nitrate',
        date: new Date(Date.now() - 12 * 86400000).toISOString(),
        status: 'Resolved',
        severity: 'Low'
      },
      {
        id: 'V-2024-003',
        system_name: 'SACRAMENTO SUBURBAN WATER',
        state: 'CA',
        violation_type: 'Treatment Technique',
        contaminant: 'Surface Water Treatment Rule',
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        status: 'Pending Review',
        severity: 'Medium'
      }
    ];

    return NextResponse.json({
      success: true,
      count: mockViolations.length,
      timestamp: new Date().toISOString(),
      data: mockViolations
    });

  } catch (error) {
    console.error('Violations API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch water violation data', data: [] },
      { status: 500 }
    );
  }
}
