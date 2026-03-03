import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";
import { Info } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const ReviewLoan = () => {
  const navigate = useNavigate();
  const { loanAmount, tenure, emi, formatCurrency } = useLoan();
  const [sheetOpen, setSheetOpen] = useState(false);

  const processingFee = 4720;
  const stampDuty = 410;
  const interestRate = 16.5;
  const prePmtCharges = 0;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - prePmtCharges - currentOutstanding;

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Review your Loan" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">Loan Summary</h3>

        <div className="bg-card border border-border rounded-2xl p-5 mb-5 space-y-4">
          <Row label="Merged Loan amount" value={formatCurrency(loanAmount)} icon />
          <Row label="New EMI Tenure" value={`${tenure} Months`} />
          <Row label="New EMI" value={formatCurrency(emi)} />
        </div>

        <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">Fees & Charges</h3>

        <div className="bg-card border border-border rounded-2xl p-5 mb-5 space-y-4">
          <Row label="Processing Fee (incl. of GST)" value={`- ${formatCurrency(processingFee)}`} />
          <Row label="Stamp Duty" value={`- ${formatCurrency(stampDuty)}`} />
          <Row label="Interest Rate" value={`${interestRate}% p.a.`} />
          <Row label="Pre-Payment Charges" value={`- ${formatCurrency(prePmtCharges)}`} />
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Current Outstanding <Info size={12} className="text-muted-foreground" />
                </span>
                <span className="text-xs text-muted-foreground">(existing loans (2))</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-foreground font-medium block">- {formatCurrency(currentOutstanding)}</span>
                <button onClick={() => setSheetOpen(true)} className="text-primary text-xs font-bold mt-1 active:opacity-70">
                  VIEW BREAKUP
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <Row label="Net Disbursal" value={formatCurrency(netDisbursal)} bold />
          </div>
        </div>

        <div className="bg-accent/50 rounded-xl p-4 mb-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Loan Amount of {formatCurrency(netDisbursal)} will be credited to your a/c ending ****7903. EMI will be debited from the same a/c.
          </p>
        </div>
      </div>

      <div className="sticky-cta">
        <button onClick={() => navigate("/otp")} className="cta-primary">Proceed to OTP</button>
      </div>

      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-lg font-bold text-foreground mb-4">Current Outstanding Breakup</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-foreground font-medium">HDFC Bank</span>
              <span className="text-xs text-muted-foreground ml-2">Personal Loan</span>
            </div>
            <span className="text-foreground font-medium">{formatCurrency(50000)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-foreground font-medium">ICICI Bank</span>
              <span className="text-xs text-muted-foreground ml-2">Credit Card</span>
            </div>
            <span className="text-foreground font-medium">{formatCurrency(100000)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-foreground">Total Outstanding</span>
            <span className="text-sm font-bold text-primary">{formatCurrency(150000)}</span>
          </div>
        </div>
        <button onClick={() => setSheetOpen(false)} className="cta-primary mt-6">Okay</button>
      </BottomSheetModal>
    </div>
  );
};

const Row = ({ label, value, bold, icon }: { label: string; value: string; bold?: boolean; icon?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm flex items-center gap-1 ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      {label} {icon && <Info size={12} className="text-muted-foreground" />}
    </span>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground font-medium"}`}>{value}</span>
  </div>
);

export default ReviewLoan;
