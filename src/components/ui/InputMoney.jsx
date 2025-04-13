import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator as CalculatorIcon } from "lucide-react";
import axios from "axios";
import Calculator from "@/components/ui/Calculator";
import Multiselect from "@/components/ui/Multiselect";

export default function InputMoney({ label, name, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [loading, setLoading] = useState(true);

  const shouldFloat = isFocused || value;

  const fetchCurrencyOptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/currency");
      const ratesArray = res.data.data || [];

      const options = ratesArray.map((item) => ({
        value: item.Currency,
        label: `${item.Currency} - ${item.Rate.toFixed(2)}`,
        rate: item.Rate,
      }));

      setCurrencyOptions(options);

      const defaultBRL = options.find((opt) => opt.value === "BRL") || options[0];
      setFromCurrency(defaultBRL);
      setToCurrency(defaultBRL);
    } catch (error) {
      console.error("Erro ao buscar moedas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyOptions();
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.target.value) setIsFocused(false);
  };

  const SkeletonBox = () => (
    <div className="w-[90px] h-[36px] bg-gray-200 animate-pulse rounded-md" />
  );

  return (
    <div className="w-full mb-6 relative space-y-3">
      <motion.label
        initial={false}
        animate={shouldFloat ? {
          top: "-12px",
          left: "12px",
          fontSize: "12px",
          backgroundColor: "white",
          padding: "0 4px",
        } : {
          top: "50%",
          left: "16px",
          fontSize: "16px",
          backgroundColor: "transparent",
          padding: "0 4px",
          translateY: "-50%",
        }}
        transition={{ duration: 0.2 }}
        className="absolute text-gray-600 pointer-events-none z-10"
      >
        {label}
      </motion.label>

      <div className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#2D61F0]">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-1 py-1 text-sm focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowCalculator(true)}
          className="text-gray-500 hover:text-[#2D61F0] flex items-center gap-2 text-sm"
        >
          <CalculatorIcon className="w-4 h-4" />
          <span>Calculadora</span>
        </button>

        <div className="flex gap-2 items-center flex-1 justify-end">
          <div className="flex flex-col text-[11px]">
            <span className="text-gray-600 font-medium mb-1">Moeda padrão</span>
            {loading ? <SkeletonBox /> : (
              <Multiselect
                value={fromCurrency}
                onChange={setFromCurrency}
                options={currencyOptions}
                isMulti={false}
                placeholder="Selecionar"
                className="w-[120px] text-sm"
              />
            )}
            {!loading && fromCurrency && (
              <span className="text-[10px] text-gray-500 mt-1">{fromCurrency.value}</span>
            )}
          </div>
          <div className="flex flex-col text-[11px]">
            <span className="text-gray-600 font-medium mb-1">Recebido em</span>
            {loading ? <SkeletonBox /> : (
              <Multiselect
                value={toCurrency}
                onChange={setToCurrency}
                options={currencyOptions}
                isMulti={false}
                placeholder="Selecionar"
                className="w-[120px] text-sm"
              />
            )}
            {!loading && toCurrency && (
              <span className="text-[10px] text-gray-500 mt-1">{toCurrency.value}</span>
            )}
          </div>
        </div>
      </div>

      {showCalculator && (
        <Calculator
          onClose={() => setShowCalculator(false)}
          onResult={(calcValue) => {
            onChange({ target: { name, value: calcValue } });
            setShowCalculator(false);
          }}
        />
      )}
    </div>
  );
}
