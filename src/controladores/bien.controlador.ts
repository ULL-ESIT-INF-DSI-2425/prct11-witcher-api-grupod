import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { Good } from '../modelos/bien.modelo.js';

// Controlador para manejar las operaciones CRUD de bienes
// Obtener todos los bienes
export const getAllGoods = async (req: Request, res: Response) => {
    try {
        const goods = await Good.find();
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bienes' });
    }
};

// Crear un nuevo bien
export const createGood: RequestHandler = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        if (!name || !description || !price || !stock) {
            res.status(400).json({ message: 'Nombre, descripción, precio y stock son obligatorios' });
            return;
        }
        const newGood = new Good({ name, description, price, stock });
        const savedGood = await newGood.save();
        res.status(201).json(savedGood);
    } catch (error) {
        res.status(500).json({ message: 'Error creando bien' });
    }
    return;
};

// Obtener un bien por ID /goods/:id
export const getGoodById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const good = await Good.findById(id);
        if (!good) {
            res.status(404).json({ message: 'Bien no encontrado' });
        }
        res.json(good);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};

// Obtener un bien por query /goods?name=nombre&description=descripcion&price=precio&stock=stock
export const getGoodByQuery: RequestHandler = async (req, res) => {
    try {
        const query1: any = {};
        query1.name = req.query.name;
        query1.description = req.query.description;
        query1.price = req.query.price;
        query1.stock = req.query.stock;
        if (!query1.name && !query1.description && !query1.price && !query1.stock) {
            res.status(400).json({ message: 'Por favor, proporciona al menos un parámetro de búsqueda' });
        }
        const goods = await Good.find(query1);
        if (goods.length === 0) {
            res.status(404).json({ message: 'No se encontraron bienes que coincidan con la búsqueda' });
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};

// Actualizar un bien por ID /goods/:id
export const updateGoodById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        if (!name && !description && !price && !stock) {
            res.status(400).json({ message: 'Por favor, proporciona al menos un campo para actualizar' });
            return;
        }
        const good = await Good.findById(id);
        if (!good) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        if (name) good.name = name;
        if (description) good.description = description;
        if (price) good.price = price;
        if (stock) good.stock = stock;
        await good.save();
        res.json(good);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};

// Actualizar un bien por query /goods?name=nombre&description=descripcion&price=precio&stock=stock
export const updateGoodByQuery: RequestHandler = async (req, res) => {
    try {
        const query1: any = {};
        query1.name = req.query.name;
        query1.description = req.query.description;
        query1.price = req.query.price;
        query1.stock = req.query.stock;
        if (!query1.name && !query1.description && !query1.price && !query1.stock) {
            res.status(400).json({ message: 'Por favor, proporciona al menos un parámetro de búsqueda' });
        }
        const goods = await Good.find(query1);
        if (goods.length === 0) {
            res.status(404).json({ message: 'No se encontraron bienes que coincidan con la búsqueda' });
        }
        for (const good of goods) {
            if (req.body.name) good.name = req.body.name;
            if (req.body.description) good.description = req.body.description;
            if (req.body.price) good.price = req.body.price;
            if (req.body.stock) good.stock = req.body.stock;
            await good.save();
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};

// Eliminar un bien por ID /goods/:id
export const deleteGoodById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const good = await Good.findById(id);
        if (!good) {
            res.status(404).json({ message: 'Bien no encontrado' });
        }
        await Good.findByIdAndDelete(id);
        res.json({ message: 'Bien eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};

// Eliminar un bien por query /goods?name=nombre&description=descripcion&price=precio&stock=stock
export const deleteGoodByQuery: RequestHandler = async (req, res) => {
    try {
        const query1: any = {};
        query1.name = req.query.name;
        query1.description = req.query.description;
        query1.price = req.query.price;
        query1.stock = req.query.stock;
        if (!query1.name && !query1.description && !query1.price && !query1.stock) {
            res.status(400).json({ message: 'Por favor, proporciona al menos un parámetro de búsqueda' });
        }
        const goods = await Good.find(query1);
        if (goods.length === 0) {
            res.status(404).json({ message: 'No se encontraron bienes que coincidan con la búsqueda' });
        }
        for (const good of goods) {
            await Good.findByIdAndDelete(good._id);
        }
        res.json({ message: 'Bienes eliminados' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
}
