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
            <p className="text-[10px] text-muted-foreground tracking-wider mb-1">YOU CAN SAVE</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(savings)}/month*</p>
            <p className="text-xs font-semibold text-foreground">~{savingsPercent}% reduction in monthly EMI</p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">
              *Calculation assumes a maximum {tenure} months tenure. But actual values may vary with the chosen tenure.
            </p>
          </div>
        )}

        {/* Revised loan offer */}
        <div className="mb-5">
          <p className="text-sm text-muted-foreground mb-1">You have a revised loan offer of</p>
          <p className="text-3xl font-bold text-foreground">₹{(loanAmount / 100000).toFixed(0)},00,000</p>
          <p className="text-xs text-muted-foreground mt-1">
            @{interestRate}% p.a. {rateDiff > 0 && <span className="text-primary font-semibold">• {rateDiff.toFixed(1)}% lower than current</span>}
          </p>
        </div>

        {/* EMI Plan selector */}
        <div className="border border-border rounded-2xl p-4 mb-5">
          <p className="text-[10px] text-muted-foreground tracking-wider font-semibold mb-2">— SELECT EMI PLAN —</p>
          <div className="flex items-center justify-between">
            <div className="bg-secondary rounded-xl px-4 py-3">
              <p className="text-xs text-muted-foreground">Regular</p>
              <p className="text-base font-bold text-foreground">{formatCurrency(emi)}</p>
              <p className="text-xs text-muted-foreground">× {tenure} months</p>
            </div>
            <button
              onClick={() => navigate("/make-plan")}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm active:scale-[0.97] transition-transform"
            >
              Make your<br />plan
            </button>
          </div>
        </div>

        {/* Loans Being Closed */}
        <div className="mb-5">
          <p className="text-sm font-bold text-foreground mb-3">Loans Being Closed ({selectedLoans.length})</p>
          <div className="space-y-3">
            {selectedLoans.map((loan) => (
              <div key={loan.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-foreground">{loan.bank}</p>
                  <p className="text-xs text-muted-foreground">
                    Current EMI: {formatCurrency(loan.emi)} @ {loan.rate}%
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(loan.outstanding)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => navigate("/dd-options")} className="cta-primary mb-4">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default LoanOffer;
