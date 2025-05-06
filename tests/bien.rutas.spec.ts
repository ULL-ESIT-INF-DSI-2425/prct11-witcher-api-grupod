import request from 'supertest';
import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import {app} from '../src/app.js';
import { Good } from '../src/modelos/bien.modelo.js';
 
const firstGood = {
  name: "Laptop",
  description: "Portátil de última generación",
  price: 1200,
  stock: 5,
};

beforeEach(async () => {
  await Good.deleteMany();
  await new Good(firstGood).save();
});

describe('Rutas de bienes', () => {
  test('debería crear un nuevo bien', async () => {
    await request(app)
    .post('/goods')
    .send({
        name: 'joyas',
        description: 'joyas de oro',
        price: 1000,
        stock: 10
      })
    .expect(201)
    .expect((res) => {
      expect(res.body.name).toBe('joyas');
      expect(res.body.description).toBe('joyas de oro');
      expect(res.body.price).toBe(1000);
      expect(res.body.stock).toBe(10);
    });
  });

  test('debería devolver 400 si faltan datos obligatorios', async () => {
    await request(app).post('/goods').send(
      {
        name: 'Mouse',
        // description: 'Inalámbrico',
        price: 50,
        stock: 20,
    }).expect(400)
    .expect((res) => {
      expect(res.body.message).toBe('Nombre, descripción, precio y stock son obligatorios');
    });
  });

  test('debería obtener todos los bienes', async () => {
    await Good.create({ name: 'Teclado', description: 'Mecánico', price: 80, stock: 10 });
    await request(app).get('/goods')
    .expect(200)
    .expect((res) => {
      expect(res.body[0].name).toBe('Laptop');
      expect(res.body[0].description).toBe('Portátil de última generación');
      expect(res.body[0].price).toBe(1200);
      expect(res.body[0].stock).toBe(5);
      expect(res.body.length).toBe(2);
    });
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
    await request(app).get('/goods/60d5f484f1c2b8b8a4e4f4f4')
    .expect(404)
    .expect((res) => {
      expect(res.body.message).toBe('Bien no encontrado');
    });
  });

  // test('debería obtener un bien por query', async () => {
  //   await Good.create({ name: 'Monitor', description: '4K', price: 500, stock: 8 });
  //   const res = await request(app).get('/goods/search?name=Monitor');
  //   expect(res.status).toBe(200);
  //   expect(res.body[0].name).toBe('Monitor');
  //   expect(res.body[0].description).toBe('4K');
  //   expect(res.body[0].price).toBe(500);
  //   expect(res.body[0].stock).toBe(8);
  // }

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

// //   test('debería actualizar un bien por query', async () => {
// //     await Good.create({ name: 'Impresora', description: 'Láser', price: 100, stock: 3 });
// //     const res = await request(app).put('/goods/search?name=Impresora').send({ stock: 10 });
// //     expect(res.status).toBe(200);
// //     expect(res.body[0].stock).toBe(10);
// //   });

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
