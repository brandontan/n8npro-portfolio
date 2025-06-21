import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { ContactFormData } from '../lib/supabase'

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

  // Function to send email notification via Formspree
  const sendEmailNotification = async (formData: ContactFormData) => {
    try {
      console.log('Sending email via Formspree:', formData);
      
      const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/myzjdlog'
      
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project_type: formData.project_type,
          project_details: formData.project_details,
          message: formData.message || formData.project_details,
          _subject: `New Lead: ${formData.name} | n8npro.com`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }
      
      console.log('Email sent successfully via Formspree');
      return true;
    } catch (err) {
      console.error('Failed to send email notification via Formspree:', err);
      return false;
    }
  };

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
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

      // Insert the form data into Supabase
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

      console.log('Form submitted successfully to database:', data)
      
      // Send email notification via Formspree
      const emailSent = await sendEmailNotification(formData)
      
      if (!emailSent) {
        console.warn('Form was saved but email notification failed')
        // Still show success since the form was submitted to database
      }
      
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