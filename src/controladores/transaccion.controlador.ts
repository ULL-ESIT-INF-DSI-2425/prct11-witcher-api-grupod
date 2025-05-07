import { RequestHandler } from 'express';
import { Transaction } from '../modelos/transaccion.modelo.js';
import { Merchant } from '../modelos/mercader.modelo.js';
import { Hunter } from '../modelos/cazador.modelo.js';
import { Good } from '../modelos/bien.modelo.js';

// Controlador para manejar las operaciones CRUD de transacciones

// Obtener todas las transacciones
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

export const createTransaction: RequestHandler = async (req, res) => {
  try {
    const { Type, name_transactor, goods, totalAmount, date, hour } = req.body;

    if (!Type || !name_transactor || !goods || !totalAmount || !date || !hour) {
       res.status(400).json({ message: 'Todos los campos son obligatorios' });
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
      console.log("transactor")
       res.status(404).json({ message: `Transactor no encontrado: ${name_transactor}` });
       return;
    }

    let goodsDocs = [];

    // Buscar los bienes según los nombres
    for (const good of goods) {
      const goodDoc = await Good.findOne({ name: good.good });
      if (!goodDoc) {
        console.log("Bien no encontrado")
         res.status(404).json({ message: `Bien no encontrado: ${good.good}` });
         return;
      }
      goodsDocs.push({ good: goodDoc.name, quantity: good.quantity });
    }

    if (goodsDocs.length === 0) {
       res.status(400).json({ message: 'No se encontraron bienes válidos' });
       return;
    }

    // Mantenemos el nombre en lugar de ObjectId
    const newTransaction = new Transaction({
      Type,
      name_transactor: transactorDoc.name,  // Aquí guardamos el nombre directamente
      goods: goodsDocs,
      totalAmount,
      date,
      hour
    });

    const savedTransaction = await newTransaction.save();
     res.status(201).json(savedTransaction);
     return
  } catch (error) {
    if (error instanceof Error) {
       res.status(500).json({ message: 'Error creando transacción', error: error.message });
       return
    }
     res.status(500).json({ message: 'Error creando transacción', error: String(error) });
     return
  }
};
 
// Obtener una transacción por ID
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

// Obtener transacciones por comprador
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

// Obtener transacciones por fecha
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

// Actualizar una transacción por ID
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

// Eliminar una transacción por ID
export const deleteTransactionById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      res.status(404).json({ message: 'Transacción no encontrada' });
      return;
    }
    res.json({ message: 'Transacción eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando transacción' });
  }
};
