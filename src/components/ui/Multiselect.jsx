import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { motion } from "framer-motion";

const animatedComponents = makeAnimated();

export default function Multiselect({
  options = [],
  value = [],
  onChange,
  placeholder = "Selecione...",
  isDisabled = false,
  closeMenuOnSelect = false,
  isClearable = false,
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDisabled ? "#f3f4f6" : "#fff", 
      borderColor: state.isFocused ? "#2D61F0" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(45, 97, 240, 0.3)" : "none",
      borderWidth: "1px",
      borderRadius: "0.5rem",
      padding: "2px 4px",
      transition: "all 0.2s ease",
      cursor: isDisabled ? "not-allowed" : "default",
      minHeight: "42px",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#e0e7ff",
      borderRadius: "0.375rem",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#1e3a8a",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#1e3a8a",
      cursor: "pointer",
      ':hover': {
        backgroundColor: "#c7d2fe",
        color: "#1e40af"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Select
        isMulti
        isDisabled={isDisabled}
        closeMenuOnSelect={closeMenuOnSelect}
        components={animatedComponents}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={customStyles}
        isClearable={isClearable}
        className="text-sm"
      />
    </motion.div>
  );
}