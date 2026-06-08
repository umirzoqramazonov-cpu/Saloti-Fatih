import React from 'react';
import { Palette, Check, Sparkles, Flame, Eye, Landmark, Compass, Binary } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  desc: string;
  primaryClass: string;
  bgHex: string;
  borderColor: string;
  icon: React.ComponentType<any>;
}

export const THEMES: ThemeOption[] = [
  { 
    id: 'cosmic', 
    name: "Kosmik Oltin", 
    desc: "Kvant tilla nurlanishi, yadroviy g'aybiy muhandislik asosi", 
    primaryClass: "bg-[#dba112]", 
    bgHex: "#07070a",
    borderColor: "border-[#dba112]/20",
    icon: Sparkles
  },
  { 
    id: 'emerald', 
    name: "Zumrad Bo'ston", 
    desc: "Tariqat so'fiyona san'ati, ruhiy yashillik va orom bag'sh etuvchi", 
    primaryClass: "bg-[#10b981]", 
    bgHex: "#030d08",
    borderColor: "border-[#10b981]/20",
    icon: Compass
  },
  { 
    id: 'royal', 
    name: "Shohona Safaviy", 
    desc: "Lapis Lazuli ko'k va yorqin oltin naqshli tariqat me'morchiligi", 
    primaryClass: "bg-[#fbbf24]", 
    bgHex: "#020719",
    borderColor: "border-[#fbbf24]/20",
    icon: Landmark
  },
  { 
    id: 'cyber', 
    name: "Kiber Tasbeh", 
    desc: "Futuristik o'ta aniq texno-minimalizm va neon matritsa", 
    primaryClass: "bg-[#06b6d4]", 
    bgHex: "#030712",
    borderColor: "border-[#06b6d4]/20",
    icon: Binary
  },
  { 
    id: 'sunset', 
    name: "Yoqut Shafaq", 
    desc: "Ilohiy ishq kechki tasavvufi, yoqut-shafaq va mis rang zikr olovi", 
    primaryClass: "bg-[#f43f5e]", 
    bgHex: "#0b0105",
    borderColor: "border-[#f43f5e]/20",
    icon: Flame
  }
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="cosmic-card p-6 mt-4 relative overflow-hidden page-fade-in" id="theme-selector-card">
      {/* Decorative background flare */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Aura va Dizayn Tanlash Shabloni
            </h3>
            <p className="font-sans text-xs text-zinc-400">
              Saytning geometrik va energetik nurlanish dizaynini o'zgartiring (jami 5 xil ijodiy aura mavjud)
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded">
            Joriy aura: {THEMES.find(t => t.id === currentTheme)?.name || currentTheme}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" id="theme-options-grid">
        {THEMES.map((t) => {
          const Icon = t.icon;
          const isSelected = currentTheme === t.id;
          return (
            <button
              key={t.id}
              id={`theme-btn-${t.id}`}
              onClick={() => onThemeChange(t.id)}
              className={`relative text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-36 cursor-pointer group hover:scale-[1.02] ${
                isSelected 
                  ? 'bg-gold-500/5 border-gold-500/50 shadow-[0_4px_20px_rgba(var(--theme-primary-rgb),0.1)]' 
                  : 'bg-zinc-900/30 border-white/5 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className={`p-1.5 rounded bg-zinc-950/80 border ${isSelected ? 'border-gold-500/30 text-gold-400' : 'border-white/5 text-zinc-400 group-hover:text-white'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  {/* Small preview swatch */}
                  <div className="flex items-center gap-1 bg-zinc-950/60 px-1.5 py-1 rounded border border-white/5">
                    <span className={`w-2.5 h-2.5 rounded-full ${t.primaryClass} inline-block`} />
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: t.bgHex }} />
                  </div>
                </div>

                <h4 className="font-display text-xs font-bold text-white mt-3 flex items-center gap-1.5">
                  {t.name}
                  {isSelected && <span className="text-[9px] text-gold-400 font-normal font-mono">(Faol)</span>}
                </h4>
                
                <p className="font-sans text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              {/* Selected indicator check */}
              <div className="flex justify-end pt-2">
                <span className={`h-4 w-4 rounded-full flex items-center justify-center border text-[9px] ${
                  isSelected 
                    ? 'bg-gold-500 text-zinc-950 border-gold-500 font-bold' 
                    : 'border-zinc-800 text-transparent'
                }`}>
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
