'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Explorer', href: '/explorer', icon: 'explore' },
  { name: 'Disease Encyclopedia', href: '/encyclopedia', icon: 'menu_book' },
  { name: 'Pollution Sources', href: '/pollution-sources', icon: 'factory' },
  { name: 'Contaminants', href: '/contaminants', icon: 'science' },
  { name: 'Prevention', href: '/prevention', icon: 'shield' },
  { name: 'Calculator', href: '/calculator', icon: 'calculate' },
  { name: 'Stats', href: '/stats', icon: 'bar_chart' },
];

export default function SideNavBar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-['Space_Grotesk'] text-sm flex flex-col py-6 z-50"
    >
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
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

      {/* Navigation Links */}
      <div className="flex flex-col gap-1 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}>
              <motion.div 
                whileHover={{ scale: 0.98, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
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
  );
}
