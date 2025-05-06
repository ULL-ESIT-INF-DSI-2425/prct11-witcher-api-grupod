import { RequestHandler } from 'express';
import { Transaction } from '../modelos/transaccion.modelo.js';

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

// Crear una nueva transacción
export const createTransaction: RequestHandler = async (req, res) => {
  try {
    const buyerType = req.body.buyerType;
    const buyer = req.body.buyer;
    const goods = req.body.goods;
    const totalAmount = req.body.totalAmount;
    const date = req.body.date;
    const hour = req.body.hour;
    if (!buyerType || !buyer || !goods || !totalAmount || !date || !hour) {
      res.status(400).json({ message: 'Tipo de comprador, comprador, bienes, monto total, fecha y hora son obligatorios' });
      return;
    }
    const newTransaction = new Transaction({
      buyerType,
      buyer,
      goods,
      totalAmount,
      date,
      hour,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creando transacción' });
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
