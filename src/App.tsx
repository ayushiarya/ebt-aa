import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpVerification from "./pages/OtpVerification";
import BureauLoader from "./pages/BureauLoader";
import AddLoanDetails from "./pages/AddLoanDetails";
import GeneratingOfferLoader from "./pages/GeneratingOfferLoader";
import LoanOffer from "./pages/LoanOffer";
import ApplicationStatus from "./pages/ApplicationStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OtpVerification />} />
          <Route path="/bureau-loader" element={<BureauLoader />} />
          <Route path="/add-loan" element={<AddLoanDetails />} />
          <Route path="/generating-offer" element={<GeneratingOfferLoader />} />
          <Route path="/loan-offer" element={<LoanOffer />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
