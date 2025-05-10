import { Award, BarChart3, Zap } from "lucide-react";
import React from "react";
import { UserProgress } from "../../lib/types";
import { LEVELS, calculateOverallProgress } from "../../services/progress.service";

interface ProgressOverviewProps {
  progress: UserProgress[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ progress }) => {
  const overallProgress = calculateOverallProgress(progress);
  const totalProblems = progress.reduce((sum, p) => sum + p.completedProblems, 0);
  const totalCorrect = progress.reduce((sum, p) => sum + p.correctAnswers, 0);
  const overallAccuracy = totalProblems > 0 ? Math.round((totalCorrect / totalProblems) * 100) : 0;

  // Find highest level with progress
  const highestLevelWithProgress =
    progress.filter((p) => p.completedProblems > 0).sort((a, b) => b.level - a.level)[0]?.level ||
    1;

  return (
    <div className="card p-6 animate-fade-in">
      <h2 className="flex items-center text-2xl font-bold mb-4">
        <BarChart3 className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
        進捗サマリー
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">全体の進捗</p>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {overallProgress}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 dark:bg-primary-500 rounded-full"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">完了した問題数</p>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
              {totalProblems}
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">問題</span>
          </div>
          <p className="mt-1 text-sm">
            <span className="font-medium text-secondary-600 dark:text-secondary-400">
              {totalCorrect}
            </span>{" "}
            正解数
          </p>
        </div>

        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">正答率</p>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-accent-600 dark:text-accent-400">
              {overallAccuracy}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-600 dark:bg-accent-500 rounded-full"
              style={{ width: `${overallAccuracy}%` }}
            ></div>
          </div>
        </div>
      </div>

      <h3 className="flex items-center text-lg font-semibold mb-3">
        <Award className="h-5 w-5 mr-2 text-secondary-600 dark:text-secondary-400" />
        現在のレベル
      </h3>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-xl">レベル {highestLevelWithProgress}</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {LEVELS.find((l) => l.level === highestLevelWithProgress)?.title}
            </p>
          </div>
          <div className="flex items-center">
            <Zap className="h-6 w-6 mr-1 text-secondary-500" />
            <span className="text-lg font-semibold">
              {progress.find((p) => p.level === highestLevelWithProgress)?.completedProblems || 0}{" "}
              問題解決済み
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-3">最近の活動</h3>
        {totalProblems > 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            あなたは {totalProblems} 件のチャレンジを完了し、正答率は {overallAccuracy}%
            です。頑張り続けましょう！
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            まだ問題を解決していません。今すぐ学習を始めましょう！
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressOverview;
