import { Transaction } from '../modelos/transaccion.modelo.js';
import { Merchant } from '../modelos/mercader.modelo.js';
import { Hunter } from '../modelos/cazador.modelo.js';
// Controlador para manejar las operaciones CRUD de transacciones
// Obtener todas las transacciones
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        if (!transactions || transactions.length === 0) {
            res.status(404).json({ message: 'No se encontraron transacciones' });
            return;
        }
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando transacciones' });
    }
};
export const createTransaction = async (req, res) => {
    try {
        const { Type, name_transactor, totalAmount, date, hour } = req.body;
        if (!Type || !name_transactor || !totalAmount || !date || !hour) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        let transactorDoc;
        // Buscar al transactor según el nombre
        if (Type === 'hunter') {
            transactorDoc = await Hunter.findOne({ name: name_transactor });
        }
        else if (Type === 'merchant') {
            transactorDoc = await Merchant.findOne({ name: name_transactor });
        }
        else {
            res.status(400).json({ message: 'Tipo de transactor no válido' });
            return;
        }
        if (!transactorDoc) {
            res.status(404).json({ message: `Transactor no encontrado: ${name_transactor}` });
            return;
        }
        // Mantenemos el nombre en lugar de ObjectId
        const newTransaction = new Transaction({
            Type,
            name_transactor: transactorDoc._id, // Aquí guardamos el nombre directamente
            // goods,  // Asumimos que los goods también están pasados como nombres, sin necesidad de convertir a ObjectId
            totalAmount,
            date,
            hour
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creando transacción', error: error.message });
            return;
        }
        res.status(500).json({ message: 'Error creando transacción', error: String(error) });
        return;
    }
};
// Obtener una transacción por ID
export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            res.status(404).json({ message: 'Transacción no encontrada' });
            return;
        }
        res.json(transaction);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando transacción' });
    }
};
// Obtener transacciones por comprador
export const getTransactionsByBuyer = async (req, res) => {
    try {
        const { buyer } = req.query;
        const transactions = await Transaction.find({ buyer });
        if (!transactions || transactions.length === 0) {
            res.status(404).json({ message: 'No se encontraron transacciones para este comprador' });
            return;
        }
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando transacciones' });
    }
};
// Obtener transacciones por fecha
export const getTransactionsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const transactions = await Transaction.find({ date });
        if (!transactions || transactions.length === 0) {
            res.status(404).json({ message: 'No se encontraron transacciones para esta fecha' });
            return;
        }
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando transacciones' });
    }
};
// Actualizar una transacción por ID
export const updateTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTransaction) {
            res.status(404).json({ message: 'Transacción no encontrada' });
            return;
        }
        res.json(updatedTransaction);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando transacción' });
    }
};
// Eliminar una transacción por ID
export const deleteTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            res.status(404).json({ message: 'Transacción no encontrada' });
            return;
        }
        res.json({ message: 'Transacción eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando transacción' });
    }
};
