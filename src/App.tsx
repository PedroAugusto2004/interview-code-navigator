import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TopicDetail from "./pages/TopicDetail";
import NotFound from "./pages/NotFound";
import PatternTrainer from "./pages/PatternTrainer";
import DailyPractice from "./pages/DailyPractice";
import Quizzes from "./pages/Quizzes";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/topic/:topicId" element={<TopicDetail />} />
          <Route path="/trainer" element={<PatternTrainer />} />
          <Route path="/daily" element={<DailyPractice />} />
          <Route path="/quizzes" element={<Quizzes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteFooter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;