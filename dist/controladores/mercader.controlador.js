import { Merchant } from '../modelos/mercader.modelo.js';
import { Transaction } from '../modelos/transaccion.modelo.js';
// Controlador para manejar las operaciones CRUD de mercaderes
/**
 * Controlador para obtener todos los mercaderes
 * @param req - Request
 * @param res - Response
 * @returns - Lista de mercaderes
 * @throws - 404 si no se encuentran mercaderes
 * @throws - 500 si hay un error al obtener los mercaderes
 */
export const getAllMerchants = async (req, res) => {
    try {
        const merchants = await Merchant.find();
        if (!merchants || merchants.length === 0) {
            res.status(404).json({ message: 'No se encontraron mercaderes' });
            return;
        }
        res.json(merchants);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los mercaderes' });
    }
};
/**
 * Controlador para crear un nuevo mercader
 * @param req - Request
 * @param res - Response
 * @returns - El mercader creado
 * @throws - 400 si faltan campos obligatorios
 * @throws - 500 si hay un error al crear el mercader
 */
export const createMerchant = async (req, res) => {
    try {
        const name = req.body.name;
        const location = req.body.location;
        const specialization = req.body.specialization;
        if (!name || !location || !specialization) {
            res.status(400).json({ message: 'Nombre, ubicación y especialización son obligatorios' });
            return;
        }
        const newMerchant = new Merchant({ name, location, specialization });
        const savedMerchant = await newMerchant.save();
        res.status(201).json(savedMerchant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creando mercader' });
    }
};
/**
 * Controlador para obtener un mercader por ID
 * @param req - Request
 * @param res - Response
 * @returns - El mercader encontrado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al obtener el mercader
 */
export const getMerchantById = async (req, res) => {
    try {
        const { id } = req.params;
        const merchant = await Merchant.findById(id);
        if (!merchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        res.json(merchant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando mercader' });
    }
};
/**
 * Controlador para obtener un mercader por nombre
 * @param req - Request
 * @param res - Response
 * @returns - El mercader encontrado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al obtener el mercader
 */
export const getMerchantByName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameString = Array.isArray(name) ? name[0] : name;
        const merchants = await Merchant.find({ name: { $regex: nameString, $options: 'i' } });
        if (!merchants || merchants.length === 0) {
            res.status(404).json({ message: 'No se encontraron mercaderes con ese nombre' });
            return;
        }
        res.json(merchants);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando mercaderes' });
    }
};
/**
 * Controlador para actualizar un mercader por ID
 * @param req - Request
 * @param res - Response
 * @returns - El mercader actualizado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al actualizar el mercader
 */
export const updateMerchantById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMerchant = await Merchant.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMerchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        res.json(updatedMerchant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando mercader' });
    }
};
/**
 * Controlador para actualizar un mercader por nombre
 * @param req - Request
 * @param res - Response
 * @returns - El mercader actualizado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al actualizar el mercader
 */
export const updateMerchantByName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameString = Array.isArray(name) ? name[0] : name;
        const updatedMerchant = await Merchant.findOneAndUpdate({ name: nameString }, req.body, { new: true });
        if (!updatedMerchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        res.json(updatedMerchant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando mercader' });
    }
};
/**
 * Controlador para eliminar un mercader por ID
 * @param req - Request
 * @param res - Response
 * @returns - Mensaje de éxito
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al eliminar el mercader
 */
export const deleteMerchantById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMerchant = await Merchant.findByIdAndDelete(id);
        if (!deletedMerchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        // Borramos las transacciones asociadas al mercader
        await Transaction.deleteMany({ name_transactor: deletedMerchant.name });
        res.json({ message: 'Mercader eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando mercader' });
    }
};
/**
 * Controlador para eliminar un mercader por nombre
 * @param req - Request
 * @param res - Response
 * @returns - Mensaje de éxito
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al eliminar el mercader
 */
export const deleteMerchantByName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameString = Array.isArray(name) ? name[0] : name;
        const deletedMerchant = await Merchant.findOneAndDelete({ name: nameString });
        if (!deletedMerchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        // Borramos las transacciones asociadas al mercader
        await Transaction.deleteMany({ name_transactor: deletedMerchant.name });
        res.json({ message: 'Mercader eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando mercader' });
    }
};
