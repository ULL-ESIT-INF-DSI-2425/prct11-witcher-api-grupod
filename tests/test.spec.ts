import request from "supertest";
import {app} from "../src/app.js";

import { describe, test, expect} from "vitest";


//Pruebas de integración para la API de la Posada del Lobo Blanco
describe("GET /", () => {
  test("Debería devolver un mensaje de bienvenida", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Bienvenido a la Posada del Lobo Blanco");
  });
});

