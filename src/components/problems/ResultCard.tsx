import React from 'react';
import { Problem, PROGRAMMING_LANGUAGES } from '../../lib/types';
import { CheckCircle, XCircle, HelpCircle, RefreshCw, Code2 } from 'lucide-react';

interface ResultCardProps {
  problem: Problem;
  selectedOption: number;
  isCorrect: boolean;
  explanation: string;
  onNextProblem: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  problem, 
  selectedOption, 
  isCorrect, 
  explanation, 
  onNextProblem 
}) => {
  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {isCorrect ? (
            <div className="flex items-center text-success-600 dark:text-success-500">
              <CheckCircle className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">正解です！</h2>
            </div>
          ) : (
            <div className="flex items-center text-error-600 dark:text-error-500">
              <XCircle className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">不正解です</h2>
            </div>
          )}
        </div>
        <div className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
          <Code2 className="h-4 w-4 mr-1" />
          {PROGRAMMING_LANGUAGES[problem.language]}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">問題</h3>
        {problem.question.includes("```") ? (
          <>
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              {problem.question.split("```")[0]}
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
              <code className="text-sm md:text-base font-mono">
                {problem.question.split("```")[1].replace(new RegExp(`^${problem.language}\\s*`), "").trim()}
              </code>
            </pre>
          </>
        ) : (
          <p className="text-gray-800 dark:text-gray-200">{problem.question}</p>
        )}
        
        <div className="mt-6 space-y-2">
          {problem.options.map((option, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                index === problem.answer 
                  ? 'bg-success-50 dark:bg-success-900/20 border border-success-500'
                  : index === selectedOption 
                    ? 'bg-error-50 dark:bg-error-900/20 border border-error-500'
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full mr-3 ${
                  index === problem.answer 
                    ? 'bg-success-500 text-white' 
                    : index === selectedOption 
                      ? 'bg-error-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-grow text-base">{option}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 mr-2 text-secondary-600 dark:text-secondary-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium mb-2">解説</h3>
            <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onNextProblem}
          className="btn btn-primary"
        >
          次の問題へ
          <RefreshCw className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ResultCard;