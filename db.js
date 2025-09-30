const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:"); // banco em memória (pode mudar para arquivo)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);
});

module.exports = db;
