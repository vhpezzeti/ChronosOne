'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Stat = {
  id: string;
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  color: 'gold' | 'success' | 'warning' | 'danger' | 'info';
};

const stats: Stat[] = [
  {
    id: 'today',
    label: 'Horas Hoje',
    value: '7:42',
    sub: 'de 8:00 esperadas',
    icon: Clock,
    trend: 'down',
    trendValue: '-18min',
    color: 'gold',
  },
  {
    id: 'bank',
    label: 'Banco de Horas',
    value: '+12:30',
    sub: 'saldo positivo',
    icon: TrendingUp,
    trend: 'up',
    trendValue: '+2:15',
    color: 'success',
  },
  {
    id: 'vacation',
    label: 'Férias',
    value: '18 dias',
    sub: 'vencimento em 2026',
    icon: CalendarDays,
    trend: 'neutral',
    trendValue: 'Disponível',
    color: 'info',
  },
  {
    id: 'overtime',
    label: 'Horas Extras',
    value: '4:50',
    sub: '50% este mês',
    icon: ArrowUpRight,
    trend: 'up',
    trendValue: '+1:20',
    color: 'warning',
  },
  {
    id: 'negative',
    label: 'Horas Negativas',
    value: '-2:30',
    sub: 'última semana',
    icon: ArrowDownRight,
    trend: 'down',
    trendValue: '-0:45',
    color: 'danger',
  },
];

const colorMap = {
  gold: { text: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20', glow: 'glow-gold' },
  success: { text: 'text-success', bg: 'bg-success/10', border: 'border-success/20', glow: '' },
  warning: { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', glow: '' },
  danger: { text: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', glow: 'glow-red' },
  info: { text: 'text-info', bg: 'bg-info/10', border: 'border-info/20', glow: '' },
};

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, idx) => {
        const c = colorMap[stat.color];
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className={cn(
              'group relative overflow-hidden rounded-xl glass glass-hover p-4',
              c.glow
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', c.bg)}>
                <Icon className={cn('h-4 w-4', c.text)} />
              </div>
              <span
                className={cn(
                  'flex items-center gap-0.5 text-[10px] font-medium',
                  stat.trend === 'up' && 'text-success',
                  stat.trend === 'down' && 'text-danger',
                  stat.trend === 'neutral' && 'text-muted-foreground'
                )}
              >
                {stat.trendValue}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs font-medium text-foreground/80">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
            </div>
            <div className={cn('absolute -bottom-8 -right-8 h-20 w-20 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity', c.bg)} />
          </motion.div>
        );
      })}
    </div>
  );
}
