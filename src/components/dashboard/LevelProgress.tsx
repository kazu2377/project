import { ChevronRight, Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { UserProgress } from "../../lib/types";
import { LEVELS, isLevelUnlocked } from "../../services/progress.service";

interface LevelProgressProps {
  progress: UserProgress[];
}

const LevelProgress: React.FC<LevelProgressProps> = ({ progress }) => {
  return (
    <div className="card p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">レベル別進捗</h2>

      <div className="space-y-4">
        {LEVELS.map((level) => {
          const levelProgress = progress.find((p) => p.level === level.level);
          const unlocked = isLevelUnlocked(progress, level.level);
          const progressPercent = levelProgress?.completedProblems
            ? Math.min(100, (levelProgress.correctAnswers / level.requiredToUnlock) * 100)
            : 0;

          return (
            <div key={level.level} className="relative">
              <div
                className={`rounded-lg p-4 border ${
                  unlocked
                    ? "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md ${
                        unlocked
                          ? "bg-primary-600 dark:bg-primary-500 text-white"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {unlocked ? level.level : <Lock className="h-5 w-5" />}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{level.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {level.description}
                      </p>
                      {levelProgress && (
                        <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            {levelProgress.correctAnswers} / {level.requiredToUnlock} 正解
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {unlocked ? (
                    <Link
                      to={`/problem/${level.level}`}
                      className="flex-shrink-0 ml-2 btn btn-primary"
                    >
                      練習する
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      className="flex-shrink-0 ml-2 btn btn-outline opacity-60 cursor-not-allowed"
                      disabled
                    >
                      ロック中
                      <Lock className="ml-1 h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="mt-3 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      unlocked
                        ? "bg-primary-600 dark:bg-primary-500"
                        : "bg-gray-400 dark:bg-gray-600"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelProgress;
