import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MoneyLevels from "./pages/MoneyLevels";
import FinancialFreedom from "./pages/FinancialFreedom";
import FinancialStatement from "./pages/FinancialStatement";
import GuidedTour from "./pages/GuidedTour";
import Glossary from "./pages/Glossary";
import Professionals from "./pages/Professionals";
import PassiveIncome from "./pages/PassiveIncome";
import HowWhyTools from "./pages/HowWhyTools";
import AboutUs from "./pages/AboutUs";
import FinancialLiteracy from "./pages/FinancialLiteracy";
import NowWhat from "./pages/NowWhat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/money-levels" element={<MoneyLevels />} />
          <Route path="/financial-freedom" element={<FinancialFreedom />} />
          <Route path="/financial-statement" element={<FinancialStatement />} />
          <Route path="/guided-tour" element={<GuidedTour />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/passive-income" element={<PassiveIncome />} />
          <Route path="/how-why-tools" element={<HowWhyTools />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/now-what" element={<NowWhat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
