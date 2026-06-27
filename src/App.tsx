import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Sessao from "./pages/Sessao.tsx";
import Historico from "./pages/Historico.tsx";
import Categoria from "./pages/Categoria.tsx";
import Quiz from "./pages/Quiz.tsx";
import Notas from "./pages/Notas.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";
import Curiosidades from "./pages/Curiosidades.tsx";
import Resumos from "./pages/Resumos.tsx";
import FlashcardsReview from "./pages/FlashcardsReview.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { FloatingChatProvider } from "./contexts/FloatingChatContext.tsx";
import { FloatingChatWidget } from "./components/FloatingChatWidget.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FloatingChatProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/sessao/:materia" element={<ProtectedRoute><Sessao /></ProtectedRoute>} />
            <Route path="/historico/:materia" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
            <Route path="/categoria/:slug" element={<ProtectedRoute><Categoria /></ProtectedRoute>} />
            <Route path="/categoria/:slug/:sub" element={<ProtectedRoute><Categoria /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/notas" element={<ProtectedRoute><Notas /></ProtectedRoute>} />
            <Route path="/curiosidades" element={<ProtectedRoute><Curiosidades /></ProtectedRoute>} />
            <Route path="/resumos" element={<ProtectedRoute><Resumos /></ProtectedRoute>} />
            <Route path="/flashcards" element={<ProtectedRoute><FlashcardsReview /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </FloatingChatProvider>
  </QueryClientProvider>
);

export default App;
