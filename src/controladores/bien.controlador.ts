import { Request, Response } from 'express';
import { RequestHandler } from 'express';
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
export const getAllGoods = async (req: Request, res: Response) => {
    try {
        const goods = await Good.find();
        res.json(goods);
    } catch (error) {
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
export const getGoodByName: RequestHandler = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query: any = {};
        if (name) query.name = name;
        if (description) query.description = description;
        if (price) query.price = price;
        if (stock) query.stock = stock;

        const goods = await Good.find(query);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};

/** 
 * Obtiene un bien por descripción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su descripción en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export const getGoodbyDescription: RequestHandler = async (req, res) => {
    try {
        const { description } = req.query;
        const goods = await Good.find({ description });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};


/**
 * Obtiene un bien por precio
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su precio en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export const getGoodByPrice: RequestHandler = async (req, res) => {
    try {
        const { price } = req.query;
        const goods = await Good.find({ price });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};

/**
 * Obtiene un bien por stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su stock en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export const getGoodByStock: RequestHandler = async (req, res) => {
    try {
        const { stock } = req.query;
        const goods = await Good.find({ stock });
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};

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
 */
export const getGoodbyQuery: RequestHandler = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query: any = {};
        if (name) query.name = name;
        if (description) query.description = description;
        if (price) query.price = price;
        if (stock) query.stock = stock;

        const goods = await Good.find(query);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        res.json(goods);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando bien' });
    }
};

/**
 * Actualiza un bien por ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su ID, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
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

/**
 * Actualiza un bien por nombre
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su nombre, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export const updateGoodByName: RequestHandler = async (req, res) => {
    try {
      const filter: any = {};
      if (req.query.name) filter.name = req.query.name;
  
      const update: any = {};
      const { name, description, price, stock } = req.body;
      if (name) update.name = name;
      if (description) update.description = description;
      if (price) update.price = price;
      if (stock) update.stock = stock;
  
      const goods = await Good.find(filter);
      if (!goods || goods.length === 0) {
        res.status(404).json({ message: 'Bien no encontrado' });
        return;
      }
  
      const updatedGoods: any[] = [];
      for (const good of goods) {
        Object.assign(good, update);
        await good.save();
        updatedGoods.push(good);
      }
  
      res.json(updatedGoods);
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando bien' });
    }
};

/**
 * Actualiza un bien por descripción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su descripción, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export const updateGoodByDescription: RequestHandler = async (req, res) => {
    try {
        const filter: any = {};
        if (req.query.description) filter.description = req.query.description;
        const update: any = {};
        const { name, description, price, stock } = req.body;
        if (name) update.name = name;
        if (description) update.description = description;
        if (price) update.price = price;
        if (stock) update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods: any[] = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};

/**
 * Actualiza un bien por precio
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su precio, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export const updateGoodByPrice: RequestHandler = async (req, res) => {
    try {
        const filter: any = {};
        if (req.query.price) filter.price = req.query.price;
        const update: any = {};
        const { name, description, price, stock } = req.body;
        if (name) update.name = name;
        if (description) update.description = description;
        if (price) update.price = price;
        if (stock) update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods: any[] = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};

/**
 * Actualiza un bien por stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su stock, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export const updateGoodByStock: RequestHandler = async (req, res) => {
    try {
        const filter: any = {};
        if (req.query.stock) filter.stock = req.query.stock;
        const update: any = {};
        const { name, description, price, stock } = req.body;
        if (name) update.name = name;
        if (description) update.description = description;
        if (price) update.price = price;
        if (stock) update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return
        }
        const updatedGoods: any[] = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando bien' });
    }
};

/**
 * Actualiza un bien por nombre, descripción, precio o stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su nombre, descripción, precio o stock,
 * lo actualiza y lo guarda en la base de datos. Si el bien no se encuentra, se devuelve
 * un mensaje de error. Si ocurre un error durante la actualización, se devuelve un mensaje de error.
 */
export const updateGoodByQuery: RequestHandler = async (req, res) => {
    try {
        const filter: any = {};
        if (req.query.name) filter.name = req.query.name;
        if (req.query.description) filter.description = req.query.description;
        if (req.query.price) filter.price = req.query.price;
        if (req.query.stock) filter.stock = req.query.stock;
        const update: any = {};
        const { name, description, price, stock } = req.body;
        if (name) update.name = name;
        if (description) update.description = description;
        if (price) update.price = price;
        if (stock) update.stock = stock;
        const goods = await Good.find(filter);
        if (!goods || goods.length === 0) {
            res.status(404).json({ message: 'Bien no encontrado' });
            return;
        }
        const updatedGoods: any[] = [];
        for (const good of goods) {
            Object.assign(good, update);
            await good.save();
            updatedGoods.push(good);
        }
        res.json(updatedGoods);
    } catch (error) {
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
export const deleteGoodById: RequestHandler = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};

/**
 * Elimina un bien por nombre y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su nombre, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export const deleteGoodByName: RequestHandler = async (req, res) => {   
    try {
        const { name, description, price, stock } = req.query;
        const query: any = {};
        if (name) query.name = name;
        if (description) query.description = description;
        if (price) query.price = price;
        if (stock) query.stock = stock;

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
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};

/**
 * Elimina un bien por descripción y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su descripción, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export const deleteGoodByDescription: RequestHandler = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
}

/**
 * Elimina un bien por precio y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su precio, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export const deleteGoodByPrice: RequestHandler = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};

/**
 * Elimina un bien por stock y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su stock, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
*/
export const deleteGoodByStock: RequestHandler = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
};

/**
 * Elimina un bien por nombre, descripción, precio o stock y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su nombre, descripción, precio o stock,
 * lo elimina y revierte el stock de los bienes involucrados en la transacción. Si el bien
 * no se encuentra, se devuelve un mensaje de error. Si ocurre un error al eliminar el bien
 * o revertir el stock, se devuelve un mensaje de error.
 */
export const deleteGoodByQuery: RequestHandler = async (req, res) => {
    try {
        const { name, description, price, stock } = req.query;
        const query: any = {};
        if (name) query.name = name;
        if (description) query.description = description;
        if (price) query.price = price;
        if (stock) query.stock = stock;

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
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando bien' });
    }
}