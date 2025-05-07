import React, { useEffect, useState } from 'react';
import { useAppStore } from '../lib/store';
import { getUserAnswers } from '../services/problem.service';
import { UserAnswer } from '../lib/types';
import HistoryList from '../components/history/HistoryList';
import { History, BarChart3 } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const HistoryPage: React.FC = () => {
  const { user } = useAppStore();
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnswers = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const userAnswers = await getUserAnswers(user.id);
          setAnswers(userAnswers);
        } catch (error) {
          console.error('Error fetching user answers:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchAnswers();
  }, [user]);
  
  // Calculate statistics
  const totalAnswers = answers.length;
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
  
  // Group answers by level
  const answersByLevel: Record<number, { total: number; correct: number }> = {};
  
  answers.forEach(answer => {
    const level = answer.problem?.level || 0;
    if (!answersByLevel[level]) {
      answersByLevel[level] = { total: 0, correct: 0 };
    }
    
    answersByLevel[level].total++;
    if (answer.isCorrect) {
      answersByLevel[level].correct++;
    }
  });
  
  // Prepare chart data
  const pieChartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [correctAnswers, totalAnswers - correctAnswers],
        backgroundColor: ['rgba(16, 185, 129, 0.7)', 'rgba(239, 68, 68, 0.7)'],
        borderColor: ['rgba(16, 185, 129, 1)', 'rgba(239, 68, 68, 1)'],
        borderWidth: 1,
      },
    ],
  };
  
  const barChartData = {
    labels: Object.keys(answersByLevel).map(level => `Level ${level}`),
    datasets: [
      {
        label: 'Total',
        data: Object.values(answersByLevel).map(data => data.total),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Correct',
        data: Object.values(answersByLevel).map(data => data.correct),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center mb-8">
        <History className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Answer History</h1>
      </div>
      
      {!isLoading && totalAnswers > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-secondary-600 dark:text-secondary-400" />
            Performance Statistics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="text-lg font-medium mb-4 text-center">Overall Accuracy</h3>
              <div className="w-full aspect-square max-w-[200px] mx-auto">
                <Pie data={pieChartData} />
              </div>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold">{accuracy.toFixed(1)}%</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{correctAnswers} of {totalAnswers} correct</p>
              </div>
            </div>
            
            <div className="card p-6 md:col-span-2">
              <h3 className="text-lg font-medium mb-4 text-center">Answers by Level</h3>
              <div className="w-full h-[250px]">
                <Bar 
                  data={barChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <HistoryList answers={answers} loading={isLoading} />
      </div>
    </div>
  );
};

export default HistoryPage;