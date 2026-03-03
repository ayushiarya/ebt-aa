import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

const MakePlan = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [tenure, setTenure] = useState(20);

  const emi = Math.round(loanAmount / tenure + loanAmount * 0.015);

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

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
              <p className="text-xs text-muted-foreground">16.5% p.a</p>
            </div>
            <div className="border border-border rounded-lg px-3 py-2 text-sm font-medium text-foreground">
              {formatCurrency(loanAmount)}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1 mt-3">
            <span>1L</span><span>3L</span><span>6L</span><span>9L</span><span>12L</span>
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
            <span>12M</span><span>24M</span><span>36M</span><span>48M</span>
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
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={() => navigate("/review")}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default MakePlan;
