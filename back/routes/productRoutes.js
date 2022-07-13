import express from 'express';

const router = express.Router();
import {getFullProduct, addProduct, deleteProduct} from '../controllers/product.js';
import {upload} from '../utils/multer.util.js';

router.post('/get', getFullProduct);
router.post('/add', upload.single('img'), addProduct);
router.delete('/delete', deleteProduct);

export const productRoutes = router;
