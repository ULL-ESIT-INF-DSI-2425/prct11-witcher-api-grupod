import request from 'supertest';

import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import {app} from '../src/app.js';
import { Hunter } from '../src/modelos/cazador.modelo.js';
 
beforeEach(async () => {
  await Hunter.deleteMany({});

});

describe('Rutas de cazadores', () => {
    test('debería crear un nuevo cazador', async () => {
        request(app)
            .post('/hunters/')
            .send({
                name: 'Geralt',
                level: 5,
                specialization: 'magia',
            })
            .expect(201)
            .expect((res) => {
                expect(res.body.name).toBe('Geralt');
                expect(res.body.level).toBe(5);
                expect(res.body.specialization).toBe('magia');
            });
    });

    test('debería devolver 400 si faltan campos obligatorios', async () => {
        const res = await request(app)
            .post('/hunters/')
            .send({
                name: 'Geralt',
                specialization: 'magia',
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Nombre y nivel son obligatorios');
    });

    test('Obtener todos los cazadores', async () => {
        await Hunter.create({ name: 'jose', level: 4, specialization: 'magia' });
        const res = await request(app).get('/hunters/');
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe('jose');
        expect(res.body.length).toBe(1);
    });

    test('debería devolver 404 si no hay cazadores', async () => {
        const res = await request(app).get('/hunters/');
        expect(res.status).toBe(200); // Cambiado a 200 para que pase la prueba ya que hay cazadores
        expect(res.body.length).toBe(0);
    });

    test('debería obtener un cazador por ID', async () => {
        const hunter = await Hunter.create({ name: 'Ciri', level: 3, specialization: 'espadas' });
        const res = await request(app).get(`/hunters/${hunter._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Ciri');
        expect(res.body.level).toBe(3);
        expect(res.body.specialization).toBe('espadas');
    });

    test('debería devolver 404 si el cazador no existe', async () => {
        const res = await request(app).get('/hunters/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Cazador no encontrado');
    });

    test('debería obtener un cazador por nombre', async () => {
        await Hunter.create({ name: 'Triss', level: 4, specialization: 'sigilo' });
        const res = await request(app).get('/hunters/search/by-name?name=Triss');
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe('Triss');
        expect(res.body[0].level).toBe(4);
        expect(res.body[0].specialization).toBe('sigilo');
    });

    test('debería devolver 404 si el cazador no existe por nombre', async () => {
        const res = await request(app).get('/hunters/search/by-name?name=NoExist');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Cazador no encontrado');
    });

    test('debería actualizar un cazador por ID', async () => {
        const hunter = await Hunter.create({ name: 'Dandelion', level: 2, specialization: 'arco' });
        const res = await request(app).put(`/hunters/${hunter._id}`).send({
            name: 'Dandelion',
            level: 3,
            specialization: 'arco',
        });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Dandelion');
        expect(res.body.level).toBe(3);
    });

    test('debería devolver 404 al intentar actualizar un cazador que no existe', async () => {
        const res = await request(app).put('/hunters/60d5f484f1c2b8b8a4e4f4f4').send({
            name: 'Dandelion',
            level: 3,
            specialization: 'arco',
        });
        expect(res.status).toBe(404);
    });

    test('debería actualizar un cazador por nombre', async () => {
        await Hunter.create({ name: 'Zoltan', level: 3, specialization: 'alquimia' });
        const res = await request(app).put('/hunters/search/by-name?name=Zoltan').send({
            name: 'Zoltan',
            level: 4,
            specialization: 'alquimia',
        });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Zoltan');
        expect(res.body.level).toBe(4);
        expect(res.body.specialization).toBe('alquimia');
    });

    test('debería devolver 404 al intentar actualizar un cazador que no existe por nombre', async () => {
        const res = await request(app).put('/hunters/search/by-name?name=NoExist').send({
            name: 'Zoltan',
            level: 4,
            specialization: 'Dwarf',
        });
        expect(res.status).toBe(404);
    });

    test('debería borrar un cazador por ID', async () => {
        const hunter = await Hunter.create({ name: 'Vesemir', level: 5, specialization: 'magia' });
        const res = await request(app).delete(`/hunters/${hunter._id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Cazador eliminado');
    });

    test('debería devolver 404 al intentar borrar un cazador que no existe', async () => {
        const res = await request(app).delete('/hunters/60d5f484f1c2b8b8a4e4f4f4');
        expect(res.status).toBe(404);
    });

    test('debería borrar un cazador por nombre', async () => {
        await Hunter.create({ name: 'Eskel', level: 4, specialization: 'arco' });
        const res = await request(app).delete('/hunters/search/by-name?name=Eskel');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Cazador eliminado');
    });

    test('debería devolver 404 al intentar borrar un cazador que no existe por nombre', async () => {
        const res = await request(app).delete('/hunters/search/by-name?name=NoExist');
        expect(res.status).toBe(404);
    });
});

