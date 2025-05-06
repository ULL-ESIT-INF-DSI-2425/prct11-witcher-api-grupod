import { Merchant } from '../modelos/mercader.modelo.js';
// Controlador para manejar las operaciones CRUD de mercaderes
// Obtener todos los mercaderes
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
// Crear un nuevo mercader
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
// Obtener un mercader por ID /merchants/:id
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
// Obtener mercaderes por nombre /merchants/search/by-name?name=...
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
// Actualizar un mercader por ID /merchants/:id
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
// Actualizar un mercader por nombre /merchants/search/by-name?name=...
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
// Eliminar un mercader por ID /merchants/:id
export const deleteMerchantById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMerchant = await Merchant.findByIdAndDelete(id);
        if (!deletedMerchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        res.json({ message: 'Mercader eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando mercader' });
    }
};
// Eliminar un mercader por nombre /merchants/search/by-name?name=...
export const deleteMerchantByName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameString = Array.isArray(name) ? name[0] : name;
        const deletedMerchant = await Merchant.findOneAndDelete({ name: nameString });
        if (!deletedMerchant) {
            res.status(404).json({ message: 'Mercader no encontrado' });
            return;
        }
        res.json({ message: 'Mercader eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando mercader' });
    }
};
