import express from 'express';
import passport from 'passport';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });
import {
  getProductById,
  addProduct,
  deleteProduct,
  filterProducts,
  sortProductByField,
} from '../controllers/product.js';
import {upload} from '../utils/multer.util.js';

router.post('/get', getProductById);
router.post('/add', [auth, upload.single('img')], addProduct);
router.delete('/delete', auth, deleteProduct);
router.post('/filter', filterProducts);
router.post('/sortByField', sortProductByField);

export const productRoutes = router;
