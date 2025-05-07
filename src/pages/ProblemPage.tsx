import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { Problem } from '../lib/types';
import { generateProblem, generateExplanation } from '../services/ai.service';
import { submitAnswer } from '../services/problem.service';
import { getLevelInfo, isLevelUnlocked } from '../services/progress.service';
import ProblemCard from '../components/problems/ProblemCard';
import ResultCard from '../components/problems/ResultCard';
import { ArrowLeft } from 'lucide-react';

const ProblemPage: React.FC = () => {
  const { level = '1' } = useParams();
  const navigate = useNavigate();
  const { user, userProgress } = useAppStore();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState('');
  
  const levelInfo = getLevelInfo(parseInt(level));
  
  useEffect(() => {
    const fetchProblem = async () => {
      setIsLoading(true);
      
      try {
        // Check if level is unlocked
        if (user && userProgress.length > 0) {
          const levelNum = parseInt(level);
          const unlocked = isLevelUnlocked(userProgress, levelNum);
          
          if (!unlocked) {
            navigate('/levels');
            return;
          }
        }
        
        // Generate or fetch a problem
        const newProblem = await generateProblem(parseInt(level));
        setProblem(newProblem);
        setSelectedOption(null);
        setIsCorrect(null);
        setExplanation('');
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProblem();
  }, [level, navigate, user, userProgress]);
  
  const handleSubmitAnswer = async (option: number) => {
    if (!problem || !user) return;
    
    setIsSubmitting(true);
    setSelectedOption(option);
    
    try {
      const correct = option === problem.answer;
      setIsCorrect(correct);
      
      // Record the answer
      await submitAnswer(user.id, problem.id, option, correct);
      
      // Generate explanation
      const explanationText = await generateExplanation(problem, option);
      setExplanation(explanationText);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNextProblem = () => {
    // Reset states and load a new problem
    setProblem(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setExplanation('');
    setIsLoading(true);
    
    generateProblem(parseInt(level))
      .then(newProblem => {
        setProblem(newProblem);
      })
      .catch(error => {
        console.error('Error generating next problem:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/levels')}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Levels
        </button>
        
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          Level {level}: {levelInfo?.title}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {levelInfo?.description}
        </p>
      </div>
      
      {isLoading ? (
        <div className="card p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="flex justify-end">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {problem && isCorrect === null && (
            <ProblemCard 
              problem={problem} 
              onSubmit={handleSubmitAnswer}
              isSubmitting={isSubmitting}
            />
          )}
          
          {problem && selectedOption !== null && isCorrect !== null && (
            <ResultCard 
              problem={problem}
              selectedOption={selectedOption}
              isCorrect={isCorrect}
              explanation={explanation}
              onNextProblem={handleNextProblem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProblemPage;