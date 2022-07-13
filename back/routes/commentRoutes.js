import express from 'express';
const router = express.Router();
import { addComment, getComments } from '../controllers/comment.js';

router.post('/add', addComment);
router.post('/get', getComments);

export const commentRoutes = router;
