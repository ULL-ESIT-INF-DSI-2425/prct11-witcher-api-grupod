import request from 'supertest';
import mongoose from 'mongoose';
import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import app from '../src/app.js';
import { Merchant } from '../src/modelos/mercader.modelo.js';

describe('Rutas de mercaderes', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-db');
    });
    
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });
    
    beforeEach(async () => {
        await Merchant.deleteMany({});
    });
    
    test('debería crear un nuevo mercader', async () => {
        const res = await request(app).post('/merchants/').send({
            name: 'Merchant 1',
            level: 5,
            specialization: 'Trader',
        });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Merchant 1');
    });

    test('debería obtener todos los mercaderes', async () => {
        await Merchant.create({ name: 'Merchant 2', level: 4, specialization: 'Trader' });
        const res = await request(app).get('/merchants/');
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe('Merchant 2');
        expect(res.body.length).toBe(1);
    });

    // test('debería obtener un mercader por ID', async () => {
    //     const merchant = await Merchant.create({ name: 'Merchant 3', level: 3, specialization: 'Trader' });
    //     const res = await request(app).get(`/merchants/${merchant._id}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body.name).toBe('Merchant 3');
    //     expect(res.body.level).toBe(3);
    //     expect(res.body.specialization).toBe('Trader');
    // });

    test('debería devolver 404 si el mercader no existe', async () => {
        const res = await request(app).get('/merchants/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    // test('debería obtener un mercader por nombre', async () => {
    //     await Merchant.create({ name: 'Merchant 4', level: 4, specialization: 'Trader' });
    //     const res = await request(app).get('/merchants/search/by-name?name=Merchant 4');
    //     expect(res.status).toBe(200);
    //     expect(res.body[0].name).toBe('Merchant 4');
    //     expect(res.body[0].level).toBe(4);
    //     expect(res.body[0].specialization).toBe('Trader');
    // });

    test('debería devolver 404 si el mercader no existe por nombre', async () => {
        const res = await request(app).get('/merchants/search/by-name?name=Nonexistent Merchant');
        expect(res.status).toBe(404);
    });

    // test('debería actualizar un mercader', async () => {
    //     const merchant = await Merchant.create({ name: 'Merchant 5', level: 3, specialization: 'Trader' });
    //     const res = await request(app).put(`/merchants/${merchant._id}`).send({
    //         name: 'Updated Merchant',
    //         level: 4,
    //         specialization: 'Trader',
    //     });
    //     expect(res.status).toBe(200);
    //     expect(res.body.name).toBe('Updated Merchant');
    // });

    test('debería devolver 404 al intentar actualizar un mercader que no existe', async () => {
        const res = await request(app).put('/merchants/60d5f484f1c2b8b8a4e4f4f4').send({
            name: 'Updated Merchant',
            level: 4,
            specialization: 'Trader',
        });
        expect(res.status).toBe(404);
    });

    // test('debería eliminar un mercader', async () => {
    //     const merchant = await Merchant.create({ name: 'Merchant 6', level: 2, specialization: 'Trader' });
    //     const res = await request(app).delete(`/merchants/${merchant._id}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body.message).toBe('Mercader eliminado');
    // });

    test('debería devolver 404 al intentar eliminar un mercader que no existe', async () => {
        const res = await request(app).delete('/merchants/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    test('debería eliminar un mercader por nombre', async () => {
        await Merchant.create({ name: 'Merchant 7', level: 2, specialization: 'Trader' });
        const res = await request(app).delete('/merchants/search/by-name?name=Merchant 7');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Mercader eliminado');
    });

    test('debería devolver 404 al intentar eliminar un mercader que no existe por nombre', async () => {
        const res = await request(app).delete('/merchants/search/by-name?name=Nonexistent Merchant');
        expect(res.status).toBe(404);
    });

    test('debería devolver 404 al intentar eliminar un mercader que no existe por nombre', async () => {
        const res = await request(app).delete('/merchants/search/by-name?name=Nonexistent Merchant');
        expect(res.status).toBe(404);
    });
});

