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
  HelpCircle,
  Trophy,
  Compass
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
  const [activeSubId, setActiveSubId] = useState<string>(chapter.subChapters[0]?.id || '1a');
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);

  // Update activeSubId if chapter changes
  React.useEffect(() => {
    if (chapter.subChapters[0]) {
      setActiveSubId(chapter.subChapters[0].id);
    }
  }, [chapter.id]);

  const currentSub = chapter.subChapters.find(s => s.id === activeSubId) || chapter.subChapters[0];
  const isCompleted = progress.completedChapters.includes(chapter.id);
  const previousScore = progress.chapterScores[chapter.id];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 w-full px-1 sm:px-2 overflow-x-hidden">
      {/* Chapter Quick Switcher Strip */}
      <div className="bg-slate-900/90 p-2 sm:p-2.5 rounded-xl border border-slate-800 flex items-center gap-1.5 overflow-x-auto w-full">
        <span className="text-[9px] sm:text-[10px] font-pixel text-slate-400 px-1 sm:px-2 shrink-0">BAB:</span>
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
              className={`cursor-pointer px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1 ${
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

      {/* Top Bar Navigation back to World Map */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={() => { retroSound.playBlip(); onBack(); }}
          className="cursor-pointer retro-btn bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {isCompleted && (
            <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/60 px-2.5 py-1 rounded text-emerald-300 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Tuntas ({previousScore || 100}%)</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => { retroSound.playLevelUp(); setShowQuizModal(true); }}
            className="cursor-pointer retro-btn retro-btn-gold px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mulai Game Kuis</span>
          </button>
        </div>
      </div>

      {/* Chapter Banner */}
      <div className={`p-5 sm:p-7 rounded-xl bg-gradient-to-r ${chapter.bgGradient} border-3 border-amber-500/60 shadow-xl space-y-3 relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-pixel text-amber-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Zona: {chapter.worldZone}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
              {chapter.title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              {chapter.subtitle}
            </p>
          </div>

          <div className="bg-slate-900/90 p-3 sm:p-4 rounded-xl border border-slate-700/80 shrink-0 text-left sm:text-right">
            <div className="text-[9px] font-pixel text-slate-400">Target Belajar:</div>
            <div className="text-xs font-semibold text-emerald-400 mt-0.5 max-w-xs">
              {chapter.targetCompetency}
            </div>
          </div>
        </div>

        {/* Sub-Chapter Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-slate-800 overflow-x-auto">
          {chapter.subChapters.map(sub => (
            <button
              key={sub.id}
              onClick={() => { retroSound.playBlip(); setActiveSubId(sub.id); }}
              className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubId === sub.id 
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300' 
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{sub.title.split('.')[0] || sub.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Material Card */}
      {currentSub && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Content and Comic Dialog */}
          <div className="lg:col-span-2 space-y-6">
            {/* Core Summary Card */}
            <div className="retro-card p-6 rounded-xl bg-slate-900 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  {currentSub.title[0]}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {currentSub.title}
                  </h2>
                  <p className="text-xs text-slate-400">{currentSub.summary}</p>
                </div>
              </div>

              {/* Points */}
              <div className="space-y-2.5">
                <span className="text-xs font-pixel text-amber-400">Poin Kunci Penyelidikan:</span>
                <div className="grid grid-cols-1 gap-2">
                  {currentSub.points.map((pt, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5"
                    >
                      <span className="font-pixel text-[10px] text-amber-500 shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Concept Callout */}
              <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-lg text-xs space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Kesimpulan Esensial:</span>
                </div>
                <p className="text-slate-300">{currentSub.keyConcept}</p>
              </div>
            </div>

            {/* Comic Dialogue between Characters */}
            {currentSub.comicDialogue && currentSub.comicDialogue.length > 0 && (
              <div className="retro-card p-6 rounded-xl bg-slate-900 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span>Obrolan Detektif Sains: Banu & Kawan-kawan</span>
                  </h3>
                  <span className="text-[10px] font-pixel text-slate-400">Komik Belajar</span>
                </div>

                <div className="space-y-3">
                  {currentSub.comicDialogue.map((dialogue, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                        dialogue.speaker === 'Mia' || dialogue.speaker === 'Dara'
                          ? 'bg-purple-950/30 border-purple-800/60'
                          : dialogue.speaker === 'Ian'
                          ? 'bg-red-950/30 border-red-800/60'
                          : dialogue.speaker === 'Aga'
                          ? 'bg-blue-950/30 border-blue-800/60'
                          : 'bg-amber-950/30 border-amber-800/60'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-pixel text-xs text-amber-400 shrink-0">
                        {dialogue.speaker[0]}
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{dialogue.speaker}</span>
                          <span className="text-[10px] text-slate-400">· Anggota Squad</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">&ldquo;{dialogue.text}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Experiment Activity & Badge Preview */}
          <div className="space-y-6">
            {/* Practical Experiment Card */}
            {currentSub.experimentTitle && (
              <div className="retro-card p-5 rounded-xl bg-slate-900 space-y-3 border-emerald-600/50">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <FlaskConical className="w-4 h-4" />
                  <span>Ayo Menyelidiki Mandiri!</span>
                </div>
                <h4 className="text-xs font-bold text-white">
                  {currentSub.experimentTitle}
                </h4>
                <div className="space-y-2 text-xs">
                  {currentSub.experimentSteps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Badge Info */}
            <div className="retro-card p-5 rounded-xl bg-slate-900 space-y-3 border-amber-500/40 text-center">
              <span className="text-[10px] font-pixel text-amber-400 uppercase">Hadiah Lencana Bab Ini</span>
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl">
                {chapter.badgeReward.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {chapter.badgeReward.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {chapter.badgeReward.description}
                </p>
              </div>
              <button
                onClick={() => { retroSound.playLevelUp(); setShowQuizModal(true); }}
                className="retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs w-full flex items-center justify-center gap-2 mt-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Tantang Kuis Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Virtual Lab Simulation Section */}
      <div className="pt-4">
        <InteractiveSimulations chapter={chapter} />
      </div>

      {/* Modal Quiz */}
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
