import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { ChevronUp, ChevronDown, Info } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const TermsConditions = () => {
  const navigate = useNavigate();
  const { loanAmount, tenure, emi, formatCurrency, processingFee, interestRate, netDisbursal, totalOutstanding, selectedLoans } = useLoan();
  const [scheduleOpen, setScheduleOpen] = useState(true);

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Terms & Conditions" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* Schedule of Charges */}
        <div className="border border-border rounded-2xl overflow-hidden mb-5">
          <button onClick={() => setScheduleOpen(!scheduleOpen)}
            className="w-full flex justify-between items-center p-4 active:bg-secondary/50">
            <span className="text-sm font-bold text-foreground">Schedule of Charges</span>
            {scheduleOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {scheduleOpen && (
            <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-1">Facility Amount <Info size={12} /></span>
                <span className="text-sm text-foreground font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Number of Installments</span>
                <span className="text-sm text-foreground font-medium">{tenure} Months</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  1st year MCLR 8.60% p.a. + SPREAD 3.39% p.a.<br />
                  = effective rate of interest {interestRate}% p.a. No reset.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Processing fee (incl. of GST)</span>
                <span className="text-sm text-foreground font-medium">{formatCurrency(processingFee)}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Early closure / Part closure charges</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Personal loan Account for {formatCurrency(loanAmount)} @{interestRate}% p.a for {tenure} months will be disbursed.
                  Foreclosure amount of {formatCurrency(totalOutstanding)} will be credited to existing loan a/c.
                  Net amount of {formatCurrency(netDisbursal)} will be credited to your savings account.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Loan Details */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <h3 className="text-sm font-bold text-foreground mb-3">Loan Details</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Personal loan Account for {formatCurrency(loanAmount)} @{interestRate}% p.a for {tenure} months will be disbursed.
            {selectedLoans.length > 0 && (
              <> Foreclosure amount of {formatCurrency(totalOutstanding)} will be credited to existing loan a/c no {selectedLoans[0]?.accountNumber || "PPR067704117901"}.
              Net amount of {formatCurrency(netDisbursal)}.
              Shortfall amount for closure of Loan will be credited into my savings a/c.
              Excess EMI / Excess amount credited to Loan A/c while closure of loan.</>
            )}
          </p>
        </div>

        {/* Net Disbursal info */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <h3 className="text-sm font-bold text-foreground mb-2">Net Disbursal</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Net Disbursal is the amount that you'll get in your bank account after the deductions.
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Loan Amount of {formatCurrency(netDisbursal)} will be credited to your a/c ending **** 0808. EMI will be debited from the same a/c.
            <br />Starts March 4th, 2026
          </p>
        </div>

        {/* EMI Payment */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <h3 className="text-sm font-bold text-foreground mb-2">EMI Payment (Monthly)</h3>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div>
              <p>Account Opening Date:</p>
              <p className="text-foreground font-medium">-</p>
            </div>
            <div>
              <p>EMI Cycle Date:</p>
              <p className="text-foreground font-medium">4th of every month</p>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/otp")} className="cta-primary mb-4">
          I Agree
        </button>
      </div>
    </div>
  );
};

export default TermsConditions;
