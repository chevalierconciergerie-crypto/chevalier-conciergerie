import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from "@/lib/seo";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Conciergerie from "./pages/Conciergerie";
import SousLocation from "./pages/SousLocation";
import Tarifs from "./pages/Tarifs";
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
            <Route path="/tarifs" element={<Tarifs />} />
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
          {/*
            Mesure d'audience Vercel (incluse dans l'offre Pro). Placés à l'intérieur du
            routeur : c'est ce qui leur permet de compter les changements de page d'une
            SPA, où aucun rechargement ne se produit.

            Analytics donne les pages vues, les sources de trafic et les taux de clic.
            SpeedInsights remonte les Core Web Vitals mesurés sur de vrais visiteurs —
            le LCP réel, celui que Google utilise pour classer, et non une simulation.

            Sans cookie ni identifiant personnel : rien à ajouter au bandeau de
            consentement. Google Analytics reste à activer séparément dans index.html
            une fois l'identifiant G-… créé.
          */}
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
