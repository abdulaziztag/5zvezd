import express from 'express';
import {confirmEmail, login, register} from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/confirmation', confirmEmail);

export const authRoutes = router;
