import {upload} from '../utils/multer.util.js';


import express from 'express';

const router = express.Router();
import {getFullProduct, addProduct} from '../controllers/product.js';

router.post('/get', getFullProduct);
router.post('/add', upload.single('img'), addProduct);

export const productRoutes = router;
