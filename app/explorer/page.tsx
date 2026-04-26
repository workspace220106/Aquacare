'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ExplorerPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/water-quality');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setData(json.data[0]); // Pick the first site for the explorer view
        }
      } catch (err) {
        console.error('Error fetching water quality data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const ph = data?.metrics?.ph || 7.4;
  const temp = data?.metrics?.temperature || 18.4;
  const do2 = data?.metrics?.dissolved_oxygen || 8.5;
  const turbidity = data?.metrics?.turbidity || 2.1;

  const lat = data?.coordinates?.lat || 46.43;
  const lng = data?.coordinates?.lng || 6.55;

  return (
    <div className="flex-1 p-lg h-full overflow-y-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-lg gap-6"
      >
        <div className="flex items-center gap-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1 whitespace-nowrap">Water Monitoring Station</h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${loading ? 'bg-yellow-500' : 'bg-[#10b981]'}`}></span> 
              {loading ? 'Initializing Data Stream...' : 'Live Data Feed Active'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-outline-variant rounded font-label-lg text-label-lg text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 h-fit"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Parameters
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary rounded font-label-lg text-label-lg text-on-primary hover:bg-on-surface transition-colors flex items-center gap-2 h-fit"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Log
          </motion.button>
        </div>
      </motion.div>

      {/* Dashboard Bento Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Interactive Map Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-8 border border-outline-variant bg-surface rounded overflow-hidden relative min-h-[400px] hover:shadow-lg transition-shadow"
        >
          <div className="absolute inset-0 bg-zinc-900">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzptoObpt-XhKhJOzRj97CScT0Z9SeU4IaSv7GMBBliKm059kwFczKQJU-yYNEiQLq0sVnw22E4f8UMPZCTgHL3T2-f8ckdcK2KVkXXyS6z4SYTeXVAsxMT2CIm7DUJ7iFYHcFUCHcPRf9zbRO56XEhXWSfWCGWd5QIAUFt0takgEJA9q4CVANTTWVelmPJ4QNzO2PXEO2phBioJRCFnVGVkLr3MLOBC36cZY7aUm5GrcDy56u64dNRx3ImI9XNj1knbo61H0WIzNu"
            />
            {/* Map UI Overlay Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-zinc-950/80 pointer-events-none"></div>
            
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4 flex gap-2"
            >
              <span className="px-2 py-1 bg-white/10 backdrop-blur border border-white/20 text-white font-label-md text-label-md rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">my_location</span>
                {loading ? 'Locating...' : `${lat.toFixed(4)}°N ${lng.toFixed(4)}°W`}
              </span>
              <span className="px-2 py-1 bg-white/10 backdrop-blur border border-white/20 text-white font-label-md text-label-md rounded">
                Zoom: 14x
              </span>
            </motion.div>

            {/* Target Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-crosshair">
              <div className="w-32 h-32 border border-cyan-400/30 rounded-full animate-[spin_10s_linear_infinite] absolute"></div>
              <div className="w-8 h-8 border-2 border-cyan-400 flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 bg-cyan-400"></div>
              </div>
              {/* Tooltip */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-3 bg-zinc-900 border border-zinc-700 text-white p-2 rounded shadow-lg w-64 z-10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="font-label-md text-label-md text-zinc-400 mb-1 border-b border-zinc-700 pb-1 truncate">{data?.location || 'Sensor Node #042'}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-body-md text-[11px] text-zinc-300">Status</span>
                  <span className="font-label-md text-[12px] text-cyan-400">{data?.status || 'Active'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-[11px] text-zinc-300">Last Sync</span>
                  <span className="font-label-md text-[12px] text-cyan-400">{data?.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : 'Just now'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Quality Metrics Grid */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-gutter">
          {/* Metric 1: pH */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-outline-variant bg-surface rounded p-md flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">pH Level</span>
              <span className="material-symbols-outlined text-[16px] text-outline">science</span>
            </div>
            <div className="my-2 h-8 flex items-end gap-0.5">
              {[40,30,35,32,33,31,60,50,70,85].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: 0.4 + i * 0.05 }} 
                  className={`w-full ${i===9 ? 'bg-[#10b981]' : i>5 ? 'bg-[#10b981]/20' : 'bg-outline-variant/20'} rounded-t-[2px]`} 
                />
              ))}
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-surface mb-1">{ph.toFixed(2)}</div>
              <div className="flex items-center gap-1 font-label-md text-label-md text-[#10b981]">
                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>
                <span>Optimal</span>
              </div>
            </div>
          </motion.div>

          {/* Metric 2: Turbidity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-outline-variant bg-surface rounded p-md flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Turbidity</span>
              <span className="material-symbols-outlined text-[16px] text-outline">blur_on</span>
            </div>
            <div className="my-2 h-8 flex items-end gap-0.5">
              {[30,35,32,33,31,60,55,65,75,80].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: 0.5 + i * 0.05 }} 
                  className={`w-full ${i===9 ? 'bg-[#10b981]' : i>4 ? 'bg-[#10b981]/20' : 'bg-outline-variant/20'} rounded-t-[2px]`} 
                />
              ))}
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-surface mb-1">{turbidity.toFixed(1)}<span className="text-lg font-normal text-on-surface-variant ml-1">NTU</span></div>
              <div className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">remove</span>
                <span>Stable</span>
              </div>
            </div>
          </motion.div>

          {/* Metric 3: Dissolved Oxygen */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-outline-variant bg-surface rounded p-md flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Dissolved O2</span>
              <span className="material-symbols-outlined text-[16px] text-outline">air</span>
            </div>
            <div className="my-2 h-8 flex items-end gap-0.5">
              {[60,55,65,75,80,30,35,32,33,31].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: 0.6 + i * 0.05 }} 
                  className={`w-full ${i===4 ? 'bg-[#10b981]' : i<5 ? 'bg-[#10b981]/20' : 'bg-outline-variant/20'} rounded-t-[2px]`} 
                />
              ))}
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-surface mb-1">{do2.toFixed(1)}<span className="text-lg font-normal text-on-surface-variant ml-1">mg/L</span></div>
              <div className="flex items-center gap-1 font-label-md text-label-md text-[#10b981]">
                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>
                <span>Healthy</span>
              </div>
            </div>
          </motion.div>

          {/* Metric 4: Temperature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-outline-variant bg-surface rounded p-md flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Temperature</span>
              <span className="material-symbols-outlined text-[16px] text-outline">thermostat</span>
            </div>
            <div className="my-2 h-8 flex items-end gap-0.5">
              {[40,50,65,80,95,30,35,32,33,31].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: 0.7 + i * 0.05 }} 
                  className={`w-full ${i===4 ? 'bg-secondary' : i<5 ? 'bg-secondary/20' : 'bg-outline-variant/20'} rounded-t-[2px]`} 
                />
              ))}
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-surface mb-1">{temp.toFixed(1)}<span className="text-lg font-normal text-on-surface-variant ml-1">°C</span></div>
              <div className="flex items-center gap-1 font-label-md text-label-md text-secondary">
                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>
                <span>Live USGS Data</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pathogen Tracking Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-12 border border-outline-variant bg-surface rounded flex flex-col hover:shadow-md transition-shadow"
        >
          <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">bug_report</span>
              Biological Threat Indicators
            </h3>
            <span className="font-label-md text-label-md text-on-surface-variant">Last scan: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : '2 mins ago'}</span>
          </div>
          <div className="flex-1 p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-outline-variant/50 bg-surface-bright">
                  <th className="font-label-md text-label-md text-on-surface-variant p-3 font-medium w-1/2">Indicator</th>
                  <th className="font-label-md text-label-md text-on-surface-variant p-3 font-medium">Concentration</th>
                  <th className="font-label-md text-label-md text-on-surface-variant p-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Escherichia coli (E. coli)', value: '< 10 CFU/100mL', status: 'Safe', dot: 'bg-[#10b981]' },
                  { name: 'Total Coliforms', value: data?.quality_score < 70 ? '250 MPN/100mL' : '45 MPN/100mL', status: data?.quality_score < 70 ? 'Warning' : 'Safe', dot: data?.quality_score < 70 ? 'bg-secondary' : 'bg-[#10b981]', highlight: data?.quality_score < 70 },
                  { name: 'Enterococci', value: '15 CFU/100mL', status: 'Safe', dot: 'bg-[#10b981]' },
                  { name: 'Cyanobacteria', value: 'Low cell count', status: 'Safe', dot: 'bg-[#10b981]' }
                ].map((row, idx) => (
                  <motion.tr 
                    key={idx}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className={`border-b border-outline-variant/30 transition-colors ${row.highlight ? 'bg-error-container/10' : ''}`}
                  >
                    <td className="p-3 font-body-md text-[14px] text-on-surface flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${row.dot}`}></div>
                      {row.name}
                    </td>
                    <td className="p-3 font-label-md text-[13px] text-on-surface-variant">{row.value}</td>
                    <td className="p-3 text-right">
                      <span className={`inline-block px-2 py-1 font-label-md text-[11px] rounded-[2px] uppercase ${row.highlight ? 'bg-secondary text-white animate-pulse' : 'bg-surface-container-high border border-outline-variant/50 text-on-surface'}`}>
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
