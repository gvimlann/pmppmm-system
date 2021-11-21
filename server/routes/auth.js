import express from 'express';
const router = express.Router();

import { agentLogin } from '../controllers/auth';

router.post('/auth/agent/login', agentLogin);

module.exports = router;
