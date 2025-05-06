import request from 'supertest';

import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import {app} from '../src/app.js';
import { Transaction } from '../src/modelos/transaccion.modelo.js';

beforeEach(async () => {
    await Transaction.deleteMany({});
});

describe('Rutas de transacciones', () => {
    test('debería crear una nueva transacción', async () => {
        const res = await request(app).post('/transactions/').send({
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date(),
            hour: new Date().toLocaleTimeString()
        });
        expect(res.status).toBe(201);
        expect(res.body.buyerType).toBe('hunter');
        expect(res.body.buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
        expect(res.body.goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
        expect(res.body.goods[0].quantity).toBe(2);
        expect(res.body.totalAmount).toBe(200);
        expect(res.body.date).toBeDefined();
    });
 
    test('debería obtener todas las transacciones', async () => {
        await Transaction.create({ 
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date(),
            hour: new Date().toLocaleTimeString()
        });
        const res = await request(app).get('/transactions/');
        expect(res.status).toBe(200);
        expect(res.body[0].buyerType).toBe('hunter');
        expect(res.body[0].buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
        expect(res.body[0].goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(200);
        expect(res.body[0].date).toBeDefined();
        expect(res.body.length).toBe(1);
    });

    test('debería obtener una transacción por ID', async () => {
        const transaction = await Transaction.create({ 
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date(),
            hour: new Date().toLocaleTimeString()
        });
        const res = await request(app).get(`/transactions/${transaction._id}`);
        expect(res.status).toBe(200);
        expect(res.body.buyerType).toBe('hunter');
        expect(res.body.buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
        expect(res.body.goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
        expect(res.body.goods[0].quantity).toBe(2);
        expect(res.body.totalAmount).toBe(200);
        expect(res.body.date).toBeDefined();
    });

    test('debería devolver 404 si la transacción no existe', async () => {
        const res = await request(app).get('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    test('debería obtener transacciones por comprador', async () => {
        await Transaction.create({ 
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date(),
            hour: new Date().toLocaleTimeString()
        });
        const res = await request(app).get('/transactions/search/by-buyer?buyer=60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(200);
        expect(res.body[0].buyerType).toBe('hunter');
        expect(res.body[0].buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
        expect(res.body[0].goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(200);
        expect(res.body[0].date).toBeDefined();
        expect(res.body.length).toBe(1);
    });

    test('debería devolver 404 si no existe la transacción', async () => {
        const res = await request(app).get('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    test('debería obtener transacciones por fechas', async () => {
        const transaction = await Transaction.create({ 
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date('2023-11-15'),
            hour: new Date().toLocaleTimeString()
        });
        const res = await request(app).get('/transactions/search/by-date?date=2023-11-15');
        expect(res.status).toBe(200);
        expect(res.body[0].buyerType).toBe('hunter');
        expect(res.body[0].buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
        expect(res.body[0].goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(200);
        expect(res.body[0].date).toBeDefined();
        expect(res.body.length).toBe(1);
    });

    test('debería devolver 404 si no existen transacciones en el rango de fechas', async () => {
        const res = await request(app).get('/transactions/search/by-date?date=2023-11-16');
        expect(res.status).toBe(404);
    });

    test('debería actualizar una transacción por ID', async () => {
        const transaction = await Transaction.create({ 
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date(),
            hour: new Date().toLocaleTimeString()
        });
        const res = await request(app).put(`/transactions/${transaction._id}`).send({ totalAmount: 250 });
        expect(res.status).toBe(200);
        expect(res.body.buyerType).toBe('hunter');
        expect(res.body.buyer).toBe('60d5f484f1c2b8b8a4e4f4f4');
        expect(res.body.goods[0].good).toBe('60d5f484f1c2b8b8a4e4f4f6');
        expect(res.body.goods[0].quantity).toBe(2);
        expect(res.body.totalAmount).toBe(250);
        expect(res.body.date).toBeDefined();
    });

    test('debería devolver 404 al intentar actualizar una transacción que no existe', async () => {
        const res = await request(app).put('/transactions/60d5f484f1c2b8b8a4e4f4f4').send({ totalPrice: 250 });
        expect(res.status).toBe(404);
    });

    test('debería eliminar una transacción por ID', async () => {
        const transaction = await Transaction.create({ 
            buyerType: 'hunter',
            buyer: '60d5f484f1c2b8b8a4e4f4f4',
            goods: [{ good: '60d5f484f1c2b8b8a4e4f4f6', quantity: 2 }],
            totalAmount: 200,
            date: new Date(),
            hour: new Date().toLocaleTimeString()
        });
        const res = await request(app).delete(`/transactions/${transaction._id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Transacción eliminada exitosamente');
        const deletedTransaction = await Transaction.findById(transaction._id);
        expect(deletedTransaction).toBeNull();
    });

    test('debería devolver 404 al intentar eliminar una transacción que no existe', async () => {
        const res = await request(app).delete('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

});
