import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";

const LoanOffer = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [tenure, setTenure] = useState(20);
  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const emi = Math.round(loanAmount / tenure + loanAmount * 0.015);
  const processingFee = Math.round(loanAmount * 0.00393);
  const stampDuty = 410;
  const interestRate = 16.5;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - currentOutstanding;

  const formatCurrency = (n: number) =>
    "₹" + n.toLocaleString("en-IN");

  const loanAmountLabels = ["1L", "3L", "6L", "9L", "12L"];
  const tenureLabels = ["12M", "24M", "36M", "48M"];

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Make your plan" />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {/* EMI summary */}
        <div className="bg-secondary rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">EMI</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-xl font-bold text-foreground">
              {formatCurrency(emi)}/m
            </span>
            <span className="text-sm text-muted-foreground">
              × {tenure} months
            </span>
          </div>
        </div>

        {/* Loan Amount Slider */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-1">
            <div>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
              <p className="text-xs text-muted-foreground">{interestRate}% p.a</p>
            </div>
            <div className="border border-border rounded-lg px-3 py-2 text-sm font-medium text-foreground">
              {formatCurrency(loanAmount)}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1 mt-3">
            {loanAmountLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <input
            type="range"
            min={100000}
            max={1200000}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-foreground [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
          />
        </div>

        {/* Tenure Slider */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-1">
            <div>
              <p className="text-sm text-muted-foreground">Tenure</p>
              <p className="text-xs text-muted-foreground">(In months)</p>
            </div>
            <div className="border border-border rounded-lg px-3 py-2 text-sm font-medium text-foreground">
              {tenure}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1 mt-3">
            {tenureLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <input
            type="range"
            min={12}
            max={48}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-foreground [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
          />
        </div>

        {/* Net Disbursal Breakdown */}
        <div className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-between items-center p-4"
          >
            <span className="text-sm font-medium text-foreground">
              How is my Net Disbursal calculated?
            </span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {expanded && (
            <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
              <Row label="Loan amount" value={formatCurrency(loanAmount)} bold />
              <Row
                label={
                  <span className="flex items-center gap-1">
                    Processing fee (incl. of GST)
                    <Info size={12} className="text-muted-foreground cursor-pointer" onClick={() => setSheetOpen(true)} />
                  </span>
                }
                value={`- ${formatCurrency(processingFee)}`}
              />
              <Row label="Stamp duty" value={`- ${formatCurrency(stampDuty)}`} />
              <Row label="Interest rate" value={`${interestRate}% pa`} />
              <div className="border-t border-border pt-3">
                <Row
                  label={
                    <span>
                      <span className="flex items-center gap-1">
                        Current Outstanding
                        <Info size={12} className="text-muted-foreground" />
                      </span>
                      <span className="text-xs text-muted-foreground">(existing loans (2))</span>
                    </span>
                  }
                  value={
                    <span>
                      <span className="block">-{formatCurrency(currentOutstanding)}</span>
                      <button
                        onClick={() => setSheetOpen(true)}
                        className="text-primary text-xs font-semibold"
                      >
                        VIEW BREAKUP
                      </button>
                    </span>
                  }
                />
              </div>
              <div className="border-t border-border pt-3">
                <Row label="Net disbursal*" value={formatCurrency(netDisbursal)} bold />
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-3 mb-6">
          *Net Disbursal is the amount that you'll get in your bank account after the deductions.
        </p>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-background border-t border-border px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium tracking-wide">NET DISBURSAL</p>
          <p className="text-xl font-bold text-foreground">{formatCurrency(netDisbursal)}</p>
        </div>
        <button
          onClick={() => navigate("/application-status")}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-sm"
        >
          Confirm
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-xl font-bold text-foreground mb-2">External Balance Transfer</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Consolidate your loans into one Axis Bank Personal Loan for a lower interest rate.
        </p>
        <p className="text-xs font-bold text-foreground tracking-wide mb-4">HOW IT WORKS?</p>
        <div className="space-y-0">
          <StepItem icon="📋" text="Select the loans you want to close" showLine />
          <StepItem icon="🤝" text="We pay loans directly to your lenders" showLine />
          <StepItem
            icon="₹"
            text={<span>Your loans consolidate into <strong>one Axis Bank Personal Loan</strong></span>}
          />
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
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  bold?: boolean;
}) => (
  <div className="flex justify-between items-start">
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      {label}
    </span>
    <span className={`text-sm text-right ${bold ? "font-bold text-foreground" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

const StepItem = ({
  icon,
  text,
  showLine,
}: {
  icon: string;
  text: React.ReactNode;
  showLine?: boolean;
}) => (
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg shrink-0">
        {icon}
      </div>
      {showLine && <div className="w-0.5 h-8 bg-border" />}
    </div>
    <p className="text-sm text-foreground pt-2.5">{text}</p>
  </div>
);

export default LoanOffer;
