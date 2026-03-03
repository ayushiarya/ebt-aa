import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";
import { useLoan } from "@/context/LoanContext";

const MAX_TOPUP = 200000;

const MakePlan = () => {
  const navigate = useNavigate();

  const {
    loanAmount,
    setLoanAmount,
    tenure,
    setTenure,
    emi,
    formatCurrency,
    selectedLoans,
    totalOutstanding,
    processingFee,
    stampDuty,
    interestRate,
    netDisbursal
  } = useLoan();

  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const baseOutstanding = totalOutstanding;

  const currentTopUp = Math.min(
    Math.max(loanAmount - baseOutstanding, 0),
    MAX_TOPUP
  );

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Make your plan" />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* EMI */}
        <div className="bg-secondary rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
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

        {/* Top-up Slider */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Top-up Amount
              </p>
              <p className="text-xs text-muted-foreground">
                Existing takeover: {formatCurrency(baseOutstanding)}
              </p>
              <p className="text-xs text-muted-foreground">
                {interestRate}% p.a
              </p>
            </div>

            {/* 🔥 Show ONLY top-up amount */}
            <div className="border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-foreground min-w-[100px] text-center">
              {formatCurrency(currentTopUp)}
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>0</span>
            <span>50K</span>
            <span>1L</span>
            <span>1.5L</span>
            <span>2L</span>
          </div>

          <input
            type="range"
            min={0}
            max={MAX_TOPUP}
            step={10000}
            value={currentTopUp}
            onChange={(e) => {
              const newTopUp = Number(e.target.value);
              setLoanAmount(baseOutstanding + newTopUp);
            }}
            className="w-full"
          />
        </div>

        {/* Tenure */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">Tenure</p>
              <p className="text-xs text-muted-foreground">(In months)</p>
            </div>
            <div className="border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-foreground min-w-[60px] text-center">
              {tenure}
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>12M</span>
            <span>24M</span>
            <span>36M</span>
            <span>48M</span>
          </div>

          <input
            type="range"
            min={12}
            max={48}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Net Disbursal */}
        <div className="border border-border rounded-2xl overflow-hidden mb-5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-between items-center p-5 active:bg-secondary/50"
          >
            <span className="text-sm font-medium text-foreground">
              How is my Net Disbursal calculated?
            </span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {expanded && (
            <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
              <Row label="Loan amount" value={formatCurrency(loanAmount)} bold />
              <Row
                label="Processing fee (incl. of GST)"
                value={`- ${formatCurrency(processingFee)}`}
              />
              <Row label="Stamp duty" value={`- ${formatCurrency(stampDuty)}`} />
              <Row label="Interest rate" value={`${interestRate}% pa`} />

              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-foreground flex items-center gap-1">
                      Current Outstanding
                      <Info size={12} className="text-muted-foreground" />
                    </span>
                    <span className="text-xs text-muted-foreground">
                      (existing loans ({selectedLoans.length}))
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-foreground block">
                      -{formatCurrency(totalOutstanding)}
                    </span>
                    <button
                      onClick={() => setSheetOpen(true)}
                      className="text-primary text-xs font-bold mt-1 active:opacity-70"
                    >
                      VIEW BREAKUP
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <Row
                  label="Net disbursal*"
                  value={formatCurrency(netDisbursal)}
                  bold
                />
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-5">
          *Net Disbursal is the amount that you'll get in your bank account after the deductions.
        </p>

        <div className="flex items-center justify-between border-t border-border pt-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium tracking-wide">
              NET DISBURSAL
            </p>
            <p className="text-xl font-bold text-foreground">
              {formatCurrency(netDisbursal)}
            </p>
          </div>

          <button
            onClick={() => navigate("/review")}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm active:scale-[0.97] transition-transform shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>

      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-lg font-bold text-foreground mb-4">
          Current Outstanding Breakup
        </h3>

        <div className="space-y-3">
          {selectedLoans.map((loan) => (
            <div
              key={loan.id}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <span className="text-foreground font-medium">
                  {loan.bank}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {loan.type}
                </span>
              </div>
              <span className="text-foreground font-medium">
                {formatCurrency(loan.outstanding)}
              </span>
            </div>
          ))}

          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-foreground">
              Total Outstanding
            </span>
            <span className="text-sm font-bold text-primary">
              {formatCurrency(totalOutstanding)}
            </span>
          </div>
        </div>

        <button onClick={() => setSheetOpen(false)} className="cta-primary mt-6">
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
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span
      className={`text-sm ${
        bold ? "font-bold text-foreground" : "text-muted-foreground"
      }`}
    >
      {label}
    </span>
    <span
      className={`text-sm ${
        bold ? "font-bold text-foreground" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);

export default MakePlan;
