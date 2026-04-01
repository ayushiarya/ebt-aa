import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Home } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
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

      <div className="flex-1 overflow-y-auto pb-5">
        {/* Banner */}
        <div className="bg-accent mx-4 mt-4 rounded-2xl p-5 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground leading-snug">
              Close your existing personal loans and switch to Axis Bank
            </p>
            <p className="text-sm font-bold text-primary">at a lower interest rate</p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center shrink-0">
            <span className="text-3xl">💰</span>
          </div>
        </div>

        {/* Offer headline */}
        <div className="px-4 mt-4">
          <p className="text-xs text-muted-foreground">Loan Offer up to</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-foreground">₹40,00,000</span>
            <span className="text-sm text-muted-foreground">@ 12% p.a.</span>
          </div>
        </div>

        {/* 3 Benefit icons */}
        <div className="px-4 mt-5 flex gap-4">
          {[
            { icon: "📅", label: "Flexible tenure\nup to 84 months" },
            { icon: "📉", label: "Lower\nmonthly EMI" },
            { icon: "💵", label: "Extra funds\nafter closing loans" },
          ].map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xl">{b.icon}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight whitespace-pre-line">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Three steps */}
        <div className="px-4 mt-6">
          <p className="text-lg font-bold text-foreground">Three steps.</p>
          <p className="text-lg font-bold text-foreground">One better loan.</p>
        </div>

        <div className="px-4 mt-4 flex gap-3">
          {[
            { num: "01", title: "Pick loans to close", desc: "Choose which active personal loans you want to close" },
            { num: "02", title: "We pay them off", desc: "We issue a demand draft to your lenders to close those loans" },
            { num: "03", title: "Enjoy the benefits", desc: "Lower EMI, extra funds & one simple loan" },
          ].map((step, i) => (
            <div key={i} className="flex-1 bg-card border border-border rounded-xl p-3">
              <p className="text-lg font-bold text-primary mb-1">{step.num}</p>
              <p className="text-xs font-semibold text-foreground mb-1">{step.title}</p>
              <p className="text-[10px] text-muted-foreground leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Consent checkboxes */}
        <div className="px-4 mt-6 space-y-5">
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

        {/* CTA */}
        <div className="px-5 mt-6">
          <button
            onClick={() => allChecked && navigate("/bureau-loader")}
            disabled={!allChecked}
            className="cta-primary"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
