import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AddLoanDetails from "./pages/AddLoanDetails";
import LoanOffer from "./pages/LoanOffer";
import MakePlan from "./pages/MakePlan";
import ReviewLoan from "./pages/ReviewLoan";
import OtpVerification from "./pages/OtpVerification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/add-loan" element={<AddLoanDetails />} />
          <Route path="/loan-offer" element={<LoanOffer />} />
          <Route path="/make-plan" element={<MakePlan />} />
          <Route path="/review" element={<ReviewLoan />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
