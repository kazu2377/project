import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Problem } from "../../lib/types";

interface ProblemCardProps {
  problem: Problem;
  onSubmit: (selectedOption: number) => void;
  isSubmitting: boolean;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onSubmit, isSubmitting }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null && !isSubmitting) {
      onSubmit(selectedOption);
    }
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        レベル {problem.level}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">問題</h2>
        {problem.question.includes("```") ? (
          <>
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              {problem.question.split("```")[0]}
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
              <code className="text-sm md:text-base font-mono">
                {problem.question.split("```")[1].replace(/^javascript\s*/, "").trim()}
              </code>
            </pre>
          </>
        ) : (
          <p className="text-gray-800 dark:text-gray-200">{problem.question}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">選択肢</h3>
        <div className="space-y-3">
          {problem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedOption === index
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              disabled={isSubmitting}
            >
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full mr-3 ${
                    selectedOption === index
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-grow text-base">{option}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || isSubmitting}
          className={`btn btn-primary ${
            selectedOption === null || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              解答を確認中...
            </>
          ) : (
            <>
              回答する
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;