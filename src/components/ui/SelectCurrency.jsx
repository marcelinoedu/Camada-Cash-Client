import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SelectCurrency({ onClose, onSelect }) {
  const [search, setSearch] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/currency")
      .then((res) => setCurrencies(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = currencies.filter((c) =>
    `${c.Currency}`.toLowerCase().includes(search.toLowerCase())
  );

  const SkeletonItem = () => (
    <div className="w-full flex justify-between items-center px-3 py-2 border rounded-md bg-gray-100 animate-pulse">
      <div className="w-24 h-4 bg-gray-300 rounded" />
      <div className="w-12 h-3 bg-gray-300 rounded" />
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-[200] flex items-end md:items-center md:justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden p-6 flex flex-col"
          style={{ height: "500px" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Selecionar moeda recebida</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar moeda"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#2D61F0] focus:outline-none"
              disabled={loading}
            />
          </div>

          <div className="overflow-y-auto space-y-3 flex-1 pr-1">
            {loading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <SkeletonItem key={idx} />
                ))
              : filtered.map((item) => (
                  <button
                    key={item.Currency}
                    onClick={() => onSelect(item)}
                    className="w-full flex justify-between items-center px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
                  >
                    <span>{item.Currency}</span>
                    <span className="text-xs text-gray-500">
                      {Number(item.Rate).toFixed(2)}
                    </span>
                  </button>
                ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
