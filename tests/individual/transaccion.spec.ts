import request from 'supertest';

import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import { app } from '../../src/app.js';
import { Transaction } from '../../src/modelos/transaccion.modelo.js';
import { Merchant } from '../../src/modelos/mercader.modelo.js';
import { Hunter } from '../../src/modelos/cazador.modelo.js';
import { Good } from '../../src/modelos/bien.modelo.js';
import { a } from 'vitest/dist/chunks/suite.d.FvehnV49.js';

const FirstMerchant = {
    name: 'Merchant1',
    location: 'Novigrad',
    specialty: 'Weapons'
};

const FirstHunter = {
    name: 'Hunter1',
    level: 5,
    specialization: 'arco'
};

const FirstGood = {
    name: 'Sword',
    description: 'A sharp sword',
    price: 100,
    stock: 10
};

beforeAll(async () => {
    await Transaction.deleteMany();
    await Merchant.deleteMany();
    await Hunter.deleteMany();
    await Good.deleteMany();
});

beforeEach(async () => {
    await Transaction.deleteMany();
    await Merchant.deleteMany({ name: 'Merchant1' });
    await Hunter.deleteMany({ name: 'Hunter1' });
    await Good.deleteMany({ name: 'Sword' });
    await new Merchant(FirstMerchant).save();
    await new Hunter(FirstHunter).save();
    await new Good(FirstGood).save();
});

describe('Tests de transacciones', () => {
    test('debería crear una nueva transacción', async () => {
        const good = await new Good({
            name: 'Sword',
            description: 'A sharp sword',
            price: 100,
            stock: 10
        }).save();
        const hunter = await new Hunter({
            name: 'Hunter1',
            level: 5,
            specialization: 'arco'
        }).save();
        const res = await request(app)
            .post('/transactions/')
            .send({
                Type: 'hunter',
                name_transactor: 'Hunter1',
                goods: [{ good: 'Sword', quantity: 2 }],
                date: '05-05-2025',
                hour: '8:00'
            });
        expect(res.status).toBe(201);
        expect(res.body.Type).toBe('hunter');
        expect(res.body.name_transactor).toBe('Hunter1');
        expect(res.body.goods[0].good).toBe('Sword');
        expect(res.body.goods[0].quantity).toBe(2);
        expect(res.body.totalAmount).toBe(200);
        expect(res.body.date).toBe('05-05-2025');
        expect(res.body.hour).toBe('8:00');
    });

    test('debería devolver 400 si faltan campos obligatorios', async () => {
        const res = await request(app)
            .post('/transactions/')
            .send({
                Type: 'hunter',
                name_transactor: 'Hunter1',
                goods: [{ good: 'Sword', quantity: 2 }],
                totalAmount: 400,
                date: '05-05-2025'
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Todos los campos son obligatorios (excepto totalAmount)');
    });

    test('debería devolver 404 si el transactor no existe', async () => {
        const res = await request(app)
            .post('/transactions/')
            .send({
                Type: 'hunter',
                name_transactor: 'NonExistent',
                goods: [{ good: 'Sword', quantity: 2 }],
                totalAmount: 400,
                date: '05-05-2025',
                hour: '8:00'
            });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Transactor no encontrado: NonExistent');
    });

    test('debería devolver 404 si el bien no existe', async () => {
        const hunter = await new Hunter({
            name: 'Hunter1',
            level: 5,
            specialization: 'arco'
        }).save();
        const res = await request(app)
            .post('/transactions/')
            .send({
                Type: 'hunter',
                name_transactor: 'Hunter1',
                goods: [{ good: 'NonExistentGood', quantity: 2 }],
                totalAmount: 400,
                date: '05-05-2025',
                hour: '8:00'
            });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Bien no encontrado: NonExistentGood');
    });


    test('debería obtener todas las transacciones', async () => {
        await new Transaction({
            Type: 'hunter',
            name_transactor: 'Hunter1',
            goods: [{ good: 'Sword', quantity: 2 }],
            totalAmount: 400,
            date: '05-05-2025',
            hour: '8:00'
        }).save();

        const res = await request(app).get('/transactions/');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].Type).toBe('hunter');
        expect(res.body[0].name_transactor).toBe('Hunter1');
        expect(res.body[0].goods[0].good).toBe('Sword');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(400);
        expect(res.body[0].date).toBe('05-05-2025');
        expect(res.body[0].hour).toBe('8:00');
    });

    test('debería devolver 404 si no hay transacciones', async () => {
        const res = await request(app).get('/transactions/');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No se encontraron transacciones');
    });

    test('debería obtener una transacción por ID', async () => {
        const transaction = await Transaction.create({
            Type: 'hunter',
            name_transactor: 'Hunter1',
            goods: [{ good: 'ESPADA', quantity: 2 }],
            totalAmount: 400,
            date: '05-05-2025',
            hour: '8:00'
        });

        const res = await request(app).get(`/transactions/${transaction._id}`);
        expect(res.status).toBe(200);
        expect(res.body.Type).toBe('hunter');
        expect(res.body.name_transactor).toBe('Hunter1');
        expect(res.body.goods[0].good).toBe('ESPADA');
        expect(res.body.goods[0].quantity).toBe(2);
        expect(res.body.totalAmount).toBe(400);
        expect(res.body.date).toBe('05-05-2025');
        expect(res.body.hour).toBe('8:00');
    });

    test('debería devolver 404 si la transacción no existe', async () => {
        const res = await request(app).get('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    test('debería obtener transacciones por comprador', async () => {
        await new Transaction({
            Type: 'hunter',
            name_transactor: 'Hunter1',
            goods: [{ good: 'Sword', quantity: 2 }],
            totalAmount: 400,
            date: '05-05-2025',
            hour: '8:00'
        }).save();

        const res = await request(app).get('/transactions/search/by-buyer?name_transactor=Hunter1');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].Type).toBe('hunter');
        expect(res.body[0].name_transactor).toBe('Hunter1');
        expect(res.body[0].goods[0].good).toBe('Sword');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(400);
        expect(res.body[0].date).toBe('05-05-2025');
        expect(res.body[0].hour).toBe('8:00');
    });

    test('debería devolver 404 si no existen transacciones para el comprador', async () => {
        const res = await request(app).get('/transactions/search/by-buyer?name_transactor=NonExistent');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No se encontraron transacciones para este comprador');
    });

    test('debería obtener transacciones por vendedor', async () => {
        await new Transaction({
            Type: 'merchant',
            name_transactor: 'Merchant1',
            goods: [{ good: 'Coin', quantity: 2 }],
            totalAmount: 200,
            date: '05-05-2025',
            hour: '8:00'
        }).save();

        const res = await request(app).get('/transactions/search/by-merchant?name_transactor=Merchant1');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].Type).toBe('merchant');
        expect(res.body[0].name_transactor).toBe('Merchant1');
        expect(res.body[0].goods[0].good).toBe('Coin');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(200);
        expect(res.body[0].date).toBe('05-05-2025');
        expect(res.body[0].hour).toBe('8:00');
    });

    test('debería devolver 404 si no existen transacciones para el vendedor', async () => {
        const res = await request(app).get('/transactions/search/by-merchant?name_transactor=NonExistent');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No se encontraron transacciones para este mercader');
    });

    test('debería obtener transacciones por fechas', async () => {
        await new Transaction({
            Type: 'hunter',
            name_transactor: 'Hunter1',
            goods: [{ good: 'Sword', quantity: 2 }],
            totalAmount: 400,
            date: '05-05-2025',
            hour: '8:00'
        }).save();

        const res = await request(app).get('/transactions/search/by-date?date=05-05-2025');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].Type).toBe('hunter');
        expect(res.body[0].name_transactor).toBe('Hunter1');
        expect(res.body[0].goods[0].good).toBe('Sword');
        expect(res.body[0].goods[0].quantity).toBe(2);
        expect(res.body[0].totalAmount).toBe(400);
        expect(res.body[0].date).toBe('05-05-2025');
        expect(res.body[0].hour).toBe('8:00');
    });

    test('debería devolver 404 si no existen transacciones para la fecha', async () => {
        const res = await request(app).get('/transactions/search/by-date?date=2023-11-16');
        expect(res.status).toBe(404);
    });

    test('debería actualizar una transacción por ID', async () => {
        const transaction = await Transaction.create({
            Type: 'hunter',
            name_transactor: 'Hunter1',
            goods: [{ good: 'Sword', quantity: 2 }],
            totalAmount: 400,
            date: '05-05-2025',
            hour: '8:00'
        });

        const res = await request(app).put(`/transactions/${transaction._id}`).send({ totalAmount: 300 });
        expect(res.status).toBe(200);
        expect(res.body.totalAmount).toBe(300);

        const updatedTransaction = await Transaction.findById(transaction._id);
        expect(updatedTransaction?.totalAmount).toBe(300);
    });

    test('debería devolver 404 al intentar actualizar una transacción que no existe', async () => {
        const res = await request(app).put('/transactions/60d5f484f1c2b8b8a4e4f4f4').send({ totalPrice: 250 });
        expect(res.status).toBe(404);
    });

    test('debería eliminar una transacción por ID', async () => {
        const good = await new Good({
            name: 'Sword',
            description: 'A sharp sword',
            price: 100,
            stock: 10
        }).save();
        const transaction = await Transaction.create({
            Type: 'hunter',
            name_transactor: 'Hunter1',
            goods: [{ good: 'Sword', quantity: 2 }],
            totalAmount: 400,
            date: '05-05-2025',
            hour: '8:00'
        });

        const res = await request(app).delete(`/transactions/${transaction._id}`);
        expect(res.status).toBe(200);

        const deletedTransaction = await Transaction.findById(transaction._id);
        expect(deletedTransaction).toBeNull();
    });

    test('debería devolver 404 al intentar eliminar una transacción que no existe', async () => {
        const res = await request(app).delete('/transactions/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });
});
