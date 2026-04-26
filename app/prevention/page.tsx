'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PreventionPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/directives');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Error fetching directives', err);
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 w-full p-xl h-full overflow-y-auto">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant pb-md"
        >
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Prevention Center</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Operational intelligence for hazard mitigation. Review systemic directives and log active incidents for immediate algorithmic processing.
            </p>
          </div>
          <div className="flex gap-sm">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-label-lg text-label-lg px-md py-sm border border-outline text-on-surface rounded-lg hover:bg-surface-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Matrix
            </motion.button>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Matrices & Directives (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            {/* Section: Action Matrix */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="flex items-center gap-2 mb-md">
                <span className="material-symbols-outlined text-primary">grid_view</span>
                <h3 className="font-headline-md text-headline-md text-on-background text-xl">Action Matrix (Individuals)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                {/* Matrix Card 1 */}
                <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md hover:bg-surface-container-low transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start mb-md">
                    <div className="w-10 h-10 bg-surface-container border border-outline-variant rounded flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined">filter_alt</span>
                    </div>
                    <span className="font-label-md text-label-md bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded">ACTIVE</span>
                  </div>
                  <h4 className="font-label-lg text-label-lg text-on-background mb-xs">{loading ? 'POU Filtration Optimization' : data?.actionMatrix[0]?.title || 'POU Filtration Optimization'}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-md line-clamp-2">{loading ? 'Deploy sub-micron filtration systems at point-of-use for residential mitigation of industrial heavy metal runoff.' : data?.actionMatrix[0]?.description || 'Deploy sub-micron filtration systems at point-of-use...'}</p>
                  <div className="flex gap-2">
                    <span className="font-label-md text-label-md bg-surface border border-outline-variant text-on-surface-variant px-2 py-1 rounded">{loading ? 'Efficacy: 98.4%' : data?.actionMatrix[0]?.metrics[0] || 'Efficacy: 98.4%'}</span>
                    <span className="font-label-md text-label-md bg-surface border border-outline-variant text-on-surface-variant px-2 py-1 rounded">{loading ? 'Cost: Low' : data?.actionMatrix[0]?.metrics[1] || 'Cost: Low'}</span>
                  </div>
                </motion.div>

                {/* Matrix Card 2 */}
                <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md hover:bg-surface-container-low transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start mb-md">
                    <div className="w-10 h-10 bg-surface-container border border-outline-variant rounded flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <span className="font-label-md text-label-md bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded">CRITICAL</span>
                  </div>
                  <h4 className="font-label-lg text-label-lg text-on-background mb-xs">{loading ? 'Contaminant Baselining' : data?.actionMatrix[1]?.title || 'Contaminant Baselining'}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-md line-clamp-2">{loading ? 'Mandatory bi-weekly testing protocol utilizing provided spectrophotometric assay kits for municipal tap sources.' : data?.actionMatrix[1]?.description}</p>
                  <div className="flex gap-2">
                    <span className="font-label-md text-label-md bg-surface border border-outline-variant text-on-surface-variant px-2 py-1 rounded">{loading ? 'Kit ID: TX-892' : data?.actionMatrix[1]?.metrics[0] || 'Kit ID: TX-892'}</span>
                  </div>
                </motion.div>

                {/* Matrix Card 3 */}
                <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-sm hover:bg-surface-container-low transition-colors group cursor-pointer md:col-span-2 shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 bg-surface-container border border-outline-variant rounded flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">water_damage</span>
                      </div>
                      <h4 className="font-label-lg text-label-lg text-on-background">{loading ? 'Microplastic Intake Minimization' : data?.actionMatrix[2]?.title || 'Microplastic Intake Minimization'}</h4>
                    </div>
                    <span className="font-label-md text-label-md bg-surface-dim text-on-surface px-2 py-1 rounded border border-outline-variant">MONITORING</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs max-w-2xl line-clamp-1">{loading ? 'Implement reverse osmosis layering in secondary holding tanks. Awaiting regional supply chain validation before escalating to active directive status.' : data?.actionMatrix[2]?.description}</p>
                </motion.div>
              </div>
            </motion.section>

            {/* Section: Systemic Directives */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-md"
            >
              <div className="flex items-center justify-between mb-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  <h3 className="font-headline-md text-headline-md text-on-background text-xl">Systemic Policy Directives</h3>
                </div>
                <button className="font-label-md text-label-md text-primary hover:text-on-tertiary-container transition-colors">VIEW ARCHIVE</button>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-sm p-sm bg-surface border-b border-outline-variant font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  <div className="col-span-3">Directive ID</div>
                  <div className="col-span-5">Target Policy</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Enforcement</div>
                </div>
                {/* Rows */}
                <motion.div whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }} className="grid grid-cols-12 gap-sm p-sm items-center border-b border-outline-variant transition-colors font-body-md text-body-md text-sm cursor-pointer">
                  <div className="col-span-3 font-label-lg text-on-background">{loading ? 'DIR-2024-A1' : data?.systemicDirectives[0]?.id || 'DIR-2024-A1'}</div>
                  <div className="col-span-5 text-on-surface line-clamp-1">{loading ? 'Agricultural Runoff Phosphorus Cap Implementation' : data?.systemicDirectives[0]?.title}</div>
                  <div className="col-span-2 flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${loading ? 'bg-secondary' : data?.systemicDirectives[0]?.statusDot}`}></span>{loading ? 'Enforced' : data?.systemicDirectives[0]?.status}
                  </div>
                  <div className="col-span-2 text-right font-label-md text-on-surface-variant">{loading ? 'Q2 2024' : data?.systemicDirectives[0]?.enforcement}</div>
                </motion.div>
                <motion.div whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }} className="grid grid-cols-12 gap-sm p-sm items-center border-b border-outline-variant transition-colors font-body-md text-body-md text-sm cursor-pointer">
                  <div className="col-span-3 font-label-lg text-on-background">{loading ? 'DIR-2024-B4' : data?.systemicDirectives[1]?.id || 'DIR-2024-B4'}</div>
                  <div className="col-span-5 text-on-surface line-clamp-1">{loading ? 'Municipal Infrastructure Modernization Mandate' : data?.systemicDirectives[1]?.title}</div>
                  <div className="col-span-2 flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${loading ? 'bg-primary-fixed-dim' : data?.systemicDirectives[1]?.statusDot}`}></span>{loading ? 'Drafting' : data?.systemicDirectives[1]?.status}
                  </div>
                  <div className="col-span-2 text-right font-label-md text-on-surface-variant">{loading ? 'TBD' : data?.systemicDirectives[1]?.enforcement}</div>
                </motion.div>
                <motion.div whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }} className="grid grid-cols-12 gap-sm p-sm items-center transition-colors font-body-md text-body-md text-sm cursor-pointer">
                  <div className="col-span-3 font-label-lg text-on-background">{loading ? 'DIR-2023-F9' : data?.systemicDirectives[2]?.id || 'DIR-2023-F9'}</div>
                  <div className="col-span-5 text-on-surface line-clamp-1">{loading ? 'Industrial Effluent Thermal Regulation' : data?.systemicDirectives[2]?.title}</div>
                  <div className="col-span-2 flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${loading ? 'bg-outline' : data?.systemicDirectives[2]?.statusDot}`}></span>{loading ? 'Auditing' : data?.systemicDirectives[2]?.status}
                  </div>
                  <div className="col-span-2 text-right font-label-md text-on-surface-variant">{loading ? 'Q4 2023' : data?.systemicDirectives[2]?.enforcement}</div>
                </motion.div>
              </div>
            </motion.section>
          </div>

          {/* Right Column: Form (4 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="bg-surface border border-outline-variant rounded-lg p-lg sticky top-24 shadow-md">
              <div className="flex items-center gap-2 mb-md border-b border-outline-variant pb-sm">
                <span className="material-symbols-outlined text-secondary">report</span>
                <h3 className="font-headline-md text-headline-md text-xl text-on-background">Log Incident</h3>
              </div>
              <p className="font-body-md text-body-md text-sm text-on-surface-variant mb-md">
                Submit raw field data for immediate heuristic analysis. High-severity reports bypass standard queue.
              </p>
              
              <form className="flex flex-col gap-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase tracking-wider">Classification Vector</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md p-sm rounded-lg appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                      <option>Select Vector...</option>
                      <option>Biological Contamination</option>
                      <option>Chemical/Industrial Spill</option>
                      <option>Infrastructure Failure</option>
                      <option>Anomalous Reading (Sensor)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase tracking-wider">Geospatial Coordinates</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md p-sm rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant" placeholder="e.g. 40.7128° N, 74.0060° W or Address" type="text" />
                </div>
                
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase tracking-wider">Severity Matrix</label>
                  <div className="flex gap-2 flex-wrap">
                    <label className="cursor-pointer">
                      <input className="peer sr-only" name="severity" type="radio" />
                      <span className="font-label-md text-label-md px-3 py-1.5 border border-outline-variant rounded bg-surface-container-lowest text-on-surface peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-colors block">LOW</span>
                    </label>
                    <label className="cursor-pointer">
                      <input className="peer sr-only" name="severity" type="radio" defaultChecked />
                      <span className="font-label-md text-label-md px-3 py-1.5 border border-outline-variant rounded bg-surface-container-lowest text-on-surface peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-colors block">ELEVATED</span>
                    </label>
                    <label className="cursor-pointer">
                      <input className="peer sr-only" name="severity" type="radio" />
                      <span className="font-label-md text-label-md px-3 py-1.5 border border-error text-error rounded bg-surface-container-lowest peer-checked:bg-error peer-checked:text-on-error transition-colors block">CRITICAL</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase tracking-wider">Field Notes / Telemetry</label>
                  <textarea className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md p-sm rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-outline-variant" placeholder="Enter raw descriptive data..." rows={3}></textarea>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-sm rounded-lg hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-2 mt-xs shadow-md" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  INITIATE LOG
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
