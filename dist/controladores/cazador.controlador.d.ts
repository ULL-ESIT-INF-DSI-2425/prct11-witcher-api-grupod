import { RequestHandler } from 'express';
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
export declare const getAllHunters: RequestHandler;
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
export declare const createHunter: RequestHandler;
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
export declare const getHunterById: RequestHandler;
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
export declare const getHunterByName: RequestHandler;
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
export declare const updateHunterById: RequestHandler;
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
export declare const updateHunterByName: RequestHandler;
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
export declare const deleteHunterById: RequestHandler;
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
export declare const deleteHunterByName: RequestHandler;
