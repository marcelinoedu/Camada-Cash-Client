export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const token = req.cookies?.token;
    const backendUrl = process.env.BACKEND_URL;

    const { amount, description, date, type, status, received, categories } = req.body;

    const transactionPayload = {
      amount,
      description,
      date,
      type,
      status,
      received,
    };

    const createTransactionRes = await fetch(`${backendUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionPayload),
    });

    const transactionData = await createTransactionRes.json();

    if (!createTransactionRes.ok) {
      return res.status(500).json({ error: "Erro ao criar transação" });
    }

    if (categories && transactionData.id) {
      for (const cat of Array.isArray(categories) ? categories : [categories]) {
        await fetch(`${backendUrl}/transactions/${transactionData.id}/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ category_id: cat.value }), 
        });
      }
    }

    return res.status(201).json({ message: "Transação criada com sucesso", transaction: transactionData });
  } catch (err) {
    console.error("Erro ao criar transação:", err);
    return res.status(500).json({ error: "Erro interno ao criar transação" });
  }
}
