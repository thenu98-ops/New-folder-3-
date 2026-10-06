import React from 'react';
import { twMerge } from 'tailwind-merge';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline';
};

export function PrimaryButton({ className, variant = 'solid', children, ...rest }: PrimaryButtonProps) {
  const base =
  'inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-8 font-display text-base font-semibold tracking-tight transition-[transform,background-color,opacity] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-35';
  const variants = {
    solid: 'bg-ink text-white shadow-button hover:bg-ink/90',
    outline: 'bg-cream text-ink ring-1 ring-line hover:bg-canvas'
  };
  return (
    <button className={twMerge(base, variants[variant], className)} {...rest}>
      {children}
    </button>);

}