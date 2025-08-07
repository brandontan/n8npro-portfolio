import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ReCaptchaProvider } from "./components/ReCaptchaProvider";
import Index from "./pages/Index";
import TalentMarketplacePage from "./pages/TalentMarketplacePage";
import ActivityDetail from "./pages/ActivityDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load admin components to reduce initial bundle size
const ActivitiesAdmin = lazy(() => import("./pages/ActivitiesAdmin"));
const VisualActivitiesAdmin = lazy(() => import("./pages/VisualActivitiesAdmin"));
const TestPuck = lazy(() => import("./pages/TestPuck"));
const GrapesActivitiesAdmin = lazy(() => import("./pages/GrapesActivitiesAdmin"));
const LocalGhostEditor = lazy(() => import("./pages/LocalGhostEditor"));
const PostManager = lazy(() => import("./pages/PostManager"));

// Service and location pages removed - optimizing SPA instead

// Loading fallback component
const Loading = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/talent" element={<TalentMarketplacePage />} />
          <Route path="/admin/activities" element={
            <Suspense fallback={<Loading />}>
              <ActivitiesAdmin />
            </Suspense>
          } />
          <Route path="/admin/activities/visual" element={
            <Suspense fallback={<Loading />}>
              <VisualActivitiesAdmin />
            </Suspense>
          } />
          <Route path="/test-puck" element={
            <Suspense fallback={<Loading />}>
              <TestPuck />
            </Suspense>
          } />
          <Route path="/admin/activities/grapes" element={
            <Suspense fallback={<Loading />}>
              <GrapesActivitiesAdmin />
            </Suspense>
          } />
          <Route path="/editor" element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <LocalGhostEditor />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/local-ghost-editor" element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <LocalGhostEditor />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/posts" element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <PostManager />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/activities/:slug" element={<ActivityDetail />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
