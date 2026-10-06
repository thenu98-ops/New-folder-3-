import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

type Point = {x: number;y: number;};

type DodgingNoButtonProps = {
  onDodge: () => void;
  label?: string;
};

const buttonClass =
'h-14 whitespace-nowrap rounded-2xl bg-cream px-8 font-display text-base font-semibold tracking-tight text-ink ring-1 ring-line select-none touch-none';

export function DodgingNoButton({ onDodge, label = 'No' }: DodgingNoButtonProps) {
  const inlineRef = useRef<HTMLButtonElement>(null);
  const size = useRef({ w: 96, h: 56 });
  const lastDodge = useRef(0);
  const [from, setFrom] = useState<Point | null>(null);
  const [pos, setPos] = useState<Point | null>(null);

  function pickSpot(current: Point): Point {
    const pad = 20;
    const { w, h } = size.current;
    const maxX = Math.max(pad, window.innerWidth - w - pad);
    const maxY = Math.max(pad, window.innerHeight - h - pad);
    let next = current;
    for (let i = 0; i < 12; i++) {
      next = { x: pad + Math.random() * (maxX - pad), y: pad + Math.random() * (maxY - pad) };
      if (Math.hypot(next.x - current.x, next.y - current.y) > 140) break;
    }
    return next;
  }

  function dodge(e: React.SyntheticEvent) {
    e.preventDefault();
    const now = Date.now();
    if (now - lastDodge.current < 120) return;
    lastDodge.current = now;

    let current = pos;
    if (!current) {
      const rect = inlineRef.current?.getBoundingClientRect();
      current = rect ? { x: rect.left, y: rect.top } : { x: 0, y: 0 };
      if (rect) size.current = { w: rect.width, h: rect.height };
      setFrom(current);
    }
    setPos(pickSpot(current));
    onDodge();
  }

  const handlers = { onPointerEnter: dodge, onPointerDown: dodge, onClick: dodge };

  if (!pos) {
    return (
      <button ref={inlineRef} type="button" className={buttonClass} {...handlers}>
        {label}
      </button>);

  }

  return (
    <>
      <span aria-hidden className="inline-block" style={{ width: size.current.w, height: size.current.h }} />
      {createPortal(
        <motion.button
          type="button"
          className={`${buttonClass} fixed left-0 top-0 z-50 shadow-sm`}
          initial={from ?? pos}
          animate={pos}
          transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.6 }}
          {...handlers}>
          
          {label}
        </motion.button>,
        document.body
      )}
    </>);

}