import express from 'express';
const router = express.Router();

import {
	getTransaction,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	uploadFormTransaction,
	getAdminTransaction,
	updateAdminTransaction,
} from '../controllers/transaction';

router.post('/transaction/get', getTransaction);
router.post('/transaction/create', createTransaction);
router.post('/transaction/update', updateTransaction);
router.post('/transaction/delete', deleteTransaction);
router.post('/transaction/upload-form', uploadFormTransaction);

router.get('/transaction/admin/get', getAdminTransaction);
router.post('/transaction/admin/update', updateAdminTransaction);
module.exports = router;
