import React, { useState } from 'react';
import { FinanceCalculatorProps } from '../types';
import CalculatorModal from './CalculatorModal';

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  isBusinessCustomer,
  setIsBusinessCustomer,
  selectedOption,
  setSelectedOption,
  financeDetails,
  setFinanceDetails,
  onStartRequest
}) => {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === 'finance2') {
      setShowCalculator(true);
    } else if (option === 'purchase') {
      setFinanceDetails({
        ...financeDetails,
        monthlyRate: 0,
        downPayment: 0,
        finalRate: financeDetails.totalPrice,
        duration: 0
      });
    }
    setSelectedOption(option as 'finance1' | 'finance2' | 'purchase');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{financeDetails.productName}</h2>
      
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium" htmlFor="businessCustomer">
          Ich bin Geschäftskunde
        </label>
        <input
          type="checkbox"
          id="businessCustomer"
          checked={isBusinessCustomer}
          onChange={(e) => setIsBusinessCustomer(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      <div className="space-y-3">
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer ${
            selectedOption === 'finance1' ? 'border-black bg-gray-50' : 'border-gray-200'
          }`}
          onClick={() => handleOptionClick('finance1')}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="financeOption"
              checked={selectedOption === 'finance1'}
              onChange={() => handleOptionClick('finance1')}
              className="mr-3"
            />
            <span className="font-bold">
              Finanzieren für {financeDetails.monthlyRate} € mtl.
            </span>
          </label>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer ${
            selectedOption === 'finance2' ? 'border-black bg-gray-50' : 'border-gray-200'
          }`}
          onClick={() => handleOptionClick('finance2')}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="financeOption"
              checked={selectedOption === 'finance2'}
              onChange={() => handleOptionClick('finance2')}
              className="mr-3"
            />
            <span className="text-blue-600 hover:underline">
              Finanzierung anpassen
            </span>
          </label>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer ${
            selectedOption === 'purchase' ? 'border-black bg-gray-50' : 'border-gray-200'
          }`}
          onClick={() => handleOptionClick('purchase')}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="financeOption"
              checked={selectedOption === 'purchase'}
              onChange={() => handleOptionClick('purchase')}
              className="mr-3"
            />
            <span>
              Kaufen für <strong>{financeDetails.totalPrice} €</strong>
            </span>
          </label>
        </div>
      </div>

      <button
        onClick={onStartRequest}
        className="w-full bg-[#382d5e] hover:bg-[#2c2450] text-white py-3 px-4 rounded-md mt-6 font-medium transition-colors"
      >
        Anfrage starten →
      </button>

      <div className="text-center text-gray-500 text-sm mt-4">
        Inseratsnr.: IM22-0098199:100615319
      </div>

      {showCalculator && (
        <CalculatorModal
          financeDetails={financeDetails}
          setFinanceDetails={setFinanceDetails}
          onClose={() => setShowCalculator(false)}
          onSave={() => {
            setShowCalculator(false);
            setSelectedOption('finance1');
          }}
          onStartRequest={() => {
            setShowCalculator(false);
            onStartRequest();
          }}
        />
      )}
    </div>
  );
};

export default FinanceCalculator;