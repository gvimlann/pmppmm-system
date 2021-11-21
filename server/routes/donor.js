import express from 'express';
const router = express.Router();

import {
	getDonor,
	createDonor,
	updateDonor,
	deleteDonor,
	validateDonor,
} from '../controllers/donor';

import { requireSignIn } from '../middlewares/index';

router.post('/donor/get', requireSignIn, getDonor);
router.post('/donor/create', requireSignIn, createDonor);
router.post('/donor/update', requireSignIn, updateDonor);
router.post('/donor/delete', requireSignIn, deleteDonor);
router.post('/donor/validate', requireSignIn, validateDonor);

module.exports = router;
