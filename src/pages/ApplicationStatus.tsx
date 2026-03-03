import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ApplicationStatus = () => {
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

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-primary" />
        </div>

        <h2 className="text-xl font-bold text-foreground text-center mb-3">
          Your loan application is under review
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          We will share your loan application updates within 2–3 working days
        </p>

        <div className="bg-secondary rounded-lg px-4 py-3 mb-8">
          <p className="text-xs text-muted-foreground">Application ID</p>
          <p className="text-sm font-bold text-foreground">BLA000001029055</p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={() => navigate("/")}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ApplicationStatus;
