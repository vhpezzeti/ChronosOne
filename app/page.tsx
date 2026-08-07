'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/chronos/sidebar';
import { Header } from '@/components/chronos/header';
import { ClockCard } from '@/components/chronos/clock-card';
import { StatsCards } from '@/components/chronos/stats-cards';
import { HoursChart } from '@/components/chronos/hours-chart';
import { MyPunchMap } from '@/components/chronos/my-punch-map';
import { AuditPanel } from '@/components/chronos/audit-panel';
import { CalendarTimeline } from '@/components/chronos/calendar-timeline';
import { PendingRequests } from '@/components/chronos/pending-requests';
import { GeofencePanel } from '@/components/chronos/geofence-panel';
import { BrandingFooter } from '@/components/chronos/branding-footer';
import { ShieldCheck, Activity, Server, Bell, Database } from 'lucide-react';

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-danger/[0.02] blur-[120px]" />
      </div>

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activeItem={activeItem}
        onSelect={setActiveItem}
        isAdmin={true}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="relative z-10 flex-1 flex flex-col overflow-hidden min-w-0">
        <Header userName="Rafael Costa" userRole="Administrador" onMenuClick={() => setMobileOpen(true)} />

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 space-y-4 md:space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              {activeItem === 'dashboard' && <DashboardView />}
              {activeItem !== 'dashboard' && <PlaceholderView item={activeItem} />}
            </motion.div>
          </AnimatePresence>

          <BrandingFooter />
        </div>
      </main>
    </div>
  );
}

function DashboardView() {
  return (
    <>
      {/* Clock + Punch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ClockCard />
      </motion.div>

      {/* Stats */}
      <StatsCards />

      {/* System health bar */}
      <SystemHealthBar />

      {/* Charts + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <HoursChart />
        </div>
        <CalendarTimeline />
      </div>

      {/* Map + Pending + Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <MyPunchMap />
        <PendingRequests />
        <AuditPanel />
      </div>

      {/* Geofence config */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <GeofencePanel />
        <div className="rounded-2xl glass p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <h3 className="text-sm font-semibold">Segurança & LGPD</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Criptografia AES-256', status: 'Ativo' },
              { label: 'JWT + Bcrypt 12 rounds', status: 'Ativo' },
              { label: 'Rate Limit (5/min)', status: 'Ativo' },
              { label: 'Proteção CSRF/XSS', status: 'Ativo' },
              { label: 'Logs imutáveis', status: 'Ativo' },
              { label: 'Consentimento LGPD', status: 'Assinado' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg glass px-3 py-2"
              >
                <span className="text-[11px] text-muted-foreground truncate">
                  {item.label}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-success shrink-0 ml-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SystemHealthBar() {
  const services = [
    { name: 'Supabase', icon: Database, status: 'Operacional' },
    { name: 'Sincronização', icon: Activity, status: 'Em dia' },
    { name: 'Notificações', icon: Bell, status: 'Ativo' },
    { name: 'Fila de Logs', icon: Server, status: '0 pendentes' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap items-center gap-3 rounded-xl glass px-4 py-3"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-gold" />
        <span className="text-xs font-semibold">Saúde do Sistema</span>
      </div>
      <div className="hidden md:block h-4 w-px bg-white/10" />
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {services.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">{s.name}</span>
            <span className="flex items-center gap-1 text-[11px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PlaceholderView({ item }: { item: string }) {
  const labels: Record<string, string> = {
    ponto: 'Bater Ponto',
    historico: 'Histórico de Registros',
    banco: 'Banco de Horas',
    ferias: 'Gestão de Férias',
    equipe: 'Equipe',
    relatorios: 'Relatórios',
    config: 'Configurações',
    auditoria: 'Logs de Auditoria',
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-gold glow-gold">
        <ShieldCheck className="h-8 w-8 text-gold" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold gold-text">{labels[item] || item}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Módulo em construção · CHRONOS ONE
        </p>
      </div>
    </div>
  );
}
