import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { useLoan } from "@/context/LoanContext";

const MakePlan = () => {
  const navigate = useNavigate();
  const { loanAmount, setLoanAmount, tenure, setTenure, emi, formatCurrency } = useLoan();

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Make your plan" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* EMI summary */}
        <div className="bg-secondary rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground">EMI</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-xl font-bold text-foreground">{formatCurrency(emi)}/m</span>
            <span className="text-sm text-muted-foreground">× {tenure} months</span>
          </div>
        </div>

        {/* Loan Amount Slider */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">Loan Amount</p>
              <p className="text-xs text-muted-foreground">16.5% p.a</p>
            </div>
            <div className="border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-foreground min-w-[100px] text-center">
              {formatCurrency(loanAmount)}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>1L</span><span>3L</span><span>6L</span><span>9L</span><span>12L</span>
          </div>
          <input
            type="range" min={100000} max={1200000} step={10000}
            value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Tenure Slider */}
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
            <span>12M</span><span>24M</span><span>36M</span><span>48M</span>
          </div>
          <input
            type="range" min={12} max={48} step={1}
            value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="sticky-cta">
        <button onClick={() => navigate("/review")} className="cta-primary">Confirm</button>
      </div>
    </div>
  );
};

export default MakePlan;
