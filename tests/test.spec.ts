import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { Hunter } from "../src/modelos/cazador.modelo.js"; 
import { Good } from "../src/modelos/bien.modelo.js";
import { Merchant } from "../src/modelos/mercader.modelo.js";
import { Transaction } from "../src/modelos/transaccion.modelo.js";

import { describe, test, expect, beforeAll, afterAll, beforeEach} from "vitest";

//Pruebas de integración para la API de la Posada del Lobo Blanco
describe("GET /", () => {
  test("Debería devolver un mensaje de bienvenida", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Bienvenido a la Posada del Lobo Blanco");
  });
});


// Pruebas de integración para la API de bienes
const good = {
  name: "Espada de acero",
  description: "Espada de acero forjada por un maestro herrero.",
  price: 100,
  stock: 10,
};

describe("POST /goods", () => {
  test("Should successfully create a new good", async () => {
    await request(app)
      .post("/goods")
      .send({
        name: "Espada de acero",
        description: "Espada de acero forjada por un maestro herrero.",
        price: 100,
        stock: 10,
      })
      .expect(201);
  });

  test("Should get an error", async () => {
    await request(app).post("/goods").send(good).expect(500);
  });
});

describe("GET /goods", () => {
  test("Should get a good by name", async () => {
    await request(app).get("/goods?name=Espada de acero").expect(200);
  });

  test("Should not find a good by name", async () => {
    await request(app).get("/goods?name=Espada de plata").expect(404);
  });
});

