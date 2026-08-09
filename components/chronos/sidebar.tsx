'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Fingerprint,
  History,
  Clock,
  CalendarDays,
  Users,
  FileBarChart,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronsLeft,
  Zap,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
  badge?: string;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ponto', label: 'Bater Ponto', icon: Fingerprint, badge: 'AO VIVO' },
  { id: 'historico', label: 'Histórico', icon: History },
  { id: 'banco', label: 'Banco de Horas', icon: Clock },
  { id: 'ferias', label: 'Férias', icon: CalendarDays },
  { id: 'equipe', label: 'Equipe', icon: Users },
  { id: 'relatorios', label: 'Relatórios', icon: FileBarChart },
  { id: 'config', label: 'Configurações', icon: Settings },
  { id: 'auditoria', label: 'Logs de Auditoria', icon: ShieldCheck, adminOnly: true },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onSelect: (id: string) => void;
  isAdmin: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({
  collapsed,
  onToggle,
  activeItem,
  onSelect,
  isAdmin,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const visibleItems = navItems.filter((i) => !i.adminOnly || isAdmin);

  const handleSelect = (id: string) => {
    onSelect(id);
    onMobileClose();
  };

  const navContent = (
    <>
      {/* Logo */}
      <div className="flex h-20 items-center px-5 border-b border-white/[0.04]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl glass-gold glow-gold">
            <Zap className="h-5 w-5 text-gold" fill="currentColor" />
            <div className="absolute inset-0 rounded-xl bg-gold/5 animate-pulse-gold" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col leading-none"
              >
                <span className="text-[15px] font-bold tracking-wider gold-text">
                  CHRONOS
                </span>
                <span className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
                  ONE
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Close button (mobile only) */}
        <button
          onClick={onMobileClose}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <div className="space-y-1">
          {visibleItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isHovered = hovered === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'glass-gold text-gold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-gold"
                  />
                )}
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0 transition-transform',
                    isHovered && 'scale-110'
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 text-left whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.badge && (
                  <span className="rounded-full bg-danger/15 px-1.5 py-0.5 text-[9px] font-bold text-danger animate-pulse-red">
                    {item.badge}
                  </span>
                )}
                {collapsed && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute left-full ml-2 z-50 whitespace-nowrap rounded-md glass px-3 py-1.5 text-xs text-foreground"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.04] p-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="relative h-9 w-9 shrink-0 rounded-full glass-gold overflow-hidden">
            <img
              src="https://images.pexels.com/photos/26150471/pexels-photo-26150471.jpeg?auto=compress&cs=tinysrgb&h=120&w=120"
              alt="Profile"
              className="h-full w-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col overflow-hidden"
              >
                <span className="text-xs font-semibold truncate">Rafael Costa</span>
                <span className="text-[10px] text-gold/70 truncate">Administrador</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg glass-hover px-3 py-2 text-xs text-muted-foreground hover:text-gold"
        >
          <ChevronsLeft
            className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')}
          />
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 264 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-30 hidden lg:flex h-screen flex-col glass border-r border-white/[0.06] shrink-0"
      >
        {navContent}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col glass border-r border-white/[0.06] lg:hidden"
            >
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
