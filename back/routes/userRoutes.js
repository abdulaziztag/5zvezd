import express from 'express';
const router = express.Router();
import passport from 'passport';
import {upload} from '../utils/multer.util.js';
const auth = passport.authenticate('jwt', { session: false });
import {uploadAvatar, changeSettings, adminRights} from '../controllers/user.js';

router.post('/upload', [auth, upload.single('img')], uploadAvatar);
router.post('/change', auth, changeSettings);
router.post('/admin', auth, adminRights);

export const userRoutes = router;
