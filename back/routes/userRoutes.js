import express from 'express';
const router = express.Router();
import {upload} from '../utils/multer.util.js';
import {uploadAvatar, changeSettings} from '../controllers/user.js';

router.post('/upload', upload.single('file'), uploadAvatar);
router.post('/change', changeSettings);

export const userRoutes = router;
