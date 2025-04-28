import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    deleteProductReview,
    getTopProducts,
    getMyProducts,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js'; // ❗ Only protect, not admin

// Public: Get all products
router.route('/').get(getProducts);

// Protected: Create a product (brand)
router.route('/').post(protect, createProduct);

// Public: Get top products
router.get('/top', getTopProducts);

// Protected: Get brand's own products
router.route('/myproducts').get(protect, getMyProducts);

// Public: Get a single product by ID
router.route('/:id').get(getProductById);

// Protected: Update or Delete a product (only owner)
router.route('/:id')
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

// Protected: Create a review
router.route('/:id/reviews').post(protect, createProductReview);

// Protected: Delete a review
router.route('/:id/reviews/:reviewId').delete(protect, deleteProductReview);

export default router;
