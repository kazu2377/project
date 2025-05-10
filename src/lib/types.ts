export interface User {
  id: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
}

export interface Problem {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  level: number;
  language: ProgrammingLanguage;
  createdAt: string;
}

export interface UserAnswer {
  id: string;
  userId: string;
  problemId: string;
  selectedOption: number;
  isCorrect: boolean;
  answeredAt: string;
  problem?: Problem;
}

export interface UserProgress {
  id: string;
  userId: string;
  level: number;
  completedProblems: number;
  correctAnswers: number;
  accuracy: number;
  updatedAt: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  description: string;
  requiredToUnlock: number;
}

export type ProgrammingLanguage = 'javascript' | 'csharp' | 'accessvba' | 'sql' | 'uipath' | 'html';

export const PROGRAMMING_LANGUAGES: Record<ProgrammingLanguage, string> = {
  javascript: 'JavaScript',
  csharp: 'C#',
  accessvba: 'Access VBA',
  sql: 'SQL',
  uipath: 'UiPath',
  html: 'HTML'
};