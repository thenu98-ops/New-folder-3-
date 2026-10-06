import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { CalendarHeartIcon, HeartIcon, MapPinIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { EASE_OUT } from '../../utils/motion';

export function FinaleStep({ place, date }: {place: string;date: string;}) {
  const rows = [
  { label: 'Where', value: place, icon: MapPinIcon },
  { label: 'When', value: format(parseISO(date), 'EEEE, MMMM d, yyyy'), icon: CalendarHeartIcon }];


  return (
    <Screen>
      <div className="text-center">
        <motion.div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blush-soft text-blush"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: [0.96, 1.08, 1] }}
          transition={{ duration: 0.3, ease: EASE_OUT }}>
          
          <HeartIcon size={28} fill="currentColor" strokeWidth={0} aria-hidden />
        </motion.div>

        <h1 className="mt-7 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          It's a date,{' '}
          <span className="font-serif text-[2.8rem] font-normal italic tracking-normal text-blush">Faith.</span>
        </h1>
      </div>

      <dl className="mt-8 space-y-2">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-center gap-4 rounded-2xl bg-cream p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blush">
                <Icon size={18} aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-muted">{row.label}</dt>
                <dd className="font-display text-base font-semibold tracking-tight text-ink">{row.value}</dd>
              </div>
            </div>);

        })}
      </dl>

      <p className="mt-7 text-center text-sm text-muted">Locked in. No take-backs. Wear the pink shoes.</p>
    </Screen>);

}