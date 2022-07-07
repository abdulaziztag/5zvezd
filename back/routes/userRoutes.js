import express from 'express';
const router = express.Router();
import {upload} from '../utils/multer.util.js';
import {uploadAvatar} from '../controllers/user.js';

router.post('/files', upload.single('file'), uploadAvatar);

export const userRoutes = router;
