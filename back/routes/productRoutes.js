import express from 'express';
import passport from 'passport';
import {
  addProduct,
  deleteProduct,
  filterProducts,
  getProductById,
  sortProductByField,
} from '../controllers/product.js';
import {upload} from '../utils/multer.util.js';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.post('/get', getProductById);
router.post('/add', [auth, upload.single('img')], addProduct);
router.delete('/delete', auth, deleteProduct);
router.post('/filter', filterProducts);
router.post('/sortByField', sortProductByField);

export const productRoutes = router;
