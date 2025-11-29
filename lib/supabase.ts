// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Vérification des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log pour le débogage en développement
if (typeof window !== 'undefined') {
  console.log('🔍 Supabase Config Check:');
  console.log('URL:', supabaseUrl ? '✅ Présente' : '❌ Manquante');
  console.log('KEY:', supabaseAnonKey ? '✅ Présente' : '❌ Manquante');
}

// Validation des variables
if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = []
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  
  console.error('❌ Variables Supabase manquantes:', missingVars.join(', '))
  
  // En développement, on peut throw une erreur plus descriptive
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `Variables d'environnement Supabase manquantes: ${missingVars.join(', ')}\n\n` +
      'Assurez-vous d\'avoir créé un fichier .env.local avec:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme'
    )
  }
}

// Configuration Supabase avec options avancées
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Fonction utilitaire pour tester la connexion
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('parking_lots')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Erreur connexion Supabase:', error)
      return false
    }

    console.log('✅ Connexion Supabase réussie!')
    return true
  } catch (error) {
    console.error('❌ Exception connexion Supabase:', error)
    return false
  }
}
