import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "@/lib/seo";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Conciergerie from "./pages/Conciergerie";
import SousLocation from "./pages/SousLocation";
import EstimationSousLocation from "./pages/EstimationSousLocation";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import ConciergerieAvignon from "./pages/ConciergerieAvignon";
import ConciergerieVilleneuve from "./pages/ConciergerieVilleneuve";
import ConciergerieLesAngles from "./pages/ConciergerieLesAngles";
import Partenaires from "./pages/Partenaires";
import APropos from "./pages/APropos";
import CGV from "./pages/CGV";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
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
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/conciergerie-avignon" element={<ConciergerieAvignon />} />
            <Route path="/conciergerie-villeneuve-les-avignon" element={<ConciergerieVilleneuve />} />
            <Route path="/conciergerie-les-angles" element={<ConciergerieLesAngles />} />
            {/*
              Réservation en direct retirée en attendant que le site de réservation
              soit opérationnel. Les composants restent dans le dépôt (PropertyDetail,
              Reservation, Logements, PropertyShowcase, BookingQuickSearch) : il
              suffira de rétablir ces trois routes et les entrées de navigation.
            */}
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalArticle />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
