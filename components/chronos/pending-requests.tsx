'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Check,
  X,
  AlertCircle,
  CalendarPlus,
  Edit3,
  FileSignature,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Request = {
  id: number;
  type: 'correction' | 'vacation' | 'overtime';
  user: string;
  avatar: string;
  detail: string;
  oldTime?: string;
  newTime?: string;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
};

const requests: Request[] = [
  {
    id: 1,
    type: 'correction',
    user: 'Ana Martins',
    avatar: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
    detail: 'Correção de ponto - 03/08',
    oldTime: '08:45',
    newTime: '08:30',
    reason: 'Esquecimento de registro no relógio',
    date: 'há 5 min',
    status: 'pending',
  },
  {
    id: 2,
    type: 'vacation',
    user: 'Carlos Eduardo',
    avatar: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
    detail: 'Férias: 15-30 Outubro (15 dias)',
    reason: 'Período programado com antecedência',
    date: 'há 1 h',
    status: 'pending',
  },
  {
    id: 3,
    type: 'overtime',
    user: 'Juliana Reis',
    avatar: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&h=80&w=80',
    detail: 'Hora extra - Plantão 04/08',
    oldTime: '18:00',
    newTime: '22:00',
    reason: 'Suporte a incidente de produção',
    date: 'há 2 h',
    status: 'pending',
  },
];

const typeConfig = {
  correction: { icon: Edit3, color: 'text-warning', bg: 'bg-warning/10', label: 'Correção' },
  vacation: { icon: CalendarPlus, color: 'text-info', bg: 'bg-info/10', label: 'Férias' },
  overtime: { icon: Clock, color: 'text-gold', bg: 'bg-gold/10', label: 'Hora Extra' },
};

export function PendingRequests() {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
            <AlertCircle className="h-4 w-4 text-warning" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Solicitações Pendentes</h3>
            <p className="text-[10px] text-muted-foreground">
              {requests.length} aguardando aprovação
            </p>
          </div>
        </div>
        <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning animate-pulse-gold">
          {requests.length}
        </span>
      </div>

      <div className="space-y-3">
        {requests.map((req, i) => {
          const cfg = typeConfig[req.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl glass glass-hover p-3"
            >
              <div className="flex items-start gap-3">
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', cfg.bg)}>
                  <Icon className={cn('h-4 w-4', cfg.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold truncate">{req.detail}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{req.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={req.avatar} alt="" className="h-4 w-4 rounded-full" />
                    <span className="text-[10px] text-muted-foreground">{req.user}</span>
                    <span className={cn('text-[9px] font-medium rounded px-1.5 py-0.5', cfg.bg, cfg.color)}>
                      {cfg.label}
                    </span>
                  </div>
                  {req.oldTime && req.newTime && (
                    <div className="flex items-center gap-2 mt-2 text-[10px]">
                      <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground line-through">
                        {req.oldTime}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="rounded glass-gold px-1.5 py-0.5 text-gold font-medium">
                        {req.newTime}
                      </span>
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-1.5 italic">
                    "{req.reason}"
                  </p>
                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1 rounded-lg bg-success/15 px-3 py-1 text-[10px] font-medium text-success hover:bg-success/25 transition-colors">
                        <Check className="h-3 w-3" />
                        Aprovar
                      </button>
                      <button className="flex items-center gap-1 rounded-lg bg-danger/15 px-3 py-1 text-[10px] font-medium text-danger hover:bg-danger/25 transition-colors">
                        <X className="h-3 w-3" />
                        Rejeitar
                      </button>
                      <button className="ml-auto text-[10px] text-muted-foreground hover:text-gold transition-colors">
                        Ver trilha
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Compliance note */}
      <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-[10px] text-muted-foreground">
        <FileSignature className="h-3 w-3 text-gold" />
        <span>Toda aprovação gera trilha de auditoria imutável (IP, dispositivo, timestamp)</span>
      </div>
    </div>
  );
}
