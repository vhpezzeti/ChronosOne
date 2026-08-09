'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
  Wind,
  Loader2,
} from 'lucide-react';

export type WeatherData = {
  temp: number;
  code: number;
  city: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function weatherIcon(code: number) {
  if (code === 0) return { icon: Sun, label: 'Ensolarado' };
  if (code <= 3) return { icon: CloudSun, label: 'Parc. nublado' };
  if (code <= 48) return { icon: Cloud, label: 'Nublado' };
  if (code <= 67) return { icon: CloudRain, label: 'Chuva' };
  if (code <= 77) return { icon: CloudSnow, label: 'Neve' };
  if (code <= 82) return { icon: CloudRain, label: 'Garoa' };
  return { icon: Wind, label: 'Ventoso' };
}

export function useWeather(): {
  weather: WeatherData | null;
  loading: boolean;
} {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = -23.55;
        const lon = -46.63;
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=America/Sao_Paulo`
        );
        const data = await res.json();
        const code = data.current.weather_code;
        const { icon, label } = weatherIcon(code);
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code,
          city: 'São Paulo',
          label,
          icon,
        });
      } catch {
        const { icon, label } = weatherIcon(0);
        setWeather({ temp: 24, code: 0, city: 'São Paulo', label, icon });
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    const t = setInterval(fetchWeather, 600000);
    return () => clearInterval(t);
  }, []);

  return { weather, loading };
}

export function WeatherWidget() {
  const { weather, loading } = useWeather();

  if (loading || !weather) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        <span className="hidden sm:inline">Clima</span>
      </div>
    );
  }

  const Icon = weather.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 rounded-lg glass px-3 py-1.5"
    >
      <Icon className="h-4 w-4 text-gold shrink-0" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-semibold text-foreground">{weather.temp}°C</span>
        <span className="hidden md:inline text-[11px] text-muted-foreground">·</span>
        <span className="hidden md:inline text-[11px] text-muted-foreground">{weather.city}</span>
      </div>
    </motion.div>
  );
}
