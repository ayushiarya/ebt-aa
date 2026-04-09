import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface LoanEntry {
  id: string;
  bank: string;
  type: string;
  accountNumber: string;
  sanctionedAmount: number;
  outstanding: number;
  emi: number;
  rate: number;
  emisPaid: number;
  emisLeft: number;
  loanStartDate: string;
  source: "bureau" | "manual";
  verified: boolean;
  soaFile?: { name: string; size: string } | null;
}

export interface LoanFormData {
  bankName: string;
  loanType: "personal" | "credit" | null;
  accountNumber: string;
  sanctionedAmount: string;
  outstandingAmount: string;
  interestRate: string;
  emi: string;
  emisPaid: string;
  emisLeft: string;
  documentType: string;
}

export interface LoanState {
  selectedLoans: LoanEntry[];
  setSelectedLoans: (loans: LoanEntry[]) => void;
  addManualLoan: (loan: LoanEntry) => void;
  updateLoan: (loan: LoanEntry) => void;

  editedBureauLoans: Record<string, LoanEntry>;
  updateBureauLoan: (loan: LoanEntry) => void;

  editingLoan: LoanEntry | null;
  setEditingLoan: (loan: LoanEntry | null) => void;

  formData: LoanFormData;
  setFormData: (d: LoanFormData) => void;

  loanAmount: number;
  setLoanAmount: (n: number) => void;
  tenure: number;
  setTenure: (n: number) => void;

  selectedLoanCentre: { name: string; code: string; address: string } | null;
  setSelectedLoanCentre: (c: { name: string; code: string; address: string } | null) => void;

  ddOption: "home" | "self";
  setDdOption: (o: "home" | "self") => void;

  emi: number;
  totalOutstanding: number;
  totalCurrentEmi: number;
  processingFee: number;
  stampDuty: number;
  interestRate: number;
  netDisbursal: number;
  maxLoanAmount: number;
  formatCurrency: (n: number) => string;
}

const defaultFormData: LoanFormData = {
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
};

const LoanContext = createContext<LoanState | null>(null);

export const useLoan = () => {
  const ctx = useContext(LoanContext);
  if (!ctx) throw new Error("useLoan must be used within LoanProvider");
  return ctx;
};

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLoans, setSelectedLoans] = useState<LoanEntry[]>([]);
  const [editedBureauLoans, setEditedBureauLoans] = useState<Record<string, LoanEntry>>({});
  const [formData, setFormData] = useState<LoanFormData>(defaultFormData);
  const [editingLoan, setEditingLoan] = useState<LoanEntry | null>(null);
  const [ddOption, setDdOption] = useState<"home" | "self">("home");
  const [selectedLoanCentre, setSelectedLoanCentre] = useState<{ name: string; code: string; address: string } | null>({
    name: "Mulund",
    code: "UTIB0000108",
    address: "Park Apartments, Saki Naka, MIDC, Andheri East, Near Techno Park, Mumbai 400072",
  });

  const maxLoanAmount = 4000000;
  const [loanAmount, setLoanAmount] = useState(maxLoanAmount);
  const [tenure, setTenure] = useState(48);

  // Note: emi is calculated dynamically from loanAmount, tenure, interestRate
  // With 4000000 @ 12% for 48 months, emi ≈ 105,335

  const totalOutstanding = selectedLoans.reduce((s, l) => s + l.outstanding, 0);
  const totalCurrentEmi = selectedLoans.reduce((s, l) => s + l.emi, 0);

  useEffect(() => {
    if (totalOutstanding > 0 && loanAmount < totalOutstanding) {
      setLoanAmount(Math.min(totalOutstanding + 300000, maxLoanAmount));
    }
  }, [totalOutstanding]);

  const processingFee = 5899;
  const stampDuty = 9500;
  const interestRate = 12;

  const monthlyRate = interestRate / 100 / 12;
  const emi =
    loanAmount > 0
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1)
        )
      : 0;

  // Net disbursal = loanAmount - processingFee - stampDuty - totalOutstanding
  // With defaults: 4000000 - 5899 - 9500 - 683163 = 3301438
  const netDisbursal = loanAmount - processingFee - stampDuty - totalOutstanding;

  const addManualLoan = (loan: LoanEntry) => {
    setSelectedLoans((prev) => [...prev, loan]);
  };

  const updateLoan = (loan: LoanEntry) => {
    setSelectedLoans((prev) => prev.map((l) => (l.id === loan.id ? loan : l)));
  };

  const updateBureauLoan = (loan: LoanEntry) => {
    setEditedBureauLoans((prev) => ({ ...prev, [loan.id]: loan }));
  };

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <LoanContext.Provider
      value={{
        selectedLoans,
        setSelectedLoans,
        addManualLoan,
        updateLoan,
        editedBureauLoans,
        updateBureauLoan,
        editingLoan,
        setEditingLoan,
        formData,
        setFormData,
        loanAmount,
        setLoanAmount,
        tenure,
        setTenure,
        selectedLoanCentre,
        setSelectedLoanCentre,
        ddOption,
        setDdOption,
        emi,
        totalOutstanding,
        totalCurrentEmi,
        processingFee,
        stampDuty,
        interestRate,
        netDisbursal,
        maxLoanAmount,
        formatCurrency,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
