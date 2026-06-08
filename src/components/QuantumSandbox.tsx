import React, { useState, useMemo } from 'react';
import { Binary, Shield, Award, Sparkles, TrendingUp, HelpCircle, Thermometer, Wifi, ShieldAlert, Cpu } from 'lucide-react';

export default function QuantumSandbox() {
  const [daysOfPractice, setDaysOfPractice] = useState<number>(30);
  const [dailyIntensity, setDailyIntensity] = useState<number>(1000);
  const [hasUnlockingIntention, setHasUnlockingIntention] = useState<boolean>(true);
  const [vpnActive, setVpnActive] = useState<boolean>(true);
  const [acousticMode, setAcousticMode] = useState<'perfect' | 'careless'>('perfect');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Core simulation computations
  const simulationResults = useMemo(() => {
    // Total accumulated zikrs
    const totalCount = daysOfPractice * dailyIntensity;
    
    // Packet Loss based on Chapter 1.2 "Sukutning Daxshatli Quvvati"
    // Pala-partish ishlash triggers pack loss, perfect mode handles with 0% loss because of 1s delay
    const packetLoss = acousticMode === 'careless' ? 25 : 0;
    const effectiveUploadCount = Math.floor(totalCount * (1 - packetLoss / 100));

    // Critical Mass logic based on Chapter 4.2
    const isBufferOverflowReached = dailyIntensity >= 12000;
    const criticalMassProgress = Math.min(100, (effectiveUploadCount / 360000) * 100);
    
    // Estimated Aura density in millimeters (Plazmatik olov qalqoni)
    const basicShield = (dailyIntensity / 100) * (daysOfPractice * 0.5);
    const auraThickness = Math.min(500, Math.floor(10 + basicShield));
    
    // Expected Financial Opening multiplier "Tashxir" percentage
    const intentionMultiplier = hasUnlockingIntention ? 1.618 : 1.0;
    const acousticMultiplier = acousticMode === 'perfect' ? 1.0 : 0.7;
    const tashxirInfluence = Math.min(100, Math.floor((effectiveUploadCount / 120000) * 100 * intentionMultiplier * acousticMultiplier));
    
    // Thermal computations (Chapter 3)
    // CPU temperature gets extremely high if daily intensity is high, but Liquid Cooling (Saloti Fatih) keeps it perfectly chilled.
    const rawCpuTemp = 36.6 + (dailyIntensity / 300);
    const usesLiquidCooling = true; // Saloti Fatih itself is the ultimate Liquid Coolant!
    const cpuTemp = usesLiquidCooling ? 36.6 + (dailyIntensity / 2500) : rawCpuTemp;
    const coolingEfficiency = usesLiquidCooling ? 98 : 12;

    // System Crash probability under heavy intensity (Chapter 3.1)
    // Decreased significantly if VPN (A'uzu billahi...) is switched ON
    let systemCrashRisk = 0;
    if (dailyIntensity >= 10000) {
      systemCrashRisk = vpnActive ? 0 : 85;
    } else {
      systemCrashRisk = vpnActive ? 0 : 15;
    }

    // Days remaining until complete Absolute Unlocking (Annual target of 360,000)
    const target360kRemainingDays = Math.max(0, Math.ceil((360000 - effectiveUploadCount) / (dailyIntensity || 1)));

    return {
      totalCount,
      packetLoss,
      effectiveUploadCount,
      isBufferOverflowReached,
      criticalMassProgress,
      auraThickness,
      tashxirInfluence,
      target360kRemainingDays,
      cpuTemp,
      coolingEfficiency,
      systemCrashRisk,
      isLiquidCoolingActive: usesLiquidCooling,
    };
  }, [daysOfPractice, dailyIntensity, hasUnlockingIntention, vpnActive, acousticMode]);

  return (
    <div className="space-y-6 page-fade-in" id="quantum-sandbox-dashboard">
      
      {/* Intro Banner */}
      <div className="cosmic-card p-6 bg-gradient-to-r from-violet-950/20 via-zinc-950 to-emerald-950/20 border-violet-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Binary className="h-5 w-5 text-violet-400 animate-pulse" />
            Adadlar Muhandisligi & Kvant-Akustik Simulyatori
          </h2>
          <p className="font-sans text-xs text-zinc-400">
            Taqdiringiz, auringiz va tovushlar tebranishining koinot Matritsasiga ta'sirini 2-Kitob asror qoidalari bo'yicha hisoblang.
          </p>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 self-start md:self-auto"
        >
          <HelpCircle className="h-4 w-4 text-violet-400" />
          <span>Matematik Algoritm</span>
        </button>
      </div>

      {/* Explanatory notes */}
      {showExplanation && (
        <div className="cosmic-card p-5 bg-zinc-900/40 border-zinc-800/80 space-y-3 font-sans text-xs text-zinc-400 animate-fadeIn">
          <p className="text-zinc-200 font-semibold uppercase font-mono tracking-wider text-[10px] text-violet-400">
            Simulyator Qonuniyati (Metodologiya):
          </p>
          <p>
            Kvant fizikasida <span className="text-zinc-200">Kritik Massa</span> (Critical Mass) ma'lum bir nur energiyasining zichlashishi hisoblanadi. Kundalik tarqoq harakatlar koinot matritsasini yora olmaydi, lekin doimiy bitta tebranish chastotasida tikilgan energiya har qanday moliyaviy bloklarni sindiradi.
          </p>
          <p>
            Simulyatorda biz quyidagi asror parametrlarini modellashtirdik:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><span className="text-zinc-200 font-medium">Aura qalqoni zichligi:</span> (Daily Intensity / 100) * kun soni nisbatida biologik aura qatlamining laser nuri shakliga o'tishini tahlil qiladi (maksimallashuv 500 mm).</li>
            <li><span className="text-zinc-200 font-medium">Tashxir (Attraction quotient):</span> Pul va kutilmagan lavinasimon imkoniyatlarning ortingizdan quvib yurish darajasi (Oltin nisbat <span className="text-gold-400">1.618x</span> intellekt niyati bilan kuchaytirilgan).</li>
          </ul>
        </div>
      )}

      {/* Main Sandbox Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders and controls (LEFT PANEL) */}
        <div className="lg:col-span-5 cosmic-card p-6 space-y-6 border-zinc-800">
          <h3 className="font-display text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Simulyatsiya Parametrlari
          </h3>

          {/* Days Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400">Amaliyot Davomiyligi:</span>
              <span className="text-violet-400 font-bold">{daysOfPractice} kun</span>
            </div>
            <input
              id="slider-days-of-practice"
              type="range"
              min="1"
              max="365"
              value={daysOfPractice}
              onChange={(e) => setDaysOfPractice(parseInt(e.target.value, 10))}
              className="w-full accent-violet-500 bg-zinc-900 border border-transparent rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-zinc-600">
              <span>1 kun</span>
              <span>180 kun</span>
              <span>365 kun (1 yil)</span>
            </div>
          </div>

          {/* Daily Intensity slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400">Kunlik Zikr Miqdori:</span>
              <span className="text-emerald-400 font-bold">{dailyIntensity.toLocaleString()} marta</span>
            </div>
            <input
              id="slider-daily-intensity"
              type="range"
              min="100"
              max="30000"
              step="100"
              value={dailyIntensity}
              onChange={(e) => setDailyIntensity(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 bg-zinc-900 border border-transparent rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-zinc-600">
              <span>100 ta (Aura)</span>
              <span>12,000 ta (Xatm)</span>
              <span>30,000 ta (Oliy Fath)</span>
            </div>
          </div>

          {/* Intention & Book 2 Controls */}
          <div className="pt-4 border-t border-white/5 space-y-4">
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">Asror va Kiber-Xavfsizlik Sozlamalari</span>
            
            {/* Intention multiplier */}
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <input
                id="intent-multiplier-checkbox"
                type="checkbox"
                checked={hasUnlockingIntention}
                onChange={(e) => setHasUnlockingIntention(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-gold-500 focus:ring-0 accent-gold-500"
              />
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-semibold text-zinc-200 block">
                  Finansaviy Fathi Mutloq niyati (1.618x)
                </span>
                <span className="font-sans text-[10px] text-zinc-500 block leading-normal">
                  "Min hayşu la yahtasib" (Oylik 10k-100k$) va lavinasimon kaskadli rizq oqimini faollashtirish.
                </span>
              </div>
            </label>

            {/* VPN Protection Toggle based on Chapter 2.1 */}
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-zinc-950/20 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
              <input
                id="vpn-active-checkbox"
                type="checkbox"
                checked={vpnActive}
                onChange={(e) => setVpnActive(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-emerald-400 focus:ring-0 accent-emerald-400"
              />
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-semibold text-zinc-200 block text-emerald-400">
                  Isti'oza & Bismilloh VPN (Anti-Malware)
                </span>
                <span className="font-sans text-[10px] text-zinc-500 block leading-normal">
                  (Muqaddas Asos). Shaytoniy hujumlar, ruhiy inqirozlar va katta zikrdagi tizim qulash (System Crash) xavfini bloklaydi.
                </span>
              </div>
            </label>

            {/* Pronunciation Acoustics Selector based on Chapter 1 */}
            <div className="space-y-1.5">
              <span className="font-sans text-xs font-semibold text-zinc-400 block">Talaffuz va Sukut Spasingi (Chapter 1)</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="acoustic-perfect-btn"
                  onClick={() => setAcousticMode('perfect')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer border text-center transition-all ${
                    acousticMode === 'perfect'
                      ? 'bg-gold-500/10 text-gold-400 border-gold-500/30'
                      : 'bg-zinc-950/40 text-zinc-500 border-transparent hover:text-zinc-300'
                  }`}
                >
                  Ritmik (1s Sukutli)
                </button>
                <button
                  type="button"
                  id="acoustic-careless-btn"
                  onClick={() => setAcousticMode('careless')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer border text-center transition-all ${
                    acousticMode === 'careless'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-zinc-950/40 text-zinc-500 border-transparent hover:text-zinc-300'
                  }`}
                >
                  Pala-partish / Tezkor
                </button>
              </div>
              <span className="font-sans text-[9px] text-zinc-500 leading-normal block">
                {acousticMode === 'perfect' 
                  ? "✓ 1 soniyalik Sukut saqlanadi. Ma’lumotlar yo’qolmaydi (Packet Loss: 0%), kod Arshga Upload bo’ladi." 
                  : "✗ Shoshilma! Sukutsiz o'qiladi. Koinot matritsasida Packet Loss (25%) yuz berib, Fath kechikadi."}
              </span>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/70">
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-1">Dastur versiyasi: v2.0 Kvant Akustika</span>
            <p className="font-sans text-[10px] text-zinc-400 leading-normal">
              Saloti Fatih koinot Matritsasida "Machine Code" kabi ishlaydi. Toj va Asos uning xavfsiz va barqaror persistent ishlashini kafolatlaydi.
            </p>
          </div>

        </div>

        {/* Dynamic calculations gauges (RIGHT PANEL) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          
          {/* Main Total Aggregated Count */}
          <div className="cosmic-card p-6 space-y-4 md:col-span-2 bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Jamg'arilgan Umumiy Energiya Nuri
              </span>
              <Sparkles className="h-4 w-4 text-gold-400" />
            </div>

            <div className="py-2">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {simulationResults.effectiveUploadCount.toLocaleString()} <span className="font-sans text-lg font-normal text-zinc-500">upload / zikr</span>
              </div>
              <p className="font-sans text-xs text-zinc-400 mt-2">
                Arshga muvaffaqiyatli yetib borgan (uploaded) haqiqiy asror nurlari soni (Packet Loss chegirilgan zikr).
              </p>
            </div>

            {/* Simulated progress slider for 360,000 threshold */}
            <div className="space-y-1.5 pt-4 border-t border-white/5">
              <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase">
                <span>Eriq: {simulationResults.criticalMassProgress.toFixed(1)}%</span>
                <span>Yillik Fath chegarasi (360,000 marta)</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-gold-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-350"
                  style={{ width: `${simulationResults.criticalMassProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Aura Thickness Gauge */}
          <div className="cosmic-card p-5 space-y-3 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-rose-400">
              <Shield className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Qalqon Qalinligi</span>
            </div>

            <div className="py-2">
              <div className="font-display text-2xl font-bold text-white font-mono leading-none">
                {simulationResults.auraThickness} <span className="text-xs text-zinc-500 font-normal">mm</span>
              </div>
              <p className="font-sans text-[11px] text-zinc-400 leading-normal mt-1.5">
                Biologik plazmatik qobiq plansheti. Sehr, hasad va tashqi shovqinlar kelishi bilanoq yonib ketadi.
              </p>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 uppercase">
              Aura darajasi: {simulationResults.auraThickness >= 300 ? 'Olovli Plazma Qalqoni' : 'Kundalik Himoya'}
            </div>
          </div>

          {/* Tashxir Attraction Force Gauge */}
          <div className="cosmic-card p-5 space-y-3 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Tashxir (Attraction)</span>
            </div>

            <div className="py-2">
              <div className="font-display text-2xl font-bold text-emerald-400 font-mono leading-none">
                {simulationResults.tashxirInfluence}%
              </div>
              <p className="font-sans text-[11px] text-zinc-400 leading-normal mt-1.5">
                Eski formatni chetlab o'tib, lavinasimon kaskadli rizq va xalqaro hamkorlarni chaqirish kuchi.
              </p>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 uppercase">
              Rizq oqimi: {simulationResults.tashxirInfluence >= 80 ? 'GLOBAL IT LAVINA' : 'BARAKALIK KANALI'}
            </div>
          </div>

          {/* Packet Loss / Upload Integrity Gauge (Book 2 Ch 1) */}
          <div className="cosmic-card p-5 space-y-3 flex flex-col justify-between border-cyan-900/10">
            <div className="flex items-center gap-2 text-cyan-400">
              <Wifi className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Uploader Integrity</span>
            </div>

            <div className="py-2">
              <div className="font-display text-2xl font-bold text-white font-mono leading-none flex items-baseline gap-1">
                <span>{100 - simulationResults.packetLoss}%</span>
                <span className="text-[10px] text-zinc-500 font-mono">Signal</span>
              </div>
              <p className="font-sans text-[11px] text-zinc-400 leading-normal mt-1.5">
                Sukut ritmiga bog'liq asror paketi. {simulationResults.packetLoss > 0 ? "Pala-partish o'qishda packetlar yo'qoladi." : "Dona-dona o'qishda 100% upload."}
              </p>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between">
              <span>Loss: {simulationResults.packetLoss}%</span>
              <span className={simulationResults.packetLoss === 0 ? "text-emerald-400" : "text-rose-400"}>
                {simulationResults.packetLoss === 0 ? "EXCELLENT" : "WARNING"}
              </span>
            </div>
          </div>

          {/* Thermal Liquid Coolant Monitor (Book 2 Ch 3) */}
          <div className="cosmic-card p-5 space-y-3 flex flex-col justify-between border-amber-900/10">
            <div className="flex items-center gap-2 text-amber-400">
              <Cpu className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Thermal & Coolant</span>
            </div>

            <div className="py-2">
              <div className="font-display text-2xl font-bold text-amber-400 font-mono leading-none">
                {simulationResults.cpuTemp.toFixed(1)}°C
              </div>
              <p className="font-sans text-[11px] text-zinc-400 leading-normal mt-1.5">
                Jalol zikrlari asabni yoqmaydi. Saloti Fatih (Supreme Coolant) tizimni barqaror, iliq haroratda saqlaydi.
              </p>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 uppercase flex justify-between">
              <span>Cooling: {simulationResults.coolingEfficiency}%</span>
              <span className="text-emerald-400 font-semibold">ACTIVE</span>
            </div>
          </div>

          {/* Astral Defense Shield & System Crash probability (Book 2 Ch 2 & 3) */}
          <div className="cosmic-card p-5 md:col-span-2 space-y-3 flex flex-col justify-between border-rose-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="h-4 w-4" />
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Ruhiy Kiber Sentinel (Chapter 3)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold ${vpnActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {vpnActive ? 'VPN ACTIVE' : 'NO FIREWALL'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-1">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Tizim Qulashi xavfi (Crash Risk)</span>
                <div className={`font-display text-3xl font-extrabold font-mono mt-0.5 ${simulationResults.systemCrashRisk > 50 ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {simulationResults.systemCrashRisk}%
                </div>
              </div>
              <p className="font-sans text-[11px] text-zinc-400 leading-relaxed md:border-l md:border-white/5 md:pl-4">
                {vpnActive 
                  ? "✓ A'uzu billahi... VPN daryosi faol. Astral viruslar yoki shovqinlar sizga zarar bera olmaydi, xotirjam boshla!"
                  : "⚠ Diqqat! VPN yoqilmagan. Katta miqdorlarda (12k+) shaytoniy dasturlar va hasadchilar tizimingizga error solishi mumkin."}
              </p>
            </div>
          </div>

          {/* Action Call for custom alignment plan */}
          <div className="cosmic-card p-5 md:col-span-2 bg-gradient-to-tr from-zinc-950 to-zinc-900 border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                {simulationResults.target360kRemainingDays > 0 
                  ? `Yillik Mutlaq Fathga ${simulationResults.target360kRemainingDays} kun qoldi` 
                  : "Siz Mukammal Mutlaq Fath Energetikasini hisobladingiz!"}
              </h4>
              <p className="font-sans text-xs text-zinc-500 leading-normal">
                Ushbu simulyatsiya koeffitsientlari asosida bugunoq portaldan foydalanib amaliy mashqlarni bajaring.
              </p>
            </div>

            <div className="flex items-center gap-1 cursor-pointer font-mono text-xs font-semibold text-gold-400 hover:text-white transition-colors">
              <Award className="h-4 w-4" />
              <span>Simulyatsiya Muvaffaqiyatli Tamomlandi</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
