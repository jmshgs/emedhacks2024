
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://npjjvwdeqbrtnlvwboht.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wamp2d2RlcWJydG5sdndib2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NzIwNzIsImV4cCI6MjA1NjQ0ODA3Mn0.9E6ZYMuE6m2sadly6gxcUGC46ddzQcDcThpP7Xqcei4'
const supabase = createClient(supabaseUrl, supabaseKey)

export const signInWithGoogle = async () => {
    try {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        if (error) {
            throw new Error(error.message)
        }

        // Handle successful sign in
        console.log('User:', user)
        console.log('Session:', session)
    } catch (error) {
        // Handle sign in error
        console.error('Error signing in with Google:', error.message)
    }
}

export const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
    return user
}

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) {
            throw new Error(error.message)
        }
        // Handle successful sign out
        console.log('Signed out successfully')
    } catch (error) {
        // Handle sign out error
        console.error('Error signing out:', error.message)
    }
}

export const insertData = async (probability, type) => {
    try {
        let user = await fetchUser()
        .then(async user => {
            const { data, error } = await supabase
                .from('scans')
                .insert(
                    { user_id: user.id, probability: probability, type: type},
                )
            if (error) {
                throw new Error(error.message)
            }}
        )
        console.log('Data inserted successfully:', data)
    } catch (error) {
        console.error('Error inserting data:', error.message)
    }
}

export const getPosts = async () => {
    try {   
        const { data, error } = await supabase
            .from('food_banks')
            .select()
        if (error) {
            throw new Error(error.message)
        }
        return data;
        
    } catch (error) {
        console.error('Error inserting data:', error.message)
    }
}