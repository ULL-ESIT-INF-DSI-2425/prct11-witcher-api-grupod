import request from 'supertest';

import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import {app} from '../src/app.js';
import { Transaction } from '../src/modelos/transaccion.modelo.js';

beforeEach(async () => {
    await Transaction.deleteMany({});
});

describe('Rutas de transacciones', () => {
    // test('debería crear una nueva transacción', async () => {
    //     const res = await request(app).post('/transactions/').send({
    //         buyerType: 'hunter',
    //         buyer: '60d5f484f1c2b8b8a4e4f4f4',
    //         goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
    //         totalAmount: 200,
    //         date: new Date()
    //     });
    //     expect(res.status).toBe(201);
    //     expect(res.body.buyerType).toBe('hunter');
    //     expect(res.body.buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
    //     expect(res.body.goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
    //     expect(res.body.goods[0].quantity).toBe(2);
    //     expect(res.body.totalAmount).toBe(200);
    //     expect(res.body.date).toBeDefined();
    // });
 
    // test('debería obtener todas las transacciones', async () => {
    //     await Transaction.create({ 
    //         hunterId: '60d5f484f1c2b8b8a4e4f4f4', 
    //         merchantId: '60d5f484f1c2b8b8a4e4f4f5', 
    //         goodId: '60d5f484f1c2b8b8a4e4f4f6', 
    //         quantity: 2, 
    //         totalPrice: 200 
    //     });
    //     const res = await request(app).get('/transactions/');
    //     expect(res.status).toBe(200);
    //     expect(res.body[0].hunterId).toBe('60d5f484f1c2b8b8a4e4f4f4');
    //     expect(res.body.length).toBe(1);
    // });

    // test('debería obtener una transacción por ID', async () => {
    //     const transaction = await Transaction.create({ 
    //         hunterId: '60d5f484f1c2b8b8a4e4f4f4',
    //         merchantId: '60d5f484f1c2b8b8a4e4f4f5',
    //         goodId: '60d5f484f1c2b8b8a4e4f4f6',
    //         quantity: 2,
    //         totalPrice: 200
    //     });
    //     const res = await request(app).get(`/transactions/${transaction._id}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body.hunterId).toBe('60d5f484f1c2b8b8a4e4f4f4');
    //     expect(res.body.merchantId).toBe('60d5f484f1c2b8b8a4e4f4f5');
    //     expect(res.body.goodId).toBe('60d5f484f1c2b8b8a4e4f4f6');
    //     expect(res.body.quantity).toBe(2);
    //     expect(res.body.totalPrice).toBe(200);
    // });

    test('debería devolver 404 si la transacción no existe', async () => {
        const res = await request(app).get('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    // test('debería obtener transacciones por comprador', async () => {
    //     await Transaction.create({ 
    //         hunterId: '60d5f484f1c2b8b8a4e4f4f4', 
    //         merchantId: '60d5f484f1c2b8b8a4e4f4f5', 
    //         goodId: '60d5f484f1c2b8b8a4e4f4f6', 
    //         quantity: 2, 
    //         totalPrice: 200 
    //     });
    //     const res = await request(app).get('/transactions/search/by-buyer?hunterId=60d5f484f1c2b8b8a4e4f4f4');
    //     expect(res.status).toBe(200);
    //     expect(res.body[0].hunterId).toBe('60d5f484f1c2b8b8a4e4f4f4');
    //     expect(res.body.length).toBe(1);
    // });

    test('debería devolver 404 si no existe la transacción', async () => {
        const res = await request(app).get('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    // test('debería obtener transacciones por fechas', async () => {
    //     const transaction = await Transaction.create({ 
    //         hunterId: '60d5f484f1c2b8b8a4e4f4f4',
    //         merchantId: '60d5f484f1c2b8b8a4e4f4f5',
    //         goodId: '60d5f484f1c2b8b8a4e4f4f6',
    //         quantity: 2,
    //         totalPrice: 200,
    //         date: new Date('2023-10-01')
    //     });
    //     const res = await request(app).get('/transactions/search/by-date?startDate=2023-10-01&endDate=2023-10-31');
    //     expect(res.status).toBe(200);
    //     expect(res.body[0].hunterId).toBe('60d5f484f1c2b8b8a4e4f4f4');
    //     expect(res.body.length).toBe(1);
    // });

    test('debería devolver 404 si no existen transacciones en el rango de fechas', async () => {
        const res = await request(app).get('/transactions/search/by-date?startDate=2023-11-01&endDate=2023-11-30');
        expect(res.status).toBe(404);
    });

    // test('debería actualizar una transacción por ID', async () => {
    //     const transaction = await Transaction.create({ 
    //         hunterId: '60d5f484f1c2b8b8a4e4f4f4',
    //         merchantId: '60d5f484f1c2b8b8a4e4f4f5',
    //         goodId: '60d5f484f1c2b8b8a4e4f4f6',
    //         quantity: 2,
    //         totalPrice: 200
    //     });
    //     const res = await request(app).put(`/transactions/${transaction._id}`).send({ totalPrice: 250 });
    //     expect(res.status).toBe(200);
    //     expect(res.body.totalPrice).toBe(250);
    // });

    test('debería devolver 404 al intentar actualizar una transacción que no existe', async () => {
        const res = await request(app).put('/transactions/60d5f484f1c2b8b8a4e4f4f4').send({ totalPrice: 250 });
        expect(res.status).toBe(404);
    });

    // test('debería eliminar una transacción por ID', async () => {
    //     const transaction = await Transaction.create({ 
    //         hunterId: '60d5f484f1c2b8b8a4e4f4f4',
    //         merchantId: '60d5f484f1c2b8b8a4e4f4f5',
    //         goodId: '60d5f484f1c2b8b8a4e4f4f6',
    //         quantity: 2,
    //         totalPrice: 200
    //     });
    //     const res = await request(app).delete(`/transactions/${transaction._id}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body.message).toBe('Transacción eliminada');
    // });

    test('debería devolver 404 al intentar eliminar una transacción que no existe', async () => {
        const res = await request(app).delete('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

});
