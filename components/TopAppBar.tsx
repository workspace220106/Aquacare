'use client';

import { motion } from 'framer-motion';
import { useSearch } from '@/context/SearchContext';

export default function TopAppBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-[calc(100%-256px)] z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md font-['Space_Grotesk'] font-medium flex items-center justify-between px-8 h-16 ml-64 text-zinc-900 dark:text-zinc-50"
    >
      {/* Search Bar (on_left) */}
      <div className="flex items-center w-64 bg-surface-container border border-outline-variant rounded px-3 py-2 text-on-surface-variant focus-within:border-primary focus-within:text-on-surface transition-colors duration-200 ease-in-out">
        <span className="material-symbols-outlined text-[18px] mr-2">search</span>
        <input 
          className="bg-transparent border-none outline-none text-sm w-full font-['Inter'] placeholder:text-outline" 
          placeholder="Search analytics..." 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200 ease-in-out flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container"
        >
          <span className="material-symbols-outlined">notifications</span>
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200 ease-in-out flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container"
        >
          <span className="material-symbols-outlined">settings</span>
        </motion.button>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded bg-surface-variant border border-outline-variant overflow-hidden ml-2 cursor-pointer"
        >
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnKIqQTZGK0lOoYV_Er5qKePldNm50UYGPJSB3X0Nmwjmx0LH9HRXj3bGCOQxTTDO9iskZWaNBz-E5j94IFtvz-mULp3WUQWOycHNsM5518k6f4gNPFCqx2EV5n3lrE3l84EpebQJfRwH0cbQZMpnBEnevM4KX6ZS4SliLgRQbq2iJfvEJMSmIjwYMOpBeKFvMlAkhbc3S9cWG6gJao5VOKfK52UKKkSYqmFjhaYrq0dwWnMX-ZPlgDHqttxfpO_N_-Pj-ZG-tIIm4"
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
