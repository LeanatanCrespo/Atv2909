const request = require("supertest");
const app = require("../server");

describe("API de Clientes", () => {
  it("Deve cadastrar um cliente", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({ nome: "João", email: "joao@example.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nome).toBe("João");
  });

  it("Deve listar clientes", async () => {
    const res = await request(app).get("/clientes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
