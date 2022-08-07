import express from 'express';
import passport from 'passport';
import {upload} from '../utils/multer.util.js';
import {adminRights, changeSettings, uploadAvatar, getSettings, checkAdmin} from '../controllers/user.js';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.post('/upload', [auth, upload.single('img')], uploadAvatar);
router.post('/change', auth, changeSettings);
router.post('/admin', auth, adminRights);
router.get('/settings', auth, getSettings);
router.get('/check', auth, checkAdmin);

export const userRoutes = router;
