import express from 'express';
const router = express.Router();
import { login, register, confirmEmail } from '../controllers/auth.js';

router.post('/login', login);

router.post('/register', register);

router.post('/confirmation', confirmEmail);

export const authRoutes = router;
