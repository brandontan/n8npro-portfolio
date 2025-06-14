import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { ContactFormData } from '../lib/supabase'

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [success])

  // Auto-dismiss error message after 8 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 8000)
      
      return () => clearTimeout(timer)
    }
  }, [error])

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      // Log environment variables for debugging
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('Supabase Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
      console.log('Submitting form data:', formData)

      // Test Supabase connection
      const { data: testData, error: testError } = await supabase
        .from('contact_submissions')
        .select('count')
        .limit(1)

      if (testError) {
        console.error('Supabase connection test failed:', testError)
        throw new Error('Failed to connect to database')
      }

      console.log('Supabase connection test successful')

      // Insert the form data
      const { data, error: insertError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            project_type: formData.project_type,
            project_details: formData.project_details,
            message: formData.message || formData.project_details,
            status: 'new',
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (insertError) {
        console.error('Supabase insert error:', insertError)
        if (insertError.code === '42501') {
          throw new Error('Permission denied. Please check your database permissions.')
        } else if (insertError.code === '23505') {
          throw new Error('A submission with this email already exists.')
        } else {
          throw new Error(insertError.message || 'Failed to submit form')
        }
      }

      console.log('Form submitted successfully:', data)
      setSuccess(true)
      return true
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const dismissSuccess = () => setSuccess(false)
  const dismissError = () => setError(null)

  return {
    submitForm,
    isSubmitting,
    error,
    success,
    dismissSuccess,
    dismissError
  }
} 