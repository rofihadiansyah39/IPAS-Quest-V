export interface Character {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  color: string;
  specialty: string;
  stats: {
    hp: number;
    atk: number;
    spd: number;
  };
}

export interface ComicDialogue {
  speaker: string;
  text: string;
  avatarId?: string;
  tag?: string;
}

export interface SubChapter {
  id: string;
  title: string;
  summary: string;
  points: string[];
  comicDialogue: ComicDialogue[];
  keyConcept: string;
  experimentTitle?: string;
  experimentSteps?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface Chapter {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  themeColor: string;
  bgGradient: string;
  worldZone: string;
  description: string;
  targetCompetency: string;
  simulationType: 'energy_converter' | 'friction_magnet' | 'plate_tectonics' | 'greenhouse_carbon' | 'biodiversity_map' | 'role_responsibilities' | 'unesco_culture' | 'four_m_sorter';
  subChapters: SubChapter[];
  quiz: QuizQuestion[];
  badgeReward: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  earnedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface StudentProgress {
  selectedCharacterId: string;
  playerName: string;
  xp: number;
  coins: number;
  level: number;
  completedChapters: number[];
  chapterScores: Record<number, number>; // chapterId -> score %
  unlockedBadgeIds: string[];
  streakDays: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  nisn: string;
  characterId: string;
  xp: number;
  coins: number;
  completedChaptersCount: number;
  averageScore: number;
  chapterScores: Record<number, number>; // 1 to 8
  status: 'online' | 'idle' | 'offline';
  lastActivity: string;
  needsRemedial: boolean;
  weakTopics: string[];
  parentName: string;
  parentPhone: string;
  parentCode: string;
  teacherNote?: string;
}
