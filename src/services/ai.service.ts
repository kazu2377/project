// This is a mock AI service that would be replaced with a real AI integration
// For a production app, you would connect to an OpenAI API or similar service

import { Problem } from '../lib/types';

// Sample problem templates by level
const problemTemplates: Record<number, Problem[]> = {
  1: [
    {
      id: 'mock-1-1',
      question: 'What does the following code output?\n\n```javascript\nlet x = 5;\nlet y = "10";\nconsole.log(x + y);\n```',
      options: ['15', '"510"', 'Error', '5 + "10"'],
      answer: 1,
      explanation: 'In JavaScript, when you add a number and a string, the number is converted to a string and concatenation occurs. So 5 + "10" results in the string "510".',
      level: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'mock-1-2',
      question: 'Which of the following is NOT a valid variable name in JavaScript?',
      options: ['myVariable', '_value', '123variable', '$price'],
      answer: 2,
      explanation: 'Variable names in JavaScript cannot start with a number. They must begin with a letter, underscore (_), or dollar sign ($).',
      level: 1,
      createdAt: new Date().toISOString(),
    },
  ],
  2: [
    {
      id: 'mock-2-1',
      question: 'What is the value of x after this code executes?\n\n```javascript\nlet x = 10;\nx += 5;\nx *= 2;\n```',
      options: ['15', '20', '30', '40'],
      answer: 2,
      explanation: 'First, x += 5 adds 5 to x, making it 15. Then, x *= 2 multiplies x by 2, resulting in 30.',
      level: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'mock-2-2',
      question: 'What is the result of this expression?\n\n```javascript\n3 > 2 > 1\n```',
      options: ['true', 'false', 'Error', 'undefined'],
      answer: 1,
      explanation: 'This is evaluated left to right. First, 3 > 2 is true. Then, true > 1 is evaluated. When comparing, true is converted to 1, so it becomes 1 > 1, which is false.',
      level: 2,
      createdAt: new Date().toISOString(),
    },
  ],
  // Templates for other levels would be added here
};

export async function generateProblem(level: number): Promise<Problem> {
  // In a real implementation, this would call an AI API
  // For this mock, we'll return a random problem from the templates
  const levelProblems = problemTemplates[level] || problemTemplates[1];
  const randomIndex = Math.floor(Math.random() * levelProblems.length);
  
  // Create a unique ID for the problem
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  
  return {
    ...levelProblems[randomIndex],
    id: `ai-${level}-${timestamp}-${randomId}`,
    createdAt: new Date().toISOString(),
  };
}

export async function generateExplanation(problem: Problem, selectedOption: number): Promise<string> {
  // In a real implementation, this would generate a personalized explanation
  // For this mock, we'll return the pre-defined explanation
  return problem.explanation;
}