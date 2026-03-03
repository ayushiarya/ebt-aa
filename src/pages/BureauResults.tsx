import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { ChevronRight, Plus, Pencil } from "lucide-react";
import { useLoan, LoanEntry } from "@/context/LoanContext";

interface FetchedLoan extends LoanEntry {
  selected: boolean;
}

const BUREAU_LOANS: FetchedLoan[] = [
  { id: "b1", bank: "HDFC Bank", type: "Personal Loan", accountNumber: "XXXX XXXX 4521", sanctionedAmount: 512500, outstanding: 350000, emi: 12500, rate: 14.5, emisPaid: 15, emisLeft: 30, source: "bureau", selected: true },
  { id: "b2", bank: "ICICI Bank", type: "Credit Card", accountNumber: "XXXX XXXX 8832", sanctionedAmount: 200000, outstanding: 100000, emi: 5500, rate: 18.0, emisPaid: 10, emisLeft: 20, source: "bureau", selected: true },
];

const BureauResults = () => {
  const navigate = useNavigate();
  const { setSelectedLoans, selectedLoans, formatCurrency, setEditingLoan } = useLoan();
  const [loans, setLoans] = useState<FetchedLoan[]>(BUREAU_LOANS);

  const toggleLoan = (id: string) => {
    setLoans((prev) => prev.map((l) => l.id === id ? { ...l, selected: !l.selected } : l));
  };

  const handleEdit = (loan: FetchedLoan, e: React.MouseEvent) => {
    e.stopPropagation();
    const entry: LoanEntry = { ...loan };
    setEditingLoan(entry);
    navigate("/add-loan");
  };

  const selected = loans.filter((l) => l.selected);
  const totalOutstanding = selected.reduce((s, l) => s + l.outstanding, 0);
  const manualLoans = selectedLoans.filter((l) => l.source === "manual");

  const handleProceed = () => {
    const bureauSelected: LoanEntry[] = selected.map(({ selected: _, ...rest }) => rest);
    setSelectedLoans([...bureauSelected, ...manualLoans]);
    navigate("/loan-offer");
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Select Loans" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <p className="text-sm text-muted-foreground mb-1">We found the following loans from the credit bureau</p>
        <p className="text-xs text-muted-foreground mb-5">Select the loans you want to transfer to Axis Bank</p>

        <div className="space-y-3 mb-6">
          {loans.map((loan) => (
            <button key={loan.id} onClick={() => toggleLoan(loan.id)}
              className={`w-full text-left border-2 rounded-2xl p-5 transition-all active:scale-[0.99] ${
                loan.selected ? "border-primary bg-accent/30" : "border-border bg-card"
              }`}>
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
                <div className="flex flex-col items-center gap-2 shrink-0 ml-2">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    loan.selected ? "bg-primary border-primary" : "border-muted-foreground/40"
                  }`}>
                    {loan.selected && <span className="text-primary-foreground text-xs font-bold">✓</span>}
                  </div>
                  <button onClick={(e) => handleEdit(loan, e)}
                    className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground active:scale-95 transition-all">
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
            </button>
          ))}

          {manualLoans.map((loan) => (
            <div key={loan.id} className="w-full text-left border-2 border-primary rounded-2xl p-5 bg-accent/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-foreground">{loan.bank}</span>
                    <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Manual</span>
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
                <button onClick={() => { setEditingLoan(loan); navigate("/add-loan"); }}
                  className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground active:scale-95 transition-all shrink-0 mt-1">
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/add-loan")}
          className="w-full flex items-center justify-between border-2 border-dashed border-border rounded-2xl p-5 active:bg-accent/20 transition-colors">
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

      <div className="sticky-cta">
        {(selected.length + manualLoans.length) > 0 && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-muted-foreground">
              {selected.length + manualLoans.length} loan{(selected.length + manualLoans.length) > 1 ? "s" : ""} selected
            </span>
            <span className="text-sm font-bold text-foreground">
              Total: {formatCurrency(totalOutstanding + manualLoans.reduce((s, l) => s + l.outstanding, 0))}
            </span>
          </div>
        )}
        <button onClick={handleProceed}
          disabled={selected.length + manualLoans.length === 0}
          className="cta-primary">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BureauResults;
