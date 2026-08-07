'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Punch = {
  id: number;
  type: string;
  time: string;
  date: string;
  location: string;
  insideGeofence: boolean;
  coords: { x: number; y: number };
};

const punches: Punch[] = [
  {
    id: 1,
    type: 'Entrada',
    time: '08:30',
    date: 'Hoje',
    location: 'Matriz - São Paulo',
    insideGeofence: true,
    coords: { x: 50, y: 50 },
  },
  {
    id: 2,
    type: 'Saída almoço',
    time: '12:15',
    date: 'Hoje',
    location: 'Matriz - São Paulo',
    insideGeofence: true,
    coords: { x: 48, y: 52 },
  },
  {
    id: 3,
    type: 'Retorno almoço',
    time: '13:05',
    date: 'Hoje',
    location: 'Matriz - São Paulo',
    insideGeofence: true,
    coords: { x: 51, y: 49 },
  },
  {
    id: 4,
    type: 'Saída',
    time: '18:02',
    date: 'Ontem',
    location: 'Matriz - São Paulo',
    insideGeofence: true,
    coords: { x: 49, y: 51 },
  },
  {
    id: 5,
    type: 'Home Office',
    time: '09:00',
    date: '02/08',
    location: 'Home Office',
    insideGeofence: true,
    coords: { x: 72, y: 28 },
  },
];

export function MyPunchMap() {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
            <Navigation className="h-4 w-4 text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Meus Registros</h3>
            <p className="text-[10px] text-muted-foreground">
              Localização de cada ponto batido
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
          <ShieldCheck className="h-3 w-3" />
          Dentro da cerca
        </span>
      </div>

      {/* Map */}
      <div className="relative h-48 rounded-xl glass overflow-hidden mb-4">
        {/* Grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`h${i}`}
              className="absolute left-0 right-0 border-t border-white/10"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`v${i}`}
              className="absolute top-0 bottom-0 border-l border-white/10"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        {/* Geofence: Matriz */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 rounded-full border border-gold/30 bg-gold/[0.06]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full border border-gold/20 bg-gold/[0.04]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+60px)] text-[9px] text-gold/60 whitespace-nowrap">
          Matriz · 100m
        </span>

        {/* Geofence: Home Office */}
        <div className="absolute left-[72%] top-[28%] -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-info/30 bg-info/[0.06]" />
        <span className="absolute left-[72%] top-[28%] -translate-x-1/2 -translate-y-[calc(50%+32px)] text-[9px] text-info/60 whitespace-nowrap">
          Home Office
        </span>

        {/* Pins */}
        {punches.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, type: 'spring' }}
            className="group absolute"
            style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border-2 border-background',
                  p.insideGeofence ? 'bg-gold/80' : 'bg-danger/80'
                )}
              >
                <MapPin className="h-3 w-3 text-background" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -top-7 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded-md glass px-2 py-0.5 text-[10px] z-10">
                {p.type} · {p.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2 max-h-36 overflow-y-auto scrollbar-thin">
        {punches.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-lg glass-hover px-3 py-2"
          >
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                p.insideGeofence ? 'bg-success/10' : 'bg-danger/10'
              )}
            >
              {p.insideGeofence ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-danger" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{p.type}</p>
              <p className="text-[10px] text-muted-foreground truncate">
                {p.location}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-mono font-medium">{p.time}</p>
              <p className="text-[10px] text-muted-foreground">{p.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
