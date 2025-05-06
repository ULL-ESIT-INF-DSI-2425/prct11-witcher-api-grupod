import { Good } from '../modelos/bien.modelo.js';
// Controlador para manejar las operaciones CRUD de bienes
// Obtener todos los bienes
export const getAllGoods = async (req, res) => {
    try {
        const goods = await Good.find();
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bienes' });
    }
};
// Crear un nuevo bien
export const createGood = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        if (!name || !description || !price || !stock) {
            res.status(400).json({ message: 'Nombre, descripción, precio y stock son obligatorios' });
            return;
        }
        const newGood = new Good({ name, description, price, stock });
        const savedGood = await newGood.save();
        res.status(201).json(savedGood);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creando bien' });
    }
    return;
};
// Obtener un bien por ID /goods/:id
export const getGoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const good = await Good.findById(id);
        if (!good) {
            res.status(404).json({ message: 'Bien no encontrado' });
        }
        res.json(good);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};
// Obtener un bien por query /goods/search?name=nombre&description=descripcion&price=precio&stock=stock
export const getGoodByName = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query = {};
        if (name)
            query.name = name;
        if (description)
            query.description = description;
        if (price)
            query.price = price;
        if (stock)
            query.stock = stock;
        const goods = await Good.find(query);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};
export const getGoodbyDescription = async (req, res) => {
    try {
        const { description } = req.query;
        const goods = await Good.find({ description });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};
export const getGoodByPrice = async (req, res) => {
    try {
        const { price } = req.query;
        const goods = await Good.find({ price });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};
export const getGoodByStock = async (req, res) => {
    try {
        const { stock } = req.query;
        const goods = await Good.find({ stock });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};
// Esta función combina las búsquedas por nombre, descripción, precio y stock en una sola
export const getGoodbyQuery = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query = {};
        if (name)
            query.name = name;
        if (description)
            query.description = description;
        if (price)
            query.price = price;
        if (stock)
            query.stock = stock;
        const goods = await Good.find(query);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};
// Actualizar un bien por ID /goods/:id
export const updateGoodById = async (req, res) => {
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
        if (name)
            good.name = name;
        if (description)
            good.description = description;
        if (price)
            good.price = price;
        if (stock)
            good.stock = stock;
        await good.save();
        res.json(good);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};
export const updateGoodByName = async (req, res) => {
    try {
        const filter = {};
        if (req.query.name)
            filter.name = req.query.name;
        const update = {};
        const { name, description, price, stock } = req.body;
        if (name)
            update.name = name;
        if (description)
            update.description = description;
        if (price)
            update.price = price;
        if (stock)
            update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};
export const updateGoodByDescription = async (req, res) => {
    try {
        const filter = {};
        if (req.query.description)
            filter.description = req.query.description;
        const update = {};
        const { name, description, price, stock } = req.body;
        if (name)
            update.name = name;
        if (description)
            update.description = description;
        if (price)
            update.price = price;
        if (stock)
            update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};
export const updateGoodByPrice = async (req, res) => {
    try {
        const filter = {};
        if (req.query.price)
            filter.price = req.query.price;
        const update = {};
        const { name, description, price, stock } = req.body;
        if (name)
            update.name = name;
        if (description)
            update.description = description;
        if (price)
            update.price = price;
        if (stock)
            update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};
export const updateGoodByStock = async (req, res) => {
    try {
        const filter = {};
        if (req.query.stock)
            filter.stock = req.query.stock;
        const update = {};
        const { name, description, price, stock } = req.body;
        if (name)
            update.name = name;
        if (description)
            update.description = description;
        if (price)
            update.price = price;
        if (stock)
            update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};
export const updateGoodByQuery = async (req, res) => {
    try {
        const filter = {};
        if (req.query.name)
            filter.name = req.query.name;
        if (req.query.description)
            filter.description = req.query.description;
        if (req.query.price)
            filter.price = req.query.price;
        if (req.query.stock)
            filter.stock = req.query.stock;
        const update = {};
        const { name, description, price, stock } = req.body;
        if (name)
            update.name = name;
        if (description)
            update.description = description;
        if (price)
            update.price = price;
        if (stock)
            update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};
// Eliminar un bien por ID /goods/:id
export const deleteGoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const good = await Good.findById(id);
        if (!good) {
            res.status(404).json({ message: 'Bien no encontrado' });
        }
        await Good.findByIdAndDelete(id);
        res.json({ message: 'Bien eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
export const deleteGoodByName = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query = {};
        if (name)
            query.name = name;
        if (description)
            query.description = description;
        if (price)
            query.price = price;
        if (stock)
            query.stock = stock;
        const goods = await Good.find(query);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        await Good.deleteMany(query);
        res.json({ message: 'Bien(es) eliminado(s)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
export const deleteGoodByDescription = async (req, res) => {
    try {
        const { description } = req.query;
        const goods = await Good.find({ description });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        await Good.deleteMany({ description });
        res.json({ message: 'Bien(es) eliminado(s)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
export const deleteGoodByPrice = async (req, res) => {
    try {
        const { price } = req.query;
        const goods = await Good.find({ price });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        await Good.deleteMany({ price });
        res.json({ message: 'Bien(es) eliminado(s)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
export const deleteGoodByStock = async (req, res) => {
    try {
        const { stock } = req.query;
        const goods = await Good.find({ stock });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        await Good.deleteMany({ stock });
        res.json({ message: 'Bien(es) eliminado(s)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
export const deleteGoodByQuery = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query = {};
        if (name)
            query.name = name;
        if (description)
            query.description = description;
        if (price)
            query.price = price;
        if (stock)
            query.stock = stock;
        const goods = await Good.find(query);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        await Good.deleteMany(query);
        res.json({ message: 'Bien(es) eliminado(s)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
