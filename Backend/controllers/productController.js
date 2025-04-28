import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4; 
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Brands only)
const createProduct = asyncHandler(async (req, res) => {
  if (!req.user.isBrand) {
    res.status(401);
    throw new Error("Not authorized as a brand owner");
  }

  const product = new Product({
    user: req.user._id,
    brandOwner: req.user._id,
    name: "Sample name",
    price: 0,
    image: ["/images/sample.jpg"],
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    rating: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Get logged-in brand's own products
// @route   GET /api/products/myproducts
// @access  Private (Brands only)
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ brandOwner: req.user._id });
  res.json(products);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Brand Owners Only)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.brandOwner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this product');
    }

    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Brand Owners Only)
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.brandOwner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this product');
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!comment || comment.trim() === '') {
    res.status(400).json({ message: 'Comment is required' });
    return;
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user?.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ message: 'Product already reviewed' });
      return;
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Delete a review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private (User who wrote review OR Admin)
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = product.reviews.find(
      (r) => r._id.toString() === req.params.reviewId.toString()
    );

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    if (review.user?.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403).json({ message: 'Not authorized to delete this review' });
      return;
    }

    product.reviews = product.reviews.filter(
      (r) => r._id.toString() !== req.params.reviewId.toString()
    );

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      (product.reviews.length || 1);

    await product.save();
    res.json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// ✅ EXPORT everything
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getMyProducts,
  getTopProducts,
};
