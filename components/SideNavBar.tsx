'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Explorer', href: '/explorer', icon: 'explore' },
  { name: 'Disease Encyclopedia', href: '/encyclopedia', icon: 'menu_book' },
  { name: 'Pollution Sources', href: '/pollution-sources', icon: 'factory' },
  { name: 'Prevention', href: '/prevention', icon: 'shield' },
  { name: 'Calculator', href: '/calculator', icon: 'calculate' },
  { name: 'Stats', href: '/stats', icon: 'bar_chart' },
];

export default function SideNavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Invisible hover trigger zone on the left edge of the screen */}
      <div 
        className="fixed left-0 top-0 h-full w-5 z-[55] pointer-events-auto cursor-e-resize"
        onMouseEnter={() => setIsOpen(true)}
      />

      {/* Floating pull tab trigger */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: 2 }}
          onClick={() => setIsOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[58] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-r-lg p-2.5 cursor-pointer shadow-lg border border-l-0 border-zinc-700 dark:border-zinc-300 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[20px] animate-pulse">menu</span>
        </motion.div>
      )}

      {/* Actual Navigation Drawer */}
      <motion.nav 
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-['Space_Grotesk'] text-sm flex flex-col py-6 z-[60] shadow-2xl pointer-events-auto"
      >
        {/* Brand Header */}
        <div className="px-6 mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
            </motion.div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-50">AquaPure</h1>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Water Intelligence</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                <motion.div 
                  whileHover={{ scale: 0.98, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer pointer-events-auto ${
                    isActive 
                      ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-none border-l-4 border-zinc-900 dark:border-zinc-50' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
