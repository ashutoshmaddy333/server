const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/addProduct', productController.addProduct);
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);
router.put('/update-product/:id', productController.updateProduct);
router.patch('/product-status/:id', productController.updateProductStatus);
router.delete('/delete-product/:id', productController.deleteProduct);
router.post('/product/:id/review', productController.addReview);
router.patch('/review/:productId/:reviewId/helpful', productController.markReviewHelpful);
router.get('/products/tag/:tag', productController.getProductsByTag);
router.get('/products/featured', productController.getFeaturedProducts);
router.get('/gender/:gender', shopController.getProductsByGender);
router.get('/collection/:collection', shopController.getProductsByCollection);

module.exports = router;