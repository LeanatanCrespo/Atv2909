const express = require("express");
const router = express.Router();
const pool = require("./db");

// Cadastro de cliente :D
router.post("/clientes", async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *",
      [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Erro ao cadastrar cliente: " + err.message });
  }
});

// Listagem de clientes
router.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

module.exports = router;
