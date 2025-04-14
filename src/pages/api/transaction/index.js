// pages/api/transaction/index.js
export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Método não permitido" });
    }
  
    try {
      const token = req.cookies?.token;
      const backendUrl = process.env.BACKEND_URL;
  
      const { page = 1, limit = 10 } = req.query;
  
      const response = await fetch(`${backendUrl}/transactions?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({ error: data?.detail || "Erro ao buscar transações" });
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return res.status(500).json({ error: "Erro interno ao buscar transações" });
    }
  }
  