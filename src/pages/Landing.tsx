import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Home, ChevronRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState<"ebt" | "new" | null>("ebt");
  const [checks, setChecks] = useState([false, false, false]);

  const toggleCheck = (i: number) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };

  const allChecked = checks.every(Boolean);

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      {/* Top nav bar */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu size={20} className="text-primary-foreground" />
          <span className="text-primary-foreground font-semibold text-base">Loan Centre</span>
        </div>
        <Home size={20} className="text-primary-foreground" />
      </div>

      {/* Brand bar */}
      <div className="bg-primary/90 px-4 py-2 flex items-center gap-2">
        <div className="w-7 h-7 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-xs tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Congratulations banner */}
        <div className="bg-accent mx-4 mt-4 rounded-xl p-4 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-base font-bold text-foreground leading-tight">
              Congratulations!
            </p>
            <p className="text-sm text-foreground leading-tight mt-0.5">
              Your <span className="text-primary font-bold italic">pre-qualified loan</span>
            </p>
            <p className="text-sm text-foreground font-bold italic leading-tight">
              options are ready
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Choose what works best for you.
            </p>
          </div>
          <div className="w-20 h-20 bg-accent rounded-lg flex items-center justify-center shrink-0">
            <span className="text-3xl">💰</span>
          </div>
        </div>

        {/* Select loan type */}
        <div className="px-4 mt-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Select loan type</h2>
          <button className="text-primary text-sm font-bold tracking-wide">COMPARE</button>
        </div>

        {/* EBT Card */}
        <div className="px-4 mt-3">
          <button
            onClick={() => setSelectedLoan("ebt")}
            className={`w-full text-left border-2 rounded-xl p-4 transition-colors relative ${
              selectedLoan === "ebt"
                ? "border-primary bg-accent/30"
                : "border-border bg-card"
            }`}
          >
            <span className="absolute -top-2.5 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide">
              POPULAR
            </span>
            <p className="text-base font-bold text-foreground mt-1">External Balance Transfer</p>
            <p className="text-xs text-muted-foreground mt-0.5">Loan Offer</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-foreground">₹5,00,000</span>
              <span className="text-sm text-muted-foreground">@ 12% p.a.</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
              <span>Lower interest</span>
              <span className="text-border">·</span>
              <span>One loan, one EMI</span>
              <span className="text-border">·</span>
              <span>No extra cost</span>
            </div>
          </button>
        </div>

        {/* New Loan Card */}
        <div className="px-4 mt-3">
          <button
            onClick={() => setSelectedLoan("new")}
            className={`w-full text-left border-2 rounded-xl p-4 transition-colors ${
              selectedLoan === "new"
                ? "border-primary bg-accent/30"
                : "border-border bg-card"
            }`}
          >
            <p className="text-base font-bold text-foreground">New Loan</p>
            <p className="text-xs text-muted-foreground mt-0.5">Loan Offer</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-foreground">₹3,00,000</span>
              <span className="text-sm text-muted-foreground">@ 14.5% p.a.</span>
            </div>
          </button>
        </div>

        {/* Learn link */}
        <div className="px-4 mt-5">
          <button className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-lg">📘</span>
            <span>Learn how External Balance Transfer works</span>
            <ChevronRight size={16} className="text-primary" />
          </button>
        </div>

        {/* Checkboxes */}
        <div className="px-4 mt-5 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCheck(0)}>
            <div className={`w-5 h-5 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${checks[0] ? "bg-primary border-primary" : "border-border"}`}>
              {checks[0] && <span className="text-primary-foreground text-xs font-bold">✓</span>}
            </div>
            <span className="text-xs text-foreground leading-relaxed">
              I confirm that my <span className="text-primary font-semibold">household income</span> is above ₹3,00,000 per annum.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCheck(1)}>
            <div className={`w-5 h-5 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${checks[1] ? "bg-primary border-primary" : "border-border"}`}>
              {checks[1] && <span className="text-primary-foreground text-xs font-bold">✓</span>}
            </div>
            <span className="text-xs text-foreground leading-relaxed">
              I am an Indian citizen and pay taxes only in India.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCheck(2)}>
            <div className={`w-5 h-5 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${checks[2] ? "bg-primary border-primary" : "border-border"}`}>
              {checks[2] && <span className="text-primary-foreground text-xs font-bold">✓</span>}
            </div>
            <span className="text-xs text-foreground leading-relaxed">
              I authorise Axis Bank to fetch my credit bureau data for evaluating my External Balance Transfer...<span className="text-primary font-semibold">Read more</span>
            </span>
          </label>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={() => {
            if (allChecked && selectedLoan) {
              navigate("/bureau-loader");
            }
          }}
          disabled={!allChecked || !selectedLoan}
          className={`w-full py-4 rounded-lg font-semibold text-base transition-colors ${
            allChecked && selectedLoan
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Landing;
