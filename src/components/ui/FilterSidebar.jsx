// components/ui/FilterSidebar.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Multiselect from "@/components/ui/Multiselect";
import Toggle from "@/components/ui/Toggle";

export default function FilterSidebar({ isOpen, onClose, onApply }) {
  const [typeFilter, setTypeFilter] = useState(null); // 'income' | 'outcome' | null
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();
        const options = (data || []).map((cat) => ({
          value: cat.id,
          label: cat.label,
        }));
        setCategories(options);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleApply = () => {
    onApply({ type: typeFilter, categories: selectedCategories });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[150]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 right-0 z-[160] h-full w-full max-w-sm bg-white shadow-xl p-6 flex flex-col gap-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-800">Filtrar Transações</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Tipo</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTypeFilter("income")}
                  className={`flex-1 py-1.5 rounded-lg border text-sm font-medium ${
                    typeFilter === "income"
                      ? "bg-green-100 border-green-600 text-green-700"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  Renda
                </button>
                <button
                  onClick={() => setTypeFilter("outcome")}
                  className={`flex-1 py-1.5 rounded-lg border text-sm font-medium ${
                    typeFilter === "outcome"
                      ? "bg-red-100 border-red-600 text-red-700"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  Despesa
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-700">Categorias</p>
              <Multiselect
                options={categories}
                value={selectedCategories}
                onChange={setSelectedCategories}
                isMulti
                placeholder="Selecionar categorias"
              />
            </div>

            <div className="mt-auto">
              <button
                onClick={handleApply}
                className="w-full bg-[#2D61F0] text-white rounded-lg py-2 font-semibold hover:bg-[#1e4ad3] transition"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
