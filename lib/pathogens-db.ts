export interface PathogenDetails {
  id: string;
  name: string;
  displayName: string;
  classification: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  riskColor: string;
  description: string;
  transmission: string;
  incubation: string;
  icon: string;
  stats: {
    cases: string;
    deaths: string;
  };
  clinical: {
    symptoms: string[];
    diagnostics: string[];
    treatment: string[];
    complications: string[];
  };
  technical: {
    size: string;
    poreRequirement: string;
    chlorineCT: string;
    uvDose: string;
    ozoneCT: string;
    thermalTolerance: string;
  };
  analysis: {
    pcrTarget: string;
    epaMethod: string;
    regulatoryLimit: string;
    outbreakThreshold: string;
  };
}

export const PATHOGENS_DB: Record<string, PathogenDetails> = {
  'VCH-01': {
    id: 'VCH-01',
    name: 'Vibrio cholerae',
    displayName: 'Cholera',
    classification: 'Gram-negative, comma-shaped facultative anaerobic bacterium',
    riskLevel: 'CRITICAL',
    riskColor: 'bg-red-600 border-red-200 text-red-700',
    description: 'A highly infectious bacterial disease characterized by rapid onset of severe dehydration. It thrives in estuarine, marine, and warm freshwater environments, often attaching to copepods or zooplankton. Epidemic outbreaks are strongly linked to compromised municipal sewage treatment and water filtration infrastructure.',
    transmission: 'Fecal-oral route via ingestion of water or food contaminated by feces of symptomatic or asymptomatic individuals.',
    incubation: '12 hours to 5 days (typically 2–3 days)',
    icon: 'coronavirus',
    stats: {
      cases: '1.3M – 4.0M annually',
      deaths: '21,000 – 143,000 annually'
    },
    clinical: {
      symptoms: [
        'Profuse, painless watery diarrhea ("rice-water stools")',
        'Severe, persistent vomiting',
        'Extreme dehydration and loss of skin turgor',
        'Muscle cramps due to rapid potassium and sodium depletion',
        'Hypovolemic shock and cardiovascular collapse if untreated'
      ],
      diagnostics: [
        'Stool culture on Thiosulfate-Citrate-Bile Salts-Sucrose (TCBS) agar (gold standard)',
        'Rapid diagnostic test (RDT) dipsticks detecting O1 and O139 lipopolysaccharide antigens',
        'Darkfield microscopy showing characteristic shooting-star motility',
        'Multiplex PCR assays for detection of ctxA (cholera toxin) and tcpA genes'
      ],
      treatment: [
        'Aggressive Oral Rehydration Salts (ORS) to replace fluids and electrolytes',
        'Intravenous fluids (Ringer\'s lactate) for severe dehydration cases',
        'Zinc supplementation (proven to reduce duration and severity in children)',
        'Targeted antibiotic therapy (Doxycycline, Azithromycin, or Ciprofloxacin) to shorten illness duration'
      ],
      complications: [
        'Severe metabolic acidosis',
        'Acute renal failure (tubular necrosis)',
        'Hypokalemia leading to cardiac arrhythmias',
        'Hypoglycemic seizures'
      ]
    },
    technical: {
      size: '0.5 µm width × 1.5 – 2.6 µm length',
      poreRequirement: '≤ 0.2 µm absolute pore size (microfiltration or ultrafiltration) removes >99.99%',
      chlorineCT: 'Highly susceptible. Free chlorine CT of 0.5 mg·min/L at pH < 8.0 achieves 4-log (99.99%) inactivation.',
      uvDose: 'D99 (2-log reduction) requires ~3-5 mJ/cm²; standard 40 mJ/cm² dose achieves complete (6-log) disinfection.',
      ozoneCT: 'CT value of 0.05 mg·min/L at 5°C achieves >4-log inactivation.',
      thermalTolerance: 'Completely inactivated by heating water to 60°C for 15 minutes or boiling for 1 minute.'
    },
    analysis: {
      pcrTarget: 'ctxA (Cholera Toxin Subunit A) and tcpA (Toxin-Coregulated Pilus Major Subunit)',
      epaMethod: 'EPA Method 1604 / Standard Methods 9260B (Culture & Isolation)',
      regulatoryLimit: '0 CFU / 100 mL (WHO & EPA drinking water standard)',
      outbreakThreshold: 'Presence of a single confirmed toxigenic O1/O139 strain in public supply triggers immediate boil-water advisory.'
    }
  },
  'STM-02': {
    id: 'STM-02',
    name: 'Salmonella enterica serovar Typhi',
    displayName: 'Typhoid Fever',
    classification: 'Gram-negative, rod-shaped, flagellated facultative anaerobic bacterium',
    riskLevel: 'HIGH',
    riskColor: 'bg-amber-650 border-amber-200 text-amber-800',
    description: 'A systemic bacterial pathogen that is exclusively human-hosted. Upon ingestion, the bacterium invades the intestinal mucosa, replicates within macrophages, and enters the bloodstream to infect the liver, spleen, and bone marrow. It is a critical indicator of inadequate fecal separation in water systems.',
    transmission: 'Ingestion of water or food contaminated by the feces or urine of typhoid cases or chronic gallbladder carriers.',
    incubation: '6 to 30 days (typically 8–14 days)',
    icon: 'bug_report',
    stats: {
      cases: '11M – 21M annually',
      deaths: '128,000 – 161,000 annually'
    },
    clinical: {
      symptoms: [
        'Step-wise rising fever reaching up to 39°C–40°C',
        'Severe, dull headache and generalized body aches',
        'Abdominal pain, bloating, and splenomegaly (enlarged spleen)',
        'Constipation (early stages) or "pea-soup" diarrhea (later stages)',
        'Rose spots rash (flat, faint red spots) on the chest and abdomen'
      ],
      diagnostics: [
        'Blood culture (highest sensitivity during first week of fever)',
        'Bone marrow aspirate culture (most sensitive diagnostic method, unaffected by prior antibiotics)',
        'Stool and urine culture (useful in second and third weeks of infection)',
        'Polymerase chain reaction (PCR) targeting flagellar fliC-d gene or invA gene'
      ],
      treatment: [
        'Fluoroquinolones (Ciprofloxacin) - Note: extensive resistance exists in Asia/Africa',
        'Third-generation cephalosporins (Ceftriaxone) or Macrolides (Azithromycin) for multi-drug resistant strains',
        'Systemic corticosteroid therapy (Dexamethasone) for severe toxic presentations with shock',
        'Maintenance of hydration and metabolic support'
      ],
      complications: [
        'Intestinal perforation (usually in the terminal ileum, occurs in 1–3% of untreated cases)',
        'Severe gastrointestinal hemorrhage',
        'Typhoid encephalopathy (delirium, confusion)',
        'Myocarditis or cholecystitis'
      ]
    },
    technical: {
      size: '0.7 – 1.5 µm width × 2.0 – 5.0 µm length',
      poreRequirement: '≤ 0.2 µm absolute pore size removes 99.99% of vegetative cells.',
      chlorineCT: 'Moderate susceptibility. Standard free chlorine CT of 1.5 – 2.0 mg·min/L at pH 7.0 achieves 4-log reduction.',
      uvDose: 'D99 requires 5 – 8 mJ/cm²; standard 40 mJ/cm² UV dose guarantees inactivation.',
      ozoneCT: 'CT value of 0.1 mg·min/L at 5°C achieves >4-log inactivation.',
      thermalTolerance: 'Inactivated by exposure to 60°C for 20 minutes or boiling for 1 minute.'
    },
    analysis: {
      pcrTarget: 'invA (Invasion Protein A) and fliC-d (Flagellin Phase 1 Antigen)',
      epaMethod: 'Standard Methods 9260D / FDA BAM Chapter 5 (Enrichment, selective plating, and serotyping)',
      regulatoryLimit: '0 CFU / 100 mL (US EPA National Primary Drinking Water Standards)',
      outbreakThreshold: 'A single positive isolate in municipal distribution requires immediate network isolation and hyperchlorination.'
    }
  },
  'GIA-03': {
    id: 'GIA-03',
    name: 'Giardia duodenalis (syn. lamblia)',
    displayName: 'Giardiasis',
    classification: 'Flagellated protozoan parasite forming highly resilient environmental cysts',
    riskLevel: 'ELEVATED',
    riskColor: 'bg-emerald-600 border-emerald-200 text-emerald-800',
    description: 'A microscopic parasite that colonizes and reproduces in the small intestine, causing malabsorptive diarrheal illness. It forms thick-walled cysts that are extremely resistant to cold temperature, acidic conditions, and standard municipal chlorination, making filtration and UV disinfection critical barriers.',
    transmission: 'Ingestion of infective cysts from water contaminated by human or animal (e.g. beaver, dog, cattle) feces. Common in wilderness areas, shallow wells, and water systems relying on surface reservoirs without filtration.',
    incubation: '3 to 25 days (typically 7–14 days)',
    icon: 'microbiology',
    stats: {
      cases: '280M symptomatic cases annually',
      deaths: 'Low direct mortality; high chronic morbidity'
    },
    clinical: {
      symptoms: [
        'Profuse, foul-smelling, greasy, floating stools (steatorrhea)',
        'Severe abdominal cramps, bloating, and flatulence',
        'Nausea, vomiting, and loss of appetite',
        'Chronic fatigue and significant weight loss',
        'Lactose intolerance and malabsorption of fat-soluble vitamins'
      ],
      diagnostics: [
        'Stool microscopy (Oven & Parasite examination) for cysts or trophozoites (requires multiple samples)',
        'Stool Antigen detection using Enzyme-Linked Immunosorbent Assay (ELISA)',
        'Direct Immunofluorescence Assay (DFA) using monoclonal antibodies (highly sensitive)',
        'Multiplex PCR targeting the beta-giardin or gdh (glutamate dehydrogenase) genes'
      ],
      treatment: [
        '5-Nitroimidazole derivatives (Metronidazole, Tinidazole)',
        'Nitazoxanide (often used in pediatric suspensions)',
        'Albendazole or Paromomycin as alternative options, particularly during pregnancy',
        'Electrolyte monitoring and dietary modification (lactose-free diets during recovery)'
      ],
      complications: [
        'Severe chronic malabsorption and malnutrition',
        'Stunted growth and cognitive development in young children',
        'Irritable Bowel Syndrome (IBS) post-infection',
        'Chronic fatigue syndrome'
      ]
    },
    technical: {
      size: 'Cysts are oval-shaped, 8 – 12 µm long × 7 – 10 µm wide',
      poreRequirement: '≤ 1 µm absolute pore size (cysts are large enough to be mechanically filtered out by high-quality sediment or sub-micron carbon blocks). RO removes >99.99%.',
      chlorineCT: 'EXTREMELY RESISTANT. Standard chlorination is ineffective. Free chlorine CT of 50 – 150 mg·min/L depending on pH and temperature is required.',
      uvDose: 'Highly sensitive to UV. D99 requires just 1.5 – 5.0 mJ/cm². UV disinfection is the primary municipal barrier.',
      ozoneCT: 'CT value of 0.5 – 2.0 mg·min/L at 5°C achieves 3-log reduction.',
      thermalTolerance: 'Cysts are inactivated by heating to 70°C for 10 minutes or boiling for 1 minute.'
    },
    analysis: {
      pcrTarget: 'bg (beta-giardin), gdh (glutamate dehydrogenase), and 18S rRNA genes',
      epaMethod: 'EPA Method 1623.1 (Filtration, Immunomagnetic Separation, and Immunofluorescence Assay Microscopy)',
      regulatoryLimit: '0 cysts / 100 L (LT2 Enhanced Surface Water Treatment Rule requires 3-log [99.9%] removal/inactivation)',
      outbreakThreshold: 'Detection of any viable cyst in finished drinking water triggers immediate municipal filtration diagnostic bypass checks.'
    }
  },
  'LEG-04': {
    id: 'LEG-04',
    name: 'Legionella pneumophila',
    displayName: "Legionnaires'",
    classification: 'Gram-negative, aerobic, pleomorphic flagellated bacterium',
    riskLevel: 'HIGH',
    riskColor: 'bg-amber-600 border-amber-200 text-amber-700',
    description: 'An environmental pathogen that thrives in warm, stagnant freshwater, biofilms, and inside protozoa. Infection occurs exclusively through inhalation of aerosolized mists, not ingestion. It is a major target for building water management programs (ASHRAE 188).',
    transmission: 'Inhalation of contaminated aerosols generated by cooling towers, showers, evaporative condensers, humidifiers, decorative fountains, and hot tubs.',
    incubation: '2 to 10 days (typically 5–6 days)',
    icon: 'air',
    stats: {
      cases: 'Estimated 20,000 cases in US annually',
      deaths: 'Fatality rate ~10% (up to 25% in healthcare)'
    },
    clinical: {
      symptoms: [
        'High, debilitating fever (>39.5°C) and chills',
        'Non-productive or slightly productive cough with chest pain',
        'Shortness of breath, tachypnea, and progressive respiratory failure',
        'Severe muscle aches, fatigue, and headache',
        'Neurological symptoms including confusion, delirium, and ataxia'
      ],
      diagnostics: [
        'Urinary Antigen Test (rapid, but only detects L. pneumophila Serogroup 1)',
        'Sputum or bronchoalveolar lavage culture on Buffered Charcoal Yeast Extract (BCYE) agar containing L-cysteine',
        'Polymerase chain reaction (PCR) on lower respiratory secretions targeting the ssrA gene',
        'Indirect immunofluorescence assay (IFA) or seroconversion testing'
      ],
      treatment: [
        'Fluoroquinolones (Levofloxacin, Moxifloxacin) - preferred first-line',
        'Advanced Macrolides (Azithromycin) as a primary alternative',
        'Combination therapy (Rifampin added) in severe, refractory cases',
        'Oxygen therapy and intensive mechanical ventilatory support for acute respiratory failure'
      ],
      complications: [
        'Respiratory failure (ARDS)',
        'Septic shock and multi-organ dysfunction syndrome',
        'Acute kidney injury',
        'Pontiac Fever (a milder, non-pneumonic self-limiting flu-like version)'
      ]
    },
    technical: {
      size: '0.3 – 0.9 µm width × 2.0 – 20.0 µm length',
      poreRequirement: '≤ 0.2 µm absolute point-of-use (POU) filter cartridge (common in hospital water safety systems).',
      chlorineCT: 'Biofilm-protected cells are highly resistant. Planktonic cells require free chlorine CT of 10 – 15 mg·min/L. Monochloramine is preferred for distribution networks.',
      uvDose: 'D99 requires 10 – 15 mJ/cm²; biofilm-protected cells require up to 30 mJ/cm².',
      ozoneCT: 'CT value of 1.0 – 2.0 mg·min/L at 15°C achieves >3-log reduction.',
      thermalTolerance: 'Optimal growth at 20°C–45°C. Stagnates at 50°C. Inactivated rapidly above 60°C (thermal shock protocol: flush system at 70°C for 30 minutes).'
    },
    analysis: {
      pcrTarget: 'ssrA (small RNA), mip (macrophage infectivity promoter), and 16S rRNA genes',
      epaMethod: 'EPA Method 1107 / CDC Protocol for Isolation of Legionella (Selective BCYE media plating)',
      regulatoryLimit: 'Action thresholds: >1 CFU/mL (potable systems) or >10 CFU/mL (cooling towers) require immediate biocidal treatment.',
      outbreakThreshold: 'A single laboratory-confirmed healthcare-associated case triggers an immediate environmental investigation and plumbing thermal shock.'
    }
  },
  'DYS-05': {
    id: 'DYS-05',
    name: 'Shigella spp. / EHEC (Escherichia coli O157:H7)',
    displayName: 'Dysentery',
    classification: 'Enteric bacterial pathogens (Gram-negative rods; Shigella and Shiga toxin-producing E. coli)',
    riskLevel: 'HIGH',
    riskColor: 'bg-red-500 border-red-200 text-red-750',
    description: 'An acute, inflammatory diarrheal syndrome characterized by blood and mucus in the feces. Shigella species are highly infectious human-restricted bacteria, while E. coli O157:H7 is a zoonotic pathogen originating from cattle feces. Both possess extremely low infectious doses (10–100 organisms) and produce powerful cytotoxins (Shiga toxins).',
    transmission: 'Fecal-oral route via drinking water contaminated by municipal sewage or agricultural runoff containing livestock waste.',
    incubation: '1 to 4 days (Shigella); 3 to 8 days (E. coli O157:H7)',
    icon: 'water_damage',
    stats: {
      cases: 'Estimated 80M – 165M cases annually',
      deaths: '600,000 – 1M deaths annually (predominantly toddlers)'
    },
    clinical: {
      symptoms: [
        'Severe, agonizing abdominal cramps and tenesmus (painful straining)',
        'Frequent, small-volume stools composed primarily of blood, mucus, and pus',
        'High fever, chills, and systemic toxicity',
        'Nausea, vomiting, and severe dehydration',
        'Uremic symptoms (pallor, oliguria, bruising) in cases progressing to HUS'
      ],
      diagnostics: [
        'Stool culture on selective and differential media (MacConkey, Hektoen Enteric, or Sorbitol-MacConkey agar for O157:H7)',
        'Enzyme Immunoassay (EIA) for direct detection of Shiga toxins (Stx1 and Stx2)',
        'Polymerase chain reaction (PCR) targeting the ipaH gene (Shigella) or stx1/stx2 genes (E. coli)',
        'Fecal leukocyte examination showing abundance of neutrophils'
      ],
      treatment: [
        'Meticulous fluid and electrolyte replacement (oral or intravenous)',
        'Antimicrobial therapy (Ciprofloxacin or Azithromycin) for severe Shigellosis only',
        '**WARNING**: Antibiotics are strictly contraindicated in E. coli O157:H7 cases (increases Shiga toxin release and HUS risk)',
        'Supportive care (avoid anti-motility agents like loperamide which prolong toxin exposure)'
      ],
      complications: [
        'Hemolytic Uremic Syndrome (HUS - hemolytic anemia, thrombocytopenia, acute renal failure)',
        'Toxic megacolon and intestinal perforation',
        'Reactive arthritis (Reiter\'s syndrome)',
        'Hyponatremia and encephalopathic seizures'
      ]
    },
    technical: {
      size: '0.5 µm width × 1.0 – 3.0 µm length',
      poreRequirement: '≤ 0.2 µm absolute pore size (microfiltration) removes >99.99% of bacteria.',
      chlorineCT: 'Highly susceptible. Standard municipal free chlorine CT of 0.2 – 0.4 mg·min/L at pH 7.0 achieves >4-log reduction.',
      uvDose: 'D99 requires 3 – 6 mJ/cm²; standard 40 mJ/cm² UV disinfection is highly effective.',
      ozoneCT: 'CT value of 0.02 – 0.08 mg·min/L achieves >4-log inactivation.',
      thermalTolerance: 'Inactivated by heating food or water to a core temperature of 70°C for 1 minute.'
    },
    analysis: {
      pcrTarget: 'ipaH (invasion plasmid antigen H for Shigella), stx1 and stx2 (Shiga toxins), and eae (intimin for E. coli)',
      epaMethod: 'EPA Method 1603 (E. coli by membrane filtration) / FDA BAM Chapters 4 & 6 (Isolation & Characterization)',
      regulatoryLimit: '0 CFU / 100 mL (Strict EPA and WHO limit for coliforms and Escherichia coli)',
      outbreakThreshold: 'Any detection of E. coli O157:H7 or Shigella in public water grids requires immediate containment, flushing, and boil-water alerts.'
    }
  }
};
