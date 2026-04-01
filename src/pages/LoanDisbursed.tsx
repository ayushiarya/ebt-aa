import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Download, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const LoanDisbursed = () => {
  const navigate = useNavigate();
  const { formatCurrency, netDisbursal, emi, tenure, selectedLoanCentre } = useLoan();
  const [breakupOpen, setBreakupOpen] = useState(false);
  const appId = "MLP000001029055";

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      {/* Brand bar */}
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-sm tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* Congratulations */}
        <div className="text-center mb-5">
          <p className="text-[10px] text-primary tracking-wider font-bold mb-1">CONGRATULATIONS</p>
          <h2 className="text-lg font-bold text-primary mb-1">Your loan is disbursed</h2>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(netDisbursal)} has been credited to your account
          </p>
        </div>

        {/* Close Your Old Loan */}
        <div className="bg-primary/10 rounded-2xl p-4 mb-5">
          <p className="text-[10px] text-primary tracking-wider font-bold mb-3 flex items-center gap-1">
            ✅ CLOSE YOUR OLD LOAN
          </p>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary">1</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Collect the Demand Draft</p>
                <p className="text-xs text-muted-foreground">Visit your selected Axis Bank loan centre and collect the DD.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary">2</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Submit DD to your old lender</p>
                <p className="text-xs text-muted-foreground">Hand it to your previous lender's branch to close the loan immediately.</p>
              </div>
            </div>

            {selectedLoanCentre && (
              <div className="flex gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedLoanCentre.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedLoanCentre.address}</p>
                  <button className="text-primary text-xs font-bold mt-1 flex items-center gap-1 active:opacity-70">
                    GET DIRECTION <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Net Disbursal Card */}
        <div className="border border-border rounded-2xl p-5 mb-5 text-center">
          <p className="text-[10px] text-muted-foreground tracking-wider mb-1">NET DISBURSAL</p>
          <p className="text-2xl font-bold text-foreground mb-1">{formatCurrency(netDisbursal)}</p>
          <p className="text-[10px] text-muted-foreground">Application ID: {appId}</p>

          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">EMI PLAN</p>
              <p className="text-xs font-bold text-foreground">{formatCurrency(emi)} | {tenure} mon</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">EMI STARTS</p>
              <p className="text-xs font-bold text-foreground">4 March, 2026</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-border">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-[8px] font-bold">A</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground">DISBURSAL & EMI ACCOUNT</p>
              <p className="text-xs font-bold text-foreground">Axis Bank 9090 **** 0808</p>
            </div>
          </div>

          {/* View Breakup */}
          <button onClick={() => setBreakupOpen(!breakupOpen)}
            className="text-primary text-xs font-bold mt-3 flex items-center gap-1 mx-auto active:opacity-70">
            VIEW BREAKUP {breakupOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {breakupOpen && (
            <div className="mt-3 pt-3 border-t border-border text-left space-y-2">
              <p className="text-xs text-muted-foreground">EMI STARTS: {formatCurrency(emi)} for {tenure} months on 4 March, 2026</p>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground mt-3">You'll receive the KFS over registered email.</p>
        </div>

        {/* Download Documents */}
        <p className="text-[10px] text-muted-foreground tracking-wider font-semibold mb-2">DOWNLOAD DOCUMENTS</p>
        <div className="border border-border rounded-xl p-4 flex justify-between items-center mb-5">
          <span className="text-sm text-foreground">KFS statement</span>
          <button className="text-muted-foreground active:opacity-70"><Download size={18} /></button>
        </div>

        <button onClick={() => navigate("/")} className="cta-primary mb-4">
          Okay
        </button>
      </div>
    </div>
  );
};

export default LoanDisbursed;
