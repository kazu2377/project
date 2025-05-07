import React from 'react';
import { UserAnswer } from '../../lib/types';
import { CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';

interface HistoryListProps {
  answers: UserAnswer[];
  loading: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({ answers, loading }) => {
  if (loading) {
    return (
      <div className="card p-6 animate-fade-in">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (answers.length === 0) {
    return (
      <div className="card p-6 text-center animate-fade-in">
        <p className="text-lg text-gray-500 dark:text-gray-400">No answer history found. Start solving problems!</p>
      </div>
    );
  }

  // Group answers by date
  const groupedAnswers: Record<string, UserAnswer[]> = {};
  
  answers.forEach(answer => {
    const date = new Date(answer.answeredAt).toLocaleDateString();
    if (!groupedAnswers[date]) {
      groupedAnswers[date] = [];
    }
    groupedAnswers[date].push(answer);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {Object.entries(groupedAnswers).map(([date, dateAnswers]) => (
        <div key={date} className="card p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
            <h3 className="text-lg font-semibold">{date}</h3>
          </div>
          
          <div className="space-y-4">
            {dateAnswers.map(answer => (
              <div 
                key={answer.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 mr-2 text-success-500" />
                      ) : (
                        <XCircle className="h-5 w-5 mr-2 text-error-500" />
                      )}
                      <h4 className="font-medium">
                        {answer.problem?.question.length > 70 
                          ? answer.problem?.question.substring(0, 70) + '...'
                          : answer.problem?.question}
                      </h4>
                    </div>
                    
                    <div className="mt-2 ml-7">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Your answer:</span> {answer.problem?.options[answer.selectedOption]}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-sm text-success-600 dark:text-success-500">
                          <span className="font-medium">Correct answer:</span> {answer.problem?.options[answer.problem.answer]}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(answer.answeredAt).toLocaleTimeString()}
                    </div>
                    <div className="mt-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                      Level {answer.problem?.level}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;