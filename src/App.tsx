import React, { useState, useEffect } from 'react';
import { 
  CHARACTERS, 
  CHAPTERS_DATA, 
  MOCK_STUDENTS 
} from './data/ipasData';
import { 
  StudentProgress, 
  StudentProfile 
} from './types/ipas';
import { Navbar } from './components/Navbar';
import { StudentQuestView } from './components/StudentQuestView';
import { ChapterMaterialView } from './components/ChapterMaterialView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { ParentPortalView } from './components/ParentPortalView';
import { LeaderboardView } from './components/LeaderboardView';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { BadgesModal } from './components/BadgesModal';

export default function App() {
  // Navigation & Modal States
  const [activeView, setActiveView] = useState<'quest' | 'material' | 'teacher' | 'parent' | 'leaderboard'>('quest');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('banu');
  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);

  // Student Progress State (Persistent)
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem('ipas_retro_progress_v3');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      selectedCharacterId: 'banu',
      playerName: 'Banu Al-Fatih',
      xp: 1450,
      coins: 380,
      level: 3,
      completedChapters: [1, 2],
      chapterScores: { 1: 100, 2: 90 },
      unlockedBadgeIds: ['badge_energi', 'badge_gaya', 'badge_combo'],
      streakDays: 4,
    };
  });

  // Students list state for Teacher & Parent view
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem('ipas_students_roster_v3');
      if (saved) return JSON.parse(saved);
    } catch {}
    return MOCK_STUDENTS;
  });

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem('ipas_retro_progress_v3', JSON.stringify(progress));
    } catch {}
  }, [progress]);

  // Save students
  useEffect(() => {
    try {
      localStorage.setItem('ipas_students_roster_v3', JSON.stringify(students));
    } catch {}
  }, [students]);

  // Get current active character & chapter
  const currentCharacter = CHARACTERS.find(c => c.id === selectedCharacterId) || CHARACTERS[0];
  const currentChapter = CHAPTERS_DATA.find(c => c.id === selectedChapterId) || CHAPTERS_DATA[0];

  // Handler for completing a chapter quiz
  const handleQuizComplete = (chapterId: number, score: number, xpGained: number) => {
    const updatedCompleted = Array.from(new Set([...progress.completedChapters, chapterId]));
    const updatedScores = { ...progress.chapterScores, [chapterId]: score };
    const newXp = progress.xp + xpGained;
    const newCoins = progress.coins + 50;
    const newLevel = Math.max(1, Math.floor(newXp / 500) + 1);

    // Corresponding badge
    const badgeMap: Record<number, string> = {
      1: 'badge_energi',
      2: 'badge_gaya',
      3: 'badge_peta',
      4: 'badge_iklim',
      5: 'badge_hayati',
      6: 'badge_peran',
      7: 'badge_budaya',
      8: 'badge_pahlawan'
    };
    const newBadgeId = badgeMap[chapterId];
    const updatedBadges = newBadgeId && !progress.unlockedBadgeIds.includes(newBadgeId)
      ? [...progress.unlockedBadgeIds, newBadgeId]
      : progress.unlockedBadgeIds;

    const newProgress = {
      ...progress,
      xp: newXp,
      coins: newCoins,
      level: newLevel,
      completedChapters: updatedCompleted,
      chapterScores: updatedScores,
      unlockedBadgeIds: updatedBadges,
    };
    setProgress(newProgress);

    // Sync current student in teacher roster
    setStudents(prev => prev.map(s => {
      if (s.name.includes('Banu')) {
        const studentScores = { ...s.chapterScores, [chapterId]: score };
        const scoreValues = Object.values(studentScores).filter(v => v > 0);
        const avg = Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);
        return {
          ...s,
          xp: newXp,
          coins: newCoins,
          completedChaptersCount: updatedCompleted.length,
          chapterScores: studentScores,
          averageScore: avg,
          needsRemedial: avg < 70,
          lastActivity: `Menyelesaikan Kuis Bab ${chapterId}: Nilai ${score}%`
        };
      }
      return s;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative w-full overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        character={currentCharacter}
        onOpenCharacterSelect={() => setShowCharacterModal(true)}
      />

      {/* Main App Container with responsive containment */}
      <main className="flex-1 px-3 sm:px-6 py-5 sm:py-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {/* VIEW 1: STUDENT QUEST WORLD MAP & ROSTER */}
        {activeView === 'quest' && (
          <StudentQuestView
            character={currentCharacter}
            progress={progress}
            onSelectChapter={(chapId) => {
              setSelectedChapterId(chapId);
              setActiveView('material');
            }}
            onOpenCharacterSelect={() => setShowCharacterModal(true)}
            onOpenBadges={() => setShowBadgesModal(true)}
            onOpenLeaderboard={() => setActiveView('leaderboard')}
          />
        )}

        {/* VIEW 2: CHAPTER MATERIAL, COMIC, EXPERIMENTS & QUIZ */}
        {activeView === 'material' && (
          <ChapterMaterialView
            chapter={currentChapter}
            character={currentCharacter}
            progress={progress}
            onBack={() => setActiveView('quest')}
            onCompleteQuiz={handleQuizComplete}
            onSelectChapter={(chapId) => setSelectedChapterId(chapId)}
          />
        )}

        {/* VIEW 3: TEACHER REAL-TIME DASHBOARD */}
        {activeView === 'teacher' && (
          <TeacherDashboardView
            students={students}
            onUpdateStudents={(updated) => setStudents(updated)}
          />
        )}

        {/* VIEW 4: PARENT PORTAL */}
        {activeView === 'parent' && (
          <ParentPortalView
            students={students}
          />
        )}

        {/* VIEW 5: LEADERBOARD */}
        {activeView === 'leaderboard' && (
          <LeaderboardView
            students={students}
            onBack={() => setActiveView('quest')}
          />
        )}
      </main>

      {/* MODAL: CHARACTER SELECT */}
      {showCharacterModal && (
        <CharacterSelectModal
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={(id) => setSelectedCharacterId(id)}
          onClose={() => setShowCharacterModal(false)}
        />
      )}

      {/* MODAL: BADGES & TROPHIES */}
      {showBadgesModal && (
        <BadgesModal
          unlockedBadgeIds={progress.unlockedBadgeIds}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {/* Retro Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500 w-full">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-pixel text-[9px] sm:text-[10px] text-amber-500">
            ★ IPAS SD KELAS 5 · KURIKULUM MERDEKA EDISI REVISI ★
          </span>
          <span className="text-[11px] text-slate-400">
            Berdasarkan Buku Panduan Resmi Amalia Fitri, dkk. (Kemendikbudristek)
          </span>
        </div>
      </footer>
    </div>
  );
}
