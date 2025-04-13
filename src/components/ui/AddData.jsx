import React, { useState } from "react";
import { Plus, X, TrendingDown, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import FormData from "@/components/ui/FormData";

export default function AddData({ minimized = false, onClick, mobile = false }) {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(null);

  const handleToggle = () => setOpen((prev) => !prev);


  const handleSelect = (type) => {
    setOpen(false);
    setFormType(type);
    onClick?.(type);
  };

  const OptionMenuDesktop = () => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-full ml-5 top-1/2 -translate-y-1/2 w-44 bg-white rounded-xl shadow-lg p-2 space-y-2 z-[100]"
    >
      <Button
        variant="whiteSuccess"
        icon={TrendingUp}
        className="w-full justify-start"
        onClick={() => handleSelect("renda")}
      >
        Renda
      </Button>
      <Button
        variant="whiteDanger"
        icon={TrendingDown}
        className="w-full justify-start"
        onClick={() => handleSelect("despesa")}
      >
        Despesa
      </Button>
    </motion.div>
  );

  const OptionMenuMobile = () => (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-[90]"
            onClick={() => setOpen(false)}
          />

          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 flex gap-6 z-[100]"
          >
            {[{
              label: "Renda",
              icon: TrendingUp,
              color: "bg-emerald-100 text-emerald-600",
              type: "renda",
            }, {
              label: "Despesa",
              icon: TrendingDown,
              color: "bg-rose-100 text-rose-600",
              type: "despesa",
            }].map((item) => (
              <div key={item.type} className="flex flex-col items-center gap-1">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item.type);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <item.icon className="w-6 h-6" />
                </motion.button>
                <span className="text-xs text-white">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        className={` relative flex items-center justify-center ${
          mobile ? "z-[100]" : ""
        }`}
      >
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          initial={false}
          animate={{
            width: open && mobile ? 140 : "auto",
            borderRadius: 9999,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`cursor-pointer ${
            mobile
              ? "fixed bottom-[3rem] left-1/2 -translate-x-1/2 z-[110]"
              : "relative"
          } 
  flex items-center justify-center gap-2 bg-[#2D61F0] text-white font-medium shadow-md px-4 py-3`}
        >
          {open ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {!minimized && (
            <motion.span
              key={open ? "cancelar" : "adicionar"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
            >
              {open ? "Cancelar" : "Adicionar"}
            </motion.span>
          )}
        </motion.button>

        {mobile ? (
          OptionMenuMobile()
        ) : (
          <AnimatePresence>{open && <OptionMenuDesktop />}</AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {formType && (
          <FormData
            type={formType}
            onClose={() => setFormType(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
