import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Search, MapPin, X } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const BRANCHES = [
  { name: "Axis Bank", code: "UTIB0000108", address: "Krantiveer Lakhuji Salve Marg, Marol MIDC Industry Estate, Andheri East, Mumbai, 400052 Maharashtra" },
  { name: "Axis Bank Branch", code: "UTIB0000201", address: "Krantiveer Lakhuji Salve Marg, Marol MIDC" },
  { name: "Axis House MIDC", code: "UTIB0000302", address: "Krantiveer Lakhuji Salve Marg, Marol MIDC" },
  { name: "Mulund", code: "UTIB0000108", address: "Park Apartments, Saki Naka, MIDC, Andheri East, Near Techno Park, Mumbai 400072" },
];

const ChooseLoanCentre = () => {
  const navigate = useNavigate();
  const { selectedLoanCentre, setSelectedLoanCentre } = useLoan();
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = BRANCHES.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.address.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (branch: typeof BRANCHES[0]) => {
    setSelectedLoanCentre(branch);
    setSearching(false);
    setQuery("");
  };

  if (searching) {
    return (
      <div className="app-container min-h-screen flex flex-col bg-background page-enter">
        <AppHeader title="Choose a loan centre near you" showBack />

        <div className="px-5 pt-4">
          <p className="text-xs text-muted-foreground mb-3">
            Enter Area / Pincode / City to locate the nearest loan centre to collect demand draft
          </p>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Enter Area/ Pincode/ City"
              value={query} onChange={(e) => setQuery(e.target.value)}
              className="input-axis pl-10 pr-10" autoFocus />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="space-y-1">
            {filtered.map((branch, i) => (
              <button key={i} onClick={() => handleSelect(branch)}
                className="w-full text-left py-3 px-2 border-b border-border active:bg-secondary/50 transition-colors">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{branch.name}</p>
                    <p className="text-xs text-muted-foreground">{branch.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Choose a loan centre near you" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          To help you close your loan, you can <span className="font-semibold text-foreground">collect your Demand Draft</span> from any Axis Bank loan centre and submit it to your lender.
        </p>

        {/* Map placeholder */}
        <div className="w-full h-40 bg-accent rounded-2xl flex items-center justify-center mb-5">
          <MapPin size={40} className="text-primary" />
        </div>

        <p className="text-[10px] text-muted-foreground tracking-wider font-semibold mb-2">SELECTED LOAN CENTRE</p>

        {selectedLoanCentre && (
          <div className="border border-border rounded-2xl p-4 mb-4">
            <p className="text-sm font-bold text-foreground">
              {selectedLoanCentre.name} | {selectedLoanCentre.code}
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {selectedLoanCentre.address}
            </p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">
              Suggested based on your current location
            </p>
          </div>
        )}

        <button onClick={() => setSearching(true)}
          className="text-primary text-sm font-bold tracking-wide active:opacity-70 mb-6">
          CHANGE LOAN CENTRE →
        </button>

        <button onClick={() => navigate("/review")} className="cta-primary mb-4">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ChooseLoanCentre;
