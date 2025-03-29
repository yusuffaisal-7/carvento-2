import React from 'react';
import { CalculatorModalProps } from '../types';
import { X } from 'lucide-react';

const CalculatorModal: React.FC<CalculatorModalProps> = ({
  financeDetails,
  setFinanceDetails,
  onClose,
  onSave,
  onStartRequest
}) => {
  const durations = [12, 24, 36, 48, 60, 72, 84, 96];
  const maxDownPayment = Math.round(financeDetails.totalPrice * 0.2); // Max 20% down payment

  const handleDownPaymentChange = (amount: number) => {
    const newDownPayment = Math.max(0, Math.min(maxDownPayment, financeDetails.downPayment + amount));
    updateCalculations({ ...financeDetails, downPayment: newDownPayment });
  };

  const handleFinalRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFinalRate = Number(e.target.value);
    updateCalculations({ ...financeDetails, finalRate: newFinalRate });
  };

  const handleDurationSelect = (duration: number) => {
    updateCalculations({ ...financeDetails, duration });
  };

  const updateCalculations = (details: typeof financeDetails) => {
    const financedAmount = details.totalPrice - details.downPayment - details.finalRate;
    const monthlyRate = Math.round((financedAmount / details.duration) + (financedAmount * 0.035 / details.duration));

    setFinanceDetails({
      ...details,
      monthlyRate
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Finanzierungsrechner</h2>
        <h3 className="text-lg mb-4">{financeDetails.productName}</h3>
        <p className="text-[#382d5e] font-bold text-2xl mb-6">
          {financeDetails.monthlyRate} € mtl.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Anzahlung (max. {maxDownPayment} €)
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDownPaymentChange(-500)}
                className="px-3 py-1 bg-[#382d5e] text-white rounded"
              >
                -
              </button>
              <span>{financeDetails.downPayment} €</span>
              <button
                onClick={() => handleDownPaymentChange(500)}
                className="px-3 py-1 bg-[#382d5e] text-white rounded"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Schlussrate: {financeDetails.finalRate} €
            </label>
            <input
              type="range"
              min="0"
              max={Math.round(financeDetails.totalPrice * 0.3)}
              step="100"
              value={financeDetails.finalRate}
              onChange={handleFinalRateChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Laufzeit</label>
            <div className="grid grid-cols-4 gap-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationSelect(duration)}
                  disabled={duration > 60}
                  className={`p-2 border rounded ${
                    financeDetails.duration === duration
                      ? 'bg-[#382d5e] text-white'
                      : 'border-[#382d5e] text-[#382d5e] disabled:opacity-50'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <p className="text-lg">
            Gesamtpreis:{' '}
            <span className="text-[#382d5e] font-bold">
              {financeDetails.totalPrice} €
            </span>
          </p>

          <div className="flex gap-4">
            <button
              onClick={onSave}
              className="flex-1 py-2 border border-[#382d5e] text-[#382d5e] rounded hover:bg-gray-50"
            >
              Auswahl speichern
            </button>
            <button
              onClick={onStartRequest}
              className="flex-1 py-2 bg-[#382d5e] text-white rounded hover:bg-[#2c2450]"
            >
              Finanzierungsanfrage für {financeDetails.monthlyRate} € mtl. starten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;