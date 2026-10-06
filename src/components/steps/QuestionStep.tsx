import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';
import { DodgingNoButton } from '../DodgingNoButton';
import { noTeases } from '../../data/questions';
import { EASE_OUT } from '../../utils/motion';

type Question = {id: string;lead: string;text: string;yesReply: string;};

type QuestionStepProps = {
  question: Question;
  index: number;
  total: number;
  onYes: (noTries: number) => void;
};

export function QuestionStep({ question, index, total, onYes }: QuestionStepProps) {
  const [noTries, setNoTries] = useState(0);
  const [accepted, setAccepted] = useState(false);

  function handleYes() {
    if (accepted) return;
    setAccepted(true);
    setTimeout(() => onYes(noTries), 900);
  }

  const tease = noTries > 0 ? noTeases[(noTries - 1) % noTeases.length] : '';

  return (
    <Screen>
      <span className="inline-flex h-7 items-center rounded-full bg-cream px-3 text-xs font-semibold text-muted ring-1 ring-line">
        {index + 1} / {total}
      </span>

      <p className="mt-6 text-sm font-medium text-muted">{question.lead}</p>
      <h1 className="mt-2 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
        {question.text}
      </h1>

      <div className="mt-4 min-h-[1.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          {accepted ?
          <motion.p
            key="reply"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex items-center gap-1.5 text-sm font-medium text-blush">
            
              <HeartIcon size={14} fill="currentColor" aria-hidden />
              {question.yesReply}
            </motion.p> :

          tease &&
          <motion.p
            key={tease}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="text-sm text-muted">
            
                {tease}
              </motion.p>

          }
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-3">
        <motion.div
          className="flex-1"
          animate={{ scale: accepted ? 1.04 : 1 + Math.min(noTries, 5) * 0.025 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
          
          <PrimaryButton className="w-full" onClick={handleYes}>
            Yes
          </PrimaryButton>
        </motion.div>
        {!accepted && <DodgingNoButton onDodge={() => setNoTries((n) => n + 1)} />}
      </div>

      <AnimatePresence>
        {accepted &&
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center text-blush"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          aria-hidden>
          
            <motion.span
            initial={{ scale: 0.6 }}
            animate={{ scale: [0.6, 1.15, 1] }}
            transition={{ duration: 0.3, ease: EASE_OUT }}>
            
              <HeartIcon size={72} fill="currentColor" strokeWidth={0} />
            </motion.span>
          </motion.div>
        }
      </AnimatePresence>
    </Screen>);

}