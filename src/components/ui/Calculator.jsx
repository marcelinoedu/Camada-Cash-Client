import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

export default function Calculator({ onClose, onResult }) {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  const handleInput = (value) => {
    if (value === "=") {
      try {
        const evalResult = eval(expression);
        setResult(evalResult);
        onResult?.(evalResult);
      } catch {
        setResult("Erro");
      }
    } else {
      setExpression((prev) => prev + value);
      setResult(null);
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult(null);
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-4 z-[200] border-t border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#2D61F0]">Calculadora</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gray-100 text-right px-4 py-3 rounded-lg font-mono text-xl mb-4">
        {result !== null ? result : expression || "0"}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((btn, i) => (
          <Button
            key={i}
            variant={btn === "=" ? "success" : btn.match(/[0-9.]/) ? "neutral" : "secondary"}
            onClick={() => handleInput(btn)}
            className="py-4 rounded-xl text-base"
          >
            {btn}
          </Button>
        ))}
        <Button
          variant="danger"
          onClick={handleClear}
          className="col-span-4 py-3 rounded-xl mt-1"
        >
          Limpar
        </Button>
      </div>
    </motion.div>
  );
}
