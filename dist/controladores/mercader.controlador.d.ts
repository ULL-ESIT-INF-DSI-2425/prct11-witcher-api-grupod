import { RequestHandler } from 'express';
/**
 * Controlador para obtener todos los mercaderes
 * @param req - Request
 * @param res - Response
 * @returns - Lista de mercaderes
 * @throws - 404 si no se encuentran mercaderes
 * @throws - 500 si hay un error al obtener los mercaderes
 */
export declare const getAllMerchants: RequestHandler;
/**
 * Controlador para crear un nuevo mercader
 * @param req - Request
 * @param res - Response
 * @returns - El mercader creado
 * @throws - 400 si faltan campos obligatorios
 * @throws - 500 si hay un error al crear el mercader
 */
export declare const createMerchant: RequestHandler;
/**
 * Controlador para obtener un mercader por ID
 * @param req - Request
 * @param res - Response
 * @returns - El mercader encontrado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al obtener el mercader
 */
export declare const getMerchantById: RequestHandler;
/**
 * Controlador para obtener un mercader por nombre
 * @param req - Request
 * @param res - Response
 * @returns - El mercader encontrado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al obtener el mercader
 */
export declare const getMerchantByName: RequestHandler;
/**
 * Controlador para actualizar un mercader por ID
 * @param req - Request
 * @param res - Response
 * @returns - El mercader actualizado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al actualizar el mercader
 */
export declare const updateMerchantById: RequestHandler;
/**
 * Controlador para actualizar un mercader por nombre
 * @param req - Request
 * @param res - Response
 * @returns - El mercader actualizado
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al actualizar el mercader
 */
export declare const updateMerchantByName: RequestHandler;
/**
 * Controlador para eliminar un mercader por ID
 * @param req - Request
 * @param res - Response
 * @returns - Mensaje de éxito
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al eliminar el mercader
 */
export declare const deleteMerchantById: RequestHandler;
/**
 * Controlador para eliminar un mercader por nombre
 * @param req - Request
 * @param res - Response
 * @returns - Mensaje de éxito
 * @throws - 404 si no se encuentra el mercader
 * @throws - 500 si hay un error al eliminar el mercader
 */
export declare const deleteMerchantByName: RequestHandler;
