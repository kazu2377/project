import { supabase } from '../lib/supabase';
import { UserProgress, LevelInfo } from '../lib/types';

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Variables & Types', description: 'Learn about basic programming variables and data types', requiredToUnlock: 0 },
  { level: 2, title: 'Operators', description: 'Understand arithmetic, comparison, and logical operators', requiredToUnlock: 7 },
  { level: 3, title: 'Conditionals', description: 'Master if/else statements and conditional logic', requiredToUnlock: 7 },
  { level: 4, title: 'Loops', description: 'Explore for, while, and do-while loops', requiredToUnlock: 7 },
  { level: 5, title: 'Functions', description: 'Learn how to create and use functions', requiredToUnlock: 7 },
  { level: 6, title: 'Arrays', description: 'Work with arrays and basic array operations', requiredToUnlock: 7 },
  { level: 7, title: 'Objects', description: 'Understand object creation and manipulation', requiredToUnlock: 7 },
  { level: 8, title: 'Error Handling', description: 'Learn about try/catch and error handling', requiredToUnlock: 7 },
  { level: 9, title: 'Algorithms', description: 'Implement basic sorting and searching algorithms', requiredToUnlock: 7 },
  { level: 10, title: 'Data Structures', description: 'Explore advanced data structures', requiredToUnlock: 7 },
];

export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('level');

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      level: item.level,
      completedProblems: item.completed_problems,
      correctAnswers: item.correct_answers,
      accuracy: item.completed_problems > 0 
        ? (item.correct_answers / item.completed_problems) * 100 
        : 0,
      updatedAt: item.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
}

export function getLevelInfo(level: number): LevelInfo | undefined {
  return LEVELS.find(l => l.level === level);
}

export function isLevelUnlocked(progress: UserProgress[], level: number): boolean {
  // Level 1 is always unlocked
  if (level === 1) return true;
  
  // Get the previous level's progress
  const prevLevel = level - 1;
  const prevLevelProgress = progress.find(p => p.level === prevLevel);
  const prevLevelInfo = getLevelInfo(prevLevel);
  
  if (!prevLevelProgress || !prevLevelInfo) return false;
  
  // Check if the user has completed enough problems with sufficient accuracy
  return prevLevelProgress.correctAnswers >= prevLevelInfo.requiredToUnlock;
}

export function calculateOverallProgress(progress: UserProgress[]): number {
  if (!progress.length) return 0;
  
  const totalCorrect = progress.reduce((sum, p) => sum + p.correctAnswers, 0);
  const totalRequired = LEVELS.reduce((sum, level) => sum + level.requiredToUnlock, 0);
  
  return Math.min(100, Math.round((totalCorrect / totalRequired) * 100));
}