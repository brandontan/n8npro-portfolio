import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from './supabase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStorageUrl = (path: string) => {
  const { data } = supabase.storage.from('project-images').getPublicUrl(path)
  return data.publicUrl
}

export const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  return data
}
