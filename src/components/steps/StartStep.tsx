import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Screen } from '../Screen';
import { PrimaryButton } from '../PrimaryButton';

export function StartStep({ onStart }: {onStart: () => void;}) {
  return (
    <Screen>
      <p className="text-sm font-medium text-muted">Just you, me, and a few questions.</p>
      <h1 className="mt-2 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
        Wanna start <span className="font-serif text-[3rem] font-normal italic tracking-normal text-blush">something?</span>
      </h1>
      <PrimaryButton className="mt-10 w-full" onClick={onStart}>
        Yes, let's start
        <ArrowRightIcon size={18} aria-hidden />
      </PrimaryButton>
    </Screen>);

}