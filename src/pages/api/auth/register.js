export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }
  
    try {
      const backendUrl = process.env.BACKEND_URL;
      const { name, email, confirm_email, password, confirm_password } = req.body;

      const response = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            confirm_email,
            password,
            confirm_password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({ error: data?.detail || "Erro ao registrar" });
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }