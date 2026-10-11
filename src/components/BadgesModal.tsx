import React from 'react';
import { Badge } from '../types/ipas';
import { INITIAL_BADGES } from '../data/ipasData';
import { Award, Lock, Sparkles, X } from 'lucide-react';
import { retroSound } from '../utils/audio';

interface Props {
  unlockedBadgeIds: string[];
  onClose: () => void;
}

export const BadgesModal: React.FC<Props> = ({ unlockedBadgeIds, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-4 border-amber-500 rounded-xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-pixel text-sm sm:text-base text-white">
                LEMARI LENCANA PRESTASI
              </h2>
              <span className="text-xs text-slate-400">
                {unlockedBadgeIds.length} dari {INITIAL_BADGES.length} Lencana Berhasil Dikoleksi
              </span>
            </div>
          </div>
          <button
            onClick={() => { retroSound.playBlip(); onClose(); }}
            className="text-slate-400 hover:text-white font-pixel text-sm p-1"
          >
            ✕
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INITIAL_BADGES.map(badge => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border-2 flex items-start gap-3 transition ${
                  isUnlocked 
                    ? 'bg-slate-950 border-amber-500/70 shadow-lg' 
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${
                  isUnlocked 
                    ? 'bg-amber-500/20 border-amber-400 shadow' 
                    : 'bg-slate-900 border-slate-700 text-slate-600'
                }`}>
                  {isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-600" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{badge.title}</span>
                    <span className={`text-[9px] font-pixel px-1.5 py-0.5 rounded ${
                      badge.rarity === 'Legendary' ? 'bg-amber-500 text-slate-950' :
                      badge.rarity === 'Epic' ? 'bg-purple-600 text-white' :
                      badge.rarity === 'Rare' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {badge.description}
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {isUnlocked ? '✓ Sudah Terbuka' : '🔒 Belum Terbuka'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={() => { retroSound.playBlip(); onClose(); }}
            className="retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-xs"
          >
            Tutup Lemari
          </button>
        </div>
      </div>
    </div>
  );
};
