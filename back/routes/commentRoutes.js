import express from 'express';
const router = express.Router();
import {addComment, deleteComment, getComments} from '../controllers/comment.js';

router.post('/add', addComment);
router.post('/get', getComments);
router.delete('/delete', deleteComment);

export const commentRoutes = router;
