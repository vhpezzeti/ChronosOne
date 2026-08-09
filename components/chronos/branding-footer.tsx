'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function BrandingFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 pb-2 px-2"
    >
      <div className="flex items-center gap-2">
        <Zap className="h-3 w-3 text-gold/40" fill="currentColor" />
        <span className="text-[10px] italic text-muted-foreground/60 tracking-wide">
          Born from Steel. Driven by Code.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-muted-foreground/40">
          CHRONOS ONE · Sistema de Ponto Eletrônico
        </span>
        <span className="text-[10px] text-muted-foreground/40">·</span>
        <span className="text-[10px] italic text-muted-foreground/50 tracking-wider">
          V Pezzetti
        </span>
      </div>
    </motion.footer>
  );
}
