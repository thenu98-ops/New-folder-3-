import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';
import { EASE_OUT } from '../../utils/motion';

export function ShoesStep({ onContinue }: {onContinue: () => void;}) {
  return (
    <Screen>
      <p className="text-sm font-medium text-muted">Wait — before that.</p>
      <h1 className="mt-2 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
        I can't stop thinking about your{' '}
        <span className="font-serif text-[2.4rem] font-normal italic tracking-normal text-blush">pink shoes.</span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.28, ease: EASE_OUT }}
        className="mt-5 rounded-2xl bg-cream p-5 text-base leading-relaxed text-ink/80">
        
        They've been walking around in my mind every single day. Honestly, at this point they should start paying rent.
      </motion.p>
      <PrimaryButton className="mt-8 w-full" onClick={onContinue}>
        <HeartIcon size={16} className="text-blush" fill="currentColor" strokeWidth={0} aria-hidden />
        Okay, I'm blushing
      </PrimaryButton>
    </Screen>);

}