import { createContext, useContext, useState, ReactNode } from "react";

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
  formData: LoanFormData;
  loanAmount: number;
  tenure: number;
  setSelectedLoanType: (t: "ebt" | "new" | null) => void;
  setFormData: (d: LoanFormData) => void;
  setLoanAmount: (n: number) => void;
  setTenure: (n: number) => void;
  emi: number;
  formatCurrency: (n: number) => string;
}

const LoanContext = createContext<LoanState | null>(null);

export const useLoan = () => {
  const ctx = useContext(LoanContext);
  if (!ctx) throw new Error("useLoan must be used within LoanProvider");
  return ctx;
};

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLoanType, setSelectedLoanType] = useState<"ebt" | "new" | null>("ebt");
  const [formData, setFormData] = useState<LoanFormData>({
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
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(18);

  const emi = Math.round(loanAmount / tenure + loanAmount * 0.015);
  const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <LoanContext.Provider
      value={{
        selectedLoanType, setSelectedLoanType,
        formData, setFormData,
        loanAmount, setLoanAmount,
        tenure, setTenure,
        emi, formatCurrency,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
