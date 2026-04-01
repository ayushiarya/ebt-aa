import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoanProvider } from "@/context/LoanContext";
import Landing from "./pages/Landing";
import BureauLoader from "./pages/BureauLoader";
import BureauResults from "./pages/BureauResults";
import OfferLoader from "./pages/OfferLoader";
import LoanOffer from "./pages/LoanOffer";
import MakePlan from "./pages/MakePlan";
import ChooseLoanCentre from "./pages/ChooseLoanCentre";
import ReviewLoan from "./pages/ReviewLoan";
import TermsConditions from "./pages/TermsConditions";
import OtpVerification from "./pages/OtpVerification";
import ApplicationSubmitted from "./pages/ApplicationSubmitted";
import LoanDisbursed from "./pages/LoanDisbursed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LoanProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/bureau-loader" element={<BureauLoader />} />
            <Route path="/bureau-results" element={<BureauResults />} />
            <Route path="/offer-loader" element={<OfferLoader />} />
            <Route path="/loan-offer" element={<LoanOffer />} />
            <Route path="/make-plan" element={<MakePlan />} />
            <Route path="/choose-centre" element={<ChooseLoanCentre />} />
            <Route path="/review" element={<ReviewLoan />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/otp" element={<OtpVerification />} />
            <Route path="/submitted" element={<ApplicationSubmitted />} />
            <Route path="/disbursed" element={<LoanDisbursed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoanProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
