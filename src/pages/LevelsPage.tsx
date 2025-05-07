import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { LEVELS, getUserProgress, isLevelUnlocked } from '../services/progress.service';
import { UserProgress } from '../lib/types';
import { BookOpen, Lock, ChevronRight } from 'lucide-react';

const LevelsPage: React.FC = () => {
  const { user } = useAppStore();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        try {
          const userProgress = await getUserProgress(user.id);
          setProgress(userProgress);
        } catch (error) {
          console.error('Error fetching user progress:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProgress();
  }, [user]);
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 w-1/4 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center mb-8">
        <BookOpen className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Levels</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEVELS.map((level) => {
          const levelProgress = progress.find(p => p.level === level.level) || {
            id: '',
            userId: user?.id || '',
            level: level.level,
            completedProblems: 0,
            correctAnswers: 0,
            accuracy: 0,
            updatedAt: '',
          };
          
          const unlocked = isLevelUnlocked(progress, level.level);
          const progressPercent = levelProgress.completedProblems 
            ? Math.min(100, (levelProgress.correctAnswers / level.requiredToUnlock) * 100)
            : 0;
          
          return (
            <div 
              key={level.level}
              className={`card transition-all ${unlocked 
                ? 'hover:shadow-lg hover:translate-y-[-2px]' 
                : 'opacity-80'}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md ${
                      unlocked 
                        ? 'bg-primary-600 dark:bg-primary-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {unlocked ? level.level : <Lock className="h-5 w-5" />}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {level.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {level.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      Progress: {levelProgress.correctAnswers} / {level.requiredToUnlock} correct
                    </div>
                    <div className="font-medium">
                      {Math.round(progressPercent)}%
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${unlocked ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-400 dark:bg-gray-600'}`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6">
                  {unlocked ? (
                    <Link 
                      to={`/problem/${level.level}`}
                      className="btn btn-primary w-full"
                    >
                      Start Learning
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  ) : (
                    <button 
                      className="btn btn-outline w-full opacity-60 cursor-not-allowed"
                      disabled
                    >
                      Locked
                      <Lock className="ml-1 h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelsPage;