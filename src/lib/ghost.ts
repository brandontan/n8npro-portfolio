import GhostContentAPI from '@tryghost/content-api';

// Configure Ghost Content API
// You'll need to replace these with your actual Ghost site details
const api = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URL || 'https://demo.ghost.io', // Using Ghost demo for now
  key: import.meta.env.VITE_GHOST_CONTENT_KEY || '22444f78447824223cefc48062', // Demo key
  version: 'v5.0'
});

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  created_at: string;
  excerpt: string;
  custom_excerpt: string | null;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  primary_tag: {
    id: string;
    name: string;
    slug: string;
  } | null;
  authors: Array<{
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
  }>;
  reading_time: number;
}

// Fetch all posts
export async function getPosts(limit: number = 10): Promise<GhostPost[]> {
  try {
    console.log('Fetching posts from Ghost API...');
    console.log('Using URL:', import.meta.env.VITE_GHOST_URL);
    console.log('Using Key:', import.meta.env.VITE_GHOST_CONTENT_KEY?.substring(0, 10) + '...');
    
    const posts = await api.posts
      .browse({
        limit,
        include: ['tags', 'authors'],
        order: 'published_at DESC'
      });
    console.log('Fetched posts:', posts);
    return posts as unknown as GhostPost[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    console.error('Falling back to demo posts');
    // Return some demo data if API fails
    return getDemoPosts();
  }
}

// Demo posts for development
function getDemoPosts(): GhostPost[] {
  return [
    {
      id: '1',
      uuid: 'demo-1',
      title: 'Getting Started with n8n Automation',
      slug: 'getting-started-n8n',
      html: '<p>Learn how to build powerful automation workflows with n8n...</p>',
      feature_image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800',
      featured: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      excerpt: 'A comprehensive guide to building your first n8n workflow',
      custom_excerpt: null,
      tags: [{ id: '1', name: 'n8n', slug: 'n8n' }],
      primary_tag: { id: '1', name: 'automation', slug: 'automation' },
      authors: [{ id: '1', name: 'AIFlows Team', slug: 'aiflows', profile_image: null }],
      reading_time: 5
    },
    {
      id: '2',
      uuid: 'demo-2',
      title: 'Connecting Ghost CMS to Your React App',
      slug: 'ghost-cms-react',
      html: '<p>Integrate Ghost\'s powerful content API with your React application...</p>',
      feature_image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800',
      featured: false,
      published_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      excerpt: 'Step-by-step guide to using Ghost as a headless CMS',
      custom_excerpt: null,
      tags: [{ id: '2', name: 'Ghost', slug: 'ghost' }],
      primary_tag: { id: '2', name: 'tutorial', slug: 'tutorial' },
      authors: [{ id: '1', name: 'AIFlows Team', slug: 'aiflows', profile_image: null }],
      reading_time: 8
    }
  ];
}

// Fetch a single post by slug
export async function getPost(slug: string): Promise<GhostPost | null> {
  try {
    const post = await api.posts
      .read({
        slug
      }, {
        include: ['tags', 'authors']
      });
    return post as unknown as GhostPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch posts by tag
export async function getPostsByTag(tag: string, limit: number = 10): Promise<GhostPost[]> {
  try {
    const posts = await api.posts
      .browse({
        filter: `tag:${tag}`,
        limit,
        include: ['tags', 'authors'],
        order: 'published_at DESC'
      });
    return posts as unknown as GhostPost[];
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

// Search posts
export async function searchPosts(query: string): Promise<GhostPost[]> {
  try {
    const posts = await api.posts
      .browse({
        filter: `title:~'${query}'`,
        limit: 20,
        include: ['tags', 'authors']
      });
    return posts as unknown as GhostPost[];
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}