import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import InputMoney from "@/components/ui/InputMoney";
import Calendar from "@/components/ui/Calendar";

export default function FormData({ type, onClose, onSubmit }) {
  const [form, setForm] = useState({
    amount: "",
    received: false,
    date: new Date(),
    title: "",
    description: "",
  });

  const isRenda = type === "renda";

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const finalValue = inputType === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, type });
    onClose?.();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bold mb-4 text-[#2D61F0]">
            {isRenda ? "Adicionar Renda" : "Adicionar Despesa"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputMoney
              label="Valor"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />

            <div className="flex items-center gap-3">
              <input
                id="received"
                name="received"
                type="checkbox"
                checked={form.received}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-[#2D61F0]"
              />
              <label htmlFor="received" className="text-sm text-gray-700">
                {isRenda ? "Recebido?" : "Pago?"}
              </label>
            </div>

            <Calendar
              label={isRenda ? "Data do Recebimento" : "Data do Pagamento"}
              value={form.date}
              onChange={handleDateChange}
            />

            <InputText
              label="Título"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <InputText
              label="Descrição (opcional)"
              name="description"
              value={form.description}
              onChange={handleChange}
              type="text"
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full">
                Salvar
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
