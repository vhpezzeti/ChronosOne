'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Plus,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Edit3,
  Building2,
  Home,
  Briefcase,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Geofence = {
  id: number;
  name: string;
  type: 'matriz' | 'filial' | 'cliente' | 'home';
  lat: string;
  lon: string;
  radius: number;
  enabled: boolean;
};

const initialFences: Geofence[] = [
  {
    id: 1,
    name: 'Matriz - São Paulo',
    type: 'matriz',
    lat: '-23.5536',
    lon: '-46.6320',
    radius: 100,
    enabled: true,
  },
  {
    id: 2,
    name: 'Home Office',
    type: 'home',
    lat: '-23.5489',
    lon: '-46.6388',
    radius: 50,
    enabled: true,
  },
];

const typeConfig = {
  matriz: { icon: Building2, color: 'text-gold', bg: 'bg-gold/10' },
  filial: { icon: Building2, color: 'text-info', bg: 'bg-info/10' },
  cliente: { icon: Briefcase, color: 'text-warning', bg: 'bg-warning/10' },
  home: { icon: Home, color: 'text-success', bg: 'bg-success/10' },
};

export function GeofencePanel() {
  const [fences, setFences] = useState<Geofence[]>(initialFences);
  const [showAdd, setShowAdd] = useState(false);
  const [blockOutside, setBlockOutside] = useState(true);
  const [newFence, setNewFence] = useState({ name: '', lat: '', lon: '', radius: 100, type: 'filial' as Geofence['type'] });

  const addFence = () => {
    if (!newFence.name || !newFence.lat || !newFence.lon) return;
    setFences([
      ...fences,
      { ...newFence, id: Date.now(), enabled: true, radius: Number(newFence.radius) },
    ]);
    setNewFence({ name: '', lat: '', lon: '', radius: 100, type: 'filial' });
    setShowAdd(false);
  };

  const toggleFence = (id: number) => {
    setFences(fences.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const removeFence = (id: number) => {
    setFences(fences.filter((f) => f.id !== id));
  };

  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 glow-gold">
            <Shield className="h-4 w-4 text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Cerca Geográfica</h3>
            <p className="text-[10px] text-muted-foreground">
              Perímetros permitidos para registro
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1 rounded-lg glass-gold px-2.5 py-1.5 text-[11px] font-medium text-gold hover:scale-105 transition-transform"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Adicionar</span>
        </button>
      </div>

      {/* Policy toggle */}
      <div className="flex items-center justify-between rounded-lg glass px-3 py-2.5 mb-4">
        <div className="flex items-center gap-2">
          {blockOutside ? (
            <ShieldAlert className="h-4 w-4 text-danger" />
          ) : (
            <ShieldCheck className="h-4 w-4 text-warning" />
          )}
          <div>
            <p className="text-xs font-medium">
              {blockOutside ? 'Bloquear fora do perímetro' : 'Solicitar aprovação'}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {blockOutside
                ? 'Ponto recusado automaticamente'
                : 'Gestor aprova registros externos'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setBlockOutside(!blockOutside)}
          className={cn(
            'relative h-6 w-11 rounded-full transition-colors',
            blockOutside ? 'bg-danger/40' : 'bg-warning/40'
          )}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'absolute top-0.5 h-5 w-5 rounded-full',
              blockOutside ? 'left-0.5 bg-danger' : 'left-[22px] bg-warning'
            )}
          />
        </button>
      </div>

      {/* Fences list */}
      <div className="space-y-2">
        {fences.map((f) => {
          const cfg = typeConfig[f.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                f.enabled ? 'glass glass-hover' : 'glass opacity-50'
              )}
            >
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', cfg.bg)}>
                <Icon className={cn('h-4 w-4', cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{f.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono truncate">
                  {f.lat}, {f.lon} · raio {f.radius}m
                </p>
              </div>
              <button
                onClick={() => toggleFence(f.id)}
                className={cn(
                  'relative h-5 w-9 rounded-full transition-colors shrink-0',
                  f.enabled ? 'bg-success/40' : 'bg-white/10'
                )}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={cn(
                    'absolute top-0.5 h-4 w-4 rounded-full',
                    f.enabled ? 'left-[18px] bg-success' : 'left-0.5 bg-muted-foreground'
                  )}
                />
              </button>
              <button
                onClick={() => removeFence(f.id)}
                className="text-muted-foreground hover:text-danger transition-colors shrink-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl glass border border-gold/20 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold gold-text">Nova Cerca Geográfica</h3>
                <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Nome do local</label>
                  <input
                    value={newFence.name}
                    onChange={(e) => setNewFence({ ...newFence, name: e.target.value })}
                    placeholder="Ex: Filial Rio de Janeiro"
                    className="mt-1 w-full rounded-lg glass px-3 py-2 text-xs focus:outline-none focus:border-gold/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground">Latitude</label>
                    <input
                      value={newFence.lat}
                      onChange={(e) => setNewFence({ ...newFence, lat: e.target.value })}
                      placeholder="-23.5536"
                      className="mt-1 w-full rounded-lg glass px-3 py-2 text-xs font-mono focus:outline-none focus:border-gold/30"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground">Longitude</label>
                    <input
                      value={newFence.lon}
                      onChange={(e) => setNewFence({ ...newFence, lon: e.target.value })}
                      placeholder="-46.6320"
                      className="mt-1 w-full rounded-lg glass px-3 py-2 text-xs font-mono focus:outline-none focus:border-gold/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Raio (metros): {newFence.radius}m</label>
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={50}
                    value={newFence.radius}
                    onChange={(e) => setNewFence({ ...newFence, radius: Number(e.target.value) })}
                    className="mt-2 w-full accent-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Tipo</label>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {(['matriz', 'filial', 'cliente', 'home'] as const).map((t) => {
                      const cfg = typeConfig[t];
                      const Icon = cfg.icon;
                      return (
                        <button
                          key={t}
                          onClick={() => setNewFence({ ...newFence, type: t })}
                          className={cn(
                            'flex flex-col items-center gap-1 rounded-lg py-2 text-[10px] transition-all',
                            newFence.type === t ? cn('glass-gold', cfg.color) : 'glass text-muted-foreground'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={addFence}
                  className="w-full rounded-lg glass-gold py-2.5 text-xs font-semibold text-gold hover:scale-[1.02] transition-transform"
                >
                  Criar Cerca
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
