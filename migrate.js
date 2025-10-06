const pool = require("./db");

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
  `);

  console.log("Migração executada com sucesso");
  process.exit();
}

migrate().catch(err => {
  console.error("Erro ao executar migração:", err);
  process.exit(1);
});
