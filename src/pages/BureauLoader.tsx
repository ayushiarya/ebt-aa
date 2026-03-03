import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BureauLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/add-loan"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <div className="bg-primary px-4 py-3.5 flex items-center gap-2">
        <div className="w-7 h-7 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-xs tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="dot-loader flex gap-2.5 mb-4">
          <span className="w-3.5 h-3.5 rounded-full bg-primary inline-block" />
          <span className="w-3.5 h-3.5 rounded-full bg-primary inline-block" />
          <span className="w-3.5 h-3.5 rounded-full bg-primary inline-block" />
        </div>
        <div className="dot-shadow flex gap-2.5 mb-8">
          <span className="w-3.5 h-1 rounded-full bg-muted-foreground/20 inline-block" />
          <span className="w-3.5 h-1 rounded-full bg-muted-foreground/20 inline-block" />
          <span className="w-3.5 h-1 rounded-full bg-muted-foreground/20 inline-block" />
        </div>
        <h2 className="text-lg font-bold text-foreground text-center mb-3">
          Fetching your loan details securely from the credit bureau
        </h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Please do not refresh, go back or close this page
        </p>
      </div>
    </div>
  );
};

export default BureauLoader;
