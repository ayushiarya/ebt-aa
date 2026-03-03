import { useNavigate } from "react-router-dom";
import { CheckCircle2, Banknote, ArrowRightLeft } from "lucide-react";

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

      <div className="flex-1 flex flex-col px-6 pt-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          External Balance Transfer
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Consolidate your existing loans from other banks into one Axis Bank Personal Loan for a lower interest rate.
        </p>

        <h3 className="text-sm font-bold text-foreground tracking-wide mb-5">
          HOW IT WORKS?
        </h3>

        <div className="space-y-5 mb-8">
          <StepItem
            icon={<CheckCircle2 size={22} className="text-primary" />}
            text="Select the loans you want to close"
          />
          <StepItem
            icon={<Banknote size={22} className="text-primary" />}
            text="We pay loans directly to your lender"
          />
          <StepItem
            icon={<ArrowRightLeft size={22} className="text-primary" />}
            text="Your loans consolidate into one Axis Bank Personal Loan"
          />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={() => navigate("/add-loan")}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

const StepItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
      {icon}
    </div>
    <p className="text-sm text-foreground pt-2.5">{text}</p>
  </div>
);

export default Landing;
