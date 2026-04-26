import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache daily

export async function GET() {
  const data = {
    actionMatrix: [
      {
        id: "ACT-01",
        title: "POU Filtration Optimization",
        description: "Deploy sub-micron filtration systems at point-of-use for residential mitigation of industrial heavy metal runoff.",
        icon: "filter_alt",
        status: "ACTIVE",
        statusColor: "bg-tertiary-fixed text-on-tertiary-fixed",
        metrics: ["Efficacy: 98.4%", "Cost: Low"]
      },
      {
        id: "ACT-02",
        title: "Contaminant Baselining",
        description: "Mandatory bi-weekly testing protocol utilizing provided spectrophotometric assay kits for municipal tap sources.",
        icon: "science",
        status: "CRITICAL",
        statusColor: "bg-secondary-fixed text-on-secondary-fixed",
        metrics: ["Kit ID: TX-892"]
      },
      {
        id: "ACT-03",
        title: "Microplastic Intake Minimization",
        description: "Implement reverse osmosis layering in secondary holding tanks. Awaiting regional supply chain validation before escalating to active directive status.",
        icon: "water_damage",
        status: "MONITORING",
        statusColor: "bg-surface-dim text-on-surface border border-outline-variant",
        isWide: true
      }
    ],
    systemicDirectives: [
      {
        id: "DIR-2024-A1",
        title: "Agricultural Runoff Phosphorus Cap Implementation",
        status: "Enforced",
        statusDot: "bg-secondary",
        enforcement: "Q2 2024"
      },
      {
        id: "DIR-2024-B4",
        title: "Municipal Infrastructure Modernization Mandate",
        status: "Drafting",
        statusDot: "bg-primary-fixed-dim",
        enforcement: "TBD"
      },
      {
        id: "DIR-2023-F9",
        title: "Industrial Effluent Thermal Regulation",
        status: "Auditing",
        statusDot: "bg-outline",
        enforcement: "Q4 2023"
      }
    ]
  };

  return NextResponse.json({
    success: true,
    data
  });
}
