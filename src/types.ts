export type FinanceOption = 'finance1' | 'finance2' | 'purchase';

export interface FinanceDetails {
  monthlyRate: number;
  downPayment: number;
  finalRate: number;
  duration: number;
  totalPrice: number;
  productName: string;
}

export interface FinanceCalculatorProps {
  isBusinessCustomer: boolean;
  setIsBusinessCustomer: (value: boolean) => void;
  selectedOption: FinanceOption;
  setSelectedOption: (option: FinanceOption) => void;
  financeDetails: FinanceDetails;
  setFinanceDetails: (details: FinanceDetails) => void;
  onStartRequest: () => void;
}

export interface CalculatorModalProps {
  financeDetails: FinanceDetails;
  setFinanceDetails: (details: FinanceDetails) => void;
  onClose: () => void;
  onSave: () => void;
  onStartRequest: () => void;
}

export interface FinanceFormProps {
  financeDetails: FinanceDetails;
  selectedOption: FinanceOption;
  isBusinessCustomer: boolean;
  onBack: () => void;
}