import request from 'supertest';
import mongoose from 'mongoose';
import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import app from '../src/app.js';
import { Good } from '../src/modelos/bien.modelo';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test-db');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Good.deleteMany({});
});

describe('Rutas de bienes', () => {
  test('debería crear un nuevo bien', async () => {
    const res = await request(app).post('/goods').send(
      {
        name: 'Laptop',
        description: 'Portátil de última generación',
        price: 1200,
        stock: 5,
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Laptop');
  });

  test('debería devolver 400 si faltan datos obligatorios', async () => {
    const res = await request(app).post('/goods').send(
      {
        name: 'Mouse',
        // description: 'Inalámbrico',
        price: 50,
        stock: 20,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Nombre, descripción, precio y stock son obligatorios');
  });

  test('debería obtener todos los bienes', async () => {
    await Good.create({ name: 'Teclado', description: 'Mecánico', price: 80, stock: 10 });
    const res = await request(app).get('/goods');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('Teclado');
    expect(res.body.length).toBe(1);
  });
 
  test('debería obtener un bien por ID', async () => {
    const good = await Good.create({ name: 'Ratón', description: 'Óptico', price: 25, stock: 15 });
    //obtener el bien por ID
    const id = good._id;
    console.log(id);
    const res = await request(app).get(`/goods/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Ratón');
  });

  test('debería devolver 404 si el bien no existe', async () => {
    const res = await request(app).get('/goods/60d5f484f1c2b8b8a4e4f4f4');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  // test('debería obtener un bien por query', async () => {
  //   await Good.create({ name: 'Pantalla', description: 'LED', price: 200, stock: 8 });

    

  //   expect(res.status).toBe(200);
  //   expect(res.body[0].description).toBe('LED');
  // });

  test('debería actualizar un bien por ID', async () => {
    const good = await Good.create({ name: 'Tablet', description: 'Android', price: 300, stock: 7 });
    //obtener el bien por ID
    const id = good._id;
    console.log(id);
    //actualizar el bien por ID
    const res = await request(app).put(`/goods/${id}`).send(
      { 
        price: 350 
      });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(350);
  });



//   test('debería actualizar un bien por query', async () => {
//     await Good.create({ name: 'Impresora', description: 'Láser', price: 100, stock: 3 });
//     const res = await request(app).put('/goods/search?name=Impresora').send({ stock: 10 });
//     expect(res.status).toBe(200);
//     expect(res.body[0].stock).toBe(10);
//   });

  test('debería eliminar un bien por ID', async () => {
    const good = await Good.create({ name: 'Escáner', description: 'Alta resolución', price: 150, stock: 2 });
    const res = await request(app).delete(`/goods/${good._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Bien eliminado');
  });

  test('debería devolver 404 al intentar eliminar un bien que no existe', async () => {
    const res = await request(app).delete('/goods/60d5f484f1c2b8b8a4e4f4f4');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

//   test('debería eliminar bienes por query', async () => {
//     await Good.create({ name: 'Auriculares', description: 'Bluetooth', price: 60, stock: 9 });
//     const res = await request(app).delete('/goods/search?name=Auriculares');
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe('Bienes eliminados');
//   });
 
});
