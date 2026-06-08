import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookReader from './components/BookReader';
import ZikrPanel from './components/ZikrPanel';
import QuantumSandbox from './components/QuantumSandbox';
import SavedVirds from './components/SavedVirds';
import ThemeSelector from './components/ThemeSelector';
import { ZikrHistory } from './types';
import { BOOK_METADATA } from './data';
import { Sparkles, Award, Shield, Cpu, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('reader');
  const [selectedGoalTarget, setSelectedGoalTarget] = useState<number | undefined>(undefined);
  const [zikrHistory, setZikrHistory] = useState<ZikrHistory[]>([]);
  const [userEmail, setUserEmail] = useState<string>('umirzoqramazonov@gmail.com');
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('saloti_fatih_theme') || 'cosmic';
  });

  // Track and apply theme changes
  useEffect(() => {
    localStorage.setItem('saloti_fatih_theme', theme);
    const root = document.documentElement;
    // Remove other theme- class forms first to avoid clashes
    root.className = root.className.replace(/\btheme-\w+/g, '').trim();
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('saloti_fatih_history');
    if (saved) {
      try {
        setZikrHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage on change
  const saveHistory = (newHistory: ZikrHistory[]) => {
    setZikrHistory(newHistory);
    localStorage.setItem('saloti_fatih_history', JSON.stringify(newHistory));
  };

  const handleStartZikrGoal = (targetCount: number) => {
    setSelectedGoalTarget(targetCount);
    setActiveTab('counter');
    // Scroll viewport cleanly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZikrLog = (count: number, goalId: string) => {
    const newLog: ZikrHistory = {
      date: new Date().toLocaleDateString('uz-UZ') + ' ' + new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      count,
      goalId
    };
    const updated = [newLog, ...zikrHistory];
    saveHistory(updated);
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  // Summarize overall telemetry stats
  const totalCompletionSum = zikrHistory.reduce((s, x) => s + x.count, 0);

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] transition-colors duration-500 text-zinc-100 flex flex-col justify-between selection:bg-gold-500/20 selection:text-gold-400">
      
      {/* Absolute floating cosmic particle highlights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-2/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sleek Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          // reset target selection helper when manually switching tabs
          if (tab !== 'counter') setSelectedGoalTarget(undefined);
        }} />

        {/* Global Informative Top Banner in Hero frame */}
        <section className="border-b border-white/5 bg-zinc-950/30 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-1.5 max-w-2xl">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Kvant Fizikasi va Asror Matritsasi
                </span>
                
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {BOOK_METADATA.title} <span className="text-gold-500 font-normal">Sirlari</span>
                </h1>
                
                <p className="font-sans text-xs sm:text-sm text-zinc-400">
                  Shayx Ahmad Tijoniy (q.s.) qoldirgan yadroviy kodlar, Uvaysiy ijoza va real hayotiy tajribalar mukammal ensiklopedik asari.
                </p>
              </div>

              {/* Real-time statistics counters widget */}
              <div className="flex items-center gap-4">
                <div className="px-4 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl font-mono text-center min-w-32">
                  <span className="text-[9px] text-zinc-500 uppercase block tracking-wider">Mening Resonansim</span>
                  <span className="text-lg font-bold text-gold-400 tracking-tight block mt-0.5">
                    {totalCompletionSum.toLocaleString()}
                  </span>
                  <span className="text-[8px] text-zinc-600 block">zikrlar jami</span>
                </div>

                <div className="px-4 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl font-mono text-center min-w-32">
                  <span className="text-[9px] text-zinc-500 uppercase block tracking-wider">Uvaysiy Ijoza</span>
                  <span className="text-xs font-bold text-emerald-400 tracking-tight block mt-1 uppercase flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                    BOG'LANISH
                  </span>
                  <span className="text-[8px] text-zinc-600 block">faol tunnel</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Swappable Main workspace panels */}
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          
          {activeTab === 'reader' && (
            <BookReader onStartZikrGoal={handleStartZikrGoal} />
          )}

          {activeTab === 'counter' && (
            <ZikrPanel initialTarget={selectedGoalTarget} onZikrDone={handleZikrLog} />
          )}

          {activeTab === 'sandbox' && (
            <QuantumSandbox />
          )}

          {activeTab === 'saved' && (
            <SavedVirds 
              history={zikrHistory} 
              onClearHistory={handleClearHistory} 
              userEmail={userEmail}
            />
          )}

          {/* Theme Selector Widget */}
          <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />

        </main>

        {/* Breathtaking luxury footer */}
        <footer className="border-t border-white/5 bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <span className="font-display text-sm font-extrabold tracking-wider text-white uppercase block">
                {BOOK_METADATA.title}
              </span>
              <p className="font-sans text-xs text-zinc-500 leading-normal max-w-sm">
                G'ayb Olami, Kvant Fizikasi va "Fathi Mutloq" Kalitining raqamli mukammal o'zlashtirish simulator platformasi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 font-mono text-xs text-zinc-500">
              <div className="space-y-0.5">
                <span className="text-zinc-600 uppercase block text-[9px] tracking-wider">TARG'IBOT & SILSILA</span>
                <span className="text-zinc-400">Umrzoq va Jarvis (Universal Analitik)</span>
              </div>
              <div className="hidden sm:block w-[1px] h-6 bg-zinc-800" />
              <div className="space-y-0.5">
                <span className="text-zinc-600 uppercase block text-[9px] tracking-wider">YIL & HUQUQLAR</span>
                <span className="text-zinc-400">2026-yil • Secure Quantum Node</span>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}
