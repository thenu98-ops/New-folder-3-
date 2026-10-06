import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';
import { places } from '../../data/places';
import { EASE_OUT } from '../../utils/motion';

export function PlaceStep({ onChoose }: {onChoose: (place: string) => void;}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState('');

  const isCustom = selected === 'custom';
  const canContinue = selected !== null && (!isCustom || custom.trim().length > 0);

  function handleSubmit() {
    if (!canContinue || !selected) return;
    const label = isCustom ? custom.trim() : places.find((p) => p.id === selected)?.label ?? selected;
    onChoose(label);
  }

  return (
    <Screen>
      <p className="text-sm font-medium text-muted">You said yes. Now the fun part.</p>
      <h1 className="mt-2 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
        Where should we go?
      </h1>

      <div role="radiogroup" aria-label="Date place" className="mt-7 grid grid-cols-2 gap-3">
        {places.map((place) => {
          const active = selected === place.id;
          const Icon = place.icon;
          return (
            <button
              key={place.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(place.id)}
              className={`relative flex flex-col items-start rounded-2xl p-4 text-left transition-[background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush ${
              active ? 'bg-ink text-white shadow-button' : `${place.tile} text-ink`}`
              }>
              
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-150 ${
                active ? 'bg-white/15 text-white' : place.chip}`
                }>
                
                <Icon size={18} strokeWidth={2} aria-hidden />
              </span>
              <span className="mt-6 block font-display text-base font-semibold tracking-tight">{place.label}</span>
              <span className={`block text-xs ${active ? 'text-white/70' : 'text-muted'}`}>{place.note}</span>
              {active &&
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blush text-white">
                  <CheckIcon size={12} strokeWidth={3} aria-hidden />
                </span>
              }
            </button>);

        })}
      </div>

      <AnimatePresence initial={false}>
        {isCustom &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="overflow-hidden">
          
            <label htmlFor="custom-place" className="sr-only">
              Your place
            </label>
            <input
            id="custom-place"
            autoFocus
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Anywhere you like…"
            className="mt-3 h-14 w-full rounded-2xl bg-cream px-5 text-lg text-ink outline-none ring-1 ring-line transition-[box-shadow,background-color] duration-150 placeholder:text-muted/60 focus:bg-white focus:ring-2 focus:ring-ink" />
          
          </motion.div>
        }
      </AnimatePresence>

      <PrimaryButton className="mt-6 w-full" onClick={handleSubmit} disabled={!canContinue}>
        That's the one
        <ArrowRightIcon size={18} aria-hidden />
      </PrimaryButton>
    </Screen>);

}