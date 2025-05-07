import React from 'react';
import { Problem } from '../../lib/types';
import { CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react';

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
      <div className="flex items-center mb-4">
        {isCorrect ? (
          <div className="flex items-center text-success-600 dark:text-success-500">
            <CheckCircle className="h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold">Correct!</h3>
          </div>
        ) : (
          <div className="flex items-center text-error-600 dark:text-error-500">
            <XCircle className="h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold">Incorrect</h3>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Question:</h4>
        <p className="text-gray-800 dark:text-gray-200">{problem.question}</p>
        
        <div className="mt-4 space-y-2">
          {problem.options.map((option, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg ${
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
                <div className="flex-grow">
                  {option}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 mr-2 text-secondary-600 dark:text-secondary-400 mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">Explanation:</h4>
            <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onNextProblem}
          className="btn btn-primary"
        >
          Next Problem
          <RefreshCw className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ResultCard;