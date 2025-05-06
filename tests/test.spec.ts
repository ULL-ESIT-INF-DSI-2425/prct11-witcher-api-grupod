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

