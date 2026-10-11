import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Chapter, Character, StudentProgress } from '../types/ipas';
import { retroSound } from '../utils/audio';
import { 
  Heart, 
  Sparkles, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  Flame,
  ShieldAlert
} from 'lucide-react';

interface Props {
  chapter: Chapter;
  character: Character;
  progress: StudentProgress;
  onQuizComplete: (chapterId: number, score: number, xpGained: number) => void;
  onClose: () => void;
}

export const RetroQuizGame: React.FC<Props> = ({
  chapter,
  character,
  progress,
  onQuizComplete,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [hearts, setHearts] = useState<number>(3);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  const questions = chapter.quiz;
  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isGameOver || isVictory) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      retroSound.playCorrect();
      setCorrectAnswersCount(prev => prev + 1);
      const newCombo = comboStreak + 1;
      setComboStreak(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      if (newCombo >= 3) {
        retroSound.playCoin();
      }
    } else {
      retroSound.playError();
      setComboStreak(0);
      const remainingHearts = hearts - 1;
      setHearts(remainingHearts);
      if (remainingHearts <= 0) {
        setIsGameOver(true);
      }
    }
  };

  const handleNextQuestion = () => {
    retroSound.playBlip();
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished all questions!
      const finalScore = Math.round((correctAnswersCount / totalQuestions) * 100);
      const xpGained = finalScore >= 70 ? 250 : 100;
      setIsVictory(true);
      retroSound.playLevelUp();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onQuizComplete(chapter.id, finalScore, xpGained);
    }
  };

  const handleRestart = () => {
    retroSound.playBlip();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setHearts(3);
    setCorrectAnswersCount(0);
    setComboStreak(0);
    setIsGameOver(false);
    setIsVictory(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-900 border-4 border-amber-500 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Retro Battle Top HUD */}
        <div className="bg-slate-950 px-4 py-3 border-b-2 border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-500 text-slate-950 font-pixel text-xs flex items-center justify-center font-bold">
              {character.name[0]}
            </div>
            <div>
              <div className="font-pixel text-[10px] text-amber-400">
                {character.name} · {character.role}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[1, 2, 3].map(heartIdx => (
                  <Heart
                    key={heartIdx}
                    className={`w-4 h-4 ${
                      heartIdx <= hearts ? 'text-red-500 fill-red-500' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {comboStreak >= 2 && (
              <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500 text-amber-300 font-pixel text-[10px] animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>COMBO x{comboStreak}!</span>
              </div>
            )}
            <div className="text-right">
              <span className="font-pixel text-[10px] text-slate-400">SOAL:</span>
              <div className="font-pixel text-xs text-white">
                {currentQuestionIndex + 1} / {totalQuestions}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div 
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-7 space-y-6 flex-1">
          {/* GAME OVER STATE */}
          {isGameOver ? (
            <div className="text-center py-8 space-y-4">
              <ShieldAlert className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
              <h3 className="font-pixel text-xl text-red-400">HATI HABIS! MISI GAGAL</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Jangan berkecil hati! Pelajari kembali materi {chapter.title} dan coba lagi untuk mendapatkan lencana prestasi.
              </p>
              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={handleRestart}
                  className="retro-btn bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded text-xs flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Coba Ulang Kuis
                </button>
                <button
                  onClick={onClose}
                  className="retro-btn bg-slate-800 text-slate-300 font-bold px-4 py-2.5 rounded text-xs"
                >
                  Kembali ke Materi
                </button>
              </div>
            </div>
          ) : isVictory ? (
            /* VICTORY STATE */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl">
                {chapter.badgeReward.icon}
              </div>
              <div>
                <span className="font-pixel text-xs text-amber-400 tracking-widest uppercase">Misi Selesai!</span>
                <h3 className="font-pixel text-lg sm:text-xl text-white mt-1">
                  SELAMAT, PETUALANG CERDAS!
                </h3>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 max-w-md mx-auto grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Nilai Akhir:</div>
                  <div className="font-pixel text-lg text-emerald-400 mt-0.5">
                    {Math.round((correctAnswersCount / totalQuestions) * 100)}%
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {correctAnswersCount} dari {totalQuestions} benar
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">XP Hadiah:</div>
                  <div className="font-pixel text-lg text-amber-400 mt-0.5">
                    +{Math.round((correctAnswersCount / totalQuestions) * 100) >= 70 ? '250' : '100'} XP
                  </div>
                  <div className="text-[10px] text-slate-500">Koin Sains +50</div>
                </div>
              </div>

              {/* Badge Earned Card */}
              <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-950 p-4 rounded-xl border border-amber-500/50 max-w-md mx-auto flex items-center gap-3 text-left">
                <div className="text-3xl p-2 bg-amber-500/20 rounded-lg border border-amber-500/40">
                  {chapter.badgeReward.icon}
                </div>
                <div>
                  <div className="font-pixel text-xs text-amber-300">
                    Lencana Terbuka: {chapter.badgeReward.title}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {chapter.badgeReward.description}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="retro-btn bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded text-xs flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Klaim Hadiah & Kembali
                </button>
                <button
                  onClick={handleRestart}
                  className="retro-btn bg-slate-800 text-slate-300 font-bold px-4 py-2.5 rounded text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Main Lagi
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE QUESTION STATE */
            <div className="space-y-5">
              {/* Question Context & Prompt */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Konteks Cerita: {currentQ.context}</span>
                </div>
                <h4 className="text-base font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  let btnStyle = 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700';

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/60 font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-950/80 border-red-500 text-red-200 ring-2 ring-red-500/60';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`retro-btn w-full p-3.5 rounded-lg border-2 text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-slate-950 text-amber-400 font-pixel text-[10px] flex items-center justify-center shrink-0 border border-slate-700">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Callout */}
              {isAnswered && (
                <div className={`p-4 rounded-lg border text-xs leading-relaxed space-y-1.5 animate-fadeIn ${
                  selectedOption === currentQ.correctIndex 
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-600/60 text-amber-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {selectedOption === currentQ.correctIndex ? '✓ Jawaban Tepat!' : '✕ Penjelasan Sains:'}
                  </div>
                  <p className="text-slate-300">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Question Button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="retro-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded text-xs flex items-center gap-2"
                  >
                    <span>Lanjut ke Soal Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
