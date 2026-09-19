import { supabase } from './supabase/client'

export type InterviewUser = {
  id: string
  email: string
  name: string
  createdAt: string
}

function mapUser(user: { id: string; email?: string | null; created_at?: string; user_metadata?: Record<string, unknown> } | null): InterviewUser | null {
  if (!user?.id || !user.email) return null
  const metadataName = typeof user.user_metadata?.name === 'string' ? user.user_metadata.name.trim() : ''
  const name = metadataName || user.email.split('@')[0] || 'Interview User'
  return {
    id: user.id,
    email: user.email,
    name,
    createdAt: user.created_at || new Date().toISOString(),
  }
}

export async function getCurrentUser(): Promise<InterviewUser | null> {
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return mapUser(data.user)
}

export async function signIn(email: string, password: string): Promise<InterviewUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })
  if (error) throw error
  const user = mapUser(data.user)
  if (!user) throw new Error('Supabase did not return a valid user session.')
  return user
}

export async function signUp(email: string, password: string, name: string): Promise<{ user: InterviewUser | null; needsEmailConfirmation: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { name: name.trim() },
    },
  })
  if (error) throw error

  return {
    user: mapUser(data.user),
    needsEmailConfirmation: !data.session,
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function subscribeToAuthChanges(callback: (user: InterviewUser | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(mapUser(session?.user ?? null))
  })
  return () => data.subscription.unsubscribe()
}
