// File: test.spec.ts
import request from "supertest";
import {app} from "../../src/app.js";

// Importar los modelos necesarios
import { describe, test, expect} from "vitest";
import { afterAll } from "vitest";
import { beforeEach } from "vitest";
import { Good } from "../../src/modelos/bien.modelo.js";
import { Hunter } from "../../src/modelos/cazador.modelo.js";
import { Merchant } from "../../src/modelos/mercader.modelo.js";
import { Transaction } from "../../src/modelos/transaccion.modelo.js";

// Beforeeach para limpiar la base de datos antes de cada prueba
beforeEach(async () => {
  await Transaction.deleteMany();
  await Merchant.deleteMany();
  await Hunter.deleteMany();
  await Good.deleteMany();
});

afterAll(async () => {
  await Transaction.deleteMany();
  await Merchant.deleteMany();
  await Hunter.deleteMany();
  await Good.deleteMany();
});

//Pruebas de integración para la API de la Posada del Lobo Blanco
describe("GET /", () => {
  test("Debería devolver un mensaje de bienvenida", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Bienvenido a la Posada del Lobo Blanco");
  });
});

