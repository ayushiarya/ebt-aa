import { createContext, useContext, useState, ReactNode } from "react";

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
  source: "bureau" | "manual";
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
  selectedLoanType: "ebt" | "new" | null;
  setSelectedLoanType: (t: "ebt" | "new" | null) => void;

  selectedLoans: LoanEntry[];
  setSelectedLoans: (loans: LoanEntry[]) => void;
  addManualLoan: (loan: LoanEntry) => void;
  updateLoan: (loan: LoanEntry) => void;

  // Edit mode
  editingLoan: LoanEntry | null;
  setEditingLoan: (loan: LoanEntry | null) => void;

  formData: LoanFormData;
  setFormData: (d: LoanFormData) => void;

  loanAmount: number;
  setLoanAmount: (n: number) => void;
  tenure: number;
  setTenure: (n: number) => void;

  emi: number;
  totalOutstanding: number;
  totalCurrentEmi: number;
  processingFee: number;
  stampDuty: number;
  interestRate: number;
  netDisbursal: number;
  formatCurrency: (n: number) => string;
}

const defaultFormData: LoanFormData = {
  bankName: "", loanType: null, accountNumber: "",
  sanctionedAmount: "", outstandingAmount: "", interestRate: "",
  emi: "", emisPaid: "", emisLeft: "", documentType: "",
};

const LoanContext = createContext<LoanState | null>(null);

export const useLoan = () => {
  const ctx = useContext(LoanContext);
  if (!ctx) throw new Error("useLoan must be used within LoanProvider");
  return ctx;
};

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLoanType, setSelectedLoanType] = useState<"ebt" | "new" | null>("ebt");
  const [selectedLoans, setSelectedLoans] = useState<LoanEntry[]>([]);
  const [formData, setFormData] = useState<LoanFormData>(defaultFormData);
  const [editingLoan, setEditingLoan] = useState<LoanEntry | null>(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(18);

  const totalOutstanding = selectedLoans.reduce((s, l) => s + l.outstanding, 0);
  const totalCurrentEmi = selectedLoans.reduce((s, l) => s + l.emi, 0);
  const processingFee = Math.round(loanAmount * 0.0118);
  const stampDuty = 410;
  const interestRate = 11.49;
  const emi = Math.round(loanAmount / tenure + loanAmount * 0.015);
  const netDisbursal = loanAmount - processingFee - stampDuty - totalOutstanding;

  const addManualLoan = (loan: LoanEntry) => {
    setSelectedLoans((prev) => [...prev, loan]);
  };

  const updateLoan = (loan: LoanEntry) => {
    setSelectedLoans((prev) => prev.map((l) => l.id === loan.id ? loan : l));
  };

  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <LoanContext.Provider value={{
      selectedLoanType, setSelectedLoanType,
      selectedLoans, setSelectedLoans, addManualLoan, updateLoan,
      editingLoan, setEditingLoan,
      formData, setFormData,
      loanAmount, setLoanAmount, tenure, setTenure,
      emi, totalOutstanding, totalCurrentEmi,
      processingFee, stampDuty, interestRate, netDisbursal,
      formatCurrency,
    }}>
      {children}
    </LoanContext.Provider>
  );
};
