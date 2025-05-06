import { Hunter } from '../modelos/cazador.modelo.js';
// Controlador para manejar las operaciones CRUD de cazadores
// Obtener todos los cazadores
export const getAllHunters = async (req, res) => {
    try {
        const hunters = await Hunter.find();
        res.json(hunters);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando cazadores' });
    }
};
// Crear un nuevo cazador
export const createHunter = async (req, res) => {
    try {
        const name = req.body.name;
        const level = req.body.level;
        const specialization = req.body.specialization;
        if (!name || !level) {
            res.status(400).json({ message: 'Nombre y nivel son obligatorios' });
            return;
        }
        const newHunter = new Hunter({
            name,
            level,
            specialization,
        });
        const savedHunter = await newHunter.save();
        res.status(201).json(savedHunter);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creando cazador' });
    }
};
// Obtener un cazador por ID /hunters/:id
export const getHunterById = async (req, res) => {
    try {
        const { id } = req.params;
        const hunter = await Hunter.findById(id);
        if (!hunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        res.json(hunter);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando cazador' });
    }
};
// Obtener cazadores por nombre /hunters/search/by-name?name=...
export const getHunterByName = async (req, res) => {
    try {
        const { name } = req.query;
        const hunters = await Hunter.find({ name });
        if (!hunters || hunters.length === 0) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        res.json(hunters);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando cazador' });
    }
};
// Actualizar un cazador por ID /hunters/:id
export const updateHunterById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHunter = await Hunter.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedHunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        res.json(updatedHunter);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando cazador' });
    }
};
// Actualizar un cazador por nombre /hunters/search/by-name?name=...
export const updateHunterByName = async (req, res) => {
    try {
        const { name } = req.query;
        const updatedHunter = await Hunter.findOneAndUpdate({ name }, req.body, { new: true });
        if (!updatedHunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        res.json(updatedHunter);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando cazador' });
    }
};
// Eliminar un cazador por ID /hunters/:id
export const deleteHunterById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHunter = await Hunter.findByIdAndDelete(id);
        if (!deletedHunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        res.json({ message: 'Cazador eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando cazador' });
    }
};
// Eliminar un cazador por nombre /hunters/search/by-name?name=...
export const deleteHunterByName = async (req, res) => {
    try {
        const { name } = req.query;
        const deletedHunter = await Hunter.findOneAndDelete({ name });
        if (!deletedHunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        res.json({ message: 'Cazador eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando cazador' });
    }
};
