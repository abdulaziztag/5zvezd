import express from 'express';

const router = express.Router();
import {
  getProductById,
  addProduct,
  deleteProduct,
  filterProducts,
  getHomePageProducts,
} from '../controllers/product.js';
import {upload} from '../utils/multer.util.js';

router.post('/get', getProductById);
router.post('/add', upload.single('img'), addProduct);
router.delete('/delete', deleteProduct);
router.post('/filter', filterProducts);
router.get('/homeProducts', getHomePageProducts);

export const productRoutes = router;
