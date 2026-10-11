import React, { useState } from 'react';
import { CharacterWithDialogue } from '../data/ipasData';
import { CHARACTERS } from '../data/ipasData';
import { retroSound } from '../utils/audio';
import { Sparkles, Shield, Swords, Zap, Check, MessageSquareQuote, HeartHandshake, HelpCircle } from 'lucide-react';

interface Props {
  selectedCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<Props> = ({
  selectedCharacterId,
  onSelectCharacter,
  onClose,
}) => {
  const [inspectedCharacter, setInspectedCharacter] = useState<CharacterWithDialogue>(
    (CHARACTERS.find(c => c.id === selectedCharacterId) as CharacterWithDialogue) || CHARACTERS[0]
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border-4 border-amber-500 rounded-xl max-w-4xl w-full p-5 sm:p-7 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-[10px] font-pixel text-amber-400">CHARACTER SELECT & VOICE ROSTER</div>
            <h2 className="font-pixel text-base sm:text-lg text-white mt-0.5">
              PILIH KARAKTER PEMANDU SAINS KELAS 5
            </h2>
          </div>
          <button
            onClick={() => { retroSound.playBlip(); onClose(); }}
            className="text-slate-400 hover:text-white font-pixel text-sm p-1"
          >
            ✕
          </button>
        </div>

        {/* Character cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {CHARACTERS.map(c => {
            const isSelected = c.id === selectedCharacterId;
            const isInspected = c.id === inspectedCharacter.id;

            return (
              <button
                key={c.id}
                onClick={() => {
                  setInspectedCharacter(c as CharacterWithDialogue);
                  retroSound.playBlip();
                }}
                className={`p-3 rounded-xl border-2 text-center transition flex flex-col items-center justify-between gap-2 ${
                  isInspected 
                    ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-400 shadow-xl' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-pixel text-base text-slate-950 font-bold border border-slate-900 shadow"
                  style={{ backgroundColor: c.color }}
                >
                  {c.name[0]}
                </div>
                <div>
                  <h4 className="font-pixel text-xs text-white">{c.name}</h4>
                  <div className="text-[10px] text-amber-400 font-medium truncate">{c.title}</div>
                </div>
                {isSelected && (
                  <span className="text-[9px] font-pixel bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded">
                    AKTIF
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Inspected Character Dialogue Showcase */}
        {inspectedCharacter && (
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-pixel text-lg text-slate-950 font-bold"
                  style={{ backgroundColor: inspectedCharacter.color }}
                >
                  {inspectedCharacter.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <span>{inspectedCharacter.name}</span>
                    <span className="text-xs text-amber-400 font-pixel">({inspectedCharacter.title})</span>
                  </h3>
                  <p className="text-xs text-slate-400">{inspectedCharacter.role} · Keahlian: {inspectedCharacter.specialty}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  retroSound.playCoin();
                  onSelectCharacter(inspectedCharacter.id);
                  onClose();
                }}
                className="retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-xs self-start sm:self-auto"
              >
                ✓ Pilih Karakter Ini
              </button>
            </div>

            {/* 4 Interactive Dialogue Quotes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-pixel text-cyan-400 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  Gaya Memandu Siswa
                </span>
                <p className="text-slate-300 italic">&ldquo;{inspectedCharacter.dialogues.guideVoice}&rdquo;</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-pixel text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Saat Memberikan Kuis
                </span>
                <p className="text-slate-300 italic">&ldquo;{inspectedCharacter.dialogues.quizPrompt}&rdquo;</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-pixel text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Apresiasi & Pujian Jawaban Benar
                </span>
                <p className="text-slate-300 italic">&ldquo;{inspectedCharacter.dialogues.victoryPraise}&rdquo;</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-pixel text-pink-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Semangat Remedial & Bimbingan
                </span>
                <p className="text-slate-300 italic">&ldquo;{inspectedCharacter.dialogues.remedialCheer}&rdquo;</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={() => { retroSound.playBlip(); onClose(); }}
            className="retro-btn bg-slate-800 text-slate-300 px-5 py-2 rounded text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

