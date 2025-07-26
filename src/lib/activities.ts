import { supabase } from './supabase';

export interface Activity {
  id: string;
  slug: string;
  title: string;
  date: string;
  formatTag: 'tutorial' | 'case-study' | 'tips-tricks' | 'how-to' | 'best-practices' | 'review' | 'news' | 'series';
  categoryTags: string[];
  industryTags?: string[];
  preview: string;
  featured_image: string | null;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  // Timestamp tracking fields
  last_saved_at?: string;
  save_count?: number;
  published_at?: string;
  publish_count?: number;
  // Keep old fields for backward compatibility
  category?: string;
  tags?: string[];
}

export async function getActivities(limit?: number, publishedOnly = false) {
  let query = supabase
    .from('activities')
    .select('*');
    
  if (publishedOnly) {
    query = query.eq('published', true);
  }
  
  query = query.order('date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  
  // Transform snake_case to camelCase
  const activities = data.map(item => ({
    ...item,
    formatTag: item.format_tag || item.formatTag || 'tutorial',
    categoryTags: item.category_tags || item.categoryTags || [],
    industryTags: item.industry_tags || item.industryTags || [],
    // Remove the snake_case versions
    format_tag: undefined,
    category_tags: undefined,
    industry_tags: undefined
  }));
  
  return activities as Activity[];
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
  
  // Transform snake_case to camelCase
  if (data) {
    const activity = {
      ...data,
      formatTag: data.format_tag || data.formatTag || 'tutorial',
      categoryTags: data.category_tags || data.categoryTags || [],
      industryTags: data.industry_tags || data.industryTags || [],
      // Remove the snake_case versions
      format_tag: undefined,
      category_tags: undefined,
      industry_tags: undefined
    };
    return activity as Activity;
  }
  
  return null;
}

export async function createActivity(activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) {
  // Remove fields that might not exist in database
  const { formatTag, categoryTags, industryTags, category, tags, ...activityWithoutNewFields } = activity;
  
  // Create activity with fields we know exist
  const activityToInsert = {
    ...activityWithoutNewFields,
    format_tag: formatTag,
    category_tags: categoryTags,
    // Add legacy fields with defaults if not provided
    category: category || 'technical', // Must be one of: client-success, workflow, insight, technical, case-study
    tags: tags || []
  };
  
  // Add industry_tags if provided
  if (industryTags && industryTags.length > 0) {
    (activityToInsert as any).industry_tags = industryTags;
  }
  
  console.log('Attempting to insert:', activityToInsert);
  
  const { data, error } = await supabase
    .from('activities')
    .insert(activityToInsert)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating activity:', error);
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    console.error('Activity data that failed:', activityToInsert);
    throw error;
  }
  
  return data as Activity;
}

export async function updateActivity(id: string, updates: Partial<Activity>) {
  // First, fetch the current activity to check if publish status is changing
  const { data: currentActivity } = await supabase
    .from('activities')
    .select('published, save_count, publish_count')
    .eq('id', id)
    .single();
  
  // Convert camelCase to snake_case for database
  const { formatTag, categoryTags, industryTags, ...otherUpdates } = updates;
  const dbUpdates: any = { ...otherUpdates };
  
  if (formatTag !== undefined) {
    dbUpdates.format_tag = formatTag;
  }
  if (categoryTags !== undefined) {
    dbUpdates.category_tags = categoryTags;
  }
  if (industryTags !== undefined) {
    dbUpdates.industry_tags = industryTags;
  }
  
  // Update timestamp tracking
  dbUpdates.last_saved_at = new Date().toISOString();
  dbUpdates.save_count = (currentActivity?.save_count || 0) + 1;
  
  // Check if this is a publish action
  if (updates.published === true && currentActivity?.published === false) {
    dbUpdates.published_at = new Date().toISOString();
    dbUpdates.publish_count = (currentActivity?.publish_count || 0) + 1;
  }
  
  const { data, error } = await supabase
    .from('activities')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
  
  // Transform snake_case back to camelCase
  if (data) {
    const activity = {
      ...data,
      formatTag: data.format_tag || data.formatTag || 'tutorial',
      categoryTags: data.category_tags || data.categoryTags || [],
      industryTags: data.industry_tags || data.industryTags || [],
      format_tag: undefined,
      category_tags: undefined,
      industry_tags: undefined
    };
    return activity as Activity;
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