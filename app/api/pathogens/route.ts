import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache daily

export async function GET() {
  const pathogens = [
    {
      id: "VCH-01",
      name: "Vibrio cholerae",
      classification: "Bacterial Pathogen",
      riskLevel: "CRITICAL",
      riskColor: "bg-red-500",
      description: "Gram-negative, comma-shaped bacterium. Primary vector for epidemic cholera. Thrives in brackish riverine and coastal ecosystems. Highly transmissible via contaminated municipal water supplies.",
      transmission: "Fecal-oral route; contaminated aquatic sources",
      incubation: "12 hours to 5 days",
      symptoms: ["Severe acute watery diarrhea", "Extreme dehydration", "Electrolyte imbalance", "Hypovolemic shock"],
      prevention: "Advanced RO filtration; UV irradiation (>40mJ/cm²); Stringent chlorination protocols.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9i34t7G2e8L7mS-gBntJpP_yB_R3xQhP1pE6PXX8M0D99D4B5XW7vE_H21v93Z6D70m7L3B2xHhH99X8w4wL2-S4y7Xb0t7P33C2P4Y7K7_VbW-nF8mR6G8wHwF1vD6sB6n_D8H4Z3H3qV3jW6vP8D8L4_4bK8Z4dC4xT0_X1N4J7gT8pM6qR8w",
      stats: { cases: "1.3 - 4.0M", deaths: "21k - 143k" }
    },
    {
      id: "STM-02",
      name: "Salmonella typhi",
      classification: "Bacterial Pathogen",
      riskLevel: "HIGH",
      riskColor: "bg-orange-500",
      description: "Rod-shaped, flagellated bacterium causing typhoid fever. Human-specific pathogen that invades the intestinal mucosa and disseminates systemically.",
      transmission: "Ingestion of contaminated food or water",
      incubation: "6 to 30 days",
      symptoms: ["Prolonged high fever", "Fatigue", "Abdominal pain", "Rose spots rash"],
      prevention: "Point-of-use filtration (0.2 micron); Boiling; Systemic sanitation.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB232L4bQyV3-49GgZ5-0b-z9Z1pX-L4174Kj1nC4P1K9L7xT7pX-4k_gY49X-189K3sW2H8p8vF3J5-40X3gK0k-H3R9x8M2_35P7V2Z1qY-V4w-T6kK8Z1yR9-4_kL8wX4J-C8wQ0qK6k_gV-vJ5-0R8wV-0kK-6bL8X7zQ9wL7K9_Z1V4H5b",
      stats: { cases: "11 - 21M", deaths: "128k - 161k" }
    },
    {
      id: "ECO-03",
      name: "Escherichia coli (O157:H7)",
      classification: "Enterohemorrhagic Bacteria",
      riskLevel: "ELEVATED",
      riskColor: "bg-yellow-500",
      description: "Shiga toxin-producing coliform bacterium. Primary indicator of recent fecal contamination in water systems. O157:H7 strain causes severe hemorrhagic colitis.",
      transmission: "Contaminated agricultural runoff; municipal cross-contamination",
      incubation: "3 to 4 days",
      symptoms: ["Severe abdominal cramps", "Bloody diarrhea", "Vomiting", "Hemolytic uremic syndrome (HUS)"],
      prevention: "Standard chlorination; Ozonation; Agricultural runoff management.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC75Q9x15b-wF9Pz9-W3k_W-W0K0b0K-2qY9kK-K8kP-3G5t_X4-K6H9-Y2pM4qW4kZ7wX2Q1-V9J-wK9hB4vH7_5K1Z0_X4V0kK3Z9jJ7rV3P-V4gR8V-K4jW-4wL8Z6qL4vK4_L7X0K9K-Z7Q0rF1V5vX0wL3qK2jK2zR1Z-6P-4wQ8J0qJ5v",
      stats: { cases: "Common Indicator", deaths: "Variable" }
    },
    {
      id: "ROV-04",
      name: "Rotavirus",
      classification: "Viral Pathogen",
      riskLevel: "HIGH",
      riskColor: "bg-orange-500",
      description: "Non-enveloped, double-stranded RNA virus. The most common cause of severe diarrheal disease among infants and young children globally.",
      transmission: "Fecal-oral; contaminated fomites and water",
      incubation: "2 days",
      symptoms: ["Severe watery diarrhea", "Vomiting", "Fever", "Rapid dehydration"],
      prevention: "Vaccination; Ultra-filtration; Enhanced UV treatment.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-694K67P-zH0-W8W34P-K936H-H8Q0K8K9_P1H4Z1pG6-189L9kX-79H-J2qL0X8M0wL7_W4Z-4gK3Z4qK0H0V6P8wX3bJ0jV9-3H0_wK8-V5wJ2jL-4zQ6xK0V1xL5pG2X0_gK-K9H8P2qM4_vK8H2jL4V0R8wV9-X9-W0K3J0qL4X1X-V4P1k",
      stats: { cases: "Universal (Childhood)", deaths: "128k - 215k" }
    }
  ];

  return NextResponse.json({
    success: true,
    data: pathogens
  });
}
