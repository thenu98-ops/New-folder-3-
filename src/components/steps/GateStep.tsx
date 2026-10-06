import React, { useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { ArrowRightIcon, LockKeyholeIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';
import { EASE_OUT } from '../../utils/motion';

type GateStepProps = {
  lead: string;
  title: string;
  placeholder: string;
  errorText: string;
  buttonLabel: string;
  validate: (value: string) => boolean;
  onAttempt: (value: string, correct: boolean) => void;
  onSuccess: () => void;
};

export function GateStep({ lead, title, placeholder, errorText, buttonLabel, validate, onAttempt, onSuccess }: GateStepProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const controls = useAnimationControls();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const correct = validate(value);
    onAttempt(value, correct);
    if (correct) {
      onSuccess();
      return;
    }
    setError(true);
    controls.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.3, ease: 'easeOut' } });
  }

  return (
    <Screen>
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-soft text-blush">
        <LockKeyholeIcon size={20} strokeWidth={2} aria-hidden />
      </div>
      <p className="text-sm font-medium text-muted">{lead}</p>
      <h1 className="mt-2 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">{title}</h1>

      <form onSubmit={handleSubmit} className="mt-8" noValidate>
        <motion.div animate={controls}>
          <label htmlFor="gate-input" className="sr-only">
            {title}
          </label>
          <input
            id="gate-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={error}
            aria-describedby={error ? 'gate-error' : undefined}
            className={`h-14 w-full rounded-2xl bg-cream px-5 text-lg text-ink outline-none ring-1 transition-[box-shadow,background-color] duration-150 placeholder:text-muted/60 focus:bg-white focus:ring-2 ${
            error ? 'ring-blush focus:ring-blush' : 'ring-line focus:ring-ink'}`
            } />
          
        </motion.div>

        <div className="min-h-[2.75rem] px-1 pt-3">
          <AnimatePresence>
            {error &&
            <motion.p
              id="gate-error"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="text-sm font-medium text-blush">
              
                {errorText}
              </motion.p>
            }
          </AnimatePresence>
        </div>

        <PrimaryButton type="submit" className="w-full" disabled={!value.trim()}>
          {buttonLabel}
          <ArrowRightIcon size={18} aria-hidden />
        </PrimaryButton>
      </form>
    </Screen>);

}