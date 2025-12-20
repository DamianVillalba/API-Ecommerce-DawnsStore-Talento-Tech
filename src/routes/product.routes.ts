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
/**
 * @openapi
 * /product:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getAllProducts);
// Endpoint: GET /api/v1/product/:id
/**
 * @openapi
 * /product/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto en Firestore
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getProductById);

// Rutas PROTEGIDAS

// Endpoint: POST /api/product
/**
 * @openapi
 * /product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateRequest'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado
 */
router.post('/', verifyToken, validate(CreateProductSchema), createProduct);
// Endpoint: PATCH /api/v1/product/:id
/**
 * @openapi
 * /product/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Al menos un campo debe ser enviado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateRequest'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Body vacío o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.patch('/:id', verifyToken, validate(UpdateProductSchema), updateProduct);
// Endpoint: DELETE /api/v1/product/:id
/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', verifyToken, deleteProduct);

export default router;