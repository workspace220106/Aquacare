'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';

export default function EncyclopediaPage() {
  const { searchQuery } = useSearch();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to check if a pathogen name or description matches search
  const matchesSearch = (name: string, desc?: string) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || (desc?.toLowerCase().includes(q));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/pathogens');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Error fetching pathogens', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const pathogens = [
    {
      id: "VCH-01",
      name: data[0]?.name || "Vibrio cholerae",
      displayName: "Cholera",
      desc: data[0]?.description || "Gram-negative, comma-shaped bacterium. Primary vector for epidemic cholera.",
      risk: "Critical Risk",
      riskColor: "bg-red-600",
      type: "primary",
      symptoms: ["Acute, severe watery diarrhea", "Rapid dehydration and electrolyte imbalance", "Muscular cramping and lethargy"],
      prevention: ["Strict water sanitation and chlorination", "Improved municipal sewage infrastructure", "Oral cholera vaccines (OCV) in endemic zones"]
    },
    {
      id: "STM-02",
      name: data[1]?.name || "Salmonella Typhi",
      displayName: "Typhoid Fever",
      desc: data[1]?.description || "Prolonged high fever, fatigue, headache, nausea, abdominal pain, and constipation or diarrhea.",
      risk: "High Risk",
      riskColor: "bg-amber-600",
      type: "secondary",
      transmission: data[1]?.transmission || "Fecal-oral transmission primarily through contaminated drinking water."
    },
    {
      id: "GIA-03",
      displayName: "Giardiasis",
      name: "Giardia duodenalis",
      desc: "Microscopic parasite causing diarrheal illness. highly resistant to standard chlorine treatment; requires advanced filtration.",
      type: "standard",
      icon: "microbiology"
    },
    {
      id: "LEG-04",
      displayName: "Legionnaires'",
      name: "Legionella pneumophila",
      desc: "Severe form of pneumonia contracted by inhaling aerosolized water droplets from contaminated building water systems.",
      type: "standard",
      icon: "air"
    },
    {
      id: "DYS-05",
      displayName: "Dysentery",
      name: data[2]?.name || "Shigella / Entamoeba",
      desc: data[2]?.description || "Intestinal inflammation causing severe diarrhea with blood. Strongly linked to inadequate sanitation infrastructure.",
      type: "featured",
      icon: "water_damage"
    }
  ];

  const filteredPathogens = pathogens.filter(p => matchesSearch(p.displayName, p.desc) || matchesSearch(p.name));

  return (
    <div className="flex-1 p-lg max-w-[1280px] mx-auto w-full h-full overflow-y-auto">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md"
      >
        <div>
          <h2 className="font-headline-lg text-headline-lg text-zinc-900 dark:text-zinc-50 mb-xs tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">Pathogen Database</h2>
          <p className="font-body-md text-body-md text-zinc-500 dark:text-zinc-400 max-w-2xl">
            A comprehensive technical index of waterborne diseases, cataloging biological agents, vectors, symptoms, and structural prevention methodologies.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-lg font-label-md text-label-md hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Dataset
          </motion.button>
        </div>
      </motion.div>

      {/* Pathogen Grid (Bento Style) */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-md pb-xl"
      >
        {filteredPathogens.map((pathogen, idx) => {
          if (pathogen.type === "primary") {
            return (
              <motion.article 
                key={pathogen.id}
                variants={itemVariant}
                className="col-span-1 lg:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-lg flex flex-col shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="flex justify-between items-start mb-md pb-md border-b border-zinc-100 dark:border-zinc-900 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center border border-red-100 dark:border-red-900/50 shadow-inner">
                      <span className="material-symbols-outlined text-2xl">coronavirus</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-none mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{pathogen.displayName}</h3>
                      <span className="font-label-md text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {pathogen.name}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-md shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">warning</span> {pathogen.risk}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg flex-1 relative z-10">
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/50">
                    <h4 className="font-label-lg text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-zinc-400">medical_services</span> Clinical Symptoms
                    </h4>
                    <ul className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 space-y-2.5">
                      {pathogen.symptoms?.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5"><span className="material-symbols-outlined text-[16px] text-zinc-300 mt-0.5">check_circle</span> {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/50">
                    <h4 className="font-label-lg text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-zinc-400">shield</span> Prevention Protocols
                    </h4>
                    <ul className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 space-y-2.5">
                      {pathogen.prevention?.map((p, i) => (
                        <li key={i} className="flex items-start gap-2.5"><span className="material-symbols-outlined text-[16px] text-zinc-300 mt-0.5">check_circle</span> {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-lg pt-md flex justify-end gap-3 relative z-10">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg font-label-md text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">Technical Data</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-label-md text-sm font-medium hover:opacity-90 transition-all shadow-md">View Profile</motion.button>
                </div>
              </motion.article>
            );
          }
          
          if (pathogen.type === "secondary") {
            return (
              <motion.article 
                key={pathogen.id}
                variants={itemVariant}
                className="col-span-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-lg flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
                <div className="flex justify-between items-start mb-md pb-md border-b border-zinc-100 dark:border-zinc-900 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                      <span className="material-symbols-outlined text-2xl">bug_report</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none mb-1">{pathogen.displayName}</h3>
                      <span className="font-label-md text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold">{pathogen.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-6 relative z-10">
                  <div>
                    <h4 className="font-label-lg text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Symptoms</h4>
                    <p className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{pathogen.desc}</p>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Vector Origin</h4>
                    <p className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{pathogen.transmission}</p>
                  </div>
                </div>
                <div className="mt-lg pt-md relative z-10">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-lg font-label-md text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all">View Profile</motion.button>
                </div>
              </motion.article>
            );
          }

          if (pathogen.type === "standard") {
            return (
              <motion.article 
                key={pathogen.id}
                variants={itemVariant}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-headline-md text-lg font-bold text-zinc-900 dark:text-zinc-50">{pathogen.displayName}</h3>
                  <span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-600 transition-colors">{pathogen.icon}</span>
                </div>
                <span className="font-label-md text-xs text-zinc-500 dark:text-zinc-400 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-900 block font-medium">{pathogen.name}</span>
                <p className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 flex-1 mb-6 leading-relaxed">{pathogen.desc}</p>
                <button className="text-left font-label-md text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 group-hover:gap-2 transition-all">
                  Analysis <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </motion.article>
            );
          }

          if (pathogen.type === "featured") {
            return (
              <motion.article 
                key={pathogen.id}
                variants={itemVariant}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col relative overflow-hidden group shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWuAwvDctNDqe2DGiDBHLZNG4vzSpKuY67NoozS_cP_UaT_A3CyQgKNml26soKv5_pwPcyIgqW8a_orQUOEcnXpoDatpE8Ks5q0D58ja6Ae0lze-_h3Nu_mDcpz_57jfU8nP0HmhWL_Qs-3Y6GP3HN1wMeMIVasC-nUMrVNIkrgHs7hlEEBoIP_3u4H9EWSIOoEPJNB-yJaZt9jSRo4vQOlE_lA06030G3vATbDwq1_XR7286W1BHk2zz5t-y94Kow-4jBmXrwiEHi')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-headline-md text-lg font-bold text-white">{pathogen.displayName}</h3>
                    <span className="material-symbols-outlined text-zinc-400 group-hover:text-white transition-colors">{pathogen.icon}</span>
                  </div>
                  <span className="font-label-md text-xs text-zinc-300 mb-4 pb-3 border-b border-zinc-700 block font-medium">{pathogen.name}</span>
                  <p className="font-body-md text-sm text-zinc-300 flex-1 mb-6 leading-relaxed">{pathogen.desc}</p>
                  <button className="text-left font-label-md text-sm font-semibold text-white flex items-center gap-1.5 group-hover:gap-2 transition-all">
                    Analysis <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </motion.article>
            );
          }
          return null;
        })}
      </motion.div>
    </div>
  );
}
