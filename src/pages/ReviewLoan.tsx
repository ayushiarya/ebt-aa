import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import BottomSheetModal from "@/components/BottomSheetModal";
import { Info, MapPin, Pencil } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

const ReviewLoan = () => {
  const navigate = useNavigate();
  const { loanAmount, tenure, emi, formatCurrency, selectedLoans, totalOutstanding, processingFee, stampDuty, interestRate, netDisbursal, selectedLoanCentre } = useLoan();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Review your Loan" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
        {/* Loan Summary */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-foreground tracking-wide">Loan Summary</h3>
          <button onClick={() => navigate("/make-plan")} className="text-primary text-xs font-bold tracking-wide active:opacity-70">
            EDIT LOAN
          </button>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 mb-5 space-y-3">
          <Row label="Loan amount" value={formatCurrency(loanAmount)} />
          <Row label="New EMI Tenure" value={`${tenure} Months`} />
          <Row label="New EMI" value={formatCurrency(emi)} bold />
        </div>

        {/* Fees & Charges */}
        <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">Fees & Charges</h3>
        <div className="bg-card border border-border rounded-2xl p-5 mb-5 space-y-3">
          <Row label="Processing Fee (incl. of GST)" value={`- ${formatCurrency(processingFee)}`} />
          <Row label="Stamp Duty" value={`- ${formatCurrency(stampDuty)}`} />
          <Row label="Interest Rate" value={`${interestRate}% p.a.`} />
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Current Outstanding <Info size={12} />
                </span>
                <span className="text-xs text-muted-foreground">(existing loans ({selectedLoans.length}))</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-foreground font-medium block">-{formatCurrency(totalOutstanding)}</span>
                <button onClick={() => setSheetOpen(true)} className="text-primary text-xs font-bold mt-1 active:opacity-70">VIEW BREAKUP</button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <Row label="Net Disbursal" value={formatCurrency(netDisbursal)} bold />
          </div>
        </div>

        {/* Other Charges */}
        <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">Other Charges</h3>
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              Early closure / Part closure charges <Info size={12} />
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">5% of outstanding amount for new loan</p>
        </div>

        {/* Add Insurance */}
        <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">Add Insurance</h3>
        <div className="flex gap-3 mb-5">
          {[
            { name: "HDFC Life", premium: "₹4,000" },
            { name: "Max Life", premium: "₹5,000" },
          ].map((ins, i) => (
            <div key={i} className="flex-1 border border-border rounded-2xl p-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-2">
                <span className="text-xs">🛡️</span>
              </div>
              <p className="text-xs font-semibold text-foreground">{ins.name}</p>
              <p className="text-xs text-muted-foreground">Premium : {ins.premium}</p>
              <button className="text-primary text-[10px] font-bold mt-2 flex items-center gap-1 active:opacity-70">
                + ADD PREMIUM
              </button>
            </div>
          ))}
        </div>

        {/* Communication Address */}
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-primary" />
          <h3 className="text-[10px] font-bold text-muted-foreground tracking-wider">COMMUNICATION ADDRESS</h3>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 mb-5">
          <p className="text-xs text-foreground leading-relaxed">
            Flat no. 43, Gladiolus CHS, Pali Hill, Bandra West,<br />Mumbai 400042.
          </p>
        </div>

        {/* Selected Loan Centre */}
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-primary" />
          <h3 className="text-[10px] font-bold text-muted-foreground tracking-wider">YOUR SELECTED LOAN CENTRE</h3>
        </div>
        {selectedLoanCentre && (
          <div className="bg-card border border-border rounded-xl p-4 mb-2">
            <p className="text-sm font-bold text-foreground">{selectedLoanCentre.name} | {selectedLoanCentre.code}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{selectedLoanCentre.address}</p>
          </div>
        )}
        <button onClick={() => navigate("/choose-centre")}
          className="flex items-center gap-1 text-primary text-xs font-bold mb-5 active:opacity-70">
          <Pencil size={12} /> CHANGE LOAN CENTRE
        </button>

        {/* Disbursal info */}
        <div className="bg-accent/50 rounded-xl p-4 mb-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Loan Amount of <span className="font-semibold text-foreground">{formatCurrency(netDisbursal)}</span> will be credited to your a/c ending **** 0808. EMI will be debited from the same a/c.
          </p>
          <p className="text-xs text-muted-foreground mt-1">Starts March 4th, 2026</p>
        </div>

        <button onClick={() => navigate("/terms")} className="cta-primary mb-4">
          Proceed to T&C
        </button>
      </div>

      <BottomSheetModal open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h3 className="text-lg font-bold text-foreground mb-4">Current Outstanding Breakup</h3>
        <div className="space-y-3">
          {selectedLoans.map((loan) => (
            <div key={loan.id} className="flex justify-between items-center text-sm">
              <div>
                <span className="text-foreground font-medium">{loan.bank}</span>
                <span className="text-xs text-muted-foreground ml-2">{loan.type}</span>
              </div>
              <span className="text-foreground font-medium">{formatCurrency(loan.outstanding)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-foreground">Total Outstanding</span>
            <span className="text-sm font-bold text-primary">{formatCurrency(totalOutstanding)}</span>
          </div>
        </div>
        <button onClick={() => setSheetOpen(false)} className="cta-primary mt-6">Okay</button>
      </BottomSheetModal>
    </div>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground font-medium"}`}>{value}</span>
  </div>
);

export default ReviewLoan;
