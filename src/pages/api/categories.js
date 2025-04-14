export default async function handler(req, res) {
  try {
    const token = req.cookies?.token;
    const backendUrl = process.env.BACKEND_URL;
    const { category_type } = req.query;

    const url = category_type ? `${backendUrl}/categories?category_type=${category_type}` : `${backendUrl}/categories/all`;
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();


    res.status(200).json(data.categories || []);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}
