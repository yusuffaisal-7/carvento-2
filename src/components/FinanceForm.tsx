import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FinanceFormProps } from '../types';

const FinanceForm: React.FC<FinanceFormProps> = ({
  financeDetails,
  selectedOption,
  isBusinessCustomer,
  onBack
}) => {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    message: '',
    finanzierung: false,
    versicherung: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.vorname || !formData.nachname || !formData.email || !formData.telefon) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        ...formData,
        productName: financeDetails.productName,
        financeType: selectedOption === 'purchase' ? 'Kaufen' : 'Finanzierung',
        monthlyRate: selectedOption === 'purchase' ? 'N/A' : `${financeDetails.monthlyRate} €`,
        downPayment: selectedOption === 'purchase' ? 'N/A' : `${financeDetails.downPayment} €`,
        finalRate: selectedOption === 'purchase' ? `${financeDetails.totalPrice} €` : `${financeDetails.finalRate} €`,
        duration: selectedOption === 'purchase' ? 'N/A' : financeDetails.duration.toString(),
        isBusinessCustomer: isBusinessCustomer.toString(),
        advertisementNumber: 'IM22-0098199:100615319'
      };

      await emailjs.send(
        'service_ylwfyrt',
        'template_atuu64k',
        templateParams,
        '3le7LdMc9qEkN-Iev'
      );

      alert('Anfrage erfolgreich versendet!');
      onBack();
    } catch (error) {
      setError('Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">{financeDetails.productName}</h2>

      <input
        type="text"
        placeholder="Vorname *"
        required
        value={formData.vorname}
        onChange={(e) => setFormData({ ...formData, vorname: e.target.value })}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#382d5e] focus:border-transparent"
      />

      <input
        type="text"
        placeholder="Nachname *"
        required
        value={formData.nachname}
        onChange={(e) => setFormData({ ...formData, nachname: e.target.value })}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#382d5e] focus:border-transparent"
      />

      <input
        type="email"
        placeholder="E-Mail Adresse *"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#382d5e] focus:border-transparent"
      />

      <input
        type="tel"
        placeholder="Telefonnummer *"
        required
        value={formData.telefon}
        onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#382d5e] focus:border-transparent"
      />

      <textarea
        placeholder="Schreibe uns eine Nachricht"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#382d5e] focus:border-transparent h-32"
      />

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.finanzierung}
            onChange={(e) => setFormData({ ...formData, finanzierung: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Ich interessiere mich für eine Finanzierung</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.versicherung}
            onChange={(e) => setFormData({ ...formData, versicherung: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Ich interessiere mich für eine Versicherung</span>
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 border border-[#382d5e] text-[#382d5e] rounded hover:bg-gray-50"
        >
          Zurück
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2 bg-[#382d5e] text-white rounded hover:bg-[#2c2450] disabled:opacity-50"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Einreichen'}
        </button>
      </div>
    </form>
  );
};

export default FinanceForm;