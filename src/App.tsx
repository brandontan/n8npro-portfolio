import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ReCaptchaProvider } from "./components/ReCaptchaProvider";
import Index from "./pages/Index";
import TalentMarketplacePage from "./pages/TalentMarketplacePage";
import ActivitiesAdmin from "./pages/ActivitiesAdmin";
import VisualActivitiesAdmin from "./pages/VisualActivitiesAdmin";
import TestPuck from "./pages/TestPuck";
import GrapesActivitiesAdmin from "./pages/GrapesActivitiesAdmin";
import LocalGhostEditor from "./pages/LocalGhostEditor";
import PostManager from "./pages/PostManager";
import ActivityDetail from "./pages/ActivityDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/admin/activities" element={<ActivitiesAdmin />} />
          <Route path="/admin/activities/visual" element={<VisualActivitiesAdmin />} />
          <Route path="/test-puck" element={<TestPuck />} />
          <Route path="/admin/activities/grapes" element={<GrapesActivitiesAdmin />} />
          <Route path="/editor" element={
            <ProtectedRoute>
              <LocalGhostEditor />
            </ProtectedRoute>
          } />
          <Route path="/local-ghost-editor" element={
            <ProtectedRoute>
              <LocalGhostEditor />
            </ProtectedRoute>
          } />
          <Route path="/posts" element={
            <ProtectedRoute>
              <PostManager />
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
