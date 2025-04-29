import { Hunter } from '../modelos/cazador.modelo.js';
export const getAllHunters = async (req, res) => {
    try {
        const hunters = await Hunter.find();
        res.json(hunters);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando cazadores' });
    }
};
// POST: crear un cazador nuevo
export const createHunter = async (req, res) => {
    try {
        const { name, level, specialization } = req.body;
        if (!name || !level) {
            return res.status(400).json({ message: 'Nombre y nivel son obligatorios' });
        }
        const newHunter = new Hunter({ name, level, specialization });
        const savedHunter = await newHunter.save();
        res.status(201).json(savedHunter);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creando cazador' });
    }
};
