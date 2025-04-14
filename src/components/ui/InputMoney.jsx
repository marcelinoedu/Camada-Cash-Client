import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import SelectCurrency from "@/components/ui/SelectCurrency";

export default function InputMoney({ name, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    Currency: "BRL",
    Rate: 1,
  });

  const shouldFloat = isFocused || value;

  const handleCurrencyChange = (currencyObj) => {
    setSelectedCurrency(currencyObj);
    setShowCurrencyModal(false);
  };


  const convertedValue =
    value && selectedCurrency?.Rate
      ? (value / selectedCurrency.Rate).toFixed(2)
      : null;

  return (
    <div className="w-full mb-6 relative space-y-3">
      {convertedValue && (
        <div className="text-sm text-gray-700">
          💰 Total em real:{" "}
          <span className="font-semibold text-[#2D61F0]">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(convertedValue)}
          </span>
        </div>
      )}

      <div className="relative border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#2D61F0]">
        <motion.label
          initial={false}
          animate={
            isFocused || !value
              ? {
                  top: "-10px",
                  left: "12px",
                  fontSize: "12px",
                  opacity: 1,
                  backgroundColor: "white",
                  padding: "0 4px",
                }
              : {
                  opacity: 0,
                }
          }
          transition={{ duration: 0.2 }}
          className="absolute text-gray-600 pointer-events-none z-10"
        >
          valor:
        </motion.label>

        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => !e.target.value && setIsFocused(false)}
          className="w-full px-1 py-1 text-sm focus:outline-none"
        />
      </div>

      <div className="flex justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">
            {`Recebido em: ${selectedCurrency.Currency}`}
          </span>
          <button
            type="button"
            onClick={() => setShowCurrencyModal(true)}
            className="text-gray-400 hover:text-[#2D61F0] cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showCurrencyModal && (
        <SelectCurrency
          onClose={() => setShowCurrencyModal(false)}
          onSelect={handleCurrencyChange}
        />
      )}
    </div>
  );
}
