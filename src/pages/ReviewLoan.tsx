import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";
import { Info } from "lucide-react";

const ReviewLoan = () => {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  const loanAmount = 400000;
  const tenure = 60;
  const emi = 9834;
  const processingFee = 4720;
  const stampDuty = 410;
  const interestRate = 16.5;
  const prePmtCharges = 0;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - prePmtCharges - currentOutstanding;

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Review your Loan" showBack />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        <h3 className="text-sm font-bold text-foreground mb-3">Loan Summary</h3>

        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
          <Row label="Merged Loan amount" value={formatCurrency(loanAmount)} icon />
          <Row label="New EMI Tenure" value={`${tenure} Months`} />
          <Row label="New EMI" value={formatCurrency(emi)} />
        </div>

        <h3 className="text-sm font-bold text-foreground mb-3">Fees & Charges</h3>

        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
          <Row label="Processing Fee (incl. of GST)" value={`- ${formatCurrency(processingFee)}`} />
          <Row label="Stamp Duty" value={`- ${formatCurrency(stampDuty)}`} />
          <Row label="Interest Rate" value={`${interestRate}% p.a.`} />
          <Row label="Pre-Payment Charges" value={`- ${formatCurrency(prePmtCharges)}`} />
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Current Outstanding
                  <Info size={12} className="text-muted-foreground" />
                </span>
                <span className="text-xs text-muted-foreground">(existing loans (2))</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-foreground font-medium block">- {formatCurrency(currentOutstanding)}</span>
                <button
                  onClick={() => setSheetOpen(true)}
                  className="text-primary text-xs font-semibold"
                >
                  VIEW BREAKUP
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <Row label="Net Disbursal" value={formatCurrency(netDisbursal)} bold />
          </div>
        </div>

        <div className="bg-accent/50 rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Loan Amount of {formatCurrency(netDisbursal)} will be credited to your a/c ending ****7903. EMI will be debited from the same a/c.
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={() => navigate("/otp")}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base"
        >
          Proceed to OTP
        </button>
      </div>

      {/* Bottom Sheet */}
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
        <button
          onClick={() => setSheetOpen(false)}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold mt-6"
        >
          Okay
        </button>
      </BottomSheetModal>
    </div>
  );
};

const Row = ({
  label,
  value,
  bold,
  icon,
}: {
  label: string;
  value: string;
  bold?: boolean;
  icon?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm flex items-center gap-1 ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      {label}
      {icon && <Info size={12} className="text-muted-foreground" />}
    </span>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground font-medium"}`}>
      {value}
    </span>
  </div>
);

export default ReviewLoan;
