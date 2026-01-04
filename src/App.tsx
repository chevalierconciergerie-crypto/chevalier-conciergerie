import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Conciergerie from "./pages/Conciergerie";
import SousLocation from "./pages/SousLocation";
import EstimationSousLocation from "./pages/EstimationSousLocation";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/conciergerie" element={<Conciergerie />} />
            <Route path="/sous-location" element={<SousLocation />} />
            <Route path="/estimation-sous-location" element={<EstimationSousLocation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
