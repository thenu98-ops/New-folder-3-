import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '../utils/motion';

export function Screen({ children }: {children: React.ReactNode;}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="flex min-h-[100dvh] w-full items-center justify-center px-4 pb-8 pt-20 sm:px-6">
      
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-ink/5 sm:p-10">{children}</div>
    </motion.section>);

}