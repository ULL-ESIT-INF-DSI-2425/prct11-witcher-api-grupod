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

  test('debería devolver 404 si no hay bienes', async () => {
    await Good.deleteMany();
    await request(app).get('/goods')
    .expect(200)
    .expect((res) => {
      expect(res.body.length).toBe(0);
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

  test('debería obtener un bien por nombre', async () => {
    await Good.create({ name: 'Monitor', description: '4K', price: 500, stock: 8 });
    await request(app).get('/goods/search/by-name?name=Monitor')
    .expect((res) => {  
      expect(res.body[0].name).toBe('Monitor');
      expect(res.body[0].description).toBe('4K');
      expect(res.body[0].price).toBe(500);
      expect(res.body[0].stock).toBe(8);
    });
  });

  test('debería devolver 404 si el bien no existe por nombre', async () => {
    await request(app).get('/goods/search/by-name?name=NoExistente')
    .expect(404)
    .expect((res) => {
      expect(res.body.message).toBe('Bien no encontrado');
    });
  });

  test('debería obtener un bien por descripción', async () => {
    await Good.create({ name: 'Cámara', description: 'Reflex', price: 800, stock: 4 });
    await request(app).get('/goods/search/by-description?description=Reflex')
    .expect((res) => {
      expect(res.body[0].name).toBe('Cámara');
      expect(res.body[0].description).toBe('Reflex');
      expect(res.body[0].price).toBe(800);
      expect(res.body[0].stock).toBe(4);
    });
  });

  test('debería devolver 404 si el bien no existe por descripción', async () => {
    await request(app).get('/goods/search/by-description?description=NoExistente')
    .expect(404)
    .expect((res) => {
      expect(res.body.message).toBe('Bien no encontrado');
    });
  });

  test('debería obtener un bien por precio', async () => {
    await Good.create({ name: 'Smartphone', description: '5G', price: 900, stock: 6 });
    await request(app).get('/goods/search/by-price?price=900')
    .expect((res) => {
      expect(res.body[0].name).toBe('Smartphone');
      expect(res.body[0].description).toBe('5G');
      expect(res.body[0].price).toBe(900);
      expect(res.body[0].stock).toBe(6);
    });
  });

  test('debería devolver 404 si el bien no existe por precio', async () => {
    await request(app).get('/goods/search/by-price?price=-8')
    .expect(404)
    .expect((res) => {
      expect(res.body.message).toBe('Bien no encontrado');
    });
  });

  test('debería obtener un bien por stock', async () => {
    await Good.create({ name: 'Altavoces', description: 'Bluetooth', price: 150, stock: 12 });
    await request(app).get('/goods/search/by-stock?stock=12')
    .expect((res) => {
      expect(res.body[0].name).toBe('Altavoces');
      expect(res.body[0].description).toBe('Bluetooth');
      expect(res.body[0].price).toBe(150);
      expect(res.body[0].stock).toBe(12);
    });
  });
  
  test('debería devolver 404 si el bien no existe por stock', async () => {
    await request(app).get('/goods/search/by-stock?stock=-8')
    .expect(404)
    .expect((res) => {
      expect(res.body.message).toBe('Bien no encontrado');
    });
  });

  test('debería obtener un bien por una query entera', async () => {
    await Good.create({ name: 'Proyector', description: 'HD', price: 600, stock: 3 });
    await request(app).get('/goods/search/by-all?name=Proyector&description=HD&price=600&stock=3')
    .expect((res) => {
      expect(res.body[0].name).toBe('Proyector');
      expect(res.body[0].description).toBe('HD');
      expect(res.body[0].price).toBe(600);
      expect(res.body[0].stock).toBe(3);
    });
  });

  test('debería devolver 404 si el bien no existe por query', async () => {
    await request(app).get('/goods/search/by-all?name=NoExistente&description=NoExistente&price=-8&stock=-8')
    .expect(404)
    .expect((res) => {
      expect(res.body.message).toBe('Bien no encontrado');
    });
  });

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

  test('debería devolver 404 al intentar actualizar un bien que no existe', async () => {
    const res = await request(app).put('/goods/60d5f484f1c2b8b8a4e4f4f4').send(
      { 
        price: 350 
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería actualizar un bien por nombre', async () => {
    await Good.create({ name: 'Impresora', description: 'Multifuncional', price: 200, stock: 5 });
    const res = await request(app).put('/goods/search/by-name?name=Impresora').send(
      {
        price: 250
      });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].price).toBe(250);
  });

  test('debería devolver 404 al intentar actualizar un bien que no existe por nombre', async () => {
    const res = await request(app).put('/goods/search/by-name?name=NoExistente').send(
      {
        price: 45
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería actualizar un bien por descripción', async () => {
    await Good.create({ name: 'Cargador', description: 'Rápido', price: 30, stock: 20 });
    const res = await request(app).put('/goods/search/by-description?description=Rápido').send(
      {
        price: 35
      });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].price).toBe(35);
  });

  test('debería devolver 404 al intentar actualizar un bien que no existe por descripción', async () => {
    const res = await request(app).put('/goods/search/by-description?description=NoExistente').send(
      {
        price: 45
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería aactualizar un bien por precio', async () => {
    await Good.create({ name: 'Batería', description: 'Recargable', price: 40, stock: 10 });
    const res = await request(app).put('/goods/search/by-price?price=40').send(
      {
        price: 45
      });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].price).toBe(45);
  });

  test('debería devolver 404 al intentar actualizar un bien que no existe por precio', async () => {
    const res = await request(app).put('/goods/search/by-price?price=-8').send(
      {
        price: 45
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería actualizar un bien por stock', async () => {
    await Good.create({ name: 'Cámara', description: 'Reflex', price: 800, stock: 4 });
    const res = await request(app).put('/goods/search/by-stock?stock=4').send(
      {
        stock: 5
      });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].stock).toBe(5);
  });

  test('debería devolver 404 al intentar actualizar un bien que no existe por stock', async () => {
    const res = await request(app).put('/goods/search/by-stock?stock=-8').send(
      {
        stock: 5
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería actualizar un bien por una query entera', async () => {
    await Good.create({ name: 'Proyector', description: 'HD', price: 600, stock: 3 });
    const res = await request(app).put('/goods/search/by-all?name=Proyector&description=HD&price=600&stock=3').send(
      {
        price: 650
      });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].price).toBe(650);
  });

  test('debería devolver 404 al intentar actualizar un bien que no existe por query', async () => {
    const res = await request(app).put('/goods/search/by-all?name=NoExistente&description=NoExistente&price=-8&stock=-8').send(
      {
        price: 45
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

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

  test('debería eliminar un bien por nombre', async () => {
    await Good.create({ name: 'Altavoces', description: 'Bluetooth', price: 150, stock: 12 });
    const res = await request(app).delete('/goods/search/by-name?name=Altavoces');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Bien(es) eliminado(s)');
  });

  test('debería devolver 404 al intentar eliminar un bien que no existe por nombre', async () => {
    const res = await request(app).delete('/goods/search/by-name?name=NoExistente');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería eliminar un bien por descripción', async () => {
    await Good.create({ name: 'Cámara', description: 'Reflex', price: 800, stock: 4 });
    const res = await request(app).delete('/goods/search/by-description?description=Reflex');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Bien(es) eliminado(s)');
  });

  test('debería devolver 404 al intentar eliminar un bien que no existe por descripción', async () => {
    const res = await request(app).delete('/goods/search/by-description?description=NoExistente');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería eliminar un bien por precio', async () => {
    await Good.create({ name: 'Batería', description: 'Recargable', price: 40, stock: 10 });
    const res = await request(app).delete('/goods/search/by-price?price=40');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Bien(es) eliminado(s)');
  });

  test('debería devolver 404 al intentar eliminar un bien que no existe por precio', async () => {
    const res = await request(app).delete('/goods/search/by-price?price=-8');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería eliminar un bien por stock', async () => {
    await Good.create({ name: 'Cámara', description: 'Reflex', price: 800, stock: 4 });
    const res = await request(app).delete('/goods/search/by-stock?stock=4');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Bien(es) eliminado(s)');
  });

  test('debería devolver 404 al intentar eliminar un bien que no existe por stock', async () => {
    const res = await request(app).delete('/goods/search/by-stock?stock=-8');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });

  test('debería eliminar un bien por una query entera', async () => {
    await Good.create({ name: 'Proyector', description: 'HD', price: 600, stock: 3 });
    const res = await request(app).delete('/goods/search/by-all?name=Proyector&description=HD&price=600&stock=3');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Bien(es) eliminado(s)');
  });

  test('debería devolver 404 al intentar eliminar un bien que no existe por query', async () => {
    const res = await request(app).delete('/goods/search/by-all?name=NoExistente&description=NoExistente&price=-8&stock=-8');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Bien no encontrado');
  });
  
});
