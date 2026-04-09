import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Download, ChevronDown, ChevronUp, ExternalLink, Package, Truck, Home } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const LoanDisbursed = () => {
  const navigate = useNavigate();
  const { formatCurrency, netDisbursal, emi, tenure, selectedLoanCentre, ddOption } = useLoan();
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

        {/* Close Your Old Loan - conditional content */}
        <div className="bg-primary/10 rounded-2xl p-4 mb-5">
          <p className="text-[10px] text-primary tracking-wider font-bold mb-3 flex items-center gap-1">
            ✅ CLOSE YOUR OLD LOAN
          </p>

          {ddOption === "home" ? (
            /* Home Delivery Timeline */
            <div>
              <p className="text-sm font-bold text-foreground mb-3">Demand Draft Delivery Timeline</p>
              <div className="space-y-0">
                {/* Step 1 - DD Prepared */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Package size={12} className="text-primary-foreground" />
                    </div>
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-semibold text-foreground">Demand Draft prepared</p>
                    <p className="text-xs text-muted-foreground">Your demand draft is ready</p>
                  </div>
                </div>

                {/* Step 2 - Out for delivery */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-muted-foreground">2</span>
                    </div>
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-semibold text-foreground">Out for delivery</p>
                  </div>
                </div>

                {/* Step 3 - Delivered */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-muted-foreground">3</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Delivered to your address</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Self DD Collection Steps */
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Collect the Demand Draft</p>
                  <p className="text-xs text-muted-foreground">Visit your selected Axis Bank loan centre to collect the DD, which is now ready!</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Submit DD to your old lender</p>
                  <p className="text-xs text-muted-foreground">Take it to your previous lender's branch to close the loan immediately.</p>
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
          )}
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
        </div>

        <button onClick={() => navigate("/")} className="cta-primary mb-4">
          Okay
        </button>
      </div>
    </div>
  );
};

export default LoanDisbursed;
