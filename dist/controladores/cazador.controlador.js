import { Hunter } from '../modelos/cazador.modelo.js';
import { Transaction } from '../modelos/transaccion.modelo.js';
// Controlador para manejar las operaciones CRUD de cazadores
/**
 * Obtiene todos los cazadores registrados en la base de datos
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener los cazadores
 * @description Esta función recupera todos los cazadores almacenados en la base de datos
 * y los devuelve en formato JSON. Si ocurre un error durante la operación, se devuelve
 * un mensaje de error.
 */
export const getAllHunters = async (req, res) => {
    try {
        const hunters = await Hunter.find();
        res.json(hunters);
    }
    catch (error) {
        res.status(500).json({ message: 'Error buscando cazadores' });
    }
};
/**
 * Crea un nuevo cazador en la base de datos
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al crear el cazador
 * @description Esta función crea un nuevo cazador en la base de datos utilizando los datos
 * proporcionados en la solicitud. Si el cazador se crea con éxito, se devuelve el cazador
 * creado en formato JSON. Si ocurre un error, se devuelve un mensaje de error.
 */
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
/**
 * Obtiene un cazador por su ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener el cazador
 * @description Esta función busca un cazador en la base de datos utilizando su ID
 * proporcionado en la solicitud. Si el cazador se encuentra, se devuelve en formato JSON.
 * Si no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * operación, se devuelve un mensaje de error.
 */
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
/**
 * Obtiene un cazador por su nombre
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener el cazador
 * @description Esta función busca un cazador en la base de datos utilizando su nombre
 * proporcionado en la solicitud. Si el cazador se encuentra, se devuelve en formato JSON.
 * Si no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * operación, se devuelve un mensaje de error.
 */
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
/**
 * Actualiza un cazador por su ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el cazador
 * @description Esta función actualiza un cazador en la base de datos utilizando su ID
 * proporcionado en la solicitud. Los nuevos datos del cazador se obtienen del cuerpo de
 * la solicitud. Si el cazador se actualiza con éxito, se devuelve el cazador actualizado
 * en formato JSON. Si no se encuentra el cazador, se devuelve un mensaje de error. Si
 * ocurre un error durante la operación, se devuelve un mensaje de error.
 */
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
/**
 * Actualiza un cazador por su nombre
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el cazador
 * @description Esta función actualiza un cazador en la base de datos utilizando su nombre
 * proporcionado en la solicitud. Los nuevos datos del cazador se obtienen del cuerpo de
 * la solicitud. Si el cazador se actualiza con éxito, se devuelve el cazador actualizado
 * en formato JSON. Si no se encuentra el cazador, se devuelve un mensaje de error. Si
 * ocurre un error durante la operación, se devuelve un mensaje de error.
 */
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
/**
 * Elimina un cazador por su ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el cazador
 * @description Esta función elimina un cazador de la base de datos utilizando su ID
 * proporcionado en la solicitud. Si el cazador se elimina con éxito, se devuelve un mensaje
 * de éxito. Si no se encuentra el cazador, se devuelve un mensaje de error. Si ocurre un
 * error durante la operación, se devuelve un mensaje de error.
 */
export const deleteHunterById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHunter = await Hunter.findByIdAndDelete(id);
        if (!deletedHunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        // Borramos todas las transacciones asociadas al cazador
        await Transaction.deleteMany({ name_transactor: deletedHunter.name });
        res.json({ message: 'Cazador eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando cazador' });
    }
};
/**
 * Elimina un cazador por su nombre
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el cazador
 * @description Esta función elimina un cazador de la base de datos utilizando su nombre
 * proporcionado en la solicitud. Si el cazador se elimina con éxito, se devuelve un mensaje
 * de éxito. Si no se encuentra el cazador, se devuelve un mensaje de error. Si ocurre un
 * error durante la operación, se devuelve un mensaje de error.
 */
export const deleteHunterByName = async (req, res) => {
    try {
        const { name } = req.query;
        const deletedHunter = await Hunter.findOneAndDelete({ name });
        if (!deletedHunter) {
            res.status(404).json({ message: 'Cazador no encontrado' });
            return;
        }
        // Borramos todas las transacciones asociadas al cazador
        await Transaction.deleteMany({ name_transactor: deletedHunter.name });
        res.json({ message: 'Cazador eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando cazador' });
    }
};
