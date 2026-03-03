import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const allFilled = otp.every((d) => d !== "");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Verification" showBack />

      <div className="px-5 pt-5 flex-1">
        <h2 className="text-xl font-bold text-foreground leading-tight mb-2">
          Enter OTP sent on registered mobile number
        </h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          We have sent a 6-digit OTP on your mobile number for verification to confirm disbursal
        </p>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center">
            <span className="text-muted-foreground text-base">🔒</span>
          </div>
          <span className="text-foreground font-medium text-base">+91 88XXXXXX25</span>
        </div>

        <div className="flex gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="tel" inputMode="numeric" maxLength={1} value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 border-2 border-border rounded-xl text-center text-xl font-semibold text-foreground focus:border-primary focus:ring-1 focus:ring-ring outline-none transition-colors bg-background"
            />
          ))}
        </div>

        <button className="text-primary font-semibold text-sm tracking-wide py-2 active:opacity-70">
          RESEND OTP
        </button>
      </div>

      <div className="sticky-cta">
        <button
          onClick={() => allFilled && navigate("/status")}
          disabled={!allFilled}
          className="cta-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
