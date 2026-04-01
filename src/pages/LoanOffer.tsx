import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { useLoan } from "@/context/LoanContext";

const LoanOffer = () => {
  const navigate = useNavigate();
  const { loanAmount, emi, formatCurrency, selectedLoans, totalCurrentEmi, interestRate, tenure } = useLoan();

  const savings = totalCurrentEmi - emi;
  const savingsPercent = totalCurrentEmi > 0 ? Math.round((savings / totalCurrentEmi) * 100) : 0;
  const avgCurrentRate = selectedLoans.length > 0
    ? (selectedLoans.reduce((s, l) => s + l.rate, 0) / selectedLoans.length)
    : 0;
  const rateDiff = avgCurrentRate - interestRate;

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Loan Offer" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* Savings card */}
        {savings > 0 && (
          <div className="bg-accent rounded-2xl p-5 mb-5">
            <p className="text-[10px] text-muted-foreground tracking-wider mb-1">YOU COULD SAVE</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(savings)}/month*</p>
            <p className="text-xs font-semibold text-foreground">{savingsPercent}% reduction in monthly EMI</p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">
              *This calculation assumes a maximum 72 months tenure. But final values may vary with the chosen tenure.
            </p>
          </div>
        )}

        {/* Revised offer */}
        <div className="bg-accent/30 border-2 border-primary rounded-2xl p-5 mb-5">
          <p className="text-xs text-muted-foreground mb-1">You have a revised loan offer of</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(loanAmount)}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">@{interestRate}% p.a.</span>
            {rateDiff > 0 && (
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--success))" }}>+ {rateDiff.toFixed(1)}% lower than current</span>
            )}
          </div>
        </div>

        {/* Select EMI Plan */}
        <p className="text-sm font-bold text-foreground mb-3 tracking-wide text-center">SELECT EMI PLAN</p>
        <div className="flex gap-3 mb-5">
          <div className="flex-1 border-2 border-primary rounded-2xl p-4 bg-accent/30 relative">
            <span className="absolute -top-2.5 left-3 text-[10px] bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full font-semibold">Popular</span>
            <p className="text-lg font-bold text-foreground mt-2">{formatCurrency(emi)}</p>
            <p className="text-xs text-muted-foreground">× {tenure} months</p>
          </div>
          <button onClick={() => navigate("/make-plan")}
            className="flex-1 border-2 border-border rounded-2xl p-4 flex items-center justify-center active:bg-accent/20 transition-colors">
            <span className="text-sm text-primary font-semibold">Make your<br />plan</span>
          </button>
        </div>

        {/* Loans Being Closed */}
        <p className="text-sm font-bold text-foreground mb-3">Loans Being Closed ({selectedLoans.length})</p>
        <div className="bg-card border border-border rounded-2xl p-4 mb-5 space-y-3">
          {selectedLoans.map((loan) => (
            <div key={loan.id} className="flex justify-between items-center text-sm">
              <div>
                <span className="text-foreground font-medium">{loan.bank}</span>
                <p className="text-[10px] text-muted-foreground">
                  Current EMI: {formatCurrency(loan.emi)} @ {loan.rate}%
                </p>
              </div>
              <span className="text-foreground font-medium">{formatCurrency(loan.outstanding)}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => navigate("/make-plan")} className="cta-primary mb-4">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default LoanOffer;
