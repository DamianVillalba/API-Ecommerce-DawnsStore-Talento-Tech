import { Router } from 'express';
import { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';
import {
    createProductValidationRules,
    updateProductValidationRules,
    validate
} from '../middlewares/product.validation';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas Públicas

// Endpoint: GET /api/v1/product
router.get('/', getAllProducts);
// Endpoint: GET /api/v1/product/:id
router.get('/:id', getProductById);

// Rutas PROTEGIDAS

// Endpoint: POST /api/product
router.post('/', verifyToken, createProductValidationRules, validate, createProduct);
// Endpoint: PUT /api/v1/product/:id
router.put('/:id', verifyToken, updateProductValidationRules, validate, updateProduct);
// Endpoint: DELETE /api/v1/product/:id
router.delete('/:id', verifyToken, deleteProduct);

export default router;