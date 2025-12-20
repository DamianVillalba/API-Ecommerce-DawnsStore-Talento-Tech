import { Router } from 'express';
import { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';
import {
    validate
} from '../middlewares/zod.middleware';
import { verifyToken } from '../middlewares/auth.middleware';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/product.schema';

const router = Router();

// Rutas Públicas

// Endpoint: GET /api/v1/product
router.get('/', getAllProducts);
// Endpoint: GET /api/v1/product/:id
router.get('/:id', getProductById);

// Rutas PROTEGIDAS

// Endpoint: POST /api/v1/product
router.post('/', verifyToken, validate(CreateProductSchema), createProduct);
// Endpoint: PATCH /api/v1/product/:id
router.patch('/:id', verifyToken, validate(UpdateProductSchema), updateProduct);
// Endpoint: DELETE /api/v1/product/:id
router.delete('/:id', verifyToken, deleteProduct);

export default router;