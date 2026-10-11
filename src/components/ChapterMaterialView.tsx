import React, { useState } from 'react';
import { Chapter, Character, StudentProgress } from '../types/ipas';
import { InteractiveSimulations } from './InteractiveSimulations';
import { RetroQuizGame } from './RetroQuizGame';
import { retroSound } from '../utils/audio';
import { 
  BookOpen, 
  Sparkles, 
  Play, 
  FlaskConical, 
  MessageSquare, 
  ArrowLeft, 
  CheckCircle, 
  Trophy, 
  Compass,
  ArrowRight,
  ChevronRight,
  Award,
  HelpCircle
} from 'lucide-react';

interface Props {
  chapter: Chapter;
  character: Character;
  progress: StudentProgress;
  onBack: () => void;
  onCompleteQuiz: (chapterId: number, score: number, xpGained: number) => void;
  onSelectChapter?: (chapterId: number) => void;
}

export const ChapterMaterialView: React.FC<Props> = ({
  chapter,
  character,
  progress,
  onBack,
  onCompleteQuiz,
  onSelectChapter,
}) => {
  // 3-Step Guided Learning Flow: 'material' -> 'simulation' -> 'quiz'
  const [learningStep, setLearningStep] = useState<'material' | 'simulation' | 'quiz'>('material');
  const [activeSubId, setActiveSubId] = useState<string>(chapter.subChapters[0]?.id || '1a');
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);

  // Update activeSubId if chapter changes
  React.useEffect(() => {
    if (chapter.subChapters[0]) {
      setActiveSubId(chapter.subChapters[0].id);
      setLearningStep('material');
    }
  }, [chapter.id]);

  const currentSub = chapter.subChapters.find(s => s.id === activeSubId) || chapter.subChapters[0];
  const isCompleted = progress.completedChapters.includes(chapter.id);
  const previousScore = progress.chapterScores[chapter.id];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 w-full px-1 sm:px-2 overflow-x-hidden">
      {/* 1. Quick Chapter Switcher Strip */}
      <div className="bg-slate-900/90 p-2 sm:p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 overflow-x-auto w-full">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[9px] font-pixel text-slate-400 px-1 shrink-0">PILIH BAB:</span>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(chNum => {
            const isCurrent = chapter.id === chNum;
            const isDone = progress.completedChapters.includes(chNum);
            return (
              <button
                key={chNum}
                type="button"
                onClick={() => {
                  retroSound.playBlip();
                  if (onSelectChapter) onSelectChapter(chNum);
                }}
                className={`cursor-pointer px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  isCurrent 
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300' 
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{isDone ? '✓' : `★`} Bab {chNum}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => { retroSound.playBlip(); onBack(); }}
          className="cursor-pointer retro-btn bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Peta Petualangan</span>
        </button>
      </div>

      {/* 2. Compact Chapter Banner */}
      <div className={`p-4 sm:p-6 rounded-xl bg-gradient-to-r ${chapter.bgGradient} border-2 border-amber-500/60 shadow-xl space-y-2 relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-pixel text-amber-400">
              <Compass className="w-3.5 h-3.5" />
              <span>ZONA: {chapter.worldZone}</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-white mt-0.5">
              {chapter.title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5 max-w-xl">
              {chapter.subtitle}
            </p>
          </div>

          {isCompleted && (
            <div className="bg-emerald-950/80 border border-emerald-500 px-3 py-1.5 rounded-lg text-emerald-300 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shrink-0">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Tuntas · Nilai: {previousScore || 100}%</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. 3-STEP GUIDED LEARNING STEPPER (TERARAH, TIDAK MENUMPUK) */}
      <div className="grid grid-cols-3 gap-2 bg-slate-900/95 p-1.5 rounded-xl border border-slate-800 text-center">
        <button
          type="button"
          onClick={() => { setLearningStep('material'); retroSound.playBlip(); }}
          className={`cursor-pointer py-2 px-1 sm:px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
            learningStep === 'material'
              ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span className="truncate">1. Pahami Materi</span>
        </button>

        <button
          type="button"
          onClick={() => { setLearningStep('simulation'); retroSound.playBlip(); }}
          className={`cursor-pointer py-2 px-1 sm:px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
            learningStep === 'simulation'
              ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-300'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4 shrink-0" />
          <span className="truncate">2. Percobaan Virtual</span>
        </button>

        <button
          type="button"
          onClick={() => { setLearningStep('quiz'); retroSound.playBlip(); }}
          className={`cursor-pointer py-2 px-1 sm:px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
            learningStep === 'quiz'
              ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4 shrink-0" />
          <span className="truncate">3. Kuis RPG</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LANGKAH 1: MATERI RINGKAS & KOMIK KARAKTER                               */}
      {/* ========================================================================= */}
      {learningStep === 'material' && currentSub && (
        <div className="space-y-5 animate-fadeIn">
          {/* Sub-Chapter Selection Pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {chapter.subChapters.map(sub => (
              <button
                key={sub.id}
                type="button"
                onClick={() => { retroSound.playBlip(); setActiveSubId(sub.id); }}
                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeSubId === sub.id 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500 font-bold' 
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{sub.title}</span>
              </button>
            ))}
          </div>

          {/* Bite-sized Material Card */}
          <div className="retro-card p-5 sm:p-6 rounded-xl bg-slate-900 border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-pixel text-amber-400">BAGIAN PEMBELAJARAN</span>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {currentSub.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {currentSub.summary}
              </p>
            </div>

            {/* Key points (clean & clear for SD students) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                Poin Penting untuk Diingat:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSub.points.map((pt, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comic Dialogue between Characters */}
            {currentSub.comicDialogue && currentSub.comicDialogue.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Obrolan Seru Para Penjelajah Cilik:</span>
                </span>
                <div className="space-y-2">
                  {currentSub.comicDialogue.map((dialogue, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-3 text-xs"
                    >
                      <div className="w-7 h-7 rounded bg-amber-500 text-slate-950 font-pixel text-[10px] flex items-center justify-center font-bold shrink-0">
                        {dialogue.speaker[0]}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-amber-300 text-[11px]">{dialogue.speaker}</div>
                        <p className="text-slate-300 leading-relaxed">&ldquo;{dialogue.text}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stepper Forward Action */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-500">
              Langkah 1 dari 3 selesai
            </span>
            <button
              type="button"
              onClick={() => { setLearningStep('simulation'); retroSound.playBlip(); }}
              className="cursor-pointer retro-btn bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center gap-2"
            >
              <span>Lanjut ke Percobaan Sains Virtual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 2: LABORATORIUM PERCOBAAN VIRTUAL                                 */}
      {/* ========================================================================= */}
      {learningStep === 'simulation' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Interactive Simulation Deck */}
          <InteractiveSimulations chapter={chapter} />

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => { setLearningStep('material'); retroSound.playBlip(); }}
              className="cursor-pointer text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Materi</span>
            </button>

            <button
              type="button"
              onClick={() => { setLearningStep('quiz'); retroSound.playBlip(); }}
              className="cursor-pointer retro-btn bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center gap-2"
            >
              <span>Lanjut ke Uji Kuis Bab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 3: ARENA KUIS RPG & LENCANA                                      */}
      {/* ========================================================================= */}
      {learningStep === 'quiz' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="retro-card p-6 sm:p-8 rounded-xl bg-slate-900 border-2 border-purple-500/60 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 mx-auto flex items-center justify-center text-3xl">
              {chapter.badgeReward.icon}
            </div>

            <div>
              <span className="font-pixel text-[10px] text-purple-300 uppercase tracking-widest">
                Tantangan Terakhir Bab {chapter.id}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Arena Kuis RPG Sains: {chapter.shortTitle}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Uji pemahaman materi dan percobaan virtualmu dalam tantangan kuis 5 soal seru!
              </p>
            </div>

            {/* Rules & Reward Grid */}
            <div className="grid grid-cols-3 gap-2 text-xs bg-slate-950 p-3.5 rounded-lg border border-slate-800">
              <div className="p-2">
                <div className="text-slate-400 text-[10px]">Nyawa:</div>
                <div className="font-pixel text-xs text-red-400 mt-0.5">❤️❤️❤️ 3 Hati</div>
              </div>
              <div className="p-2">
                <div className="text-slate-400 text-[10px]">Target KKM:</div>
                <div className="font-pixel text-xs text-emerald-400 mt-0.5">Minimal 70%</div>
              </div>
              <div className="p-2">
                <div className="text-slate-400 text-[10px]">Hadiah XP:</div>
                <div className="font-pixel text-xs text-amber-400 mt-0.5">+250 XP</div>
              </div>
            </div>

            {/* Badge Preview */}
            <div className="bg-slate-950/70 p-3 rounded-lg border border-purple-800/50 flex items-center gap-3 text-left">
              <div className="text-2xl p-2 bg-purple-900/30 rounded border border-purple-700">
                {chapter.badgeReward.icon}
              </div>
              <div>
                <div className="font-bold text-white text-xs">
                  Lencana: {chapter.badgeReward.title}
                </div>
                <div className="text-[11px] text-slate-400">
                  {chapter.badgeReward.description}
                </div>
              </div>
            </div>

            {/* Big Launch Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => { retroSound.playLevelUp(); setShowQuizModal(true); }}
                className="cursor-pointer retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 px-8 rounded-xl text-sm w-full flex items-center justify-center gap-2 shadow-xl"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>MULAI GAME KUIS SEKARANG!</span>
              </button>
            </div>
          </div>

          <div className="flex justify-start pt-2">
            <button
              type="button"
              onClick={() => { setLearningStep('simulation'); retroSound.playBlip(); }}
              className="cursor-pointer text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Percobaan Sains Virtual</span>
            </button>
          </div>
        </div>
      )}

      {/* QUIZ MODAL */}
      {showQuizModal && (
        <RetroQuizGame
          chapter={chapter}
          character={character}
          progress={progress}
          onQuizComplete={(chapId, score, xp) => {
            onCompleteQuiz(chapId, score, xp);
          }}
          onClose={() => setShowQuizModal(false)}
        />
      )}
    </div>
  );
};
