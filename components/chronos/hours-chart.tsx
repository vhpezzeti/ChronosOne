'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const weeklyData = [
  { day: 'Seg', hours: 8.2, overtime: 0.2 },
  { day: 'Ter', hours: 7.8, overtime: 0 },
  { day: 'Qua', hours: 8.5, overtime: 0.5 },
  { day: 'Qui', hours: 9.1, overtime: 1.1 },
  { day: 'Sex', hours: 7.7, overtime: 0 },
  { day: 'Sáb', hours: 4.0, overtime: 4.0 },
  { day: 'Dom', hours: 0, overtime: 0 },
];

const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  hours: 6 + Math.random() * 4,
  overtime: Math.random() > 0.7 ? Math.random() * 2 : 0,
}));

export function HoursChart() {
  const [view, setView] = useState<'week' | 'month'>('week');
  const data = view === 'week' ? weeklyData : monthlyData;
  const maxHours = 10;

  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
            <BarChart3 className="h-4 w-4 text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Horas Trabalhadas</h3>
            <p className="text-[10px] text-muted-foreground">
              {view === 'week' ? 'Última semana' : 'Últimos 30 dias'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-lg glass p-1">
          {(['week', 'month'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-all',
                view === v
                  ? 'glass-gold text-gold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {v === 'week' ? 'Semanal' : 'Mensal'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-1.5 h-44 px-1">
        {data.map((d, i) => {
          const hHeight = (d.hours / maxHours) * 100;
          const oHeight = (d.overtime / maxHours) * 100;
          return (
            <div key={i} className="group relative flex flex-1 flex-col items-center gap-1">
              <div className="relative flex w-full flex-col justify-end h-full">
                {/* Overtime bar */}
                {d.overtime > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${oHeight}%` }}
                    transition={{ delay: i * 0.03, duration: 0.5 }}
                    className="w-full rounded-t-md bg-warning/40 group-hover:bg-warning/60 transition-colors"
                    style={{ minHeight: d.overtime > 0 ? '4px' : 0 }}
                  />
                )}
                {/* Regular hours bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${hHeight}%` }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className={cn(
                    'w-full rounded-t-md transition-colors',
                    d.hours === 0
                      ? 'bg-white/5'
                      : 'bg-gradient-to-t from-gold/30 to-gold/70 group-hover:from-gold/50 group-hover:to-gold'
                  )}
                  style={{
                    borderRadius: d.overtime > 0 ? '0' : '6px 6px 0 0',
                    minHeight: d.hours > 0 ? '4px' : 0,
                  }}
                />
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap rounded-md glass px-2 py-1 text-[10px] z-10">
                  {d.hours.toFixed(1)}h
                  {d.overtime > 0 && ` (+${d.overtime.toFixed(1)}h)`}
                </div>
              </div>
              {view === 'week' && (
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.04]">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-gold/70" />
          <span className="text-[10px] text-muted-foreground">Horas regulares</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-warning/50" />
          <span className="text-[10px] text-muted-foreground">Horas extras</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-success">
          <TrendingUp className="h-3 w-3" />
          <span>Total: {data.reduce((a, b) => a + b.hours, 0).toFixed(1)}h</span>
        </div>
      </div>
    </div>
  );
}
