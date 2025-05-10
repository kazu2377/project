import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LevelProgress from "../components/dashboard/LevelProgress";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import { useAppStore } from "../lib/store";
import { getUserProgress } from "../services/progress.service";

const DashboardPage: React.FC = () => {
  const { user, setUserProgress, userProgress } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        try {
          const progress = await getUserProgress(user.id);
          setUserProgress(progress);
        } catch (error) {
          console.error("Error fetching user progress:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProgress();
  }, [user, setUserProgress]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ダッシュボード</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            おかえりなさい、{user?.username || "学習者"}さん！
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link to="/levels" className="btn btn-primary">
            学習を続ける
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <ProgressOverview progress={userProgress} />
        <LevelProgress progress={userProgress} />
      </div>
    </div>
  );
};

export default DashboardPage;
