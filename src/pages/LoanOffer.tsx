import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { useLoan } from "@/context/LoanContext";
import { MapPin, Info, Truck } from "lucide-react";

const LoanOffer = () => {
  const navigate = useNavigate();
  const { loanAmount, emi, formatCurrency, selectedLoans, totalCurrentEmi, interestRate, tenure, ddOption, setDdOption } = useLoan();

  const savings = totalCurrentEmi - emi;
  const savingsPercent = totalCurrentEmi > 0 ? Math.round((savings / totalCurrentEmi) * 100) : 0;
  const avgCurrentRate = selectedLoans.length > 0
    ? (selectedLoans.reduce((s, l) => s + l.rate, 0) / selectedLoans.length)
    : 0;
  const rateDiff = avgCurrentRate - interestRate;

  const handleProceed = () => {
    if (ddOption === "self") {
      navigate("/choose-centre");
    } else {
      navigate("/review");
    }
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Loan Offer" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* Savings card */}
        {savings > 0 && (
          <div className="bg-accent rounded-2xl p-5 mb-5">
            <p className="text-[10px] text-muted-foreground tracking-wider mb-1">YOU CAN SAVE</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(savings)}/month*</p>
            <p className="text-xs font-semibold text-foreground">{savingsPercent}% reduction in monthly EMI</p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">
              *Calculation assumes a maximum {tenure} months tenure. But actual values may vary with the chosen tenure.
            </p>
          </div>
        )}

        {/* DD Delivery Options */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-foreground mb-1">How would you like to receive your Demand Draft?</h3>
          <p className="text-[10px] text-muted-foreground tracking-wider font-semibold mb-3">SELECT A DELIVERY OPTION</p>

          {/* Home Delivery */}
          <button
            onClick={() => setDdOption("home")}
            className={`w-full text-left border-2 rounded-2xl p-4 mb-3 transition-colors ${
              ddOption === "home" ? "border-primary bg-accent/30" : "border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                ddOption === "home" ? "border-primary" : "border-muted-foreground"
              }`}>
                {ddOption === "home" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Truck size={14} className="text-primary" /> Home Delivery
                </p>
                <p className="text-xs text-muted-foreground mt-1">D-304, Evershine Gardens, Powai, Mumbai, Maharashtra, 400101</p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">📦 Usually takes 7-8 days after loan disbursal.</p>
              </div>
            </div>
          </button>

          {/* Self DD Collection */}
          <button
            onClick={() => setDdOption("self")}
            className={`w-full text-left border-2 rounded-2xl p-4 transition-colors ${
              ddOption === "self" ? "border-primary bg-accent/30" : "border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                ddOption === "self" ? "border-primary" : "border-muted-foreground"
              }`}>
                {ddOption === "self" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin size={14} className="text-primary" /> Self DD collection
                </p>
                <p className="text-xs text-muted-foreground mt-1">🏦 Find the nearest loan centre.</p>
              </div>
            </div>
          </button>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 mb-5">
          <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">Demand Draft is needed to close your existing loan.</p>
        </div>

        {/* CTA */}
        <button onClick={handleProceed} className="cta-primary mb-4">
          {ddOption === "self" ? "Find Loan Centre" : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default LoanOffer;
