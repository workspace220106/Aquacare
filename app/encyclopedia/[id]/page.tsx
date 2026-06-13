'use client';

import React, { use, useState, useEffect } from 'react';
import { PATHOGENS_DB } from '@/lib/pathogens-db';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

type TabType = 'clinical' | 'technical' | 'analysis';

export default function PathogenDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pathogenId = resolvedParams.id;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathogen = PATHOGENS_DB[pathogenId];

  // Tab State
  const initialTab = (searchParams.get('tab') as TabType) || 'clinical';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') as TabType;
    if (tabFromUrl && (tabFromUrl === 'clinical' || tabFromUrl === 'technical' || tabFromUrl === 'analysis')) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/encyclopedia/${pathogenId}?tab=${tab}`);
  };

  if (!pathogen) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-xl text-center bg-zinc-50/50">
        <span className="material-symbols-outlined text-[64px] text-zinc-300 mb-4">error</span>
        <h2 className="font-headline-md text-2xl font-bold text-zinc-900 mb-2">Pathogen Not Found</h2>
        <p className="font-body-md text-zinc-650 max-w-md mb-6">
          The requested pathogen identifier <code className="bg-zinc-200 px-1.5 py-0.5 rounded font-mono text-sm">{pathogenId}</code> is not registered in the water quality intelligence index.
        </p>
        <Link href="/encyclopedia">
          <button className="px-5 py-2.5 bg-zinc-900 text-white font-label-md text-sm font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-md">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Database
          </button>
        </Link>
      </div>
    );
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.15, ease: 'easeIn' as const } }
  };

  return (
    <div className="flex-1 p-lg max-w-[1280px] mx-auto w-full h-full overflow-y-auto bg-zinc-50/50 scroll-smooth">
      {/* Breadcrumb Navigation */}
      <div className="mb-md flex items-center justify-between">
        <Link href="/encyclopedia" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 transition-colors font-label-md text-sm font-semibold group">
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Pathogen Index
        </Link>
        <span className="font-label-md text-xs text-zinc-400 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
          Ref ID: {pathogen.id}
        </span>
      </div>

      {/* Pathogen Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-zinc-200 rounded-2xl p-lg mb-lg shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-100 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>{pathogen.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="font-headline-lg text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">{pathogen.displayName}</h1>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border ${pathogen.riskColor}`}>
                  {pathogen.riskLevel}
                </span>
              </div>
              <p className="font-label-md text-sm text-zinc-500 italic font-semibold">{pathogen.name}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 border-t lg:border-t-0 lg:border-l border-zinc-150 pt-4 lg:pt-0 lg:pl-8 min-w-[280px]">
            <div>
              <div className="font-label-md text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global Incidence</div>
              <div className="font-headline-md text-xl font-black text-zinc-900 mt-1">{pathogen.stats.cases}</div>
            </div>
            <div>
              <div className="font-label-md text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global Mortality</div>
              <div className="font-headline-md text-xl font-black text-zinc-900 mt-1">{pathogen.stats.deaths}</div>
            </div>
          </div>
        </div>

        <p className="font-body-md text-sm text-zinc-650 mt-6 leading-relaxed max-w-4xl relative z-10">
          {pathogen.description}
        </p>
      </motion.div>

      {/* Tab Controls */}
      <div className="flex border-b border-zinc-250 mb-lg relative z-10">
        {(['clinical', 'technical', 'analysis'] as TabType[]).map((tab) => {
          const isActive = activeTab === tab;
          const labels = {
            clinical: { text: 'Clinical Profile', icon: 'medical_services' },
            technical: { text: 'Technical Specs', icon: 'science' },
            analysis: { text: 'Analysis & Detection', icon: 'analytics' }
          };

          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex items-center gap-2 px-6 py-4 font-label-lg text-sm font-bold border-b-2 transition-all cursor-pointer relative ${
                isActive 
                  ? 'border-zinc-900 text-zinc-950 font-black' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                {labels[tab].icon}
              </span>
              {labels[tab].text}
              {isActive && (
                <motion.div 
                  layoutId="activeTabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'clinical' && (
            <motion.div
              key="clinical"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-gutter"
            >
              {/* Symptoms Bento Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="material-symbols-outlined text-zinc-500">healing</span>
                  Symptom Vector Matrix
                </h3>
                <ul className="font-body-md text-sm text-zinc-650 space-y-4 flex-1">
                  {pathogen.clinical.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-150 shadow-sm">
                      <span className="material-symbols-outlined text-[18px] text-zinc-400 mt-0.5">check_circle</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diagnosis Bento Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="material-symbols-outlined text-zinc-500">biotech</span>
                  Laboratory Diagnosis
                </h3>
                <div className="space-y-3 flex-1">
                  {pathogen.clinical.diagnostics.map((diag, i) => (
                    <div key={i} className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                      <div className="font-label-lg text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Diagnostic Mode 0{i + 1}</div>
                      <p className="font-body-md text-sm text-zinc-900">{diag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Bento Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="material-symbols-outlined text-zinc-500">medication</span>
                  Clinical Treatment Protocol
                </h3>
                <div className="space-y-4 flex-1">
                  {pathogen.clinical.treatment.map((treat, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center font-label-md text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="font-body-md text-sm text-zinc-650 leading-relaxed mt-0.5">{treat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complications Bento Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                    <span className="material-symbols-outlined text-zinc-500">emergency</span>
                    Severe Complications
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pathogen.clinical.complications.map((comp, i) => (
                      <span key={i} className="px-3 py-1.5 bg-red-50 text-red-800 border border-red-150 text-xs font-bold rounded-lg shadow-sm">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-150">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-zinc-600">info</span>
                    <div>
                      <div className="font-label-lg text-xs font-bold text-zinc-900 uppercase tracking-widest mb-1">Transmission Vector</div>
                      <p className="font-body-md text-xs text-zinc-600 leading-relaxed">{pathogen.transmission}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention & Mitigation Protocols Bento Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow md:col-span-2">
                <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="material-symbols-outlined text-zinc-500">shield</span>
                  Prevention & Mitigation Protocols
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pathogen.prevention.map((prev, i) => (
                    <li key={i} className="flex items-start gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-150 shadow-sm">
                      <span className="material-symbols-outlined text-[18px] text-zinc-400 mt-0.5 shrink-0">check_circle</span>
                      <span className="font-body-md text-sm text-zinc-650 leading-relaxed">{prev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'technical' && (
            <motion.div
              key="technical"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
            >
              {/* Biological Specs Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="material-symbols-outlined text-zinc-500">straighten</span>
                  Pathogen Physical Dimension
                </h3>
                <div className="space-y-6 flex-1 justify-center flex flex-col">
                  <div>
                    <div className="font-label-md text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Cellular/Cyst Size</div>
                    <div className="font-headline-md text-2xl font-black text-zinc-900">{pathogen.technical.size}</div>
                  </div>
                  <div>
                    <div className="font-label-md text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Filtration Mechanical Barrier</div>
                    <p className="font-body-md text-sm text-zinc-600 leading-relaxed mt-1">{pathogen.technical.poreRequirement}</p>
                  </div>
                </div>
              </div>

              {/* Disinfection Parameters Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow col-span-1 md:col-span-2 flex flex-col">
                <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <span className="material-symbols-outlined text-zinc-500">water_treatment</span>
                  Disinfection Resistance Parameters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                  <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xl shadow-inner">
                    <div className="font-label-lg text-xs font-bold text-red-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">science</span> Free Chlorine CT Value
                    </div>
                    <p className="font-body-md text-sm text-zinc-700 leading-relaxed">{pathogen.technical.chlorineCT}</p>
                  </div>
                  
                  <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xl shadow-inner">
                    <div className="font-label-lg text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">wb_sunny</span> UV Disinfection Dose
                    </div>
                    <p className="font-body-md text-sm text-zinc-700 leading-relaxed">{pathogen.technical.uvDose}</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xl shadow-inner">
                    <div className="font-label-lg text-xs font-bold text-teal-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">filter_tilt_shift</span> Ozone Oxidation CT
                    </div>
                    <p className="font-body-md text-sm text-zinc-700 leading-relaxed">{pathogen.technical.ozoneCT}</p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xl shadow-inner">
                    <div className="font-label-lg text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">thermostat</span> Thermal Death Point
                    </div>
                    <p className="font-body-md text-sm text-zinc-700 leading-relaxed">{pathogen.technical.thermalTolerance}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-gutter"
            >
              {/* PCR Primer Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                    <span className="material-symbols-outlined text-zinc-500">fingerprint</span>
                    Molecular Detection (PCR) Targets
                  </h3>
                  <div className="p-4 bg-zinc-900 text-zinc-100 rounded-xl font-mono text-sm leading-relaxed mb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400">dna</span>
                    <div>
                      <div className="text-zinc-500 font-label-md text-[10px] uppercase font-bold tracking-widest mb-1">Target Genes</div>
                      <div>{pathogen.analysis.pcrTarget}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xl">
                  <div className="font-label-lg text-xs font-bold text-zinc-900 uppercase tracking-widest mb-1">EPA Standard Methodology</div>
                  <p className="font-body-md text-sm text-zinc-600">{pathogen.analysis.epaMethod}</p>
                </div>
              </div>

              {/* Limits and Outbreaks Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2 pb-3 border-b border-zinc-100">
                    <span className="material-symbols-outlined text-zinc-500">gavel</span>
                    Regulatory Limits & Outbreak Metrics
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 border border-zinc-150 rounded-xl bg-zinc-50">
                      <div className="font-label-lg text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Safe Purity Limit</div>
                      <div className="font-headline-md text-lg font-black text-zinc-900">{pathogen.analysis.regulatoryLimit}</div>
                    </div>
                    
                    <div className="p-4 border border-zinc-150 rounded-xl bg-zinc-50">
                      <div className="font-label-lg text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Outbreak Threshold</div>
                      <div className="font-body-md text-xs text-zinc-650 leading-relaxed mt-1">{pathogen.analysis.outbreakThreshold}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-150 text-red-900 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-red-600 mt-0.5">warning</span>
                  <div>
                    <h4 className="font-label-lg text-xs font-extrabold uppercase tracking-wider">Sanitary Alert Protocol</h4>
                    <p className="font-body-md text-xs leading-relaxed mt-1">
                      Positive detection in potable supplies requires immediate isolation of the affected reservoir, systemic network flushing, and high-frequency chloramine dosing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
