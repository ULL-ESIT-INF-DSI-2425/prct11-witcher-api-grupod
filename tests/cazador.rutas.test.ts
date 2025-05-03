import request from 'supertest';
import mongoose from 'mongoose';
import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import app from '../src/app.js';
import { Hunter } from '../src/modelos/cazador.modelo.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test-db');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Hunter.deleteMany({});
});

describe('Rutas de cazadores', () => {
    // test('debería crear un nuevo cazador', async () => {
    //     const res = await request(app).post('/hunters').send({
    //     name: 'Geralt',
    //     level: 5,
    //     specialization: 'Witcher',
    //     });
    //     expect(res.status).toBe(201);
    //     expect(res.body.name).toBe('Geralt');
    // });

    // test('debería obtener todos los cazadores', async () => {
    //     await Hunter.create({ name: 'Yennefer', level: 4, specialization: 'Sorceress' });
    //     const res = await request(app).get('/hunters');
    //     expect(res.status).toBe(200);
    //     expect(res.body[0].name).toBe('Yennefer');
    //     expect(res.body.length).toBe(1);
    // });

    // test('debería obtener un cazador por ID', async () => {
    //     const hunter = await Hunter.create({ name: 'Ciri', level: 3, specialization: 'Witcher' });
    //     const res = await request(app).get(`/hunters/${hunter._id}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body.name).toBe('Ciri');
    //     expect(res.body.level).toBe(3);
    //     expect(res.body.specialization).toBe('Witcher');
    // });

    test('debería devolver 404 si el cazador no existe', async () => {
        const res = await request(app).get('/hunters/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    // test('debería obtener un cazador por nombre', async () => {
    //     await Hunter.create({ name: 'Triss', level: 4, specialization: 'Sorceress' });
    //     const res = await request(app).get('/hunters/search/by-name?name=Triss');
    //     expect(res.status).toBe(200);
    //     expect(res.body[0].name).toBe('Triss');
    //     expect(res.body[0].level).toBe(4);
    //     expect(res.body[0].specialization).toBe('Sorceress');
    // });

    test('debería devolver 404 si el cazador no existe por nombre', async () => {
        const res = await request(app).get('/hunters/search/by-name?name=NoExist');
        expect(res.status).toBe(404);
    });

    // test('debería actualizar un cazador por ID', async () => {
    //     const hunter = await Hunter.create({ name: 'Dandelion', level: 2, specialization: 'Bard' });
    //     const res = await request(app).put(`/hunters/${hunter._id}`).send({
    //         name: 'Dandelion',
    //         level: 3,
    //         specialization: 'Bard',
    //     });
    //     expect(res.status).toBe(200);
    //     expect(res.body.name).toBe('Dandelion');
    //     expect(res.body.level).toBe(3);
    // });

    test('debería devolver 404 al intentar actualizar un cazador que no existe', async () => {
        const res = await request(app).put('/hunters/60d5f484f1c2b8b8a4e4f4f4').send({
            name: 'Dandelion',
            level: 3,
            specialization: 'Bard',
        });
        expect(res.status).toBe(404);
    });

    // test('debería actualizar un cazador por nombre', async () => {
    //     await Hunter.create({ name: 'Zoltan', level: 3, specialization: 'Dwarf' });
    //     const res = await request(app).put('/hunters/search/by-name?name=Zoltan').send({
    //         name: 'Zoltan',
    //         level: 4,
    //         specialization: 'Dwarf',
    //     });
    //     expect(res.status).toBe(200);
    //     expect(res.body.name).toBe('Zoltan');
    //     expect(res.body.level).toBe(4);
    //     expect(res.body.specialization).toBe('Dwarf');
    // });

    test('debería devolver 404 al intentar actualizar un cazador que no existe por nombre', async () => {
        const res = await request(app).put('/hunters/search/by-name?name=NoExist').send({
            name: 'Zoltan',
            level: 4,
            specialization: 'Dwarf',
        });
        expect(res.status).toBe(404);
    });

    // test('debería borrar un cazador por ID', async () => {
    //     const hunter = await Hunter.create({ name: 'Vesemir', level: 5, specialization: 'Witcher' });
    //     const res = await request(app).delete(`/hunters/${hunter._id}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body.message).toBe('Cazador eliminado');
    // });

    test('debería devolver 404 al intentar borrar un cazador que no existe', async () => {
        const res = await request(app).delete('/hunters/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    // test('debería borrar un cazador por nombre', async () => {
    //     await Hunter.create({ name: 'Eskel', level: 4, specialization: 'Witcher' });
    //     const res = await request(app).delete('/hunters/search/by-name?name=Eskel');
    //     expect(res.status).toBe(200);
    //     expect(res.body.message).toBe('Cazador eliminado');
    // });

    test('debería devolver 404 al intentar borrar un cazador que no existe por nombre', async () => {
        const res = await request(app).delete('/hunters/search/by-name?name=NoExist');
        expect(res.status).toBe(404);
    });
});

