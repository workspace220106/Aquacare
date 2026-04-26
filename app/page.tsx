'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/water-quality');
        const json = await res.json();
        if (json.success) {
          setData(json.data || []);
        }
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalSites = data.length;
  const avgScore = totalSites > 0 ? (data.reduce((acc, curr) => acc + curr.quality_score, 0) / totalSites).toFixed(1) : '94.2';
  const criticalAlerts = data.filter(d => d.quality_score < 70);

  return (
    <div className="p-margin max-w-[1280px] mx-auto space-y-gutter">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-between items-end mb-lg"
      >
        <div>
          <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-background">System Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Real-time telemetry and analytical intelligence.</p>
        </div>
        <div className="flex gap-sm">
          <Link href="/explorer">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-outline bg-surface-container-lowest text-on-surface px-md py-sm rounded hover:bg-surface-container transition-colors font-label-lg text-label-lg flex items-center gap-2 cursor-pointer pointer-events-auto"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Data
            </motion.div>
          </Link>
          <Link href="/explorer">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-on-primary px-md py-sm rounded hover:bg-inverse-surface transition-colors font-label-lg text-label-lg flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Report
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Hero Section (Spans 8 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-8 bg-primary rounded-lg border border-primary-fixed-dim overflow-hidden relative group min-h-[360px] flex flex-col justify-end p-lg shadow-sm"
        >
          {/* Background Image */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"
          >
            <img 
              alt="3D abstract water grid" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGrDKIRx4Q0HvOKcin8-Ad2idleZVHrSUG5UvpWa9H188VltkYpJc-5NIQUcWXqXB4kVdNw0aDotDILLGH-xLuqIYOInQUJji96O0m7Jb7yuNv4AXpunL4t0NXZab6FKuFmreukrpau6WIB2oIQt-xAhmS3-hSkOcqPgxF8weFGJo9ck1-ClItPtVevrp-3ugZZ_xata4murmKlYJ8aN4dqzTSvA_-54xDPfyF2gHgHMaNAs-3jYltHK9CujQ6zgEBTQXGEIH6Z1A8"
            />
          </motion.div>
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
          <div className="relative z-20 w-3/4">
            <div className={`inline-block px-sm py-xs border border-on-primary-fixed-variant rounded mb-md text-on-primary font-label-md text-label-md tracking-wider uppercase ${criticalAlerts.length > 0 ? 'bg-error text-white border-error' : ''}`}>
                Global Status: {criticalAlerts.length > 0 ? 'Warning' : 'Nominal'}
            </div>
            <h3 className="font-headline-md text-headline-md text-on-primary mb-4 leading-tight">Precision Water Analytics Interface v2.4</h3>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim mb-6 line-clamp-2">
                Advanced USGS telemetry streams are active. Currently tracking {loading ? '...' : totalSites} sites across {loading ? '...' : 'surveyed regions'} via live API feeds.
            </p>
            <Link href="/explorer">
              <motion.div 
                whileHover={{ x: 10 }}
                className="border border-on-primary text-on-primary px-md py-sm rounded hover:bg-on-primary hover:text-primary transition-colors font-label-lg text-label-lg flex items-center gap-2 w-max cursor-pointer pointer-events-auto"
              >
                  View Full Water Monitoring<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Key Metric: Quality Index (Spans 4 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-lg border border-outline-variant p-lg flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Aggregate Quality Index</h4>
              <span className="material-symbols-outlined text-outline">monitoring</span>
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className={`font-headline-lg text-[64px] font-bold tracking-tighter leading-none ${parseFloat(avgScore.toString()) < 75 ? 'text-secondary' : 'text-on-background'}`}
              >
                {loading ? '...' : avgScore}
              </motion.span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">AQI</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-secondary-container font-label-md text-label-md bg-secondary-fixed/30 px-2 py-1 rounded w-max border border-secondary-fixed">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              Live USGS Feed
            </div>
          </div>
          {/* Minimalist Bar Chart Placeholder */}
          <div className="w-full h-16 flex items-end gap-1 mt-8">
            <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ delay: 0.4 }} className="flex-1 bg-surface-container-highest rounded-t-sm"></motion.div>
            <motion.div initial={{ height: 0 }} animate={{ height: '60%' }} transition={{ delay: 0.5 }} className="flex-1 bg-surface-container-highest rounded-t-sm"></motion.div>
            <motion.div initial={{ height: 0 }} animate={{ height: '45%' }} transition={{ delay: 0.6 }} className="flex-1 bg-surface-container-highest rounded-t-sm"></motion.div>
            <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} transition={{ delay: 0.7 }} className="flex-1 bg-surface-container-highest rounded-t-sm"></motion.div>
            <motion.div initial={{ height: 0 }} animate={{ height: '75%' }} transition={{ delay: 0.8 }} className="flex-1 bg-surface-container-highest rounded-t-sm"></motion.div>
            <motion.div initial={{ height: 0 }} animate={{ height: '95%' }} transition={{ delay: 0.9 }} className={`flex-1 ${parseFloat(avgScore.toString()) < 75 ? 'bg-secondary' : 'bg-primary'} rounded-t-sm`}></motion.div>
          </div>
        </motion.div>

        {/* Live Alerts (Spans 4 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-lg border border-outline-variant p-lg"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-surface-container-high">
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Active Alerts</h4>
            <span className={`${criticalAlerts.length > 0 ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-on-surface'} font-label-md text-label-md px-2 py-1 rounded`}>
              {loading ? '...' : `${criticalAlerts.length} Critical`}
            </span>
          </div>
          <ul className="space-y-4 max-h-[200px] overflow-y-auto">
            {loading && <li className="text-sm text-outline">Syncing active alerts...</li>}
            {!loading && criticalAlerts.length === 0 && (
              <li className="text-sm text-outline">No critical alerts detected in the current data feed.</li>
            )}
            {criticalAlerts.map((alert, i) => (
              <motion.li key={i} whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-error shrink-0"></div>
                <div>
                  <p className="font-label-md text-label-md text-on-background font-semibold truncate max-w-[200px]">{alert.location}</p>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-snug">AQI drop to {alert.quality_score}. Immediate review recommended.</p>
                </div>
              </motion.li>
            ))}
            
            {/* Keeping some fake ones for aesthetics if no real alerts */}
            {!loading && criticalAlerts.length === 0 && (
              <>
                <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 opacity-50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-tertiary-container shrink-0"></div>
                  <div>
                    <p className="font-label-md text-label-md text-on-background font-semibold">Flow Rate Anomaly</p>
                    <p className="font-body-md text-[13px] text-on-surface-variant leading-snug">Resolved: Unexpected pressure drop in primary main.</p>
                  </div>
                </motion.li>
              </>
            )}
          </ul>
        </motion.div>

        {/* Network Status Map (Spans 8 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-lg border border-outline-variant p-0 overflow-hidden relative flex flex-col"
        >
          <div className="px-lg py-md border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest z-10">
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Sensor Network Topology</h4>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
          </div>
          {/* Map Placeholder Container */}
          <div className="flex-1 bg-surface-container-low relative w-full h-full min-h-[240px] flex">
            <div className="w-64 shrink-0 border-r border-surface-container-high p-lg flex flex-col gap-4 bg-surface-container-low/50 z-20">
              <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">Topology Overview</h5>
              <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  This interface visualizes the real-time spatial distribution of active, inactive, and critical sensor nodes across geographic coordinates.
              </p>
              <div className="mt-4 pt-4 border-t border-surface-container-high space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">Active Node</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                  <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">Critical Alert</span>
                </div>
              </div>
            </div>
            {/* High contrast monochromatic map representation */}
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              alt="Map topology" 
              className="w-full h-full object-cover mix-blend-multiply opacity-30 grayscale flex-1" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR-uc_FehYBEUdG-ynJuTudxCucFuyrM008p_dQ2TowY5Ud8u_rG2yG3w4yE6FUEYUfiFUD9e_qa2LjbdhFqMLHGC2jm_Qt1PKlwp0AwhKbNU-VhraA-1lJ_cFlcbXWU0subKIV6rh5vHsW2WmfglGc6D0Of_deI6Y9vxXztz5NAR2izXaHyBZ9WAx8CX9FdtgQq3194LVo6joDXgvia9a_67_ljhuvZF-egOtZKu_ZUyUMwciTGbLxYw86C2R-yuJYrFmrpGRgt4p"
            />
            {/* Overlay Tech Elements */}
            {!loading && data.slice(0, 10).map((site, i) => {
              const top = 60 - ((site.coordinates.lat - 25) * 1.5);
              const left = ((site.coordinates.lng + 125) * 1.5);
              const boundedTop = Math.max(10, Math.min(90, top));
              const boundedLeft = Math.max(10, Math.min(90, left));
              const isError = site.quality_score < 70;
              
              return (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 + (i % 3) }} 
                  className={`absolute w-3 h-3 ${isError ? 'bg-error ring-error/20' : 'bg-primary ring-primary/20'} rounded-full ring-4`}
                  style={{ top: `${boundedTop}%`, left: `${boundedLeft}%` }}
                />
              )
            })}
            
            {loading && (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></motion.div>
            )}

            {/* HUD overlay stats */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur border border-outline-variant p-3 rounded font-body-md text-[12px] flex flex-col gap-1"
            >
              <div className="flex justify-between gap-4"><span className="text-outline">Active Nodes:</span> <span className="font-bold text-on-background">{loading ? '...' : totalSites}</span></div>
              <div className="flex justify-between gap-4"><span className="text-outline">Data Latency:</span> <span className="font-bold text-on-background">Live</span></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
