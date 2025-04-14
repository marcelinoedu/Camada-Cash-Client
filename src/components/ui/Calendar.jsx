import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar({ label = "Data", value, onChange }) {
  const [show, setShow] = useState(false);

  const handleSelect = (selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate);
      setShow(false);
    }
  };

  return (
    <div className="w-full relative mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-[#2D61F0] bg-white"
      >
        <span>
          {value
            ? format(value, "dd/MM/yyyy")
            : "Selecionar data"}
        </span>
        <CalendarDays className="w-5 h-5 text-gray-500" />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg"
          >
            <DayPicker
              mode="single"
              selected={value}
              onSelect={handleSelect}
              modifiersClassNames={{
                selected: "bg-[#2D61F0] text-white",
                today: "text-[#2D61F0] font-semibold",
              }}
              className="p-3"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
