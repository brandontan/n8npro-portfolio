import { useState, useEffect, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Environment-based admin email (must be set in .env)
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

if (!ADMIN_EMAIL) {
  console.error('VITE_ADMIN_EMAIL not set in environment variables');
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sendingLink, setSendingLink] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } else if (ADMIN_EMAIL && session?.user?.email === ADMIN_EMAIL) {
        setIsAuthenticated(true);
      } else if (session) {
        // Logged in but not admin - sign them out
        await supabase.auth.signOut();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingLink(true);

    try {
      // Normalize emails for comparison (trim and lowercase)
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedAdminEmail = ADMIN_EMAIL?.trim().toLowerCase() || '';
      
      // Debug info (remove in production)
      // console.log('Entered email:', normalizedEmail);
      // console.log('Expected email:', normalizedAdminEmail);
      
      // If no admin email is set, deny all access
      if (!ADMIN_EMAIL) {
        toast.error('Admin email not configured - access denied');
        setSendingLink(false);
        return;
      }

      // Only allow the admin email
      if (normalizedEmail !== normalizedAdminEmail) {
        toast.error('Access denied - unauthorized email');
        setSendingLink(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/editor`,
        },
      });

      if (error) {
        throw error;
      }

      setMagicLinkSent(true);
      toast.success('Magic link sent! Check your email.');
    } catch (error: any) {
      console.error('Magic link error:', error);
      toast.error(error.message || 'Failed to send magic link');
    } finally {
      setSendingLink(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="relative">
        {/* Logout button in corner */}
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 z-50 px-3 py-1 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded text-red-400 text-sm transition-colors"
        >
          Logout
        </button>
        {children}
      </div>
    );
  }

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-600/10 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <p className="text-gray-400">Magic link sent to {email}</p>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                Click the link in your email to access the editor. 
                The link will redirect you back here automatically.
              </p>
            </div>
            
            <Button 
              onClick={() => {
                setMagicLinkSent(false);
                setEmail('');
              }}
              variant="outline"
              className="w-full"
            >
              Send Another Link
            </Button>
            
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-purple-600/10 rounded-full w-fit">
            <Mail className="h-8 w-8 text-purple-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <p className="text-gray-400">Enter your email to receive a magic link</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Admin Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="bg-gray-800 border-gray-700 text-white"
                required
                disabled={sendingLink}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              disabled={sendingLink}
            >
              {sendingLink ? 'Sending Magic Link...' : 'Send Magic Link'}
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
}