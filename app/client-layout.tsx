'use client';

import SideNavBar from '@/components/SideNavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { SearchProvider } from '@/context/SearchContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SearchProvider>
      <SideNavBar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 ml-64 pt-16 min-h-[1024px] bg-background bg-grid-pattern relative z-10"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </SearchProvider>
  );
}
