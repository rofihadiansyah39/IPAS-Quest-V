import React from 'react';
import { Character, StudentProgress } from '../types/ipas';
import { retroSound } from '../utils/audio';
import { 
  WORLD_MAP_IMAGE, 
  SQUAD_IMAGE, 
  CHAPTERS_DATA 
} from '../data/ipasData';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  Zap, 
  Award,
  Users
} from 'lucide-react';

interface Props {
  character: Character;
  progress: StudentProgress;
  onSelectChapter: (chapterId: number) => void;
  onOpenCharacterSelect: () => void;
  onOpenBadges: () => void;
  onOpenLeaderboard: () => void;
}

export const StudentQuestView: React.FC<Props> = ({
  character,
  progress,
  onSelectChapter,
  onOpenCharacterSelect,
  onOpenBadges,
  onOpenLeaderboard,
}) => {
  const completedCount = progress.completedChapters.length;
  const progressPercent = Math.round((completedCount / CHAPTERS_DATA.length) * 100);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-12 w-full px-1 sm:px-2">
      {/* 1. Full Character Select Visual Banner (Uncut, Responsive, Highly Engaging) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h2 className="font-pixel text-[11px] sm:text-xs text-amber-300 uppercase tracking-wider">
              Pahlawan Sains IPAS SD: Karakter Terpilih
            </h2>
          </div>
          <button
            type="button"
            onClick={() => { retroSound.playBlip(); onOpenCharacterSelect(); }}
            className="cursor-pointer text-[10px] font-pixel text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
          >
            <span>Ganti Karakter</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* The Frame showing Character Select Art in Full without Cropping */}
        <div 
          onClick={() => { retroSound.playBlip(); onOpenCharacterSelect(); }}
          className="cursor-pointer group relative rounded-2xl overflow-hidden border-4 border-amber-500 shadow-2xl bg-slate-950 transition hover:border-amber-400"
        >
          {/* 16:9 Aspect Ratio Container for Full Image View */}
          <div className="w-full aspect-[16/9] relative bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={SQUAD_IMAGE}
              alt="Character Select Screen Banu Dara Ian Aga Mia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Quick Click Hint Tag */}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/70 font-pixel text-[9px] text-amber-300 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>KLIK UNTUK GANTI KARAKTER</span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 font-pixel text-[9px] text-slate-200">
            Karakter Aktif: <strong className="text-amber-400">{character.name}</strong> ({character.title})
          </div>
        </div>

        {/* 2. Player Status HUD - Positioned Neatly Below (No Overlap) */}
        <div className="retro-card p-4 sm:p-5 rounded-xl bg-slate-900 border-2 border-amber-500/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Active Character Profile */}
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-amber-400 bg-slate-950 flex items-center justify-center font-pixel text-xl font-bold shadow-lg text-amber-400 shrink-0"
              style={{ borderColor: character.color }}
            >
              {character.name[0]}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-pixel text-xs sm:text-sm text-white">{character.name}</span>
                <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-semibold">
                  {character.title}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Keahlian: <strong className="text-cyan-400">{character.specialty}</strong>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400 mt-1 font-mono">
                <span>HP: {character.stats.hp}</span>
                <span>·</span>
                <span>ATK: {character.stats.atk}</span>
                <span>·</span>
                <span>SPD: {character.stats.spd}</span>
              </div>
            </div>
          </div>

          {/* Stats Cluster & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-between w-full md:w-auto">
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-center flex-1 sm:flex-initial min-w-[85px]">
              <div className="text-[9px] font-pixel text-slate-400">LEVEL</div>
              <div className="font-pixel text-sm sm:text-base text-amber-400 mt-0.5">LV. {progress.level}</div>
              <div className="text-[9px] text-slate-500">{progress.xp} XP</div>
            </div>

            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-center flex-1 sm:flex-initial min-w-[85px]">
              <div className="text-[9px] font-pixel text-slate-400">KOIN SAINS</div>
              <div className="font-pixel text-sm sm:text-base text-yellow-400 mt-0.5">🪙 {progress.coins}</div>
              <div className="text-[9px] text-slate-500">Toko Lencana</div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                type="button"
                onClick={() => { retroSound.playBlip(); onOpenBadges(); }}
                className="cursor-pointer retro-btn bg-purple-700 hover:bg-purple-600 text-white font-bold px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Lencana ({progress.unlockedBadgeIds.length})</span>
              </button>
              <button
                type="button"
                onClick={() => { retroSound.playBlip(); onOpenLeaderboard(); }}
                className="cursor-pointer retro-btn bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Peringkat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quest Progress Tracker */}
      <div className="retro-card p-4 sm:p-5 rounded-xl bg-slate-900 border-2 border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white uppercase tracking-wider font-pixel text-[10px] sm:text-[11px]">
              Progres Kurikulum IPAS SD Kelas 5:
            </span>
          </div>
          <span className="font-pixel text-amber-400 text-[10px] sm:text-xs">
            {completedCount} / {CHAPTERS_DATA.length} Bab Tuntas ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 4. Retro Interactive World Map View */}
      <div className="relative rounded-2xl overflow-hidden border-4 border-slate-800 bg-slate-950 shadow-2xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[220px] max-h-[380px] w-full overflow-hidden">
          <img
            src={WORLD_MAP_IMAGE}
            alt="Peta Petualangan Nusantara IPAS"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-slate-950/25" />
          
          <div className="absolute top-2.5 left-2.5 bg-slate-950/90 px-2.5 py-1 rounded-lg border border-amber-500/60 font-pixel text-[9px] text-amber-300 flex items-center gap-1.5 shadow">
            <Sparkles className="w-3 h-3" />
            <span>PETA NUSANTARA: 8 ZONA BAB</span>
          </div>

          {/* Interactive World Map Node Pins */}
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-wrap items-center justify-around z-10">
            {CHAPTERS_DATA.map((ch) => {
              const isDone = progress.completedChapters.includes(ch.id);
              return (
                <div key={ch.id} className="m-0.5 sm:m-1">
                  <button
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation();
                      retroSound.playBlip(); 
                      onSelectChapter(ch.id); 
                    }}
                    className={`cursor-pointer retro-btn px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg font-pixel text-[8px] sm:text-[9px] flex items-center gap-1 shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                      isDone 
                        ? 'bg-emerald-600 text-white border-emerald-300' 
                        : 'bg-slate-900/95 text-amber-300 border-amber-500 hover:bg-slate-800'
                    }`}
                  >
                    <span>{isDone ? '✓' : `★`}</span>
                    <span>Bab {ch.id}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Chapters Grid - 8 Chapters (Responsive 1 col on mobile, 2 cols on tablet/desktop) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Daftar Bab & Arena Kuis Pembelajaran</span>
          </h2>
          <span className="text-xs text-slate-400">Buku Kurikulum Merdeka Revisi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {CHAPTERS_DATA.map(chapter => {
            const isCompleted = progress.completedChapters.includes(chapter.id);
            const score = progress.chapterScores[chapter.id];

            return (
              <div
                key={chapter.id}
                onClick={() => { retroSound.playBlip(); onSelectChapter(chapter.id); }}
                className={`retro-card p-4 sm:p-5 rounded-xl transition duration-200 border-2 flex flex-col justify-between cursor-pointer group hover:scale-[1.01] active:scale-[0.99] ${
                  isCompleted 
                    ? 'border-emerald-500/70 bg-slate-900/95 hover:border-emerald-400' 
                    : 'border-slate-800 bg-slate-900 hover:border-amber-500/70'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-pixel text-[9px] sm:text-[10px] text-amber-400 uppercase tracking-widest">
                      ZONA BAB {chapter.id}
                    </span>
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tuntas ({score || 100}%)</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">
                        Belum Diuji
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {chapter.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
                    <span className="text-amber-400 font-pixel text-[9px]">Lencana:</span>
                    <span className="font-medium text-slate-200">{chapter.badgeReward.icon} {chapter.badgeReward.title}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 truncate">
                    {chapter.subChapters.length} Sub-Materi + Kuis RPG
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation();
                      retroSound.playBlip(); 
                      onSelectChapter(chapter.id); 
                    }}
                    className="cursor-pointer retro-btn bg-amber-500 group-hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shrink-0"
                  >
                    <span>Masuk Arena</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
