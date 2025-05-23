import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import InputMoney from "@/components/ui/InputMoney";
import Calendar from "@/components/ui/Calendar";
import Toggle from "@/components/ui/Toggle";
import Multiselect from "@/components/ui/Multiselect";

export default function FormData({ type, onClose, onSubmit }) {
  const [form, setForm] = useState({
    amount: "",
    received: false,
    date: new Date(),
    description: "",
    category: null,
  });

  const [categoryOptions, setCategoryOptions] = useState([]);

  const isRenda = type === "renda";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const formattedType = isRenda ? "income" : "outcome";
        const res = await axios.get(`/api/categories?category_type=${formattedType}`);
        const options = (res.data || []).map((cat) => ({
          value: cat.id,
          label: cat.label,
        }));
        setCategoryOptions(options);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };

    fetchCategories();
  }, [type]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const finalValue = inputType === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, date }));
  };

  const handleToggle = (value) => {
    setForm((prev) => ({ ...prev, received: value }));
  };

  const handleCategoryChange = (selected) => {
    setForm((prev) => ({ ...prev, category: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const payload = {
        amount: parseFloat(form.amount),
        description: form.description || "",
        date: form.date.toISOString(),
        type: isRenda ? "income" : "outcome",
        status: form.received,
        received: form.received,
        categories: form.category,
      };

      await axios.post("/api/transaction/create", payload);

      if (onSubmit) onSubmit();
      if (onClose) onClose();
    } catch (err) {
      console.error("Erro ao criar transação:", err);
      alert("Não foi possível salvar. Verifique os dados.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center px-4"
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

          <form onSubmit={handleSubmit} className="space-y-8 mt-6">
            <InputMoney
              label="Valor"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between gap-3">
              <label className="text-sm text-gray-700">
                {isRenda ? "Recebido?" : "Pago?"}
              </label>
              <Toggle checked={form.received} onChange={handleToggle} />
            </div>

            <Calendar
              label={isRenda ? "Data do Recebimento" : "Data do Pagamento"}
              value={form.date}
              onChange={handleDateChange}
            />

            <div className="text-sm">
              <span className="block mb-1 text-gray-700 font-medium">Categoria</span>
              <Multiselect
                isMulti={false}
                value={form.category}
                onChange={handleCategoryChange}
                options={categoryOptions}
                placeholder="Selecione uma categoria"
                isClearable
              />
            </div>

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
