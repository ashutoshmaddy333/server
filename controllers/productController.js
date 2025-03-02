const mongoose = require('mongoose');
const Product = require('../models/Product');

// Controller methods for product operations
const productController = {
  // Create a new product
  addProduct: async (req, res) => {
    try {
      const {
        name, description, price, category,
        material, weight, status
      } = req.body;

      // Validate required fields
      if (!name || !description || !price || !category || !material || !weight) {
        return res.status(400).json({ error: "All required fields must be provided, including at least one image." });
      }

      const newProduct = new Product({
        ...req.body,
        dateAdded: new Date(),
        lastRestocked: req.body.stock > 0 ? new Date() : undefined
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: error.message });
    }
  },
   
  // Get all products with filtering, sorting, and pagination
  getProducts: async (req, res) => {
    try {
      const {
        category, status, minPrice, maxPrice,
        inStock, featured, sort, page = 1, limit = 20, search
      } = req.query;

      // Build filter object
      const filter = {};

      if (category) filter.category = category;
      if (status) filter.status = status;
      if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
      if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
      if (inStock === 'true') filter.stock = { $gt: 0 };
      if (featured === 'true') filter.featured = true;

      // Text search
      if (search) {
        filter.$text = { $search: search };
      }

      // Build sort options
      let sortOption = {};
      if (sort) {
        switch (sort) {
          case 'priceAsc':
            sortOption = { price: 1 };
            break;
          case 'priceDesc':
            sortOption = { price: -1 };
            break;
          case 'newest':
            sortOption = { dateAdded: -1 };
            break;
          case 'bestRated':
            sortOption = { 'ratings.average': -1 };
            break;
          default:
            sortOption = { dateAdded: -1 };
        }
      } else {
        sortOption = { dateAdded: -1 };
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Execute query with pagination
      const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));

      // Get total count for pagination info
      const total = await Product.countDocuments(filter);

      res.json({
        products,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const updates = { ...req.body };

      // If stock is being updated, update lastRestocked date
      const currentProduct = await Product.findById(id);
      if (updates.stock !== undefined && updates.stock > 0 &&
        (!currentProduct.stock || currentProduct.stock === 0)) {
        updates.lastRestocked = new Date();
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update product status
  updateProductStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      if (!status || !['active', 'inactive', 'discontinued', 'comingSoon', 'seasonal'].includes(status)) {
        return res.status(400).json({ error: "Valid status is required" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: 'Product status updated successfully', product: updatedProduct });
    } catch (error) {
      console.error("Error updating product status:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Add a review to a product
  addReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, rating, comment } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      if (!userId || !rating || !comment) {
        return res.status(400).json({ error: "User ID, rating, and comment are required" });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if user already reviewed this product
      const existingReviewIndex = product.reviews.findIndex(
        review => review.user.toString() === userId
      );

      if (existingReviewIndex >= 0) {
        // Update existing review
        product.reviews[existingReviewIndex].rating = rating;
        product.reviews[existingReviewIndex].comment = comment;
        product.reviews[existingReviewIndex].createdAt = new Date();
      } else {
        // Add new review
        product.reviews.push({
          user: userId,
          rating,
          comment,
          createdAt: new Date(),
          helpful: 0
        });
      }

      // Update average rating
      const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
      product.ratings.average = totalRating / product.reviews.length;
      product.ratings.count = product.reviews.length;

      await product.save();

      res.json({ message: "Review added successfully", product });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Mark a review as helpful
  markReviewHelpful: async (req, res) => {
    try {
      const { productId, reviewId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const review = product.reviews.id(reviewId);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      review.helpful += 1;
      await product.save();

      res.json({ message: "Review marked as helpful", helpfulCount: review.helpful });
    } catch (error) {
      console.error("Error marking review as helpful:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get products by tag
  getProductsByTag: async (req, res) => {
    try {
      const { tag } = req.params;
      const products = await Product.find({ tags: tag });

      res.json(products);
    } catch (error) {
      console.error("Error fetching products by tag:", error);
      res.status(500).json({ error: error.message });
    }
  },
   
  // Get featured products
  getFeaturedProducts: async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      const products = await Product.find({
        featured: true,
        status: 'active',
        stock: { $gt: 0 }
      })
        .sort({ 'ratings.average': -1 })
        .limit(parseInt(limit));

      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: error.message });
    }
  },
  
  // Get products by collection
  getProductsByCollection: async (req, res) => {
    try {
      const { collection } = req.params;
      if (!collection) {
        return res.status(400).json({ error: "Collection parameter is required" });
      }
      
      const products = await Product.find({ collection });
      
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found in this collection" });
      }
      
      res.json({ collection, products });
    } catch (error) {
      console.error("Error fetching products by collection:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get products by Gender
  getProductsByGender: async (req, res) => {
    try {
      const { gender } = req.params;
      if (!gender) {
        return res.status(400).json({ error: "Gender parameter is required" });
      }
      
      const products = await Product.find({ gender });
      
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this gender category" });
      }
      
      res.json({ gender, products });
    } catch (error) {
      console.error("Error fetching products by gender:", error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = productController;