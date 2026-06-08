import React, { useState, useEffect, useRef } from 'react';
import { ZIKR_GOALS, BOOK_METADATA } from '../data';
import { Sparkles, Trash2, Shield, Radio, Volume2, VolumeX, RotateCcw, Save, Zap, HelpCircle } from 'lucide-react';

interface ZikrPanelProps {
  initialTarget?: number;
  onZikrDone: (count: number, goalId: string) => void;
}

export default function ZikrPanel({ initialTarget, onZikrDone }: ZikrPanelProps) {
  // Goals alignment
  const [selectedGoalId, setSelectedGoalId] = useState<string>("daily-100");
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showRipples, setShowRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sessionSavedCount, setSessionSavedCount] = useState<number>(0);
  
  const rippleIdRef = useRef<number>(0);
  const countButtonRef = useRef<HTMLButtonElement>(null);

  // Load target count if selected from reader
  useEffect(() => {
    if (initialTarget) {
      const matchedGoal = ZIKR_GOALS.find(g => g.target === initialTarget || (g.target === 12005 && initialTarget === 12005));
      if (matchedGoal) {
        setSelectedGoalId(matchedGoal.id);
        setCurrentCount(0);
      }
    }
  }, [initialTarget]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`saloti_fatih_count_${selectedGoalId}`);
    if (saved) {
      setCurrentCount(parseInt(saved, 10));
    } else {
      setCurrentCount(0);
    }
  }, [selectedGoalId]);

  const selectedGoal = ZIKR_GOALS.find(g => g.id === selectedGoalId) || ZIKR_GOALS[0];

  // Sounds implementation using standard browser synthetic Web Audio API 
  // (to avoid requesting missing external .mp3 file sources or incurring loading lag!)
  const playBeep = (freq: number, type: 'sine' | 'triangle' | 'sawtooth' = 'sine', duration: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = freq;
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      // smoothly fade out sound to avoid audio clicks
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio exception:", e);
    }
  };

  const incrementCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Sound on tap
    playBeep(440 + (currentCount % 100) * 2, 'sine', 0.06);

    const newCount = currentCount + 1;
    setCurrentCount(newCount);
    localStorage.setItem(`saloti_fatih_count_${selectedGoalId}`, newCount.toString());

    // Generate beautiful ripple shockwave inside the button
    if (countButtonRef.current) {
      const rect = countButtonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = {
        id: rippleIdRef.current++,
        x,
        y
      };
      setShowRipples((prev) => [...prev, newRipple]);
      // Cleanup ripples after animation completed
      setTimeout(() => {
        setShowRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    // Play achievement noise when target met
    if (newCount === selectedGoal.target) {
      setTimeout(() => {
        playBeep(523.25, 'triangle', 0.15); // C5
        setTimeout(() => playBeep(659.25, 'triangle', 0.15), 150); // E5
        setTimeout(() => playBeep(783.99, 'triangle', 0.3), 300); // G5
      }, 100);
    }
  };

  const handleReset = () => {
    if (window.confirm("Haqiqatan ham ushbu zikr hisoblagichini 0 ga qaytarmoqchimisiz?")) {
      setCurrentCount(0);
      localStorage.setItem(`saloti_fatih_count_${selectedGoalId}`, "0");
      playBeep(220, 'sawtooth', 0.2);
    }
  };

  const handleSaveToProfile = () => {
    if (currentCount === 0) return;
    onZikrDone(currentCount, selectedGoalId);
    setSessionSavedCount((prev) => prev + currentCount);
    setCurrentCount(0);
    localStorage.setItem(`saloti_fatih_count_${selectedGoalId}`, "0");
    playBeep(587.33, 'sine', 0.25); // D5 success beep
  };

  const handleSavepointRecovery = () => {
    // "Istig'for - Savepoint" Action
    // This allows recovery if they did a mistake, or simulated save points
    playBeep(329.63, 'sine', 0.15); // E4
    playBeep(392.00, 'sine', 0.25); // G4
    alert("Istig'for - Savepoint Algoritmi faollashdi. Avvalgi toza zikr nuqtalari tiklandi, yomon fikrlar/vasvasalar loglardan tozalandi (Write-Ahead-Log faolligicha qoldi).");
  };

  // Stats calculators
  const progressRatio = Math.min(100, (currentCount / selectedGoal.target) * 100);
  
  // Custom formulas indicating energetic metrics (Quantum style)
  const alignmentFreq = 100 + (progressRatio * (selectedGoal.target / 10));
  const auraShieldPercent = Math.min(100, Math.floor(10 + (currentCount / (selectedGoal.target || 100)) * 90));
  const criticalMassFilled = progressRatio.toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 page-fade-in" id="zikr-portal-panel">
      
      {/* Target goals and selector tabs (LEFT COLUMN) */}
      <div className="lg:col-span-4 space-y-6">
        
        <div className="cosmic-card p-5 space-y-4 border-gold-500/10">
          <div className="flex items-center gap-2 text-gold-400">
            <Radio className="h-4 w-4 animate-pulse text-gold-400" />
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Kvant Chastotalar
            </h3>
          </div>
          
          <p className="font-sans text-[11px] text-zinc-400 leading-normal">
            Hajm va chastotani rezonanslang. Har bir daraja alohida asror va daxshatli oqibatlarga mo'ljallangan.
          </p>

          <div className="space-y-3" id="zikr-goals-selector">
            {ZIKR_GOALS.map((goal) => {
              const isSelected = goal.id === selectedGoalId;
              const hasSavedProgress = localStorage.getItem(`saloti_fatih_count_${goal.id}`);
              const savedProgressNum = hasSavedProgress ? parseInt(hasSavedProgress, 10) : 0;
              
              return (
                <button
                  key={goal.id}
                  id={`goal-tab-${goal.id}`}
                  onClick={() => setSelectedGoalId(goal.id)}
                  className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-gold-950/20 to-zinc-950 border-gold-400/40 text-white shadow-xl'
                      : 'bg-zinc-900/30 border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[13px] font-bold">
                      {goal.title}
                    </span>
                    {savedProgressNum > 0 && !isSelected && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 bg-gold-500/10 text-gold-400 rounded-full">
                        {savedProgressNum} ta'min
                      </span>
                    )}
                  </div>
                  
                  <p className="mt-1 line-clamp-2 font-sans text-[11px] text-zinc-500 leading-normal">
                    {goal.description}
                  </p>
                  
                  <div className="mt-2.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-600">
                    <span>{goal.cyberMetaphor}</span>
                    <span className="text-gold-500 font-semibold">{goal.target === 12005 ? '12 000' : goal.target} marta</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cybersecurity information detail / Gold Rules */}
        <div className="cosmic-card p-5 bg-gradient-to-br from-indigo-950/10 to-zinc-950 border-zinc-800">
          <div className="flex items-center gap-2 text-rose-400">
            <Shield className="h-4 w-4" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider">Kiber Xavfsizlik Qoidalari</span>
          </div>
          <ul className="mt-3 space-y-2 text-zinc-400 font-sans text-xs [list-style-type:square] pl-4">
            <li>
              <span className="text-zinc-200 font-medium">Mutlaq Maxfiylik</span>: Zikr amaliyotingizni sirligicha saqlang! Hasad o'qlari dasturga <span className="text-rose-400 font-mono">Error</span> olib kelishi mumkin.
            </li>
            <li>
              <span className="text-zinc-200 font-medium">Lazer Fokus</span>: Raqamlarning matematik aniqligi ideal holda saqlanishi kerak (Matritsa rejimida).
            </li>
            <li>
              <span className="text-zinc-200 font-medium">Savepoint Algoritmi</span>: Gunoh yoki vasvasaga uchrasangiz, istig'for aytib oxirgi xavfsiz savepoint nuqtasidan davom eting.
            </li>
          </ul>
        </div>

      </div>

      {/* Actual Counter Interface (RIGHT COLUMN) */}
      <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
        
        {/* Main tactile panel */}
        <div className="cosmic-card p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden flex-1" id="zikr-core-panel">
          
          {/* Sounds and status switcher top bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-500 text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>ALIGNMENT STREAK: {criticalMassFilled}%</span>
            </div>

            <button
              id="sound-toggle-btn"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                // quick test sound
                if(!soundEnabled) setTimeout(() => playBeep(520, 'sine', 0.1), 100);
              }}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'border-gold-500/20 text-gold-400 bg-gold-500/5' 
                  : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-gold-400" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>{soundEnabled ? 'Ovoz Yoqilgan' : 'Ovoz o‘chirilgan'}</span>
            </button>
          </div>

          <div className="mt-8 space-y-2">
            <span className="px-2.5 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-full font-mono text-[9px] uppercase tracking-widest block mx-auto max-w-max">
              {selectedGoal.cyberMetaphor}
            </span>
            <p className="font-sans text-xs text-zinc-400 italic max-w-md mx-auto">
              "{selectedGoal.effect}"
            </p>
          </div>

          {/* Central Circular tactile counter button */}
          <div className="my-10 relative flex items-center justify-center">
            
            {/* Pulsing visual halo orbits */}
            <div className="absolute -inset-10 rounded-full border border-gold-500/10 animate-orbit-slow pointer-events-none" />
            <div 
              className="absolute -inset-4 rounded-full border border-emerald-500/5 pointer-events-none transition-all duration-300" 
              style={{
                transform: `scale(${1 + progressRatio / 100})`,
                opacity: 0.1 + (progressRatio / 200)
              }}
            />

            {/* Glowing Golden Dial */}
            <button
              ref={countButtonRef}
              id="massive-zikr-count-button"
              onClick={incrementCount}
              className="relative h-44 w-44 md:h-52 md:w-52 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-gold-400/20 hover:border-gold-400/60 shadow-[0_4px_40px_rgba(219,161,18,0.05),inset_0_2px_20px_rgba(0,0,0,0.8)] active:scale-95 transition-all outline-none cursor-pointer flex flex-col items-center justify-center group"
            >
              {/* Ripple Effect Shockwaves */}
              {showRipples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute rounded-full bg-gold-400/20 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ping"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: '60px',
                    height: '60px',
                    animationDuration: '600ms'
                  }}
                />
              ))}

              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-gold-400/60 transition-colors">
                ZIKR MIQDORI
              </span>
              
              <span className="font-display text-4xl md:text-5xl font-extrabold text-white group-hover:text-gold-400 transition-colors my-1 tracking-tight">
                {currentCount.toLocaleString()}
              </span>

              <span className="font-mono text-[10px] text-zinc-500">
                Target: {selectedGoal.target === 12005 ? '12 000' : selectedGoal.target}
              </span>

              {/* Progress Ring Overlay */}
              <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  stroke="rgba(219, 161, 18, 0.1)"
                  strokeWidth="2"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  stroke="#dba112"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray="301.6" 
                  strokeDashoffset={301.6 - (301.6 * progressRatio) / 100}
                  className="transition-all duration-300"
                />
              </svg>
            </button>

          </div>

          {/* Quick Counter actions */}
          <div className="flex items-center gap-4 w-full max-w-sm">
            <button
              id="reset-counter-btn"
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl font-sans text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Resetlash</span>
            </button>

            <button
              id="save-to-profile-btn"
              onClick={handleSaveToProfile}
              disabled={currentCount === 0}
              className={`flex-1 px-4 py-2 border rounded-xl font-sans text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                currentCount === 0
                  ? 'border-transparent bg-zinc-900/40 text-zinc-600 cursor-not-allowed'
                  : 'bg-gold-500/10 border-gold-500/30 text-gold-400 hover:bg-gold-500/25 hover:text-white'
              }`}
            >
              <Save className="h-4 w-4" />
              <span>Saqlash (Profil)</span>
            </button>
          </div>

        </div>

        {/* Realtime Metrics panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="zikr-metrics-row">
          
          <div className="cosmic-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Resonans Chastota</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-white font-mono tracking-tight">
                {alignmentFreq.toLocaleString()}
              </span>
              <span className="font-mono text-[9px] text-zinc-600">Hz</span>
            </div>
            <p className="font-sans text-[10px] text-zinc-500 leading-normal">Kvant bog'lanish nisbati</p>
          </div>

          <div className="cosmic-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Plasma Aura Shield</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-emerald-400 font-mono tracking-tight">
                {auraShieldPercent}%
              </span>
            </div>
            <p className="font-sans text-[10px] text-emerald-600 leading-normal">Olovli qalqon zichligi</p>
          </div>

          <div className="cosmic-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Kritik Massa</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-white font-mono tracking-tight">
                {criticalMassFilled}%
              </span>
            </div>
            <p className="font-sans text-[10px] text-zinc-500 leading-normal">Absorption darajasi</p>
          </div>

          <div className="cosmic-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Savepoint status</span>
            <div className="text-zinc-200 text-xs font-semibold font-mono tracking-tight uppercase flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Write-Ahead</span>
            </div>
            <button
              onClick={handleSavepointRecovery}
              className="text-[9px] text-gold-500 font-mono underline block text-left cursor-pointer hover:text-white"
            >
              Savepoint chaqirish
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
