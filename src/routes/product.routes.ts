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

const router = Router();

// Endpoint: GET /api/v1/product
router.get('/', getAllProducts);

// Endpoint: GET /api/v1/product/:id
router.get('/:id', getProductById);

// Endpoint: POST /api/product
router.post('/', createProduct, createProductValidationRules, validate);

// Endpoint: PUT /api/v1/product/:id
router.put('/:id', updateProduct, updateProductValidationRules, validate);

// Endpoint: DELETE /api/v1/product/:id
router.delete('/:id', deleteProduct);

export default router;