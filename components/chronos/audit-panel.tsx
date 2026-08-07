'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  LogIn,
  LogOut,
  Edit3,
  FileText,
  Download,
  AlertTriangle,
  Fingerprint,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type LogEntry = {
  id: number;
  action: string;
  user: string;
  ip: string;
  device: string;
  time: string;
  type: 'login' | 'logout' | 'edit' | 'report' | 'export' | 'fraud' | 'punch';
};

const logs: LogEntry[] = [
  {
    id: 1,
    action: 'Registro de ponto - Entrada',
    user: 'Ana Martins',
    ip: '189.45.12.8',
    device: 'iPhone 15 · Safari',
    time: 'há 2 min',
    type: 'punch',
  },
  {
    id: 2,
    action: 'Login bem-sucedido',
    user: 'Rafael Costa',
    ip: '189.45.12.1',
    device: 'MacBook Pro · Chrome',
    time: 'há 15 min',
    type: 'login',
  },
  {
    id: 3,
    action: 'Tentativa de fraude detectada - GPS falso',
    user: 'Pedro Alves',
    ip: '201.33.9.2',
    device: 'Android · Chrome',
    time: 'há 32 min',
    type: 'fraud',
  },
  {
    id: 4,
    action: 'Aprovou correção de ponto',
    user: 'Juliana Reis',
    ip: '189.45.12.45',
    device: 'Windows 11 · Edge',
    time: 'há 1 h',
    type: 'edit',
  },
  {
    id: 5,
    action: 'Exportou relatório mensal (PDF)',
    user: 'Rafael Costa',
    ip: '189.45.12.1',
    device: 'MacBook Pro · Chrome',
    time: 'há 2 h',
    type: 'export',
  },
  {
    id: 6,
    action: 'Logout',
    user: 'Carlos Eduardo',
    ip: '189.45.12.22',
    device: 'iPhone 14 · Safari',
    time: 'há 3 h',
    type: 'logout',
  },
];

const typeConfig = {
  login: { icon: LogIn, color: 'text-success', bg: 'bg-success/10' },
  logout: { icon: LogOut, color: 'text-muted-foreground', bg: 'bg-white/5' },
  edit: { icon: Edit3, color: 'text-warning', bg: 'bg-warning/10' },
  report: { icon: FileText, color: 'text-info', bg: 'bg-info/10' },
  export: { icon: Download, color: 'text-info', bg: 'bg-info/10' },
  fraud: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
  punch: { icon: Fingerprint, color: 'text-gold', bg: 'bg-gold/10' },
};

export function AuditPanel() {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 glow-gold">
            <ShieldCheck className="h-4 w-4 text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              Trilha de Auditoria
              <span className="rounded-full bg-danger/15 px-1.5 py-0.5 text-[9px] font-bold text-danger">
                ADMIN
              </span>
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Registro imutável · LGPD compliant
            </p>
          </div>
        </div>
        <button className="text-[10px] text-gold hover:text-gold-light transition-colors">
          Ver todos
        </button>
      </div>

      <div className="space-y-1.5 max-h-72 overflow-y-auto scrollbar-thin">
        {logs.map((log, i) => {
          const cfg = typeConfig[log.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.02] transition-colors',
                log.type === 'fraud' && 'glass border border-danger/20'
              )}
            >
              <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', cfg.bg)}>
                <Icon className={cn('h-3.5 w-3.5', cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {log.action}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                  <span className="font-medium text-foreground/70">{log.user}</span>
                  <span>·</span>
                  <span className="font-mono">{log.ip}</span>
                  <span>·</span>
                  <span className="truncate">{log.device}</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{log.time}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
