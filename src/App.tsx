import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Sessao from "./pages/Sessao.tsx";
import Historico from "./pages/Historico.tsx";
import Categoria from "./pages/Categoria.tsx";
import Biblioteca from "./pages/Biblioteca.tsx";
import EmentaPage from "./pages/EmentaPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sessao/:materia" element={<Sessao />} />
          <Route path="/historico/:materia" element={<Historico />} />
          <Route path="/categoria/:slug" element={<Categoria />} />
          <Route path="/categoria/:slug/:sub" element={<Categoria />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/ementa/:slug" element={<EmentaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
