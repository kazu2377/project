import { supabase } from '../lib/supabase';
import { Problem, UserAnswer } from '../lib/types';

export async function getProblems(level: number, limit = 10): Promise<Problem[]> {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('level', level)
      .limit(limit);

    if (error) {
      throw error;
    }

    return data.map(transformProblem);
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
}

export async function getProblemById(id: string): Promise<Problem> {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return transformProblem(data);
  } catch (error) {
    console.error('Error fetching problem:', error);
    throw error;
  }
}

export async function submitAnswer(
  userId: string,
  problemId: string,
  selectedOption: number,
  isCorrect: boolean
): Promise<void> {
  try {
    // Record user answer
    const { error: answerError } = await supabase
      .from('user_answers')
      .insert({
        user_id: userId,
        problem_id: problemId,
        selected_option: selectedOption,
        is_correct: isCorrect,
        answered_at: new Date().toISOString(),
      });

    if (answerError) {
      throw answerError;
    }

    // Get problem to find level
    const { data: problemData, error: problemError } = await supabase
      .from('problems')
      .select('level')
      .eq('id', problemId)
      .single();

    if (problemError) {
      throw problemError;
    }

    // Update user progress for this level
    const { data: progressData, error: progressFetchError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('level', problemData.level)
      .single();

    if (progressFetchError && progressFetchError.code !== 'PGRST116') {
      throw progressFetchError;
    }

    if (progressData) {
      const { error: progressUpdateError } = await supabase
        .from('user_progress')
        .update({
          completed_problems: progressData.completed_problems + 1,
          correct_answers: progressData.correct_answers + (isCorrect ? 1 : 0),
          updated_at: new Date().toISOString(),
        })
        .eq('id', progressData.id);

      if (progressUpdateError) {
        throw progressUpdateError;
      }
    } else {
      // Create progress record if it doesn't exist
      const { error: progressInsertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          level: problemData.level,
          completed_problems: 1,
          correct_answers: isCorrect ? 1 : 0,
          updated_at: new Date().toISOString(),
        });

      if (progressInsertError) {
        throw progressInsertError;
      }
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}

export async function getUserAnswers(userId: string, limit = 20): Promise<UserAnswer[]> {
  try {
    const { data, error } = await supabase
      .from('user_answers')
      .select(`
        *,
        problems:problem_id (*)
      `)
      .eq('user_id', userId)
      .order('answered_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      problemId: item.problem_id,
      selectedOption: item.selected_option,
      isCorrect: item.is_correct,
      answeredAt: item.answered_at,
      problem: item.problems ? transformProblem(item.problems) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching user answers:', error);
    throw error;
  }
}

// Helper function to transform database response to Problem type
function transformProblem(data: any): Problem {
  return {
    id: data.id,
    question: data.question,
    options: Array.isArray(data.options) ? data.options : [],
    answer: data.answer,
    explanation: data.explanation,
    level: data.level,
    createdAt: data.created_at,
  };
}