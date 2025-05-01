import express from 'express';
import * as merchantController from '../controladores/mercader.controlador.js';

const router = express.Router();

router.get('/', merchantController.getAllMerchants);
router.post('/', merchantController.createMerchant);

router.get('/search/by-name', merchantController.getMerchantByName);
router.get('/:id', merchantController.getMerchantById);

router.put('/search/by-name', merchantController.updateMerchantByName);
router.put('/:id', merchantController.updateMerchantById);

router.delete('/search/by-name', merchantController.deleteMerchantByName);
router.delete('/:id', merchantController.deleteMerchantById);

export default router;
