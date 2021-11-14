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

router.post('/donor/get', getDonor);
router.post('/donor/create', createDonor);
router.post('/donor/update', updateDonor);
router.post('/donor/delete', deleteDonor);
router.post('/donor/validate', validateDonor);

module.exports = router;
