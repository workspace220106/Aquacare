'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Hotspot {
  id: string;
  name: string;
  chemical: string;
  load: string;
  top: string;
  left: string;
  detail: string;
  level: 'CRITICAL' | 'WARNING' | 'ELEVATED';
}

interface IndustrialSite {
  name: string;
  location: string;
  coordinates: string;
  image: string;
  activeDischargeZones: number;
  globalToxicityIndex: number;
  loadPercentage: number;
  heavyMetalsLevel: number;
  petrochemicalsLevel: number;
  description: string;
  hotspots: Hotspot[];
}

const INDUSTRIAL_SITES: IndustrialSite[] = [
  {
    name: 'Buffalo River Complex',
    location: 'Buffalo, New York',
    coordinates: '42.8584° N, 78.8471° W',
    image: '/industrial_satellite.png',
    activeDischargeZones: 3,
    globalToxicityIndex: 85.6,
    loadPercentage: 42,
    heavyMetalsLevel: 85,
    petrochemicalsLevel: 60,
    description: 'Direct discharge from heavy metal manufacturing and steel processing facilities along the Buffalo River. Primary contributors include lead, mercury, synthetic solvents, and thermal discharge.',
    hotspots: [
      {
        id: 'A',
        name: 'Refinery Outflow Alpha',
        chemical: 'Heavy Metals (Pb, Cd, Hg)',
        load: '85% (Critical)',
        top: '28%',
        left: '42%',
        level: 'CRITICAL',
        detail: 'Primary discharge point of manufacturing refinery. Heavy metal effluent (Lead & Cadmium) exceeding EPA limits.'
      },
      {
        id: 'B',
        name: 'Chemical Runoff Beta',
        chemical: 'Synthetic Solvents & Organics',
        load: '60% (Warning)',
        top: '52%',
        left: '68%',
        level: 'WARNING',
        detail: 'Storage tank runoff containing synthetic industrial solvents.'
      },
      {
        id: 'C',
        name: 'Cooling Outlet Gamma',
        chemical: 'Thermal Effluent',
        load: '45% (Elevated)',
        top: '72%',
        left: '32%',
        level: 'ELEVATED',
        detail: 'Cooling tower heated water outlet, raising local water temperatures and accelerating eutrophication.'
      }
    ]
  },
  {
    name: 'Sacramento Manufacturing Delta',
    location: 'Sacramento, California',
    coordinates: '38.0607° N, 121.9022° W',
    image: '/industrial_satellite_2.png',
    activeDischargeZones: 4,
    globalToxicityIndex: 79.4,
    loadPercentage: 38,
    heavyMetalsLevel: 70,
    petrochemicalsLevel: 55,
    description: 'Industrial runoff processing and chemical production outlets situated near agricultural channels. Main pollutants include agricultural packaging residues, hydrocarbon solvents, and urban run-offs.',
    hotspots: [
      {
        id: 'A',
        name: 'Pesticide Terminal',
        chemical: 'Pesticide Residues (Atrazine)',
        load: '90% (Critical)',
        top: '32%',
        left: '35%',
        level: 'CRITICAL',
        detail: 'Bulk transport packaging discharge channel with persistent chemical residues.'
      },
      {
        id: 'B',
        name: 'Refinery Separator',
        chemical: 'Hydrocarbons (Diesel/Oil)',
        load: '55% (Warning)',
        top: '48%',
        left: '58%',
        level: 'WARNING',
        detail: 'Wastewater separator outflow with detectable petroleum hydrocarbons.'
      },
      {
        id: 'C',
        name: 'Acid Wash Tank Bypass',
        chemical: 'Bypass Runoff (Low pH)',
        load: '40% (Elevated)',
        top: '68%',
        left: '42%',
        level: 'ELEVATED',
        detail: 'Occasional low pH discharge from metal cleaning processes.'
      },
      {
        id: 'D',
        name: 'Pellet Transport Edge',
        chemical: 'Microplastic Pellets',
        load: '65% (Warning)',
        top: '22%',
        left: '72%',
        level: 'WARNING',
        detail: 'Stormwater runoff containing pre-production plastic pellets.'
      }
    ]
  },
  {
    name: 'Houston Ship Channel Sector 4',
    location: 'Houston, Texas',
    coordinates: '29.7337° N, 95.1481° W',
    image: '/industrial_satellite_3.png',
    activeDischargeZones: 5,
    globalToxicityIndex: 91.2,
    loadPercentage: 54,
    heavyMetalsLevel: 92,
    petrochemicalsLevel: 80,
    description: 'Major petrochemical refining center. High density of active processing towers and industrial chemical docks discharging directly into the channel.',
    hotspots: [
      {
        id: 'A',
        name: 'Petrochemical Canal',
        chemical: 'Aromatic Hydrocarbons (Benzene)',
        load: '92% (Critical)',
        top: '40%',
        left: '48%',
        level: 'CRITICAL',
        detail: 'Bulk refining discharge canal. Trace levels of benzene and toluene exceeding national safety levels.'
      },
      {
        id: 'B',
        name: 'Catalyst Wash Line',
        chemical: 'Hexavalent Chromium (Cr VI)',
        load: '70% (Warning)',
        top: '30%',
        left: '26%',
        level: 'WARNING',
        detail: 'Spent catalyst wash water containing volatile chromium derivatives.'
      },
      {
        id: 'C',
        name: 'Solvent Storage Spillway',
        chemical: 'Aromatic Solvents',
        load: '60% (Warning)',
        top: '58%',
        left: '72%',
        level: 'WARNING',
        detail: 'Valving leakage at chemical loading docks during high-pressure transfers.'
      },
      {
        id: 'D',
        name: 'Process Thermal Basin',
        chemical: 'Thermal Inflow',
        load: '35% (Elevated)',
        top: '78%',
        left: '44%',
        level: 'ELEVATED',
        detail: 'Secondary heat exchanger cooling water discharge.'
      },
      {
        id: 'E',
        name: 'Condensate Drain Line',
        chemical: 'Phenolic Compounds',
        load: '50% (Elevated)',
        top: '46%',
        left: '64%',
        level: 'ELEVATED',
        detail: 'Plastics synthesis plant condensate line discharge containing trace BPA.'
      }
    ]
  }
];

