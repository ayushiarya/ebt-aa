import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Info, X } from "lucide-react";
import BottomSheetModal from "@/components/BottomSheetModal";
import { useLoan } from "@/context/LoanContext";

const TENURE_PRESETS = [12, 24, 36, 48, 72];

const MakePlan = () => {
  const navigate = useNavigate();
  const {
    loanAmount, setLoanAmount, tenure, setTenure, emi, formatCurrency,
    selectedLoans, totalOutstanding, processingFee, stampDuty, interestRate,
    netDisbursal, maxLoanAmount
  } = useLoan();

  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const minLoan = 100000;

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

      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-foreground"><X size={20} /></button>
        <h1 className="text-lg font-semibold text-foreground">Make your plan</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* EMI bar */}
        <div className="bg-secondary rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground">EMI</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-xl font-bold text-foreground">{formatCurrency(emi)}/m</span>
            <span className="text-sm text-muted-foreground">× {tenure} months</span>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <div>
              <p className="text-sm font-medium text-foreground">Loan Amount</p>
              <p className="text-xs text-muted-foreground">{interestRate}% p.a</p>
            </div>
            <div className="border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-foreground min-w-[120px] text-center">
              {formatCurrency(loanAmount)}
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground mb-2 mt-3">
            <span>1L</span>
            <span>10L</span>
            <span>20L</span>
            <span>30L</span>
            <span>40L</span>
          </div>
          <input
            type="range"
            min={minLoan}
            max={maxLoanAmount}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Tenure */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm font-medium text-foreground">Tenure</p>
              <p className="text-xs text-muted-foreground">(in months)</p>
            </div>
            <div className="border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-foreground min-w-[60px] text-center">
              {tenure}
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            {TENURE_PRESETS.map((t) => (
              <button key={t} onClick={() => setTenure(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tenure === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}>
                {t}M
              </button>
            ))}
          </div>

          <input
            type="range"
            min={12}
            max={72}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Net Disbursal Accordion */}
        <div className="border border-border rounded-2xl overflow-hidden mb-5">
          <button onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-between items-center p-4 active:bg-secondary/50">
            <span className="text-sm font-medium text-foreground">How is my Net Disbursal calculated?</span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {expanded && (
            <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
              <Row label="Loan amount" value={formatCurrency(loanAmount)} />
              <Row label="Processing fee (incl. of GST)" value={`- ${formatCurrency(processingFee)}`} />
              <Row label="Stamp duty" value={`- ${formatCurrency(stampDuty)}`} />
              <Row label="Interest rate" value={`${interestRate}% pa`} />

              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      Current Outstanding <Info size={12} />
                    </span>
                    <span className="text-xs text-muted-foreground">(existing loans ({selectedLoans.length}))</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-foreground block">-{formatCurrency(totalOutstanding)}</span>
                    <button onClick={() => setSheetOpen(true)}
                      className="text-primary text-xs font-bold mt-1 active:opacity-70">VIEW BREAKUP</button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <Row label="Net disbursal*" value={formatCurrency(netDisbursal)} bold />
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-5">
          *Net Disbursal is the amount that you'll get in your bank account after the deductions.
        </p>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between border-t border-border pt-4 mb-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-medium tracking-wider">NET DISBURSAL</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(netDisbursal)}</p>
          </div>
          <button onClick={() => navigate("/choose-centre")}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.97] transition-transform shadow-md">
            Proceed
          </button>
        </div>
      </div>

      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-lg font-bold text-foreground mb-4">Current Outstanding Breakup</h3>
        <div className="space-y-3">
          {selectedLoans.map((loan) => (
            <div key={loan.id} className="flex justify-between items-center text-sm">
              <div>
                <span className="text-foreground font-medium">{loan.bank}</span>
                <span className="text-xs text-muted-foreground ml-2">{loan.type}</span>
              </div>
              <span className="text-foreground font-medium">{formatCurrency(loan.outstanding)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-foreground">Total Outstanding</span>
            <span className="text-sm font-bold text-primary">{formatCurrency(totalOutstanding)}</span>
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

export default MakePlan;
