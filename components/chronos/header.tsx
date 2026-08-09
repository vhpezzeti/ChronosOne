'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  Menu,
  MapPin,
  Globe,
  ShieldCheck,
  Loader2,
  Sun,
} from 'lucide-react';
import { useWeather } from './weather-widget';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userName: string;
  userRole: string;
  onMenuClick: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Solicitação de correção pendente',
    desc: 'Ana Martins solicitou correção de ponto',
    time: 'há 5 min',
  },
  {
    id: 2,
    type: 'success',
    title: 'Férias aprovadas',
    desc: 'Suas férias (12-26/Out) foram aprovadas',
    time: 'há 1 h',
  },
  {
    id: 3,
    type: 'info',
    title: 'Banco de horas negativo',
    desc: 'Você está com -2:30 no banco de horas',
    time: 'há 3 h',
  },
  {
    id: 4,
    type: 'warning',
    title: 'Férias vencendo',
    desc: 'Carlos Eduardo tem férias vencendo em 15 dias',
    time: 'há 5 h',
  },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function Header({ userName, userRole, onMenuClick }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [greeting, setGreeting] = useState(getGreeting());
  const { weather, loading: weatherLoading } = useWeather();

  useEffect(() => {
    const t = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(t);
  }, []);

  const notifIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-info" />;
    }
  };

  const WeatherIcon = weather?.icon ?? Sun;

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] glass px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-start gap-3">
        {/* Hamburger - mobile only */}
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg glass-hover glass text-muted-foreground hover:text-gold lg:hidden mt-1"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Consolidated two-column block */}
        <div className="flex flex-1 min-w-0 flex-col lg:flex-row gap-3 lg:gap-0">
          {/* LEFT: Greeting + Date + Weather + Photo (70%) */}
          <div className="flex items-center gap-3 lg:gap-4 lg:pr-6 lg:flex-[7] min-w-0">
            {/* Photo */}
            <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-full overflow-hidden glass-gold">
              <img
                src="https://images.pexels.com/photos/26150471/pexels-photo-26150471.jpeg?auto=compress&cs=tinysrgb&h=120&w=120"
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" />
            </div>

            {/* Text block */}
            <div className="flex flex-col min-w-0 gap-0.5">
              <motion.h1
                key={greeting}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg md:text-2xl font-bold leading-tight truncate"
              >
                {greeting}, <span className="gold-text">{userName}</span>
              </motion.h1>
              <p className="text-[11px] md:text-sm text-muted-foreground capitalize truncate">
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {weatherLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-gold/60" />
                ) : (
                  <>
                    <WeatherIcon className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span className="text-[11px] md:text-xs text-foreground/80">
                      {weather?.temp}°C
                    </span>
                    <span className="text-[11px] md:text-xs text-muted-foreground">·</span>
                    <span className="text-[11px] md:text-xs text-muted-foreground truncate">
                      {weather?.city}
                    </span>
                    <span className="text-[11px] md:text-xs text-muted-foreground">·</span>
                    <span className="text-[11px] md:text-xs text-muted-foreground truncate">
                      {weather?.label}
                    </span>
                  </>
                )}
                <span className="hidden sm:inline text-[11px] md:text-xs text-muted-foreground">·</span>
                <span className="hidden sm:inline text-[11px] md:text-xs text-gold/70 font-medium">
                  {userRole}
                </span>
              </div>
            </div>
          </div>

          {/* Separator - desktop only */}
          <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* RIGHT: Location + GPS + Anti-Fraud (30%) */}
          <div className="flex flex-col gap-1.5 lg:flex-[3] lg:pl-6 justify-center">
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="text-muted-foreground">Localização:</span>
              <span className="font-medium text-foreground truncate">São Paulo, SP</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Globe className="h-3.5 w-3.5 text-info shrink-0" />
              <span className="text-muted-foreground">Precisão:</span>
              <span className="font-medium text-foreground">4m</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">GPS válido</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" />
              <span className="text-muted-foreground">Anti-Fraude:</span>
              <span className="font-medium text-success">OK</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
            </div>
          </div>
        </div>

        {/* Right actions: search, notifications */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 mt-1">
          {/* Search - desktop only */}
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-10 w-48 rounded-lg glass border-white/[0.06] pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg glass-hover glass text-muted-foreground hover:text-gold"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white animate-pulse-red">
                4
              </span>
            </button>

            <AnimatePresence>
              {showNotif && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowNotif(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 z-40 w-72 md:w-80 rounded-xl glass border border-white/[0.08] shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                      <span className="text-sm font-semibold">Notificações</span>
                      <button
                        onClick={() => setShowNotif(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto scrollbar-thin">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="flex gap-3 border-b border-white/[0.04] px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
                        >
                          <div className="mt-0.5">{notifIcon(n.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground">
                              {n.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {n.desc}
                            </p>
                            <p className="text-[10px] text-gold/60 mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/[0.06] p-2">
                      <button className="w-full rounded-lg py-2 text-xs font-medium text-gold hover:bg-gold/10 transition-colors">
                        Ver todas
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
