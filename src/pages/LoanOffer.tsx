import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";
import { useLoan } from "@/context/LoanContext";

const LoanOffer = () => {
  const navigate = useNavigate();
  const { loanAmount, tenure, emi, formatCurrency } = useLoan();
  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const processingFee = 4720;
  const stampDuty = 410;
  const interestRate = 16.5;
  const currentOutstanding = 200000;
  const netDisbursal = loanAmount - processingFee - stampDuty - currentOutstanding;

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Loan Offer" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* Savings */}
        <div className="bg-accent rounded-2xl p-5 mb-5">
          <p className="text-xs text-muted-foreground mb-1 tracking-wide">YOU COULD SAVE</p>
          <p className="text-xl font-bold text-primary">₹3,711/month*</p>
          <p className="text-xs text-muted-foreground">4.5% reduction in monthly EMI</p>
          <p className="text-[10px] text-muted-foreground mt-2 italic">
            *Assumes max 48 months tenure. Final values may vary.
          </p>
        </div>

        {/* Offer */}
        <div className="bg-card border-2 border-primary rounded-2xl p-5 mb-5">
          <p className="text-xs text-muted-foreground mb-1">You have a revised loan offer of</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(loanAmount)}</p>
          <p className="text-xs text-muted-foreground">@11.49% p.a. • 3.2% lower than current</p>
        </div>

        {/* EMI Plan */}
        <p className="text-sm font-bold text-foreground mb-3 tracking-wide">SELECT EMI PLAN</p>
        <div className="flex gap-3 mb-5">
          <div className="flex-1 border-2 border-primary rounded-2xl p-4 bg-accent/30">
            <span className="text-[10px] bg-primary text-primary-foreground px-2.5 py-1 rounded-full font-semibold">Popular</span>
            <p className="text-lg font-bold text-foreground mt-2">{formatCurrency(emi)}</p>
            <p className="text-xs text-muted-foreground">× {tenure} months</p>
          </div>
          <button onClick={() => navigate("/make-plan")}
            className="flex-1 border-2 border-border rounded-2xl p-4 flex items-center justify-center active:bg-accent/20 transition-colors">
            <span className="text-sm text-primary font-semibold">Make your plan →</span>
          </button>
        </div>

        {/* Loans transferred */}
        <p className="text-sm font-bold text-foreground mb-3">Loans Being Transferred (2)</p>
        <div className="bg-card border border-border rounded-2xl p-5 mb-5 space-y-3">
          <LoanRow bank="HDFC Bank" type="Personal Loan" amount={formatCurrency(50000)} />
          <LoanRow bank="ICICI Bank" type="Credit Card" amount={formatCurrency(100000)} />
          <div className="border-t border-border pt-3 flex justify-between items-center text-sm font-bold">
            <span className="text-foreground">Total Outstanding</span>
            <span className="text-foreground">{formatCurrency(150000)}</span>
          </div>
        </div>

        {/* Expandable */}
        <div className="border border-border rounded-2xl overflow-hidden mb-5">
          <button onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-between items-center p-5 active:bg-secondary/50">
            <span className="text-sm font-medium text-foreground">How is my Net Disbursal calculated?</span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded && (
            <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
              <Row label="Loan amount" value={formatCurrency(loanAmount)} />
              <Row label="Processing fee (incl. GST)" value={`- ${formatCurrency(processingFee)}`} />
              <Row label="Stamp duty" value={`- ${formatCurrency(stampDuty)}`} />
              <Row label="Interest rate" value={`${interestRate}% pa`} />
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      Current Outstanding <Info size={12} className="text-muted-foreground" />
                    </span>
                    <span className="text-xs text-muted-foreground">(existing loans (2))</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-foreground block">-{formatCurrency(currentOutstanding)}</span>
                    <button onClick={() => setSheetOpen(true)} className="text-primary text-xs font-bold mt-1 active:opacity-70">
                      VIEW BREAKUP
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <Row label="Net disbursal*" value={formatCurrency(netDisbursal)} bold />
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          *Net Disbursal is the amount credited to your account after deductions.
        </p>
      </div>

      {/* Sticky bottom */}
      <div className="sticky-cta flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium tracking-wide">NET DISBURSAL</p>
          <p className="text-xl font-bold text-foreground">{formatCurrency(netDisbursal)}</p>
        </div>
        <button onClick={() => navigate("/make-plan")}
          className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.97] transition-transform shadow-md">
          Continue
        </button>
      </div>

      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-lg font-bold text-foreground mb-4">Current Outstanding Breakup</h3>
        <div className="space-y-3">
          <LoanRow bank="HDFC Bank" type="Personal Loan" amount={formatCurrency(50000)} />
          <LoanRow bank="ICICI Bank" type="Credit Card" amount={formatCurrency(100000)} />
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

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground"}`}>{value}</span>
  </div>
);

const LoanRow = ({ bank, type, amount }: { bank: string; type: string; amount: string }) => (
  <div className="flex justify-between items-center text-sm">
    <div>
      <span className="text-foreground font-medium">{bank}</span>
      <span className="text-xs text-muted-foreground ml-2">· {type}</span>
    </div>
    <span className="text-foreground">{amount}</span>
  </div>
);

export default LoanOffer;
