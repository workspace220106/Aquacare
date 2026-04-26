'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ContaminantsPage() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 overflow-y-auto p-margin md:p-xl h-full bg-background">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[12px] font-bold text-secondary uppercase tracking-[0.2em] mb-2 block">Intelligence Report</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Contaminant Intelligence</h1>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary text-on-primary px-4 py-2 rounded font-label-lg text-label-lg hover:opacity-90 transition-opacity">EXPORT DATA</button>
            <button className="border border-outline px-4 py-2 rounded font-label-lg text-label-lg hover:bg-surface-container transition-colors">HISTORY</button>
          </div>
        </div>
        <p className="text-body-lg text-on-surface-variant max-w-3xl border-l-2 border-zinc-900 pl-4">
            Real-time analysis of non-biological and microbiological threats within the Apex Pro distribution network. Our sensory array monitors molecular density and pathogenic markers to provide sub-meter precision on water safety levels.
        </p>
      </motion.header>

      {/* Bento Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-12 gap-gutter"
      >
        {/* Microplastics Card (Large) */}
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg relative overflow-hidden group">
          <div className="flex justify-between items-start mb-xl">
            <div>
              <h2 className="font-headline-md text-headline-md mb-2 text-on-surface">Microplastics</h2>
              <p className="text-body-md text-on-surface-variant">Polymer particle distribution analysis</p>
            </div>
            <div className="text-right">
              <span className="text-headline-md font-bold text-primary">{loading ? '...' : data?.domestic?.microplastics || '14.2'}</span>
              <span className="text-label-md text-on-surface-variant block uppercase">PPM Avg</span>
            </div>
          </div>
          <div className="relative h-64 bg-zinc-50 border border-zinc-200/50 rounded-lg bg-grid-pattern flex items-center justify-center overflow-hidden mb-lg">
            {/* Abstract 3D Visualization Placeholder */}
            <div className="absolute inset-0 opacity-20">
              <img alt="3D visualization" className="w-full h-full object-cover mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmf-49g-WCvnXIqW7k7F87nzjkU3Cg4VsGAlMz39W05k8PxhsKV44Ud3XcUBPtabrR7YoiusfpIgiizxV13Phc66ZbOJkzI_vUaGjwJhwn4_jl_tG-AmuICDDv6g8e2EEvwZsxdIdIK9DQopZstYGkkWjcflcJ5N7hBVfICxrpmqOiOi-lfSwLs--Mw5_mcF9srZsO19hZuWwVnAJR495uSVo_HLq-D32UdYkm3UbysX1vxSCIGy5Ep6_-QpEwLrGoEy6f5FXJvlB-" />
            </div>
            <div className="z-10 text-center">
              <div className="w-48 h-48 border-2 border-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-32 h-32 border-4 border-primary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary">biotech</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col gap-1">
              <div className="bg-surface-container-lowest px-3 py-1 text-[10px] font-bold border border-outline-variant text-on-surface">SCAN_LINE: ACTIVE</div>
              <div className="bg-surface-container-lowest px-3 py-1 text-[10px] font-bold border border-outline-variant text-on-surface">ZOOM: 4500x</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-md">
            <motion.div whileHover={{ scale: 1.05 }} className="p-md bg-surface-container-low border border-outline-variant rounded">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Marine Impact</span>
              <p className="text-body-md font-semibold mt-1 text-on-surface">High Toxicity</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-md bg-surface-container-low border border-outline-variant rounded">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Retention Rate</span>
              <p className="text-body-md font-semibold mt-1 text-on-surface">98.4% Filtered</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-md bg-surface-container-low border border-outline-variant rounded">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Primary Source</span>
              <p className="text-body-md font-semibold mt-1 text-on-surface">Urban Runoff</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Pharmaceuticals Card (Tall) */}
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg flex flex-col rounded">
          <div className="mb-lg">
            <span className="material-symbols-outlined text-secondary mb-4 text-[32px]">medication</span>
            <h2 className="font-headline-md text-headline-md mb-2 text-on-surface">Pharmaceuticals</h2>
            <p className="text-body-md text-on-surface-variant">Trace chemical analysis of endocrine disruptors and antibiotics.</p>
          </div>
          <div className="space-y-6 flex-grow">
            <div className="border-b border-surface-container-highest pb-4">
              <div className="flex justify-between mb-2">
                <span className="text-label-lg font-bold text-on-surface">Antibiotic Resistance</span>
                <span className="text-label-lg text-secondary">MODERATE</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${loading ? 66 : data?.domestic?.pharmaceuticals?.antibiotics}%` }} transition={{ duration: 1, delay: 0.5 }} className="bg-secondary h-full rounded-full"></motion.div>
              </div>
            </div>
            <div className="border-b border-surface-container-highest pb-4">
              <div className="flex justify-between mb-2">
                <span className="text-label-lg font-bold text-on-surface">Estrogenics</span>
                <span className="text-label-lg text-primary">STABLE</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${loading ? 25 : data?.domestic?.pharmaceuticals?.estrogenics}%` }} transition={{ duration: 1, delay: 0.6 }} className="bg-primary h-full rounded-full"></motion.div>
              </div>
            </div>
            <div className="border-b border-surface-container-highest pb-4">
              <div className="flex justify-between mb-2">
                <span className="text-label-lg font-bold text-on-surface">NSAID Residue</span>
                <span className="text-label-lg text-outline">NEGLIGIBLE</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${loading ? 8 : data?.domestic?.pharmaceuticals?.nsaids}%` }} transition={{ duration: 1, delay: 0.7 }} className="bg-outline h-full rounded-full"></motion.div>
              </div>
            </div>
          </div>
          <div className="mt-lg p-md border border-outline-variant rounded-lg bg-surface-container-low">
            <p className="text-[11px] font-medium leading-relaxed italic text-on-surface-variant">
                "Current trajectories indicate a 12% rise in antibiotic marker detection in Sector 7 during peak hours."
            </p>
          </div>
        </motion.div>

        {/* Pathogens Section (Wide) */}
        <motion.div variants={itemVariants} className="col-span-12 bg-surface-container-lowest border border-outline-variant p-lg rounded">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[32px]">coronavirus</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Pathogens & Bio-Threats</h2>
              </div>
              <p className="text-body-md text-on-surface-variant mt-2">Real-time detection telemetry for waterborne bacteria and viruses.</p>
            </div>
            <div className="flex items-center gap-6 px-lg py-md bg-primary text-on-primary rounded-lg">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-on-primary-fixed-variant">Global Threat Level</span>
                <span className="text-headline-md font-bold text-secondary">LVL 2</span>
              </div>
              <div className="h-10 w-px bg-on-primary-fixed-variant/50"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-on-primary-fixed-variant">Response Protocol</span>
                <span className="text-headline-md font-bold">ALPHA</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            {/* Cholera Module */}
            <motion.div whileHover={{ y: -5 }} className="border border-outline-variant p-md hover:bg-surface-container-low transition-colors rounded cursor-pointer shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-primary">V. cholerae</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 font-bold text-on-surface">{loading ? '0.00' : data?.domestic?.pathogens?.cholera?.toFixed(2)}%</span>
              </div>
              <div className="h-16 flex items-end gap-1 mb-4">
                {[4, 6, 3, 5, 8, 2].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h * 10}%` }} transition={{ delay: 0.5 + (i * 0.1) }} className={`w-full rounded-t-sm ${i === 5 ? 'bg-primary' : 'bg-surface-container-high'}`}></motion.div>
                ))}
              </div>
              <div className="text-label-md text-on-surface-variant uppercase">Detection Status</div>
              <div className="text-body-md font-bold text-[#10b981]">UNDETECTED</div>
            </motion.div>

            {/* Typhoid Module */}
            <motion.div whileHover={{ y: -5 }} className="border border-outline-variant p-md hover:bg-surface-container-low transition-colors rounded cursor-pointer shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-primary">S. typhi</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 font-bold text-on-surface">{loading ? '0.01' : data?.domestic?.pathogens?.typhoid?.toFixed(2)}%</span>
              </div>
              <div className="h-16 flex items-end gap-1 mb-4">
                {[2, 3, 4, 2, 6, 3].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h * 10}%` }} transition={{ delay: 0.6 + (i * 0.1) }} className={`w-full rounded-t-sm ${i === 5 ? 'bg-primary' : 'bg-surface-container-high'}`}></motion.div>
                ))}
              </div>
              <div className="text-label-md text-on-surface-variant uppercase">Detection Status</div>
              <div className="text-body-md font-bold text-[#10b981]">UNDETECTED</div>
            </motion.div>

            {/* E. Coli Module */}
            <motion.div whileHover={{ y: -5 }} className="border border-primary p-md bg-surface-container-low relative overflow-hidden rounded cursor-pointer shadow-md">
              <div className="absolute top-0 right-0 p-1">
                <span className="material-symbols-outlined text-[18px] text-secondary">warning</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-primary">E. coli</span>
                <span className="text-[10px] bg-secondary text-white px-2 py-0.5 font-bold rounded">{loading ? '1.24' : data?.domestic?.pathogens?.ecoli?.toFixed(2)}%</span>
              </div>
              <div className="h-16 flex items-end gap-1 mb-4">
                {[6, 12, 8, 14, 10, 6].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(h / 14) * 100}%` }} transition={{ delay: 0.7 + (i * 0.1) }} className={`w-full rounded-t-sm ${i === 1 || i === 3 ? 'bg-secondary' : i === 5 ? 'bg-primary' : 'bg-surface-container-highest'}`}></motion.div>
                ))}
              </div>
              <div className="text-label-md text-on-surface-variant uppercase">Detection Status</div>
              <div className="text-body-md font-bold text-secondary">ELEVATED</div>
            </motion.div>

            {/* Legionella Module */}
            <motion.div whileHover={{ y: -5 }} className="border border-outline-variant p-md hover:bg-surface-container-low transition-colors rounded cursor-pointer shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-primary">Legionella</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 font-bold text-on-surface">{loading ? '0.05' : data?.domestic?.pathogens?.legionella?.toFixed(2)}%</span>
              </div>
              <div className="h-16 flex items-end gap-1 mb-4">
                {[4, 2, 3, 5, 4, 2].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h * 10}%` }} transition={{ delay: 0.8 + (i * 0.1) }} className={`w-full rounded-t-sm ${i === 5 ? 'bg-primary' : 'bg-surface-container-high'}`}></motion.div>
                ))}
              </div>
              <div className="text-label-md text-on-surface-variant uppercase">Detection Status</div>
              <div className="text-body-md font-bold text-[#10b981]">UNDETECTED</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Footer Info */}
        <motion.div variants={itemVariants} className="col-span-12 flex justify-between items-center py-lg border-t border-outline-variant mt-4">
          <div className="flex gap-8">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase block">Last Sync</span>
              <span className="text-label-lg font-bold text-on-surface">{new Date().toISOString().slice(0,19).replace('T', ' ')} UTC</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-outline uppercase block">Sensors Online</span>
              <span className="text-label-lg font-bold text-on-surface">14,204 Units</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-outline"></span>
            SYSTEM COMPLIANT WITH ISO-14001 STANDARDS
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
