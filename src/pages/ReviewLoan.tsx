import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

const ReviewLoan = () => {
  const navigate = useNavigate();

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  const loanAmount = 1200000;
  const tenure = 20;
  const emi = Math.round(loanAmount / tenure + loanAmount * 0.015);
  const processingFee = 4716;
  const stampDuty = 410;
  const interestRate = 16.5;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - currentOutstanding;

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Review Loan" />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        <h2 className="text-lg font-bold text-foreground mb-4">Loan Summary</h2>

        {/* Selected Loan Details */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
          <Row label="Loan Amount" value={formatCurrency(loanAmount)} />
          <Row label="EMI" value={`${formatCurrency(emi)}/month`} />
          <Row label="Tenure" value={`${tenure} months`} />
          <Row label="Interest Rate" value={`${interestRate}% p.a.`} />
        </div>

        <h3 className="text-sm font-bold text-foreground mb-3">Charges & Deductions</h3>

        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
          <Row label="Processing fee (incl. GST)" value={`- ${formatCurrency(processingFee)}`} />
          <Row label="Stamp duty" value={`- ${formatCurrency(stampDuty)}`} />
          <Row label="Current Outstanding" value={`- ${formatCurrency(currentOutstanding)}`} />
          <div className="border-t border-border pt-3">
            <Row label="Net Disbursal" value={formatCurrency(netDisbursal)} bold />
          </div>
        </div>

        <div className="bg-accent/50 rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By proceeding, you confirm the above details are correct. The net disbursal amount will be credited to your registered bank account.
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
    </div>
  );
};

const Row = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      {label}
    </span>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground font-medium"}`}>
      {value}
    </span>
  </div>
);

export default ReviewLoan;
