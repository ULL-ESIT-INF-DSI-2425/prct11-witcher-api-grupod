import { Good } from '../modelos/bien.modelo.js';
import { Transaction } from '../modelos/transaccion.modelo.js';
// Controlador para manejar las operaciones CRUD de bienes
/**
 * Obtiene todos los bienes
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar los bienes
 * @description Esta función busca todos los bienes en la base de datos y los devuelve
 * en formato JSON. Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 */
export const getAllGoods = async (req, res) => {
    try {
        const goods = await Good.find();
        res.json(goods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando bienes' });
    }
};
/**
 * Crea un nuevo bien
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al crear el bien
 * @description Esta función crea un nuevo bien en la base de datos y lo guarda. Si
 * ocurre un error durante la creación, se devuelve un mensaje de error. Si el bien ya
 * existe, se devuelve un mensaje de error indicando que el bien ya existe.
 */
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
/**
 * Obtiene un bien por ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su ID en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {string} req.params.id - El ID del bien a buscar
 */
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
/**
 * Obtiene un bien por nombre, descripción, precio o stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su nombre, descripción, precio o stock
 * en la base de datos y lo devuelve en formato JSON. Si el bien no se encuentra,
 * se devuelve un mensaje de error. Si ocurre un error durante la búsqueda,
 * se devuelve un mensaje de error.
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
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
/**
 * Elimina un bien por ID y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su ID, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export const deleteGoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const good = await Good.findById(id);
        if (!good) {
            res.status(404).json({ message: 'Bien no encontrado' });
        }
        // Revertir el stock de los bienes involucrados en la transacción
        if (good) {
            const transactions = await Transaction.find({ 'goods.good': good.name });
            for (const transaction of transactions) {
                for (const item of transaction.goods) {
                    if (item.good === good.name) {
                        const goodDoc = await Good.findOne({ name: item.good });
                        if (goodDoc) {
                            goodDoc.stock += item.quantity;
                            await goodDoc.save();
                        }
                    }
                }
            }
            // Eliminar la transacción
            await Transaction.deleteMany({ 'goods.good': good.name });
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
        // Revertir el stock de los bienes involucrados en la transacción
        if (goods) {
            const transactions = await Transaction.find({ 'goods.good': goods[0].name });
            for (const transaction of transactions) {
                for (const item of transaction.goods) {
                    if (item.good === goods[0].name) {
                        const goodDoc = await Good.findOne({ name: item.good });
                        if (goodDoc) {
                            goodDoc.stock += item.quantity;
                            await goodDoc.save();
                        }
                    }
                }
            }
            // Eliminar la transacción
            await Transaction.deleteMany({ 'goods.good': goods[0].name });
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
        // Revertir el stock de los bienes involucrados en la transacción
        if (goods) {
            const transactions = await Transaction.find({ 'goods.good': goods[0].name });
            for (const transaction of transactions) {
                for (const item of transaction.goods) {
                    if (item.good === goods[0].name) {
                        const goodDoc = await Good.findOne({ name: item.good });
                        if (goodDoc) {
                            goodDoc.stock += item.quantity;
                            await goodDoc.save();
                        }
                    }
                }
            }
            // Eliminar la transacción
            await Transaction.deleteMany({ 'goods.good': goods[0].name });
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
        // Revertir el stock de los bienes involucrados en la transacción
        if (goods) {
            const transactions = await Transaction.find({ 'goods.good': goods[0].name });
            for (const transaction of transactions) {
                for (const item of transaction.goods) {
                    if (item.good === goods[0].name) {
                        const goodDoc = await Good.findOne({ name: item.good });
                        if (goodDoc) {
                            goodDoc.stock += item.quantity;
                            await goodDoc.save();
                        }
                    }
                }
            }
            // Eliminar la transacción
            await Transaction.deleteMany({ 'goods.good': goods[0].name });
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
        // Revertir el stock de los bienes involucrados en la transacción
        if (goods) {
            const transactions = await Transaction.find({ 'goods.good': goods[0].name });
            for (const transaction of transactions) {
                for (const item of transaction.goods) {
                    if (item.good === goods[0].name) {
                        const goodDoc = await Good.findOne({ name: item.good });
                        if (goodDoc) {
                            goodDoc.stock += item.quantity;
                            await goodDoc.save();
                        }
                    }
                }
            }
            // Eliminar la transacción
            await Transaction.deleteMany({ 'goods.good': goods[0].name });
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
        // Revertir el stock de los bienes involucrados en la transacción
        if (goods) {
            const transactions = await Transaction.find({ 'goods.good': goods[0].name });
            for (const transaction of transactions) {
                for (const item of transaction.goods) {
                    if (item.good === goods[0].name) {
                        const goodDoc = await Good.findOne({ name: item.good });
                        if (goodDoc) {
                            goodDoc.stock += item.quantity;
                            await goodDoc.save();
                        }
                    }
                }
            }
            // Eliminar la transacción
            await Transaction.deleteMany({ 'goods.good': goods[0].name });
        }
        await Good.deleteMany(query);
        res.json({ message: 'Bien(es) eliminado(s)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};
