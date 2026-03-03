import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Info, Eye, Trash2, Upload } from "lucide-react";
import { useLoan } from "@/context/LoanContext";

interface UploadedFile { name: string; size: string; }

const BANKS = ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "PNB"];
const DOC_TYPES = ["Select", "Repayment + Bank Statement", "Loan Statement", "NOC"];

const AddLoanDetails = () => {
  const navigate = useNavigate();
  const { formData, setFormData, addManualLoan, editingLoan, setEditingLoan, updateLoan } = useLoan();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [repaymentFile, setRepaymentFile] = useState<UploadedFile | null>(null);
  const [bankStatementFile, setBankStatementFile] = useState<UploadedFile | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isEditMode = !!editingLoan;

  // Prefill form when editing
  useEffect(() => {
    if (editingLoan) {
      setFormData({
        bankName: editingLoan.bank,
        loanType: editingLoan.type === "Personal Loan" ? "personal" : "credit",
        accountNumber: editingLoan.accountNumber,
        sanctionedAmount: editingLoan.sanctionedAmount.toLocaleString("en-IN"),
        outstandingAmount: editingLoan.outstanding.toLocaleString("en-IN"),
        interestRate: editingLoan.rate.toString(),
        emi: editingLoan.emi.toLocaleString("en-IN"),
        emisPaid: editingLoan.emisPaid.toString(),
        emisLeft: editingLoan.emisLeft.toString(),
        documentType: "",
      });
    }
    return () => setEditingLoan(null);
  }, []);

  const update = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (submitted) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.bankName) e.bankName = "Please select your Bank Name.";
    if (!formData.loanType) e.loanType = "Please select your Loan Type.";
    if (!formData.accountNumber) e.accountNumber = "Please enter the Loan Account Number.";
    if (!formData.sanctionedAmount) e.sanctionedAmount = "Please enter the Sanctioned Amount.";
    if (!formData.outstandingAmount) e.outstandingAmount = "Please enter the Outstanding Amount.";
    if (!formData.interestRate) e.interestRate = "Please enter the Interest Rate.";
    if (!formData.emi) e.emi = "Please enter the EMI.";
    if (!formData.emisPaid) e.emisPaid = "Please enter the EMIs Paid.";
    if (!formData.emisLeft) e.emisLeft = "Please enter the EMIs Left.";
    if (!formData.documentType || formData.documentType === "Select") e.documentType = "Please select your Document Type.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    setSubmitted(true);
    if (!validate()) return;

    const loanData = {
      id: isEditMode ? editingLoan!.id : "m_" + Date.now(),
      bank: formData.bankName,
      type: formData.loanType === "personal" ? "Personal Loan" : "Credit Card",
      accountNumber: formData.accountNumber,
      sanctionedAmount: parseFloat(formData.sanctionedAmount.replace(/[^\d.]/g, "")) || 0,
      outstanding: parseFloat(formData.outstandingAmount.replace(/[^\d.]/g, "")) || 0,
      emi: parseFloat(formData.emi.replace(/[^\d.]/g, "")) || 0,
      rate: parseFloat(formData.interestRate.replace(/[^\d.]/g, "")) || 0,
      emisPaid: parseInt(formData.emisPaid) || 0,
      emisLeft: parseInt(formData.emisLeft) || 0,
      source: (isEditMode ? editingLoan!.source : "manual") as "bureau" | "manual",
    };

    if (isEditMode) {
      updateLoan(loanData);
    } else {
      addManualLoan(loanData);
    }

    setFormData({
      bankName: "", loanType: null, accountNumber: "",
      sanctionedAmount: "", outstandingAmount: "", interestRate: "",
      emi: "", emisPaid: "", emisLeft: "", documentType: "",
    });

    navigate("/bureau-results");
  };

  const showDocUploads = formData.documentType && formData.documentType !== "Select";
  const isFormFilled = formData.bankName && formData.loanType && formData.accountNumber &&
    formData.sanctionedAmount && formData.outstandingAmount && formData.interestRate &&
    formData.emi && formData.emisPaid && formData.emisLeft &&
    formData.documentType && formData.documentType !== "Select";

  return (
    <div className="app-container min-h-screen flex flex-col bg-background page-enter">
      <AppHeader title={isEditMode ? "Add Details" : "Add Loan Manually"} />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        <FieldLabel text="Bank Name" error={errors.bankName} />
        <div className="relative mb-1">
          <select value={formData.bankName} onChange={(e) => update("bankName", e.target.value)}
            className={`input-axis appearance-none pr-10 ${errors.bankName ? "input-error" : ""}`}>
            <option value="">Select</option>
            {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronIcon />
        </div>
        <ErrorText text={errors.bankName} />

        <FieldLabel text="Select Type" error={errors.loanType} />
        <div className="flex gap-3 mb-1">
          {(["personal", "credit"] as const).map((type) => (
            <button key={type} onClick={() => update("loanType", type)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                formData.loanType === type ? "bg-primary text-primary-foreground shadow-sm" : "bg-background border border-border text-foreground"
              }`}>
              {type === "personal" ? "Personal Loan" : "Credit Card"}
            </button>
          ))}
        </div>
        <ErrorText text={errors.loanType} />

        <div className="flex items-center gap-1 mt-3">
          <FieldLabel text="Loan Account Number" error={errors.accountNumber} />
          <Info size={14} className="text-muted-foreground mb-1" />
        </div>
        <input type="text" placeholder="123456XXXX" value={formData.accountNumber}
          onChange={(e) => update("accountNumber", e.target.value)}
          className={`input-axis mb-1 ${errors.accountNumber ? "input-error" : ""}`} />
        <ErrorText text={errors.accountNumber} />

        <div className="grid grid-cols-2 gap-3 mt-3">
          <InputField label="Sanctioned Amount" placeholder="₹ 0" value={formData.sanctionedAmount} error={errors.sanctionedAmount} onChange={(v) => update("sanctionedAmount", v)} />
          <InputField label="Outstanding Amount" placeholder="₹ 0" value={formData.outstandingAmount} error={errors.outstandingAmount} onChange={(v) => update("outstandingAmount", v)} />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <InputField label="Interest Rate" placeholder="0 %" value={formData.interestRate} error={errors.interestRate} onChange={(v) => update("interestRate", v)} />
          <InputField label="EMI" placeholder="₹ 0" value={formData.emi} error={errors.emi} onChange={(v) => update("emi", v)} />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <InputField label="EMIs Paid" placeholder="0" value={formData.emisPaid} error={errors.emisPaid} onChange={(v) => update("emisPaid", v)} />
          <InputField label="EMIs Left" placeholder="0" value={formData.emisLeft} error={errors.emisLeft} onChange={(v) => update("emisLeft", v)} />
        </div>

        <h3 className="text-base font-bold text-foreground mt-7 mb-3">Upload Documents</h3>
        <div className="bg-accent/50 rounded-xl p-4 mb-4 flex gap-3">
          <Info size={16} className="text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">We verify your details with the provided documents. Any mismatch may require resubmission and delay processing.</p>
        </div>

        <FieldLabel text="Select Document Type" error={errors.documentType} />
        <div className="relative mb-1">
          <select value={formData.documentType} onChange={(e) => update("documentType", e.target.value)}
            className={`input-axis appearance-none pr-10 ${errors.documentType ? "input-error" : ""}`}>
            {DOC_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronIcon />
        </div>
        <ErrorText text={errors.documentType} />

        {showDocUploads && (
          <div className="mt-4 space-y-5">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Repayment Schedule</p>
              {repaymentFile ? (
                <FileCard file={repaymentFile} onDelete={() => setRepaymentFile(null)} />
              ) : (
                <button onClick={() => setRepaymentFile({ name: "Repayment.png", size: "399KB" })}
                  className="w-full border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 text-primary font-semibold text-sm active:bg-accent/30">
                  <Upload size={16} /> UPLOAD FILE
                </button>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Bank Statement</p>
              <p className="text-xs text-muted-foreground mb-2">Upload Bank statements from Jan 2025 to Mar 2025</p>
              {bankStatementFile ? (
                <FileCard file={bankStatementFile} onDelete={() => setBankStatementFile(null)} />
              ) : (
                <button onClick={() => setBankStatementFile({ name: "BankStatement.png", size: "399KB" })}
                  className="w-full border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 text-primary font-semibold text-sm active:bg-accent/30">
                  <Upload size={16} /> UPLOAD FILE
                </button>
              )}
              <p className="text-xs text-muted-foreground mt-2">Max file size: 2MB · File formats: JPEG, PDF</p>
            </div>
          </div>
        )}
      </div>

      <div className="sticky-cta">
        <button onClick={handleSave} disabled={!isFormFilled} className="cta-primary">Save Details</button>
      </div>
    </div>
  );
};

const ChevronIcon = () => (
  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </div>
);

const FieldLabel = ({ text, error }: { text: string; error?: string }) => (
  <p className={`text-sm font-medium mb-1.5 ${error ? "text-destructive" : "text-foreground"}`}>{text}</p>
);

const ErrorText = ({ text }: { text?: string }) =>
  text ? (
    <div className="flex items-center gap-1.5 mb-3 mt-1">
      <span className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold shrink-0">!</span>
      <p className="text-xs text-destructive font-medium">{text}</p>
    </div>
  ) : <div className="mb-3" />;

const InputField = ({ label, placeholder, value, error, onChange }: {
  label: string; placeholder: string; value: string; error?: string; onChange: (v: string) => void;
}) => (
  <div>
    <FieldLabel text={label} error={error} />
    <input type="text" placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input-axis mb-1 ${error ? "input-error" : ""}`} />
    <ErrorText text={error} />
  </div>
);

const FileCard = ({ file, onDelete }: { file: UploadedFile; onDelete: () => void }) => (
  <div className="flex items-center border border-border rounded-xl px-4 py-3.5 gap-3">
    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
      <span className="text-accent-foreground text-sm">📄</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
      <p className="text-xs text-muted-foreground">{file.size}</p>
    </div>
    <button className="p-2 text-muted-foreground active:opacity-70"><Eye size={18} /></button>
    <button onClick={onDelete} className="p-2 text-muted-foreground active:opacity-70"><Trash2 size={18} /></button>
  </div>
);

export default AddLoanDetails;
