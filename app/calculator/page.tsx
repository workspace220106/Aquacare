'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CalculatorPage() {
  const [ph, setPh] = useState(7.2);
  const [doValue, setDoValue] = useState(8.5);
  const [turbidity, setTurbidity] = useState(2.1);
  const [tds, setTds] = useState(240);

  // Simple mock calculation for score
  const score = Math.max(0, Math.min(100, 100 - Math.abs(7.0 - ph) * 5 - (10 - doValue) * 2 - turbidity * 3 - (tds / 100)));

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative h-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-100 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 drop-shadow-sm">Parameter Input</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Adjust standard metrics to simulate and analyze the technical quality score of your water sample.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Inputs (Minimalist) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500"
          >
            {/* Input Group 1: pH Level */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-bold group-hover:text-zinc-600 transition-colors">pH Level</label>
                <div className="relative w-28">
                  <input 
                    className="w-full bg-white shadow-inner border border-outline-variant/50 rounded-xl px-4 py-2 font-headline-md text-[20px] text-primary text-right focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-zinc-400" 
                    type="number" step="0.1" value={ph} onChange={(e) => setPh(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="pt-3 pb-1">
                <input 
                  type="range" min="0" max="14" step="0.1" value={ph} onChange={(e) => setPh(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-3 font-label-md font-medium uppercase tracking-wider">
                  <span>0</span><span>Neutral (7)</span><span>14</span>
                </div>
              </div>
            </div>
            <hr className="border-t border-zinc-100 my-2 group-hover:border-zinc-200 transition-colors" />

            {/* Input Group 2: Dissolved Oxygen */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-bold group-hover:text-zinc-600 transition-colors">Dissolved Oxygen</label>
                <div className="relative w-28">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-md text-outline-variant text-[10px] font-bold">mg/L</span>
                  <input 
                    className="w-full bg-white shadow-inner border border-outline-variant/50 rounded-xl px-4 py-2 pr-9 font-headline-md text-[20px] text-primary text-right focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-zinc-400" 
                    type="number" step="0.5" value={doValue} onChange={(e) => setDoValue(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="pt-3 pb-1">
                <input 
                  type="range" min="0" max="20" step="0.5" value={doValue} onChange={(e) => setDoValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
            <hr className="border-t border-zinc-100 my-2 group-hover:border-zinc-200 transition-colors" />

            {/* Input Group 3: Turbidity */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-bold group-hover:text-zinc-600 transition-colors">Turbidity</label>
                <div className="relative w-28">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-md text-outline-variant text-[10px] font-bold">NTU</span>
                  <input 
                    className="w-full bg-white shadow-inner border border-outline-variant/50 rounded-xl px-4 py-2 pr-9 font-headline-md text-[20px] text-primary text-right focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-zinc-400" 
                    type="number" step="0.1" value={turbidity} onChange={(e) => setTurbidity(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="pt-3 pb-1">
                <input 
                  type="range" min="0" max="10" step="0.1" value={turbidity} onChange={(e) => setTurbidity(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
            <hr className="border-t border-zinc-100 my-2 group-hover:border-zinc-200 transition-colors" />

            {/* Input Group 4: TDS */}
            <div className="flex flex-col gap-4 group">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-bold group-hover:text-zinc-600 transition-colors">Total Dissolved Solids</label>
                <div className="relative w-28">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-md text-outline-variant text-[10px] font-bold">ppm</span>
                  <input 
                    className="w-full bg-white shadow-inner border border-outline-variant/50 rounded-xl px-4 py-2 pr-9 font-headline-md text-[20px] text-primary text-right focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-zinc-400" 
                    type="number" step="10" value={tds} onChange={(e) => setTds(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="pt-3 pb-1">
                <input 
                  type="range" min="0" max="1000" step="10" value={tds} onChange={(e) => setTds(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="mt-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setPh(7.2); setDoValue(8.5); setTurbidity(2.1); setTds(240); }}
                className="w-full bg-zinc-900 text-white font-label-lg text-label-lg rounded-xl py-4 hover:bg-zinc-800 transition-all duration-300 focus:ring-4 focus:ring-zinc-900/20 outline-none relative overflow-hidden group flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                Recalibrate Metrics
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Results Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6 h-full"
          >
            {/* Primary Score Card */}
            <div className="bg-zinc-950 text-white rounded-2xl p-8 md:p-12 flex flex-col relative overflow-hidden h-full justify-between shadow-2xl ring-1 ring-white/10 group transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex justify-between items-start w-full">
                  <h2 className="font-label-lg text-label-lg uppercase tracking-widest text-zinc-400 font-bold">Technical Quality Score</h2>
                  <div className={`bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-2 shrink-0 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                    <div className={`w-2 h-2 rounded-full ${score > 80 ? 'bg-green-400' : score > 50 ? 'bg-yellow-400' : 'bg-red-400'} animate-pulse`}></div>
                    <span className="tracking-wider font-bold">{score > 80 ? 'OPTIMAL' : score > 50 ? 'MARGINAL' : 'CRITICAL'}</span>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-3 mt-6">
                  <motion.span 
                    key={score}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-headline-lg text-[96px] leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 drop-shadow-lg"
                  >
                    {score.toFixed(1)}
                  </motion.span>
                  <span className="font-body-lg text-zinc-500 font-medium">/ 100</span>
                </div>

                {/* Segmented Bar Indicator */}
                <div className="flex flex-col gap-3 mt-10">
                  <div className="flex justify-between font-label-md text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                    <span>Critical</span>
                    <span>Marginal</span>
                    <span className="text-white">Optimal</span>
                  </div>
                  <div className="h-2 w-full flex gap-1.5 p-0.5 bg-zinc-900 rounded-full shadow-inner border border-white/5 relative">
                    <motion.div 
                      className="absolute top-0 bottom-0 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ type: 'spring', bounce: 0 }}
                    />
                  </div>
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-8 mt-16 pt-10 border-t border-white/10">
                <div className="flex flex-col gap-3 group/metric">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">pH Variance</span>
                    <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded shadow-inner">{(ph - 7).toFixed(1)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-gradient-to-r from-zinc-400 to-white rounded-full" animate={{ width: `${Math.max(0, 100 - Math.abs(ph-7)*20)}%` }} />
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 group/metric">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">O2 Saturation</span>
                    <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded shadow-inner">{doValue}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-gradient-to-r from-zinc-400 to-white rounded-full" animate={{ width: `${(doValue / 20) * 100}%` }} />
                  </div>
                </div>

                <div className="flex flex-col gap-3 group/metric">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">Clarity Index</span>
                    <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded shadow-inner">{turbidity < 3 ? 'High' : 'Low'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-gradient-to-r from-zinc-400 to-white rounded-full" animate={{ width: `${Math.max(0, 100 - turbidity*10)}%` }} />
                  </div>
                </div>

                <div className="flex flex-col gap-3 group/metric">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    {tds > 500 ? (
                      <span className="text-red-400 uppercase tracking-wider text-[11px] font-bold flex items-center gap-1.5 bg-red-400/10 px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[14px]">warning</span> TDS Alert
                      </span>
                    ) : (
                      <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-bold">TDS Status</span>
                    )}
                    <span className={`font-mono ${tds > 500 ? 'text-red-400' : 'text-white bg-white/10 px-2 py-0.5 rounded shadow-inner'}`}>{tds > 500 ? 'Elevated' : 'Normal'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      className={`h-full rounded-full ${tds > 500 ? 'bg-gradient-to-r from-red-600 to-red-400 animate-pulse' : 'bg-gradient-to-r from-zinc-400 to-white'}`} 
                      animate={{ width: `${Math.min(100, (tds / 1000) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
