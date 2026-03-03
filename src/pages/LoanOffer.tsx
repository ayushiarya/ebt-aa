import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";

const LoanOffer = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const loanAmount = 1200000;
  const tenure = 18;
  const emi = 11000;
  const processingFee = 4716;
  const stampDuty = 410;
  const interestRate = 16.5;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - currentOutstanding;

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Loan Offer" />

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

        {/* Loan Amount Summary */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <Row label="Loan Amount" value={formatCurrency(loanAmount)} bold />
        </div>

        {/* Charges Summary */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
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

        {/* Expandable section */}
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
            <div className="px-4 pb-4 border-t border-border pt-3 space-y-2">
              <p className="text-sm text-muted-foreground">
                Net Disbursal = Loan Amount − Processing Fee − Stamp Duty − Current Outstanding of your existing loans.
              </p>
              <p className="text-sm text-muted-foreground">
                The remaining amount after paying off your existing loans is credited to your bank account.
              </p>
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
          onClick={() => navigate("/make-plan")}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-sm"
        >
          Continue
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-xl font-bold text-foreground mb-2">Existing Loan Breakup</h3>
        <div className="space-y-3 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">HDFC Personal Loan</span>
            <span className="text-foreground font-medium">{formatCurrency(120000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ICICI Credit Card</span>
            <span className="text-foreground font-medium">{formatCurrency(80000)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between text-sm font-bold">
            <span className="text-foreground">Total Outstanding</span>
            <span className="text-foreground">{formatCurrency(currentOutstanding)}</span>
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

export default LoanOffer;
