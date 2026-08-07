'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ClockCard() {
  const [time, setTime] = useState(new Date());
  const [punching, setPunching] = useState(false);
  const [punched, setPunched] = useState(false);
  const [punchType] = useState<string>('Entrada');

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handlePunch = () => {
    setPunching(true);
    setTimeout(() => {
      setPunching(false);
      setPunched(true);
      setTimeout(() => setPunched(false), 3000);
    }, 1500);
  };

  const fmt = (n: number) => n.toString().padStart(2, '0');
  const hh = fmt(time.getHours());
  const mm = fmt(time.getMinutes());
  const ss = fmt(time.getSeconds());

  return (
    <div className="relative overflow-hidden rounded-2xl glass-gold glow-gold p-5 md:p-6">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-danger/5 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
        {/* Clock */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-0.5 font-mono tabular-nums">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold gold-text tracking-tight">
              {hh}
            </span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold gold-text"
            >
              :
            </motion.span>
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold gold-text tracking-tight">
              {mm}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gold/50 ml-1">
              :{ss}
            </span>
          </div>
          <p className="mt-2 text-xs md:text-sm text-muted-foreground capitalize text-center">
            {time.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Punch button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handlePunch}
            disabled={punching}
            className={cn(
              'group relative flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full transition-all',
              punched ? 'bg-success/20' : 'glass-gold glow-gold hover:scale-105'
            )}
          >
            {punching && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-gold"
              />
            )}
            {punching && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 rounded-full border-2 border-gold/50"
              />
            )}
            <AnimatePresence mode="wait">
              {punching ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="h-9 w-9 md:h-10 md:w-10 text-gold animate-spin" />
                </motion.div>
              ) : punched ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCircle2 className="h-9 w-9 md:h-10 md:w-10 text-success" />
                </motion.div>
              ) : (
                <motion.div
                  key="fingerprint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <Fingerprint className="h-9 w-9 md:h-10 md:w-10 text-gold group-hover:scale-110 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              {punched ? 'Ponto Registrado!' : 'Bater Ponto'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {punched ? `${punchType} às ${hh}:${mm}` : 'Toque no sensor'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
