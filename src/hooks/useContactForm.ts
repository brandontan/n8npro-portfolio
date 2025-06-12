import { useState } from 'react'
import { supabase, ContactFormData } from '@/lib/supabase'

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submitForm = async (formData: Omit<ContactFormData, 'id' | 'created_at'>) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            project_type: formData.project_type,
            project_details: formData.project_details,
          }
        ])

      if (error) {
        console.error('Supabase error:', error)
        setSubmitStatus('error')
        return false
      }

      console.log('Form submitted successfully:', data)
      setSubmitStatus('success')
      return true
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetStatus = () => {
    setSubmitStatus('idle')
  }

  return {
    submitForm,
    isSubmitting,
    submitStatus,
    resetStatus
  }
} 