/*
  # Initial schema for programming learning app

  1. New Tables
    - `profiles` - Extended user profile information
    - `problems` - Programming challenge data
    - `user_answers` - User's answer history
    - `user_progress` - User's progress per level

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Indexes
    - Added indexes for performance optimization
*/

-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create problems table for programming challenges
CREATE TABLE IF NOT EXISTS problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options jsonb NOT NULL,
  answer integer NOT NULL,
  explanation text NOT NULL,
  level integer NOT NULL CHECK (level >= 1 AND level <= 10),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE problems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read problems"
  ON problems
  FOR SELECT
  TO authenticated
  USING (true);

-- Create user_answers table for tracking answers
CREATE TABLE IF NOT EXISTS user_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id uuid NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  selected_option integer NOT NULL,
  is_correct boolean NOT NULL,
  answered_at timestamptz DEFAULT now()
);

ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own answers"
  ON user_answers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers"
  ON user_answers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create user_progress table for tracking progress
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level integer NOT NULL CHECK (level >= 1 AND level <= 10),
  completed_problems integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, level)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_problems_level ON problems (level);
CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers (user_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_problem_id ON user_answers (problem_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_answered_at ON user_answers (answered_at DESC);