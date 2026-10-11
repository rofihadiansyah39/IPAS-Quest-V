import React from 'react';
import { StudentProfile } from '../types/ipas';
import { Trophy, Medal, Award, Sparkles, ArrowLeft } from 'lucide-react';
import { retroSound } from '../utils/audio';

interface Props {
  students: StudentProfile[];
  onBack: () => void;
}

export const LeaderboardView: React.FC<Props> = ({ students, onBack }) => {
  // Sort students by XP descending
  const sorted = [...students].sort((a, b) => b.xp - a.xp);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button
          onClick={() => { retroSound.playBlip(); onBack(); }}
          className="retro-btn bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Petualangan</span>
        </button>

        <span className="font-pixel text-[10px] text-amber-400">
          MUSIM 1 · KELAS 5A
        </span>
      </div>

      {/* Header Trophy Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border-3 border-amber-500/60 shadow-xl text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-amber-300">
          <Trophy className="w-7 h-7" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-pixel">
          PAPAN PERINGKAT BINTANG SAINS
        </h1>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Kumpulkan poin XP dari setiap bab, tuntaskan kuis dengan combo streak, dan rebut tahta Cendekia Terbaik Kelas 5!
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Rank 2 */}
        {sorted[1] && (
          <div className="retro-card p-4 rounded-xl bg-slate-900 border-slate-700 text-center space-y-2 sm:order-1 sm:mt-6">
            <div className="font-pixel text-xs text-slate-400">🥈 JUARA 2</div>
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-500 mx-auto flex items-center justify-center font-pixel text-lg text-slate-300">
              {sorted[1].name[0]}
            </div>
            <div className="font-bold text-white text-sm">{sorted[1].name}</div>
            <div className="font-pixel text-xs text-amber-400">{sorted[1].xp} XP</div>
            <div className="text-[10px] text-slate-400">Rata-rata: {sorted[1].averageScore}%</div>
          </div>
        )}

        {/* Rank 1 */}
        {sorted[0] && (
          <div className="retro-card p-5 rounded-xl bg-slate-900 border-2 border-amber-400 text-center space-y-2.5 sm:order-2 shadow-2xl">
            <div className="font-pixel text-xs text-amber-300 animate-pulse">👑 JUARA 1</div>
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-3 border-amber-400 mx-auto flex items-center justify-center font-pixel text-xl text-amber-300">
              {sorted[0].name[0]}
            </div>
            <div className="font-bold text-white text-base">{sorted[0].name}</div>
            <div className="font-pixel text-sm text-amber-400">{sorted[0].xp} XP</div>
            <div className="text-xs text-emerald-400 font-semibold">Rata-rata: {sorted[0].averageScore}% · {sorted[0].completedChaptersCount} Bab</div>
          </div>
        )}

        {/* Rank 3 */}
        {sorted[2] && (
          <div className="retro-card p-4 rounded-xl bg-slate-900 border-slate-700 text-center space-y-2 sm:order-3 sm:mt-8">
            <div className="font-pixel text-xs text-amber-700">🥉 JUARA 3</div>
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-amber-800 mx-auto flex items-center justify-center font-pixel text-lg text-amber-500">
              {sorted[2].name[0]}
            </div>
            <div className="font-bold text-white text-sm">{sorted[2].name}</div>
            <div className="font-pixel text-xs text-amber-400">{sorted[2].xp} XP</div>
            <div className="text-[10px] text-slate-400">Rata-rata: {sorted[2].averageScore}%</div>
          </div>
        )}
      </div>

      {/* Roster Ranking List */}
      <div className="retro-card p-5 rounded-xl bg-slate-900 border-slate-800 space-y-3">
        <h3 className="text-xs font-pixel text-slate-300 uppercase tracking-wider">
          Peringkat Lengkap Peserta Didik
        </h3>

        <div className="space-y-2 text-xs">
          {sorted.map((st, idx) => (
            <div
              key={st.id}
              className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                idx < 3 ? 'bg-slate-950 border-amber-500/30' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded flex items-center justify-center font-pixel text-[10px] font-bold ${
                  idx === 0 ? 'bg-amber-400 text-slate-950' :
                  idx === 1 ? 'bg-slate-400 text-slate-950' :
                  idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {idx + 1}
                </span>
                <span className="font-bold text-white">{st.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-[11px] font-mono">
                  {st.completedChaptersCount} Bab Tuntas
                </span>
                <span className="font-pixel text-amber-400 text-[11px]">
                  {st.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
