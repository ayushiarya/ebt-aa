import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { ChevronRight, Plus } from "lucide-react";

interface FetchedLoan {
  id: string;
  bank: string;
  type: string;
  accountNumber: string;
  outstanding: number;
  emi: number;
  rate: number;
  selected: boolean;
}

const FETCHED_LOANS: FetchedLoan[] = [
  { id: "1", bank: "HDFC Bank", type: "Personal Loan", accountNumber: "XXXX XXXX 4521", outstanding: 350000, emi: 12500, rate: 14.5, selected: true },
  { id: "2", bank: "ICICI Bank", type: "Credit Card", accountNumber: "XXXX XXXX 8832", outstanding: 100000, emi: 5500, rate: 18.0, selected: true },
];

const BureauResults = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<FetchedLoan[]>(FETCHED_LOANS);

  const toggleLoan = (id: string) => {
    setLoans((prev) => prev.map((l) => l.id === id ? { ...l, selected: !l.selected } : l));
  };

  const selectedCount = loans.filter((l) => l.selected).length;
  const totalOutstanding = loans.filter((l) => l.selected).reduce((s, l) => s + l.outstanding, 0);
  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Select Loans" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <p className="text-sm text-muted-foreground mb-1">We found the following loans from the credit bureau</p>
        <p className="text-xs text-muted-foreground mb-5">Select the loans you want to transfer to Axis Bank</p>

        {/* Fetched loan cards */}
        <div className="space-y-3 mb-6">
          {loans.map((loan) => (
            <button
              key={loan.id}
              onClick={() => toggleLoan(loan.id)}
              className={`w-full text-left border-2 rounded-2xl p-5 transition-all active:scale-[0.99] ${
                loan.selected ? "border-primary bg-accent/30" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-foreground">{loan.bank}</span>
                    <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{loan.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">A/C: {loan.accountNumber}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Outstanding</p>
                      <p className="text-sm font-bold text-foreground">{formatCurrency(loan.outstanding)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">EMI</p>
                      <p className="text-sm font-bold text-foreground">{formatCurrency(loan.emi)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Rate</p>
                      <p className="text-sm font-bold text-foreground">{loan.rate}%</p>
                    </div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded border-2 shrink-0 mt-1 flex items-center justify-center transition-all ${
                  loan.selected ? "bg-primary border-primary" : "border-muted-foreground/40"
                }`}>
                  {loan.selected && <span className="text-primary-foreground text-xs font-bold">✓</span>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Add manually */}
        <button
          onClick={() => navigate("/add-loan")}
          className="w-full flex items-center justify-between border-2 border-dashed border-border rounded-2xl p-5 active:bg-accent/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Plus size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Add Loan Manually</p>
              <p className="text-xs text-muted-foreground">Loan not listed? Add it here</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-cta">
        {selectedCount > 0 && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-muted-foreground">{selectedCount} loan{selectedCount > 1 ? "s" : ""} selected</span>
            <span className="text-sm font-bold text-foreground">Total: {formatCurrency(totalOutstanding)}</span>
          </div>
        )}
        <button
          onClick={() => selectedCount > 0 && navigate("/loan-offer")}
          disabled={selectedCount === 0}
          className="cta-primary"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BureauResults;
