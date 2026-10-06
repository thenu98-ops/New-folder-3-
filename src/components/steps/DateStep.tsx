import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { LockIcon, LockOpenIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';
import { EASE_OUT } from '../../utils/motion';

export function DateStep({ place, onLock }: {place: string;onLock: (date: string) => void;}) {
  const [date, setDate] = useState('');
  const [locked, setLocked] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');

  function handleLock() {
    if (!date || locked) return;
    setLocked(true);
    setTimeout(() => onLock(date), 900);
  }

  return (
    <Screen>
      <p className="text-sm font-medium text-muted">{place}. Perfect choice.</p>
      <h1 className="mt-2 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
        Pick our day.
      </h1>

      <div className="mt-6 min-h-[2.5rem]">
        <AnimatePresence mode="wait">
          {date &&
          <motion.p
            key={date}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="font-serif text-3xl italic text-blush">
            
              {format(parseISO(date), 'EEEE, MMMM d')}
            </motion.p>
          }
        </AnimatePresence>
      </div>

      <label htmlFor="date-input" className="mt-2 block text-sm font-medium text-muted">
        Date
      </label>
      <input
        id="date-input"
        type="date"
        min={today}
        value={date}
        disabled={locked}
        onChange={(e) => setDate(e.target.value)}
        className="mt-2 h-14 w-full rounded-2xl bg-cream px-5 text-lg text-ink outline-none ring-1 ring-line transition-[box-shadow,background-color] duration-150 focus:bg-white focus:ring-2 focus:ring-ink disabled:opacity-60" />
      

      <PrimaryButton className="mt-8 w-full" onClick={handleLock} disabled={!date}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={locked ? 'locked' : 'open'}
            initial={{ opacity: 0, scale: 0.96, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16, ease: EASE_OUT }}
            className="flex items-center">
            
            {locked ? <LockIcon size={16} aria-hidden /> : <LockOpenIcon size={16} aria-hidden />}
          </motion.span>
        </AnimatePresence>
        {locked ? 'Locked in' : 'Lock the date'}
      </PrimaryButton>
    </Screen>);

}