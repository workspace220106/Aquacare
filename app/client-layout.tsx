'use client';

import SideNavBar from '@/components/SideNavBar';
import TopAppBar from '@/components/TopAppBar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { SearchProvider } from '@/context/SearchContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SearchProvider>
      <SideNavBar />
      <TopAppBar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 ml-64 pt-16 min-h-[1024px] bg-background bg-grid-pattern relative"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </SearchProvider>
  );
}
