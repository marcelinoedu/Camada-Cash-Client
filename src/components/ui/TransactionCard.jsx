import React from "react";
import { Pencil } from "lucide-react";

export default function TransactionCard({ transaction, onEdit }) {
  const { description, type, amount, date } = transaction;

  const isIncome = type === "income";
  const borderTopColor = isIncome ? "border-t-4 border-green-500" : "border-t-4 border-red-500";
  const textColor = isIncome ? "text-green-700" : "text-red-700";

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className={`w-[300px] h-[120px] p-4 rounded-2xl shadow-md shadow-gray-200 bg-white flex flex-col justify-between ${borderTopColor}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {description || "Sem descrição"}
        </h3>
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-gray-800 transition cursor-pointer"
          aria-label="Editar transação"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className={`text-sm font-bold ${textColor}`}>
          {isIncome ? "+" : "-"}
          {Number(amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className="text-xs text-gray-500">{formatDate(date)}</span>
      </div>
    </div>
  );
}
