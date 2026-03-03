import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      {/* Brand bar */}
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-sm tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Illustration placeholder */}
        <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center mb-8">
          <span className="text-5xl">🔄</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground text-center mb-3">
          External Balance Transfer
        </h1>
        <p className="text-sm text-muted-foreground text-center leading-relaxed mb-2">
          Consolidate your existing loans from other banks into one Axis Bank Personal Loan at a lower interest rate.
        </p>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Save on EMIs, simplify repayments, and enjoy a hassle-free transfer process.
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={() => navigate("/add-loan")}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
