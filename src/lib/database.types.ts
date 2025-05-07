export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      problems: {
        Row: {
          id: string
          question: string
          options: Json
          answer: number
          explanation: string
          level: number
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          options: Json
          answer: number
          explanation: string
          level: number
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          options?: Json
          answer?: number
          explanation?: string
          level?: number
        }
      }
      user_answers: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          selected_option: number
          is_correct: boolean
          answered_at: string
        }
        Insert: {
          id?: string
          user_id: string
          problem_id: string
          selected_option: number
          is_correct: boolean
          answered_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problem_id?: string
          selected_option?: number
          is_correct?: boolean
          answered_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          level: number
          completed_problems: number
          correct_answers: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          level: number
          completed_problems?: number
          correct_answers?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          level?: number
          completed_problems?: number
          correct_answers?: number
          updated_at?: string
        }
      }
    }
  }
}