import PrivateLayout from "@/components/layouts/PrivateLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/ui/Button";
import TransactionCard from "@/components/ui/TransactionCard";
import TransactionCardSkeleton from "@/components/ui/TransactionCardSkeleton";
import SummaryCard from "@/components/ui/SummaryCard";
import SummaryCardSkeleton from "@/components/ui/SummaryCardSkeleton";
import FormDataEdit from "@/components/ui/FormDataEdit";
import FilterSidebar from "@/components/ui/FilterSidebar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, outcome: 0, total: 0 });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ type: null, categories: [] });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (filters.type) params.append("type", filters.type);
      if (filters.categories.length) {
        filters.categories.forEach((cat) =>
          params.append("categories", cat.value)
        );
      }

      const res = await axios.get(`/api/transaction?${params.toString()}`);
      const data = res.data.transactions || [];

      const income = data
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
      const outcome = data
        .filter((t) => t.type === "outcome")
        .reduce((acc, t) => acc + t.amount, 0);
      const total = income - outcome;

      setTransactions(data);
      setTotals({ income, outcome, total });

      const totalCount = res.data.total || 0;
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, filters]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
        <Button variant="secondary" onClick={() => setShowFilters(true)}>
          Filtrar
        </Button>
      </div>

      <div className="space-y-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Resumo</h2>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <SummaryCard
                label="Total de Entradas"
                value={totals.income.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                color="text-green-600"
                borderTop="border-t-4 border-green-500"
              />
              <SummaryCard
                label="Total de Saídas"
                value={`-${totals.outcome.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
                color="text-red-500"
                borderTop="border-t-4 border-red-600"
              />
              <SummaryCard
                label="Saldo Final"
                value={totals.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                color="text-gray-800"
                borderTop="border-t-4 border-[#2D61F0]"
              />
            </>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800">Itens</h2>

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {loading
          ? Array.from({ length: limit }).map((_, i) => (
              <TransactionCardSkeleton key={i} />
            ))
          : transactions.map((t) => (
              <TransactionCard
                key={t.id}
                transaction={t}
                onEdit={() => setSelectedTransaction(t)}
              />
            ))}
      </div>

      <div className="flex justify-center gap-4 mt-6 mb-20">
        <Button
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-600 mt-2">
          Página {page} de {totalPages}
        </span>
        <Button
          disabled={page === totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </Button>
      </div>

      {selectedTransaction && (
        <FormDataEdit
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onSubmit={() => {
            setSelectedTransaction(null);
            fetchTransactions();
          }}
        />
      )}
      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(appliedFilters) => {
          setFilters(appliedFilters);
          setPage(1);
        }}
      />
    </div>
  );
}

Transactions.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
