const express = require("express");
const router = express.Router();
const db = require("./db");

// Cadastro de cliente
router.post("/clientes", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  const stmt = db.prepare("INSERT INTO clientes (nome, email) VALUES (?, ?)");
  stmt.run([nome, email], function (err) {
    if (err) {
      return res.status(400).json({ error: "Email já cadastrado ou inválido" });
    }
    res.status(201).json({ id: this.lastID, nome, email });
  });
  stmt.finalize();
});

// Listagem de clientes
router.get("/clientes", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar clientes" });
    }
    res.json(rows);
  });
});

module.exports = router;
