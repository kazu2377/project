import { supabase } from "../lib/supabase";
import { LevelInfo, UserProgress } from "../lib/types";

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: "変数と基本データ型",
    description: "変数の宣言、数値、文字列、真偽値などの基本的なデータ型について学びます",
    requiredToUnlock: 0,
  },
  {
    level: 2,
    title: "演算子と式",
    description: "算術演算子、比較演算子、論理演算子を使って式を作成する方法を学びます",
    requiredToUnlock: 7,
  },
  {
    level: 3,
    title: "条件分岐",
    description: "if/else文、switch文を使って条件に基づいて処理を分岐させる方法を学びます",
    requiredToUnlock: 7,
  },
  {
    level: 4,
    title: "ループと反復処理",
    description: "for文、while文を使って繰り返し処理を行う方法を学びます",
    requiredToUnlock: 7,
  },
  {
    level: 5,
    title: "関数とスコープ",
    description: "関数の定義、引数、戻り値、変数のスコープについて学びます",
    requiredToUnlock: 7,
  },
  {
    level: 6,
    title: "配列と配列操作",
    description: "配列の作成、要素の追加・削除、配列メソッドの使用方法を学びます",
    requiredToUnlock: 7,
  },
  {
    level: 7,
    title: "オブジェクトと参照",
    description: "オブジェクトの作成、プロパティの操作、参照の概念について学びます",
    requiredToUnlock: 7,
  },
  {
    level: 8,
    title: "エラー処理とデバッグ",
    description: "try/catch文を使ったエラー処理、デバッグの基本テクニックを学びます",
    requiredToUnlock: 7,
  },
  {
    level: 9,
    title: "アルゴリズムの基礎",
    description: "基本的なソートアルゴリズム、検索アルゴリズムについて学びます",
    requiredToUnlock: 7,
  },
  {
    level: 10,
    title: "データ構造とアルゴリズム応用",
    description: "高度なデータ構造とアルゴリズムの実装方法について学びます",
    requiredToUnlock: 7,
  },
];

export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .order("level");

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      level: item.level,
      completedProblems: item.completed_problems,
      correctAnswers: item.correct_answers,
      accuracy:
        item.completed_problems > 0 ? (item.correct_answers / item.completed_problems) * 100 : 0,
      updatedAt: item.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
}

export function getLevelInfo(level: number): LevelInfo | undefined {
  return LEVELS.find((l) => l.level === level);
}

export function isLevelUnlocked(progress: UserProgress[], level: number): boolean {
  // Level 1 is always unlocked
  if (level === 1) return true;

  // Get the previous level's progress
  const prevLevel = level - 1;
  const prevLevelProgress = progress.find((p) => p.level === prevLevel);
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
