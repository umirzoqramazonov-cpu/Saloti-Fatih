import React, { useState, useMemo } from 'react';
import { BOOK_METADATA, CHAPTERS } from '../data';
import { Search, ChevronRight, BookOpen, Clock, Tag, ArrowRight, ArrowLeft, Bookmark } from 'lucide-react';

interface BookReaderProps {
  onStartZikrGoal: (targetCount: number) => void;
}

export default function BookReader({ onStartZikrGoal }: BookReaderProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [favoriteChapters, setFavoriteChapters] = useState<number[]>([]);

  // Categories definition
  const categories = [
    { id: 'all', name: "Barcha Bo'limlar" },
    { id: 'origins', name: "Kelib Chiqishi" },
    { id: 'theology', name: "Ilohiy Sirlar" },
    { id: 'science', name: "Kvant Fizikasi" },
    { id: 'practice', name: "Amaliy Zikrlar" },
    { id: 'experience', name: "Hayotiy Tajribalar" },
  ];

  // Filtering chapters based on search query and category filter
  const filteredChapters = useMemo(() => {
    return CHAPTERS.filter((chap) => {
      const matchesCategory = categoryFilter === 'all' || chap.category === categoryFilter;
      const matchesSearch = 
        chap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chap.sections.some(sec => 
          sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sec.content.some(para => para.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, categoryFilter]);

  const currentChapter = useMemo(() => {
    return CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];
  }, [selectedChapterId]);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteChapters.includes(id)) {
      setFavoriteChapters(favoriteChapters.filter(favId => favId !== id));
    } else {
      setFavoriteChapters([...favoriteChapters, id]);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapterId < CHAPTERS.length - 1) {
      setSelectedChapterId(selectedChapterId + 1);
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapterId > 0) {
      setSelectedChapterId(selectedChapterId - 1);
    }
  };

  // Quick auto-trigger: extract numbers mentioned in paragraphs to offer interactive alignments
  const offersCustomZikrAction = (text: string) => {
    if (text.includes("12 000")) return 12005;
    if (text.includes("1 000")) return 1000;
    if (text.includes("100 marta")) return 100;
    if (text.includes("360 000")) return 360000;
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 page-fade-in" id="book-reader-container">
      
      {/* LEFT PANEL: Table of Contents & Interactive Search */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Search and Category Filter Card */}
        <div className="cosmic-card p-5 space-y-4 border-yellow-500/10">
          <h3 className="font-display text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
            <span>Mundarija va Qidiruv</span>
            <span className="text-[10px] text-zinc-500 font-mono">Total: {CHAPTERS.length} bob</span>
          </h3>
          <div className="relative">
            <input
              id="chapter-search-input"
              type="text"
              placeholder="Atamalarni izlash... (masalan: Latif)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
          </div>

          {/* Categories Pill Navigation */}
          <div className="flex flex-wrap gap-1.5" id="categories-list">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-sans font-medium transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20 shadow-[0_0_15px_rgba(219,161,18,0.05)]'
                    : 'bg-zinc-900/40 text-zinc-400 border border-transparent hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-3 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-1">
          {filteredChapters.length === 0 ? (
            <div className="text-center py-10 cosmic-card p-5">
              <p className="text-sm text-zinc-500">Hech qanday bob topilmadi.</p>
              <button 
                onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }} 
                className="mt-3 text-xs text-gold-400 underline cursor-pointer"
              >
                Qidiruvni tozalash
              </button>
            </div>
          ) : (
            filteredChapters.map((chap) => {
              const isSelected = chap.id === selectedChapterId;
              const isFav = favoriteChapters.includes(chap.id);
              return (
                <div
                  key={chap.id}
                  id={`chapter-card-item-${chap.id}`}
                  onClick={() => setSelectedChapterId(chap.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-br from-zinc-900/90 to-zinc-950 border-gold-500/30 shadow-[0_4px_20px_-5px_rgba(219,161,18,0.1)]'
                      : 'bg-zinc-900/20 border-white/5 hover:border-zinc-800 hover:bg-zinc-900/35'
                  }`}
                >
                  {/* Color Glow indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-400" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gold-500 font-semibold bg-gold-500/10 h-5 w-5 rounded flex items-center justify-center">
                        {chap.id === 0 ? 'M' : chap.id}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
                        {chap.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleFavorite(chap.id, e)}
                      className={`p-1 rounded text-zinc-500 hover:text-gold-400 transition-colors cursor-pointer`}
                      aria-label="Sevimlilarga qo'shish"
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isFav ? 'fill-gold-400 text-gold-400' : ''}`} />
                    </button>
                  </div>

                  <h4 className={`mt-2 font-display text-sm font-semibold transition-colors ${
                    isSelected ? 'text-gold-400' : 'text-zinc-200 group-hover:text-white'
                  }`}>
                    {chap.title}
                  </h4>
                  
                  <p className="mt-1 line-clamp-1 font-sans text-[11px] text-zinc-500 leading-normal">
                    {chap.subtitle}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic quote of the book */}
        <div className="cosmic-card p-5 bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800/80">
          <p className="font-sans text-xs italic text-zinc-400 leading-relaxed text-center">
            "{BOOK_METADATA.motto}"
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[9px] text-gold-500 uppercase tracking-widest">
            <span>• Oliy Fathi-Mutloq Kaliti •</span>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: Chapter Reader & Content View */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Welcome card for Muqaddima / Cover */}
        {selectedChapterId === 0 && (
          <div className="cosmic-card p-8 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-gold-500/10 text-center relative overflow-hidden">
            {/* Spinning background halo */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-dashed border-gold-500/10 animate-orbit-slow pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full border border-emerald-500/10 animate-orbit-slow pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4">
              <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full font-mono text-[10px] text-gold-400 uppercase tracking-widest">
                Maxfiy Ilm ensiklopediyasi
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                {BOOK_METADATA.title}
              </h2>
              <p className="font-display text-lg text-gold-400 font-medium">
                {BOOK_METADATA.subtitle}
              </p>
              
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-6" />

              <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
                {BOOK_METADATA.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 font-mono text-xs text-zinc-500">
                <div>
                  <span className="block text-zinc-400 font-semibold">{BOOK_METADATA.authors}</span>
                  <span className="text-[10px] text-zinc-600">tuzuvchilar</span>
                </div>
                <div className="h-6 w-[1px] bg-zinc-800" />
                <div>
                  <span className="block text-zinc-400 font-semibold">{BOOK_METADATA.year}</span>
                  <span className="text-[10px] text-zinc-600">chop etilgan yil</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Core Reader Card */}
        <div className="cosmic-card p-6 md:p-8 space-y-6" id="reader-core-content">
          
          {/* Header Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[10px] font-mono uppercase tracking-wider">
                  BOB {currentChapter.id === 0 ? 'M' : currentChapter.id}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  {currentChapter.category} • {favoriteChapters.includes(currentChapter.id) ? 'Bookmarkda' : 'Soddalashtirilgan o‘qish'}
                </span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                {currentChapter.title}
              </h2>
              <p className="font-sans text-xs text-zinc-400 leading-normal italic">
                {currentChapter.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>O'qish vaqti: ~{Math.max(2, currentChapter.sections.length * 2)} daqiqali dars</span>
            </div>
          </div>

          {/* Book Sections rendering */}
          <div className="space-y-8 font-sans text-sm text-zinc-300 leading-relaxed">
            {currentChapter.sections.map((section) => (
              <div key={section.id} className="space-y-4">
                {section.title && !section.title.startsWith("Bismillahir") && (
                  <h3 className="font-display text-base font-semibold text-gold-400 tracking-tight pb-1 border-b border-white/5 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400" />
                    {section.title}
                  </h3>
                )}

                <div className="space-y-3">
                  {section.content.map((paragraph, idx) => {
                    // Check if it's a verse or prayer translation (which typically contains bullet formats or specific Uzbek terms)
                    const isMottoQuote = paragraph.startsWith("Allohumma solli") || paragraph.includes("”Allohumma solli ala sayyidina");
                    const containsLaserQuote = paragraph.startsWith("• ”") || paragraph.includes("” — ");
                    
                    if (isMottoQuote) {
                      return (
                        <div key={idx} className="my-5 p-5 bg-gold-500/5 rounded-xl border border-gold-500/15 text-center shadow-[inset_0_1px_20px_rgba(219,161,18,0.02)] relative group">
                          {/* Inner glowing core */}
                          <div className="absolute top-1 right-2 font-mono text-[8px] text-gold-500/40 uppercase tracking-widest">
                            Yadroviy Formula
                          </div>
                          <p className="font-sans text-base text-gold-300 font-medium tracking-wide">
                            {paragraph}
                          </p>
                          <div className="mt-2.5 flex justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                          </div>
                        </div>
                      );
                    }

                    if (containsLaserQuote) {
                      // Beautiful list blocks explaining meaning
                      const parts = paragraph.split(" — ");
                      const highlightPart = parts[0];
                      const meanPart = parts[1];
                      return (
                        <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row md:items-start gap-3 hover:border-gold-500/20 transition-all">
                          <div className="md:w-1/3">
                            <span className="font-sans font-semibold text-gold-400 tracking-wide block">
                              {highlightPart.replace("• ", "")}
                            </span>
                          </div>
                          <div className="hidden md:block w-[1px] h-10 bg-zinc-800 self-center" />
                          <div className="md:w-2/3">
                            <p className="text-zinc-300 text-xs leading-relaxed">
                              {meanPart}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // Check if there is an interactive prompt for Zikr alignments
                    const alignmentGoal = offersCustomZikrAction(paragraph);

                    return (
                      <div key={idx} className="relative group">
                        <p className="indent-4 text-justify text-zinc-300 text-[13.5px] leading-relaxed">
                          {paragraph}
                        </p>
                        
                        {/* Match & Display a helper interactive action link */}
                        {alignmentGoal && (
                          <div className="my-2.5 flex justify-end">
                            <button
                              onClick={() => onStartZikrGoal(alignmentGoal)}
                              className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-500/20 rounded-md text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Zikr portalida mashq qilish: {alignmentGoal === 12005 ? '12 000' : alignmentGoal}x
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom reading navigation actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5 font-sans md:text-sm">
            <button
              onClick={handlePrevChapter}
              disabled={selectedChapterId === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-xs font-medium cursor-pointer ${
                selectedChapterId === 0
                  ? 'border-transparent text-zinc-600 cursor-not-allowed'
                  : 'border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Oldingisi</span>
            </button>

            <span className="font-mono text-xs text-zinc-500">
              {selectedChapterId + 1} / {CHAPTERS.length} bob
            </span>

            <button
              onClick={handleNextChapter}
              disabled={selectedChapterId === CHAPTERS.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-xs font-medium cursor-pointer ${
                selectedChapterId === CHAPTERS.length - 1
                  ? 'border-transparent text-zinc-600 cursor-not-allowed'
                  : 'bg-gold-500/10 border-gold-500/20 text-gold-400 hover:bg-gold-500/20 hover:text-white'
              }`}
            >
              <span>Keyingisi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Beautiful Interactive Achievement or Key Insight Card */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 max-w-lg">
            <h4 className="font-display text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-amber-500">⚡</span> Keyingi bosqichga o'tishga tayyormisiz?
            </h4>
            <p className="font-sans text-xs text-zinc-400 leading-normal">
              O'qigan bilimlaringiz koinot bilan kvant muvofiqligiga kirishi uchun "Zikr Portali"dan foydalanib o'z taqdiringizdagi buffer-overflow holatini faollashtiring.
            </p>
          </div>
          <div>
            <button
              onClick={() => onStartZikrGoal(12005)}
              className="px-4 py-2.5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-white font-sans text-xs font-semibold rounded-xl transition-all shadow-[0_4px_20px_-5px_rgba(219,161,18,0.3)] hover:shadow-gold-500/30 flex items-center gap-2 cursor-pointer self-start md:self-auto"
            >
              <span>Zikr portalini faollashtirish</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
