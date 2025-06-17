import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { ContactFormData } from '../lib/supabase'
import emailjs from '@emailjs/browser'

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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

  // Function to send email notification using EmailJS
  const sendEmailNotification = async (formData: ContactFormData) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.project_type,
        project_details: formData.project_details
      };
      console.log('Attempting to send email via EmailJS:', { serviceId, templateId, publicKey, templateParams });
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      console.log('EmailJS send response:', response);
      return true;
    } catch (err) {
      console.error('Failed to send email notification:', err);
      return false;
    }
  };

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
      
      // Send email notification after successful database submission
      await sendEmailNotification(formData)
      
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