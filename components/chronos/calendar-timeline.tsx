'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type DayInfo = {
  day: number;
  status?: 'worked' | 'partial' | 'off' | 'vacation' | 'today';
  hours?: string;
};

function getMonthData(year: number, month: number): (DayInfo | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const cells: (DayInfo | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const dow = new Date(year, month, d).getDay();
    let status: DayInfo['status'] = 'worked';
    let hours: string | undefined = '8:00';
    if (isToday) status = 'today';
    else if (dow === 0) { status = 'off'; hours = undefined; }
    else if (dow === 6) { status = 'partial'; hours = '4:00'; }
    if (d === 15) { status = 'vacation'; hours = undefined; }
    cells.push({ day: d, status, hours });
  }
  return cells;
}

const statusConfig = {
  worked: { dot: 'bg-success', label: 'Completo' },
  partial: { dot: 'bg-warning', label: 'Parcial' },
  off: { dot: 'bg-muted-foreground/30', label: 'Folga' },
  vacation: { dot: 'bg-info', label: 'Férias' },
  today: { dot: 'bg-gold', label: 'Hoje' },
};

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function CalendarTimeline() {
  const [date, setDate] = useState({ year: 2026, month: 7 }); // August 2026
  const [selected, setSelected] = useState<DayInfo | null>(null);
  const cells = getMonthData(date.year, date.month);
  const monthName = new Date(date.year, date.month, 1).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const changeMonth = (delta: number) => {
    setDate((prev) => {
      const m = prev.month + delta;
      if (m < 0) return { year: prev.year - 1, month: 11 };
      if (m > 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: m };
    });
  };

  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10">
            <Calendar className="h-4 w-4 text-info" />
          </div>
          <div>
            <h3 className="text-sm font-semibold capitalize">{monthName}</h3>
            <p className="text-[10px] text-muted-foreground">Calendário inteligente</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => changeMonth(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg glass-hover text-muted-foreground hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg glass-hover text-muted-foreground hover:text-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-medium text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} />;
          const cfg = cell.status ? statusConfig[cell.status] : null;
          const isSelected = selected?.day === cell.day;
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected(cell)}
              className={cn(
                'relative flex flex-col items-center justify-center aspect-square rounded-lg text-xs transition-all',
                cell.status === 'today' && 'glass-gold text-gold font-bold',
                cell.status === 'vacation' && 'bg-info/10 text-info',
                cell.status === 'off' && 'text-muted-foreground/40',
                cell.status === 'worked' && 'glass-hover text-foreground',
                cell.status === 'partial' && 'bg-warning/10 text-warning',
                isSelected && 'ring-1 ring-gold/40'
              )}
            >
              <span>{cell.day}</span>
              {cfg && cell.status !== 'today' && (
                <span className={cn('absolute bottom-1 h-1 w-1 rounded-full', cfg.dot)} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected day detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/[0.04] overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold">Dia {selected.day}</p>
                <p className="text-[10px] text-muted-foreground">
                  {selected.status ? statusConfig[selected.status]?.label : '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold gold-text">{selected.hours || '—'}</p>
                <p className="text-[10px] text-muted-foreground">horas</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/[0.04]">
        {Object.entries(statusConfig).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <span className={cn('h-1.5 w-1.5 rounded-full', v.dot)} />
            <span className="text-[10px] text-muted-foreground">{v.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
