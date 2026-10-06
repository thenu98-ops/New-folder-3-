import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SparkleIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';
import { EASE_OUT } from '../../utils/motion';

const NAME = 'Faith';
const LETTER_DELAY = 0.18;
const sparkles = [
{ x: -46, d: 0 },
{ x: -18, d: 0.5 },
{ x: 10, d: 0.2 },
{ x: 38, d: 0.8 },
{ x: -30, d: 1.2 },
{ x: 24, d: 1.5 }];


export function TreasureStep({ onContinue }: {onContinue: () => void;}) {
  const [phase, setPhase] = useState(0); // 0 closed · 1 open · 2 name · 3 welcome

  useEffect(() => {
    const nameAt = 1500;
    const timers = [
    setTimeout(() => setPhase(1), 700),
    setTimeout(() => setPhase(2), nameAt),
    setTimeout(() => setPhase(3), nameAt + NAME.length * LETTER_DELAY * 1000 + 450)];

    return () => timers.forEach(clearTimeout);
  }, []);

  const open = phase >= 1;

  return (
    <Screen>
      <div className="flex flex-col items-center text-center">
        {/* Treasure chest */}
        <div className="relative h-36 w-44" style={{ perspective: 700 }} aria-hidden>
          {open &&
          sparkles.map((s, i) =>
          <motion.span
            key={i}
            className="absolute left-1/2 top-12 text-gold"
            style={{ marginLeft: s.x }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: -70 }}
            transition={{ duration: 2.2, delay: s.d, repeat: Infinity, ease: 'linear' }}>
            
                <SparkleIcon size={12} fill="currentColor" strokeWidth={0} />
              </motion.span>
          )}

          <motion.div
            className="absolute inset-x-3 top-[3.1rem] h-3 rounded-sm bg-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }} />
          

          <motion.div
            className="absolute inset-x-0 top-0 h-14 rounded-t-[1.75rem] border-2 border-wood-dark bg-wood"
            style={{ transformOrigin: '50% 100%' }}
            animate={open ? { rotateX: 58, y: -10 } : { rotateX: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
            
            <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-gold/90" />
          </motion.div>

          <div className="absolute inset-x-0 top-14 h-20 rounded-b-xl border-2 border-wood-dark bg-wood">
            <div className="absolute inset-x-0 top-0 h-2 bg-gold/90" />
            <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-gold/90" />
            <div className="absolute left-1/2 top-1 h-6 w-7 -translate-x-1/2 rounded-md border-2 border-wood-dark bg-gold" />
          </div>
        </div>

        {/* Name, letter by letter */}
        <h1 aria-label={NAME} className="mt-12 h-[5.5rem] font-serif text-[5.5rem] leading-none text-ink">
          {NAME.split('').map((char, i) =>
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={phase >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: i * LETTER_DELAY, duration: 0.28, ease: EASE_OUT }}>
            
              {char}
            </motion.span>
          )}
        </h1>

        <motion.div
          className="mt-8 flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.28, ease: EASE_OUT }}>
          
          <p className="font-display text-xl font-semibold tracking-tight text-ink">Welcome to your fairy tale.</p>
          <p className="mt-1 text-sm text-muted">You found the treasure. It was always you.</p>
          <PrimaryButton className="mt-10 w-full" onClick={onContinue} disabled={phase < 3}>
            Continue
          </PrimaryButton>
        </motion.div>
      </div>
    </Screen>);

}