import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { GateStep } from './components/steps/GateStep';
import { TreasureStep } from './components/steps/TreasureStep';
import { StartStep } from './components/steps/StartStep';
import { ShoesStep } from './components/steps/ShoesStep';
import { QuestionStep } from './components/steps/QuestionStep';
import { PlaceStep } from './components/steps/PlaceStep';
import { DateStep } from './components/steps/DateStep';
import { FinaleStep } from './components/steps/FinaleStep';
import { TopBar } from './components/TopBar';
import { questions } from './data/questions';
import { questionColors, stepColors } from './data/theme';
import { logEvent, sendEmail } from './utils/notify';

type Step = 'magic' | 'flirty' | 'treasure' | 'start' | 'shoes' | 'question' | 'place' | 'date' | 'finale';

type Log = {
  magic: string[];
  flirty: string[];
  answers: {question: string;noTries: number;}[];
  place: string;
  date: string;
};

const STEP_ORDER: Step[] = ['magic', 'flirty', 'treasure', 'start', 'shoes', 'question', 'place', 'date', 'finale'];

export function App() {
  const [step, setStep] = useState<Step>('magic');
  const [qIndex, setQIndex] = useState(0);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const log = useRef<Log>({ magic: [], flirty: [], answers: [], place: '', date: '' });
  const emailSent = useRef(false);
  const stepRef = useRef<Step>('magic');
  stepRef.current = step;

  // If she leaves before finishing, still email whatever she entered so far.
  useEffect(() => {
    function handleHide() {
      if (document.visibilityState !== 'hidden' || emailSent.current) return;
      if (log.current.magic.length === 0) return;
      emailSent.current = true;
      sendEmail('Faith left before finishing', buildFields(log.current, `Stopped at: ${stepRef.current}`));
    }
    document.addEventListener('visibilitychange', handleHide);
    return () => document.removeEventListener('visibilitychange', handleHide);
  }, []);

  function handleAnswer(noTries: number) {
    const q = questions[qIndex];
    log.current.answers.push({ question: q.text, noTries });
    logEvent(`Question ${qIndex + 1}`, `${q.text} → YES (${noTries} No attempts)`);
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1);else
    setStep('place');
  }

  function handlePlace(value: string) {
    setPlace(value);
    log.current.place = value;
    logEvent('Date place', value);
    setStep('date');
  }

  function handleDate(value: string) {
    setDate(value);
    log.current.date = value;
    logEvent('Date', value);
    emailSent.current = true;
    sendEmail("It's a date! Faith's answers", buildFields(log.current, 'Finished — date locked'));
    setStep('finale');
  }

  const stepPosition = STEP_ORDER.indexOf(step);
  const questionOffset = step === 'question' ? qIndex : stepPosition > STEP_ORDER.indexOf('question') ? questions.length - 1 : 0;
  const totalSteps = STEP_ORDER.length - 1 + questions.length - 1;
  const progress = Math.min(1, (stepPosition + questionOffset + 1) / (totalSteps + 1));

  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        className="min-h-[100dvh] w-full overflow-x-hidden font-sans text-ink"
        initial={false}
        animate={{
          backgroundColor:
          step === 'question' ? questionColors[qIndex % questionColors.length] : stepColors[step]
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}>
        
        <TopBar progress={progress} />
        <AnimatePresence mode="wait">
          {step === 'magic' &&
          <GateStep
            key="magic"
            lead="Before the fairy tale begins"
            title="What's the magic word?"
            placeholder="Type it here"
            errorText="You can't go in yet. Please enter the magic word."
            buttonLabel="Open"
            validate={(v) => ['thenu', 'Thenu'].includes(v.trim())}
            onAttempt={(v, ok) => {
              log.current.magic.push(`"${v}" (${ok ? 'correct' : 'wrong'})`);
              logEvent('Magic word attempt', v);
            }}
            onSuccess={() => setStep('flirty')} />

          }
          {step === 'flirty' &&
          <GateStep
            key="flirty"
            lead="One more key"
            title="What was the first flirty word I said to you?"
            placeholder="You remember…"
            errorText="Not quite. You can't go in yet — try again."
            buttonLabel="Unlock"
            validate={(v) => v.toLowerCase().replace(/\s+/g, '') === 'punchimadam'}
            onAttempt={(v, ok) => {
              log.current.flirty.push(`"${v}" (${ok ? 'correct' : 'wrong'})`);
              logEvent('Flirty word attempt', v);
            }}
            onSuccess={() => setStep('treasure')} />

          }
          {step === 'treasure' && <TreasureStep key="treasure" onContinue={() => setStep('start')} />}
          {step === 'start' && <StartStep key="start" onStart={() => setStep('shoes')} />}
          {step === 'shoes' && <ShoesStep key="shoes" onContinue={() => setStep('question')} />}
          {step === 'question' &&
          <QuestionStep
            key={`q-${qIndex}`}
            question={questions[qIndex]}
            index={qIndex}
            total={questions.length}
            onYes={handleAnswer} />

          }
          {step === 'place' && <PlaceStep key="place" onChoose={handlePlace} />}
          {step === 'date' && <DateStep key="date" place={place} onLock={handleDate} />}
          {step === 'finale' && <FinaleStep key="finale" place={place} date={date} />}
        </AnimatePresence>
      </motion.main>
    </MotionConfig>);

}

function buildFields(log: Log, status: string): Record<string, string> {
  const fields: Record<string, string> = {
    Status: status,
    'Magic word typed': log.magic.join(', ') || '—',
    'Flirty word typed': log.flirty.join(', ') || '—'
  };
  log.answers.forEach((a, i) => {
    fields[`Q${i + 1}: ${a.question}`] = `YES (tried to press No ${a.noTries}x)`;
  });
  fields['Date place'] = log.place || '—';
  fields['Date'] = log.date || '—';
  return fields;
}