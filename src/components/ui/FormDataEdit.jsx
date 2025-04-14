import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash } from "lucide-react";
import axios from "axios";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import InputMoney from "@/components/ui/InputMoney";
import Calendar from "@/components/ui/Calendar";
import Toggle from "@/components/ui/Toggle";
import Multiselect from "@/components/ui/Multiselect";

export default function FormDataEdit({ transaction, onClose, onSubmit }) {
  const [form, setForm] = useState({
    amount: transaction.amount || "",
    received: transaction.status || false,
    date: new Date(transaction.date),
    description: transaction.description || "",
    category: transaction.category || null,
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const isRenda = transaction.type === "income";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const formattedType = isRenda ? "income" : "outcome";
        const res = await axios.get(
          `/api/categories?category_type=${formattedType}`
        );
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
  }, [transaction.type]);

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
        description: form.description,
        date: form.date.toISOString(),
        status: form.received,
      };

      // Update transaction
      await axios.put(`/api/transaction/${transaction.id}`, payload);

      // Update category relationship
      if (form.category) {
        await axios.post(`/api/transaction/${transaction.id}/categories`, {
          category_id: form.category.value,
        });
      }

      onSubmit?.();
      onClose?.();
    } catch (err) {
      console.error("Erro ao atualizar transação:", err);
      alert("Não foi possível atualizar.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Deseja realmente deletar esta transação?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/transaction/${transaction.id}`);
      onSubmit?.();
      onClose?.();
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
      alert("Erro ao deletar.");
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

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2D61F0]">
              Editar {isRenda ? "Renda" : "Despesa"}
            </h2>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition pr-4"
              title="Deletar transação"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>

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
              <span className="block mb-1 text-gray-700 font-medium">
                Categoria
              </span>
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

            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" variant="primary" className="w-full">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
