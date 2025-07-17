export default async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL;
  const hasKey = !!process.env.VITE_SUPABASE_ANON_KEY;
  
  // Extract project ID from URL
  const projectId = url ? url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] : null;
  
  return res.status(200).json({
    hasUrl: !!url,
    urlFormat: url ? url.replace(/https:\/\/([^.]+)\.supabase\.co/, 'https://[PROJECT_ID].supabase.co') : null,
    projectId: projectId,
    hasAnonKey: hasKey,
    keyLength: process.env.VITE_SUPABASE_ANON_KEY?.length || 0,
    isCorrectProject: projectId === 'xzxomhhuovfhukwzitxt'
  });
}