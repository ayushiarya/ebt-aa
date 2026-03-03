import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Home, ChevronRight } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const Landing = () => {
  const navigate = useNavigate();
  const { selectedLoanType, setSelectedLoanType } = useLoan();
  const [checks, setChecks] = useState([false, false, false]);

  const toggleCheck = (i: number) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };

  const allChecked = checks.every(Boolean);

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      {/* Top nav */}
      <div className="bg-primary px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1 -ml-1 active:opacity-70"><Menu size={22} className="text-primary-foreground" /></button>
          <span className="text-primary-foreground font-semibold text-base">Loan Centre</span>
        </div>
        <button className="p-1 -mr-1 active:opacity-70"><Home size={22} className="text-primary-foreground" /></button>
      </div>

      {/* Brand sub-bar */}
      <div className="bg-primary/85 px-4 py-2 flex items-center gap-2">
        <div className="w-6 h-6 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-[10px]">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-xs tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Banner */}
        <div className="bg-accent mx-4 mt-4 rounded-2xl p-5 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">Congratulations!</p>
            <p className="text-sm text-foreground mt-0.5">
              Your <span className="text-primary font-bold italic">pre-qualified loan</span>
            </p>
            <p className="text-sm text-foreground font-bold italic">options are ready</p>
            <p className="text-xs text-muted-foreground mt-1.5">Choose what works best for you.</p>
          </div>
          <div className="w-20 h-20 flex items-center justify-center shrink-0">
            <span className="text-4xl">💰</span>
          </div>
        </div>

        {/* Section header */}
        <div className="px-4 mt-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Select loan type</h2>
          <button className="text-primary text-sm font-bold tracking-wide active:opacity-70">COMPARE</button>
        </div>

        {/* EBT Card */}
        <div className="px-4 mt-3">
          <button
            onClick={() => setSelectedLoanType("ebt")}
            className={`w-full text-left border-2 rounded-2xl p-5 transition-all relative active:scale-[0.99] ${
              selectedLoanType === "ebt" ? "border-primary bg-accent/30" : "border-border bg-card"
            }`}
          >
            <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded tracking-wider">
              POPULAR
            </span>
            <p className="text-base font-bold text-foreground mt-1">External Balance Transfer</p>
            <p className="text-xs text-muted-foreground mt-1">Loan Offer</p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-bold text-foreground">₹5,00,000</span>
              <span className="text-sm text-muted-foreground">@ 12% p.a.</span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <span>Lower interest</span>
              <span>·</span>
              <span>One loan, one EMI</span>
              <span>·</span>
              <span>No extra cost</span>
            </div>
          </button>
        </div>

        {/* New Loan Card */}
        <div className="px-4 mt-3">
          <button
            onClick={() => setSelectedLoanType("new")}
            className={`w-full text-left border-2 rounded-2xl p-5 transition-all active:scale-[0.99] ${
              selectedLoanType === "new" ? "border-primary bg-accent/30" : "border-border bg-card"
            }`}
          >
            <p className="text-base font-bold text-foreground">New Loan</p>
            <p className="text-xs text-muted-foreground mt-1">Loan Offer</p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-bold text-foreground">₹3,00,000</span>
              <span className="text-sm text-muted-foreground">@ 14.5% p.a.</span>
            </div>
          </button>
        </div>

        {/* Learn link */}
        <div className="px-4 mt-6">
          <button className="flex items-center gap-2.5 text-sm text-foreground active:opacity-70 py-2">
            <span className="text-lg">📘</span>
            <span>Learn how External Balance Transfer works</span>
            <ChevronRight size={16} className="text-primary" />
          </button>
        </div>

        {/* Consent checkboxes */}
        <div className="px-4 mt-5 space-y-5">
          {[
            <>I confirm that my <span className="text-primary font-semibold">household income</span> is above ₹3,00,000 per annum.</>,
            <>I am an Indian citizen and pay taxes only in India.</>,
            <>I authorise Axis Bank to fetch my credit bureau data for evaluating my External Balance Transfer...<span className="text-primary font-semibold">Read more</span></>,
          ].map((label, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer active:opacity-80" onClick={() => toggleCheck(i)}>
              <div className={`w-6 h-6 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                checks[i] ? "bg-primary border-primary" : "border-muted-foreground/40"
              }`}>
                {checks[i] && <span className="text-primary-foreground text-xs font-bold">✓</span>}
              </div>
              <span className="text-xs text-foreground leading-relaxed">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-cta">
        <button
          onClick={() => allChecked && selectedLoanType && navigate("/bureau-loader")}
          disabled={!allChecked || !selectedLoanType}
          className="cta-primary"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Landing;
