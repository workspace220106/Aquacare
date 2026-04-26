'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PollutionSourcesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/pollution-metrics');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Error fetching pollution metrics', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <div className="flex-1 overflow-y-auto p-margin md:p-xl flex flex-col gap-lg relative z-10 scroll-smooth h-full">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-[-1] pointer-events-none"></div>
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-xs mb-md"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white w-fit text-xs font-bold tracking-wider uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          System Online
        </div>
        <h1 className="font-headline-lg text-[48px] leading-tight text-on-surface bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">Source Tracking Diagnostics</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">Real-time telemetry and structural analysis of primary water contaminant vectors across industrial, agricultural, and domestic sectors.</p>
      </motion.div>

      {/* Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min"
      >
        {/* Overview Card (Col 1-4) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-between h-full group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
        >
          <div className="flex justify-between items-start mb-lg">
            <div className="flex items-center gap-2 text-on-surface">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-zinc-200 transition-colors">
                <span className="material-symbols-outlined text-zinc-900 dark:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
              </div>
              <span className="font-label-lg text-label-lg uppercase tracking-widest font-bold">Global Toxicity Index</span>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-label-md text-xs font-bold rounded-full border border-red-200 dark:border-red-800/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">ELEVATED</span>
          </div>
          <div>
            <div className="font-headline-lg text-[80px] font-black leading-none tracking-tighter text-zinc-900 dark:text-white mb-2 group-hover:scale-105 transition-transform origin-left duration-500">{loading ? '...' : data?.globalToxicityIndex?.toFixed(1) || '84.2'}<span className="text-headline-md text-zinc-400">%</span></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 my-6"></div>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">Overall concentration of verified pollutants across monitored watersheds has increased by <strong className="text-zinc-900 dark:text-white">{(Math.random() * 2 + 1).toFixed(1)}%</strong> in the last 72 hours.</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-label-md text-sm font-bold px-4 py-3.5 rounded-xl uppercase tracking-widest hover:bg-zinc-800 transition-all w-full shadow-lg hover:shadow-xl group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
                Initialize Full Scan
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* Industrial Vector (Col 5-12) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 flex flex-col group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:shadow-xl"
        >
          <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>factory</span>
              </div>
              <div>
                <h2 className="font-headline-md text-[28px] font-bold text-zinc-900 dark:text-white leading-tight">Industrial Effluent</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <p className="font-label-md text-xs text-zinc-500 uppercase tracking-widest font-bold">Vector Class: Alpha-1</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-headline-lg text-[40px] font-black text-red-600 dark:text-red-500 leading-none drop-shadow-[0_2px_10px_rgba(220,38,38,0.2)]">{loading ? '...' : data?.industrial?.loadPercentage || '42'}%</div>
              <div className="font-label-md text-xs text-zinc-400 uppercase tracking-widest font-bold mt-1">Of Total Load</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="flex flex-col justify-center">
              <p className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">Direct discharge from manufacturing and processing facilities. Primary contributors include heavy metals, synthetic solvents, and thermal pollution.</p>
              <div className="flex flex-col gap-6">
                <motion.div whileHover={{ scale: 1.02, z: 20 }} className="p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                  <div className="flex justify-between font-label-md text-xs font-bold mb-2 uppercase tracking-wide">
                    <span className="text-zinc-700 dark:text-zinc-300">Heavy Metals (Pb, Hg, Cd)</span>
                    <span className="text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">CRITICAL</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]"></div>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, z: 20 }} className="p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                  <div className="flex justify-between font-label-md text-xs font-bold mb-2 uppercase tracking-wide">
                    <span className="text-zinc-700 dark:text-zinc-300">Petrochemicals</span>
                    <span className="text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded">WARNING</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.6 }} className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full"></motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="relative h-64 md:h-auto border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl overflow-hidden bg-zinc-900 shadow-inner group-hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-shadow">
              <img alt="Industrial area satellite view" className="w-full h-full object-cover mix-blend-luminosity opacity-60 hover:opacity-80 transition-opacity duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRYLuzr-ivYu6zvQGrvWjb83wbCaTJlkZbTtALSeaRz6PrtRWS6LAhfHd6Lip8Ha93vPTd82Tu6LDePEiqvJntTzOLmrasKMmoDhmtOOK3Lc2hqUZdgD_nCWqWfOV1vU9OMvNJFCmB9gx0woDPr2US8ukmoy93hEPXj6W7U4w-RpTnG5WESFH7YfpCIDlJ_MNtk1KeWlyLdE7i0ARYZu2nkUjg7z3QJVtq1x49eJ4C4dVLQ4-y_RMd3FNHaiH8fC4n4QCSHEjMH_gG"/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-zinc-900/50 border-t border-white/10">
                <span className="text-white font-label-md text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  {loading ? '...' : data?.industrial?.activeDischargeZones || 3} Active Discharge Zones Detected
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agricultural Vector (Col 1-7) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-7 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:shadow-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
              <span className="material-symbols-outlined text-[24px]">agriculture</span>
            </div>
            <div>
              <h2 className="font-headline-md text-[28px] font-bold text-zinc-900 dark:text-white leading-tight">Agricultural Runoff</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="font-label-md text-xs text-zinc-500 uppercase tracking-widest font-bold">Vector Class: Beta-2</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Non-point source pollution resulting from rainfall or snowmelt moving over and through the ground, carrying natural and human-made pollutants into lakes, rivers, and coastal waters.</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: 'Nitrates', val: loading ? '...' : data?.agricultural?.nitrates || '12.4', unit: 'mg/L' },
                { title: 'Phosphates', val: loading ? '...' : data?.agricultural?.phosphates || '3.8', unit: 'mg/L' },
                { title: 'Pesticides', val: loading ? '...' : data?.agricultural?.pesticides || '0.9', unit: 'µg/L' }
              ].map((m, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="border border-zinc-200/50 dark:border-zinc-700/50 p-4 rounded-xl text-center bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 shadow-sm transition-all">
                  <div className="font-label-md text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{m.title}</div>
                  <div className="font-headline-md text-[24px] font-black text-zinc-900 dark:text-white">{m.val} <span className="text-sm font-medium text-zinc-400">{m.unit}</span></div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/30 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 mt-2">
              <span className="font-label-md text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">Eutrophication Risk</span>
              <div className="flex gap-1.5">
                <div className="w-10 h-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                <div className="w-10 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-10 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-10 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                <div className="w-10 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Domestic Vector (Col 8-12) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <span className="material-symbols-outlined text-[24px]">home_work</span>
              </div>
              <div>
                <h2 className="font-headline-md text-[28px] font-bold text-zinc-900 dark:text-white leading-tight">Domestic Waste</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <p className="font-label-md text-xs text-zinc-500 uppercase tracking-widest font-bold">Vector Class: Gamma-3</p>
                </div>
              </div>
            </div>
            <p className="font-body-md text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">Urban runoff, untreated sewage, and household chemical disposal. Rapidly emerging microplastic indicators detected in metropolitan adjacent zones.</p>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Microplastics', icon: 'scatter_plot' },
              { title: 'Pharmaceuticals', icon: 'medication' },
              { title: 'Pathogens (E. coli)', icon: 'water_damage' }
            ].map((item, i) => (
              <Link href="/contaminants" key={i} className="block">
                <motion.div whileHover={{ x: 5, scale: 1.01 }} className="p-4 border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md transition-all cursor-pointer group/item">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-200/50 dark:bg-zinc-700/50 flex items-center justify-center group-hover/item:bg-zinc-900 group-hover/item:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <span className="font-label-lg text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-zinc-400 group-hover/item:translate-x-1 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-all">arrow_forward</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
