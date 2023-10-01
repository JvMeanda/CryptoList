import express from "express";
import axios from "axios";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  
  // fetchExploreCoin
  
  app.get("/explore-coin", async (req, res) => {
    const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=14&page=1&sparkline=false&locale=pt";
    
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      if (error.response) {
        console.error("Status da resposta:", error.response.status);
        console.error("Dados da resposta:", error.response.data);
      }
      res.status(500).json({ error: "Erro ao buscar dados" });
    }
  });
  
  // fetchCrypto
  
  app.get("/Crypto/:currency", async (req, res) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=pt`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    if (error.response) {
      console.error("Status da resposta:", error.response.status);
      console.error("Dados da resposta:", error.response.data);
    }
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

// Iniciar o servidor

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor intermediário rodando na porta ${port}`);
});