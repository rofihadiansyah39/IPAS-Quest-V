import React, { useState } from 'react';
import { Character } from '../types/ipas';
import { retroSound } from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  activeView: 'quest' | 'material' | 'teacher' | 'parent' | 'leaderboard';
  onNavigate: (view: 'quest' | 'material' | 'teacher' | 'parent' | 'leaderboard') => void;
  character: Character;
  onOpenCharacterSelect: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  onNavigate,
  character,
  onOpenCharacterSelect,
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    retroSound.enabled = next;
    if (next) retroSound.playCoin();
  };

  const navItems = [
    { id: 'quest', label: 'Peta Petualangan', icon: '🗺️' },
    { id: 'material', label: 'Materi & Kuis', icon: '📖' },
    { id: 'leaderboard', label: 'Peringkat', icon: '🏆' },
    { id: 'teacher', label: 'Guru', icon: '👨‍🏫' },
    { id: 'parent', label: 'Orang Tua', icon: '👪' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b-2 border-amber-500/80 shadow-xl w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => { retroSound.playBlip(); onNavigate('quest'); }}
          className="cursor-pointer text-left whitespace-nowrap shrink-0 group flex items-center gap-1.5 sm:gap-2"
        >
          <span className="font-pixel text-[11px] sm:text-xs md:text-sm text-amber-400 group-hover:text-amber-300 transition tracking-wider">
            ⚔️ IPAS QUEST
          </span>
          <span className="hidden md:inline-block text-[9px] font-pixel bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
            KELAS 5 SD
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop lg screens) */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-300">
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => { retroSound.playBlip(); onNavigate(item.id); }}
              className={`cursor-pointer px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeView === item.id 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 font-bold' 
                  : 'hover:text-amber-400 hover:bg-slate-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Audio Sound & Character Switch) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Matikan Suara 8-Bit' : 'Nyalakan Suara 8-Bit'}
            className={`cursor-pointer p-1.5 sm:p-2 rounded-lg border text-xs transition ${
              soundEnabled 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Character Quick Button */}
          <button
            type="button"
            onClick={() => { retroSound.playBlip(); onOpenCharacterSelect(); }}
            className="cursor-pointer retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow"
          >
            <span className="w-4 h-4 rounded bg-slate-950 text-amber-300 font-pixel text-[9px] flex items-center justify-center">
              {character.name[0]}
            </span>
            <span className="font-pixel text-[10px] hidden xs:inline">{character.name}</span>
          </button>
        </div>
      </div>

      {/* Responsive Navigation Strip (Mobile & Tablet) */}
      <div className="flex lg:hidden items-center justify-between bg-slate-900 px-2 py-1.5 border-t border-slate-800 text-[11px] overflow-x-auto gap-1">
        {navItems.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => { retroSound.playBlip(); onNavigate(item.id); }}
            className={`cursor-pointer px-2 py-1 rounded-md whitespace-nowrap text-center flex-1 min-w-[62px] transition ${
              activeView === item.id 
                ? 'text-amber-300 font-bold bg-slate-950 border border-amber-500/40 shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs">{item.icon}</div>
            <div className="text-[10px] truncate">{item.label}</div>
          </button>
        ))}
      </div>
    </header>
  );
};
