import { RequestHandler } from 'express';
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
export declare const createTransaction: RequestHandler;
/**
 * Obtiene todas las transacciones
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al obtener las transacciones
 * @description Esta función busca todas las transacciones en la base de datos y las devuelve
 * en formato JSON. Si no se encuentran transacciones, se devuelve un mensaje de error.
 */
export declare const getAllTransactions: RequestHandler;
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
export declare const getTransactionById: RequestHandler;
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
export declare const getTransactionsByBuyer: RequestHandler;
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
export declare const getTransactionsByMerchant: RequestHandler;
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
export declare const getTransactionsByDate: RequestHandler;
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
export declare const updateTransactionById: RequestHandler;
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
export declare const deleteTransactionById: RequestHandler;
