import { supabase } from './supabase';

export interface Activity {
  id: string;
  slug: string;
  title: string;
  date: string;
  formatTag: 'tutorial' | 'case-study' | 'tips-tricks' | 'how-to' | 'best-practices' | 'review' | 'news' | 'series';
  categoryTags: string[];
  preview: string;
  featured_image: string | null;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  // Keep old fields for backward compatibility
  category?: string;
  tags?: string[];
}

export async function getActivities(limit?: number) {
  let query = supabase
    .from('activities')
    .select('*')
    // Show all activities (both published and drafts) for now
    .order('date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  
  return data as Activity[];
}

export async function getActivity(slug: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('slug', slug)
    // Show all activities (both published and drafts) for now
    .single();
  
  if (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
  
  return data as Activity;
}

export async function createActivity(activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) {
  // Remove fields that might not exist in database
  const { formatTag, categoryTags, ...activityWithoutNewFields } = activity;
  
  // Create activity with fields we know exist
  const activityToInsert = {
    ...activityWithoutNewFields,
    format_tag: formatTag,
    category_tags: categoryTags
  };
  
  console.log('Attempting to insert:', activityToInsert);
  
  const { data, error } = await supabase
    .from('activities')
    .insert(activityToInsert)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating activity:', error);
    console.error('Activity data that failed:', activityToInsert);
    throw error;
  }
  
  return data as Activity;
}

export async function updateActivity(id: string, updates: Partial<Activity>) {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
  
  return data as Activity;
}

export async function deleteActivity(id: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting activity:', error);
    throw error;
  }
  
  return true;
}

export async function uploadActivityImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')}`;
  const filePath = `activities/${fileName}`;
  
  const { error } = await supabase.storage
    .from('public')
    .upload(filePath, file);
  
  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
  
  const { data } = supabase.storage
    .from('public')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}