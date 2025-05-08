import { RequestHandler } from 'express';
import { Transaction } from '../modelos/transaccion.modelo.js';
import { Merchant } from '../modelos/mercader.modelo.js';
import { Hunter } from '../modelos/cazador.modelo.js';
import { Good } from '../modelos/bien.modelo.js';

// Controlador para manejar las operaciones CRUD de transacciones
 
/**
 * Crea una nueva transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al crear la transacción
 * @description Esta función crea una nueva transacción en la base de datos utilizando los datos
 * proporcionados en la solicitud. Si la transacción se crea con éxito, se devuelve la transacción
 * creada en formato JSON. Si ocurre un error, se devuelve un mensaje de error.
 */
export const createTransaction: RequestHandler = async (req, res) => {
  try {
    const { Type, name_transactor, goods, date, hour } = req.body;

    if (!Type || !name_transactor || !goods || !date || !hour) {
      res.status(400).json({ message: 'Todos los campos son obligatorios (excepto totalAmount)' });
      return;
    }

    let transactorDoc;

    // Buscar al transactor según el nombre
    if (Type === 'hunter') {
      transactorDoc = await Hunter.findOne({ name: name_transactor });
    } else if (Type === 'merchant') {
      transactorDoc = await Merchant.findOne({ name: name_transactor });
    } else {
      res.status(400).json({ message: 'Tipo de transactor no válido' });
      return;
    }

    if (!transactorDoc) {
      res.status(404).json({ message: `Transactor no encontrado: ${name_transactor}` });
      return;
    }

    let goodsDocs: { good: string; quantity: number }[] = [];
    let totalAmount = 0;

    for (const item of goods) {
      const goodDoc = await Good.findOne({ name: item.good });
      if (!goodDoc) {
        res.status(404).json({ message: `Bien no encontrado: ${item.good}` });
        return;
      }

      const quantity: number = item.quantity || 1;
      const subtotal = goodDoc.price * quantity;

      // Actualizar el stock según el tipo de transacción
      if (Type === 'hunter') {
        if (goodDoc.stock < quantity) {
          res.status(400).json({ message: `Stock insuficiente para el bien: ${item.good}` });
          return;
        }
        goodDoc.stock -= quantity;
      } else if (Type === 'merchant') {
        goodDoc.stock += quantity;
      }

      await goodDoc.save();

      totalAmount += subtotal;
      goodsDocs.push({ good: goodDoc.name, quantity });
    }

    if (goodsDocs.length === 0) {
      res.status(400).json({ message: 'No se encontraron bienes válidos' });
      return;
    }

    const newTransaction = new Transaction({
      Type,
      name_transactor: transactorDoc.name,
      goods: goodsDocs,
      totalAmount,
      date,
      hour,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creando transacción', error: error.message });
    } else {
      res.status(500).json({ message: 'Error creando transacción', error: String(error) });
    }
  }
};

/**
 * Obtiene todas las transacciones
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener las transacciones
 * @description Esta función busca todas las transacciones en la base de datos y las devuelve
 * en formato JSON. Si no se encuentran transacciones, se devuelve un mensaje de error.
 */
export const getAllTransactions: RequestHandler = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: 'No se encontraron transacciones' });
      return;
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando transacciones' });
  }
};

/**
 * Obtiene una transacción por su ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener la transacción
 * @description Esta función busca una transacción en la base de datos utilizando su ID
 * proporcionado en la solicitud. Si la transacción se encuentra, se devuelve en formato JSON.
 * Si no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * operación, se devuelve un mensaje de error.
 */
export const getTransactionById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).json({ message: 'Transacción no encontrada' });
      return;
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando transacción' });
  }
};

/**
 * Obtiene transacciones por el nombre del comprador
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener las transacciones
 * @description Esta función busca transacciones en la base de datos utilizando el nombre del comprador
 * proporcionado en la solicitud. Si se encuentran transacciones, se devuelven en formato JSON.
 * Si no se encuentran, se devuelve un mensaje de error. Si ocurre un error durante la
 * operación, se devuelve un mensaje de error.
 */
export const getTransactionsByBuyer: RequestHandler = async (req, res) => {
  try {
    const { buyer } = req.query;
    const transactions = await Transaction.find({ buyer });
    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: 'No se encontraron transacciones para este comprador' });
      return;
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando transacciones' });
  }
};

/**
 * Obtiene transacciones por el nombre del mercader
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener las transacciones
 * @description Esta función busca transacciones en la base de datos utilizando el nombre del mercader
 * proporcionado en la solicitud. Si se encuentran transacciones, se devuelven en formato JSON.
 * Si no se encuentran, se devuelve un mensaje de error. Si ocurre un error durante la
 * operación, se devuelve un mensaje de error.
 */
export const getTransactionsByMerchant: RequestHandler = async (req, res) => {
  try {
    const { name_transactor } = req.query;
    const transactions = await Transaction.find({ name_transactor });
    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: 'No se encontraron transacciones para este mercader' });
      return;
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando transacciones' });
  }
};

/**
 * Obtiene transacciones por fecha
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener las transacciones
 * @description Esta función busca transacciones en la base de datos utilizando la fecha
 * proporcionada en la solicitud. Si se encuentran transacciones, se devuelven en formato JSON.
 * Si no se encuentran, se devuelve un mensaje de error. Si ocurre un error durante la
 * operación, se devuelve un mensaje de error.
 */
export const getTransactionsByDate: RequestHandler = async (req, res) => {
  try {
    const { date } = req.query;
    const transactions = await Transaction.find({ date });
    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: 'No se encontraron transacciones para esta fecha' });
      return;
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando transacciones' });
  }
};

/**
 * Actualiza una transacción por su ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar la transacción
 * @description Esta función actualiza una transacción en la base de datos utilizando el ID
 * proporcionado en la solicitud. Si la transacción se encuentra, se actualiza con los nuevos
 * datos proporcionados en el cuerpo de la solicitud. Si no se encuentra, se devuelve un mensaje
 * de error. Si ocurre un error durante la operación, se devuelve un mensaje de error.
 */
export const updateTransactionById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTransaction) {
      res.status(404).json({ message: 'Transacción no encontrada' });
      return;
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando transacción' });
  }
};

/**
 * Elimina una transacción por su ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar la transacción
 * @description Esta función elimina una transacción de la base de datos utilizando el ID
 * proporcionado en la solicitud. Si la transacción se encuentra, se elimina y se devuelve un
 * mensaje de éxito. Si no se encuentra, se devuelve un mensaje de error. Si ocurre un error
 * durante la operación, se devuelve un mensaje de error.
 */
export const deleteTransactionById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la transacción por ID
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).json({ message: 'Transacción no encontrada' });
      return;
    }

    // Revertir el stock de los bienes involucrados en la transacción
    for (const item of transaction.goods) {
      const goodDoc = await Good.findOne({ name: item.good });
      if (!goodDoc) {
        res.status(404).json({ message: `Bien no encontrado: ${item.good}` });
        return;
      }

      // Actualizar el stock según el tipo de transacción
      if (transaction.Type === 'hunter') {
        goodDoc.stock += item.quantity; 
      } 
      else if (transaction.Type === 'merchant') {
        goodDoc.stock -= item.quantity;
      }

      // Validar que el stock no sea negativo
      if (goodDoc.stock < 0) {
        res.status(400).json({ message: `Stock negativo no permitido para el bien: ${item.good}` });
        return;
      }

      await goodDoc.save();
    }

    // Eliminar la transacción
    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transacción eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({
      message: 'Error eliminando transacción',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
