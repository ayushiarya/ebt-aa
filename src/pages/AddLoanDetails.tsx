import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Info, Eye, Trash2, Upload } from "lucide-react";

type LoanType = "personal" | "credit" | null;

interface FormData {
  bankName: string;
  loanType: LoanType;
  accountNumber: string;
  sanctionedAmount: string;
  outstandingAmount: string;
  interestRate: string;
  emi: string;
  emisPaid: string;
  emisLeft: string;
  documentType: string;
}

interface UploadedFile {
  name: string;
  size: string;
}

const BANKS = ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "PNB"];
const DOC_TYPES = ["Select", "Repayment + Bank Statement", "Loan Statement", "NOC"];

const AddLoanDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    bankName: "",
    loanType: null,
    accountNumber: "",
    sanctionedAmount: "",
    outstandingAmount: "",
    interestRate: "",
    emi: "",
    emisPaid: "",
    emisLeft: "",
    documentType: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [repaymentFile, setRepaymentFile] = useState<UploadedFile | null>(null);
  const [bankStatementFile, setBankStatementFile] = useState<UploadedFile | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string | LoanType) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.bankName) e.bankName = "Please select your Bank Name.";
    if (!form.loanType) e.loanType = "Please select your Loan Type.";
    if (!form.accountNumber) e.accountNumber = "Please enter the Loan Account Number.";
    if (!form.sanctionedAmount || form.sanctionedAmount === "0") e.sanctionedAmount = "Please enter the Sanctioned Amount.";
    if (!form.outstandingAmount || form.outstandingAmount === "0") e.outstandingAmount = "Please enter the Outstanding Amount.";
    if (!form.interestRate || form.interestRate === "0") e.interestRate = "Please enter the Interest Rate.";
    if (!form.emi || form.emi === "0") e.emi = "Please enter the EMI.";
    if (!form.emisPaid || form.emisPaid === "0") e.emisPaid = "Please enter the EMIs Paid.";
    if (!form.emisLeft || form.emisLeft === "0") e.emisLeft = "Please enter the EMIs Left.";
    if (!form.documentType || form.documentType === "Select") e.documentType = "Please select your Document Type.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    setSubmitted(true);
    if (validate()) {
      navigate("/loan-offer");
    }
  };

  const simulateUpload = (setter: (f: UploadedFile | null) => void, name: string) => {
    setter({ name, size: "399KB" });
  };

  const showDocUploads = form.documentType && form.documentType !== "Select";

  const isFormFilled =
    form.bankName &&
    form.loanType &&
    form.accountNumber &&
    form.sanctionedAmount &&
    form.outstandingAmount &&
    form.interestRate &&
    form.emi &&
    form.emisPaid &&
    form.emisLeft &&
    form.documentType &&
    form.documentType !== "Select";

  return (
    <div className="app-container min-h-screen flex flex-col bg-background">
      <AppHeader title="Add Details" />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {/* Bank Name */}
        <FieldLabel text="Bank Name" error={errors.bankName} />
        <select
          value={form.bankName}
          onChange={(e) => update("bankName", e.target.value)}
          className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground appearance-none ${errors.bankName ? "border-destructive" : "border-border"}`}
        >
          <option value="">Select</option>
          {BANKS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <ErrorText text={errors.bankName} />

        {/* Loan Type Toggle */}
        <FieldLabel text="Select Type" error={errors.loanType} />
        <div className="flex gap-2 mb-1">
          {(["personal", "credit"] as const).map((type) => (
            <button
              key={type}
              onClick={() => update("loanType", type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                form.loanType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground"
              }`}
            >
              {type === "personal" ? "Personal Loan" : "Credit Card"}
            </button>
          ))}
        </div>
        <ErrorText text={errors.loanType} />

        {/* Loan Account Number */}
        <div className="flex items-center gap-1 mt-3">
          <FieldLabel text="Loan Account Number" error={errors.accountNumber} />
          <Info size={14} className="text-muted-foreground mb-1" />
        </div>
        <input
          type="text"
          placeholder="123456XXXX"
          value={form.accountNumber}
          onChange={(e) => update("accountNumber", e.target.value)}
          className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.accountNumber ? "border-destructive" : "border-border"}`}
        />
        <ErrorText text={errors.accountNumber} />

        {/* Two-column fields */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <FieldLabel text="Sanctioned Amount" error={errors.sanctionedAmount} />
            <input
              type="text"
              placeholder="₹ 0"
              value={form.sanctionedAmount}
              onChange={(e) => update("sanctionedAmount", e.target.value)}
              className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.sanctionedAmount ? "border-destructive" : "border-border"}`}
            />
            <ErrorText text={errors.sanctionedAmount} />
          </div>
          <div>
            <FieldLabel text="Outstanding Amount" error={errors.outstandingAmount} />
            <input
              type="text"
              placeholder="₹ 0"
              value={form.outstandingAmount}
              onChange={(e) => update("outstandingAmount", e.target.value)}
              className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.outstandingAmount ? "border-destructive" : "border-border"}`}
            />
            <ErrorText text={errors.outstandingAmount} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <FieldLabel text="Interest Rate" error={errors.interestRate} />
            <input
              type="text"
              placeholder="0 %"
              value={form.interestRate}
              onChange={(e) => update("interestRate", e.target.value)}
              className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.interestRate ? "border-destructive" : "border-border"}`}
            />
            <ErrorText text={errors.interestRate} />
          </div>
          <div>
            <FieldLabel text="EMI" error={errors.emi} />
            <input
              type="text"
              placeholder="₹ 0"
              value={form.emi}
              onChange={(e) => update("emi", e.target.value)}
              className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.emi ? "border-destructive" : "border-border"}`}
            />
            <ErrorText text={errors.emi} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <FieldLabel text="EMIs Paid" error={errors.emisPaid} />
            <input
              type="text"
              placeholder="0"
              value={form.emisPaid}
              onChange={(e) => update("emisPaid", e.target.value)}
              className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.emisPaid ? "border-destructive" : "border-border"}`}
            />
            <ErrorText text={errors.emisPaid} />
          </div>
          <div>
            <FieldLabel text="EMIs Left" error={errors.emisLeft} />
            <input
              type="text"
              placeholder="0"
              value={form.emisLeft}
              onChange={(e) => update("emisLeft", e.target.value)}
              className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground ${errors.emisLeft ? "border-destructive" : "border-border"}`}
            />
            <ErrorText text={errors.emisLeft} />
          </div>
        </div>

        {/* Upload Documents */}
        <h3 className="text-lg font-bold text-foreground mt-6 mb-3">Upload Documents</h3>
        <div className="bg-accent/50 rounded-lg p-3 mb-4 flex gap-2">
          <Info size={16} className="text-accent-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            We verify your details with the provided documents. Any mismatch may require resubmission and delay processing.
          </p>
        </div>

        <FieldLabel text="Select Document Type" error={errors.documentType} />
        <select
          value={form.documentType}
          onChange={(e) => update("documentType", e.target.value)}
          className={`w-full border rounded-lg px-3 py-3 text-sm mb-1 bg-background text-foreground appearance-none ${errors.documentType ? "border-destructive" : "border-border"}`}
        >
          {DOC_TYPES.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <ErrorText text={errors.documentType} />

        {showDocUploads && (
          <div className="mt-4 space-y-4">
            {/* Repayment Schedule */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Repayment Schedule</p>
              {repaymentFile ? (
                <FileCard file={repaymentFile} onDelete={() => setRepaymentFile(null)} />
              ) : (
                <button
                  onClick={() => simulateUpload(setRepaymentFile, "Repayment.png")}
                  className="w-full border-2 border-dashed border-border rounded-lg py-3 flex items-center justify-center gap-2 text-primary font-semibold text-sm"
                >
                  <Upload size={16} /> UPLOAD FILE
                </button>
              )}
            </div>

            {/* Bank Statement */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Bank Statement</p>
              <p className="text-xs text-muted-foreground mb-2">
                Upload Bank statements from Jan 2025 to Mar 2025 of the bank account
              </p>
              {bankStatementFile ? (
                <FileCard file={bankStatementFile} onDelete={() => setBankStatementFile(null)} />
              ) : (
                <button
                  onClick={() => simulateUpload(setBankStatementFile, "BankStatement.png")}
                  className="w-full border-2 border-dashed border-border rounded-lg py-3 flex items-center justify-center gap-2 text-primary font-semibold text-sm"
                >
                  <Upload size={16} /> UPLOAD FILE
                </button>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Max file size: 2MB &nbsp;&nbsp; File formats: JPEG, PDF
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-4 bg-background border-t border-border">
        <button
          onClick={handleSave}
          disabled={!isFormFilled && !submitted}
          className={`w-full py-4 rounded-lg font-semibold text-base transition-colors ${
            isFormFilled
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Save Details
        </button>
      </div>
    </div>
  );
};

const FieldLabel = ({ text, error }: { text: string; error?: string }) => (
  <p className={`text-sm font-medium mb-1 ${error ? "text-destructive" : "text-foreground"}`}>
    {text}
  </p>
);

const ErrorText = ({ text }: { text?: string }) =>
  text ? (
    <div className="flex items-center gap-1 mb-2">
      <span className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">!</span>
      <p className="text-xs text-destructive">{text}</p>
    </div>
  ) : <div className="mb-2" />;

const FileCard = ({ file, onDelete }: { file: UploadedFile; onDelete: () => void }) => (
  <div className="flex items-center border border-border rounded-lg px-3 py-3 gap-3">
    <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
      <span className="text-accent-foreground text-xs">📄</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
      <p className="text-xs text-muted-foreground">{file.size}</p>
    </div>
    <button className="p-1 text-muted-foreground"><Eye size={18} /></button>
    <button onClick={onDelete} className="p-1 text-muted-foreground"><Trash2 size={18} /></button>
  </div>
);

export default AddLoanDetails;
