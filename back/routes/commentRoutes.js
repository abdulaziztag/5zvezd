import express from 'express';
import passport from 'passport';
const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });
import {addComment, deleteComment, getComments, sortCommentByField} from '../controllers/comment.js';

router.post('/add', auth, addComment);
router.post('/get', getComments);
router.delete('/delete', auth, deleteComment);
router.post('/sortByField', sortCommentByField);

export const commentRoutes = router;
