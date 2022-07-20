import express from 'express';
import passport from 'passport';
import {addComment, deleteComment, getComments, sortCommentByField} from '../controllers/comment.js';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.post('/add', auth, addComment);
router.post('/get', getComments);
router.delete('/delete', auth, deleteComment);
router.post('/sortByField', sortCommentByField);

export const commentRoutes = router;
