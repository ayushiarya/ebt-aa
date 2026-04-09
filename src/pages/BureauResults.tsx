import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { ChevronDown, ChevronUp, Pencil, Upload, X, Eye, Trash2, Info, Loader2 } from "lucide-react";
import { useLoan, LoanEntry } from "@/context/LoanContext";
import BottomSheetModal from "@/components/BottomSheetModal";

const INITIAL_BUREAU_LOANS: LoanEntry[] = [
  { id: "b1", bank: "HDFC Bank", type: "Personal Loan", accountNumber: "12345678901234567890", sanctionedAmount: 550000, outstanding: 454659, emi: 15724, rate: 16.5, emisPaid: 20, emisLeft: 28, loanStartDate: "15 Jul 2024", source: "bureau", verified: false, soaFile: null },
  { id: "b2", bank: "ICICI Bank", type: "Personal Loan", accountNumber: "98765432101234567890", sanctionedAmount: 300994, outstanding: 228504, emi: 8605, rate: 16.5, emisPaid: 26, emisLeft: 22, loanStartDate: "23 Jan 2024", source: "bureau", verified: false, soaFile: null },
];

interface LoanCardState {
  selected: boolean;
  expanded: boolean;
  verifying: boolean;
}

const BureauResults = () => {
  const navigate = useNavigate();
  const { setSelectedLoans, formatCurrency, setEditingLoan, editedBureauLoans, updateBureauLoan } = useLoan();

  const getLoans = useCallback(() => {
    return INITIAL_BUREAU_LOANS.map((initial) => {
      const edited = editedBureauLoans[initial.id];
      return edited || initial;
    });
  }, [editedBureauLoans]);

  const loans = getLoans();

  const [cardStates, setCardStates] = useState<Record<string, LoanCardState>>(
    Object.fromEntries(loans.map((l) => [l.id, { selected: false, expanded: false, verifying: false }]))
  );
  const [uploadSheetLoan, setUploadSheetLoan] = useState<LoanEntry | null>(null);
  const [editSheetLoan, setEditSheetLoan] = useState<LoanEntry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState<Partial<LoanEntry>>({});

  const selectedLoans = loans.filter((l) => cardStates[l.id]?.selected);
  const totalOutstanding = selectedLoans.reduce((s, l) => s + l.outstanding, 0);
  const totalEmi = selectedLoans.reduce((s, l) => s + l.emi, 0);

  const handleSelectUpload = (loan: LoanEntry) => {
    setUploadSheetLoan(loan);
  };

  const handleUploadFile = () => {
    if (!uploadSheetLoan) return;
    const updated = { ...uploadSheetLoan, soaFile: { name: "SOA.pdf", size: "399KB" } };
    updateBureauLoan(updated);
    setUploadSheetLoan(null);
  };

  const handleVerify = (loan: LoanEntry) => {
    setCardStates((prev) => ({ ...prev, [loan.id]: { ...prev[loan.id], verifying: true } }));
    setTimeout(() => {
      const updated = { ...loan, verified: true, soaFile: loan.soaFile || (editedBureauLoans[loan.id]?.soaFile) || { name: "SOA.pdf", size: "399KB" } };
      updateBureauLoan(updated);
      setCardStates((prev) => ({
        ...prev,
        [loan.id]: { ...prev[loan.id], selected: true, verifying: false },
      }));
    }, 2000);
  };

  const toggleExpand = (id: string) => {
    setCardStates((prev) => ({ ...prev, [id]: { ...prev[id], expanded: !prev[id].expanded } }));
  };

  const openEdit = (loan: LoanEntry) => {
    setEditForm({ ...loan });
    setEditSheetLoan(loan);
  };

  const handleSaveEdit = () => {
    if (!editSheetLoan || !editForm) return;
    const updated: LoanEntry = {
      ...editSheetLoan,
      bank: editForm.bank || editSheetLoan.bank,
      accountNumber: editForm.accountNumber || editSheetLoan.accountNumber,
      sanctionedAmount: editForm.sanctionedAmount ?? editSheetLoan.sanctionedAmount,
      outstanding: editForm.outstanding ?? editSheetLoan.outstanding,
      rate: editForm.rate ?? editSheetLoan.rate,
      emi: editForm.emi ?? editSheetLoan.emi,
      emisPaid: editForm.emisPaid ?? editSheetLoan.emisPaid,
      emisLeft: editForm.emisLeft ?? editSheetLoan.emisLeft,
      soaFile: editForm.soaFile !== undefined ? editForm.soaFile : editSheetLoan.soaFile,
    };
    updateBureauLoan(updated);
    setEditSheetLoan(null);
  };

  const handleDeleteSoa = (loanId: string) => {
    setDeleteConfirm(loanId);
  };

  const confirmDeleteSoa = () => {
    if (!deleteConfirm) return;
    const loan = loans.find((l) => l.id === deleteConfirm);
    if (loan) {
      updateBureauLoan({ ...loan, soaFile: null, verified: false });
      setCardStates((prev) => ({ ...prev, [deleteConfirm]: { ...prev[deleteConfirm], selected: false } }));
    }
    if (editForm && editSheetLoan?.id === deleteConfirm) {
      setEditForm({ ...editForm, soaFile: null });
    }
    setDeleteConfirm(null);
  };

  const handleProceed = () => {
    setSelectedLoans(selectedLoans);
    navigate("/offer-loader");
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title="Fetched Loan Details" showBack />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-5">
        {/* Info banner */}
        <div className="flex items-start gap-2 mb-4">
          <Info size={14} className="text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Some details may be incomplete or outdated. Upload your latest loan account statement to verify and continue.
          </p>
        </div>

        <p className="text-sm font-semibold text-foreground mb-3">Select the loans you want to close.</p>

        {/* Summary bar */}
        <div className="bg-secondary rounded-xl p-3 flex mb-4">
          <div className="flex-1 text-center">
            <p className="text-[10px] text-muted-foreground">Selected Loans</p>
            <p className="text-sm font-bold text-foreground">{selectedLoans.length}/{loans.length}</p>
          </div>
          <div className="flex-1 text-center border-l border-border">
            <p className="text-[10px] text-muted-foreground">Total Outstanding</p>
            <p className="text-sm font-bold text-foreground">{totalOutstanding > 0 ? formatCurrency(totalOutstanding) : "₹0"}</p>
          </div>
          <div className="flex-1 text-center border-l border-border">
            <p className="text-[10px] text-muted-foreground">Total EMI</p>
            <p className="text-sm font-bold text-foreground">{totalEmi > 0 ? formatCurrency(totalEmi) : "₹0"}</p>
          </div>
        </div>

        {/* Loan Cards */}
        <div className="space-y-4 mb-6">
          {loans.map((loan, index) => {
            const state = cardStates[loan.id] || { selected: false, expanded: false, verifying: false };
            const isVerified = loan.verified;

            return (
              <div key={loan.id} className={`border-2 rounded-2xl overflow-hidden transition-all ${
                state.selected ? "border-primary bg-accent/20" : "border-border bg-card"
              }`}>
                {/* Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {state.selected && (
                        <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-[10px] font-bold">✓</span>
                        </div>
                      )}
                      <span className="text-sm font-bold text-foreground">
                        {isVerified ? loan.bank : `Loan #0${index + 1}`}
                      </span>
                    </div>
                    {isVerified ? (
                      <button onClick={() => openEdit(loan)}
                        className="p-1.5 rounded-full text-primary active:scale-95 transition-all">
                        <Pencil size={16} />
                      </button>
                    ) : (
                      <button onClick={() => handleSelectUpload(loan)}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold active:scale-95">
                        Select & Upload
                      </button>
                    )}
                  </div>

                  {/* Basic details */}
                  {isVerified && (
                    <>
                      <div className="flex gap-2 text-xs text-muted-foreground mb-2">
                        <span>Loan Start Date</span>
                        <span>Loan Account Number</span>
                      </div>
                      <div className="flex gap-2 text-xs font-medium text-foreground mb-3">
                        <span>{loan.loanStartDate}</span>
                        <span>{loan.accountNumber}</span>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Sanctioned</p>
                      <p className="text-xs font-bold text-foreground">{formatCurrency(loan.sanctionedAmount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Outstanding</p>
                      <p className="text-xs font-bold text-foreground">{formatCurrency(loan.outstanding)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Loan Start Date</p>
                      <p className="text-xs font-bold text-foreground">{loan.loanStartDate}</p>
                    </div>
                  </div>

                  {/* SOA upload section for unverified */}
                  {!isVerified && loan.soaFile && (
                    <div className="mt-3">
                      <div className="flex items-center border border-border rounded-xl px-3 py-2.5 gap-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                          <span className="text-xs">📄</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{loan.soaFile.name}</p>
                          <p className="text-[10px] text-muted-foreground">{loan.soaFile.size}</p>
                        </div>
                        <button onClick={() => handleDeleteSoa(loan.id)} className="p-1 text-muted-foreground">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <button onClick={() => handleVerify(loan)}
                        disabled={state.verifying}
                        className="cta-primary mt-3">
                        {state.verifying ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Verifying...
                          </span>
                        ) : "Verify Details"}
                      </button>
                    </div>
                  )}

                  {/* Expanded details for verified */}
                  {isVerified && (
                    <>
                      {state.expanded && (
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                          <div>
                            <p className="text-[10px] text-muted-foreground">Interest Rate</p>
                            <p className="text-xs font-bold text-foreground">{loan.rate}%</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">EMI</p>
                            <p className="text-xs font-bold text-foreground">{formatCurrency(loan.emi)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">EMIs Paid</p>
                            <p className="text-xs font-bold text-foreground">{loan.emisPaid}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">EMIs Left</p>
                            <p className="text-xs font-bold text-foreground">{loan.emisLeft}</p>
                          </div>
                        </div>
                      )}
                      <button onClick={() => toggleExpand(loan.id)}
                        className="flex items-center gap-1 text-primary text-xs font-semibold mt-3 active:opacity-70">
                        {state.expanded ? "VIEW LESS" : "VIEW MORE"}
                        {state.expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info text */}
        <div className="flex items-start gap-2 mb-5">
          <Info size={14} className="text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ensure fetched details match your loan account statement to avoid delays or resubmission.
          </p>
        </div>

        {/* CTA */}
        <button onClick={handleProceed}
          disabled={selectedLoans.length === 0}
          className="cta-primary mb-4">
          View Loan Offer
        </button>
      </div>

      {/* Upload SOA Bottom Sheet */}
      <BottomSheetModal open={!!uploadSheetLoan} onClose={() => setUploadSheetLoan(null)}>
        {uploadSheetLoan && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">Loan #0{loans.findIndex((l) => l.id === uploadSheetLoan.id) + 1}</h3>
              <button onClick={() => setUploadSheetLoan(null)} className="p-1"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div>
                <p className="text-[10px] text-muted-foreground">Sanctioned</p>
                <p className="text-xs font-bold text-foreground">{formatCurrency(uploadSheetLoan.sanctionedAmount)}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Outstanding</p>
                <p className="text-xs font-bold text-foreground">{formatCurrency(uploadSheetLoan.outstanding)}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Loan Start Date</p>
                <p className="text-xs font-bold text-foreground">{uploadSheetLoan.loanStartDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-1">Upload your Loan Account Statement (SOA)</p>
              <p className="text-xs text-muted-foreground mb-3">Ensure the statement is recent and not older than 45 days.</p>

              <button onClick={handleUploadFile}
                className="w-full border-2 border-dashed border-primary rounded-xl py-6 flex flex-col items-center justify-center gap-2 text-primary font-semibold text-sm active:bg-accent/30">
                <Upload size={20} />
                BROWSE/DROP FILE
              </button>
              <div className="flex justify-between mt-2">
                <p className="text-[10px] text-muted-foreground">Max file size: 4MB</p>
                <p className="text-[10px] text-muted-foreground">File formats: ePDF, PDF</p>
              </div>
            </div>
          </>
        )}
      </BottomSheetModal>

      {/* Edit Details Bottom Sheet */}
      <BottomSheetModal open={!!editSheetLoan} onClose={() => setEditSheetLoan(null)}>
        {editSheetLoan && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">Edit Details</h3>
              <button onClick={() => setEditSheetLoan(null)} className="p-1"><X size={20} /></button>
            </div>

            {/* SOA file */}
            <p className="text-xs text-muted-foreground mb-2">Upload Loan Account Statement</p>
            <p className="text-[10px] text-muted-foreground mb-2">We verify your loan details with the provided documents.</p>
            {(editForm.soaFile || editSheetLoan.soaFile) && (
              <div className="flex items-center border border-border rounded-xl px-3 py-2.5 gap-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"><span className="text-xs">📄</span></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{(editForm.soaFile || editSheetLoan.soaFile)?.name}</p>
                  <p className="text-[10px] text-muted-foreground">{(editForm.soaFile || editSheetLoan.soaFile)?.size}</p>
                </div>
                <button className="p-1 text-muted-foreground"><Eye size={14} /></button>
                <button onClick={() => handleDeleteSoa(editSheetLoan.id)} className="p-1 text-muted-foreground"><Trash2 size={14} /></button>
              </div>
            )}

            <div className="space-y-3">
              <EditField label="Bank Name" value={editForm.bank || ""} onChange={(v) => setEditForm({ ...editForm, bank: v })} />
              <EditField label="Loan Account Number" value={editForm.accountNumber || ""} onChange={(v) => setEditForm({ ...editForm, accountNumber: v })} />
              <div className="grid grid-cols-2 gap-3">
                <EditField label="Sanctioned Amount" value={String(editForm.sanctionedAmount || "")}
                  onChange={(v) => setEditForm({ ...editForm, sanctionedAmount: parseFloat(v.replace(/[^\d.]/g, "")) || 0 })} />
                <EditField label="Outstanding Amount" value={String(editForm.outstanding || "")}
                  onChange={(v) => setEditForm({ ...editForm, outstanding: parseFloat(v.replace(/[^\d.]/g, "")) || 0 })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <EditField label="Interest Rate" value={String(editForm.rate || "")}
                  onChange={(v) => setEditForm({ ...editForm, rate: parseFloat(v) || 0 })} />
                <EditField label="EMI" value={String(editForm.emi || "")}
                  onChange={(v) => setEditForm({ ...editForm, emi: parseFloat(v.replace(/[^\d.]/g, "")) || 0 })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <EditField label="EMIs Paid" value={String(editForm.emisPaid || "")}
                  onChange={(v) => setEditForm({ ...editForm, emisPaid: parseInt(v) || 0 })} />
                <EditField label="EMIs Left" value={String(editForm.emisLeft || "")}
                  onChange={(v) => setEditForm({ ...editForm, emisLeft: parseInt(v) || 0 })} />
              </div>
            </div>

            <button onClick={handleSaveEdit} className="cta-primary mt-5">
              Save Changes
            </button>
          </>
        )}
      </BottomSheetModal>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-8">
          <div className="bg-card rounded-2xl p-6 max-w-xs w-full">
            <h3 className="text-base font-bold text-foreground mb-2">Confirm Deletion</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Are you sure you want to delete this Document? Deleting the document will delete all loan details.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-border rounded-xl py-3 text-sm font-semibold text-foreground active:bg-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteSoa}
                className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold active:scale-[0.97]">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      className="input-axis text-sm" />
  </div>
);

export default BureauResults;
