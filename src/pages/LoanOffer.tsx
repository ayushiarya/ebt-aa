import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";

const LoanOffer = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const loanAmount = 400000;
  const tenure = 60;
  const emi = 9834;
  const processingFee = 4720;
  const stampDuty = 410;
  const interestRate = 16.5;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - currentOutstanding;

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Loan Offer" showBack />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {/* Savings highlight */}
        <div className="bg-accent rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">YOU COULD SAVE</p>
          <p className="text-xl font-bold text-primary">₹3,711/month*</p>
          <p className="text-xs text-muted-foreground">4.5% reduction in monthly EMI</p>
          <p className="text-[10px] text-muted-foreground mt-2 italic">
            *This calculation assumes a maximum 48 months tenure. But final values may vary with the chosen tenure.
          </p>
        </div>

        {/* Revised offer */}
        <div className="bg-card border-2 border-primary rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">You have a revised loan offer of</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(loanAmount)}</p>
          <p className="text-xs text-muted-foreground">@11.49% p.a. • 3.2% lower than current</p>
        </div>

        {/* EMI Plan */}
        <p className="text-sm font-bold text-foreground mb-3">SELECT EMI PLAN</p>
        <div className="flex gap-3 mb-4">
          <div className="flex-1 border-2 border-primary rounded-xl p-3 bg-accent/30">
            <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">Popular</span>
            <p className="text-lg font-bold text-foreground mt-2">{formatCurrency(emi)}</p>
            <p className="text-xs text-muted-foreground">× {tenure} months</p>
          </div>
          <button
            onClick={() => navigate("/make-plan")}
            className="flex-1 border border-border rounded-xl p-3 flex items-center justify-center"
          >
            <span className="text-sm text-primary font-semibold">Make your plan</span>
          </button>
        </div>

        {/* Loans being transferred */}
        <p className="text-sm font-bold text-foreground mb-3">Loans Being Transferred (2)</p>
        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-foreground font-medium">HDFC Bank</span>
              <span className="text-xs text-muted-foreground ml-2">· Personal Loan</span>
            </div>
            <span className="text-foreground">{formatCurrency(50000)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-foreground font-medium">ICICI Bank</span>
              <span className="text-xs text-muted-foreground ml-2">· Credit Card</span>
            </div>
            <span className="text-foreground">{formatCurrency(100000)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-center text-sm font-bold">
            <span className="text-foreground">Total Outstanding</span>
            <span className="text-foreground">{formatCurrency(150000)}</span>
          </div>
        </div>

        {/* Expandable breakdown */}
        <div className="border border-border rounded-xl overflow-hidden mb-4">
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
              <BreakupRow label="Loan amount" value={formatCurrency(loanAmount)} />
              <BreakupRow label="Processing fee (incl. of GST)" value={`- ${formatCurrency(processingFee)}`} info onInfoClick={() => setSheetOpen(true)} />
              <BreakupRow label="Stamp duty" value={`- ${formatCurrency(stampDuty)}`} />
              <BreakupRow label="Interest rate" value={`${interestRate}% pa`} />
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
                    <span className="text-sm text-foreground block">-{formatCurrency(currentOutstanding)}</span>
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
                <BreakupRow label="Net disbursal*" value={formatCurrency(netDisbursal)} bold />
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-6">
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
          onClick={() => navigate("/review")}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-sm"
        >
          Review Loan
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

const BreakupRow = ({
  label,
  value,
  bold,
  info,
  onInfoClick,
}: {
  label: string;
  value: string;
  bold?: boolean;
  info?: boolean;
  onInfoClick?: () => void;
}) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm flex items-center gap-1 ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      {label}
      {info && <Info size={12} className="text-muted-foreground cursor-pointer" onClick={onInfoClick} />}
    </span>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

export default LoanOffer;
