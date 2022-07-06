import express from 'express';
const router = express.Router();
import { login, register, confirmEmail, upload, uploadAvatar } from '../controllers/auth.js';

router.post('/login', login);

router.post('/register', register);

router.post('/confirmation', confirmEmail);

router.post('/files', upload.single('file'), uploadAvatar);

export const authRoutes = router;
