import { useState, useRef, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { CheckCircle } from "lucide-react";

const OtpVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const allFilled = otp.every((d) => d !== "");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (allFilled) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="app-container min-h-screen flex flex-col bg-background">
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
          <div className="bg-secondary rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground">Application ID</p>
            <p className="text-sm font-bold text-foreground">BLA000001029055</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Verification" />

      <div className="px-6 pt-4 flex-1">
        <h2 className="text-2xl font-bold text-foreground leading-tight mb-2">
          Enter OTP sent on registered mobile number
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          We have sent a 6-digit OTP on your mobile number for verification to confirm disbursal
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">🔒</span>
          </div>
          <span className="text-foreground font-medium">+91 88XXXXXX25</span>
        </div>

        <div className="flex gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 border border-border rounded-lg text-center text-xl font-semibold text-foreground focus:border-primary focus:ring-1 focus:ring-ring outline-none transition-colors bg-background"
            />
          ))}
        </div>

        <button className="text-primary font-semibold text-sm tracking-wide">
          RESEND OTP
        </button>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className={`w-full py-4 rounded-lg font-semibold text-base transition-colors ${
            allFilled
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
