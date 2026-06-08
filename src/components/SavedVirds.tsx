import React, { useState, useEffect } from 'react';
import { ZikrHistory, ZikrGoal } from '../types';
import { ZIKR_GOALS, BOOK_METADATA } from '../data';
import { Award, Trash2, Calendar, ShieldAlert, Sparkles, Download, CheckCircle, Share2 } from 'lucide-react';

interface SavedVirdsProps {
  history: ZikrHistory[];
  onClearHistory: () => void;
  userEmail?: string;
}

export default function SavedVirds({ history, onClearHistory, userEmail }: SavedVirdsProps) {
  const [userName, setUserName] = useState<string>('');
  const [selectedGoalForCert, setSelectedGoalForCert] = useState<string>('daily-100');
  const [showCert, setShowCert] = useState<boolean>(false);

  // Load name if any from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('saloti_fatih_user_name');
    if (savedName) setUserName(savedName);
  }, []);

  const handleNameSave = (name: string) => {
    setUserName(name);
    localStorage.setItem('saloti_fatih_user_name', name);
  };

  // Summarize counts from history
  const totalCountsLogged = history.reduce((sum, item) => sum + item.count, 0);
  
  // Group counts by goal id
  const groupedCounts = history.reduce((acc, item) => {
    acc[item.goalId] = (acc[item.goalId] || 0) + item.count;
    return acc;
  }, {} as Record<string, number>);

  const activeCertificateGoal = ZIKR_GOALS.find(g => g.id === selectedGoalForCert) || ZIKR_GOALS[0];
  const userHasCompletedSelected = (groupedCounts[selectedGoalForCert] || 0) >= activeCertificateGoal.target;

  return (
    <div className="space-y-6 page-fade-in" id="saved-virds-container">
      
      {/* Top statistics summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total logged count */}
        <div className="cosmic-card p-6 bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800 flex flex-col justify-between">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
            Jami O'qilgan Mukammal Zikrlar
          </span>
          <div className="my-3">
            <span className="font-display text-3xl font-extrabold text-gold-400 tracking-tight font-mono">
              {totalCountsLogged.toLocaleString()}
            </span>
            <span className="font-sans text-xs text-zinc-500 ml-1.5 font-normal">marta</span>
          </div>
          <p className="font-sans text-[11px] text-zinc-500">
            Sizning ushbu barcha amaliyotlar hisobingiz tizim profilida doimiy saqlanadi.
          </p>
        </div>

        {/* Saved Profiles information name registration */}
        <div className="cosmic-card p-6 space-y-3 border-zinc-800">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
            Tasdiqlangan Solih Ismi
          </span>
          
          <div className="space-y-2">
            <input
              id="user-profile-name-input"
              type="text"
              placeholder="Ismingizni kiriting... (masalan: Umrzoq)"
              value={userName}
              onChange={(e) => handleNameSave(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
            {userEmail && (
              <span className="font-mono text-[9px] text-zinc-500 block">
                Tizim bog'lanishi: {userEmail}
              </span>
            )}
          </div>
          <p className="font-sans text-[10px] text-zinc-500">
            Guvoqnoma (Certificate) va kiber silsila sertifikatlarini yaratishda ishlatiladi.
          </p>
        </div>

        {/* Clear logs action panel */}
        <div className="cosmic-card p-6 flex flex-col justify-between border-zinc-800">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
              Ma'lumotlarni Tozalash
            </span>
            <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
              Agar yangi silsila boshlamoqchi bo'lsangiz yoki xatolarni butunlay o'chirib yuborish kerak bo'lsa, loglarni tozalang.
            </p>
          </div>
          <button
            id="clear-logs-btn"
            onClick={() => {
              if (window.confirm("Barcha amaliyot loglarini o'chirib yubormoqchimisiz? Ushbu amal qaytarilmaydi!")) {
                onClearHistory();
              }
            }}
            className="mt-3 w-full py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-xs font-sans transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>Tarixni batamom o'chirish</span>
          </button>
        </div>

      </div>

      {/* Main dashboard space Split: Certificate generator & History log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Certificate generator Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="cosmic-card p-6 border-zinc-800 space-y-4">
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-400 animate-pulse" />
              Ruhoniy Silsila Guvoqnomasi (Certificate)
            </h3>
            
            <p className="font-sans text-xs text-zinc-400 leading-normal">
              Siz tanlangan maqsadni to'liq tamomlaganingizda (masalan, 12,000 mukammal xatmini yoki 100 kunlik ritmini zaryadlaganingizda), sizga Ilohiy asrorning ramziy "Fathi Mutloq" ruxsatnomasi taqdim etiladi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex-1">
                <label className="font-mono text-[10px] text-zinc-500 uppercase block mb-1.5">Guvoqnoma Maqsadi</label>
                <select
                  id="cert-goal-select"
                  value={selectedGoalForCert}
                  onChange={(e) => {
                    setSelectedGoalForCert(e.target.value);
                    setShowCert(false);
                  }}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                >
                  {ZIKR_GOALS.map(g => (
                    <option key={g.id} value={g.id}>{g.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  id="activate-cert-btn"
                  onClick={() => setShowCert(true)}
                  disabled={!userName}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !userName
                      ? 'bg-zinc-900 text-zinc-500 border border-transparent cursor-not-allowed'
                      : 'bg-gold-500 text-black hover:bg-gold-400'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Guvoqnomani Loyihalash</span>
                </button>
              </div>
            </div>

            {!userName && (
              <span className="font-mono text-[9px] text-rose-400 block font-semibold leading-normal">
                * Guvoqnomani olish uchun avval "Tasdiqlangan Solih Ismi" maydonida ismingizni kiriting.
              </span>
            )}

            {/* Achievement condition indicator bar */}
            <div className="p-3.5 bg-zinc-900/50 rounded-xl border border-zinc-800 flex items-center justify-between">
              <span className="font-sans text-xs text-zinc-400">
                Sizning jami qilganingiz: <span className="font-bold text-white font-mono">{groupedCounts[selectedGoalForCert] || 0} zikr</span>
              </span>
              <span className="font-mono text-[10px]">
                {userHasCompletedSelected ? (
                  <span className="text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> ERIShILDI
                  </span>
                ) : (
                  <span className="text-zinc-500 uppercase">
                    Qoldi: {activeCertificateGoal.target - (groupedCounts[selectedGoalForCert] || 0)}
                  </span>
                )}
              </span>
            </div>

          </div>

          {/* Actual GUVOQNOMA View */}
          {showCert && (
            <div 
              id="sacred-certificate-canvas" 
              className="p-8 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-4 border-double border-gold-500/40 relative shadow-2xl text-center space-y-6 overflow-hidden animate-fadeIn"
            >
              {/* Sacred outer decorations and lines */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-gold-500/10 pointer-events-none" />
              <div className="absolute -left-12 -top-12 h-32 w-32 border border-gold-500/10 rounded-full animate-orbit-slow pointer-events-none" />
              <div className="absolute -right-12 -bottom-12 h-32 w-32 border border-gold-500/10 rounded-full animate-orbit-slow pointer-events-none" />

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gold-500 tracking-widest uppercase block">
                  Bismillahir Rohmanir Rohim
                </span>
                <h4 className="font-display text-xs font-semibold text-zinc-400 tracking-widest uppercase">
                  ILOHIY ASRORENSiklopediyasi ruxsati
                </h4>
              </div>

              <div className="space-y-2">
                <span className="font-sans text-xs text-zinc-400 block italic leading-relaxed">
                  Ushbu guvohnoma silsila protokoli bo'yicha haqiqiy va mo'tabarligini tasdiqlash uchun:
                </span>
                <span className="font-display text-2xl font-extrabold text-gold-400 block tracking-tight underline decoration-gold-600 underline-offset-8">
                  {userName || "Solih Zokir"}
                </span>
              </div>

              <div className="max-w-md mx-auto py-2 bg-gold-500/5 rounded-xl border border-gold-500/15">
                <div className="font-display text-sm font-bold text-white uppercase">
                  {activeCertificateGoal.title}
                </div>
                <p className="font-sans text-[11px] text-zinc-400 leading-normal mt-1 px-4">
                  "{activeCertificateGoal.description}" asariga muvofiq zikrlarining to'liq matematik doirasini tamomladi va energetik "Fathi Mutloq" dahliziga yo'llandi.
                </p>
              </div>

              <div className="flex items-center justify-between text-left font-mono text-[9px] text-zinc-500 pt-3 border-t border-white/5">
                <div>
                  <span>TASHXIR INDEX:</span>
                  <span className="block text-emerald-400 font-bold">{userHasCompletedSelected ? 'GOLDEN RES_100%' : 'PENDING'}</span>
                </div>
                
                <div className="text-center font-display text-[10px] text-gold-500/80 font-bold tracking-widest">
                  ★ Uvaysiy Ijoza ★
                </div>

                <div className="text-right">
                  <span>BERILGAN SANA:</span>
                  <span className="block text-zinc-300">2026-06-08</span>
                </div>
              </div>

              {/* Share/save tips */}
              <div className="text-[10px] text-zinc-500 font-sans italic">
                * Bu guvohnoma taqdiringizdagi yadroviy o'zgarishlarning ramziy ruhan isbotidir. Uni ruhan mustahkam saqlang.
              </div>
            </div>
          )}

        </div>

        {/* Operational History Log column (RIGHT PANEL) */}
        <div className="lg:col-span-5 cosmic-card p-6 border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Amaliyot Hisobotlari</span>
              <span className="text-[10px] font-mono text-zinc-500">Logs: {history.length}</span>
            </h3>

            {history.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs font-sans space-y-2">
                <Calendar className="h-8 w-8 text-zinc-700 mx-auto" />
                <p>Hozircha hech qanday zikr yozuvlari saqlanmagan.</p>
                <p className="text-[10px] text-zinc-600">Zikr Portalidan foydalanib o'qiganlaringizni "Saqlash (Profil)" tugmasi orqali bu yerga birlashtiring.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[45vh] overflow-y-auto pr-1">
                {history.map((item, idx) => {
                  const matchedGoal = ZIKR_GOALS.find(g => g.id === item.goalId);
                  return (
                    <div key={idx} className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="font-sans text-xs font-bold text-zinc-300 block">
                          {matchedGoal ? matchedGoal.title : "Custom Zikr"}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-500 block">
                          Sana: {item.date}
                        </span>
                      </div>
                      
                      <div className="text-right font-mono">
                        <span className="text-xs font-bold text-gold-400">
                          +{item.count.toLocaleString()}
                        </span>
                        <span className="block text-[8px] text-zinc-500 uppercase tracking-wider">zikr</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Secure lock status footnote */}
          <div className="pt-4 border-t border-white/5 flex items-center gap-2 font-mono text-[9.5px] text-zinc-500 mt-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Cybersecurity of the Soul is active. All data remains client-side.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
