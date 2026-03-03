import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OtpVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (otp.every((d) => d !== "")) {
      setTimeout(() => navigate("/bureau-loader"), 400);
    }
  }, [otp, navigate]);

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

  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3">
        <button className="p-1 -ml-1 text-foreground">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Verification</h1>
      </div>

      <div className="px-6 pt-4 flex-1">
        <h2 className="text-2xl font-bold text-foreground leading-tight mb-2">
          Enter OTP sent on registered mobile number
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          We have sent a 6-digit OTP on your mobile number for verification to confirm disbursal
        </p>

        {/* Phone number */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">🔒</span>
          </div>
          <span className="text-foreground font-medium">+91 88XXXXXX25</span>
        </div>

        {/* OTP inputs */}
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
    </div>
  );
};

export default OtpVerification;
