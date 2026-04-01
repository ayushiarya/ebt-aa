import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, MapPin, Copy } from "lucide-react";

const ApplicationSubmitted = () => {
  const navigate = useNavigate();
  const appId = "MLP000001029055";

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      {/* Brand bar */}
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-sm tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-8 pb-5">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 mb-4">
            <span className="text-5xl">📋✅</span>
          </div>
          <p className="text-[10px] text-primary tracking-wider font-bold mb-2">CONGRATULATIONS</p>
          <h2 className="text-xl font-bold text-foreground mb-3">
            Your loan application is submitted
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We will share your loan application updates within 2-3 working days on your registered mobile number and email.
          </p>
          <div className="bg-secondary rounded-xl px-4 py-3 flex items-center gap-2">
            <p className="text-xs text-muted-foreground">Application ID: <span className="font-bold text-foreground">{appId}</span></p>
            <button className="text-muted-foreground active:opacity-70"><Copy size={14} /></button>
          </div>
        </div>

        {/* Application Timeline */}
        <h3 className="text-sm font-bold text-foreground mb-4">Application Timeline</h3>
        <div className="space-y-0 mb-8">
          {/* Step 1 - Submitted */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <CheckCircle size={20} className="text-green-600" />
              <div className="w-0.5 h-12 bg-border" />
            </div>
            <div className="pb-4">
              <p className="text-sm font-semibold text-foreground">Application <span className="font-bold">Submitted</span></p>
              <p className="text-xs text-muted-foreground">13 Jan 2024; 10:34 AM</p>
            </div>
          </div>

          {/* Step 2 - Under review */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Clock size={20} className="text-primary" />
              <div className="w-0.5 h-12 bg-border" />
            </div>
            <div className="pb-4">
              <p className="text-sm font-semibold text-foreground">Application under review</p>
              <p className="text-xs text-muted-foreground">We're verifying your details. This usually takes 24-48 hours.</p>
            </div>
          </div>

          {/* Step 3 - Collect DD */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full border-2 border-border bg-background flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground">3</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Collect demand draft</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Visit your selected Axis Bank loan centre, collect the Demand Draft, and submit it to your lender to close your loan.
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/disbursed")} className="cta-primary mb-4">
          Okay
        </button>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
