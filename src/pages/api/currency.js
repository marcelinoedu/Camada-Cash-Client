export default async function handler(req, res) {
  try {
    const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbxiObzBhbwBaUjv-Y4j5RUIoeXobN8TnNEnR-vlXlY4PEobtfA1sifP5NJPkX7PmWvNBQ/exec";

    const response = await fetch(GOOGLE_API_URL);

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao buscar dados da planilha" });
    }
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Erro ao buscar moedas diretamente:", error);
    res.status(500).json({ error: "Erro ao buscar moedas diretamente" });
  }
}
