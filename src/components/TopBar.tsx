import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '../utils/motion';

export function TopBar({ progress }: {progress: number;}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 px-6 pt-7">
      <div
        className="mx-auto h-1.5 max-w-md overflow-hidden rounded-full bg-white/60"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}>
        
        <motion.div
          className="h-full origin-left rounded-full bg-blush"
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.3, ease: EASE_OUT }} />
        
      </div>
    </header>);

}