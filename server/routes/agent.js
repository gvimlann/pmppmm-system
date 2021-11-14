import express from 'express';
const router = express.Router();

import {
	getAgent,
	createAgent,
	updateAgent,
	deleteAgent,
} from '../controllers/agent';

router.get('/agent/get', getAgent);
router.post('/agent/create', createAgent);
router.post('/agent/update', updateAgent);
router.post('/agent/delete', deleteAgent);

module.exports = router;
