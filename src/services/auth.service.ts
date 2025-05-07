import { supabase } from '../lib/supabase';
import { useAppStore } from '../lib/store';

export async function signUp(email: string, password: string, username: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      // Create a profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        throw profileError;
      }

      // Initialize progress for levels 1-10
      const progressData = Array.from({ length: 10 }, (_, i) => ({
        user_id: data.user.id,
        level: i + 1,
        completed_problems: 0,
        correct_answers: 0,
        updated_at: new Date().toISOString(),
      }));

      const { error: progressError } = await supabase
        .from('user_progress')
        .insert(progressData);

      if (progressError) {
        throw progressError;
      }
    }

    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  const { setUser, setIsAuthenticated, setIsLoading } = useAppStore.getState();
  
  try {
    const { data } = await supabase.auth.getUser();
    
    if (data.user) {
      // Get the user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        throw profileError;
      }
      
      setUser({
        id: data.user.id,
        email: data.user.email,
        username: profileData?.username,
        avatarUrl: profileData?.avatar_url || undefined,
      });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    setUser(null);
    setIsAuthenticated(false);
  } finally {
    setIsLoading(false);
  }
}