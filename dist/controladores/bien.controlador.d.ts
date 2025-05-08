import { Request, Response } from 'express';
import { RequestHandler } from 'express';
/**
 * Obtiene todos los bienes
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar los bienes
 * @description Esta función busca todos los bienes en la base de datos y los devuelve
 * en formato JSON. Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 */
export declare const getAllGoods: (req: Request, res: Response) => Promise<void>;
/**
 * Crea un nuevo bien
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al crear el bien
 * @description Esta función crea un nuevo bien en la base de datos y lo guarda. Si
 * ocurre un error durante la creación, se devuelve un mensaje de error. Si el bien ya
 * existe, se devuelve un mensaje de error indicando que el bien ya existe.
 */
export declare const createGood: RequestHandler;
/**
 * Obtiene un bien por ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su ID en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {string} req.params.id - El ID del bien a buscar
 */
export declare const getGoodById: RequestHandler;
/**
 * Obtiene un bien por nombre, descripción, precio o stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su nombre, descripción, precio o stock
 * en la base de datos y lo devuelve en formato JSON. Si el bien no se encuentra,
 * se devuelve un mensaje de error. Si ocurre un error durante la búsqueda,
 * se devuelve un mensaje de error.
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export declare const getGoodByName: RequestHandler;
/**
 * Obtiene un bien por descripción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su descripción en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export declare const getGoodbyDescription: RequestHandler;
/**
 * Obtiene un bien por precio
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su precio en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export declare const getGoodByPrice: RequestHandler;
/**
 * Obtiene un bien por stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su stock en la base de datos y lo devuelve
 * en formato JSON. Si el bien no se encuentra, se devuelve un mensaje de error.
 * Si ocurre un error durante la búsqueda, se devuelve un mensaje de error.
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
 */
export declare const getGoodByStock: RequestHandler;
/**
 * Obtiene un bien por nombre, descripción, precio o stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al buscar el bien
 * @description Esta función busca un bien por su nombre, descripción, precio o stock
 * en la base de datos y lo devuelve en formato JSON. Si el bien no se encuentra,
 * se devuelve un mensaje de error. Si ocurre un error durante la búsqueda,
 * se devuelve un mensaje de error.
 */
export declare const getGoodbyQuery: RequestHandler;
/**
 * Actualiza un bien por ID
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su ID, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export declare const updateGoodById: RequestHandler;
/**
 * Actualiza un bien por nombre
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su nombre, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export declare const updateGoodByName: RequestHandler;
/**
 * Actualiza un bien por descripción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su descripción, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export declare const updateGoodByDescription: RequestHandler;
/**
 * Actualiza un bien por precio
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su precio, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export declare const updateGoodByPrice: RequestHandler;
/**
 * Actualiza un bien por stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su stock, lo actualiza y lo guarda en la base de datos.
 * Si el bien no se encuentra, se devuelve un mensaje de error. Si ocurre un error durante la
 * actualización, se devuelve un mensaje de error.
 */
export declare const updateGoodByStock: RequestHandler;
/**
 * Actualiza un bien por nombre, descripción, precio o stock
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al actualizar el bien
 * @description Esta función busca un bien por su nombre, descripción, precio o stock,
 * lo actualiza y lo guarda en la base de datos. Si el bien no se encuentra, se devuelve
 * un mensaje de error. Si ocurre un error durante la actualización, se devuelve un mensaje de error.
 */
export declare const updateGoodByQuery: RequestHandler;
/**
 * Elimina un bien por ID y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su ID, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export declare const deleteGoodById: RequestHandler;
/**
 * Elimina un bien por nombre y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su nombre, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export declare const deleteGoodByName: RequestHandler;
/**
 * Elimina un bien por descripción y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su descripción, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export declare const deleteGoodByDescription: RequestHandler;
/**
 * Elimina un bien por precio y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su precio, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 */
export declare const deleteGoodByPrice: RequestHandler;
/**
 * Elimina un bien por stock y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su stock, lo elimina y revierte el stock
 * de los bienes involucrados en la transacción. Si el bien no se encuentra, se devuelve un
 * mensaje de error. Si ocurre un error al eliminar el bien o revertir el stock, se devuelve
 * un mensaje de error.
 * @param {number} req.query.stock - El stock del bien a buscar
 * @param {string} req.query.name - El nombre del bien a buscar
 * @param {string} req.query.description - La descripción del bien a buscar
 * @param {number} req.query.price - El precio del bien a buscar
 * @param {string} req.query.id - El ID del bien a buscar
*/
export declare const deleteGoodByStock: RequestHandler;
/**
 * Elimina un bien por nombre, descripción, precio o stock y revierte el stock de los bienes
 * involucrados en la transacción
 * @param {Request} req - La solicitud HTTP
 * @param {Response} res - La respuesta HTTP
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 * @throws {Error} - Si ocurre un error al eliminar el bien o revertir el stock
 * @description Esta función busca un bien por su nombre, descripción, precio o stock,
 * lo elimina y revierte el stock de los bienes involucrados en la transacción. Si el bien
 * no se encuentra, se devuelve un mensaje de error. Si ocurre un error al eliminar el bien
 * o revertir el stock, se devuelve un mensaje de error.
 */
export declare const deleteGoodByQuery: RequestHandler;
