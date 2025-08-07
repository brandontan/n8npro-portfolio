import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import type { ContactFormData } from '../lib/supabase'
import { supabase } from '../lib/supabase'

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 3000)
      
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
      // Get reCAPTCHA token if available
      let recaptchaToken = null
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('contact_form_submit')
        } catch (recaptchaError) {
          console.warn('reCAPTCHA failed:', recaptchaError)
          // Continue without reCAPTCHA if it fails
        }
      }

      // Check if we're in development or production
      const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost'
      
      if (isDevelopment) {
        // Direct Supabase insert for local development
        const { data, error: supabaseError } = await supabase
          .from('contact_submissions')
          .insert([{
            name: formData.name,
            email: formData.email,
            project_type: formData.project_type || null,
            project_details: formData.project_details,
            message: formData.message || formData.project_details
          }])
          .select()
          .single()

        if (supabaseError) {
          throw new Error(supabaseError.message || 'Failed to submit form')
        }
      } else {
        // Use Vercel serverless function endpoint for production
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            recaptchaToken
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit form')
        }
      }

      setSuccess(true)
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      throw err
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