export default function PollutionSourcesPage() {
  const [activeSite, setActiveSite] = useState<IndustrialSite | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize random site on refresh
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * INDUSTRIAL_SITES.length);
    setActiveSite(INDUSTRIAL_SITES[randomIndex]);
    setLoading(false);
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
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
  };

  return (
    <div className="flex-1 overflow-y-auto p-margin md:p-xl flex flex-col gap-lg relative z-10 scroll-smooth h-full bg-zinc-50/50">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 z-[-1] pointer-events-none"></div>
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-xs mb-md"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 w-fit text-xs font-bold tracking-wider uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          System Online
        </div>
        <h1 className="font-headline-lg text-[48px] leading-tight text-zinc-900 bg-clip-text text-transparent bg-gradient-to-r from-zinc-950 to-zinc-600">Source Tracking Diagnostics</h1>
        <p className="font-body-lg text-body-lg text-zinc-600 max-w-3xl">Real-time telemetry and structural analysis of primary water contaminant vectors across industrial, agricultural, and domestic sectors.</p>
      </motion.div>

      {/* Grid Layout */}
      {!loading && activeSite && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min"
        >
          {/* Overview Card (Col 1-4) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between h-full group hover:border-zinc-300 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/5"
          >
            <div className="flex justify-between items-start mb-lg">
              <div className="flex items-center gap-2 text-zinc-900">
                <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-zinc-200 transition-colors">
                  <span className="material-symbols-outlined text-zinc-900" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
                </div>
                <span className="font-label-lg text-label-lg uppercase tracking-widest font-bold">Global Toxicity Index</span>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-700 font-label-md text-xs font-bold rounded-full border border-red-200 shadow-sm animate-pulse">ELEVATED</span>
            </div>
            <div>
              <div className="font-headline-lg text-[80px] font-black leading-none tracking-tighter text-zinc-900 mb-2 group-hover:scale-105 transition-transform origin-left duration-500">
                {activeSite.globalToxicityIndex.toFixed(1)}
                <span className="text-headline-md text-zinc-400">%</span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-zinc-200 via-zinc-200 to-transparent my-6"></div>
              <p className="font-body-md text-sm text-zinc-600 mb-6 leading-relaxed">
                Overall concentration of verified pollutants across monitored watersheds has increased in the last 72 hours. Currently tracking: <strong className="text-zinc-950 font-bold">{activeSite.name}</strong>.
              </p>
              <button 
                onClick={() => {
                  const currentIndex = INDUSTRIAL_SITES.findIndex(s => s.name === activeSite.name);
                  const nextIndex = (currentIndex + 1) % INDUSTRIAL_SITES.length;
                  setActiveSite(INDUSTRIAL_SITES[nextIndex]);
                }}
                className="relative overflow-hidden bg-zinc-900 text-white font-label-md text-sm font-bold px-4 py-3.5 rounded-xl uppercase tracking-widest hover:bg-zinc-800 transition-all w-full shadow-md hover:shadow-lg group/btn cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
                  Switch Monitoring Site
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
            </div>
          </motion.div>

          {/* Industrial Vector (Col 5-12) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-8 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col group hover:border-zinc-300 transition-all duration-500 hover:shadow-xl"
          >
            <div className="flex justify-between items-start border-b border-zinc-100 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>factory</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-[28px] font-bold text-zinc-900 leading-tight">Industrial Effluent</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <p className="font-label-md text-xs text-zinc-500 uppercase tracking-widest font-bold">Vector: {activeSite.name} ({activeSite.coordinates})</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-headline-lg text-[40px] font-black text-red-600 leading-none drop-shadow-[0_2px_10px_rgba(220,38,38,0.1)]">{activeSite.loadPercentage}%</div>
                <div className="font-label-md text-xs text-zinc-400 uppercase tracking-widest font-bold mt-1">Of Total Load</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              <div className="flex flex-col justify-center">
                <p className="font-body-md text-sm text-zinc-600 mb-8 leading-relaxed">
                  {activeSite.description}
                </p>
                <div className="flex flex-col gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="p-3 rounded-xl hover:bg-zinc-50 transition-colors border border-zinc-100 shadow-sm">
                    <div className="flex justify-between font-label-md text-xs font-bold mb-2 uppercase tracking-wide">
                      <span className="text-zinc-700">Heavy Metals (Pb, Hg, Cd)</span>
                      <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded text-[10px] border border-red-100 font-bold">CRITICAL</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${activeSite.heavyMetalsLevel}%` }} 
                        transition={{ duration: 1, delay: 0.3 }} 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-3 rounded-xl hover:bg-zinc-50 transition-colors border border-zinc-100 shadow-sm">
                    <div className="flex justify-between font-label-md text-xs font-bold mb-2 uppercase tracking-wide">
                      <span className="text-zinc-700">Petrochemicals</span>
                      <span className="text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded text-[10px] border border-yellow-100 font-bold">WARNING</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${activeSite.petrochemicalsLevel}%` }} 
                        transition={{ duration: 1, delay: 0.4 }} 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Satellite Interactive Image Container */}
              <div className="relative h-72 md:h-auto border border-zinc-200 rounded-xl overflow-hidden bg-zinc-900 shadow-inner group/sat">
                <img 
                  alt="Industrial area satellite view" 
                  className="w-full h-full object-cover opacity-85 group-hover/sat:opacity-90 transition-all duration-700 group-hover/sat:scale-[1.03]" 
                  src={activeSite.image}
                />
                
                {/* HUD Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                {/* Hotspots Overlay */}
                {activeSite.hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className="absolute cursor-pointer"
                    style={{ top: spot.top, left: spot.left, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setHoveredHotspot(spot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        spot.level === 'CRITICAL' ? 'bg-red-400' : spot.level === 'WARNING' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`}></span>
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 shadow-md border border-white/40 ${
                        spot.level === 'CRITICAL' ? 'bg-red-600' : spot.level === 'WARNING' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></span>
                    </span>
                  </div>
                ))}

                {/* Interactive HUD Overlay Tooltip */}
                <AnimatePresence>
                  {hoveredHotspot && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-16 left-4 right-4 bg-zinc-950/95 border border-zinc-800 backdrop-blur-md p-4 rounded-xl text-white shadow-2xl z-20 flex flex-col gap-1.5"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                        <span className="font-label-lg text-sm font-bold tracking-wide flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            hoveredHotspot.level === 'CRITICAL' ? 'bg-red-500' : hoveredHotspot.level === 'WARNING' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></span>
                          {hoveredHotspot.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          hoveredHotspot.level === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          hoveredHotspot.level === 'WARNING' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {hoveredHotspot.chemical}
                        </span>
                      </div>
                      <p className="font-body-md text-xs text-zinc-400 leading-relaxed mt-1">
                        {hoveredHotspot.detail}
                      </p>
                      <div className="flex justify-between items-center text-[10px] font-label-md uppercase tracking-wider text-zinc-500 mt-1">
                        <span>Discharge Load: <strong className="text-white font-bold">{hoveredHotspot.load}</strong></span>
                        <span>Hotspot ID: {hoveredHotspot.id}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Bar info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-zinc-950/90 border-t border-zinc-800 z-10 flex justify-between items-center">
                  <span className="text-white font-label-md text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    {activeSite.activeDischargeZones} Active Discharge Zones Detected
                  </span>
                  <span className="text-zinc-500 font-label-md text-[10px] tracking-wide uppercase font-bold hidden sm:inline">
                    Hover image hotspots for telemetry
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Agricultural Vector (Col 1-7) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-6 group hover:border-zinc-300 transition-all duration-500 hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
                <span className="material-symbols-outlined text-[24px]">agriculture</span>
              </div>
              <div>
                <h2 className="font-headline-md text-[28px] font-bold text-zinc-900 leading-tight">Agricultural Runoff</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="font-label-md text-xs text-zinc-500 uppercase tracking-widest font-bold">Vector Class: Beta-2</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-body-md text-sm text-zinc-600 leading-relaxed">Non-point source pollution resulting from rainfall or snowmelt moving over and through the ground, carrying natural and human-made pollutants into lakes, rivers, and coastal waters.</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: 'Nitrates', val: '12.4', unit: 'mg/L' },
                  { title: 'Phosphates', val: '3.8', unit: 'mg/L' },
                  { title: 'Pesticides', val: '0.9', unit: 'µg/L' }
                ].map((m, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} className="border border-zinc-200 p-4 rounded-xl text-center bg-zinc-50 hover:bg-white shadow-sm hover:shadow transition-all">
                    <div className="font-label-md text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{m.title}</div>
                    <div className="font-headline-md text-[24px] font-black text-zinc-900">{m.val} <span className="text-sm font-medium text-zinc-400">{m.unit}</span></div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-zinc-50 p-4 rounded-xl border border-zinc-200 mt-2">
                <span className="font-label-md text-xs font-bold text-zinc-700 uppercase tracking-widest">Eutrophication Risk</span>
                <div className="flex gap-1.5">
                  <div className="w-10 h-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.2)]"></div>
                  <div className="w-10 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-10 h-2.5 bg-red-400 rounded-full"></div>
                  <div className="w-10 h-2.5 bg-zinc-200 rounded-full"></div>
                  <div className="w-10 h-2.5 bg-zinc-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Domestic Vector (Col 8-12) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-6 group hover:border-zinc-300 transition-all duration-500 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
                  <span className="material-symbols-outlined text-[24px]">home_work</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-[28px] font-bold text-zinc-900 leading-tight">Domestic Waste</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <p className="font-label-md text-xs text-zinc-500 uppercase tracking-widest font-bold">Vector Class: Gamma-3</p>
                  </div>
                </div>
              </div>
              <p className="font-body-md text-sm text-zinc-600 mb-6 leading-relaxed">Urban runoff, untreated sewage, and household chemical disposal. Rapidly emerging microplastic indicators detected in metropolitan adjacent zones.</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Microplastics', icon: 'scatter_plot' },
                { title: 'Pharmaceuticals', icon: 'medication' },
                { title: 'Pathogens (E. coli)', icon: 'water_damage' }
              ].map((item, i) => (
                <Link href="/contaminants" key={i} className="block">
                  <motion.div whileHover={{ x: 5, scale: 1.01 }} className="p-4 border border-zinc-200 rounded-xl flex items-center justify-between bg-zinc-50 hover:bg-white hover:shadow-md transition-all cursor-pointer group/item">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center group-hover/item:bg-zinc-900 group-hover/item:text-white transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <span className="font-label-lg text-sm font-bold text-zinc-900">{item.title}</span>
                    </div>
                    <span className="material-symbols-outlined text-zinc-400 group-hover/item:translate-x-1 group-hover/item:text-zinc-900 transition-all">arrow_forward</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
