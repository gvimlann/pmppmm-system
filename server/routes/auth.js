import express from 'express';
const router = express.Router();

import { login } from '../controllers/auth';

router.post('/auth/login', login);

module.exports = router;
